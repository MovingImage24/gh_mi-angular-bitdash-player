import { PlayerApi } from '../player-api';
import { RecoverState } from './directive.model';
import { PlayerDestroyOptions } from './player.model';

export interface PlayerPlugin {
  destroy: (options?: PlayerDestroyOptions) => void;
  init: (playerApi: PlayerApi) => void;
  initRecovered?: (playerApi: PlayerApi, state: RecoverState) => void;
}
