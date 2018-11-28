import { PlayerPluginType } from '../src/player-plugin.type';

export interface WebcastModel {
  name: string;
  language: string;
  languages: WebcastLanguage[];
}

export interface WebcastLanguage {
  language: string;
  player: PlayerSource;
  playerLive: PlayerSource;
}

export interface PlayerSource {
  hlsUrl: string;
  type: PlayerPluginType;
  p2p: {
    urn?: string;
    url?: string;
    token?: string;
    host?: string;
  }
}