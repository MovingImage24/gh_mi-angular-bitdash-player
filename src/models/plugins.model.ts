import { RecoverState } from './directive.model';
import { PlayerDestroyOptions } from './player.model';

export interface PlayerPlugin {
  destroy: (options?: PlayerDestroyOptions) => void;
  init: () => void;
  initRecovered: (state: RecoverState) => void;
}
