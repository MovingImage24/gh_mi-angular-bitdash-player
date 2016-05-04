'use strict';

var BitdashController = require('./../src/bitdash-controller');

describe('BitdashController', function () {

  var createController, locals, $log, $scope;

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      var $controller = $injector.get('$controller');
      $log = jasmine.createSpyObj('$log', ['error']);
      $scope = {config: {key: '123456879'},
        webcast: {
          id: '570b9ab86b756510008b4578',
          name: 'Webcast Excample (3)',
          customer: {id: '570b9ab86b756510008b4567', name: 'MovingIMAGE24 GmbH', 'type': 'admin'},
          state: 'postlive',
          preliveStateData: {
            playout: {
              hdsUrl: 'http://download.cdn.edge-cdn.net/videodb/519/videodb_519_53393_7971020_16x9_fh.mp4',
              hlsUrl: 'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_53393_7971020_16x9_hq.mp4/' +
              'master.m3u8',
              dashUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd'
            }
          },
          postliveStateData: {
            playout: {
              hdsUrl: 'http://download.cdn.edge-cdn.net/videodb/519/videodb_519_76439_7579412_16x9_hd.mp4',
              hlsUrl: 'http://hd2.cdn.edge-cdn.net/i/videodb/519/videodb_519_76439_7579412_16x9_hd.mp4/' +
              'master.m3u8',
              dashUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd'
            }
          },
          liveStateData: {
            playout: {
              hdsUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/manifest.f4m',
              hlsUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/master.m3u8',
              dashUrl: 'https://live-origin.edge-cdn.net/webcast/myStream/manifest.mpd'
            },
            broadcast: {
              serverUrl: 'rtmp://live-ingest.edge-cdn.net:1935/webcast/',
              streamName: 'myStream'
            }
          },
          theme: {
            logoUrl: 'https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png',
            backgroundColor: '#ffffff'
          },
          showDataminerForm: false,
          showQnA: false,
          showChat: true,
          showSlides: true,
          useDVRPlaybackInPostlive: false
        }
      };
      locals = {
        $scope: $scope,
        $log: $log
      };
      createController = function () {
        return $controller(BitdashController, locals);
      };
    });
  });

  it('should throw an error because of the missing config', function() {
    $scope.config = undefined;
    createController();
    expect($log.error).toHaveBeenCalledWith('basic config for bitdash player is missing!');
  });

  it('should init the Controller', function () {
    var vm = createController();
    expect(vm.config).toEqual($scope.config);
    expect($scope.config.key).toBeDefined();
    expect(vm.config.source.hls).toBe('http://hd2.cdn.edge-cdn.net/i/videodb/519/' +
      'videodb_519_76439_7579412_16x9_hd.mp4/master.m3u8');
    expect(vm.config.style.autoHideControls).toBeTruthy();
    expect(vm.config.style.aspectratio).toBe('16:9');

  });


  it('should configure the player DVR Record in postlive', function () {
    $scope.webcast.useDVRPlaybackInPostlive = true;
    var vm = createController();
    expect(vm.config.source.hls).toContain('Dvr/master.m3u8?DVR');
  });

  it('should configure the player to only audio stream with in postlive', function() {
    $scope.webcast.postliveStateData.playout.audioOnly = true;
    $scope.webcast.postliveStateData.playout.audioOnlyStillUrl = 'https://www.ima.ge/image.jpg';
    var vm = createController();
    expect(vm.config.style.autoHideControls).toBeFalsy();
    expect($scope.audioOnlyStillImageUrl).toMatch('https://www.ima.ge/image.jpg');
    expect(vm.config.style.aspectratio).toBeUndefined();
  });

  it('should configure the player to only audio stream with default image in postlive', function() {
    $scope.webcast.postliveStateData.playout.audioOnly = true;
    var vm = createController();
    expect(vm.config.style.autoHideControls).toBeFalsy();
    expect($scope.audioOnlyStillImageUrl).toContain('data:image/jpeg;base64,');
    expect(vm.config.style.aspectratio).toBeUndefined();
  });
});
