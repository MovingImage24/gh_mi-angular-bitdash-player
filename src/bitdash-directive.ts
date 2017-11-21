import * as angular from 'angular';
import {IBitdashDirective, IBitmovinUIManager, IConfig, IMyElement, IPlayer, IReason, IWindow} from './../interface/interfaces';

const BitdashDirective = ($window: IWindow, $log: angular.ILogService) => ({
      controller: 'MiBitdashController',
      controllerAs: 'bitdashVm',
      replace: true,
      restrict: 'EA',
      scope: {
        config: '=',
        options: '=?',
        webcast: '='
      },
      template: `<div id="mi-bitdash-player" width="100%" height="auto"></div>`,
      link(scope: IBitdashDirective): void {
        let bitmovinPlayer: IPlayer;
        let bitmovinUIManager: IBitmovinUIManager;
        let bitmovinControlbar: IMyElement;
        const config: IConfig = scope.config;
        const webcast: any = scope.webcast;
        const stateData: any = scope.state.data;
        buildPlayer();

        function buildPlayer(): void {
          bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');
          if (angular.isDefined(bitmovinPlayer) && bitmovinPlayer.isReady() === true) {
            bitmovinPlayer.destroy();
            bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');
          }

          if ((webcast.state === 'live') && config.source.hiveServiceUrl) {
            // Get a hive-enabled player through bitdash.initHiveSDN
            $window.window.bitmovin.initHiveSDN(bitmovinPlayer, {debugLevel: 'off'});
            // Configure and Setup bitmovin in initSession callback
            bitmovinPlayer.initSession(config.source.hiveServiceUrl).then((session) => {
              const hiveConfig: IConfig = angular.copy(config);
              hiveConfig.source.hls = session.manifest;
              loadPlayer(hiveConfig);
            }, (reason: IReason) => {
              // Handle the case if Hive init fails
              $log.warn(`Hive init fails: ${reason.code} - ${reason.message}`);
              loadPlayer(config);
            });
          } else {
            loadPlayer(config);
          }
        }

        function loadPlayer(conf: IConfig): void {
          bitmovinPlayer
            .setup(conf)
            .then(() => {
              bitmovinUIManager = $window.window.bitmovin.playerui.UIManager.Factory;
              if (isAudioOnly()) {
                bitmovinUIManager.buildAudioOnlyUI(bitmovinPlayer);
                setAudioOnlyStillImage();
              } else {
                bitmovinUIManager.buildAudioVideoUI(bitmovinPlayer);
              }

              bitmovinControlbar = getElementsByClassName('bitmovinplayer-container');
              if (angular.isDefined(bitmovinControlbar)) {
                bitmovinControlbar.style.minWidth = '175px';
                bitmovinControlbar.style.minHeight = '101px';
                document.getElementById('bitmovinplayer-video-mi-bitdash-player').setAttribute('title', webcast.name);
              }
            }, (reason: IReason) => {
              $log.log(`Error: ${reason.code} - ${reason.message}`);
            });
        }

        function isAudioOnly(): boolean {
          return angular.isDefined(stateData.playout.audioOnly) &&
            stateData.playout.audioOnly;
        }

        function setAudioOnlyStillImage(): void {
          if (angular.isDefined(stateData.playout.audioOnlyStillUrl) &&
            stateData.playout.audioOnlyStillUrl !== '') {
            const element = getElementsByClassName('mi-wbc-ui-audioonly-overlay') as IMyElement;
            element.style.backgroundImage = `url(${stateData.playout.audioOnlyStillUrl})`;
            element.style.backgroundSize = 'contain';
            element.style.backgroundPosition = 'center';
          }
        }

        function getElementsByClassName(className: string): IMyElement {
          return document.getElementsByClassName(className)[0] as IMyElement;
        }
      }

} as angular.IDirective);

export default BitdashDirective;

BitdashDirective.$inject = ['$window', '$log'];
