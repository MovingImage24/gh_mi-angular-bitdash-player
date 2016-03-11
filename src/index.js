'use strict';

/**
 * @ngInject
 */

module.exports = angular
  .module('mi.BitdashPlayer', [
    // currently no dependencies ...
  ])

  // directive is missing
  .controller('BitdashController', require('./bitdash-controller'))

;
