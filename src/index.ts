import * as angular from 'angular';
import BitmovinController from './bitmovin-player.controller';
import BitmovinPlayerDirective from './bitmovin-player.directive';

export default angular.module('mi.BitdashPlayer', [])
                                   .controller('MiBitdashController', BitmovinController)
                                   .directive('miBitdashPlayer', BitmovinPlayerDirective);