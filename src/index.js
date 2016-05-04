'use strict';

/**
 * @ngInject
 */

var BitdashController = require('./bitdash-controller'),
    BitdashDirective = require('./bitdash-directive');
    module.exports = angular
        .module('mi.BitdashPlayer', ['mi/template/bitdash-player.html'])
        // controller /////////////////////////////////////////////////////////////////////////////////////////////////
        .controller('MiBitdashController', BitdashController)
        // directive //////////////////////////////////////////////////////////////////////////////////////////////////
        .directive('miBitdashPlayer', BitdashDirective);

    angular.module('mi/template/bitdash-player.html', [])
        .run(['$templateCache', function ($templateCache) {
          $templateCache.put('mi/template/bitdash-player.html', '<div>' +
            '<div ng-show="showAudioOnlyStillImage" id="player-audioonly-still-div" width="100%" height="auto">' +
            '<img class="img-responsive" ng-src="{{audioOnlyStillImageUrl}}">' +
            '</div>' +
            '<div id="mi-bitdash-player" width="100%" height="auto"></div>' +
            '</div>');
        }]);