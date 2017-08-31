import * as angular from 'angular';
import BitdashController from './bitdash-controller';
import BitdashDirective from './bitdash-directive';

export default angular.module('mi.BitdashPlayer', [])
                                   .controller('MiBitdashController', BitdashController)
                                   .directive('miBitdashPlayer', BitdashDirective);