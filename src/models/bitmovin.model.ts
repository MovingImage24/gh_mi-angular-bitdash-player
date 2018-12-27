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
  getCurrentTime(): number
  hasEnded(): boolean;
  mute(issuer?: string): void;
  getDuration(): number;
  initSession(hsl: string): any;
  addEventHandler(eventName: string, callback: (event?: any) => void): void;
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