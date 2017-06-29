import * as angular from 'angular';
import BitdashController from './bitdash-controller';
import BitdashDirective from './bitdash-directive';

const moduleName = 'mi.BitdashPlayer';
export default angular.module(moduleName, [])
                                   .controller('MiBitdashController', BitdashController)
                                   .directive('miBitdashPlayer', BitdashDirective);