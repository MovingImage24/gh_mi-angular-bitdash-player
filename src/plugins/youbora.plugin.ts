import { PlayerDestroyOptions, PlayerPlugin } from '../models';
import { PlayerApi } from '../player-api';

export class YouboraPlugin implements PlayerPlugin {
  constructor(private playerApi: PlayerApi) {

  }

  public init(): void {

  }

  public destroy(options?: PlayerDestroyOptions): void {

  }

}
