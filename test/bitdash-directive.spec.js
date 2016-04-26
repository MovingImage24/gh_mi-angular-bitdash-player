'use strict';

var BitdashDirective = require('../src/bitdash-directive');

describe('BitdashDirective', function () {

    var $compile, $rootScope, scope, elem, template, $templateCache, windowmock, bitdash,window,
        response = [{streaming: 'hls', player: 'flash'}, {streaming: 'hls', player: 'native'}];

    beforeEach(function () {
        windowmock = jasmine.createSpy('$window');
        window = jasmine.createSpy('window');
        window.bitdash = function () {
            return {
                    getSupportedTech: function () {
                        return response;
                    },
                    isReady: function() {
                        return true;
                    },
                    destroy: function() {
                        return true;
                    },
                    setup: function() {
                        return true;
                    }
            }
        };
        windowmock = {
            window: window
        };

        angular.mock.module(function ($compileProvider, $provide) {
            $compileProvider.directive('miBitdashPlayer', BitdashDirective);
            $provide.factory('$window', function () {
                return windowmock;
            });
        });
        angular.mock.inject(function ($injector) {
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');

            $templateCache = $injector.get('$templateCache');
            $templateCache.put('mi/template/bitdash-player.html', '<div id="mi-bitdash-player"></div>');
            template = angular.element('<mi-bitdash-player config="config" webcast="webcast"></mi-bitdash-player>');
            scope = $rootScope.$new();
            scope.config= {key: '123456879'};
            scope.webcast= {
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
                    useDVRPlaybackInPostLive: false
                };
            elem = $compile(template)(scope);
            scope.$digest();
        });
    });

    it('should init the directive', function () {
        response = [{streaming: 'hds', player: 'native'}];
        console.log(elem.html());
        //console.log($compile(template)($scope));
        //expect(angular.element(elem).attr('config')).toBeDefined();
        //expect(angular.element(elem).getAttribute('mi-bitdash-player').name).toBe('mi-bitdash-player');
        //expect(elem.html()).toContain($scope.webcast.name);
        //expect(elem.isolateScope().webcast).toEqual($scope.webcast);
        //expect(angular.element(elem).getAttributeNode('mi-bitdash-player').name).toBe('mi-bitdash-player');
    });

    it('should init the directive2', function () {
        response = [{streaming: 'hls', player: 'flash'}];
        //console.log($compile(template)($scope));
        //expect(angular.element(elem).attr('config')).toBeDefined();
        //expect(angular.element(elem).getAttribute('mi-bitdash-player').name).toBe('mi-bitdash-player');
        //expect(elem.html()).toContain($scope.webcast.name);
        //expect(elem.isolateScope().webcast).toEqual($scope.webcast);
        //expect(angular.element(elem).getAttributeNode('mi-bitdash-player').name).toBe('mi-bitdash-player');
    });

    it('should init the directive2', function () {

    });




});