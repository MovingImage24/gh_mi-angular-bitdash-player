import { PlayerPlaybackType } from '../player-playback.type';

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
  player?: WebcastPlayerConfig;
  playerLive?: WebcastPlayerConfig;
}

export interface WebcastVideoTrackConfig {
  language: string;
  country: string;
  label: string;
  source: string;
  type: string;
}

export interface WebcastPlayerConfig {
  hlsUrl: string;
  type: PlayerPlaybackType;
  p2p?: P2PSource;
  videoId?: string;
  videoTracks?: WebcastVideoTrackConfig[];
}

export interface P2PSource {
  urn?: string;
  url?: string;
  token?: string;
  host?: string;
  techOrder?: string[]
}

export interface KollectivePlugin {
  createPublicToken(userId: string, urn: string): string;
}