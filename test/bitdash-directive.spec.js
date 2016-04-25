'use strict';

var BitdashDirective = require('../src/bitdash-directive');

describe('BitdashDirective', function () {

    var $compile, $rootScope, scope, elem, template, $templateCache, windowmock, bitdash,window, response;

    beforeEach(function () {
        //response = [{streaming: 'hls', player: 'flash'}];
        windowmock = jasmine.createSpy('$window');
        window = jasmine.createSpy('window');
        window.bitdash = function () {
            return {
                getSupportedTech: function () {
                    return response;
                },
                isReady: function() {
                    return true;
                },
                destroy: function() {
                    return true;
                },
                setup: function() {
                    return true;
                }
            }
        };
        windowmock = {
            window: window
        };

        angular.mock.module(function ($compileProvider, $provide) {
            $compileProvider.directive('miBitdashPlayer', BitdashDirective);
            $provide.factory('$window', function () {
                return windowmock;
            });
        });
        angular.mock.inject(function ($injector) {
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $templateCache = $injector.get('$templateCache');
            template = angular.element('<mi-bitdash-player config="webcastMainVm.playerConfig" ' +
              'webcast="webcastMainVm.webcast"></mi-bitdash-player>');
            $templateCache.put('mi/template/bitdash-player.html',
              '<div id="mi-bitdash-player"></div>'
            );
            scope = $rootScope.$new();
            elem = $compile(template)(scope);
            scope.$digest();
        });
    });

    it('should init the directive', function () {
        response = [{streaming: 'hls', player: 'flash'}];
        //console.log($compile(template)($scope));
        //expect(angular.element(elem).attr('config')).toBeDefined();
        //expect(angular.element(elem).getAttribute('mi-bitdash-player').name).toBe('mi-bitdash-player');
        //expect(elem.html()).toContain($scope.webcast.name);
        //expect(elem.isolateScope().webcast).toEqual($scope.webcast);
        //expect(angular.element(elem).getAttributeNode('mi-bitdash-player').name).toBe('mi-bitdash-player');
    });
    it('should init the directive2', function () {
       response = [{streaming: 'hls', player: 'native'}];
        //console.log($compile(template)($scope));
        //expect(angular.element(elem).attr('config')).toBeDefined();
        //expect(angular.element(elem).getAttribute('mi-bitdash-player').name).toBe('mi-bitdash-player');
        //expect(elem.html()).toContain($scope.webcast.name);
        //expect(elem.isolateScope().webcast).toEqual($scope.webcast);
        //expect(angular.element(elem).getAttributeNode('mi-bitdash-player').name).toBe('mi-bitdash-player');
    });


});