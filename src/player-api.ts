import { BitmovinPlayerApi, BitmovinSourceConfig } from './models';
import { PlayerPlugin } from './models/plugins.model';
import { PlayerEvent } from './player-event';


type PlayerCallback = (event?: any) => void;

export class PlayerApi {

  private eventListeners: { [index in PlayerEvent]: PlayerCallback[] } = {
    ended: [],
    playing: [],
    timechanged: [],
  };

  private playerSource: BitmovinSourceConfig;
  private plugins: PlayerPlugin[] = [];

  constructor(private playerRef: BitmovinPlayerApi) {
    this.addListeners();
  }

  public setPlugins(plugins: PlayerPlugin[]): void {
    this.plugins = plugins;
  }

  public seek(time: number, issuer?: string): boolean {
    return this.playerRef.seek(time, issuer);
  }

  public on(eventType: PlayerEvent, callback: PlayerCallback): void {
    this.eventListeners[eventType].push(callback);
  }

  public pause(issuer?: string): void {
    this.playerRef.pause(issuer);
  }

  public mute(issuer?: string): void {
    this.playerRef.mute(issuer);
  }

  public hasEnded(): boolean {
    return this.playerRef.hasEnded();
  }

  public getCurrentTime(): number {
    return this.playerRef.getCurrentTime();
  }

  public isPaused(): boolean {
    return this.playerRef.isPaused();
  }

  public isMuted(): boolean {
    return this.playerRef.isMuted();
  }

  public getVolume(): number {
    return this.playerRef.getVolume();
  }

  public setVolume(volume: number, issuer?: string): void {
    this.playerRef.setVolume(volume, issuer);
  }

  public getDuration(): number {
    return this.playerRef.getDuration();
  }

  public load(source: BitmovinSourceConfig): Promise<BitmovinPlayerApi> {
    this.playerSource = source;

    return this.playerRef.load(source);
  }

  public reload(): Promise<string> {
    if (!this.playerSource) {
      return Promise.reject();
    }

    this.playerRef.unload();

    return new Promise((resolve, reject) => {
      this.load(this.playerSource)
        .then(() => {
          resolve('loaded');
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public destroy(): void {
    this.playerRef.unload();
    this.plugins.forEach((plugin) => plugin.destroy());
    this.playerRef.destroy();
  }

  public getPublicApi(): any {
    return {
      destroy: () => this.destroy(),
      getCurrentTime: () => this.getCurrentTime(),
      getDuration: () => this.getDuration(),
      getVolume: () => this.getVolume(),
      hasEnded: () => this.hasEnded(),
      isMuted: () => this.isMuted(),
      isPaused: () => this.isPaused(),
      mute: (issuer?: string) => this.mute(issuer),
      on: (eventType: PlayerEvent, callback: PlayerCallback) => this.on(eventType, callback),
      pause: (issuer?: string) => this.pause(issuer),
      reload: () => this.reload(),
      seek: (time: number, issuer?: string) => this.seek(time, issuer),
      setVolume: (volume: number, issuer?: string) => this.setVolume(volume, issuer),
    };
  }

  private addListeners(): void {
    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_TIME_CHANGED, (event: { time: number }) => {
      this.eventListeners[PlayerEvent.TimeChanged].forEach((callback) => {
        callback({ time: event.time });
      });
    });

    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_PLAY, () => {
      this.eventListeners[PlayerEvent.PLAY].forEach((callback) => {
        callback();
      });
    });

    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_PLAYBACK_FINISHED, () => {
      this.eventListeners[PlayerEvent.ENDED].forEach((callback) => {
        callback();
      });
    });
  }

}
