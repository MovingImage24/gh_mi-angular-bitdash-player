'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $log) {
    // controllerAs -> bitdashVm
    var vm = this;


    // copy the basic config ... key is mandatory
    vm.config = {};
    if (angular.isDefined($scope.config) && angular.isDefined($scope.config.key)) {
        vm.config = $scope.config;
    } else {
        $log.error('basic config for bitdash player is missing!');
    }

    // check webcast to expand and manipulate the basic bitdash player config
    if (angular.isDefined($scope.webcast)) {
        processWebcast($scope.webcast);
    }

    // player config ==========================================================================================

    function processWebcast(webcast) {
        var stateProperty = webcast.state + 'StateData';
        vm.config.source = getPlayerConfigSource(webcast, stateProperty);
        vm.config.style = getPlayerConfigStyle(webcast, stateProperty);
    }

    // player config - source ---------------------------------------------------------------------------------

    function getPlayerConfigSource(webcast, state) {
        if (webcast.useDVRPlaybackInPostlive === true && webcast.state === 'postlive') {
            return getDVRPlaybackToPostlive(webcast);
        }

        return getPlayerConfigSourceByState(webcast, state);
    }

    function getDVRPlaybackToPostlive(webcast) {
        return {
            hls: webcast['liveStateData'].playout.hlsUrl.replace('/master.m3u8', 'Dvr/master.m3u8?DVR'),
            dash: webcast['liveStateData'].playout.dashUrl.replace('/playlist.m3u8', 'Dvr/playlist.m3u8?DVR')
        };
    }

    function getPlayerConfigSourceByState(webcast, state) {
        return {
            hls: webcast[state].playout.hlsUrl,
            dash: webcast[state].playout.dashUrl
        };
    }

    // player config - style -------------------------------------------------------------------------------------------

    function getPlayerConfigStyle(webcast, state) {
        var style = {
            width: '100%',
            autoHideControls: true
        };

        if (angular.isDefined(webcast[state].playout.audioOnly) && webcast[state].playout.audioOnly) {
            $scope.showAudioOnlyStillImage = true;
            $scope.audioOnlyStillImageUrl = getDefaultStillImage();
            style.autoHideControls = false;
            style.height = '30px';
            if (angular.isDefined(webcast[state].playout.audioOnlyStillUrl) &&
              webcast[state].playout.audioOnlyStillUrl !== '') {
                $scope.audioOnlyStillImageUrl = webcast[state].playout.audioOnlyStillUrl;
            }
        } else {
            style.aspectratio = '16:9';
        }

        return style;
    }

    function getDefaultStillImage() {
      return 'data:image/jpeg;base64,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';
    }
};
