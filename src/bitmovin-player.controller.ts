import * as angular from 'angular';

import { ControllerModel, DirectiveScope, IMIUIConfig, WebcastLanguage, WebcastModel, WebcastOptions } from './models';
import { WebcastState } from './webcast.state';

class BitmovinPlayerController {
  public static $inject: string[] = ['$scope', '$log'];
  public vm: ControllerModel;

  constructor(private $scope: DirectiveScope,
              private $log: angular.ILogService) {
    this.vm = {
      playerSource: null,
    };
  }

  public getAudioOnlyPlayerConfig(): IMIUIConfig {
    return this.$scope.webcast.theme.audioOnlyFileUrl ? {
      audioOnlyOverlayConfig: {
        backgroundImageUrl: this.$scope.webcast.theme.audioOnlyFileUrl,
        hiddeIndicator: true
      }
    } : {};
  }

  public $onInit(): void {
    const hasValidConfig = this.$scope.config && this.$scope.webcast;

    if (hasValidConfig) {
      this.vm.playerSource = this.getPlayerSource(this.$scope.webcast);
    } else {
      this.$log.error(`basic config for bitdash player is missing!`);
    }
  }

  private getPlayerSource(webcast: WebcastModel): any {
    const options: WebcastOptions = this.$scope.options || {};
    const activeLanguage = this.getActiveLanguage(webcast.languages, webcast.language);
    let source = activeLanguage.player;

    if (options.forcedState === WebcastState.LIVE) {
      source = activeLanguage.playerLive;
    }

    return source;
  }


  private getActiveLanguage(languages: WebcastLanguage[], language: string): WebcastLanguage {
    return languages.find((lang) => language === lang.language);
  }


  // ---------------------------------------------------------------------
  //
  // private processWebcast(webcast: WebcastModel): void {
  //   const state = this.options.forcedState || webcast.state;
  //
  //   switch (state) {
  //     case WebcastState.ONDEMAND:
  //       let languageIndex = 0;
  //       webcast.languages.some((lang, index) => {
  //         if (webcast.language === lang.language) {
  //           languageIndex = index;
  //           return true;
  //         }
  //       });
  //       this.state.data = webcast.languages[languageIndex].ondemandStateData;
  //       break;
  //     default:
  //       this.state.data = webcast[state + 'StateData'];
  //   }
  //
  //   this.playerConfig.source = this.getPlayerConfigSource(webcast);
  //   this.playerConfig.style = { ux: false };
  //
  //   this.state.data.hiveSettings = null;
  //   const serviceUrl = this.getHiveServiceUrlByLang(this.$scope.webcast);
  //
  //   if (serviceUrl) {
  //     this.state.data.hiveSettings = {
  //       serviceUrl,
  //       origHlsUrl: this.playerConfig.source.hls,
  //     };
  //   }
  //
  //   // todo: replace with real data
  //   this.state.data.ksdnSettings = {
  //     fallBackUrl: this.playerConfig.source.hls,
  //     token: 'pub-ZW1haWxAbWkuY29tI21p',
  //     urn: 'urn:kid:eval:mi:moid:65e8a97d-fab1-4a2f-bfc8-1ff152598a51',
  //   };
  //
  //   this.state.data.preferredTech = this.getDefaultPreferredTech(webcast);
  // }
  //
  // private getPlayerConfigSource(webcast: WebcastModel): BitmovinSourceConfig {
  //   const postLiveDVRPlayback = webcast.useDVRPlaybackInPostlive && webcast.state === WebcastState.POST_LIVE;
  //
  //   return postLiveDVRPlayback ? this.getDVRPlaybackSource(webcast) : this.getPlayerConfigSourceByState(webcast);
  // }
  //
  // private getDVRPlaybackSource(webcast: WebcastModel): BitmovinSourceConfig {
  //   const title = webcast.name;
  //   let hls = webcast['liveStateData'].playout.hlsDvrUrl;
  //
  //   if (angular.isDefined(webcast['postliveStateData'].playout.offset)) {
  //     const offset: number = parseInt(webcast['postliveStateData'].playout.offset, 10);
  //
  //     if (offset) {
  //       let offsetPrefix: string;
  //       const parser = document.createElement('a');
  //       parser.href = webcast['liveStateData'].playout.hlsDvrUrl;
  //       offsetPrefix = (parser.search) ? '&' : '?';
  //       hls += `${offsetPrefix}wowzadvrplayliststart=${offset}000`;
  //     }
  //   }
  //
  //   return { hls, title };
  // }
  //
  // private getPlayerConfigSourceByState(webcast: WebcastModel): BitmovinSourceConfig {
  //   let hls: string = this.state.data.playout.hlsUrl;
  //   const title: string = webcast.name;
  //
  //   if (angular.isDefined(this.state.data.playout.videoManagerHlsUrl) && this.state.data.playout.videoManagerHlsUrl) {
  //     hls = this.state.data.playout.videoManagerHlsUrl;
  //   }
  //
  //   if (angular.isDefined(this.state.data.playout.offset)) {
  //     const offset: number = parseInt(this.state.data.playout.offset, 10);
  //
  //     if (offset > 0) {
  //       let offsetPrefix: string;
  //       const parser = document.createElement('a');
  //       parser.href = hls;
  //       offsetPrefix = (parser.search) ? '&' : '?';
  //       hls += `${offsetPrefix}start=${offset}`;
  //     }
  //   }
  //   return { hls, title };
  // }
  //
  // private getHiveServiceUrlByLang(webcast: WebcastModel): string {
  //   let hiveServiceUrl = null;
  //
  //   if (webcast.languages && webcast.language) {
  //     webcast.languages.forEach((language) => {
  //       if (language.language === webcast.language) {
  //         hiveServiceUrl = language.hiveServiceUrl;
  //       }
  //     });
  //   }
  //
  //   return hiveServiceUrl;
  // }
  //
  // private getDefaultPreferredTech(webcast: WebcastModel): PreferredTech {
  //   let tech = PreferredTech.DEFAULT;
  //
  //   if (webcast.state === WebcastState.LIVE && this.state.data.hiveSettings) {
  //     tech = PreferredTech.HIVE;
  //   } else if (this.state.data.ksdnSettings) {
  //     tech = PreferredTech.KSDN;
  //   }
  //
  //
  //   return tech;
  // }
}

export default BitmovinPlayerController;
