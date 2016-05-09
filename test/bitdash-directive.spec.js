'use strict';

var BitdashDirective = require('./../src/bitdash-directive');

describe('BitdashDirective', function () {

  var template, player;
  template = '<mi-bitdash-player config="webcastMainVm.playerConfig"' +
    ' webcast="webcastMainVm.webcast"></mi-bitdash-player>';

  beforeEach(function () {
    var window = jasmine.createSpy('window');
    player = jasmine.createSpyObj('player', ['getSupportedTech', 'isReady', 'destroy', 'setup']);
    player.isReady.and.returnValue(true);
    window.bitdash = function () {
      return player;
    };

    var winMock = {window: window};
    var docMock = angular.element(document);
    docMock.find('body').append('<div class="bitdash-vc"></div>');
    angular.mock.module(function ($compileProvider, $controllerProvider, $provide) {
      $compileProvider.directive('miBitdashPlayer', BitdashDirective);
      $controllerProvider.register('MiBitdashController', function () {});
      $provide.value('document', docMock);
      $provide.value('$window', winMock);
    });
  });

  beforeEach(window.inject(function($templateCache) {
    $templateCache.put('mi/template/bitdash-player.html', '<div>' +
      '<div ng-show="showAudioOnlyStillImage" id="player-audioonly-still-div" width="100%" height="auto">' +
      '<img class="img-responsive" ng-src="{{audioOnlyStillImageUrl}}">' +
      '</div>' +
      '<div id="mi-bitdash-player" width="100%" height="auto"></div>' +
      '</div>');
  }));

  it('Should set up the player in flash mode', angular.mock.inject(function ($compile, $rootScope) {
    player.getSupportedTech.and.returnValue([{streaming: 'hls', player: 'flash'}]);
    $rootScope.webcastMainVm = {playerConfig: {foo: 'bar'}, webcast: {
      state: 'postlive',
      postliveStateData: {
        playout: {
          audioOnly: false
        }
      }
    }};

    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(player.getSupportedTech).toHaveBeenCalled();
    expect(player.destroy).not.toHaveBeenCalled();
    expect(player.setup).toHaveBeenCalledWith({foo: 'bar'}, 'flash.hls');
  }));

  it('Should set up the player in native mode', angular.mock.inject(function ($compile, $rootScope) {
    player.getSupportedTech.and.returnValue([{streaming: 'hls', player: 'native'}]);
    $rootScope.webcastMainVm = {playerConfig: {foo: 'bar'}, webcast: {
      state: 'postlive',
      postliveStateData: {
        playout: {
          audioOnly: false
        }
      }
    }};

    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(player.getSupportedTech).toHaveBeenCalled();
    expect(player.setup).toHaveBeenCalledWith({foo: 'bar'});
    expect(player.destroy).toHaveBeenCalledTimes(1);
  }));

  it('Should set up the player for audio only in flash mode', angular.mock.inject(function ($compile, $rootScope) {
    player.getSupportedTech.and.returnValue([{streaming: 'hls', player: 'flash'}]);
    $rootScope.webcastMainVm = {playerConfig: {foo: 'bar'}, webcast: {
      state: 'postlive',
      postliveStateData: {
        playout: {
          audioOnly: true
        }
      }
    }};

    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(player.getSupportedTech).toHaveBeenCalled();
    expect(player.destroy).not.toHaveBeenCalled();
    expect(player.setup).toHaveBeenCalledWith({foo: 'bar'}, 'flash.hls');
  }));
});