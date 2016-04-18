'use strict';

/**
 * @ngInject
 */
module.exports = function ($log, $window) {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment
        replace: true,
        //controller: 'BitdashController',
        //controllerAs: 'bitdashVm',
        templateUrl: function (element, attrs) {
            return attrs.templateUrl || 'mi/template/bitdash-player.html';
        },
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            config: '=',
            webcast: '='
        },
        link: function (scope) {

            // copy the basic config ... key is mandatory
            var config = {};
            if (angular.isDefined(scope.config) && angular.isDefined(scope.config.key)) {
                config = scope.config;
            } else {
                $log.error('basic config for bitdash player is missing!');
            }

            // check webcast to expand and manipulate the basic bitdash player config
            if (angular.isDefined(scope.webcast)) {
                processWebcast(scope.webcast);
            }

            // player config ===========================================================================================

            function processWebcast(webcast) {
                config.source = getPlayerConfigSource(webcast);
                config.style = getPlayerConfigStyle(webcast);
            }

            // player config - source ----------------------------------------------------------------------------------

            function getPlayerConfigSource(webcast) {
                var stateProperty = webcast.state + 'StateData';
                return getPlayerConfigSourceByState(webcast, stateProperty);
            }

            function getPlayerConfigSourceByState(webcast, state) {
                return {
                    hls: webcast[state].playout.hlsUrl,
                    dash: webcast[state].playout.dashUrl
                };
            }

            // player config - style -----------------------------------------------------------------------------------

            function getPlayerConfigStyle(webcast) {
                var style = {
                    width: '100%',
                    autoHideControls: true
                };

                if (angular.isDefined(webcast.audioOnly) && webcast.audioOnly) {
                    style.autoHideControls = false;
                    style.height = '30px';
                } else {
                    style.aspectratio = '16:9';
                }

                return style;
            }

            // END OF CONTROLLER STUFF


            var internalCounter = 0;
            $log.warn('hit the bitdash directive - link');
            $log.warn('bitdash directive - C: ', internalCounter++);

            //var config = scope.bitdashVm.config;
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

            $log.info('before player.isReady: ', player);
            //$log.info('try player.isReady: ', player.isReady());
            // wenn man das teil doch nur re-rendern könnte ... so muss man das teil immer zerstören :(
            if (player.isReady()) {
                $log.warn('bitdash directive - C: ', internalCounter++);
                $log.info('Player already exists ... will destroy and reinit');  // ToDo remove after debugging
                player.destroy();
                player = $window.window.bitdash('mi-bitdash-player');
            }
            $log.info('after player.isReady');

            $log.warn('before player.setup - C: ', internalCounter++);
            if (flashForce) {
                $log.warn('flashForce - C: ', internalCounter++);
                player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
            } else {
                player.setup(config);
            }
            $log.warn('after player.setup - C: ', internalCounter++);
        }
    };
};


angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('mi/template/bitdash-player.html',
        '<div id="mi-bitdash-player"></div>'
    );
}]);
