export interface BitmovinPlayerConfig {
  key: string;
  skin?: string;
  playback?: { autoplay: boolean, playsInline: boolean, timeShift: boolean };
  tweaks?: { context_menu_entries: any; };
  logs?: { bitmovin: boolean; };
  events?: object;
  source?: BitmovinSourceConfig;
  style?: { ux: boolean; };
}

export interface BitmovinSourceConfig {
  title?: string;
  hls?: string;
  hls_ticket?: string;
}