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

interface RecoverState {
  hasEnded: boolean;
  currentTimestamp: number;
  currentVolume: number;
  isPaused: boolean;
  isMuted: boolean;
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

