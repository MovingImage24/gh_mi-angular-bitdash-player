import { PlayerSourceType } from '../player-source.type';

export interface WebcastModel {
  name: string;
  language: string;
  languages: WebcastLanguage[];
  theme: {
    audioOnlyFileUrl?: string;
  },
  layout: {
    layout: string;
  };
}

export interface WebcastLanguage {
  language: string;
  player: PlayerSource;
  playerLive: PlayerSource;
}

export interface PlayerSource {
  hlsUrl: string;
  type: PlayerSourceType;
  p2p: {
    urn?: string;
    url?: string;
    token?: string;
    host?: string;
  }
}