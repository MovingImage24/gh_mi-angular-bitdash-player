import { PlayerSourceType } from '../player-source.type';

export interface WebcastModel {
  name: string;
  language?: string;
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
  player?: PlayerSource;
  playerLive?: PlayerSource;
}

export interface PlayerSource {
  hlsUrl: string;
  type: PlayerSourceType;
  p2p?: P2PSource;
  videoId?: string;
}

export interface P2PSource {
  urn?: string;
  url?: string;
  token?: string;
  host?: string;
}

export interface KollectivePlugin {
  createPublicToken(userId: string, urn: string): string;
}