import * as ng from 'angular';

import BitmovinPlayerController from './bitmovin-player.controller';
import { BitmovinPlayerApi, BitmovinUIManager, DirectiveScope, IWindow, PlayerApiReadyEvent } from './models';
import { PlayerPlugin } from './models/plugins.model';
import { PlayerApi } from './player-api';
import { PlayerSourceType } from './player-source.type';
import { AnalyticsPlugin } from './plugins/analytics.plugin';

const BitmovinPlayerDirective = ($window: IWindow, $log: ng.ILogService, ksdn: any) => ({
  controller: 'MiBitdashController',
  controllerAs: 'bitdashVm',
  replace: true,
  restrict: 'EA',
  scope: {
    config: '=',
    options: '=?',
    playerApiReady: '&?',
    webcast: '=',
  },
  template: `<div id="mi-bitdash-player" width="100%" height="auto"></div>`,
  link(scope: DirectiveScope, element: any, attrs: any, controller: BitmovinPlayerController): void {
    const playerId = 'mi-bitdash-player';
    const webcast = scope.webcast;
    const playerConfig = scope.config;
    let playerApi: PlayerApi;

    init();

    function init(): void {
      if (!controller.vm.playerSource) {
        return;
      }

      switch (controller.vm.playerSource.type) {
        case PlayerSourceType.KSDN:
          createKollectivePlayer();
          break;
        case PlayerSourceType.HIVE:
          createHivePlayer();
          break;
        default:
          createDefaultPlayer();
      }
    }

    function createDefaultPlayer(): void {
      const source = { hls: controller.vm.playerSource.hlsUrl };

      playerConfig.source = {}; // we don't want to load sources on setup

      createPlayer()
        .then(() => {
          return playerApi.load(source)
            .then(() => dispatchPlayerReadyEvent())
            .catch(() => dispatchPlayerReadyEvent());
        })
        .catch((err) => playerErrorHandler(err));
    }

    function createKollectivePlayer(): void {
      playerConfig.source = {}; // we want to set the source by the plugin
      const auth = controller.vm.playerSource.p2p.token;
      const urn = controller.vm.playerSource.p2p.urn;
      const host = controller.vm.playerSource.p2p.host;
      const fallbackSrc = controller.vm.playerSource.hlsUrl;

      createPlayer()
        .then((bitmovinPlayerInstance) => {
          const ksdnPlugin = new ksdn.Players.Bitmovin({ auth, host, fallbackSrc });
          const livecycleHooks = getKollectiveLivecyleHooks();

          ksdnPlugin.play(bitmovinPlayerInstance, urn, livecycleHooks);
        })
        .catch((err) => playerErrorHandler(err));
    }

    function getKollectiveLivecyleHooks(): any {
      const errorPrefix = 'Kollective plugin error: ';

      return {
        onAgentNotDetected: (plugin: any, reasons: any) => {
          $log.error(`${errorPrefix} Machine does not have a Kollective Agent installed. Reason:`, reasons);
        },
        onAgentRejected: (plugin: any, criteria: any) => {
          if (!criteria.provisionedForCurrentUrn) {
            $log.error(`${errorPrefix} Agent detected but not provisioned for URN`);
          }
          if (!criteria.notBlackedOut) {
            $log.error(`${errorPrefix} Agent detected but is currently blacked out`);
          }
        },
        onPlaybackRequestFailure: (plugin: any, request: any) => {
          $log.error(`${errorPrefix}  Failure to retrieve playback info for the provided URN:`, request);
          return true;
        },
        onPrimingFailure: (plugin: any) => {
          $log.error(`${errorPrefix}  Agent fails to start priming the stream through the Kollective ECDN`);
        },
        onSessionFailure: () => {
          $log.error(`${errorPrefix} Failure to start a session with the agent`);
        },
        setSource: (player: BitmovinPlayerApi, src: string) => {
          player.load({ hls: src })
            .then(() => dispatchPlayerReadyEvent())
            .catch((err) => playerErrorHandler(err));
        }
      };
    }

    function createHivePlayer(): void {
      let hivePluginFailed = false;

      playerConfig.source = {
        hls_ticket: controller.vm.playerSource.p2p.url
      };

      const hiveOptions = {
        HiveJava: {
          onError: () => {
            hivePluginFailed = true;
          },
        },
        debugLevel: 'off',
      };

      const playerRef = $window.window.bitmovin.player(playerId);
      $window.window.bitmovin.initHiveSDN(playerRef, hiveOptions);

      createPlayer()
        .then(() => dispatchPlayerReadyEvent())
        .catch((err: any) => {
          if (hivePluginFailed) {
            $log.warn(`Hive plugin failed, fallback to default player. Error: ${err}`);

            setTimeout(() => {
              createDefaultPlayer();
            }, 60);
          } else {
            playerErrorHandler(err);
          }
        });
    }

    function playerErrorHandler(error: any): void {
      $log.error('player error:', error);
    }

    function setupPlayerUi(bitmovinPlayerInstance: BitmovinPlayerApi): void {
      const isAudioOnly = webcast.layout.layout === 'audio-only';
      const bitmovinUIManager: BitmovinUIManager = $window.window.miBitmovinUi.playerui.UIManager.Factory;

      if (isAudioOnly) {
        bitmovinUIManager.buildAudioOnlyUI(bitmovinPlayerInstance, controller.getAudioOnlyPlayerConfig());
      } else {
        bitmovinUIManager.buildAudioVideoUI(bitmovinPlayerInstance);
      }

      const bitmovinControlbar = getElementsByClassName('bitmovinplayer-container');
      if (bitmovinControlbar) {
        bitmovinControlbar.style.minWidth = '175px';
        bitmovinControlbar.style.minHeight = '101px';
        $window.document.getElementById('bitmovinplayer-video-mi-bitdash-player').setAttribute('title', webcast.name);
      }
    }

    function getElementsByClassName(className: string): HTMLElement {
      return $window.document.getElementsByClassName(className)[0] as HTMLElement;
    }

    function createPlayer(): Promise<BitmovinPlayerApi> {
      const playerSDK = $window.window.bitmovin.player(playerId);

      // TODO: set it in the app and not here
      playerConfig.style = { ux: false };

      return playerSDK.setup(playerConfig)
        .then((bitmovinPlayerApi) => {
          setupPlayerUi(bitmovinPlayerApi);

          playerApi = new PlayerApi(bitmovinPlayerApi);
          const plugins = createPlugins(playerApi);
          playerApi.setPlugins(plugins);

          return bitmovinPlayerApi;
        });
    }

    function createPlugins(api: PlayerApi): PlayerPlugin[] {
      const plugins = [];

      if (controller.vm.playerSource.videoId) {
        plugins.push(new AnalyticsPlugin(api, controller.vm.playerSource.videoId, $log));
      }

      return plugins;
    }

    function dispatchPlayerReadyEvent(): void {
      const $event: PlayerApiReadyEvent = {
        playerApi: playerApi.getPublicApi(),
      };

      (scope.playerApiReady || ng.noop)({ $event });
    }


    function cleanup(): void {
      if (playerApi) {
        playerApi.destroy();
        playerApi = null;
      }
    }

    scope.$on('$destroy', () => {
      cleanup();
    });
  }

} as ng.IDirective);

export default BitmovinPlayerDirective;

BitmovinPlayerDirective.$inject = ['$window', '$log', 'ksdn'];
