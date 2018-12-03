import { WebcastState } from '../webcast.state';
import { BitmovinPlayerConfig, IMIUIConfig } from './bitmovin.model';
import { PlayerSource, WebcastModel } from './webcast.model';

export interface DirectiveScope extends ng.IScope {
  config: BitmovinPlayerConfig;
  options?: WebcastOptions;
  webcast: WebcastModel;

  vm: ControllerModel;
  getAudioOnlyPlayerConfig: () => IMIUIConfig;
}

export interface ControllerModel {
  playerSource: PlayerSource;
}

export interface WebcastOptions {
  forcedState?: WebcastState;
}

export interface IWindow extends ng.IWindowService {
  window: IWindowInterface;
}

export interface IWindowInterface extends Window {
  miBitmovinUi: any;
  bitmovin: any;
  ksdn: any;
}

