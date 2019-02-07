import { AxiosInstance } from 'axios';
import { PlayerApi } from '../player-api';
import { PlayerEvent } from '../player-event';

const axios = require('axios');

export class AnalyticsPlugin {

  private http: AxiosInstance;
  private time: number = 0;
  private readonly beforeUnloadEvent: () => void;

  constructor(private playerApi: PlayerApi, private videoId: string) {
    this.http = axios.create({
      baseURL: 'https://c.video-cdn.net/',
    });

    this.beforeUnloadEvent = () => this.sendExitEvent();

    this.sendViewEvent();

    this.addListeners();
  }

  public destroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadEvent);
  }

  private addListeners(): void {
    this.playerApi.on(PlayerEvent.PLAY, () => this.sendPlayEvent());
    this.playerApi.on(PlayerEvent.ENDED, () => this.sendExitEvent());
    this.playerApi.on(PlayerEvent.TimeChanged, (value) => this.onTimeChanged(value));
  }

  private sendViewEvent(): void {
    this.sendEvent('view', { url: document.location.href });
  }

  private sendPlayEvent(): void {
    window.addEventListener('beforeunload', this.beforeUnloadEvent, true);

    this.sendEvent('play', { url: document.location.href });
  }

  private sendExitEvent(): void {
    this.sendEvent('exit', { 'current-time': this.time });
  }

  private onTimeChanged(value: { time: number }): void {
    this.time = value.time;
  }

  private sendEvent(type: string, additionalParams: any): void {
    const params = {
      'event': type,
      'video-id': this.videoId,
      ...additionalParams,
    };

    console.log('send event', type, params);

    this.http.get('event?', { params })
      .catch((error) => {
        // handle error
        console.log('mi-analytics error:', error);
      });
  }

}
