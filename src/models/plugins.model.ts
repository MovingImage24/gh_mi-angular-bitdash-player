import { PlayerDestroyOptions } from './player.model';

export interface PlayerPlugin {
  destroy: (options?: PlayerDestroyOptions) => void;
}
