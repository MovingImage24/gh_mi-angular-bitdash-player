import * as ng from 'angular';

import BitmovinPlayerDirective from './bitmovin-player.directive';
import { PlayerSourceType } from './player-source.type';

interface IRootScope extends ng.IRootScopeService {
  webcastMainVm: any;
}

describe('BitmovinPlayerDirective', () => {
  const template = `<mi-bitdash-player config="webcastMainVm.playerConfig" webcast="webcastMainVm.webcast"></mi-bitdash-player>`;
  let $q: ng.IQService;
  let $compile: ng.ICompileService;
  let $rootScope: IRootScope;
  let $log: ng.ILogService;
  let configMock: any;
  let controllerVm: any;
  let ksdnSpy: any;
  let windowSpy: any;
  let bitmovinPlayer: any;
  let bitmovinUiFactory: any;

  beforeEach(() => {
    const playerFuncSpy: string [] = ['setup', 'load', 'destroy', 'addEventHandler'];
    const playerUISpy: string [] = ['buildAudioOnlyUI', 'buildAudioVideoUI'];
    bitmovinPlayer = jasmine.createSpyObj('player', playerFuncSpy);
    bitmovinUiFactory = jasmine.createSpyObj('Factory', playerUISpy);

    controllerVm = { playerSource: null };
    configMock = {};
    ksdnSpy = jasmine.createSpyObj('ksdnMock', ['play']);

    const fakeHtmlElement = { style: { minWidth: 0, minHeight: 0, } };

    windowSpy = {
      document: {
        getElementById: jasmine.createSpy('getElementById').and.returnValue({
          setAttribute: jasmine.createSpy('setAttribute'),
        }),
        getElementsByClassName: jasmine.createSpy('getElementsByClassName').and.returnValue([fakeHtmlElement]),
      },
      window: {
        bitmovin: {
          initHiveSDN: jasmine.createSpy('initHiveSDN').and.returnValue(true),
          player: () => bitmovinPlayer,
        },
        miBitmovinUi: {
          playerui: {
            UIManager: {
              Factory: bitmovinUiFactory,
            }
          }
        },
      }
    };

    ng.mock.module(($compileProvider: any, $controllerProvider: any, $provide: any) => {
      $compileProvider.directive('miBitdashPlayer', BitmovinPlayerDirective);
      $controllerProvider.register('MiBitdashController', ($scope) => {
        $scope.vm = controllerVm;
        $scope.getAudioOnlyPlayerConfig = jasmine.createSpy('getAudioOnlyPlayerConfig');
        return $scope;
      });

      $provide.value('$window', windowSpy);
      $provide.value('ksdn', { Players: { Bitmovin: () => ksdnSpy } });
    });

    ng.mock.inject(($injector: ng.auto.IInjectorService) => {
      $q = $injector.get('$q');
      $compile = $injector.get('$compile');
      $rootScope = $injector.get('$rootScope').$new() as IRootScope;
      $log = $injector.get('$log');
    });

    $rootScope.webcastMainVm = {
      playerConfig: configMock,
      webcast: {
        layout: {
          layout: 'audio-only'
        },
        state: 'postlive',
        theme: {
          audioOnlyFileUrl: ''
        }
      }
    };

    bitmovinPlayer.setup.and.returnValue($q.when(bitmovinPlayer));
    bitmovinPlayer.load.and.returnValue($q.when(bitmovinPlayer));
  });

  it('should do nothing when no playersource is set', () => {
    controllerVm.playerSource = null;

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(bitmovinPlayer.setup).not.toHaveBeenCalled();
    expect(bitmovinPlayer.load).not.toHaveBeenCalled();
  });

  it('should create default playback', () => {
    const expectedSource = { hls: 'hls-url' };
    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      type: PlayerSourceType.DEFAULT,
    };

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(bitmovinPlayer.load).toHaveBeenCalledWith(expectedSource);
    expect(windowSpy.document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(windowSpy.document.getElementsByClassName).toHaveBeenCalledWith('bitmovinplayer-container');
    expect(windowSpy.document.getElementsByClassName).not.toHaveBeenCalledWith('mi-wbc-ui-audioonly-overlay');
    expect(bitmovinUiFactory.buildAudioOnlyUI).toHaveBeenCalled();
  });

  it('should create default playback with controlbar', () => {
    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      type: PlayerSourceType.DEFAULT,
    };

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(windowSpy.document.getElementById).toHaveBeenCalledWith('bitmovinplayer-video-mi-bitdash-player');
    expect(bitmovinUiFactory.buildAudioOnlyUI).toHaveBeenCalled();
  });

  it('should create default playback with video ui', () => {
    $rootScope.webcastMainVm.webcast.layout.layout = 'video';
    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      type: PlayerSourceType.DEFAULT,
    };

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(windowSpy.document.getElementById).toHaveBeenCalledWith('bitmovinplayer-video-mi-bitdash-player');
    expect(bitmovinUiFactory.buildAudioVideoUI).toHaveBeenCalled();
  });

  it('should show error when default playback fails', () => {
    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      type: PlayerSourceType.DEFAULT,
    };
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'error');

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.error).toHaveBeenCalledWith('player error:', 'error');
  });

  it('should create kollective playback', () => {
    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      p2p: {
        host: 'host-1',
        token: 'token-1',
        urn: 'urn-1',
      },
      type: PlayerSourceType.KSDN,
    };

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(ksdnSpy.play).toHaveBeenCalled();
  });

  it('should show error when kollective player setup fails', () => {
    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      p2p: {
        host: 'host-1',
        token: 'token-1',
        urn: 'urn-1',
      },
      type: PlayerSourceType.KSDN,
    };
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'error');

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.error).toHaveBeenCalledWith('player error:', 'error');
  });

  it('should show default error when hive player setup fails', () => {
    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      p2p: {
        url: 'url-1',
      },
      type: PlayerSourceType.HIVE,
    };
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'error');

    $compile(template)($rootScope);
    $rootScope.$apply();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.error).toHaveBeenCalledWith('player error:', 'error');
  });

  it('should show warning and reload with default player when hive plugin fails', () => {
    jasmine.clock().install();

    controllerVm.playerSource = {
      hlsUrl: 'hls-url',
      p2p: {
        url: 'url-1',
      },
      type: PlayerSourceType.HIVE,
    };
    windowSpy.window.bitmovin.initHiveSDN.and.callFake((player: any, options: any) => {
      options.HiveJava.onError();
    });
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'warn');

    $compile(template)($rootScope);
    $rootScope.$apply();
    jasmine.clock().tick(60);

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.warn).toHaveBeenCalledWith('Hive plugin failed, fallback to default player. Error: error');
    expect(bitmovinPlayer.setup).toHaveBeenCalledTimes(2);

    jasmine.clock().uninstall();
  });
});