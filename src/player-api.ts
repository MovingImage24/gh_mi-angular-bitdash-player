import { BitmovinPlayerApi } from './models';
import { PlayerEvent } from './player-event';

export class PlayerApi {

  private eventListeners: { [index in PlayerEvent]: any[] } = {
    timechanged: []
  };

  constructor(private playerRef: BitmovinPlayerApi) {
    this.addListeners();
  }

  public seek(time: number, issuer?: string): boolean {
    return this.playerRef.seek(time, issuer);
  }

  public on(eventType: PlayerEvent, callback: (event: any) => void): void {
    switch (eventType) {
      case PlayerEvent.TimeChanged:
        this.eventListeners[ PlayerEvent.TimeChanged ].push(callback);
        return;
    }
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

  public destroy(): void {
    // implement me
  }

  private addListeners(): void {
    this.playerRef.addEventHandler('onTimeChanged', (event: any) => {
      this.eventListeners[ PlayerEvent.TimeChanged ].forEach((callback) => {
        callback({ time: event.time });
      });
    });
  }

}
