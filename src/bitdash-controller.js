'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $log) {
  //var vm = this;
  // controllerAs -> bitdashVm
  $log.info('bitdash player - controller "bitdashVm" loaded');
  $log.info('config: ', $scope.config);
  $log.info('webcast: ', $scope.webcast);
};
