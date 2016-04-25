'use strict';

var BitdashDirective = require('./../src/bitdash-directive');

describe('BitdashDirective', function () {

    var $compile, $rootScope, scope, elem, template, $templateCache, windowmock;

    beforeEach(function () {
        windowmock = jasmine.createSpy('$window');
        angular.mock.module(function ($compileProvider, $provide) {
            $compileProvider.directive('bitdash-directive', BitdashDirective);
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
            scope.webcast = {
                name: 'MovingImage24'
            };
            elem = $compile(template)(scope);
            scope.$digest();
        });
    });


    it('should init the directive', function () {
        //console.log($compile(template)($scope));
        expect(angular.element(elem).attr('config')).toBeDefined();
        //expect(angular.element(elem).getAttribute('mi-bitdash-player').name).toBe('mi-bitdash-player');
        //expect(elem.html()).toContain($scope.webcast.name);
        //expect(elem.isolateScope().webcast).toEqual($scope.webcast);
        //expect(angular.element(elem).getAttributeNode('mi-bitdash-player').name).toBe('mi-bitdash-player');
    });
});