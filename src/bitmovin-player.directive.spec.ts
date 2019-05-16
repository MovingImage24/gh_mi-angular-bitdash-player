import * as ng from 'angular';

import { BitmovinPlayerDirective, deps } from './bitmovin-player.directive';
import { PlayerApi } from './player-api';
import { PlayerPlaybackType } from './player-playback.type';
import { SubtitlesPlugin } from './plugins';
import SpyObj = jasmine.SpyObj;

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
  let youboraPlugin: any;
  let youboraBitmovinAdapter: any;
  let windowSpy: any;
  let bitmovinPlayer: any;
  let bitmovinUiFactory: any;
  let createComponent: () => void;
  let subtitlesPlugin: SpyObj<SubtitlesPlugin>;
  let playerApi: SpyObj<PlayerApi>;

  beforeEach(() => {
    const playerFuncSpy: string [] = ['setup', 'load', 'destroy', 'addEventHandler', 'unload'];
    const playerUISpy: string [] = ['buildAudioOnlyUI', 'buildAudioVideoUI'];
    bitmovinPlayer = jasmine.createSpyObj('player', playerFuncSpy);
    bitmovinUiFactory = jasmine.createSpyObj('Factory', playerUISpy);

    subtitlesPlugin = jasmine.createSpyObj<SubtitlesPlugin>('SubtitlesPlugin', ['init', 'destroy']);
    playerApi = jasmine.createSpyObj<PlayerApi>('PlayerApi', ['setupPlugins', 'destroy', 'load']);
    playerApi.load.and.returnValue(Promise.resolve({ hls: 'hls-url' }));

    bitmovinPlayer.EVENT = {
      ON_PLAY: 'ON_PLAY',
      ON_PLAYBACK_FINISHED: 'ON_PLAYBACK_FINISHED',
      ON_TIME_CHANGED: 'ON_TIME_CHANGED',
    };

    controllerVm = { playerSource: null };
    configMock = {};
    ksdnSpy = jasmine.createSpyObj('ksdnMock', ['play']);
    youboraPlugin = jasmine.createSpyObj('youboraPlugin', ['setAdapter']);
    youboraBitmovinAdapter = jasmine.createSpy('YouboraBitmovinAdapter');

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
      $provide.value('YouboraAdapter', () => youboraBitmovinAdapter);
      $provide.value('YouboraLib', {
        Plugin: () => youboraPlugin,
      });
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

    createComponent = () => {
      deps.SubtitlesPlugin = (jasmine.createSpy() as any).and.returnValue(subtitlesPlugin);
      deps.PlayerApi = (jasmine.createSpy() as any).and.returnValue(playerApi);

      $compile(template)($rootScope);
      $rootScope.$apply();
    };
  });

  it('should do nothing when no playersource is set', () => {
    controllerVm.playerConfig = null;

    createComponent();

    expect(bitmovinPlayer.setup).not.toHaveBeenCalled();
    expect(bitmovinPlayer.load).not.toHaveBeenCalled();
  });

  it('should create default playback', () => {
    const expectedSource = { hls: 'hls-url' };
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      type: PlayerPlaybackType.DEFAULT,
    };

    createComponent();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(playerApi.load).toHaveBeenCalledWith(expectedSource);
    expect(windowSpy.document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(windowSpy.document.getElementsByClassName).toHaveBeenCalledWith('bitmovinplayer-container');
    expect(windowSpy.document.getElementsByClassName).not.toHaveBeenCalledWith('mi-wbc-ui-audioonly-overlay');
    expect(bitmovinUiFactory.buildAudioOnlyUI).toHaveBeenCalled();
  });

  it('should create default playback with controlbar', () => {
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      type: PlayerPlaybackType.DEFAULT,
    };

    createComponent();

    expect(windowSpy.document.getElementById).toHaveBeenCalledWith('bitmovinplayer-video-mi-bitdash-player');
    expect(bitmovinUiFactory.buildAudioOnlyUI).toHaveBeenCalled();
  });

  it('should create default playback with video ui', () => {
    $rootScope.webcastMainVm.webcast.layout.layout = 'video';
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      type: PlayerPlaybackType.DEFAULT,
    };

    createComponent();

    expect(windowSpy.document.getElementById).toHaveBeenCalledWith('bitmovinplayer-video-mi-bitdash-player');
    expect(bitmovinUiFactory.buildAudioVideoUI).toHaveBeenCalled();
  });

  it('should show error when default playback fails', () => {
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      type: PlayerPlaybackType.DEFAULT,
    };
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'error');

    createComponent();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.error).toHaveBeenCalledWith('player error:', 'error');
  });

  it('should create kollective playback', () => {
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      p2p: {
        host: 'host-1',
        token: 'token-1',
        urn: 'urn-1',
      },
      type: PlayerPlaybackType.KSDN,
    };

    createComponent();

    expect(ksdnSpy.play).toHaveBeenCalled();
  });

  it('should show error when kollective player setup fails', () => {
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      p2p: {
        host: 'host-1',
        token: 'token-1',
        urn: 'urn-1',
      },
      type: PlayerPlaybackType.KSDN,
    };
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'error');

    createComponent();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.error).toHaveBeenCalledWith('player error:', 'error');
  });

  it('should show default error when hive player setup fails', () => {
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      p2p: {
        url: 'url-1',
      },
      type: PlayerPlaybackType.HIVE,
    };
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'error');

    createComponent();

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.error).toHaveBeenCalledWith('player error:', 'error');
  });

  it('should show warning and reload with default player when hive plugin fails', () => {
    jasmine.clock().install();

    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      p2p: {
        url: 'url-1',
      },
      type: PlayerPlaybackType.HIVE,
    };
    windowSpy.window.bitmovin.initHiveSDN.and.callFake((player: any, options: any) => {
      options.HiveJava.onError();
    });
    bitmovinPlayer.setup.and.returnValue($q.reject('error'));
    spyOn($log, 'warn');

    createComponent();
    jasmine.clock().tick(60);

    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect($log.warn).toHaveBeenCalledWith('Hive plugin failed, fallback to default player. Error: error');
    expect(bitmovinPlayer.setup).toHaveBeenCalledTimes(2);

    jasmine.clock().uninstall();
  });

  it('should create subtitle plugin when video tracks available', () => {
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      type: PlayerPlaybackType.DEFAULT,
      videoTracks: [
        {
          language: 'en',
          country: '',
          label: 'English',
          source: 'https://a.video-cdn.net/-KV13jA92AKWUyvPxfs_Y1/2EKC8npRq6JAeCLycYNN5y.vtt',
          type: 'SUBTITLES'
        }
      ]
    };

    createComponent();

    expect(playerApi.setupPlugins).toHaveBeenCalledWith([subtitlesPlugin], null);
  });

  it('should not create subtitle plugin when no video tracks are available', () => {
    controllerVm.playerConfig = {
      hlsUrl: 'hls-url',
      type: PlayerPlaybackType.DEFAULT
    };

    createComponent();

    expect(playerApi.setupPlugins).not.toHaveBeenCalledWith(playerApi, [subtitlesPlugin]);
  });

});