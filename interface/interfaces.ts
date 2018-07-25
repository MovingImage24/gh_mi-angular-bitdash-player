export interface IBitdashDirective extends angular.IScope {
  config: any;
  webcast: any;
  options?: any;
  state?: any;
}

export interface IMyElement extends Element {
  style: any;
}

export interface IWindow extends angular.IWindowService {
  window: IWindowInterface;
}

export interface IBitmovin {
  playerui: any;
  initHiveSDN(bitmovinPlayer: IPlayer, debug?: any): any;
  player(id: string): IPlayer;
}

export interface IWindowInterface extends Window {
  bitmovin: IBitmovin;
}

export interface IPlayer {
  isReady(): boolean;
  setup(config: any): any;
  play(): void;
  pause(): void;
  destroy(): void;
  initSession(hsl: string): any;
  addEventHandler(eventName: string, callback: (event?: any) => void): void;
}

export interface IBitmovinUIManager {
  buildAudioOnlyUI(player: IPlayer, playerConfig: IMIUIConfig): void;
  buildAudioVideoUI(player: IPlayer): void;
}

export interface IUIAudioOnlyOverlayConfig {
  backgroundImageUrl?: string;
  hiddeIndicator?: boolean;
}

export interface IMIUIConfig {
  audioOnlyOverlayConfig?: IUIAudioOnlyOverlayConfig;
}

export interface IReason {
  code: number;
  message: string;
}

export interface IConfig {
  key: string;
  skin: string;
  playback: {autoplay: boolean, playsInline: boolean, timeShift: boolean};
  tweaks: {context_menu_entries: any};
  logs: {bitmovin: boolean};
  events: object;
  source?: {dash: string, hls: string, hiveServiceUrl: string};
  style?: {ux: boolean};
}
