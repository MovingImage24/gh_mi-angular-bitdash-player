declare const angular;
import {IBitdashDirective, IBitmovinUIManager, IMyElement, IPlayer} from '../interface/interfaces';
import BitdashDirective from '../src/bitdash-directive';

interface IRootScope extends angular.IRootScopeService {
  webcastMainVm: any;
}

describe('BitdashDirective', () => {
  let $q: angular.IQService;
  let $compile: angular.ICompileService;
  let $rootScope: IRootScope;
  let $log: angular.ILogService;
  let template: string = `<mi-bitdash-player config="webcastMainVm.playerConfig" webcast="webcastMainVm.webcast"></mi-bitdash-player>`;
  let configMock;

  const playerFuncSpy: string [] = ['isReady', 'setup', 'destroy', 'initSession'];
  const playerUISpy: string [] = ['buildAudioOnlyUI', 'buildAudioVideoUI'];
  const bitmovinPlayer = jasmine.createSpyObj('player', playerFuncSpy);
  const Factory: IBitmovinUIManager = jasmine.createSpyObj('Factory', playerUISpy);
  const windowSpy = {window: {
                            bitmovin: {
                              initHiveSDN: () => true,
                              player: () => bitmovinPlayer as IPlayer,
                              playerui: {UIManager: {Factory}}
                            }
                          }
                        };
  const documentSpy: angular.IAugmentedJQuery = angular
    .element(document)
    .find('body')
    .append(`<div class="bitmovinplayer-container" style="min-width:195px; min-height:140px;">
                             <div class="mi-wbc-ui-audioonly-overlay"
                                style="background-image:url(data:image);background-size:contain;background-position:center;">
                                <video id="bitmovinplayer-video-mi-bitdash-player"></video>
                             </div>
                          </div>`);

  beforeEach(() => {
    angular.mock.module(($compileProvider: any, $controllerProvider: any, $provide: any) => {
        $compileProvider.directive('miBitdashPlayer', BitdashDirective);
        $controllerProvider.register('MiBitdashController', () => { return; });
        $provide.value('document', documentSpy);
        $provide.value('$window', windowSpy);
    });
    angular.mock.inject(($injector: angular.auto.IInjectorService) => {
        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope') as IRootScope;
        $log = $injector.get('$log');
    });

    configMock = {
      foo: 'bar',
      source: {
        hiveServiceUrl: null
      }
    };

    $rootScope.webcastMainVm = {
      playerConfig: configMock,
      state: {
        data: {
          playout: {
            audioOnly: false
          }
        }
      },
      webcast: {
        liveStateData: {
          playout: {
            audioOnly: false
          }
        },
        postliveStateData: {
          playout: {
            audioOnly: false
          }
        },
        state: 'postlive'
      }
    };
    bitmovinPlayer.setup.and.returnValue($q.when({}));
    bitmovinPlayer.isReady.and.returnValue(true);
  });

  fit('Should failed to set up the player', () => {
    spyOn(document, 'getElementsByClassName').and.callThrough();
    spyOn($log, 'log').and.callThrough();
    bitmovinPlayer.setup.and.returnValue($q.reject({code: 404, message: 'stream not found'}));
    bitmovinPlayer.isReady.and.returnValue(false);
    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(bitmovinPlayer.destroy).not.toHaveBeenCalled();
    expect(document.getElementsByClassName).not.toHaveBeenCalled();
    expect(Factory.buildAudioVideoUI).not.toHaveBeenCalled();
    expect($log.log).toHaveBeenCalledWith('Error: 404 - stream not found');
  });

  it('Should set up the player for video audio', () => {
    spyOn(document, 'getElementsByClassName').and.callThrough();
    spyOn(document, 'getElementById').and.callThrough();
    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(bitmovinPlayer.destroy).toHaveBeenCalled();
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(document.getElementsByClassName).toHaveBeenCalledWith('bitmovinplayer-container');
    expect(document.getElementsByClassName).not.toHaveBeenCalledWith('mi-wbc-ui-audioonly-overlay');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minWidth).toEqual('175px');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minHeight).toEqual('101px');
    expect(Factory.buildAudioVideoUI).toHaveBeenCalledWith(bitmovinPlayer);
    expect(document.getElementById).toHaveBeenCalledWith('bitmovinplayer-video-mi-bitdash-player');
  });

  it('Should set up the player for audio only', () => {
    spyOn(document, 'getElementsByClassName').and.callThrough();
    $rootScope.webcastMainVm.playerConfig.stateData.playout.audioOnly =  true;
    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(bitmovinPlayer.destroy).toHaveBeenCalled();
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minWidth).toEqual('175px');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minHeight).toEqual('101px');
    expect(Factory.buildAudioOnlyUI).toHaveBeenCalledWith(bitmovinPlayer);
  });

  it('Should set up the player for audio only with default StillImageUrl', () => {
    spyOn(document, 'getElementsByClassName').and.callThrough();
    $rootScope.webcastMainVm.playerConfig.stateData.playout.audioOnly =  true;
    $rootScope.webcastMainVm.playerConfig.stateData.playout.audioOnlyStillUrl = 'https://www.ima.ge/image.jpg';
    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(bitmovinPlayer.destroy).toHaveBeenCalled();
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(2);
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minWidth)
      .toEqual('175px');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minHeight)
      .toEqual('101px');
    expect(Factory.buildAudioOnlyUI).toHaveBeenCalledWith(bitmovinPlayer);
    expect((document.getElementsByClassName('mi-wbc-ui-audioonly-overlay')[0] as IMyElement).style.backgroundImage)
      .toEqual('url(https://www.ima.ge/image.jpg)');
    expect((document.getElementsByClassName('mi-wbc-ui-audioonly-overlay')[0] as IMyElement).style.backgroundSize)
      .toEqual('contain');
    expect((document.getElementsByClassName('mi-wbc-ui-audioonly-overlay')[0] as IMyElement).style.backgroundPosition)
      .toEqual('50% 50%');
  });

  it('Should set up the player video audio without options attribute', () => {
    spyOn(document, 'getElementsByClassName').and.callThrough();
    const element = $compile(template)($rootScope);
    $rootScope.$apply();
    const scope = element.isolateScope() as IBitdashDirective;
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(Factory.buildAudioOnlyUI).toHaveBeenCalledWith(bitmovinPlayer);
    expect(scope.options).toBeUndefined();
  });

  it('Should set up the player video audio with options and forced state', () => {
    spyOn(document, 'getElementsByClassName').and.callThrough();
    template = '<mi-bitdash-player config="webcastMainVm.playerConfig" ' +
                                  'webcast="webcastMainVm.webcast" ' +
                                  'options="webcastMainVm.options">' +
               '</mi-bitdash-player>';
    $rootScope.webcastMainVm.options = {forcedState: 'live'};
    const element = $compile(angular.element(template))($rootScope);
    $rootScope.$apply();
    const scope = element.isolateScope() as IBitdashDirective;
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(Factory.buildAudioOnlyUI).toHaveBeenCalledWith(bitmovinPlayer);
    expect(scope.options).toBeDefined();
    expect(scope.options.forcedState).toBe('live');
  });

  it('Should hide seekbar by live', () => {
    spyOn(document, 'getElementsByClassName').and.callThrough();
    $rootScope.webcastMainVm.webcast = {
      liveStateData: {
        playout: {
          audioOnly: false
        }
      },
      state: 'live'
    };
    $compile(angular.element(template))($rootScope);
    $rootScope.$apply();
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(Factory.buildAudioVideoUI).toHaveBeenCalledWith(bitmovinPlayer);
  });

  it('Should fails to load player for hive stream', () => {
    bitmovinPlayer.initSession.and.returnValue($q.reject({code: 345, message: 'connection failed'}));
    $rootScope.webcastMainVm.webcast.state = 'live';
    $rootScope.webcastMainVm.webcast.liveStateData.playout.audioOnly = false;
    $rootScope.webcastMainVm.playerConfig.source.hiveServiceUrl = 'https://api-test.hivestreaming.com/v1/events/9021/597f';
    configMock.source.hiveServiceUrl = 'https://api-test.hivestreaming.com/v1/events/9021/597f';
    spyOn(document, 'getElementsByClassName').and.callThrough();
    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(bitmovinPlayer.destroy).toHaveBeenCalled();
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(document.getElementsByClassName).toHaveBeenCalledWith('bitmovinplayer-container');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minWidth).toEqual('175px');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minHeight).toEqual('101px');
    expect(Factory.buildAudioVideoUI).toHaveBeenCalledWith(bitmovinPlayer);
  });

  it('Should load player for hive stream', () => {
    bitmovinPlayer.initSession.and.returnValue($q.when({manifest: 'https://api-hive.hive'}));
    $rootScope.webcastMainVm.webcast.state = 'live';
    $rootScope.webcastMainVm.webcast.liveStateData.playout.audioOnly = false;
    $rootScope.webcastMainVm.playerConfig.source.hiveServiceUrl = 'https://api-test.hivestreaming.com/v1/events/9021/597f';
    configMock.source.hiveServiceUrl = 'https://api-test.hivestreaming.com/v1/events/9021/597f';
    configMock.source.hls = 'https://api-hive.hive';
    spyOn(document, 'getElementsByClassName').and.callThrough();
    $compile(template)($rootScope);
    $rootScope.$apply();
    expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
    expect(bitmovinPlayer.destroy).toHaveBeenCalled();
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
    expect(document.getElementsByClassName).toHaveBeenCalledWith('bitmovinplayer-container');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minWidth).toEqual('175px');
    expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minHeight).toEqual('101px');
    expect(Factory.buildAudioVideoUI).toHaveBeenCalledWith(bitmovinPlayer);
  });

});
