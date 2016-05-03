'use strict';

var BitdashController = require('./../src/bitdash-controller');

describe('BitdashController', function () {

  var createController, locals, $log, $scope;

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      var $controller = $injector.get('$controller');
      $log = $injector.get('$log');
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

  it('should init the Contoller', function () {
    var vm = createController();
    expect(vm.config.key).toEqual($scope.config.key);
    expect($scope.config.key).toBeDefined();
  });

  it('should get the player key configuration', function() {
    $scope.config.key = undefined;
    var vm = createController();
    expect(vm.config.key).toBeUndefined();
  });

  it('should manipulate the player configuration', function() {
    $scope.webcast = undefined;
    var vm = createController();
    expect(vm.webcastEnv).toBeUndefined();
  });

  it('should configure the player to only audio stream', function() {
    $scope.webcast.audioOnly = true;
    createController();
    expect($scope.webcast.audioOnly).toBeDefined();
  });

  it('should configure the player DVR Record in postlive', function() {
    $scope.webcast.useDVRPlaybackInPostlive = true;
    createController();
    expect($scope.webcast.useDVRPlaybackInPostlive).toBeTruthy();
  });

});
