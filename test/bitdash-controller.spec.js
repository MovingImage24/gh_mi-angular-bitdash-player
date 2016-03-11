'use strict';

var BitdashController = require('./../src/bitdash-controller');

describe('BitdashController', function () {

  var createController, locals, $rootScope;
  var $scope;

  beforeEach(function () {
    angular.mock.module('mi.BitdashPlayer');
    angular.mock.inject(function ($injector) {
      var $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      locals = {
        $scope: $scope
      };
      createController = function () {
        return $controller(BitdashController, locals);
      };
    });
  });

  it('should init the Contoller', function () {
    var vm = createController();
    expect(vm.whoosah).toBe('hyper hyper');
  });

});
