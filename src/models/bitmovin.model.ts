export interface BitmovinPlayerConfig {
  source: BitmovinSourceConfig;
  style?: any;
}

export interface BitmovinSourceConfig {
  title?: string;
  hls?: string;
  hls_ticket?: string;
}

export interface BitmovinPlayerApi {
  EVENT: BitmovinPlayerEvents;
  unload(): BitmovinPlayerApi;
  load(source: any): Promise<BitmovinPlayerApi>;
  isReady(): boolean;
  setup(config: BitmovinPlayerConfig): Promise<BitmovinPlayerApi>;
  play(): void;
  pause(issuer?: string): void;
  destroy(): BitmovinPlayerApi;
  seek(time: number, issuer?: string): boolean;
  isMuted(): boolean;
  getVolume(): number;
  setVolume(volume: number, issuer?: string): void;
  isPaused(): boolean;
  isPlaying(): boolean;
  getCurrentTime(): number
  hasEnded(): boolean;
  mute(issuer?: string): void;
  getDuration(): number;
  initSession(hsl: string): any;
  addEventHandler(eventName: string, callback: (event?: any) => void): void;
  addSubtitle(subtitle: BitmovinSubtitle): BitmovinPlayerApi;
  getSubtitle(): BitmovinSubtitle;
  setSubtitle(trackId: string): BitmovinPlayerApi;
}

export interface BitmovinSubtitle {
  /**
   * Used to identify and set the subtitle track.
   */
  id: string;
  /**
   * The language of the subtitle track.
   */
  lang: string;
  /**
   * The text used to represent this track to the user (e.g. in the UI).
   */
  label: string;

  /**
   * The subtitle type, either "caption" or "subtitle" (default: "subtitle").
   */
  kind: string;
  /**
   * The URL to the subtitle track.
   */
  url: string;
  /**
   * Only used for fragmented subtitles in HLS
   */
  isFragmented?: boolean;
}

interface BitmovinPlayerEvents {
  ON_PLAYBACK_FINISHED: string;
  ON_PLAY: string;
  ON_TIME_CHANGED: string;
  ON_SOURCE_LOADED: string;
  ON_SOURCE_UNLOADED: string;
}

export interface BitmovinUIManager {
  buildAudioOnlyUI(player: BitmovinPlayerApi, uiConfig: IMIUIConfig): void;
  buildAudioVideoUI(player: BitmovinPlayerApi): void;
}

export interface IMIUIConfig {
  audioOnlyOverlayConfig?: UIAudioOnlyOverlayConfig;
}


export interface UIAudioOnlyOverlayConfig {
  backgroundImageUrl?: string;
  hiddeIndicator?: boolean;
}