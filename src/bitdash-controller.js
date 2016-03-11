'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $log) {
  var vm = this;
  // controllerAs -> bitdashVm
  vm.whoosah = 'hyper hyper'; // ToDo remove after implement some logical stuff ... currently only for tests

  $log.info('bitdash player - controller "bitdashVm" loaded');
  $log.info('config: ', $scope.config);
  $log.info('webcast: ', $scope.webcast);
};
