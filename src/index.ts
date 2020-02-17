import * as angular from 'angular';
import { HiveBitmovin } from './../lib/hive/bitmovin.java.hivejs.hive.min';
import { ksdn } from './../lib/kollective/kollective-sdn-1.1.0.min';
import { BitmovinPlayerController } from './bitmovin-player.controller';
import { BitmovinPlayerDirective } from './bitmovin-player.directive';

export default angular.module('mi.BitdashPlayer', [])
  .controller('MiBitdashController', BitmovinPlayerController)
  .directive('miBitdashPlayer', BitmovinPlayerDirective)
  .factory('ksdn', () => ksdn)
  .factory('HiveBitmovin', () => HiveBitmovin)
  .factory('YouboraLib', () => require('youboralib'))
  .factory('YouboraAdapter', () => require('youbora-adapter-bitmovin'))
;
