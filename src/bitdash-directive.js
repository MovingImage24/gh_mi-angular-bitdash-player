'use strict';

/**
 * @ngInject
 */
module.exports = function ($window) {
    // directive ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return {
        restrict: 'EA',
        replace: true,
        controller: 'MiBitdashController',
        controllerAs: 'bitdashVm',
        templateUrl: 'mi/template/bitdash-player.html',
        scope: {
            config: '=',
            webcast: '=',
            options: '=?'

        },
        link: function (scope) {
            var config = scope.config;  // die config wird automatisch durch den controller erweitert
            var player = $window.window.bitmovin.player('mi-bitdash-player');
            if (angular.isDefined(player) && player.isReady() === true) {
              player.destroy();
            }
            player = $window.window.bitmovin.player('mi-bitdash-player');
            player.setup(config);

            var state = scope.webcast.state + 'StateData';
            var bitmovinControlbar = angular.element(document.getElementsByClassName('bitmovinplayer-container'));
            if (bitmovinControlbar.length === 0) {
              bitmovinControlbar = angular.element(document.getElementsByClassName('bitdash-vc'));
            }

            if (angular.isDefined(scope.webcast[state].playout.audioOnly) && scope.webcast[state].playout.audioOnly) {
                bitmovinControlbar[0].style.minHeight = '30px';
                bitmovinControlbar[0].style.minWidth = '195px';
            } else {
              bitmovinControlbar[0].style.minWidth = '175px';
            }
        }
    };
};