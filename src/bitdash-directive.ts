import * as angular from 'angular';
import {IMIUIConfig} from '../interface/interfaces';
import {IBitdashDirective, IBitmovinUIManager, IConfig, IMyElement, IPlayer, IReason, IWindow} from './../interface/interfaces';

const BitdashDirective = ($window: IWindow, $log: angular.ILogService) => ({
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
  link(scope: IBitdashDirective): void {
    let bitmovinPlayer: IPlayer;
    let bitmovinUIManager: IBitmovinUIManager;
    let bitmovinControlbar: IMyElement;
    const config: IConfig = scope.config;
    const webcast: any = scope.webcast;
    buildPlayer();

    function buildPlayer(): void {
      bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');

      if (angular.isDefined(bitmovinPlayer) && bitmovinPlayer.isReady() === true) {
        bitmovinPlayer.destroy();
        bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');
      }

      if ((webcast.state === 'live') && config.source.hls_ticket) {
        // Get a hive-enabled player through bitdash.initHiveSDN
        $window.window.bitmovin.initHiveSDN(bitmovinPlayer, {debugLevel: 'off'});
      }

      loadPlayer(config);
    }

    function getAudioOnlyPlayerConfig(): IMIUIConfig {
      return webcast.theme.audioOnlyFileUrl ? {audioOnlyOverlayConfig: {backgroundImageUrl: webcast.theme.audioOnlyFileUrl, hiddeIndicator: true}} : {};
    }

    function loadPlayer(conf: IConfig): void {
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
        });
    }

    function isAudioOnly(): boolean {
      return webcast.layout.layout === 'audio-only';
    }

    function getElementsByClassName(className: string): IMyElement {
      return document.getElementsByClassName(className)[0] as IMyElement;
    }
  }

} as angular.IDirective);

export default BitdashDirective;

BitdashDirective.$inject = ['$window', '$log'];
