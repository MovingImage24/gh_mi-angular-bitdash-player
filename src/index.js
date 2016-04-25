'use strict';

/**
 * @ngInject
 */

var BitdashController = require('./bitdash-controller'),
    BitdashDirective = require('./bitdash-directive');
module.exports = angular
    .module('mi.BitdashPlayer', ['mi/template/bitdash-player.html'])
    // controller /////////////////////////////////////////////////////////////////////////////////////////////////////
    .controller('MiBitdashController', BitdashController)
    // directive //////////////////////////////////////////////////////////////////////////////////////////////////////
    .directive('MiBitdashDirective', BitdashDirective);