import { PlayerEvent } from '../player-event';

export interface PlayerApiReadyEvent {
  playerApi: WebcastPlayerApi;
}

export interface WebcastPlayerApi {
  on?(eventType: PlayerEvent, callback: () => {}): void;
  seek?(time: number, issuer?: string): boolean;
}
