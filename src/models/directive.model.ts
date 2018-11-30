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

export interface IWindow extends angular.IWindowService {
  window: IWindowInterface;
}
export interface IWindowInterface extends Window {
  miBitmovinUi: any;
  bitmovin: any;
  ksdn: any;
}

