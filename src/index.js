'use strict';

/**
 * @ngInject
 */

module.exports = angular
  .module('mi.BitdashPlayer', [
    'mi/template/bitdash-player.html'
  ])

  .directive('bitdashPlayer', require('./bitdash-directive'))
  .controller('BitdashController', require('./bitdash-controller'))

;
