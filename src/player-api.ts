import { BitmovinPlayerApi, BitmovinSourceConfig, BitmovinSubtitle, PlayerDestroyOptions, PlayerPlugin, RecoverState, WebcastVideoTrackConfig } from './models';
import { PlayerEvent } from './player-event';

type PlayerCallback = (event?: any) => void;

export class PlayerApi {

  private eventListeners: { [index in PlayerEvent]: PlayerCallback[] } = {
    ended: [],
    playing: [],
    timechanged: [],
    onSourceLoaded: [],
    onSourceUnloaded: [],
  };

  private playerSource: BitmovinSourceConfig;
  private plugins: PlayerPlugin[] = [];
  private isDestroyed: boolean;

  constructor(private playerRef: BitmovinPlayerApi) {
    this.addListeners();
  }

  public setupPlugins(plugins: PlayerPlugin[], recoverState: RecoverState): void {
    this.plugins = plugins;
    this.plugins.forEach((plugin) => recoverState ? plugin.initRecovered(this, recoverState) : plugin.init(this));
  }

  public seek(time: number, issuer?: string): boolean {
    return this.playerRef.seek(time, issuer);
  }

  public on(eventType: PlayerEvent, callback: PlayerCallback): void {
    this.eventListeners[eventType].push(callback);
  }

  public off(eventType: PlayerEvent, callback: PlayerCallback): void {
    this.eventListeners[eventType] = this.eventListeners[eventType].filter((item) => item !== callback);
  }

  public pause(issuer?: string): void {
    // we have to check if we can safely call pause because
    // when user seeks, pause, destroy and create new instance of the player,
    // the new video will play, but the player will not fire play event
    if (this.playerRef.isPlaying()) {
      this.playerRef.pause(issuer);
    }
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

  public addSubtitle(track: WebcastVideoTrackConfig, id: string): void {
    const subtitle = this.mapVideoTrackConfigToBitmovinSubtitle(track, id);

    this.playerRef.addSubtitle(subtitle);
  }

  public getSubtitle(): BitmovinSubtitle {
    return this.playerRef.getSubtitle();
  }

  public setSubtitle(trackId: string): BitmovinPlayerApi {
    return this.playerRef.setSubtitle(trackId);
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

  public destroy(options?: PlayerDestroyOptions): Promise<void> {
    if (this.isDestroyed) {
      return Promise.resolve();
    }
    this.isDestroyed = true;

    return new Promise((resolve) => {
      this.playerRef.unload();
      this.plugins.forEach((plugin) => plugin.destroy(options));

      setTimeout(() => {
        this.playerRef.destroy();
        resolve();
      }, 60);
    });
  }

  public getPublicApi(): any {
    return {
      destroy: (options) => this.destroy(options),
      getCurrentTime: () => this.getCurrentTime(),
      getDuration: () => this.getDuration(),
      getVolume: () => this.getVolume(),
      hasEnded: () => this.hasEnded(),
      isMuted: () => this.isMuted(),
      isPaused: () => this.isPaused(),
      mute: (issuer?: string) => this.mute(issuer),
      off: (eventType: PlayerEvent, callback: PlayerCallback) => this.off(eventType, callback),
      on: (eventType: PlayerEvent, callback: PlayerCallback) => this.on(eventType, callback),
      pause: (issuer?: string) => this.pause(issuer),
      reload: () => this.reload(),
      seek: (time: number, issuer?: string) => this.seek(time, issuer),
      setVolume: (volume: number, issuer?: string) => this.setVolume(volume, issuer),
      getSubtitle: (): BitmovinSubtitle => this.getSubtitle(),
    };
  }

  private mapVideoTrackConfigToBitmovinSubtitle(track: WebcastVideoTrackConfig, id: string): BitmovinSubtitle {
    return {
      id,
      lang: track.language.toLowerCase(),
      label: track.label,
      kind: this.mapVideoTrackType(track.type),
      url: track.source,
    };
  }

  private mapVideoTrackType(type: string): string {
    return type.toLowerCase().includes('caption') ? 'caption' : 'subtitle';
  }

  private addListeners(): void {
    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_TIME_CHANGED, (event: { time: number }) =>
      (this.eventListeners[PlayerEvent.TimeChanged].forEach((callback) => (callback({ time: event.time })))));

    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_PLAY, () =>
      (this.eventListeners[PlayerEvent.PLAY].forEach((callback) => (callback()))));

    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_PLAYBACK_FINISHED, () =>
      (this.eventListeners[PlayerEvent.ENDED].forEach((callback) => (callback()))));

    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_SOURCE_LOADED, () =>
      (this.eventListeners[PlayerEvent.ON_SOURCE_LOADED].forEach((callback) => (callback()))));

    this.playerRef.addEventHandler(this.playerRef.EVENT.ON_SOURCE_UNLOADED, () =>
      (this.eventListeners[PlayerEvent.ON_SOURCE_UNLOADED].forEach((callback) => (callback()))));
  }

}
