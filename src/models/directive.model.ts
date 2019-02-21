import { PlayerSourceType } from '../player-source.type';
import { WebcastState } from '../webcast.state';
import { BitmovinPlayerConfig, IMIUIConfig } from './bitmovin.model';
import { PlayerApiReadyEvent } from './player.model';
import { PlayerSource, WebcastModel } from './webcast.model';

export interface DirectiveScope extends ng.IScope {
  config: BitmovinPlayerConfig;
  options?: WebcastOptions;
  webcast: WebcastModel;
  playerApiReady: () => { $event: PlayerApiReadyEvent };

  vm: ControllerModel;
  getAudioOnlyPlayerConfig: () => IMIUIConfig;
}

export interface ControllerModel {
  playerSource: PlayerSource;
}

export interface RecoverState {
  seekTo: number;
  volume: number;
  isMuted: boolean;
  hasEnded: boolean;
  playPressed: boolean;
}

export interface WebcastOptions {
  forcedState?: WebcastState;
  forcedPlayer?: PlayerSourceType.DEFAULT;
  userId?: string;
  recoverState?: RecoverState;
}

export interface IWindow extends ng.IWindowService {
  window: IWindowInterface;
}

export interface IWindowInterface extends Window {
  miBitmovinUi: any;
  bitmovin: any;
  ksdn: any;
}

