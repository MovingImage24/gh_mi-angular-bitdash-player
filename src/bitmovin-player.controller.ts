import * as ng from 'angular';

import {
  ControllerModel,
  DirectiveScope,
  IMIUIConfig,
  KollectivePlugin,
  P2PSource,
  PlayerSource,
  WebcastLanguage,
  WebcastModel,
  WebcastOptions
} from './models';
import { PlayerSourceType } from './player-source.type';
import { WebcastState } from './webcast.state';

class BitmovinPlayerController {
  public static $inject: string[] = ['$scope', '$log', 'ksdn'];
  public vm: ControllerModel;

  constructor(private $scope: DirectiveScope,
              private $log: ng.ILogService,
              private ksdn: KollectivePlugin) {
    this.vm = {
      playerSource: null,
    };
  }

  public $onInit(): void {
    const hasValidConfig = this.$scope.config && this.$scope.webcast;

    if (hasValidConfig) {
      this.vm.playerSource = this.getPlayerSource(this.$scope.webcast);
    } else {
      this.$log.error(`basic config for bitdash player is missing!`);
    }
  }

  public getAudioOnlyPlayerConfig(): IMIUIConfig {
    return this.$scope.webcast.theme.audioOnlyFileUrl ? {
      audioOnlyOverlayConfig: {
        backgroundImageUrl: this.$scope.webcast.theme.audioOnlyFileUrl,
        hiddeIndicator: true
      }
    } : {};
  }

  private getPlayerSource(webcast: WebcastModel): PlayerSource {
    const options: WebcastOptions = this.$scope.options || {};
    const activeLanguage = this.getActiveLanguage(webcast.languages, webcast.language);
    let source = activeLanguage.player;

    if (options.forcedState === WebcastState.LIVE && activeLanguage.playerLive) {
      source = activeLanguage.playerLive;
    }

    if (options.forcedPlayer) {
      source.type = options.forcedPlayer;
    }

    if (source.type === PlayerSourceType.KSDN) {
      source.p2p.token = this.createKSDNPublicToken(options.userId, source.p2p);
    }

    return source;
  }

  private getActiveLanguage(languages: WebcastLanguage[], language: string): WebcastLanguage {
    return language ? languages.find((lang) => language === lang.language) : languages[0];
  }

  private createKSDNPublicToken(userId: string, source: P2PSource): string {
    return this.ksdn.createPublicToken(userId, source.urn);
  }
}

export default BitmovinPlayerController;
