// import * as ng from 'angular';
//
// import BitmovinPlayerDirective from './bitmovin-player.directive';
// import { BitmovinPlayerApi, BitmovinUIManager } from './models';
//
// interface IRootScope extends angular.IRootScopeService {
//   webcastMainVm: any;
// }
//
// describe('BitmovinPlayerDirective', () => {
//   let $q: ng.IQService;
//   let $compile: ng.ICompileService;
//   let $rootScope: IRootScope;
//   let $log: ng.ILogService;
//   let template = `<mi-bitdash-player config="webcastMainVm.playerConfig" webcast="webcastMainVm.webcast"></mi-bitdash-player>`;
//   let configMock;
//   let controllerVm;
//   let ksdnSpy;
//
//   const playerFuncSpy: string [] = ['isReady', 'setup', 'destroy', 'addEventHandler'];
//   const playerUISpy: string [] = ['buildAudioOnlyUI', 'buildAudioVideoUI'];
//   const bitmovinPlayer = jasmine.createSpyObj('player', playerFuncSpy);
//   const Factory: BitmovinUIManager = jasmine.createSpyObj('Factory', playerUISpy);
//   const windowSpy = {
//     document: {
//       getElementById: jasmine.createSpy('getElementById'),
//       getElementsByClassName: jasmine.createSpy('getElementsByClassName'),
//     },
//     window: {
//       bitmovin: {
//         initHiveSDN: jasmine.createSpy('initHiveSDN').and.returnValue(true),
//         miBitmovinUi: {
//           playerui: { UIManager: { Factory } }
//         },
//         player: () => bitmovinPlayer as BitmovinPlayerApi
//       }
//     }
//   };
//
//   beforeEach((name: string | {}) => {
//     controllerVm = { playerSource: null };
//     configMock = {};
//     ksdnSpy = jasmine.createSpy('ksdnMock');
//
//     ng.mock.module(($compileProvider: any, $controllerProvider: any, $provide: any) => {
//       $compileProvider.directive('miBitdashPlayer', BitmovinPlayerDirective);
//       $controllerProvider.register('MiBitdashController', ($scope) => {
//         $scope.vm = controllerVm;
//         return;
//       });
//
//       $provide.value('$window', windowSpy);
//       $provide.value('ksdn', ksdnSpy);
//     });
//
//     ng.mock.inject(($injector: ng.auto.IInjectorService) => {
//       $q = $injector.get('$q');
//       $compile = $injector.get('$compile');
//       $rootScope = $injector.get('$rootScope').$new() as IRootScope;
//       $log = $injector.get('$log');
//     });
//
//     $rootScope.webcastMainVm = {
//       playerConfig: configMock,
//       webcast: {
//         layout: {
//           layout: 'audio-only'
//         },
//         state: 'postlive',
//         theme: {
//           audioOnlyFileUrl: ''
//         }
//       }
//     };
//     bitmovinPlayer.setup.and.returnValue($q.when({}));
//   });
//
//   fit('should do something', () => {
//     // $rootScope.webcastMainVm.webcast.layout.layout = 'split-p-s';
//     //
//     $compile(template)($rootScope);
//     $rootScope.$apply();
//
//     expect(true).toBeTruthy();
//
//     // expect(bitmovinPlayer.setup).toHaveBeenCalledWith(configMock);
//     // expect(bitmovinPlayer.destroy).toHaveBeenCalled();
//     // expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
//     // expect(document.getElementsByClassName).toHaveBeenCalledWith('bitmovinplayer-container');
//     // expect(document.getElementsByClassName).not.toHaveBeenCalledWith('mi-wbc-ui-audioonly-overlay');
//     // expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minWidth).toEqual('175px');
//     // expect((document.getElementsByClassName('bitmovinplayer-container')[0] as IMyElement).style.minHeight).toEqual('101px');
//     // expect(Factory.buildAudioVideoUI).toHaveBeenCalledWith(bitmovinPlayer);
//     // expect(document.getElementById).toHaveBeenCalledWith('bitmovinplayer-video-mi-bitdash-player');
//   });
//
// })
// ;