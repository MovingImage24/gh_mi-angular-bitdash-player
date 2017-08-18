
import * as angular from 'angular';
import {IBitmovinUIManager, IConfig, IMyElement, IMyScope, IPlayer, IWindow} from '../interfaces/window';

const BitdashDirective = ($window: IWindow) => ({
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
      link(scope: IMyScope): void {
        let bitmovinPlayer: IPlayer;
        let bitmovinUIManager: IBitmovinUIManager;
        let bitmovinControlbar: IMyElement;
        const config: IConfig = scope.config;
        const webcast: any = scope.webcast;
        const state: string = scope.webcast.state + 'StateData';
        buildPlayer();

        function buildPlayer(): void {
          bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');
          checkIsPlayerLoaded();
          bitmovinPlayer
            .setup(config)
            .then(() => {
              bitmovinUIManager = $window.window.bitmovin.playerui.UIManager.Factory;
              if (isAudioOnly()) {
                bitmovinUIManager.buildAudioOnlyUI(bitmovinPlayer);
                setAudioOnlyStillImage();
              } else {
                bitmovinUIManager.buildAudioVideoUI(bitmovinPlayer);
              }

              if (state === 'liveStateData') {
                angular.element(getElementsByClassName('bmpui-seekbar')).css('display', 'none');
              }
              bitmovinControlbar = getElementsByClassName('bitmovinplayer-container');
              if (angular.isDefined(bitmovinControlbar)) {
                bitmovinControlbar.style.minWidth = '175px';
                bitmovinControlbar.style.minHeight = '101px';
                document.getElementById('bitmovinplayer-video-mi-bitdash-player').setAttribute('title', webcast.name);
              }
            }, (reason: { code: number, message: string}) => {
              console.log('Error: ' + reason.code + ' - ' + reason.message);
            });
        }

        function checkIsPlayerLoaded(): void {
          if (angular.isDefined(bitmovinPlayer) && bitmovinPlayer.isReady() === true) {
            bitmovinPlayer.destroy();
            bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');
          }
        }

        function isAudioOnly(): boolean {
          return angular.isDefined(scope.webcast[state].playout.audioOnly) &&
            scope.webcast[state].playout.audioOnly;
        }

        function setAudioOnlyStillImage(): void {
          if (angular.isDefined(scope.webcast[state].playout.audioOnlyStillUrl) &&
            scope.webcast[state].playout.audioOnlyStillUrl !== '') {
            const element = getElementsByClassName('bmpui-ui-audioonly-overlay') as IMyElement;
            element.style.backgroundImage = 'url(' + scope.webcast[state].playout.audioOnlyStillUrl + ')';
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

BitdashDirective.$inject = ['$window'];
