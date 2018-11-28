import * as angular from 'angular';
import {
  BitdashDirectiveScope,
  BitmovinPlayerApi,
  BitmovinPlayerConfig,
  IBitmovinUIManager,
  IMIUIConfig,
  IMyElement,
  IReason,
  IWindow
} from '../interface/interfaces';
import { PreferredTech } from './preferred-tech.types';

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
  link(scope: BitdashDirectiveScope): void {
    const playerId = 'mi-bitdash-player';
    const webcast = scope.webcast;
    const bitmovinPlayerConfig = scope.config;
    let bitmovinUIManager: IBitmovinUIManager;
    let bitmovinControlbar: IMyElement;
    let bitmovinPlayer: BitmovinPlayerApi;
    let hivePluginFailed = false;
    let ksdnPlugin: any;

    init();

    function init(): void {
      console.log('init');
      bitmovinPlayer = getPlayer();

      switch (scope.state.data.preferredTech) {
        case PreferredTech.HIVE:
          setupHivePlayer();
          break;
        case PreferredTech.KSDN:
          setupKsdnPlayer();
          break;
        default:
          createPlayer(bitmovinPlayerConfig);
      }

    }

    function setupKsdnPlayer(): void {
      bitmovinPlayerConfig.source = {};
      createPlayer(bitmovinPlayerConfig);
    }

    function setupHivePlayer(): void {
      const hiveOptions = {
        HiveJava: {
          onError: () => hiveErrorHandler(),
        },
        debugLevel: 'off',
      };

      bitmovinPlayerConfig.source.hls = null;
      bitmovinPlayerConfig.source.hls_ticket = scope.state.data.hiveSettings.serviceUrl;

      $window.window.bitmovin.initHiveSDN(bitmovinPlayer, hiveOptions);
      createPlayer(bitmovinPlayerConfig);
    }

    function createPlayer(conf: BitmovinPlayerConfig): void {
      bitmovinPlayer.setup(conf)
        .then((playerApi) => {
          setupPlayerUi();

          if (scope.state.data.preferredTech === PreferredTech.KSDN) {
            startKsdnPlugin(playerApi);
          }
        })
        .catch((reason: IReason) => {
          if (hivePluginFailed) {
            $log.warn('Using hive-plugin failed, choose fallback.');
            hivePluginFailed = false;
            bitmovinPlayerConfig.source.hls = scope.state.data.hiveSettings.origHlsUrl;

            setTimeout(() => {
              createPlayer(bitmovinPlayerConfig);
            }, 60);
          } else {
            $log.error(`Error: ${reason.code} - ${reason.message}`);
          }
        });
    }

    function setupPlayerUi(): void {
      const isAudioOnly = webcast.layout.layout === 'audio-only';

      bitmovinUIManager = $window.window.bitmovin.playerui.UIManager.Factory;

      if (isAudioOnly) {
        bitmovinUIManager.buildAudioOnlyUI(bitmovinPlayer, getAudioOnlyPlayerConfig());
      } else {
        bitmovinUIManager.buildAudioVideoUI(bitmovinPlayer);
      }

      bitmovinControlbar = getElementsByClassName('bitmovinplayer-container');
      if (bitmovinControlbar) {
        bitmovinControlbar.style.minWidth = '175px';
        bitmovinControlbar.style.minHeight = '101px';
        document.getElementById('bitmovinplayer-video-mi-bitdash-player').setAttribute('title', webcast.name);
      }
    }

    function startKsdnPlugin(playerApi: BitmovinPlayerApi): void {
      const callbacks = {
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
          $log.warn('Using kollective-plugin failed, choose fallback.');
          setTimeout(() => {
            const source = {
              hls: scope.state.data.ksdnSettings.fallBackUrl,
            };
            bitmovinPlayer.load(source);
          }, 100);

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
      const options = {
        auth: scope.state.data.ksdnSettings.token,
      };

      ksdnPlugin = new $window.window.ksdn.Players.Bitmovin(options);
      ksdnPlugin.play(playerApi, scope.state.data.ksdnSettings.urn, callbacks);
    }

    function hiveErrorHandler(): void {
      hivePluginFailed = true;
    }

    function getAudioOnlyPlayerConfig(): IMIUIConfig {
      return webcast.theme.audioOnlyFileUrl ? { audioOnlyOverlayConfig: { backgroundImageUrl: webcast.theme.audioOnlyFileUrl, hiddeIndicator: true } } : {};
    }

    function getElementsByClassName(className: string): IMyElement {
      return document.getElementsByClassName(className)[0] as IMyElement;
    }

    function getPlayer(): BitmovinPlayerApi {
      return $window.window.bitmovin.player(playerId);
    }

    function cleanup(): void {
      bitmovinPlayer.destroy();
      bitmovinPlayer = null;
      ksdnPlugin = null;
    }

    scope.$on('$destroy', () => {
      cleanup();
    });
  }

} as angular.IDirective);

export default BitmovinPlayerDirective;

BitmovinPlayerDirective.$inject = ['$window', '$log'];
