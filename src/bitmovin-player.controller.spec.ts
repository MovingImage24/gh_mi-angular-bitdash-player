import * as ng from 'angular';

import BitmovinPlayerController from './bitmovin-player.controller';
import { DirectiveScope, KollectivePlugin } from './models';
import { PlayerSourceType } from './player-source.type';
import { WebcastState } from './webcast.state';

describe('BitmovinPlayerController', () => {
  let $controller: any;
  let $rootScope: ng.IRootScopeService;
  let $log: ng.ILogService;
  let $scope: DirectiveScope;
  let createController: () => BitmovinPlayerController;
  let ksdn: KollectivePlugin;

  beforeEach(() => {
    ng.mock.inject(($injector: ng.auto.IInjectorService) => {
      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope') as ng.IRootScopeService;
      $log = jasmine.createSpyObj('$log', ['error']);
      ksdn = jasmine.createSpyObj('KollectiveApi', ['createPublicToken']);

      $scope = getScopeVariables();

      createController = (): BitmovinPlayerController => {
        const locals = { $scope, $log, ksdn };
        return $controller(BitmovinPlayerController, locals);
      };
    });
  });

  it('should throw an error because of the missing config', () => {
    $scope.config = null;

    const controller = createController();
    controller.$onInit();

    expect(controller.vm.playerSource).toBeNull();
    expect($log.error).toHaveBeenCalledWith('basic config for bitdash player is missing!');
  });

  it('should init Controller', () => {
    const controller = createController();
    controller.$onInit();

    expect(controller.vm.playerSource).toEqual({ hlsUrl: 'hls-123', type: PlayerSourceType.DEFAULT });
  });

  it('should select source by language', () => {
    $scope.webcast.language = 'de';
    $scope.webcast.languages = [
      { language: 'en', player: { hlsUrl: 'hls-1', type: PlayerSourceType.DEFAULT } },
      { language: 'de', player: { hlsUrl: 'hls-2', type: PlayerSourceType.DEFAULT } },
    ];

    const controller = createController();
    controller.$onInit();

    expect(controller.vm.playerSource).toEqual({ hlsUrl: 'hls-2', type: PlayerSourceType.DEFAULT });
  });

  it('should use live sources when live is forced', () => {
    $scope.options = { forcedState: WebcastState.LIVE };
    $scope.webcast.languages[0].playerLive = { hlsUrl: 'hls-live', type: PlayerSourceType.DEFAULT };

    const controller = createController();
    controller.$onInit();

    expect(controller.vm.playerSource).toEqual({ hlsUrl: 'hls-live', type: PlayerSourceType.DEFAULT });
  });

  it('should return audioOnly player config', () => {
    $scope.webcast.theme = {
      audioOnlyFileUrl: 'file-url',
    };
    const expected = {
      audioOnlyOverlayConfig: {
        backgroundImageUrl: $scope.webcast.theme.audioOnlyFileUrl,
        hiddeIndicator: true
      }
    };
    const controller = createController();
    const result = controller.getAudioOnlyPlayerConfig();

    expect(result).toEqual(expected);
  });

  it('should return empty object when audioOnly player config is not set', () => {
    $scope.webcast.theme = { audioOnlyFileUrl: null };
    const controller = createController();
    const result = controller.getAudioOnlyPlayerConfig();

    expect(result).toEqual({});
  });

  function getScopeVariables(): any {
    return {
      config: { source: {} },
      webcast: {
        languages: [
          { language: 'en', player: { hlsUrl: 'hls-123', type: PlayerSourceType.DEFAULT } },
        ],
        layout: {
          layout: 'layout-1-2-3',
        },
        name: 'webcast123',
        theme: {},
      },
    };
  }

})
;