'use strict';

/**
 * @ngInject
 */

module.exports = angular
  .module('mi.BitdashPlayer', ['mi/template/bitdash-player.html'])

  // controller ////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('MiBitdashController', ['$scope', '$log', function ($scope, $log) {
    var vm = this;

    // copy the basic config ... key is mandatory
    vm.config = {};
    if (angular.isDefined($scope.config) && angular.isDefined($scope.config.key)) {
      vm.config = $scope.config;
    } else {
      $log.error('basic config for bitdash player is missing!');
    }

    // check webcast to expand and manipulate the basic bitdash player config
    if (angular.isDefined($scope.webcast)) {
      processWebcast($scope.webcast);
    }

    // player config ===================================================================================================

    function processWebcast(webcast) {
      vm.config.source = getPlayerConfigSource(webcast);
      vm.config.style = getPlayerConfigStyle(webcast);
    }

    // player config - source ------------------------------------------------------------------------------------------

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

    // player config - style -------------------------------------------------------------------------------------------

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

  }])

  // directive /////////////////////////////////////////////////////////////////////////////////////////////////////////
  .directive('miBitdashPlayer', ['$window', '$log', function ($window, $log) {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'MiBitdashController',
      controllerAs: 'mimimi',
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || 'mi/template/bitdash-player.html';
      },
      scope: {
        config: '=',
        webcast: '='
      },
      link: function (scope) {
        $log.info('miBitdashPlayer ... loaded');

        var config = scope.config;  // die config wird automatisch durch den controller erweitert
        var player = $window.window.bitdash('mi-bitdash-player');

        // $log.warn(' player.isSetup :', player.isSetup());
        // $log.warn(' player.isReady :', player.isReady());

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

        if (flashForce) {
          player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
        } else {
          player.setup(config);
        }
      }
    };
  }])

;


angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('mi/template/bitdash-player.html',
    '<div id="mi-bitdash-player"></div>'
  );
}]);
