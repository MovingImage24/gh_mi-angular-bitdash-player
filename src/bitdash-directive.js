'use strict';

/**
 * @ngInject
 */
module.exports = function ($log, $window) {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    replace: true,
    //bindToController: true,
    controller: 'BitdashController',
    controllerAs: 'bitdashVm',
    templateUrl: function (element, attrs) {
      return attrs.templateUrl || 'mi/template/bitdash-player.html';
    },
    scope: {
      //@ reads the attribute value, = provides two-way binding, & works with functions
      config: '=bitdashConfig',
      webcast: '=bitdashWebcast'
    },
    link: function (scope) {
      var config = scope.bitdashVm.config;
      var player = $window.window.bitdash('bitdash-player');

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

      // wenn man das teil doch nur re-rendern könnte ... so muss man das teil immer zerstören :(
      if (player.isReady()) {
        $log.info('Player already exists ... will destroy and reinit');  // ToDo remove after debugging
        player.destroy();
        player = $window.window.bitdash('bitdash-player');
      }


      if (flashForce) {
        player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
      } else {
        player.setup(config);
      }
      //player.setup(config);
    }
  };
};


angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('mi/template/bitdash-player.html',
    '<div id="bitdash-player"></div>'
  );
}]);