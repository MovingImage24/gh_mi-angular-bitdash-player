/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @ngInject
	 */

	var BitdashController = __webpack_require__(1),
	    BitdashDirective = __webpack_require__(2);
	    module.exports = angular
	        .module('mi.BitdashPlayer', ['mi/template/bitdash-player.html'])
	        // controller /////////////////////////////////////////////////////////////////////////////////////////////////
	        .controller('MiBitdashController', BitdashController)
	        // directive //////////////////////////////////////////////////////////////////////////////////////////////////
	        .directive('miBitdashPlayer', BitdashDirective);

	    angular.module('mi/template/bitdash-player.html', [])
	        .run(['$templateCache', function ($templateCache) {
	          $templateCache.put('mi/template/bitdash-player.html', '<div>' +
	            '<div ng-show="showAudioOnlyStillImage" id="player-audioonly-still-div" width="100%" height="auto">' +
	            '<img class="img-responsive" ng-src="{{audioOnlyStillImageUrl}}">' +
	            '</div>' +
	            '<div id="mi-bitdash-player" width="100%" height="auto"></div>' +
	            '</div>');
	        }]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @ngInject
	 */
	module.exports = function ($scope, $log) {
	    // controllerAs -> bitdashVm
	    var vm = this;


	    // copy the basic config ... key is mandatory
	    vm.config = {};
	    vm.options = {};
	    if (angular.isDefined($scope.config) && angular.isDefined($scope.config.key)) {
	        vm.config = $scope.config;
	    } else {
	        $log.error('basic config for bitdash player is missing!');
	    }
	    if (angular.isDefined($scope.options)) {
	        vm.options = $scope.options;
	    }

	    // check webcast to expand and manipulate the basic bitdash player config
	    if (angular.isDefined($scope.webcast)) {
	        processWebcast($scope.webcast);
	    }

	    // player config ==========================================================================================

	    function processWebcast(webcast) {
	        var stateProperty = webcast.state + 'StateData';

	        if (angular.isDefined(vm.options.forcedState)) {
	            stateProperty = vm.options.forcedState + 'StateData';
	        }

	        vm.config.source = getPlayerConfigSource(webcast, stateProperty);
	        vm.config.style = getPlayerConfigStyle(webcast, stateProperty);
	    }

	    // player config - source ---------------------------------------------------------------------------------

	    function getPlayerConfigSource(webcast, state) {
	        if (webcast.useDVRPlaybackInPostlive === true && state === 'postliveStateData') {
	            return getDVRPlaybackToPostlive(webcast);
	        }

	        return getPlayerConfigSourceByState(webcast, state);
	    }

	    function getDVRPlaybackToPostlive(webcast) {
	        var offset = '';
	        if (angular.isDefined(webcast['postliveStateData'].playout.offset)) {
	            var playoutOffset = parseInt(webcast['postliveStateData'].playout.offset, 10);

	            if (playoutOffset > 0) {
	                offset = '&wowzadvrplayliststart=' + playoutOffset + '000';
	            }
	        }

	        return {
	            hls: webcast['liveStateData'].playout.hlsUrl.replace('/master.m3u8', 'Dvr/playlist.m3u8?DVR' + offset),
	            dash: webcast['liveStateData'].playout.dashUrl.replace('/playlist.m3u8', 'Dvr/playlist.m3u8?DVR' + offset)
	        };
	    }

	    function getPlayerConfigSourceByState(webcast, state) {
	        var hls = webcast[state].playout.hlsUrl;
	        var dash = webcast[state].playout.dashUrl;

	        if (angular.isDefined(webcast[state].playout.videoManagerHlsUrl) && webcast[state].playout.videoManagerHlsUrl) {
	            hls = webcast[state].playout.videoManagerHlsUrl;
	        }

	        if (angular.isDefined(webcast[state].playout.offset)) {
	            var offset = parseInt(webcast[state].playout.offset, 10);

	            if (offset > 0) {
	                var offsetPrefix = '?';
	                var parser = document.createElement('a');
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

	        return {
	            hls: hls,
	            dash: dash
	        };
	    }

	    // player config - style -------------------------------------------------------------------------------------------

	    function getPlayerConfigStyle(webcast, state) {
	        var style = {
	            width: '100%',
	            autoHideControls: true,
	            playOverlay: false
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
	        return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSl' +
	        'BFRyB2ODApLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSww' +
	        'MTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMj' +
	        'IyMjIy/8AAEQgCewRpAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQEC' +
	        'AwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpan' +
	        'N0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5' +
	        '+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCka' +
	        'GxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWW' +
	        'l5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9BFKBQBTgK' +
	        'AAClopcUAJilxTsUoFADcUuKdilxQAzFLinUUANxRinYPrRg+tADcUYp+PejHvQAzFGKfj3ox70AMxRin/AI0fjQAzFGKfj3ox70AMxRin' +
	        '496Me9ADMUYp+PejHvQAzFGKfj3ox70AMxRin496Me9ADMUYp+PejHvQAzFGKfj3ox70AMxRin/jRj3oAZijFPx70Y96AGYoxT8e9GPegB' +
	        'mKMU/HvRj3oAZijFPx70Y96AGYoxT8e9GKAGYoxT8e9GPegBmKMU/HvRj3oAZijFPx70Y96AGYoxT8UY96AGYoxT8e9GPegBmKMU/HvRj3' +
	        'oAZijFPx70Y96AGYoxT8e9GPegBmKMU/HvRj3oAZijFPx70Y96AGYoxT8e9GPegBmKMU/HvRj3oAZijFPxRj3oAZijFPx70Y96AGYoxT8e' +
	        '9GPegBmKMU/FGPegBmKMU/HvRj3oAZijFPx70Y96AGYoxT8e9GPegBmKMU/HvRj3oAZijFPx70Y96AGYoxT8e9GPegBmKMU/HvRj3oAZij' +
	        'FPx70Y96AGYoxT8e9GPegBmKMU/HvRj3oAZijFPx70Y96AGYoxT8e9GPegBmKMU/HvRj3oAZijFPx70Y96AGYoxT/wAaMe9ADMUYp+PejH' +
	        'vQAzFGKfj3ox70AMxRin496Me9ADMUYp+PejHvQAzFGKf+NGPegBmKMU/HvRj3oAZijFPx70Y96AGYoxT8e9GPegBmKMU/HvRj3oAZijFP' +
	        'x70Y96AGYoxT8e9GPegBmKMU/HvSY96AG4oxTsH1ooAZigin0UAR4pMVJikNADCKTFP200igBpFNIp9IRQAwikxTsUmDQA/FLRSgUAGKcB' +
	        'QBTgKAAClxRSgUAJilxS4pcUAJijFOxRigBMUYp1FADcUYp1FADcUbadRQA3FGKdRQA3FGKdRQA3FGKdRQA3bRtp1FADcUYp1FADcUYp1F' +
	        'ADcUYp1FADcUYp1FADcUbadRQA3FGKdRQA3bRtp1FADcUYp1FADcUYp1FADcUYp1FADdtGKdRQA3FGKdRQA3FGKdRQA3FG2nUUANxRinUU' +
	        'ANxRinUUANxRinUUAN20Yp1FADcUYp1FADcUYp1FADcUYp1FADcUYp1FADcUYp1FADcUbadRQA3FGKdRQA3FG2nUUAN20Yp1FADcUYp1FA' +
	        'DdtGKdRQA3bRtp1FADdtG2nUUANxRinUUAN20Yp1FADcUbadRQA3FG2nUUAN20Yp1FADcUYp1FADdtG2nUUAN20badRQA3FGKdRQA3bRin' +
	        'UUAN20badRQA3bRtp1FADcUYp1FADdtGKdRQA3bRtp1FADdtG2nUUAN20badRQA3FG2nUUAN20badRQA3bRinUUANxRtp1FADdtG2nUUAN' +
	        'xSYp9JigBuKTFPxSYoAYRRTsUhFADcU00+kIoAjNJTyKaRQA00UtJigBRThSCngUALilpKcBQAAU4CgClxQAUtGKUCgBMUuKXFGKAExRil' +
	        'xS4oATApMCnYpcUANwKMClxS4oAZgUuBTsUmKAEwKMCnYoxQA3FGBS4pcUAMwKXApcUuKAGYFLgUuKMUAJgUmBT8UYoAZgUYFPxRigBmBR' +
	        'gU/FJigBuBS4FOxRigBuBRgU7FGKAG4FJgU/FGKAG4FJgU/FGKAG4FJgU/FGKAGYFLgU7FGKAG4FJgU/FGKAG4FJgU/FGKAGYFLgU7FGKA' +
	        'GYFGBT8UYoAZgUYFPxRigBmBS4FOxRigBmBS4FOxRigBuBSYFPxRigBmBS4FOxRigBmBS4FOxRigBuBRgU7FGKAGYFLgU7FGKAGYFLgU7F' +
	        'GKAG4FGBTsUUAMwKMCn4oxQA3AowKdijFADcCkwKfijFADcCjAp2KMUANwKMCnYoxQAzApcCnYoxQA3ApMCn4oxQA3AowKdijFADcCjAp2' +
	        'KMUANwKMCnYoxQA3AowKdijFADcCkwKfijFADcCjAp2KMUANwKMCnYoxQA3AowKdijFADcCjAp2KMUANwKMCnYoxQA3AowKdijFADcCjAp' +
	        '2KMUANwKMCnYoxQAzAowKfijFADcCkwKfijFADcCjAp2KMUAMwKXAp2KMUANwKTAp+KMUAMwKXAp2KMUANwKTAp+KMUANwKTAp+KMUANwK' +
	        'TFPxRigBmKMUuKXFADKKcRSEUANpCKdikIoAYRSU8imkUANIppp9NIoAZikpxptADhTxTRThQAoFOFIKcKAFpaKUCgAFLiiloAKWiloASl' +
	        'oooAKKMUUAFFFFABRRRQAUUUYoAKKKMUAFFGKKACiiigAoooxQAUUYooAKKKKACijFFABRRRigAooxRQAUUUUAFFFFABRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAfhRRRQAUUUUAH4UUUUA' +
	        'FFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRiigAooooAKKKKACiiigAooooAKKKKACiijFABRRRQAUUUUAFFFFABRRRQAUUUUAFFF' +
	        'FABRRRQAUUUUAJijFLRQA2kp9NNADcUlOpCKAGmkNOpDQBGaQ0480hoAYabTjTaAHCn00U6gBwpwpopwoAWnCkFKKAFp1JS0AFFFLQAUYp' +
	        'aKAExRilooATFGKWigBMUYpaKAExRilooATHvRj3paKAEx70YpaKAExRilooATFGKWigBMUYpaKAExRilooATFGKWigBMUYpaKAExRiloo' +
	        'ATFGKWigBMUYpaKAExRilooATFGKWigBMUuKKKADFJilooATFGKWigBMe9LiiigBMUuKKKAExS4oooATFLiiigAxSYpaKAExRilooATFLi' +
	        'iigBMUuKKKAExRilooAMUmKWigBMUYpaKAExRilooATFGKWigBMUYpaKAExRj3paKAExRj3paKAExRilooATFGKWigBMe9GKWigBMe9GKW' +
	        'igBMe9GPelooATFGKWigBMUYpaKAEx70YpaKAExRilooATFGKWigBMUYpaKAExRj3paKAExRj3paKAExRj3paKAExRilooATFGKWigBMUY' +
	        '96WigBMUYpaKAExRilooATFGKWigBMUYpaKAExRilooATHvRilooASkp1JQAlFFFADaQ040hoAYaQ04000ANNNp5pnegBpptOPem0AOFO7' +
	        '00U4daAHDrT+1NFOoAUUopBThQAopaKKAFpaQUtAB1paKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA' +
	        'KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiig' +
	        'AooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKK' +
	        'ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooATFFLSUAIaSlNIaACmmnU00ANNJSmkoAaaYetPNMNACGm0402gBRTxTBTxQA4U6' +
	        'minUAKOlPHWmDpTh1oAdRRRQAopaQUtAC0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUU' +
	        'UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRR' +
	        'RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLSUAB6U2nHpTaACkNLSGgBpptONNoAQ0w080w0ANNNpxptACinimCnigBwp1NFOoAUdKd' +
	        '3pB0pR1oAdRRRQAopaQUtAC0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUU' +
	        'UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRR' +
	        'RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFF' +
	        'FFABRRRQAUUUUAFFFFABRRRQAUlLSUAB6U0049KaaACkNLSGgBpptONNoAQ0w080w0ANNNpxptACinimCnigBwp1NFOoAUdKeOtMHSnjrQ' +
	        'AtFFAoAUUtIKWgBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA' +
	        'ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKA' +
	        'CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo' +
	        'AKKKKACiiigAooooAKSlpKAA9Kaad2ppoAKQ0tIaAGmm0496bQAhphp5phoAaabTj3ptACinimCnigBwp1NFOoAUdKcOtNHSnDrQA6iigU' +
	        'AKKWkFLQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAF' +
	        'FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQA' +
	        'UUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFA' +
	        'BRRRQAUUUUAFJS0lAAelNpx6U00AFIaWkNADTTace9NoAaaaacaaaAGmm0402gBRTxTBTxQA4UtIKWgBw6U8daYOlPHWgBaBRQKAFFLSCl' +
	        'oAWiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoo' +
	        'ooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACi' +
	        'iigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK' +
	        'KKKACkpaSgA7U007tTTQAUhpaQ0ANNNpx702gBDTDTzTDQA002nGm0AKKeKYKfQA4UtIKWgBw6U8daYOlOoAdRRRQAopaQUtAC0UUUAFFF' +
	        'FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUU' +
	        'UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABR' +
	        'RRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLSUA' +
	        'B6U0049KaaACkNLSGgBpptONNoAQ0w080w0ANNNpxptACinimCnigBwpaQU6gBR0pwpo6U8daAFooooAUUtIKWgBaKKKACiiigAooooAKK' +
	        'KKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAo' +
	        'oooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAC' +
	        'iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKSlpKADtTTTj0ppo' +
	        'AKQ0tIe1ADTTacabQAhphp5phoAaabTjTaAFFPFMFPHegBwp1NFOoAUdKcKQdKUdaAHUUUUAKKWkFLQAtFFFABRRRQAUUUUAFFFFABRRRQ' +
	        'AUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUVZs7Q3UhycIvU0AVqK3P7OttuNh+uapz6W65aJtw/unrQBn0UrKUbawII7GkoAKKK' +
	        'KACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoo' +
	        'ooAKKKKACiiigAooooAKKKKACkpaSgAPSmmnHpTTQAUhpaQ0ANNNpxptACGmGnmmGgBpptONNoAUU8UwU8UAOFOpop1ACjpTx1pg6U4daA' +
	        'HUUUUAKKWkFLQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAU' +
	        'UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRQAScDk1rWWnqih5gC56A9BQBk0V0bwRSLtaNSPpWHd2/2ec' +
	        'oPunlfpQBBRRRQAUUUUAFa2ksphde4bJrJp8UzwSb0ODQB0lJVCDU43wJRsPr2q+rBhkEEHvQBFPbRXC4deexHWse6spLbn7yf3h/Wt6kI' +
	        'BGCMigDmaK0bzT9mZIR8vdfT6VnUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUU' +
	        'UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFJS0lAAelNNOPSm0AFIaWkNADTTacabQAjUw080w0ANNNpxptACinim' +
	        'CnigBwp1NFOoAUdKcOtIOlKOtADqKKKAFFLSCloAWiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACi' +
	        'iigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACgZJwBkmgAkgDkmtexsfKAklGX7D' +
	        '0oALGx8oCSQDf2HpV+iloASsjVv+PhP9z+tbFY+rf8fCf7n9aAKFFFFABRRTo42lkCIMk0ANorWTSYwvzuxPtxUM+luoLRNvHoetAGfU9v' +
	        'dS25+U5Xup6VCysrEMCCOxpKAN+2u47lfl4bup61PXNK7IwZTgjoa2bO9FwNj4Eg/WgC4ay7+x25miHH8Sjt71q0hGRQBzNFXL+08iTeg/' +
	        'dt+hqnQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUU' +
	        'UUAFFFFABRRRQAUUUUAFFFFABSUtJQAdqaacelNNABSGlpDQA09KbTjTaAENMNPNMNADTTace9NoAUU8UwU8UAOFOpop1ACjpTxTB0pw60' +
	        'AOoFFFACilpBS0ALRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUA' +
	        'FFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFGCSAByaAMnA6mtexsfKHmSD94eg9KACxsREBJIPn7D0q/RRQAtFFFABWP' +
	        'q3/Hwn+5/WtesjVv+PhP9z+tAFCiiigAq9pePtJz128VRp0btE4dDhhQB0lFUbfUo5MLL8jevarwORkUAQz2sdwuHHPZh1FY1zayWzYYZU' +
	        '9GHeugpkkayoUcZBoA5ulVijBlJBHTFT3dq1tJjqh6Gq9AG7ZXQuY+eHXqP61ZrnYJmglDr26j1roI5FljV16EUAJLEs0bIw4Irn5omhla' +
	        'NuoP510dZ+qW+6MTKPmXg/SgDJooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA' +
	        'ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaQ0AB6U007tTTQAUhpaQ0ANNNpxptACGmGnmmGgBpptOPemUAOFPFMFPoAcKd' +
	        'TRTqAFHSnDrTR0pw60AOooooAUUtIKWgBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiii' +
	        'gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorVtdOjCB5huY/w+lWvsNt/zyWgDAorf+w23/PJaPsNt/wA8loAwKByc' +
	        'DkntW/8AYbb/AJ5LSpaQRuGSMBh0NAFaxsfKAkkGX7D0q/RS0AFFFFABRSUtABWPq3/Hwn+5/WtisfVv+PhP9z+tAFCiiigAoq7BpskqBn' +
	        'bYD0GMmll0uVBlGDj0xg0AUas217JbkDO5O6mqxBUkMCCOxooA6OGZJow6HIqSuetblraUMOVP3h61vI6yIHU5UjINADZ4VniKN36H0NYE' +
	        'sbRSMjDBBro6z9Ut9yCZRyvB+lAGTWjpdxtcwseDyv1rOpUco6up5BzQB0tIyh1KkZBGDSROJIlcdGGafQBzc0RhmaM/wmmVoarFiRJR3G' +
	        'DWfQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUA' +
	        'FFFFABRRRQAUUUUAFJS0lAAelNNOPSmmgApDS0hoAaabTjTaAENMNONNNADT3ptONNoAUU+mCnigBwpaQU6gBR0p4600dKcOtAC0CigUAK' +
	        'KWkFLQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFF' +
	        'FABRRRQAUUUUAFFFFABSp99fqKSnJ/rF+ooA6QdKWkFLQAUUUUAFFFFABRRRQAUUUUAFFFFABWPq3/Hwn+5/WtisfVv+PhP9z+tAFCpLcB' +
	        'riMN0LDNR0A4OR1FAHTClrPtNQWQBJTtfpnsav5oArXdmlwhPSQdGrEdGjcowwRwRXS1m6pbhkEyjkcN9KAMqtHS7jDGBjweVrOp0bmORX' +
	        'XqpzQB0tNdQ6FT0IwaEYOisOhGadQBzUiGOVkPVTim1d1OPbdbuzDNUqANjS5d1uUJ5Q/pV+sbSnxcsvZlrZoAp6jHvs2PdeaxK6OZd8Lr' +
	        '6giucoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK' +
	        'KACiiigAooooAKKKKACkpaSgA7U007tTTQAUhpaQ0ANPSm0496bQAhphp5phoAaabTjTaAFFPFMFPFADhTqaKdQAo6U8daYOlPHWgBaKKK' +
	        'AHCikFLQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAF' +
	        'FFFABRRRQAUUUUAFFFFABTk/1i/UU2nJ/rF+ooA6QUtJS0AFFFFABRRRQAUUUUAFFJS0AFFFFABWPq3/AB8J/uf1rXrI1b/j4T/c/rQBQo' +
	        'oooAK0tNuyW8hzkY+U/wBKzaltSRdxY/vigDoqZIgkjZT0IxT6SgDmSCrEHqOKKkuBi5lH+0ajoA3dPffZp7cVaqjpf/Hqf941eoAzNWX5' +
	        'I29yKy619W/49k/3/wChrIoAsWB23sfucfpW/XPWf/H5F/vCuhoAQ1zbjEjD0JrpDXOTf8fEn++f50AMooooAKKKKACiiigAooooAKKKKA' +
	        'CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKSlpKAA9Kaad2pp' +
	        'oABSHtS0h7UANNNpxptACGmGnmmGgBpplPPemUAOFPFMFPFADhTqaKdQAo6U8UwdKeOtAC0UUUAKKWkFLQAtFFFABRRRQAUUUUAFFFFABR' +
	        'RRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABTk/1i/UU2nJ' +
	        '/rF+ooA6QUtIKWgAoopKAFooooAKKKKACiiigAooooAKx9W/4+E/3P61sVj6t/x8J/uf1oAoUUUUAFWtPhMl0rY+VOTSW1lJcHd92P1P9K' +
	        '2YIEgj2IOP50AS0h4GaWql/P5Ns3PzNwKAMWRt8rN6kmm0Ud6ANrTFxaD3JNXaigj8qBE7gVJQBn6s37mMerVk1oaq+ZUT0Gaz6AJ7IZvY' +
	        'vrXQVh6Yu68B/ugmtygBDXNynMzn1YmujdtqE+gzXNE5JPrQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFJS0lAB2pppx6U00AFIaWkPagBpptONNoAQ0w080w0ANNM' +
	        'p5702gBRTxTBTxQA4U6minUAKOlPFMHSnjrQAtHeiigBRS0gpaAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK' +
	        'KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKcn+sX6im0A4II6igDphS1DBMs8QdSOeo9KmoAKKKKA' +
	        'CiiigBKWiigAooooAKKKKACsfVv+PhP9z+tbFY+rf8fCf7n9aAKFPhQSToh6FgKZSqxRgw6g5FAHSKoVQAMAdBTqqW9/DKg3MEbuCcUs1/' +
	        'BEPvBz6Kc0AWHdY0LsQAOprBu7g3Mxboo4UUXN3Jctzwo6KKgoAKtafAZrkEj5U5NVlUuwVRkngAVvWluLaEL/ABHlj70AT0UtVb6fyLY4' +
	        'PzNwKAMi7l865du2cCoaKKANTSY+JJD3OBWnUFpD5Nsi98ZP1qegCvev5dnIe+MVgVq6tJiNIgeScmsqgAooooAKKKKACiiigAooooAKKK' +
	        'KACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKSlpKAA9Kaace' +
	        'lNNAAKQ9qWkPagBpptONNoAaaaaeaYaAGmmU80ygBwp4pgp4oAcKdTRTqAFHSnjrTR0pw60ALRRRQA4UUCigBaKKKACiiigAooooAKKKKA' +
	        'CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBySPG' +
	        '2UYqfY1J9suf+ez/AJ1DRQBN9suf+ez/AJ0fbLn/AJ7P+dQ0UATfbLn/AJ7P+dPjvrhHDFywHUE9arUUAdFBOk8YdD9R6VLXO29w9vJvTp' +
	        '3HrW7BOk8YdD9R6UAS0UlLQAUUUUAFY+rf8fCf7n9a2Kx9W/4+E/3P60AUKKKKACiiigApVUuwVQSx6CrNvYzT4ONqeprVt7SK3HyjLd2P' +
	        'WgCKyshbje/Mh/SrlFFAASACTwBWDe3H2ickfcXhatajeZzDGf8AeI/lWbQAVZsIPOuRkfKvJqsAScAZNb1nb/Z4QD948saALAopaq30/k' +
	        'W5IPzNwKAMq9l866ZgflHyiq9FFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFF' +
	        'FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLSd6AA9KaacelNNAAKQ0tIaAGmm0402gBDTDTzTDQA00ynmmUAOFPFMFPFADhTqa' +
	        'KdQAo6U8daYOlPHWgBaKKBQA4UUgpaAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKA' +
	        'CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACpbe4e3kDqeO49aiooA6KCdLiMOh+o9Klrnbe4e3k3' +
	        'J07j1rdgnSeMOh+o9KAJaKKKACsfVv+PhP9z+tbFY+rf8AHwn+5/WgChRRRQAVb0+FZbn5hkKM496qVPZ3At7gMfung0Ab9FNSRHUMrAj1' +
	        'FQz3sMAIZst6LzQBYJx16VmXuocGKE/V/wDCq1zfSXHyg7U9BVWgAooq7ZWRmYSSDEY6D1oAl020yRPIOP4R/WtWkAxwOlFAB0FYV9cfaJ' +
	        'zg/IvAq7qN1sTyUPzN94+grJoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA' +
	        'KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApKWkoAD0ppp3ammgApD2paQ9qAGmm0402gBDTDTzTDQA002nGmUAOFPFMFPFADh' +
	        'TqaKdQAo6U8daYOlPHWgBaBRRQAopaQUtAC0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFF' +
	        'FFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVLb3D28m9OncdjUVFAHRQTpPGHQ/UelS1' +
	        'ztvcPbyBlPHcetbsE6XEYdD9R6UAS1j6t/x8J/uf1rXrF1ORZLoAfwrg/WgCnRRRQAUUUUAAJHQ4ooooAKBycDrVmCxnm527V9WrUtrKK3' +
	        'wQNz/wB40AVLTTicSTjA7J/jWoAAMAcUUtACVWvLoW0fq5+6KW6u0t055c9FrDkkaaQu5yTQAjMXYsxySck0lFFABRRRQAUUUUAFFFFABR' +
	        'RRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAF' +
	        'JS0lAAelNNOPSmmgApD2paQ9qAGmm0402gBDTDTzTDQA00ynmmUAOFPFMFPFADhTqaKdQAo6U8daYOlPFAC9qKKKAFFLQKKAFooooAKKKK' +
	        'ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooo' +
	        'oAKKKKACiiigAooooAKKKKACiiigAooooAKfFNJA26NsUyigC0+o3Drt3Ae6jFVfrRRQAUUUUAFFFFABWjplsrlpXGcHABrOrS0u4Vd0LH' +
	        'BJyKANSlpKrz3kMH3my390daALFUbvUVjykXzP69hVG4v5Z8qPlT0FVaAFZmdizElj1JpKKKACiiigAooooAKKKKACiiigAooooAKKKKAC' +
	        'iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaSgAPSmm' +
	        'nHpTTQAUh7UopDQA002nGm0AIaYacaaaAGmm040ygBwp4pgp4oAcKdTRTqAFHSnjrTB0p460ALRRRQAopaBRQAtFFFABRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUU' +
	        'UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUASefNt2+a+PTcajoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAC' +
	        'iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApKWko' +
	        'AD0pppx6U00AFIe1LSGgBpptONNoAQ0w080w0ANNMp5plADhTxTBTxQA4U6minUAKOlPHWmDpTx1oAWiiigBwopBS0ALRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUU' +
	        'UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRR' +
	        'RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABSUtJQAHpTTTj' +
	        '0ppoABSHtS0h7UANNNpx702gBDTDTzTDQA00ynnvTKAHCnimCnigBwp1NFOoAUdKeKYOlPHWgBaKKKAFFLSCloAWiiigAooooAKKKKACii' +
	        'igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKK' +
	        'KKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAo' +
	        'oooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaSgA7U0049KaaA' +
	        'CkNKKQ9qAGmm0402gBDTDTzTDQA002nGm0AKKeKYKeKAHCnU0U6gBR0p4pg6U8daAFo70UUAKKWkFLQAtFFFABRRRQAUUUUAFFFFABRRRQ' +
	        'AUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUU' +
	        'UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFJS0lAAelNNO7U00AApD2pRS' +
	        'HtQA002nGm0AIaYaeaYaAGmmU80ygBwp470wU8UAOFOpop1ACjpTx1po6U4daAFoFFFACiloFFAC0UUUAFFFFABRRRQAUUUUAFFFFABRRR' +
	        'QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFF' +
	        'FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUU' +
	        'UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLSd6AA9KaacelNNAAKQ0tIaAGm' +
	        'm0402gBDTDTzTDQA00ynmmUAOFPFMFPFADhTqaKdQAo6U8daYOlPHWgBaKKBQA4UUgpaAFooooAKKKKACiiigAooooAKKKKACiiigAoooo' +
	        'AKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiii' +
	        'gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK' +
	        'KACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigApKWkoAD0ppp3ammgApD2pRSHtQA002nGm0' +
	        'AIaYaeaYaAGmm040ygBwp4pgp4oAcKdTRTqAFHSnjrTB0p460ALRRRQAopaQUtAC0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFA' +
	        'BRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUU' +
	        'AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRR' +
	        'QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLSGgAPSmmndqaaACkPalpD2oAaabTjTaAENMNP' +
	        'NMNADTTKeabQAop4pgpwoAeKdTRTqAFHSnjrTB0p460AL2ooooAcKKQUtAC0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQ' +
	        'AUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFF' +
	        'ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUU' +
	        'UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUlLSUAB6U00p6UhoAKQ9qUUhoAaabTjTaAENMNPNMNADT' +
	        '3plPNMoAcKcOtNFOoAeOtOpgpwoAcOlOFNFOFADhRSCloAWlpKKAFHSlptLmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRm' +
	        'gBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0' +
	        'ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKT' +
	        'NGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWi' +
	        'kzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAWikzRmgBaKTNGaAFopM0ZoAKKKSgANIaWkoASkN' +
	        'LSGgBppKU0lADTTDTzTD1oAQ0ynHvTaAFFPpgNPoAcDzTqYKeKAFFOBptKKAHU6m5pQaAFpaSigBc0UmaKAHUU3NGaAHUU2jNADqKbmjNA' +
	        'DqKbmjNADqKbmjNADqKbmjNADqKbRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1F' +
	        'NzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1H403NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU' +
	        '3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUU3NGaAHUfjTc0ZoAdRTc0ZoAdRTc0ZoAdR+NNzRmgB1FNzRmgB1FNzRmgB1' +
	        'FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FNzRmgB1FN' +
	        'zRmgB1FNzRmgB1FNzRmgB1JSZooAWg0maKACiikzQAU0mlppNACGkNLSGgBpptONNoAaabTiaZmgBRT6YKcKAHg04UwU4GgB9FNzTqAFBp' +
	        '1MpQaAH5ozTc0uaAHUU3NLn3oAWikz70Z96AFopM+9GfegBaKTPvRn3oAWikz70Z96AFopM+9GaAFopM+9GfegBaKTNGfegBaKTPvRn3oA' +
	        'Wikz70Z96AFopM+9GfegBaKTNGfegBaKTPvRn3oAWikzRn3oAWikzRmgBaKTNGfegBaKTPvRmgBaKTNGfegBaKTNGaAFopM+9GfegBaKTN' +
	        'GfegBaKTNGfegBaKTPvRmgBaKTPvRmgBaKTPvRn3oAWikzRn3oAWikzRmgBaKTNGfegBaKTNGaAFopM+9GaAFopM+9GfegBaKTNGfegBaK' +
	        'TNGaAFopM+9GaAFopM0ZoAWikz70Z96AFopM0ZoAWikz70ZoAWikz70ZoAWikzRmgBaKTNGaAFopM+9GaAFopM0ZoAWikz70ZoAWikzRmg' +
	        'BaKTNGfegBaKTNGaAFopM+9GaAFopM0ZoAWikzRmgBaKTPvRmgBaKTNGaAFopM0Z96AFopM+9GfegBaKTPvRn3oAWikz70ZoAWikz70ZoA' +
	        'WikzRn3oAWikz70Z96AFopM+9GfegBaSkzRmgBc0lJmgmgAJptFFABTTSk00mgBCaaaU00mgBDTaU02gBRThTBTgaAHg0tNBpc0APBpQaY' +
	        'DTgaAH0U3NLmgB2aM02loAXNLmm0UAPzRmmZooAfmkzTc0UAPzSZpuaM0APzSZptGaAHZozTc0ZoAdmjNNzRmgB2aM03NGaAH5pM03NGaA' +
	        'HZozTc0ZoAdmjNNzRmgB2aM03NGaAHZozTc0ZoAdmjNNzRmgB2aM03NGaAHZozTc0ZoAfmkzTc0UAPzRmmZozQA/NJmm5ozQA7NLmmZooA' +
	        'dmjNNooAdmlzTM0ZoAfmkzTc0ZoAdmjNNzRQA7NGabmjNADs0ZpuaKAHZozTc0ZoAdmjNNozQA7NGabmigB2aXNMzRmgB+aM0zNGaAH5oz' +
	        'TM0ZoAfmkzTc0ZoAdmlzTM0UAOzRmm0ZoAfmkzTc0UAOzRmm0UAOzRmm0UAOzRmm0ZoAdmjNNzRmgB+aTNNozQA7NGabRmgB1GabRmgB+a' +
	        'TNNzRQA7NLmmUUAOzS5plGaAHZpc0yigB2aXNMozQA7NGabmjNAD80mabmigB2aXNMooAfRmmUZoAdmjNNzRQA6jNNooAdmjNNzRmgB+aT' +
	        'NNzRQA7NLmmUUAOzRmm0UAOzRmm5ozQA7NGabmigBc0ZpKKAFJpKM0maAFppNGaQmgAJptGaTNAAaaaUmmk0AITSUGigBKWmg0oNADwacD' +
	        'UdOBoAfS0zNLmgB+aXNMpaAH5ozTM0uaAHZpc0zNGaAH5oyKZmjNAD80ZFMzRmgB+aMimZozQA/NGaZmjNAD80ZpmaM0APzRmmZozQA/NG' +
	        'aZmjNAD80ZpmaM0APzRmmZozQA/NGaZmjNAD80ZpmaM0APzRmmZozQA/NGaZmjNAD80ZpmaM+9AD8ijNMzRmgB+RRkUzNGaAH5FGaZmjNA' +
	        'D80ZpmaM0APzRmmZozQA/IozTM0ZoAfkUZFMzRmgB+aM0zNGaAH5FGRTM0ZoAfmjNMzRmgB+aMimZozQA/IoyKZmjNAD80ZFMzRmgB+aMi' +
	        'mZ96M0APzRmmZozQA/NGRTM0ZoAfkUZpmaM0APzRkUzNGaAH5oyKZmjNAD8ijIpmaM0APyKMimZozQA/NGaZmjNAD8ijIpmaM0APyKMimZ' +
	        'ozQA/NGRTM0ZoAfkUZpmaM0APyKMimZozQA/IoyKZmjNAD8ijIpmaM0APzRkUzNGaAH5FGRTM0ZoAfmjIpmaM0APyKMimZozQA/IoyKZmj' +
	        'NAD80ZpmaM0APyKMimZozQA/IoyKZmjNAD8ijIpmaM0APyKM0zNGaAH5ozTM0ZoAfmjIpmaM0APzRmmZozQA/NGRTM0ZoAfkUZFMzRmgB+' +
	        'aM0zNGaAHZozTc0ZoAcTSZpuaKAFJpM0lJmgBaQmjNNJoACaaaKSgANFIaTNACA04UwUooAfS00UooAdTs0yigB4NLmmUCgCTNGaZS0AO/' +
	        'Cj8KbRQA7NLmmUUAOzS5plFADs0ZptFAD8+1GaZRmgB+aM0yigB+aM0yjNAD80ZplFAD80Z9qZRQA7NLmmZozQA/NGaZRQA/NGaZmigB+a' +
	        'M0yjNAD80ZpmaTNAEmaM0zNJmgCTNGajzRmgCTNGaZmkzQBJmjNMzRmgB+aM1HmjNAEmaM1HmjNAEmaM0zNJmgCTNGajzS5oAfmjNR5pc0' +
	        'APzRmmZozQA/NGaZmkzQBJmjNR5pc0APzRmo80ZoAkzRmo80ZoAkzRmmZpM0ASZozUeaM0ASZozTM0maAJM0ZqPNGaAJM0ZqPNGaAJM0Zq' +
	        'PNLmgB+aM0zNJmgB+aXNMzSZoAkzRmo80uaAH5ozTM0ZoAfmjNR5pc0APzRmmZozQA/NGaZmkzQBJmjNR5pc0APzRmo80ZoAkzRmo80uaA' +
	        'H5ozUeaXNAD80ZpmaTNAEmaM1HmlzQA/NGaZmjNAD80ZpmaTNAEmaM1HmlzQA/NGaZmjNAD80ZqPNLmgB+aM1HmjNAEmaM0zNJmgCTNGaj' +
	        'zRmgCTNGaZmjNAD80ZpmaM80APzRmo80ZoAkzRmmZpM0ASZpM03NGaAHfhRn2puaSgB+aQmm0lADs0ZptJQAppKKQ0AFITSmmGgAJopDRQ' +
	        'B//9k=';
	    }
	};
	module.exports.$inject = ["$scope", "$log"];


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @ngInject
	 */
	module.exports = function ($window) {
	    // directive ///////////////////////////////////////////////////////////////////////////////////////////////////////
	    return {
	        restrict: 'EA',
	        replace: true,
	        controller: 'MiBitdashController',
	        controllerAs: 'bitdashVm',
	        templateUrl: 'mi/template/bitdash-player.html',
	        scope: {
	            config: '=',
	            webcast: '=',
	            options: '=?'

	        },
	        link: function (scope) {
	            var config = scope.config;  // die config wird automatisch durch den controller erweitert
	            var player = $window.window.bitmovin.player('mi-bitdash-player');
	            if (angular.isDefined(player) && player.isReady() === true) {
	              player.destroy();
	            }
	            player = $window.window.bitmovin.player('mi-bitdash-player');
	            player.setup(config);

	            var state = scope.webcast.state + 'StateData';
	            var bitmovinControlbar = angular.element(document.getElementsByClassName('bitdash-vc'));

	            if (angular.isDefined(scope.webcast[state].playout.audioOnly) && scope.webcast[state].playout.audioOnly) {
	                bitmovinControlbar[0].style.minHeight = '30px';
	                bitmovinControlbar[0].style.minWidth = '195px';
	            } else {
	              bitmovinControlbar[0].style.minWidth = '175px';
	            }
	        }
	    };
	};
	module.exports.$inject = ["$window"];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDA4ZGUxZGIzZmIyYjkwMTA5OGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELHdCQUF3QjtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxVQUFTLEc7Ozs7OztBQ3ZCVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMVZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFUztBQUNUO0FBQ0EsaUNBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEciLCJmaWxlIjoibWktYW5ndWxhci1iaXRkYXNoLXBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAwOGRlMWRiM2ZiMmI5MDEwOThmIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5cbnZhciBCaXRkYXNoQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYml0ZGFzaC1jb250cm9sbGVyJyksXG4gICAgQml0ZGFzaERpcmVjdGl2ZSA9IHJlcXVpcmUoJy4vYml0ZGFzaC1kaXJlY3RpdmUnKTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWkuQml0ZGFzaFBsYXllcicsIFsnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCddKVxuICAgICAgICAvLyBjb250cm9sbGVyIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgLmNvbnRyb2xsZXIoJ01pQml0ZGFzaENvbnRyb2xsZXInLCBCaXRkYXNoQ29udHJvbGxlcilcbiAgICAgICAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC5kaXJlY3RpdmUoJ21pQml0ZGFzaFBsYXllcicsIEJpdGRhc2hEaXJlY3RpdmUpO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLCBbXSlcbiAgICAgICAgLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJywgJzxkaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBuZy1zaG93PVwic2hvd0F1ZGlvT25seVN0aWxsSW1hZ2VcIiBpZD1cInBsYXllci1hdWRpb29ubHktc3RpbGwtZGl2XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiYXV0b1wiPicgK1xuICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIG5nLXNyYz1cInt7YXVkaW9Pbmx5U3RpbGxJbWFnZVVybH19XCI+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBpZD1cIm1pLWJpdGRhc2gtcGxheWVyXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiYXV0b1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicpO1xuICAgICAgICB9XSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICRsb2cpIHtcbiAgICAvLyBjb250cm9sbGVyQXMgLT4gYml0ZGFzaFZtXG4gICAgdmFyIHZtID0gdGhpcztcblxuXG4gICAgLy8gY29weSB0aGUgYmFzaWMgY29uZmlnIC4uLiBrZXkgaXMgbWFuZGF0b3J5XG4gICAgdm0uY29uZmlnID0ge307XG4gICAgdm0ub3B0aW9ucyA9IHt9O1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuY29uZmlnKSAmJiBhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuY29uZmlnLmtleSkpIHtcbiAgICAgICAgdm0uY29uZmlnID0gJHNjb3BlLmNvbmZpZztcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbG9nLmVycm9yKCdiYXNpYyBjb25maWcgZm9yIGJpdGRhc2ggcGxheWVyIGlzIG1pc3NpbmchJyk7XG4gICAgfVxuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUub3B0aW9ucykpIHtcbiAgICAgICAgdm0ub3B0aW9ucyA9ICRzY29wZS5vcHRpb25zO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHdlYmNhc3QgdG8gZXhwYW5kIGFuZCBtYW5pcHVsYXRlIHRoZSBiYXNpYyBiaXRkYXNoIHBsYXllciBjb25maWdcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLndlYmNhc3QpKSB7XG4gICAgICAgIHByb2Nlc3NXZWJjYXN0KCRzY29wZS53ZWJjYXN0KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1dlYmNhc3Qod2ViY2FzdCkge1xuICAgICAgICB2YXIgc3RhdGVQcm9wZXJ0eSA9IHdlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcblxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodm0ub3B0aW9ucy5mb3JjZWRTdGF0ZSkpIHtcbiAgICAgICAgICAgIHN0YXRlUHJvcGVydHkgPSB2bS5vcHRpb25zLmZvcmNlZFN0YXRlICsgJ1N0YXRlRGF0YSc7XG4gICAgICAgIH1cblxuICAgICAgICB2bS5jb25maWcuc291cmNlID0gZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QsIHN0YXRlUHJvcGVydHkpO1xuICAgICAgICB2bS5jb25maWcuc3R5bGUgPSBnZXRQbGF5ZXJDb25maWdTdHlsZSh3ZWJjYXN0LCBzdGF0ZVByb3BlcnR5KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc291cmNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QsIHN0YXRlKSB7XG4gICAgICAgIGlmICh3ZWJjYXN0LnVzZURWUlBsYXliYWNrSW5Qb3N0bGl2ZSA9PT0gdHJ1ZSAmJiBzdGF0ZSA9PT0gJ3Bvc3RsaXZlU3RhdGVEYXRhJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldERWUlBsYXliYWNrVG9Qb3N0bGl2ZSh3ZWJjYXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREVlJQbGF5YmFja1RvUG9zdGxpdmUod2ViY2FzdCkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gJyc7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0Wydwb3N0bGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQub2Zmc2V0KSkge1xuICAgICAgICAgICAgdmFyIHBsYXlvdXRPZmZzZXQgPSBwYXJzZUludCh3ZWJjYXN0Wydwb3N0bGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQub2Zmc2V0LCAxMCk7XG5cbiAgICAgICAgICAgIGlmIChwbGF5b3V0T2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9ICcmd293emFkdnJwbGF5bGlzdHN0YXJ0PScgKyBwbGF5b3V0T2Zmc2V0ICsgJzAwMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGxzOiB3ZWJjYXN0WydsaXZlU3RhdGVEYXRhJ10ucGxheW91dC5obHNVcmwucmVwbGFjZSgnL21hc3Rlci5tM3U4JywgJ0R2ci9wbGF5bGlzdC5tM3U4P0RWUicgKyBvZmZzZXQpLFxuICAgICAgICAgICAgZGFzaDogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuZGFzaFVybC5yZXBsYWNlKCcvcGxheWxpc3QubTN1OCcsICdEdnIvcGxheWxpc3QubTN1OD9EVlInICsgb2Zmc2V0KVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpIHtcbiAgICAgICAgdmFyIGhscyA9IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuaGxzVXJsO1xuICAgICAgICB2YXIgZGFzaCA9IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuZGFzaFVybDtcblxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdFtzdGF0ZV0ucGxheW91dC52aWRlb01hbmFnZXJIbHNVcmwpICYmIHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQudmlkZW9NYW5hZ2VySGxzVXJsKSB7XG4gICAgICAgICAgICBobHMgPSB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LnZpZGVvTWFuYWdlckhsc1VybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0Lm9mZnNldCkpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBwYXJzZUludCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0Lm9mZnNldCwgMTApO1xuXG4gICAgICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRQcmVmaXggPSAnPyc7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgICAgICBwYXJzZXIuaHJlZiA9IGhscztcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXRQcmVmaXggPSAnJic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaGxzICs9IG9mZnNldFByZWZpeCArICdzdGFydD0nICsgb2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGRhc2gpICYmIGRhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UHJlZml4ID0gJz8nO1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuaHJlZiA9IGRhc2g7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZXIuc2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UHJlZml4ID0gJyYnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGFzaCArPSBvZmZzZXRQcmVmaXggKyAnc3RhcnQ9JyArIG9mZnNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGxzOiBobHMsXG4gICAgICAgICAgICBkYXNoOiBkYXNoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyAtIHN0eWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1N0eWxlKHdlYmNhc3QsIHN0YXRlKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBhdXRvSGlkZUNvbnRyb2xzOiB0cnVlLFxuICAgICAgICAgICAgcGxheU92ZXJsYXk6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuYXVkaW9Pbmx5KSAmJiB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seSkge1xuICAgICAgICAgICAgJHNjb3BlLnNob3dBdWRpb09ubHlTdGlsbEltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgICRzY29wZS5hdWRpb09ubHlTdGlsbEltYWdlVXJsID0gZ2V0RGVmYXVsdFN0aWxsSW1hZ2UoKTtcbiAgICAgICAgICAgIHN0eWxlLmF1dG9IaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9ICczMHB4JztcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seVN0aWxsVXJsKSAmJlxuICAgICAgICAgICAgICAgIHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuYXVkaW9Pbmx5U3RpbGxVcmwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmF1ZGlvT25seVN0aWxsSW1hZ2VVcmwgPSB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seVN0aWxsVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUuYXNwZWN0cmF0aW8gPSAnMTY6OSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdFN0aWxsSW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNEFBUVNrWkpSZ0FCQVFFQVlBQmdBQUQvL2dBK1ExSkZRVlJQVWpvZ1oyUXRhbkJsWnlCMk1TNHdJQ2gxYzJsdVp5QkpTa2NnU2wnICtcbiAgICAgICAgJ0JGUnlCMk9EQXBMQ0JrWldaaGRXeDBJSEYxWVd4cGRIa0svOXNBUXdBSUJnWUhCZ1VJQndjSENRa0lDZ3dVRFF3TEN3d1pFaE1QRkIwYUh4NGRHaHdjSUNRdUp5QWlMQ01jSENnM0tTd3cnICtcbiAgICAgICAgJ01UUTBOQjhuT1QwNE1qd3VNelF5LzlzQVF3RUpDUWtNQ3d3WURRMFlNaUVjSVRJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWonICtcbiAgICAgICAgJ0l5TWpJeS84QUFFUWdDZXdScEF3RWlBQUlSQVFNUkFmL0VBQjhBQUFFRkFRRUJBUUVCQUFBQUFBQUFBQUFCQWdNRUJRWUhDQWtLQy8vRUFMVVFBQUlCQXdNQ0JBTUZCUVFFQUFBQmZRRUMnICtcbiAgICAgICAgJ0F3QUVFUVVTSVRGQkJoTlJZUWNpY1JReWdaR2hDQ05Dc2NFVlV0SHdKRE5pY29JSkNoWVhHQmthSlNZbktDa3FORFUyTnpnNU9rTkVSVVpIU0VsS1UxUlZWbGRZV1ZwalpHVm1aMmhwYW4nICtcbiAgICAgICAgJ04wZFhaM2VIbDZnNFNGaG9lSWlZcVNrNVNWbHBlWW1acWlvNlNscHFlb3FhcXlzN1MxdHJlNHVickN3OFRGeHNmSXljclMwOVRWMXRmWTJkcmg0dVBrNWVibjZPbnE4Zkx6OVBYMjkvajUnICtcbiAgICAgICAgJyt2L0VBQjhCQUFNQkFRRUJBUUVCQVFFQUFBQUFBQUFCQWdNRUJRWUhDQWtLQy8vRUFMVVJBQUlCQWdRRUF3UUhCUVFFQUFFQ2R3QUJBZ01SQkFVaE1RWVNRVkVIWVhFVElqS0JDQlJDa2EnICtcbiAgICAgICAgJ0d4d1Frak0xTHdGV0p5MFFvV0pEVGhKZkVYR0JrYUppY29LU28xTmpjNE9UcERSRVZHUjBoSlNsTlVWVlpYV0ZsYVkyUmxabWRvYVdwemRIVjJkM2g1ZW9LRGhJV0doNGlKaXBLVGxKV1cnICtcbiAgICAgICAgJ2w1aVptcUtqcEtXbXA2aXBxckt6dExXMnQ3aTV1c0xEeE1YR3g4akp5dExUMU5YVzE5aloydUxqNU9YbTUranA2dkx6OVBYMjkvajUrdi9hQUF3REFRQUNFUU1SQUQ4QTlCRktCUUJUZ0snICtcbiAgICAgICAgJ0FBQ2xvcGNVQUppbHhUc1VvRkFEY1V1S2RpbHhRQXpGTGluVVVBTnhSaW5ZUHJSZyt0QURjVVlwK1Blakh2UUF6RkdLZmozb3g3MEFNeFJpbi9BSTBmalFBekZHS2ZqM294NzBBTXhSaW4nICtcbiAgICAgICAgJzQ5Nk1lOUFETVVZcCtQZWpIdlFBekZHS2ZqM294NzBBTXhSaW40OTZNZTlBRE1VWXArUGVqSHZRQXpGR0tmajNveDcwQU14UmluL2pSajNvQVppakZQeDcwWTk2QUdZb3hUOGU5R1BlZ0InICtcbiAgICAgICAgJ21LTVUvSHZSajNvQVppakZQeDcwWTk2QUdZb3hUOGU5R0tBR1lveFQ4ZTlHUGVnQm1LTVUvSHZSajNvQVppakZQeDcwWTk2QUdZb3hUOFVZOTZBR1lveFQ4ZTlHUGVnQm1LTVUvSHZSajMnICtcbiAgICAgICAgJ29BWmlqRlB4NzBZOTZBR1lveFQ4ZTlHUGVnQm1LTVUvSHZSajNvQVppakZQeDcwWTk2QUdZb3hUOGU5R1BlZ0JtS01VL0h2Umozb0FaaWpGUHhSajNvQVppakZQeDcwWTk2QUdZb3hUOGUnICtcbiAgICAgICAgJzlHUGVnQm1LTVUvRkdQZWdCbUtNVS9IdlJqM29BWmlqRlB4NzBZOTZBR1lveFQ4ZTlHUGVnQm1LTVUvSHZSajNvQVppakZQeDcwWTk2QUdZb3hUOGU5R1BlZ0JtS01VL0h2Umozb0FaaWonICtcbiAgICAgICAgJ0ZQeDcwWTk2QUdZb3hUOGU5R1BlZ0JtS01VL0h2Umozb0FaaWpGUHg3MFk5NkFHWW94VDhlOUdQZWdCbUtNVS9IdlJqM29BWmlqRlB4NzBZOTZBR1lveFQvd0FhTWU5QURNVVlwK1BlakgnICtcbiAgICAgICAgJ3ZRQXpGR0tmajNveDcwQU14UmluNDk2TWU5QURNVVlwK1Blakh2UUF6RkdLZitOR1BlZ0JtS01VL0h2Umozb0FaaWpGUHg3MFk5NkFHWW94VDhlOUdQZWdCbUtNVS9IdlJqM29BWmlqRlAnICtcbiAgICAgICAgJ3g3MFk5NkFHWW94VDhlOUdQZWdCbUtNVS9IdlNZOTZBRzRveFRzSDFvb0FaaWdpbjBVQVI0cE1WSmlrTkFEQ0tURlAyMDBpZ0JwRk5JcDlJUlFBd2lreFRzVW1EUUEvRkxSU2dVQUdLY0InICtcbiAgICAgICAgJ1FCVGdLQUFDbHhSU2dVQUppbHhTNHBjVUFKaWpGT3hSaWdCTVVZcDFGQURjVVlwMUZBRGNVYmFkUlFBM0ZHS2RSUUEzRkdLZFJRQTNGR0tkUlFBM2JSdHAxRkFEY1VZcDFGQURjVVlwMUYnICtcbiAgICAgICAgJ0FEY1VZcDFGQURjVVlwMUZBRGNVYmFkUlFBM0ZHS2RSUUEzYlJ0cDFGQURjVVlwMUZBRGNVWXAxRkFEY1VZcDFGQURkdEdLZFJRQTNGR0tkUlFBM0ZHS2RSUUEzRkcyblVVQU54UmluVVUnICtcbiAgICAgICAgJ0FOeFJpblVVQU54UmluVVVBTjIwWXAxRkFEY1VZcDFGQURjVVlwMUZBRGNVWXAxRkFEY1VZcDFGQURjVVlwMUZBRGNVYmFkUlFBM0ZHS2RSUUEzRkcyblVVQU4yMFlwMUZBRGNVWXAxRkEnICtcbiAgICAgICAgJ0RkdEdLZFJRQTNiUnRwMUZBRGR0RzJuVVVBTnhSaW5VVUFOMjBZcDFGQURjVWJhZFJRQTNGRzJuVVVBTjIwWXAxRkFEY1VZcDFGQURkdEcyblVVQU4yMGJhZFJRQTNGR0tkUlFBM2JSaW4nICtcbiAgICAgICAgJ1VVQU4yMGJhZFJRQTNiUnRwMUZBRGNVWXAxRkFEZHRHS2RSUUEzYlJ0cDFGQURkdEcyblVVQU4yMGJhZFJRQTNGRzJuVVVBTjIwYmFkUlFBM2JSaW5VVUFOeFJ0cDFGQURkdEcyblVVQU4nICtcbiAgICAgICAgJ3hTWXA5SmlnQnVLVEZQeFNZb0FZUlJUc1VoRkFEY1UwMCtrSW9Bak5KVHlLYVJRQTAwVXRKaWdCUlRoU0NuZ1VBTGlscEtjQlFBQVU0Q2dDbHhRQVV0R0tVQ2dCTVV1S1hGR0tBRXhSaWwnICtcbiAgICAgICAgJ3hTNG9BVEFwTUNuWXBjVUFOd0tNQ2x4UzRvQVpnVXVCVHNVbUtBRXdLTUNuWW94UUEzRkdCUzRwY1VBTXdLWEFwY1V1S0FHWUZMZ1V1S01VQUpnVW1CVDhVWW9BWmdVWUZQeFJpZ0JtQlInICtcbiAgICAgICAgJ2dVL0ZKaWdCdUJTNEZPeFJpZ0J1QlJnVTdGR0tBRzRGSmdVL0ZHS0FHNEZKZ1UvRkdLQUc0RkpnVS9GR0tBR1lGTGdVN0ZHS0FHNEZKZ1UvRkdLQUc0RkpnVS9GR0tBR1lGTGdVN0ZHS0EnICtcbiAgICAgICAgJ0dZRkdCVDhVWW9BWmdVWUZQeFJpZ0JtQlM0Rk94UmlnQm1CUzRGT3hSaWdCdUJTWUZQeFJpZ0JtQlM0Rk94UmlnQm1CUzRGT3hSaWdCdUJSZ1U3RkdLQUdZRkxnVTdGR0tBR1lGTGdVN0YnICtcbiAgICAgICAgJ0dLQUc0RkdCVHNVVUFNd0tNQ240b3hRQTNBb3dLZGlqRkFEY0Nrd0tmaWpGQURjQ2pBcDJLTVVBTndLTUNuWW94UUF6QXBjQ25Zb3hRQTNBcE1DbjRveFFBM0Fvd0tkaWpGQURjQ2pBcDInICtcbiAgICAgICAgJ0tNVUFOd0tNQ25Zb3hRQTNBb3dLZGlqRkFEY0Nrd0tmaWpGQURjQ2pBcDJLTVVBTndLTUNuWW94UUEzQW93S2RpakZBRGNDakFwMktNVUFOd0tNQ25Zb3hRQTNBb3dLZGlqRkFEY0NqQXAnICtcbiAgICAgICAgJzJLTVVBTndLTUNuWW94UUF6QW93S2ZpakZBRGNDa3dLZmlqRkFEY0NqQXAyS01VQU13S1hBcDJLTVVBTndLVEFwK0tNVUFNd0tYQXAyS01VQU53S1RBcCtLTVVBTndLVEFwK0tNVUFOd0snICtcbiAgICAgICAgJ1RGUHhSaWdCbUtNVXVLWEZBREtLY1JTRVVBTnBDS2Rpa0lvQVlSU1U4aW1rVUFOSXBwcDlOSW9BWmlrcHhwdEFEaFR4VFJUaFFBb0ZPRklLY0tBRnBhS1VDZ0FGTGlpbG9BS1dpbG9BU2wnICtcbiAgICAgICAgJ29vb0FLS01VVUFGRkZGQUJSUlJRQVVVVVlvQUtLS01VQUZGR0tLQUNpaWlnQW9vb3hRQVVVWW9vQUtLS0tBQ2lqRkZBQlJSUmlnQW9veFJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQWZoUlJSUUFVVVVVQUg0VVVVVUEnICtcbiAgICAgICAgJ0ZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlqRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkYnICtcbiAgICAgICAgJ0ZBQlJSUlFBVVVVVUFKaWpGTFJRQTJrcDlOTkFEY1VsT3BDS0FHbWtOT3BEUUJHYVEwNDgwaG9BWWFiVGpUYUFIQ24wMFU2Z0J3cHdwb3B3b0FXbkNrRktLQUZwMUpTMEFGRkZMUUFVWXAnICtcbiAgICAgICAgJ2FLQUV4Umlsb29BVEZHS1dpZ0JNVVlwYUtBRXhSaWxvb0FUSHZSajNwYUtBRXg3MFlwYUtBRXhSaWxvb0FURkdLV2lnQk1VWXBhS0FFeFJpbG9vQVRGR0tXaWdCTVVZcGFLQUV4Umlsb28nICtcbiAgICAgICAgJ0FURkdLV2lnQk1VWXBhS0FFeFJpbG9vQVRGR0tXaWdCTVV1S0tLQURGSmlsb29BVEZHS1dpZ0JNZTlMaWlpZ0JNVXVLS0tBRXhTNG9vb0FURkxpaWlnQXhTWXBhS0FFeFJpbG9vQVRGTGknICtcbiAgICAgICAgJ2lpZ0JNVXVLS0tBRXhSaWxvb0FNVW1LV2lnQk1VWXBhS0FFeFJpbG9vQVRGR0tXaWdCTVVZcGFLQUV4UmozcGFLQUV4UmozcGFLQUV4Umlsb29BVEZHS1dpZ0JNZTlHS1dpZ0JNZTlHS1cnICtcbiAgICAgICAgJ2lnQk1lOUdQZWxvb0FURkdLV2lnQk1VWXBhS0FFeDcwWXBhS0FFeFJpbG9vQVRGR0tXaWdCTVVZcGFLQUV4UmozcGFLQUV4UmozcGFLQUV4UmozcGFLQUV4Umlsb29BVEZHS1dpZ0JNVVknICtcbiAgICAgICAgJzk2V2lnQk1VWXBhS0FFeFJpbG9vQVRGR0tXaWdCTVVZcGFLQUV4Umlsb29BVEh2Umlsb29BU2twMUpRQWxGRkZBRGFRMDQwaG9BWWFRMDQwMDBBTk5OcDVwbmVnQnBwdE9QZW0wQU9GTzcnICtcbiAgICAgICAgJzAwVTRkYUFIRHJUKzFORk9vQVVVb3BCVGhRQW9wYUtLQUZwYVFVdEFCMXBhS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0EnICtcbiAgICAgICAgJ0tLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWcnICtcbiAgICAgICAgJ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0snICtcbiAgICAgICAgJ0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BVEZGTFNVQUlhU2xOSWFBQ21tblUwMEFOTkpTbWtvQWFhWWV0UE5NTkFDR20wNDAyZ0JSVHhUQlR4UUE0VTYnICtcbiAgICAgICAgJ21pblVBS09sUEhXbURwVGgxb0FkUlJSUUFvcGFRVXRBQzBVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVUnICtcbiAgICAgICAgJ1VBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlInICtcbiAgICAgICAgJ1JRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVWxMU1VBQjZVMm5IcFRhQUNrTkxTR2dCcHB0T05Ob0FRMHcwODB3MEFOTk5weHB0QUNpbmltQ25pZ0J3cDFORk9vQVVkS2QnICtcbiAgICAgICAgJzNwQjBwUjFvQWRSUlJRQW9wYVFVdEFDMFVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVUnICtcbiAgICAgICAgJ1VBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlInICtcbiAgICAgICAgJ1JRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkYnICtcbiAgICAgICAgJ0ZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVbExTVUFCNlUwMDQ5S2FhQUNrTkxTR2dCcHB0T05Ob0FRMHcwODB3MEFOTk5weHB0QUNpbmltQ25pZ0J3cDFORk9vQVVkS2VPdE1IU25qclEnICtcbiAgICAgICAgJ0F0RkZBb0FVVXRJS1dnQmFLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0EnICtcbiAgICAgICAgJ29vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0EnICtcbiAgICAgICAgJ0NpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb28nICtcbiAgICAgICAgJ0FLS0tLQUNpaWlnQW9vb29BS1NscEtBQTlLYWFkMnBwb0FLUTB0SWFBR21tMDQ5NmJRQWhwaHA1cGhvQWFhYlRqM3B0QUNpbmltQ25pZ0J3cDFORk9vQVVkS2NPdE5IU25EclFBNmlpZ1UnICtcbiAgICAgICAgJ0FLS1drRkxRQXRGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUYnICtcbiAgICAgICAgJ0ZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUEnICtcbiAgICAgICAgJ1VVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkEnICtcbiAgICAgICAgJ0JSUlJRQVVVVVVBRkpTMGxBQWVsTnB4NlUwMEFGSWFXa05BRFRUYWNlOU5vQWFhYWFjYWFhQUdtbTA0MDJnQlJUeFRCVHhRQTRVdElLV2dCdzZVOGRhWU9sUEhXZ0JhQlJRS0FGRkxTQ2wnICtcbiAgICAgICAgJ29BV2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb28nICtcbiAgICAgICAgJ29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2knICtcbiAgICAgICAgJ2lpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUsnICtcbiAgICAgICAgJ0tLS0FDa3BhU2dBN1UwMDd0VFRRQVVocGFRMEFOTk5weDcwMmdCRFREVHpURFFBMDAybkdtMEFLS2VLWUtmUUE0VXRJS1dnQnc2VThkYVlPbE9vQWRSUlJRQW9wYVFVdEFDMFVVVUFGRkYnICtcbiAgICAgICAgJ0ZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVUnICtcbiAgICAgICAgJ1VVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlInICtcbiAgICAgICAgJ1JSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVbExTVUEnICtcbiAgICAgICAgJ0I2VTAwNDlLYWFBQ2tOTFNHZ0JwcHRPTk5vQVEwdzA4MHcwQU5OTnB4cHRBQ2luaW1DbmlnQndwYVFVNmdCUjBwd3BvNlU4ZGFBRm9vb29BVVV0SUtXZ0JhS0tLQUNpaWlnQW9vb29BS0snICtcbiAgICAgICAgJ0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW8nICtcbiAgICAgICAgJ29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUMnICtcbiAgICAgICAgJ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtTbHBLQUR0VFRUajBwcG8nICtcbiAgICAgICAgJ0FLUTB0SWUxQURUVGFjYWJRQWhwaHA1cGhvQWFhYlRqVGFBRkZQRk1GUEhlZ0J3cDFORk9vQVVkS2NLUWRLVWRhQUhVVVVVQUtLV2tGTFFBdEZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlEnICtcbiAgICAgICAgJ0FVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVlpzN1EzVWh5Y0l2VTBBVnFLM1A3T3R0dU5oK3VhcHo2VzY1YUp0dy91bnJRQm4wVXJLVWJhd0lJN0drb0FLS0snICtcbiAgICAgICAgJ0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb28nICtcbiAgICAgICAgJ29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNrcGFTZ0FQU21tbkhwVFRRQVVocGFRMEFOTk5weHB0QUNHbUdubW1HZ0JwcHRPTk5vQVVVOFV3VThVQU9GT3BvcDFBQ2pwVHgxcGc2VTRkYUEnICtcbiAgICAgICAgJ0hVVVVVQUtLV2tGTFFBdEZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVUnICtcbiAgICAgICAgJ1VVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUUFTY0RrMXJXV25xaWg1Z0M1NkE5QlFCazBWMGJ3UlNMdGFOU1BwV0hkMi8yZWMnICtcbiAgICAgICAgJ29QdW5sZnBRQkJSUlJRQVVVVVVBRmEya3NwaGRlNGJKckpwOFV6d1NiME9EUUIwbEpWQ0RVNDN3SlJzUHIycStyQmhrRUVIdlFCRlBiUlhDNGRlZXhIV3NlNnNwTGJuN3lmM2gvV3Q2a0knICtcbiAgICAgICAgJ0JHQ01pZ0RtYUswYnpUOW1aSVI4dmRmVDZWblVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVUnICtcbiAgICAgICAgJ1VVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZKUzBsQUFlbE5OT1BTbTBBRklhV2tOQURUVGFjYWJRQWpVdzA4MHcwQU5OTnB4cHRBQ2luaW0nICtcbiAgICAgICAgJ0NuaWdCd3AxTkZPb0FVZEtjT3RJT2xLT3RBRHFLS0tBRkZMU0Nsb0FXaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2knICtcbiAgICAgICAgJ2lpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNnWkp3QmttZ0FrZ0RrbXRleHNmS0FrbEdYN0QnICtcbiAgICAgICAgJzBvQUxHeDhvQ1NRRGYySHBWK2lsb0FTc2pWditQaFA5eit0YkZZK3JmOGZDZjduOWFBS0ZGRkZBQlJSVG80MmxrQ0lNazBBTm9yV1RTWXd2enV4UHR4VU0rbHVvTFJOdkhvZXRBR2ZVOXYnICtcbiAgICAgICAgJ2RTMjUrVTVYdXA2VkN5c3JFTUNDT3hwS0FOKzJ1NDdsZmw0YnVwNjFQWE5LN0l3WlRnam9hMmJPOUZ3Tmo0RWcvV2dDNGF5Nyt4MjVtaUhIOFNqdDcxcTBoR1JRQnpORlhMKzA4aVRlZy8nICtcbiAgICAgICAgJ2R0K2hxblFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVUnICtcbiAgICAgICAgJ1VVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJTVXRKUUFkcWFhY2VsTk5BQlNHbHBEUUEwOUtiVGpUYUFFTk1OUE5NTkFEVFRhY2U5Tm9BVVU4VXdVOFVBT0ZPcG9wMUFDanBUeFRCMHB3NjAnICtcbiAgICAgICAgJ0FPb0ZGRkFDaWxwQlMwQUxSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUEnICtcbiAgICAgICAgJ0ZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZHQ1NBQnlhQU1uQTZtdGV4c2ZLSG1TRDk0ZWc5S0FDeHNSRUJKSVBuN0QwcS9SUlFBdEZGRkFCV1AnICtcbiAgICAgICAgJ3EzL0h3bis1L1d0ZXNqVnYrUGhQOXordEFGQ2lpaWdBcTlwZVB0SnoxMjhWUnAwYnRFNGREaGhRQjBsRlViZlVvNU1MTDhqZXZhcndPUmtVQVF6MnNkd3VISFBaaDFGWTF6YXlXellZWlUnICtcbiAgICAgICAgJzlHSGV1Z3Bra2F5b1VjWkJvQTV1bFZpakJsSkJIVEZUM2RxMXRKanFoNkdxOUFHN1pYUXVZK2VIWHFQNjFacm5ZSm1nbERyMjZqMXJvSTVGbGpWMTZFVUFKTEVzMGJJdzRJcm41b21obGEnICtcbiAgICAgICAgJ051b1A1MTBkWitxVys2TVRLUG1YZy9TZ0RKb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0EnICtcbiAgICAgICAgJ29vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNrcGFRMEFCNlUwMDd0VFRRQVVocGFRMEFOTk5weHB0QUNHbUdubW1HZ0JwcHRPUGVtVUFPRlBGTUZQb0FjS2QnICtcbiAgICAgICAgJ1RSVHFBRkhTbkRyVFIwcHc2MEFPb29vb0FVVXRJS1dnQmFLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWknICtcbiAgICAgICAgJ2dBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb3JWdGRPakNCNWh1WS93K2xXdnNOdC96eVdnREFvcmYrdzIzL1BKYVBzTnQvd0E4bG9Bd0tCeWMnICtcbiAgICAgICAgJ0RrbnRXLzhBWWJiL0FKNUxTcGFRUnVHU01CaDBOQUZheHNmS0Fra0dYN0QwcS9SUzBBRkZGRkFCUlNVdEFCV1BxMy9Id24rNS9XdGlzZlZ2K1BoUDl6K3RBRkNpaWlnQW9xN0Jwc2txQm4nICtcbiAgICAgICAgJ2JZRDBHTW1sbDB1VkJsR0RqMHhnMEFVYXMyMTdKYmtETzVPNm1xeEJVa01DQ094b29BNk9HWkpvdzZISXFTdWV0YmxyYVVNT1ZQM2g2MXZJNnlJSFU1VWpJTkFEWjRWbmlLTjM2SDBOWUUnICtcbiAgICAgICAgJ3NiUlNNakRCQnJvNno5VXQ5eUNaUnl2QitsQUdUV2pwZHh0Y3dzZUR5djFyT3BVY282dXA1QnpRQjB0SXloMUtrWkJHRFNST0pJbGNkR0dhZlFCemMwUmhtYU0vd21tVm9hckZpUkpSM0cnICtcbiAgICAgICAgJ0RXZlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUEnICtcbiAgICAgICAgJ0ZGRkZBQlJSUlFBVVVVVUFGSlMwbEFBZWxOTk9QU21tZ0FwRFMwaG9BYWFiVGpUYUFFTk1OT05OTkFEVDNwdE9OTm9BVVUrbUNuaWdCd3BhUVU2Z0JSMHA0NjAwZEtjT3RBQzBDaWdVQUsnICtcbiAgICAgICAgJ0tXa0ZMUUF0RkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkYnICtcbiAgICAgICAgJ0ZBQlJSUlFBVVVVVUFGRkZGQUJTcDk5ZnFLU25KL3JGK29vQTZRZEtXa0ZMUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJXUHEzL0h3bis1L1d0aXNmVnYrUGhQOXordEFGQ3BMY0InICtcbiAgICAgICAgJ3JpTU4wTEROUjBBNE9SMUZBSFRDbHJQdE5RV1FCSlR0ZnBuc2F2NW9BclhkbWx3aFBTUWRHckVkR2pjb3d3UndSWFMxbTZwYmhrRXlqa2NOOUtBTXF0SFM3akRHQmp3ZVZyT3AwYm1PUlgnICtcbiAgICAgICAgJ1hxcHpRQjB0TmRRNkZUMEl3YUVZT2lzT2hHYWRRQnpVaUdPVmtQVlRpbTFkMU9QYmRidXpETlVxQU5qUzVkMXVVSjVRL3BWK3NiU254Y3N2WmxyWm9BcDZqSHZzMlBkZWF4SzZPWmQ4THInICtcbiAgICAgICAgJzZnaXVjb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0snICtcbiAgICAgICAgJ0tBQ2lpaWdBb29vb0FLS0tLQUNrcGFTZ0E3VTAwN3RUVFFBVWhwYVEwQU5QU20wNDk2YlFBaHBocDVwaG9BYWFiVGpUYUFGRlBGTUZQRkFEaFRxYUtkUUFvNlU4ZGFZT2xQSFdnQmFLS0snICtcbiAgICAgICAgJ0FIQ2lrRkxRQXRGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUYnICtcbiAgICAgICAgJ0ZGRkFCUlJSUUFVVVVVQUZGRkZBQlRrLzFpL1VVMm5KL3JGK29vQTZRVXRKUzBBRkZGRkFCUlJSUUFVVVVVQUZGSlMwQUZGRkZBQldQcTMvQUI4Si91ZjFyWHJJMWIvajRUL2MvclFCUW8nICtcbiAgICAgICAgJ29vb0FLMHROdXlXOGh6a1krVS93Qkt6YWx0U1JkeFkvdmlnRG9xWklna2paVDBJeFQ2U2dEbVNDckVIcU9LS2t1Qmk1bEgrMGFqb0EzZFBmZlpwN2NWYXFqcGYvSHFmOTQxZW9Bek5XWDUnICtcbiAgICAgICAgJ0kyOXlLeTYxOVcvNDlrLzMvd0NocklvQXNXQjIzc2Z1Y2ZwVy9YUFdmL0g1Ri92Q3Vob0FRMXpiakVqRDBKcnBEWE9UZjhmRW4rK2Y1MEFNb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0EnICtcbiAgICAgICAgJ0NpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLU2xwS0FBOUthYWQycHAnICtcbiAgICAgICAgJ29BQlNIdFMwaDdVQU5OTnB4cHRBQ0dtR25tbUdnQnBwbFBQZW1VQU9GUEZNRlBGQURoVHFhS2RRQW82VThVd2RLZU90QUMwVVVVQUtLV2tGTFFBdEZGRkFCUlJSUUFVVVVVQUZGRkZBQlInICtcbiAgICAgICAgJ1JSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCVGsvMWkvVVUybkonICtcbiAgICAgICAgJy9yRitvb0E2UVV0SUtXZ0Fvb3BLQUZvb29vQUtLS0tBQ2lpaWdBb29vb0FLeDlXLzQrRS8zUDYxc1ZqNnQveDhKL3VmMW9Bb1VVVVVBRld0UGhNbDByWStWT1RTVzFsSmNIZDkyUDFQOUsnICtcbiAgICAgICAgJzJZSUVnajJJT1A1MEFTMGg0R2FXcWwvUDVOczNQek53S0FNV1J0OHJONmttbTBVZDZBTnJURnhhRDNKTlhhaWdqOHFCRTdnVkpRQm42czM3bU1lclZrMW9hcStaVVQwR2F6NkFKN0ladlknICtcbiAgICAgICAgJ3ZyWFFWaDZZdTY4Qi91Z210eWdCRFhOeW5Nem4xWW11amR0cUUrZ3pYTkU1SlByUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZKUzBsQUIycHBweDZVMDBBRklhV2tQYWdCcHB0T05Ob0FRMHcwODB3MEFOTk0nICtcbiAgICAgICAgJ3A1NzAyZ0JSVHhUQlR4UUE0VTZtaW5VQUtPbFBGTUhTbmpyUUF0SGVpaWdCUlMwZ3BhQUZvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUsnICtcbiAgICAgICAgJ0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtjbitzWDZpbTBBNElJNmlnRHBoUzFEQk1zOFFkU09lbzlLbW9BS0tLS0EnICtcbiAgICAgICAgJ0NpaWlnQktXaWlnQW9vb29BS0tLS0FDc2ZWditQaFA5eit0YkZZK3JmOGZDZjduOWFBS0ZQaFFTVG9oNkZnS1pTcXhSZ3c2ZzVGQUhTS29WUUFNQWRCVHFxVzkvREtnM01FYnVDY1VzMS8nICtcbiAgICAgICAgJ0JFUHZCejZLYzBBV0hkWTBMc1FBT3ByQnU3ZzNNeGJvbzRVVVhOM0pjdHp3bzZLS2dvQUt0YWZBWnJrRWo1VTVOVmxVdXdWUmtuZ0FWdldsdUxhRUwvQUJIbGo3MEFUMFV0VmI2ZnlMWTQnICtcbiAgICAgICAgJ1B6TndLQU1pN2w4NjVkdTJjQ29hS0tBTlRTWStKSkQzT0JXblVGcEQ1TnNpOThaUDFxZWdDdmV2NWRuSWUrTVZnVnE2dEppTklnZVNjbXNxZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0snICtcbiAgICAgICAgJ0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtTbHBLQUE5S2FhY2UnICtcbiAgICAgICAgJ2xOTkFBS1E5cVdrUGFnQnBwdE9OTm9BYWFhYWVhWWFBR21tVTgweWdCd3A0cGdwNG9BY0tkVFJUcUFGSFNuanJUUjBwdzYwQUxSUlJRQTRVVUNpZ0JhS0tLQUNpaWlnQW9vb29BS0tLS0EnICtcbiAgICAgICAgJ0NpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQnlTUEcnICtcbiAgICAgICAgJzJVWXFmWTFKOXN1Zitlei9BSjFEUlFCTjlzdWYrZXovQUowZmJMbi9BSjdQK2RRMFVBVGZiTG4vQUo3UCtkUGp2cmhIREZ5d0hVRTlhclVVQWRGQk9rOFlkRDlSNlZMWE8yOXc5dkp2VHAnICtcbiAgICAgICAgJzNIclc3Qk9rOFlkRDlSNlVBUzBVbExRQVVVVVVBRlkrcmY4ZkNmN245YTJLeDlXLzQrRS8zUDYwQVVLS0tLQUNpaWlnQXBWVXV3VlFTeDZDck52WXpUNE9OcWVwclZ0N1NLM0h5akxkMlAnICtcbiAgICAgICAgJ1dnQ0t5c2hiamUvTWgvU3JsRkZBQVNBQ1R3QldEZTNIMmlja2ZjWGhhdGFqZVp6REdmOEFlSS9sV2JRQVZac0lQT3VSa2ZLdkpxc0FTY0FaTmIxbmIvWjRRRDk0OHNhQUxBb3BhcTMwL2snICtcbiAgICAgICAgJ1c1SVB6TndLQU1xOWw4NjZaZ2ZsSHlpcTlGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkYnICtcbiAgICAgICAgJ0ZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVbExTZDZBQTlLYWFjZWxOTkFBS1EwdElhQUdtbTA0MDJnQkRURFR6VERRQTAweW5tbVVBT0ZQRk1GUEZBRGhUcWEnICtcbiAgICAgICAgJ0tkUUFvNlU4ZGFZT2xQSFdnQmFLS0JRQTRVVWdwYUFGb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0EnICtcbiAgICAgICAgJ0NpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDcGJlNGUza0RxZU80OWFpb29BNktDZExpTU9oK285S2xybmJlNGUzazMnICtcbiAgICAgICAgJ0owN2oxcmRnblNlTU9oK285S0FKYUtLS0FDc2ZWditQaFA5eit0YkZZK3JmOEFId24rNS9XZ0NoUlJSUUFWYjArRlpibjVoa0tNNDk2cVZQWjNBdDdnTWZ1bmcwQWI5Rk5TUkhVTXJBajEnICtcbiAgICAgICAgJ0ZRejNzTUFJWnN0Nkx6UUJZSngxNlZtWHVvY0dLRS9WL3dEQ3ExemZTWEh5ZzdVOUJWV2dBb29xN1pXUm1ZU1NERVk2RDFvQWwwMjB5UlBJT1A0Ui9XdFdrQXh3T2xGQUIwRllWOWNmYUonICtcbiAgICAgICAgJ3pnL0l2QXE3cU4xc1R5VVB6Tjk0K2dySm9BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0EnICtcbiAgICAgICAgJ0tLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0FwS1drb0FEMHBwcDNhbW1nQXBEMnBhUTlxQUdtbTA0MDJnQkRURFR6VERRQTAwMm5HbVVBT0ZQRk1GUEZBRGgnICtcbiAgICAgICAgJ1RxYUtkUUFvNlU4ZGFZT2xQSFdnQmFCUlJRQW9wYVFVdEFDMFVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkYnICtcbiAgICAgICAgJ0ZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFWTGIzRDI4bTlPbmNkalVWRkFIUlFUcFBHSFEvVWVsUzEnICtcbiAgICAgICAgJ3p0dmNQYnlCbFBIY2V0YnNFNlhFWWREOVI2VUFTMWo2dC94OEovdWYxclhyRjFPUlpMb0Fmd3JnL1dnQ25SUlJRQVVVVVVBQUpIUTRvb29vQUtCeWNEclZtQ3hubTUyN1Y5V3JVdHJLSzMnICtcbiAgICAgICAgJ3dRTnovd0I0MEFWTFRUaWNTVGpBN0ovaldvQUFNQWNVVXRBQ1ZXdkxvVzBmcTUrNktXNnUwdDA1NWM5RnJEa2thYVF1NXlUUUFqTVhZc3h5U2NrMGxGRkFCUlJSUUFVVVVVQUZGRkZBQlInICtcbiAgICAgICAgJ1JSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUYnICtcbiAgICAgICAgJ0pTMGxBQWVsTk5PUFNtbWdBcEQycGFROXFBR21tMDQwMmdCRFREVHpURFFBMDB5bm1tVUFPRlBGTUZQRkFEaFRxYUtkUUFvNlU4ZGFZT2xQRkFDOXFLS0tBRkZMUUtLQUZvb29vQUtLS0snICtcbiAgICAgICAgJ0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb28nICtcbiAgICAgICAgJ29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLZkZOSkEyNk5zVXlpZ0MwK28zRHJ0M0FlNmpGVmZyUlJRQVVVVVVBRkZGRkFCV2pwbHNybHBYR2NIQUJyT3JTMHU0VmQwTEgnICtcbiAgICAgICAgJ0JKeUtBTlNscEtyejNrTUgzbXkzOTBkYUFMRlVidlVWanlrWHpQNjloVkc0djVaOHFQbFQwRlZhQUZabWRpekVsajFKcEtLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUMnICtcbiAgICAgICAgJ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2twYVNnQVBTbW0nICtcbiAgICAgICAgJ25IcFRUUUFVaDdVb3BEUUEwMDJuR20wQUlhWWFjYWFhQUdtbTA0MHlnQndwNHBncDRvQWNLZFRSVHFBRkhTbmpyVEIwcDQ2MEFMUlJSUUFvcGFCUlFBdEZGRkFCUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVUnICtcbiAgICAgICAgJ1VBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBU2VmTnQyK2ErUFRjYWpvb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUMnICtcbiAgICAgICAgJ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBcEtXa28nICtcbiAgICAgICAgJ0FEMHBwcHg2VTAwQUZJZTFMU0dnQnBwdE9OTm9BUTB3MDgwdzBBTk5NcDVwbEFEaFR4VEJUeFFBNFU2bWluVUFLT2xQSFdtRHBUeDFvQVdpaWlnQndvcEJTMEFMUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVUnICtcbiAgICAgICAgJ1VBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlInICtcbiAgICAgICAgJ1JRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJTVXRKUUFIcFRUVGonICtcbiAgICAgICAgJzBwcG9BQlNIdFMwaDdVQU5OTnB4NzAyZ0JEVERUelREUUEwMHlubnZUS0FIQ25pbUNuaWdCd3AxTkZPb0FVZEtlS1lPbFBIV2dCYUtLS0FGRkxTQ2xvQVdpaWlnQW9vb29BS0tLS0FDaWknICtcbiAgICAgICAgJ2lnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0snICtcbiAgICAgICAgJ0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW8nICtcbiAgICAgICAgJ29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2twYVNnQTdVMDA0OUthYUEnICtcbiAgICAgICAgJ0NrTktLUTlxQUdtbTA0MDJnQkRURFR6VERRQTAwMm5HbTBBS0tlS1lLZUtBSENuVTBVNmdCUjBwNHBnNlU4ZGFBRm83MFVVQUtLV2tGTFFBdEZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlEnICtcbiAgICAgICAgJ0FVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVUnICtcbiAgICAgICAgJ1VBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGSlMwbEFBZWxOTk83VTAwQUFwRDJwUlMnICtcbiAgICAgICAgJ0h0UUEwMDJuR20wQUlhWWFlYVlhQUdtbVU4MHlnQndwNDcwd1U4VUFPRk9wb3AxQUNqcFR4MXBvNlU0ZGFBRm9GRkZBQ2lsb0ZGQUMwVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlInICtcbiAgICAgICAgJ1FBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkYnICtcbiAgICAgICAgJ0ZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVUnICtcbiAgICAgICAgJ1VVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVsTFNkNkFBOUthYWNlbE5OQUFLUTB0SWFBR20nICtcbiAgICAgICAgJ20wNDAyZ0JEVERUelREUUEwMHlubW1VQU9GUEZNRlBGQURoVHFhS2RRQW82VThkYVlPbFBIV2dCYUtLQlFBNFVVZ3BhQUZvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb28nICtcbiAgICAgICAgJ0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWknICtcbiAgICAgICAgJ2dBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0snICtcbiAgICAgICAgJ0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQXBLV2tvQUQwcHBwM2FtbWdBcEQycFJTSHRRQTAwMm5HbTAnICtcbiAgICAgICAgJ0FJYVlhZWFZYUFHbW0wNDB5Z0J3cDRwZ3A0b0FjS2RUUlRxQUZIU25qclRCMHA0NjBBTFJSUlFBb3BhUVV0QUMwVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkEnICtcbiAgICAgICAgJ0JSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVUnICtcbiAgICAgICAgJ0FGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlInICtcbiAgICAgICAgJ1FBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVsTFNHZ0FQU21tbmRxYWFBQ2tQYWxwRDJvQWFhYlRqVGFBRU5NTlAnICtcbiAgICAgICAgJ05NTkFEVFRLZWFiUUFvcDRwZ3B3b0FlS2RUUlRxQUZIU25qclRCMHA0NjBBTDJvb29vQWNLS1FVdEFDMFVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlEnICtcbiAgICAgICAgJ0FVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkYnICtcbiAgICAgICAgJ0FCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVUnICtcbiAgICAgICAgJ1VBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVbExTVUFCNlUwMHA2VWhvQUtROXFVVWhvQWFhYlRqVGFBRU5NTlBOTU5BRFQnICtcbiAgICAgICAgJzNwbFBOTW9BY0tjT3RORk9vQWVPdE9wZ3B3b0FjT2xPRk5GT0ZBRGhSU0Nsb0FXbHBLS0FGSFNscHRMbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um0nICtcbiAgICAgICAgJ2dCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTAnICtcbiAgICAgICAgJ1pvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1QnICtcbiAgICAgICAgJ05HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2knICtcbiAgICAgICAgJ2t6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQUtLS1NnQU5JYVdrb0FTa04nICtcbiAgICAgICAgJ0xTR2dCcHBLVTBsQURUVERUelREMW9BUTB5bkh2VGFBRkZQcGdOUG9BY0R6VHFZS2VLQUZGT0JwdEtLQUhVNm01cFFhQUZwYVNpZ0JjMFVtYUtBSFVVM05HYUFIVVUyak5BRHFLYm1qTkEnICtcbiAgICAgICAgJ0RxS2Jtak5BRHFLYm1qTkFEcUtibWpOQURxS2JSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUYnICtcbiAgICAgICAgJ056Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFINDAzTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUnICtcbiAgICAgICAgJzNOR2FBSFVVM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVmalRjMFpvQWRSVGMwWm9BZFJUYzBab0FkUitOTnpSbWdCMUZOelJtZ0IxRk56Um1nQjEnICtcbiAgICAgICAgJ0ZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk4nICtcbiAgICAgICAgJ3pSbWdCMUZOelJtZ0IxRk56Um1nQjFKU1pvb0FXZzBtYUtBQ2lpa3pRQVUwbWxwcE5BQ0drTkxTR2dCcHB0T05Ob0FhYWJUaWFabWdCUlQ2WUtjS0FIZzA0VXdVNEdnQjlGTnpUcUFGQnAnICtcbiAgICAgICAgJzFNcFFhQUg1b3pUYzB1YUFIVVUzTkxuM29BV2lrejcwWjk2QUZvcE0rOUdmZWdCYUtUUHZSbjNvQVdpa3o3MFo5NkFGb3BNKzlHYUFGb3BNKzlHZmVnQmFLVE5HZmVnQmFLVFB2Um4zb0EnICtcbiAgICAgICAgJ1dpa3o3MFo5NkFGb3BNKzlHZmVnQmFLVE5HZmVnQmFLVFB2Um4zb0FXaWt6Um4zb0FXaWt6Um1nQmFLVE5HZmVnQmFLVFB2Um1nQmFLVE5HZmVnQmFLVE5HYUFGb3BNKzlHZmVnQmFLVE4nICtcbiAgICAgICAgJ0dmZWdCYUtUTkdmZWdCYUtUUHZSbWdCYUtUUHZSbWdCYUtUUHZSbjNvQVdpa3pSbjNvQVdpa3pSbWdCYUtUTkdmZWdCYUtUTkdhQUZvcE0rOUdhQUZvcE0rOUdmZWdCYUtUTkdmZWdCYUsnICtcbiAgICAgICAgJ1ROR2FBRm9wTSs5R2FBRm9wTTBab0FXaWt6NzBaOTZBRm9wTTBab0FXaWt6NzBab0FXaWt6NzBab0FXaWt6Um1nQmFLVE5HYUFGb3BNKzlHYUFGb3BNMFpvQVdpa3o3MFpvQVdpa3pSbWcnICtcbiAgICAgICAgJ0JhS1ROR2ZlZ0JhS1ROR2FBRm9wTSs5R2FBRm9wTTBab0FXaWt6Um1nQmFLVFB2Um1nQmFLVE5HYUFGb3BNMFo5NkFGb3BNKzlHZmVnQmFLVFB2Um4zb0FXaWt6NzBab0FXaWt6NzBab0EnICtcbiAgICAgICAgJ1dpa3pSbjNvQVdpa3o3MFo5NkFGb3BNKzlHZmVnQmFTa3pSbWdCYzBsSm1nbWdBSnB0RkZBQlRUU2swMG1nQkNhYWFVMDBtZ0JEVGFVMDJnQlJUaFRCVGdhQUhnMHROQnBjMEFQQnBRYVknICtcbiAgICAgICAgJ0RUZ2FBSDBVM05MbWdCMmFNMDJsb0FYTkxtbTBVQVB6Um1tWm9vQWZta3pUYzBVQVB6U1pwdWFNMEFQelNacHRHYUFIWm96VGMwWm9BZG1qTk56Um1nQjJhTTAzTkdhQUg1cE0wM05HYUEnICtcbiAgICAgICAgJ0hab3pUYzBab0FkbWpOTnpSbWdCMmFNMDNOR2FBSFpvelRjMFpvQWRtak5OelJtZ0IyYU0wM05HYUFIWm96VGMwWm9BZm1relRjMFVBUHpSbW1ab3pRQS9OSm1tNW96UUE3TkxtbVpvb0EnICtcbiAgICAgICAgJ2Rtak5Ob29BZG1selRNMFpvQWZta3pUYzBab0FkbWpOTnpSUUE3TkdhYm1qTkFEczBacHVhS0FIWm96VGMwWm9BZG1qTk5velFBN05HYWJtaWdCMmFYTk16Um1nQithTTB6TkdhQUg1b3onICtcbiAgICAgICAgJ1RNMFpvQWZta3pUYzBab0FkbWx6VE0wVUFPelJtbTBab0FmbWt6VGMwVUFPelJtbTBVQU96Um1tMFVBT3pSbW0wWm9BZG1qTk56Um1nQithVE5Ob3pRQTdOR2FiUm1nQjFHYWJSbWdCK2EnICtcbiAgICAgICAgJ1ROTnpSUUE3TkxtbVVVQU96UzVwbEdhQUhacGMweWlnQjJhWE5Nb3pRQTdOR2FibWpOQUQ4MG1hYm1pZ0IyYVhOTW9vQWZSbW1VWm9BZG1qTk56UlFBNmpOTm9vQWRtak5OelJtZ0IrYVQnICtcbiAgICAgICAgJ05OelJRQTdOTG1tVVVBT3pSbW0wVUFPelJtbTVvelFBN05HYWJtaWdCYzBacEtLQUZKcEtNMG1hQUZwcE5HYVFtZ0FKcHRHYVROQUFhYWFVbW1rMEFJVFNVR2lnQktXbWcwb05BRHdhY0QnICtcbiAgICAgICAgJ1VkT0JvQWZTMHpOTG1nQithWE5NcGFBSDVvelRNMHVhQUhacGMwek5HYUFINW95S1ptak5BRDgwWkZNelJtZ0IrYU1pbVpvelFBL05HYVptak5BRDgwWnBtYU0wQVB6Um1tWm96UUEvTkcnICtcbiAgICAgICAgJ2FabWpOQUQ4MFpwbWFNMEFQelJtbVpvelFBL05HYVptak5BRDgwWnBtYU0wQVB6Um1tWm96UUEvTkdhWm1qTkFEODBacG1hTSs5QUQ4aWpOTXpSbWdCK1JSa1V6TkdhQUg1RkdhWm1qTkEnICtcbiAgICAgICAgJ0Q4MFpwbWFNMEFQelJtbVpvelFBL0lvelRNMFpvQWZrVVpGTXpSbWdCK2FNMHpOR2FBSDVGR1JUTTBab0FmbWpOTXpSbWdCK2FNaW1ab3pRQS9Jb3lLWm1qTkFEODBaRk16Um1nQithTWknICtcbiAgICAgICAgJ21aOTZNMEFQelJtbVpvelFBL05HUlRNMFpvQWZrVVpwbWFNMEFQelJrVXpOR2FBSDVveUtabWpOQUQ4aWpJcG1hTTBBUHlLTWltWm96UUEvTkdhWm1qTkFEOGlqSXBtYU0wQVB5S01pbVonICtcbiAgICAgICAgJ296UUEvTkdSVE0wWm9BZmtVWnBtYU0wQVB5S01pbVpvelFBL0lveUtabWpOQUQ4aWpJcG1hTTBBUHpSa1V6TkdhQUg1RkdSVE0wWm9BZm1qSXBtYU0wQVB5S01pbVpvelFBL0lveUtabWonICtcbiAgICAgICAgJ05BRDgwWnBtYU0wQVB5S01pbVpvelFBL0lveUtabWpOQUQ4aWpJcG1hTTBBUHlLTTB6TkdhQUg1b3pUTTBab0FmbWpJcG1hTTBBUHpSbW1ab3pRQS9OR1JUTTBab0Fma1VaRk16Um1nQisnICtcbiAgICAgICAgJ2FNMHpOR2FBSFpvelRjMFpvQWNUU1pwdWFLQUZKcE0wbEptZ0JhUW1qTk5Kb0FDYWFhS1NnQU5GSWFUTkFDQTA0VXdVb29BZlMwMFVvb0FkVHMweWlnQjROTG1tVUNnQ1ROR2FaUzBBTy8nICtcbiAgICAgICAgJ0NqOEtiUlFBN05MbW1VVUFPelM1cGxGQURzMFpwdEZBRDgrMUdhWlJtZ0IrYU0weWlnQithTTB5ak5BRDgwWnBsRkFEODBaOXFaUlFBN05MbW1ab3pRQS9OR2FaUlFBL05HYVptaWdCK2EnICtcbiAgICAgICAgJ00weWpOQUQ4MFpwbWFUTkFFbWFNMHpOSm1nQ1ROR2FqelJtZ0NUTkdhWm1relFCSm1qTk16Um1nQithTTFIbWpOQUVtYU0xSG1qTkFFbWFNMHpOSm1nQ1ROR2FqelM1b0FmbWpOUjVwYzAnICtcbiAgICAgICAgJ0FQelJtbVpvelFBL05HYVpta3pRQkptak5SNXBjMEFQelJtbzgwWm9Ba3pSbW84MFpvQWt6Um1tWnBNMEFTWm96VWVhTTBBU1pvelRNMG1hQUpNMFpxUE5HYUFKTTBacVBOR2FBSk0wWnEnICtcbiAgICAgICAgJ1BOTG1nQithTTB6TkptZ0IrYVhOTXpTWm9Ba3pSbW84MHVhQUg1b3pUTTBab0FmbWpOUjVwYzBBUHpSbW1ab3pRQS9OR2FabWt6UUJKbWpOUjVwYzBBUHpSbW84MFpvQWt6Um1vODB1YUEnICtcbiAgICAgICAgJ0g1b3pVZWFYTkFEODBacG1hVE5BRW1hTTFIbWx6UUEvTkdhWm1qTkFEODBacG1hVE5BRW1hTTFIbWx6UUEvTkdhWm1qTkFEODBacVBOTG1nQithTTFIbWpOQUVtYU0wek5KbWdDVE5HYWonICtcbiAgICAgICAgJ3pSbWdDVE5HYVptak5BRDgwWnBtYU04MEFQelJtbzgwWm9Ba3pSbW1acE0wQVNacE0wM05HYUFIZmhSbjJwdWFTZ0IrYVFtbTBsQURzMFpwdEpRQXBwS0tRMEFGSVRTbW1HZ0FKb3BEUlEnICtcbiAgICAgICAgJ0IvLzlrPSc7XG4gICAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JpdGRhc2gtY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCR3aW5kb3cpIHtcbiAgICAvLyBkaXJlY3RpdmUgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICBjb250cm9sbGVyOiAnTWlCaXRkYXNoQ29udHJvbGxlcicsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2JpdGRhc2hWbScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBjb25maWc6ICc9JyxcbiAgICAgICAgICAgIHdlYmNhc3Q6ICc9JyxcbiAgICAgICAgICAgIG9wdGlvbnM6ICc9PydcblxuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBzY29wZS5jb25maWc7ICAvLyBkaWUgY29uZmlnIHdpcmQgYXV0b21hdGlzY2ggZHVyY2ggZGVuIGNvbnRyb2xsZXIgZXJ3ZWl0ZXJ0XG4gICAgICAgICAgICB2YXIgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0bW92aW4ucGxheWVyKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHBsYXllcikgJiYgcGxheWVyLmlzUmVhZHkoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBwbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0bW92aW4ucGxheWVyKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG5cbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHNjb3BlLndlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcbiAgICAgICAgICAgIHZhciBiaXRtb3ZpbkNvbnRyb2xiYXIgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYml0ZGFzaC12YycpKTtcblxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNjb3BlLndlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuYXVkaW9Pbmx5KSAmJiBzY29wZS53ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seSkge1xuICAgICAgICAgICAgICAgIGJpdG1vdmluQ29udHJvbGJhclswXS5zdHlsZS5taW5IZWlnaHQgPSAnMzBweCc7XG4gICAgICAgICAgICAgICAgYml0bW92aW5Db250cm9sYmFyWzBdLnN0eWxlLm1pbldpZHRoID0gJzE5NXB4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJpdG1vdmluQ29udHJvbGJhclswXS5zdHlsZS5taW5XaWR0aCA9ICcxNzVweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iaXRkYXNoLWRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9