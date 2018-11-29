import * as angular from 'angular';

import BitmovinPlayerController from './bitmovin-player.controller';
import { BitmovinPlayerApi, BitmovinUIManager, DirectiveScope, IWindow } from './models';

const BitmovinPlayerDirective = ($window: IWindow, $log: angular.ILogService) => ({
  controller: 'MiBitdashController',
  controllerAs: 'bitdashVm',
  replace: true,
  restrict: 'EA',
  scope: {
    config: '=',
    options: '=?',
    webcast: '=',
  },
  template: `<div id="mi-bitdash-player" width="100%" height="auto"></div>`,
  link(scope: DirectiveScope, element: any, attrs: any, controller: BitmovinPlayerController): void {
    const playerId = 'mi-bitdash-player';
    const webcast = scope.webcast;
    const playerConfig = scope.config;
    let player: BitmovinPlayerApi;

    init();

    function init(): void {
      if (!controller.vm.playerSource) {
        return;
      }

      player = $window.window.bitmovin.player(playerId);

      createKollectivePlayer();

      // switch (controller.vm.playerSource.type) {
      //   case PlayerSourceType.KSDN:
      //     createKollectivePlayer();
      //     break;
      //   case PlayerSourceType.HIVE:
      //     createHivePlayer();
      //     break;
      //   default:
      //     createDefaultPlayer();
      // }
    }

    function createDefaultPlayer(): void {
      createPlayer()
        .catch(playerErrorHandler);
    }

    function createPlayer(): Promise<BitmovinPlayerApi> {
      return player.setup(playerConfig)
        .then((playerApi) => {
          setupPlayerUi();

          return playerApi;
        });
    }

    function createKollectivePlayer(): void {
      playerConfig.source = {}; // we want to set the source by the plugin
      // const auth = controller.vm.playerSource.p2p.token;
      // const urn = controller.vm.playerSource.p2p.urn;
      // const host = controller.vm.playerSource.p2p.host;

      const auth = 'pub-ZW1haWxAbWkuY29tI21p';
      const urn = 'urn:kid:eval:mi:moid:65e8a97d-fab1-4a2f-bfc8-1ff152598a51';
      const host = undefined;

      createPlayer()
        .then((playerApi) => {
          console.log('player ', player);
          console.log('playerApi ', playerApi);
          const ksdnPlugin = new $window.window.ksdn.Players.Bitmovin({ auth });
          const callbacks = getKollectiveLivecyleHooks();

          ksdnPlugin.play(playerApi, urn, callbacks);
        })
        .catch(playerErrorHandler);
    }

    function getKollectiveLivecyleHooks(): any {
      console.log('getKollectiveLivecyleHooks...');

      return {
        didSetSource: (plugin: any) => {
          console.log('didSetSource', plugin);

          console.log('player version: ', plugin.player.version);
          console.log('isSetup: ', plugin.player.isSetup());
          console.log('isPlaying: ', plugin.player.isPlaying());
          console.log('isStalled: ', plugin.player.isStalled());
          console.log('getConfig - source: ', plugin.player.getConfig().source);
          console.log('getConfig: ', plugin.player.getConfig());

          console.log(plugin.getLogs());
        },
        onAgentDetected: (plugin: any, supportsSessions: any, agent: any) => {
          const agentData = plugin.getAgentData();
          const version = agentData.version;
          const urnPrefix = agentData.urn_namespace;
          console.log('onAgentDetected: supportsSessions=' + supportsSessions + ', agentVersion=' + version + ', urnNamespace=' + urnPrefix);
        },
        onAgentNotDetected: (plugin: any, reasons: any) => {
          console.log('onAgentNotDetected');
          console.log(reasons);
        },
        onAgentRejected: (plugin: any, criteria: any) => {
          if (!criteria.provisionedForCurrentUrn) {
            console.log('Agent detected but not provisioned for URN');
          }
          if (!criteria.notBlackedOut) {
            console.log('Agent detected but is currently blacked out');
          }
        },
        onCommand: (plugin: any, command: any, data: any) => {
          console.log('onCommand', plugin, command, data);
        },
        onPlaybackRequestFailure: (plugin: any, request: any) => {
          $log.error('Using kollective-plugin failed');
          return false;
        },
        onPlaybackRequestSuccess: (plugin: any, info: any) => {
          console.log('onPlaybackRequestSuccess: ' + info.moid);
        },
        onPrimingFailure: (plugin: any) => {
          console.log('onPrimingFailure');
        },
        onPrimingStart: (plugin: any) => {
          console.log('onPrimingStart');
        },
        onProgress: (plugin: any, progress: any, urn: any) => {
          console.log('onProgress: ' + progress + ' (' + urn + ')');
        },
        onSessionFailure: (plugin: any) => {
          console.log('onSessionFailure');
        },
        onSessionStart: (plugin: any) => {
          console.log('onSessionStart');
        },
        willSetSource: (plugin: any) => {
          console.log('willSetSource');
        },
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
        .catch(() => {
          $log.warn('Using hive-plugin failed, choose fallback.');
          playerConfig.source.hls = controller.vm.playerSource.hlsUrl;

          setTimeout(() => {
            createDefaultPlayer();
          }, 60);
        });
    }

    function playerErrorHandler(error: any): void {
      $log.error(error);
    }


    function setupPlayerUi(): void {
      const isAudioOnly = webcast.layout.layout === 'audio-only';
      const bitmovinUIManager: BitmovinUIManager = $window.window.bitmovin.playerui.UIManager.Factory;

      if (isAudioOnly) {
        bitmovinUIManager.buildAudioOnlyUI(player, controller.getAudioOnlyPlayerConfig());
      } else {
        bitmovinUIManager.buildAudioVideoUI(player);
      }

      const bitmovinControlbar = getElementsByClassName('bitmovinplayer-container');
      if (bitmovinControlbar) {
        bitmovinControlbar.style.minWidth = '175px';
        bitmovinControlbar.style.minHeight = '101px';
        document.getElementById('bitmovinplayer-video-mi-bitdash-player').setAttribute('title', webcast.name);
      }
    }

    // function setupHivePlayer(): void {
    //   const hiveOptions = {
    //     HiveJava: {
    //       onError: () => hiveErrorHandler(),
    //     },
    //     debugLevel: 'off',
    //   };
    //
    //   bitmovinPlayerConfig.source.hls = null;
    //   bitmovinPlayerConfig.source.hls_ticket = scope.state.data.hiveSettings.serviceUrl;
    //
    //   $window.window.bitmovin.initHiveSDN(bitmovinPlayer, hiveOptions);
    //   createPlayer(bitmovinPlayerConfig);
    // }
    //
    // function createPlayeaar(conf: BitmovinPlayerConfig): void {
    //   bitmovinPlayer.setup(conf)
    //     .then((playerApi) => {
    //       setupPlayerUi();
    //
    //       if (scope.state.data.preferredTech === PreferredTech.KSDN) {
    //         startKsdnPlugin(playerApi);
    //       }
    //     })
    //     .catch((reason: IReason) => {
    //       if (hivePluginFailed) {
    //         $log.warn('Using hive-plugin failed, choose fallback.');
    //         hivePluginFailed = false;
    //         bitmovinPlayerConfig.source.hls = scope.state.data.hiveSettings.origHlsUrl;
    //
    //         setTimeout(() => {
    //           createPlayer(bitmovinPlayerConfig);
    //         }, 60);
    //       } else {
    //         $log.error(`Error: ${reason.code} - ${reason.message}`);
    //       }
    //     });
    // }


    //
    // function hiveErrorHandler(): void {
    //   hivePluginFailed = true;
    // }

    function getElementsByClassName(className: string): HTMLElement {
      return document.getElementsByClassName(className)[0] as HTMLElement;
    }

    function cleanup(): void {
      if (player) {
        player.destroy();
        player = null;
      }
    }

    scope.$on('$destroy', () => {
      cleanup();
    });
  }

} as angular.IDirective);

export default BitmovinPlayerDirective;

BitmovinPlayerDirective.$inject = ['$window', '$log'];
