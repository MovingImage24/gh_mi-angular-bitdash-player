import { PreferredTech } from '../src/preferred-tech.types';
import { WebcastState } from '../src/webcast.state';

export interface BitdashDirectiveScope extends angular.IScope {
  config: BitmovinPlayerConfig;
  webcast: WebcastModel;
  options?: WebcastOptions;
  state?: StateData;
}

export interface WebcastModel {
  name: string;
  language: string;
  state: WebcastState;
  languages: WebcastLanguage[];
  theme: any;
  layout: any
  useDVRPlaybackInPostlive: boolean;
}

export interface WebcastLanguage {
  language: string,
  hiveServiceUrl: string;
  ondemandStateData: any;
}

export interface KsdnSettings {
  token: string;
  urn: string;
  fallBackUrl: string;
  host?: string;
}

export interface StateData {
  data?: {
    playout: any;
    preferredTech: PreferredTech | null;
    hiveSettings: HiveSettings;
    ksdnSettings: KsdnSettings;
  };
}

export interface IMyElement extends Element {
  style: any;
}

export interface IWindow extends angular.IWindowService {
  window: IWindowInterface;
}

export interface IBitmovin {
  playerui: any;

  initHiveSDN(bitmovinPlayer: BitmovinPlayerApi, debug?: any): any;

  player(id: string): BitmovinPlayerApi;
}

export interface IWindowInterface extends Window {
  bitmovin: IBitmovin;
  ksdn: any;
}

export interface BitmovinPlayerApi {
  load(source: any): any;

  isReady(): boolean;

  setup(config: any): any;

  play(): void;

  pause(): void;

  destroy(): BitmovinPlayerApi;

  initSession(hsl: string): any;

  addEventHandler(eventName: string, callback: (event?: any) => void): void;
}

export interface HiveSettings {
  serviceUrl: string;
  origHlsUrl: string;
}

export interface IBitmovinUIManager {
  buildAudioOnlyUI(player: BitmovinPlayerApi, playerConfig: IMIUIConfig): void;

  buildAudioVideoUI(player: BitmovinPlayerApi): void;
}

export interface WebcastOptions {
  forcedState?: string;
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

export interface BitmovinSourceConfig {
  title: string;
  hls?: string;
  hls_ticket?: string;
}

export interface BitmovinPlayerConfig {
  key: string;
  skin?: string;
  playback?: { autoplay: boolean, playsInline: boolean, timeShift: boolean };
  tweaks?: { context_menu_entries: any };
  logs?: { bitmovin: boolean };
  events?: object;
  source?: BitmovinSourceConfig;
  style?: { ux: boolean };
}
