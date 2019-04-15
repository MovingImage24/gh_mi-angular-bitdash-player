import * as angular from 'angular';
import { ksdn } from './../lib/kollective/kollective-sdn-1.1.0.min';
import { BitmovinPlayerController } from './bitmovin-player.controller';
import { BitmovinPlayerDirective } from './bitmovin-player.directive';

require('youbora-adapter-bitmovin');

export default angular.module('mi.BitdashPlayer', [])
  .controller('MiBitdashController', BitmovinPlayerController)
  .directive('miBitdashPlayer', BitmovinPlayerDirective)
  .factory('ksdn', () => ksdn)
  .factory('youbora', () => require('youboralib'))
;
