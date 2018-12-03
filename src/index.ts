import * as angular from 'angular';
import { ksdn } from './../lib/kollective/kollective-sdn-1.1.0.min';
import BitmovinController from './bitmovin-player.controller';
import BitmovinPlayerDirective from './bitmovin-player.directive';

export default angular.module('mi.BitdashPlayer', [])
  .controller('MiBitdashController', BitmovinController)
  .directive('miBitdashPlayer', BitmovinPlayerDirective)
  .factory('ksdn', () => ksdn)
;