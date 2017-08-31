declare const angular;
import BitdashController from './../src/bitdash-controller';

describe('BitdashController', () => {
  let createController: any,
      locals: object = {},
      $log: angular.ILogService,
      $controller: angular.IControllerService,
      $scope: any;

  beforeEach(() => {
    angular.mock.inject(($injector: ng.auto.IInjectorService) => {
      $controller = $injector.get('$controller');
      $log = jasmine.createSpyObj('$log', ['error']);
      $scope = {
        config: {key: '123456879'},
        webcast: {
          customer: {id: '570b9ab86b756510008b4567', name: 'MovingIMAGE24 GmbH', type: 'admin'},
          id: '570b9ab86b756510008b4578',
          language: 'de',
          languages: [
            {
              downloadablePresentation: {id: '5980695293768a02487b519e'},
              hiveServiceUrl: 'https://api-test.hivestreaming.com/v1/events/9021/597f2ca593768a02465dGxK',
              hiveTicketId: 'sohJ3g8isHjlJGxK',
              language: 'de',
              presentations: []
            }
          ],
          liveStateData: {
            broadcast: {
              serverUrl: 'rtmp://live-ingest.edge-cdn.net:1935/webcast/',
              streamName: 'myStream'
            },
            playout: {
              dashDvrUrl: 'https://dashdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR',
              dashUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd',
              hlsDvrUrl: 'https://hlsdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR',
              hlsUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8'
            }
          },
          name: 'Webcast Excample (3)',
          postliveStateData: {
            playout: {
              dashUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd',
              hlsUrl: 'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8',
              offset: 0
            }
          },
          preliveStateData: {
            playout: {
              dashUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd',
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
      locals = {$scope, $log};
      createController = () => $controller(BitdashController, locals);
    });
  });

  it('should throw an error because of the missing config', () => {
    $scope.config = undefined;
    const vm = new createController();
    vm.$onInit();
    expect(vm.$log.error).toHaveBeenCalledWith('basic config for bitdash player is missing!');
  });

  it('should init the Controller', () => {
    const vm = new createController();
    vm.$onInit();
    expect(vm.config).toEqual($scope.config);
    expect($scope.config.key).toBeDefined();
    expect(vm.config.source.hls).toBe(
      'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8'
    );
    expect(vm.config.source.hiveServiceUrl).toBe('https://api-test.hivestreaming.com/v1/events/9021/597f2ca593768a02465dGxK');
    expect(vm.config.source.title).toBe('Webcast Excample (3)');
  });

  it('should not add getHiveServiceUrl to config object', () => {
    $scope.webcast.useDVRPlaybackInPostlive = true;
    $scope.webcast.language = 'es';
    const vm = new createController();
    vm.$onInit();
    expect(vm.config).toEqual($scope.config);
    expect(vm.config.key).toBeDefined();
    expect(vm.config.source.hls).toBe('https://hlsdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR');
    expect(vm.config.source.hiveServiceUrl).toBeUndefined();
    expect(vm.config.source.title).toBe('Webcast Excample (3)');
  });

  it('should configure the player DVR Record in postlive', () => {
    $scope.webcast.useDVRPlaybackInPostlive = true;
    const vm = new createController();
    vm.$onInit();
    expect(vm.config.source.hiveServiceUrl).toBeUndefined();
    expect(vm.config.source.hls).toContain('Dvr/playlist.m3u8?DVR');
  });

  it('should configure the player without forced state', () => {
    const vm = new createController();
    vm.$onInit();
    expect(vm.config.source.hls).toBe('http://hd2.cdn.edge-cdn.net/i/videodb/519/' +
      'videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8');
    expect(vm.config.source.dash).toBe('https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd');
  });

  it('should configure the player with vmpro HLS URL', () => {
    $scope.webcast.liveStateData.playout.videoManagerHlsUrl = $scope.webcast.liveStateData.playout.hlsUrl;
    $scope.options = {forcedState: 'live'};
    const vm = new createController();
    vm.$onInit();
    expect(vm.config.source.hls).toBe('https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8');
  });

  it('should configure the player with offset', () => {
    $scope.webcast.postliveStateData.playout.offset = 10;
    const vm = new createController();
    vm.$onInit();
    expect(vm.config.source.hls).toBe(
      'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8?start=10'
    );
    expect(vm.config.source.dash).toBe('https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd?start=10');
  });

  it('should configure the player with offset and existing query string', () => {
    $scope.webcast.postliveStateData.playout.offset = 10;
    $scope.webcast.postliveStateData.playout.hlsUrl += '?sth';
    $scope.webcast.postliveStateData.playout.dashUrl += '?sth';
    const vm = new createController();
    vm.$onInit();
    expect(vm.config.source.hls).toBe('http://hd2.cdn.edge-cdn.net/i/videodb/519/' +
      'videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8?sth&start=10');
    expect(vm.config.source.dash).toBe('https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd?sth&start=10');
  });

  it('should configure the player in DVR with offset', () => {
    $scope.webcast.useDVRPlaybackInPostlive = true;
    $scope.webcast.postliveStateData.playout.offset = 10;
    const vm = new createController();
    vm.$onInit();
    expect(vm.config.source.hls).toBe(
      'https://hlsdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR&wowzadvrplayliststart=10000'
    );
    expect(vm.config.source.dash).toBe(
      'https://dashdvr-origin.edge-cdn.net/webcast/myStreamDvr/playlist.m3u8?DVR&wowzadvrplayliststart=10000'
    );
  });

  it('should configure the player with forced live state', () => {
    $scope.options = {forcedState: 'live'};
    const vm = new createController();
    vm.$onInit();
    expect(vm.config.source.hls).toBe('https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8');
    expect(vm.config.source.dash).toBe('https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd');
  });

});
