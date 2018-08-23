import * as angular from 'angular';
import {IBitdashDirective} from './../interface/interfaces';

class BitmovinController {
  public static $inject: string[] = ['$scope', '$log'];
  private state: any = {};
  private config: any = {};
  private options: any = {};

  constructor(private $scope: IBitdashDirective, private $log: angular.ILogService) {
  }

  public $onInit(): void {
    this.state = this.$scope.state = {};

    if (angular.isDefined(this.$scope.config) && angular.isDefined(this.$scope.config.key)) {
      this.config = this.$scope.config;
    } else {
      this.$log.error(`basic config for bitdash player is missing!`);
    }
    if (angular.isDefined(this.$scope.options)) {
      this.options = this.$scope.options;
    }

    if (angular.isDefined(this.$scope.webcast)) {
      this.processWebcast(this.$scope.webcast);
    }
  }

  private processWebcast(webcast: any): void {
    const stateProperty = this.options.forcedState || webcast.state;

    if (stateProperty === 'ondemand') {
      let languageIndex = 0;
      webcast.languages.some((lang, index) => {
        if (webcast.language === lang.language) {
          languageIndex = index;
          return true;
        }
      });

      this.state.data = webcast.languages[languageIndex].ondemandStateData;
    } else {
      this.state.data = webcast[stateProperty + 'StateData'];
    }

    this.config.source = this.getPlayerConfigSource(webcast);
    this.config.style = {ux: false};
  }

  private getPlayerConfigSource(webcast: any): any {
    return webcast.useDVRPlaybackInPostlive && webcast.state === 'postlive' ?
      this.getDVRPlaybackToPostlive(webcast)
      : this.getPlayerConfigSourceByState(webcast)
      ;
  }

  private getDVRPlaybackToPostlive(webcast: any): any {
    let hls: string = webcast['liveStateData'].playout.hlsDvrUrl;
    const title: string = webcast.name;

    if (angular.isDefined(webcast['postliveStateData'].playout.offset)) {
      const offset: number = parseInt(webcast['postliveStateData'].playout.offset, 10);

      if (offset) {
        let offsetPrefix: string;
        const parser = document.createElement('a');
        parser.href = webcast['liveStateData'].playout.hlsDvrUrl;
        offsetPrefix = (parser.search) ? '&' : '?';
        hls += `${offsetPrefix}wowzadvrplayliststart=${offset}000`;
      }
    }

    return {hls, title};
  }

  private getPlayerConfigSourceByState(webcast: any): any {
    let hls: string = this.state.data.playout.hlsUrl;
    const title: string = webcast.name;
    const hiveServiceUrl: string = this.getHiveServiceUrlByLang(webcast);

    if (angular.isDefined(this.state.data.playout.videoManagerHlsUrl) && this.state.data.playout.videoManagerHlsUrl) {
      hls = this.state.data.playout.videoManagerHlsUrl;
    }

    if (angular.isDefined(this.state.data.playout.offset)) {
      const offset: number = parseInt(this.state.data.playout.offset, 10);

      if (offset > 0) {
        let offsetPrefix: string;
        const parser = document.createElement('a');
        parser.href = hls;
        offsetPrefix = (parser.search) ? '&' : '?';
        hls += `${offsetPrefix}start=${offset}`;
      }
    }
    return hiveServiceUrl ? {title, hls_ticket: hiveServiceUrl} : {hls, title};
  }

  private getHiveServiceUrlByLang(webcast: any): string {
    let hiveServiceUrl = null;
    if (webcast.languages && webcast.language) {
      webcast.languages.forEach((item: any) => {
        if (item.language === webcast.language) {
          hiveServiceUrl = angular.copy(item.hiveServiceUrl);
        }
      });
    }

    return hiveServiceUrl;
  }
}

export default BitmovinController;
