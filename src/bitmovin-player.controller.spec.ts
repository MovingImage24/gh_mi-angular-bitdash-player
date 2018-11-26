import BitmovinPlayerController from './bitmovin-player.controller';
import { PreferredTech } from './preferred-tech.types';
import { WebcastState } from './webcast.state';

declare const angular;

describe('BitmovinPlayerController', () => {
  let $rootScope: angular.IRootScopeService;
  let createController: () => BitmovinPlayerController,
      locals: object = {},
      $log: angular.ILogService,
      $controller: angular.IControllerService,
      $scope: any;

  beforeEach(() => {
    angular.mock.inject(($injector: ng.auto.IInjectorService) => {
      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope') as angular.IRootScopeService;
      $log = jasmine.createSpyObj('$log', ['error']);
      $scope = {
        config: { key: '123456879' },
        webcast: {
          customer: { id: '570b9ab86b756510008b4567', name: 'MovingIMAGE24 GmbH', type: 'admin' },
          id: '570b9ab86b756510008b4578',
          language: 'de',
          languages: [
            {
              downloadablePresentation: { id: '5980695293768a02487b519e' },
              hiveTicketId: 'sohJ3g8isHjlJGxK',
              language: 'de',
              ondemandStateData: {
                playout: {
                  hlsUrl: 'http://ondemand/master.m3u8',
                  offset: 0
                }
              },
              presentations: []
            }
          ],
          liveStateData: {
            broadcast: {
              serverUrl: 'rtmp://live-ingest.edge-cdn.net:1935/webcast/',
              streamName: 'myStream'
            },
            playout: {
              hlsDvrUrl: 'https://hlsdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR',
              hlsUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8'
            }
          },
          name: 'Webcast Excample (3)',
          postliveStateData: {
            playout: {
              hlsUrl: 'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8',
              offset: 0
            }
          },
          preliveStateData: {
            playout: {
              hlsUrl: 'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_53393_7971020_16x9_hq.mp4/master.m3u8'
            }
          },
          showChat: true,
          showDataminerForm: false,
          showQnA: false,
          showSlides: true,
          state: 'postlive',
          theme: {
            backgroundColor: '#ffffff',
            logoUrl: 'https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png'
          },
          useDVRPlaybackInPostlive: false,
        }
      };
      locals = { $scope, $log };
      createController = (): BitmovinPlayerController => $controller(BitmovinPlayerController, locals);
    });
  });

  it('should throw an error because of the missing config', () => {
    $scope.config = undefined;
    const vm = createController();
    vm.$onInit();
    expect($log.error).toHaveBeenCalledWith('basic config for bitdash player is missing!');
  });

  it('should init the Controller', () => {
    $scope.webcast.state = WebcastState.LIVE;
    $scope.webcast.languages[0].hiveServiceUrl = 'https://api-test.hivestreaming.com/v1/events/9021/597f2ca593768a02465dGxK';

    const vm = createController();
    vm.$onInit();

    expect(vm.playerConfig).toEqual($scope.config);
    expect($scope.config.key).toBeDefined();
    expect(vm.state.data.preferredTech).toBe(PreferredTech.HIVE);
    expect(vm.state.data.hiveSettings.serviceUrl).toBe('https://api-test.hivestreaming.com/v1/events/9021/597f2ca593768a02465dGxK');
    expect(vm.state.data.hiveSettings.origHlsUrl).toBe('https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8');
    expect(vm.playerConfig.source.title).toBe('Webcast Excample (3)');
  });

  it('should not add getHiveServiceUrl to config object', () => {
    $scope.webcast.useDVRPlaybackInPostlive = true;
    $scope.webcast.language = 'es';

    const vm = createController();
    vm.$onInit();

    expect(vm.playerConfig).toEqual($scope.config);
    expect(vm.playerConfig.key).toBeDefined();
    expect(vm.playerConfig.source.hls).toBe('https://hlsdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR');
    expect(vm.state.data.hiveSettings).toBeNull();
    expect(vm.playerConfig.source.title).toBe('Webcast Excample (3)');
  });

  it('should configure the player DVR Record in postlive', () => {
    $scope.webcast.useDVRPlaybackInPostlive = true;

    const vm = createController();
    vm.$onInit();

    expect(vm.state.data.preferredTech).toBe(PreferredTech.DEFAULT);
    expect(vm.state.data.hiveSettings).toBeNull();
    expect(vm.playerConfig.source.hls).toContain('Dvr/playlist.m3u8?DVR');
  });

  it('should configure the player without forced state', () => {
    const vm = createController();
    vm.$onInit();
    expect(vm.playerConfig.source.hls).toBe('http://hd2.cdn.edge-cdn.net/i/videodb/519/' +
      'videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8');
  });

  it('should configure the player with vmpro HLS URL', () => {
    $scope.webcast.liveStateData.playout.videoManagerHlsUrl = $scope.webcast.liveStateData.playout.hlsUrl;
    $scope.options = { forcedState: 'live' };
    const vm = createController();
    vm.$onInit();
    expect(vm.playerConfig.source.hls).toBe('https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8');
  });

  it('should configure the player with offset', () => {
    $scope.webcast.postliveStateData.playout.offset = 10;
    const vm = createController();
    vm.$onInit();
    expect(vm.playerConfig.source.hls).toBe(
      'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8?start=10'
    );
  });

  it('should configure the player with offset and existing query string', () => {
    $scope.webcast.postliveStateData.playout.offset = 10;
    $scope.webcast.postliveStateData.playout.hlsUrl += '?sth';
    const vm = createController();
    vm.$onInit();
    expect(vm.playerConfig.source.hls).toBe('http://hd2.cdn.edge-cdn.net/i/videodb/519/' +
      'videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8?sth&start=10');
  });

  it('should configure the player in DVR with offset', () => {
    $scope.webcast.useDVRPlaybackInPostlive = true;
    $scope.webcast.postliveStateData.playout.offset = 10;
    const vm = createController();
    vm.$onInit();
    expect(vm.playerConfig.source.hls).toBe(
      'https://hlsdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR&wowzadvrplayliststart=10000'
    );
  });

  it('should configure the player with forced live state', () => {
    $scope.options = { forcedState: 'live' };
    const vm = createController();
    vm.$onInit();
    expect(vm.playerConfig.source.hls).toBe('https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8');
  });

  it('should configure the player in ondemand with valid language', () => {
    $scope.webcast.state = 'ondemand';
    $scope.webcast.languages.findIndex = jasmine.createSpy('findIndex').and.callFake(() => 0);

    const vm = createController();
    vm.$onInit();
    expect(vm.state.data).toEqual(
      {
        hiveSettings: null,
        playout: { hlsUrl: 'http://ondemand/master.m3u8', offset: 0 },
        preferredTech: PreferredTech.DEFAULT,
      });
  });

  it('should configure the player in ondemand with invalid language', () => {
    $scope.webcast.state = 'ondemand';
    $scope.webcast.languages.findIndex = jasmine.createSpy('findIndex').and.callFake(() => -1);

    const vm = createController();
    vm.$onInit();
    expect(vm.state.data).toEqual(
      {
        hiveSettings: null,
        playout: { hlsUrl: 'http://ondemand/master.m3u8', offset: 0 },
        preferredTech: PreferredTech.DEFAULT,
      });
  });

});
