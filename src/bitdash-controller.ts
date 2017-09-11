import * as angular from 'angular';
import {IBitdashDirective} from './../interface/interfaces';

class BitmovinController {
  public static $inject: string[] = ['$scope', '$log'];
  private config: any = {};
  private options: any = {};

  constructor(private $scope: IBitdashDirective, private $log: angular.ILogService) {
    this.$scope = $scope;
    this.$log = $log;
  }

  public $onInit(): void {
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

  public processWebcast(webcast: any): void {
    let stateProperty = `${webcast.state}StateData`;

    if (angular.isDefined(this.options.forcedState)) {
      stateProperty = `${this.options.forcedState}StateData`;
    }

    this.config.source = this.getPlayerConfigSource(webcast, stateProperty);
    this.config.style = {ux: false};
  }

  public getPlayerConfigSource(webcast: any , state: any): any {
    if ((webcast.useDVRPlaybackInPostlive === true) && (state === 'postliveStateData')) {
      return this.getDVRPlaybackToPostlive(webcast);
    }
    return this.getPlayerConfigSourceByState(webcast, state);
  }

  public getDVRPlaybackToPostlive(webcast: any): any {
    let hls: string = webcast['liveStateData'].playout.hlsDvrUrl;
    const title: string = webcast.name;

    if (angular.isDefined(webcast['postliveStateData'].playout.offset)) {
      const offset: number = parseInt(webcast['postliveStateData'].playout.offset, 10);

      if (offset > 0) {
        let offsetPrefix: string;
        const parser = document.createElement('a');
        parser.href = webcast['liveStateData'].playout.hlsDvrUrl;
        offsetPrefix = (parser.search) ? '&' : '?';
        hls += `${offsetPrefix}wowzadvrplayliststart=${offset}000`;
      }
    }

    return {hls, title};
  }

  public getPlayerConfigSourceByState(webcast: any, state: any): any {
    let hls: string = webcast[state].playout.hlsUrl;
    const title: string = webcast.name;
    const hiveServiceUrl: string = this.getHiveServiceUrlByLang(webcast);

    if (angular.isDefined(webcast[state].playout.videoManagerHlsUrl) && webcast[state].playout.videoManagerHlsUrl) {
      hls = webcast[state].playout.videoManagerHlsUrl;
    }

    if (angular.isDefined(webcast[state].playout.offset)) {
      const offset: number = parseInt(webcast[state].playout.offset, 10);

      if (offset > 0) {
        let offsetPrefix: string;
        const parser = document.createElement('a');
        parser.href = hls;
        offsetPrefix = (parser.search) ? '&' : '?';
        hls += `${offsetPrefix}start=${offset}`;
      }
    }
    return {hls, title, hiveServiceUrl};
  }

  public getHiveServiceUrlByLang(webcast: any): string {
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
