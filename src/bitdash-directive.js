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
            webcast: '='
        },
        link: function (scope) {
            var config = scope.config;  // die config wird automatisch durch den controller erweitert
            var player = $window.window.bitdash('mi-bitdash-player');

            // tech support - flash and hls
            var supportedTech = player.getSupportedTech();
            // force HLS / Flash playback if available
            var hlsTech = [];
            var flashForce = false;
            var cuepointsSupported = false;

            angular.forEach(supportedTech, function (tech) {
                if (tech.streaming === 'hls') {
                    hlsTech.push(tech.player + '.' + tech.streaming);
                }
            });

            if (hlsTech.indexOf('flash.hls') !== -1) {
                flashForce = true;
                cuepointsSupported = true;
            }

            if (hlsTech.indexOf('native.hls') !== -1) {
                flashForce = false;
                cuepointsSupported = true;
                // ToDo check for Android, Android does not support CuePoints via HTML5
            }

            if (player.isReady() && !flashForce) {
                // funktioniert derzeit nur für den NON-Flash ... flashie selbst fällt sehr laut hin ... Dreck
                player.destroy();
                player = $window.window.bitdash('mi-bitdash-player');
            }

            if (flashForce) {
                player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
            } else {
                player.setup(config);
            }

            if (angular.isDefined(scope.showAudioOnlyStillImage) && scope.showAudioOnlyStillImage) {
                var bitmovinControlbar = angular.element(document.getElementsByClassName('bitdash-vc'));
                bitmovinControlbar[0].style.minHeight = '30px';
            }
        }
    };
};




