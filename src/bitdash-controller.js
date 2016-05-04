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
        vm.config.source = getPlayerConfigSource(webcast);
        vm.config.style = getPlayerConfigStyle(webcast);
    }

    // player config - source ---------------------------------------------------------------------------------

    function getPlayerConfigSource(webcast) {
        var stateProperty = webcast.state + 'StateData';
        if (webcast.useDVRPlaybackInPostlive === true && webcast.state === 'postlive') {
            return getDVRPlaybackToPostlive(webcast);
        }
        return getPlayerConfigSourceByState(webcast, stateProperty);
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

    function getPlayerConfigStyle(webcast) {
        var style = {
            width: '100%',
            autoHideControls: true
        };

        if (angular.isDefined(webcast.audioOnly) && webcast.audioOnly) {
            style.autoHideControls = false;
            style.height = '30px';
        } else {
            style.aspectratio = '16:9';
        }

        return style;
    }
};

