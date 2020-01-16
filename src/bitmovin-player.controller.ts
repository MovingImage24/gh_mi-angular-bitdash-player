import * as ng from 'angular';

import {
  ControllerModel,
  DirectiveScope,
  IMIUIConfig,
  KollectivePlugin,
  P2PSource,
  WebcastLanguage,
  WebcastModel,
  WebcastOptions,
  WebcastPlayerConfig,
} from './models';
import { PlayerPlaybackType } from './player-playback.type';
import { WebcastState } from './webcast.state';

export class BitmovinPlayerController {
  public static $inject: string[] = ['$scope', '$log', 'ksdn'];
  public vm: ControllerModel;

  constructor(private $scope: DirectiveScope,
              private $log: ng.ILogService,
              private ksdn: KollectivePlugin) {
    this.vm = {
      playerConfig: null,
    };
  }

  public $onInit(): void {
    const hasValidConfig = this.$scope.config && this.$scope.webcast;

    if (hasValidConfig) {
      this.vm.playerConfig = this.getPlayerConfig(this.$scope.webcast);
    } else {
      this.$log.error(`basic config for bitdash player is missing!`);
    }
  }

  public getAudioOnlyPlayerConfig(): IMIUIConfig {
    return this.$scope.webcast.theme.audioOnlyFileUrl ? {
      audioOnlyOverlayConfig: {
        backgroundImageUrl: this.$scope.webcast.theme.audioOnlyFileUrl,
        hiddeIndicator: true,
      },
    } : {};
  }

  private getPlayerConfig(webcast: WebcastModel): WebcastPlayerConfig {
    const options: WebcastOptions = this.$scope.options || {};
    const activeLanguage = this.getActiveLanguage(webcast.languages, webcast.language);
    let config = activeLanguage.player;

    if (options.forcedState === WebcastState.LIVE && activeLanguage.playerLive) {
      config = activeLanguage.playerLive;
    }

    if (options.forcedPlayer) {
      config.type = options.forcedPlayer;
    }

    if (config.type === PlayerPlaybackType.KSDN) {
      config.p2p.token = this.createKSDNPublicToken(options.userId, config.p2p);
    }

    return config;
  }

  private getActiveLanguage(languages: WebcastLanguage[], language: string): WebcastLanguage {
    return language ? languages.find((lang) => language === lang.language) : languages[0];
  }

  private createKSDNPublicToken(userId: string, source: P2PSource): string {
    return this.ksdn.createPublicToken(userId, source.urn);
  }
}
