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

    init();

    function init(): void {
      bitmovinPlayer = getPlayer();
      const hasPlayer = angular.isDefined(bitmovinPlayer) && bitmovinPlayer.isReady() === true;

      if (hasPlayer) {
        bitmovinPlayer.destroy();
        bitmovinPlayer = getPlayer();
      }

      if (scope.state.data.preferredTech === PreferredTech.HIVE) {
        initHivePlugin();
      }

      createPlayer(bitmovinPlayerConfig);
    }

    function initHivePlugin(): void {
      const hiveOptions = {
        HiveJava: {
          onError: () => hiveErrorHandler(),
        },
        debugLevel: 'off',
      };

      bitmovinPlayerConfig.source.hls = null;
      bitmovinPlayerConfig.source.hls_ticket = scope.state.data.hiveSettings.serviceUrl;

      $window.window.bitmovin.initHiveSDN(bitmovinPlayer, hiveOptions);
    }

    function createPlayer(conf: BitmovinPlayerConfig): void {
      bitmovinPlayer.setup(conf)
        .then(() => {
          bitmovinUIManager = $window.window.bitmovin.playerui.UIManager.Factory;

          if (isAudioOnly()) {
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
        }, (reason: IReason) => {
          $log.log(`Error: ${reason.code} - ${reason.message}`);

          if (hivePluginFailed) {
            hivePluginFailed = false;
            bitmovinPlayerConfig.source.hls = scope.state.data.hiveSettings.origHlsUrl;

            setTimeout(() => {
              createPlayer(bitmovinPlayerConfig);
            }, 60);
          }
        });
    }

    function hiveErrorHandler(): void {
      hivePluginFailed = true;
    }

    function getAudioOnlyPlayerConfig(): IMIUIConfig {
      return webcast.theme.audioOnlyFileUrl ? { audioOnlyOverlayConfig: { backgroundImageUrl: webcast.theme.audioOnlyFileUrl, hiddeIndicator: true } } : {};
    }

    function isAudioOnly(): boolean {
      return webcast.layout.layout === 'audio-only';
    }

    function getElementsByClassName(className: string): IMyElement {
      return document.getElementsByClassName(className)[0] as IMyElement;
    }

    function getPlayer(): BitmovinPlayerApi {
      return $window.window.bitmovin.player(playerId);
    }
  }

} as angular.IDirective);

export default BitmovinPlayerDirective;

BitmovinPlayerDirective.$inject = ['$window', '$log'];
