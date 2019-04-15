import { PlayerPlugin, RecoverState, WebcastVideoTrackConfig } from '../models';
import { PlayerApi } from '../player-api';
import { PlayerEvent } from '../player-event';

export class SubtitlesPlugin implements PlayerPlugin {
  private readonly sourceLoadedHandler: () => void;
  private recoverSubtitleId: string | null = null;
  private playerApi: PlayerApi;

  constructor(private videoTrackConfigs: WebcastVideoTrackConfig[]) {
    this.sourceLoadedHandler = () => this.addSubtitles();
  }

  public init(playerApi: PlayerApi): void {
    this.playerApi = playerApi;
    this.addListeners();
  }

  public initRecovered(playerApi: PlayerApi, state: RecoverState): void {
    this.playerApi = playerApi;
    this.recoverSubtitleId = state.selectedSubtitleId;
    this.addListeners();
  }

  public destroy(): void {
    this.removeListeners();
  }

  private addSubtitles(): void {
    this.videoTrackConfigs
      .forEach((track, index) => this.playerApi.addSubtitle(track, `subtitle${index}`));

    if (this.recoverSubtitleId) {
      this.playerApi.setSubtitle(this.recoverSubtitleId);
      this.recoverSubtitleId = null;
    }
  }

  private addListeners(): void {
    this.playerApi.on(PlayerEvent.ON_SOURCE_LOADED, this.sourceLoadedHandler);
  }

  private removeListeners(): void {
    this.playerApi.off(PlayerEvent.ON_SOURCE_LOADED, this.sourceLoadedHandler);
  }

}
