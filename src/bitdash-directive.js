'use strict';

/**
 * @ngInject
 */
module.exports = function ($log, $window) {
  return {
    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
    replace: true,
    bindToController: true,
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
      var config = scope.config;

      //config.events = {
      //  onReady: function (data) {
      //    console.log('version: ' + this.getVersion() + ', onReady Event data: ', data);
      //  },
      //  onPlay: function (data) {
      //    // do awesome stuff
      //    console.log('here we go ...', data);
      //  },
      //  onError: function (data) {
      //    console.error('An error occurred:', data);
      //  }
      //};

      var player = $window.window.bitdash('bitdash-player');

      if (player.isReady()) {
        $log.info('Player already exists ... will destroy and reinit');  // ToDo remove after debugging
        player.destroy();
        player = $window.window.bitdash('bitdash-player');
      }

      $log.info(config);  // ToDo remove after debugging

      player.setup(config);
    }
  };
};


angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('mi/template/bitdash-player.html',
    '<div id="bitdash-player"></div>'
  );
}]);