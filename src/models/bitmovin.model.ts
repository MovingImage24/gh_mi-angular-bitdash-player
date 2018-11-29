export interface BitmovinPlayerConfig {
  source: BitmovinSourceConfig;
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
  pause(): void;
  destroy(): BitmovinPlayerApi;
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