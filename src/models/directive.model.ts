import { WebcastState } from '../webcast.state';
import { BitmovinPlayerConfig } from './bitmovin.model';
import { PlayerSource, WebcastModel } from './webcast.model';

export interface DirectiveScope extends angular.IScope {
  config: BitmovinPlayerConfig;
  options?: WebcastOptions;
  webcast: WebcastModel;

  vm: ControllerModel;
}

export interface ControllerModel {
  playerSource: PlayerSource;
}

export interface WebcastOptions {
  forcedState?: WebcastState;
}

// export interface KsdnSettings {
//   token: string;
//   urn: string;
//   fallBackUrl: string;
//   host?: string;
// }
//
//
//
// export models StateData {
//   data?: {
//     playout: any;
//     preferredTech: PreferredTech | null;
//     hiveSettings: HiveSettings;
//     ksdnSettings: KsdnSettings;
//   };
// }
//
// export models IMyElement extends Element {
//   style: any;
// }
//
export interface IWindow extends angular.IWindowService {
  window: IWindowInterface;
}
//
// export models IBitmovin {
//   playerui: any;
//
//   initHiveSDN(bitmovinPlayer: BitmovinPlayerApi, debug?: any): any;
//
//   player(id: string): BitmovinPlayerApi;
// }
//
export interface IWindowInterface extends Window {
  bitmovin: any;
  ksdn: any;
}
//
// export models BitmovinPlayerApi {
//   load(source: any): any;
//
//   isReady(): boolean;
//
//   setup(config: any): any;
//
//   play(): void;
//
//   pause(): void;
//
//   destroy(): BitmovinPlayerApi;
//
//   initSession(hsl: string): any;
//
//   addEventHandler(eventName: string, callback: (event?: any) => void): void;
// }
//
// export models HiveSettings {
//   serviceUrl: string;
//   origHlsUrl: string;
// }
//
// export models IBitmovinUIManager {
//   buildAudioOnlyUI(player: BitmovinPlayerApi, playerConfig: IMIUIConfig): void;
//
//   buildAudioVideoUI(player: BitmovinPlayerApi): void;
// }
//
//
// export models IUIAudioOnlyOverlayConfig {
//   backgroundImageUrl?: string;
//   hiddeIndicator?: boolean;
// }
//
// export models IMIUIConfig {
//   audioOnlyOverlayConfig?: IUIAudioOnlyOverlayConfig;
// }
//
// export models IReason {
//   code: number;
//   message: string;
// }

