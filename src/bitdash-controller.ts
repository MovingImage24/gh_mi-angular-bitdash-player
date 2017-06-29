import * as angular from 'angular';

class BitmovinController {
  public static $inject: string[] = ['$scope', '$log'];
  private config: any = {};
  private options: any = {};

  constructor(private $scope: angular.IScope, private $log: angular.ILogService) {
    this.$scope = $scope;
    this.$log = $log;
  }

  public $onInit(): void {
    if (angular.isDefined(this.$scope.config) && angular.isDefined(this.$scope.config.key)) {
      this.config = this.$scope.config;
    } else {
      this.$log.error('basic config for bitdash player is missing!');
    }
    if (angular.isDefined(this.$scope.options)) {
      this.options = this.$scope.options;
    }

    if (angular.isDefined(this.$scope.webcast)) {
      this.processWebcast(this.$scope.webcast);
    }
  }

  public processWebcast(webcast: any): void {
    let stateProperty = webcast.state + 'StateData';

    if (angular.isDefined(this.options.forcedState)) {
      stateProperty = this.options.forcedState + 'StateData';
    }

    this.config.source = this.getPlayerConfigSource(webcast, stateProperty);
    this.config.style = {ux: false};
  }

  public getPlayerConfigSource(webcast: any , state: any): any {
    if (webcast.useDVRPlaybackInPostlive === true && state === 'postliveStateData') {
      return this.getDVRPlaybackToPostlive(webcast);
    }
    return this.getPlayerConfigSourceByState(webcast, state);
  }

  public getDVRPlaybackToPostlive(webcast: any): any {
    let offset = '';
    if (angular.isDefined(webcast['postliveStateData'].playout.offset)) {
      const playoutOffset = parseInt(webcast['postliveStateData'].playout.offset, 10);
      if (playoutOffset > 0) {
        offset = '&wowzadvrplayliststart=' + playoutOffset + '000';
      }
    }

    return {
      dash: webcast['liveStateData'].playout.dashUrl.replace('/playlist.m3u8', 'Dvr/playlist.m3u8?DVR' + offset),
      hls: webcast['liveStateData'].playout.hlsUrl.replace('/master.m3u8', 'Dvr/playlist.m3u8?DVR' + offset)
    };
  }

  public getPlayerConfigSourceByState(webcast: any, state: any): any {
    let hls: string = webcast[state].playout.hlsUrl;
    let dash: string = webcast[state].playout.dashUrl;
    const title: string = webcast.name;
    if (angular.isDefined(webcast[state].playout.videoManagerHlsUrl) && webcast[state].playout.videoManagerHlsUrl) {
      hls = webcast[state].playout.videoManagerHlsUrl;
    }

    if (angular.isDefined(webcast[state].playout.offset)) {
      const offset: number = parseInt(webcast[state].playout.offset, 10);

      if (offset > 0) {
        let offsetPrefix: string = '?';
        const parser = document.createElement('a');
        parser.href = hls;
        if (parser.search) {
          offsetPrefix = '&';
        }

        hls += offsetPrefix + 'start=' + offset;

        if (angular.isDefined(dash) && dash) {
          offsetPrefix = '?';
          parser.href = dash;
          if (parser.search) {
            offsetPrefix = '&';
          }
          dash += offsetPrefix + 'start=' + offset;
        }
      }
    }
    return {dash, hls, title};
  }
}

export default BitmovinController;