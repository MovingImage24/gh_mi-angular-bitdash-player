import { PlayerPlaybackType } from '../player-playback.type';
import { WebcastState } from '../webcast.state';
import { BitmovinPlayerConfig, IMIUIConfig } from './bitmovin.model';
import { PlayerApiReadyEvent } from './player.model';
import { WebcastModel, WebcastPlayerConfig } from './webcast.model';
import { YouboraConfig } from './youbora.model';

export interface DirectiveScope extends ng.IScope {
  config: BitmovinPlayerConfig;
  options?: WebcastOptions;
  webcast: WebcastModel;
  playerApiReady: () => { $event: PlayerApiReadyEvent };

  vm: ControllerModel;
  getAudioOnlyPlayerConfig: () => IMIUIConfig;
}

export interface ControllerModel {
  playerConfig: WebcastPlayerConfig;
}

export interface RecoverState {
  seekTo: number;
  volume: number;
  isMuted: boolean;
  hasEnded: boolean;
  playPressed: boolean;
  selectedSubtitleId: string | null;
}

export interface WebcastOptions {
  forcedState?: WebcastState;
  forcedPlayer?: PlayerPlaybackType.DEFAULT;
  userId?: string;
  recoverState?: RecoverState;
  youbora?: YouboraConfig;
}

export interface IWindow extends ng.IWindowService {
  window: IWindowInterface;
}

export interface IWindowInterface extends Window {
  __HiveBitmovin: any;
  miBitmovinUi: any;
  bitmovin: any;
  HiveBitmovin: any;
  ksdn: any;
}

