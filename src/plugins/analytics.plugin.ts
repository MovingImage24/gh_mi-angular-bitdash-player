import { AxiosInstance } from 'axios';
import { Logger, PlayerDestroyOptions, PlayerPlugin, RecoverState } from '../models';
import { PlayerApi } from '../player-api';
import { PlayerEvent } from '../player-event';

const axios = require('axios');

export const deps = {
  axios,
  window,
};

export class AnalyticsPlugin implements PlayerPlugin {

  private http: AxiosInstance;
  private time: number = 0;
  private readonly beforeUnloadHandler: () => void;
  private readonly playHandler: () => void;
  private readonly endedHandler: () => void;
  private videoPlayPressed: boolean = false;

  constructor(private playerApi: PlayerApi,
              private videoId: string,
              private logger: Logger) {
    this.http = deps.axios.create({
      baseURL: 'https://c.video-cdn.net/',
    });

    this.beforeUnloadHandler = () => this.sendExitEvent();
    this.playHandler = () => this.sendPlayEvent();
    this.endedHandler = () => {
      this.removeBeforeUnloadEvent();

      this.videoPlayPressed = false;
      this.playerApi.on(PlayerEvent.PLAY, this.playHandler);

      this.sendExitEvent();
    };

  }

  public init(): void {
    this.sendViewEvent();
    this.addListeners();
  }

  /**
   * the webcast consumer destroys the player and recreate it again on view switch
   * and we don't want to track this "live-cycle"
   *
   */
  public initRecovered(state: RecoverState): void {
    this.time = state.seekTo || 0;

    if (state.hasEnded || !state.playPressed) {
      this.addListeners();
    } else {
      this.videoPlayPressed = true;
      this.addBeforeUnloadEvent();
      this.playerApi.on(PlayerEvent.ENDED, this.endedHandler);
      this.playerApi.on(PlayerEvent.TimeChanged, (value) => this.onTimeChanged(value));
    }
  }

  public destroy(options?: PlayerDestroyOptions): void {
    if (options && options.pageChange && this.videoPlayPressed) {
      this.sendExitEvent();
    }

    this.removeBeforeUnloadEvent();
  }

  private addListeners(): void {
    this.playerApi.on(PlayerEvent.PLAY, this.playHandler);
    this.playerApi.on(PlayerEvent.ENDED, this.endedHandler);
    this.playerApi.on(PlayerEvent.TimeChanged, (value) => this.onTimeChanged(value));
  }

  private sendViewEvent(): void {
    this.sendEvent('view', { url: document.location.href });
  }

  private sendPlayEvent(): void {
    this.videoPlayPressed = true;

    // listen for unexpected exits
    this.addBeforeUnloadEvent();

    // we only want to track the first play
    this.playerApi.off(PlayerEvent.PLAY, this.playHandler);

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

    this.http.get('event?', { params })
      .catch((error) => {
        this.logger.error('mi-analytics error', error);
      });
  }

  private addBeforeUnloadEvent(): void {
    deps.window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  private removeBeforeUnloadEvent(): void {
    deps.window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }
}
