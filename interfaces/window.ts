export interface IMyScope extends angular.IScope {
  config: any;
  webcast: any;
  options?: any;
}

export interface IMyElement extends Element {
  style: any;
}

export interface IWindow extends angular.IWindowService {
  window: IWindowInterface;
}

export interface IBitmovin {
  playerui: any;
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
}

export interface IBitmovinUIManager {
  buildAudioOnlyUI(player: IPlayer): void;
  buildAudioVideoUI(player: IPlayer): void;
}

export interface IConfig {
  key: string;
  skin: string;
  playback: {autoplay: boolean, playsInline: boolean, timeShift: boolean};
  tweaks: {context_menu_entries: any};
  logs: {bitmovin: boolean};
  events: object;
  source?: {dash: string, hls: string};
  style?: {ux: boolean};
}