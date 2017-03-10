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
	                player.setup(config);

	            var state = scope.webcast.state + 'StateData';
	            var bitmovinControlbar = angular.element(document.getElementsByClassName('bitdash-vc'));

	            if (angular.isDefined(scope.webcast[state].playout.audioOnly) && scope.webcast[state].playout.audioOnly) {
	                bitmovinControlbar[0].style.minHeight = '30px';
	                bitmovinControlbar[0].style.minWidth = '195px';
	            }
	        }
	    };
	};
	module.exports.$inject = ["$window"];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2VmYTZmMzEyOTZkYjkwNjBlMjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELHdCQUF3QjtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxVQUFTLEc7Ozs7OztBQ3ZCVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMVZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFUztBQUNUO0FBQ0EsaUNBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHIiwiZmlsZSI6Im1pLWFuZ3VsYXItYml0ZGFzaC1wbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzZWZhNmYzMTI5NmRiOTA2MGUyNiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xuXG52YXIgQml0ZGFzaENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2JpdGRhc2gtY29udHJvbGxlcicpLFxuICAgIEJpdGRhc2hEaXJlY3RpdmUgPSByZXF1aXJlKCcuL2JpdGRhc2gtZGlyZWN0aXZlJyk7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ21pLkJpdGRhc2hQbGF5ZXInLCBbJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnXSlcbiAgICAgICAgLy8gY29udHJvbGxlciAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC5jb250cm9sbGVyKCdNaUJpdGRhc2hDb250cm9sbGVyJywgQml0ZGFzaENvbnRyb2xsZXIpXG4gICAgICAgIC8vIGRpcmVjdGl2ZSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAuZGlyZWN0aXZlKCdtaUJpdGRhc2hQbGF5ZXInLCBCaXRkYXNoRGlyZWN0aXZlKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJywgW10pXG4gICAgICAgIC5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsICc8ZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgbmctc2hvdz1cInNob3dBdWRpb09ubHlTdGlsbEltYWdlXCIgaWQ9XCJwbGF5ZXItYXVkaW9vbmx5LXN0aWxsLWRpdlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cImF1dG9cIj4nICtcbiAgICAgICAgICAgICc8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBuZy1zcmM9XCJ7e2F1ZGlvT25seVN0aWxsSW1hZ2VVcmx9fVwiPicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgaWQ9XCJtaS1iaXRkYXNoLXBsYXllclwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cImF1dG9cIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nKTtcbiAgICAgICAgfV0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkbG9nKSB7XG4gICAgLy8gY29udHJvbGxlckFzIC0+IGJpdGRhc2hWbVxuICAgIHZhciB2bSA9IHRoaXM7XG5cblxuICAgIC8vIGNvcHkgdGhlIGJhc2ljIGNvbmZpZyAuLi4ga2V5IGlzIG1hbmRhdG9yeVxuICAgIHZtLmNvbmZpZyA9IHt9O1xuICAgIHZtLm9wdGlvbnMgPSB7fTtcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZykgJiYgYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZy5rZXkpKSB7XG4gICAgICAgIHZtLmNvbmZpZyA9ICRzY29wZS5jb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGxvZy5lcnJvcignYmFzaWMgY29uZmlnIGZvciBiaXRkYXNoIHBsYXllciBpcyBtaXNzaW5nIScpO1xuICAgIH1cbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLm9wdGlvbnMpKSB7XG4gICAgICAgIHZtLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyBjaGVjayB3ZWJjYXN0IHRvIGV4cGFuZCBhbmQgbWFuaXB1bGF0ZSB0aGUgYmFzaWMgYml0ZGFzaCBwbGF5ZXIgY29uZmlnXG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS53ZWJjYXN0KSkge1xuICAgICAgICBwcm9jZXNzV2ViY2FzdCgkc2NvcGUud2ViY2FzdCk7XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NXZWJjYXN0KHdlYmNhc3QpIHtcbiAgICAgICAgdmFyIHN0YXRlUHJvcGVydHkgPSB3ZWJjYXN0LnN0YXRlICsgJ1N0YXRlRGF0YSc7XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHZtLm9wdGlvbnMuZm9yY2VkU3RhdGUpKSB7XG4gICAgICAgICAgICBzdGF0ZVByb3BlcnR5ID0gdm0ub3B0aW9ucy5mb3JjZWRTdGF0ZSArICdTdGF0ZURhdGEnO1xuICAgICAgICB9XG5cbiAgICAgICAgdm0uY29uZmlnLnNvdXJjZSA9IGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0LCBzdGF0ZVByb3BlcnR5KTtcbiAgICAgICAgdm0uY29uZmlnLnN0eWxlID0gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCwgc3RhdGVQcm9wZXJ0eSk7XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyAtIHNvdXJjZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0LCBzdGF0ZSkge1xuICAgICAgICBpZiAod2ViY2FzdC51c2VEVlJQbGF5YmFja0luUG9zdGxpdmUgPT09IHRydWUgJiYgc3RhdGUgPT09ICdwb3N0bGl2ZVN0YXRlRGF0YScpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXREVlJQbGF5YmFja1RvUG9zdGxpdmUod2ViY2FzdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2V0UGxheWVyQ29uZmlnU291cmNlQnlTdGF0ZSh3ZWJjYXN0LCBzdGF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RFZSUGxheWJhY2tUb1Bvc3RsaXZlKHdlYmNhc3QpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9ICcnO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdFsncG9zdGxpdmVTdGF0ZURhdGEnXS5wbGF5b3V0Lm9mZnNldCkpIHtcbiAgICAgICAgICAgIHZhciBwbGF5b3V0T2Zmc2V0ID0gcGFyc2VJbnQod2ViY2FzdFsncG9zdGxpdmVTdGF0ZURhdGEnXS5wbGF5b3V0Lm9mZnNldCwgMTApO1xuXG4gICAgICAgICAgICBpZiAocGxheW91dE9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAnJndvd3phZHZycGxheWxpc3RzdGFydD0nICsgcGxheW91dE9mZnNldCArICcwMDAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhsczogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuaGxzVXJsLnJlcGxhY2UoJy9tYXN0ZXIubTN1OCcsICdEdnIvcGxheWxpc3QubTN1OD9EVlInICsgb2Zmc2V0KSxcbiAgICAgICAgICAgIGRhc2g6IHdlYmNhc3RbJ2xpdmVTdGF0ZURhdGEnXS5wbGF5b3V0LmRhc2hVcmwucmVwbGFjZSgnL3BsYXlsaXN0Lm0zdTgnLCAnRHZyL3BsYXlsaXN0Lm0zdTg/RFZSJyArIG9mZnNldClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlKSB7XG4gICAgICAgIHZhciBobHMgPSB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0Lmhsc1VybDtcbiAgICAgICAgdmFyIGRhc2ggPSB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmRhc2hVcmw7XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQudmlkZW9NYW5hZ2VySGxzVXJsKSAmJiB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LnZpZGVvTWFuYWdlckhsc1VybCkge1xuICAgICAgICAgICAgaGxzID0gd2ViY2FzdFtzdGF0ZV0ucGxheW91dC52aWRlb01hbmFnZXJIbHNVcmw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdFtzdGF0ZV0ucGxheW91dC5vZmZzZXQpKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQod2ViY2FzdFtzdGF0ZV0ucGxheW91dC5vZmZzZXQsIDEwKTtcblxuICAgICAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0UHJlZml4ID0gJz8nO1xuICAgICAgICAgICAgICAgIHZhciBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICAgICAgcGFyc2VyLmhyZWYgPSBobHM7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UHJlZml4ID0gJyYnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhscyArPSBvZmZzZXRQcmVmaXggKyAnc3RhcnQ9JyArIG9mZnNldDtcblxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChkYXNoKSAmJiBkYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFByZWZpeCA9ICc/JztcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VyLmhyZWYgPSBkYXNoO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFByZWZpeCA9ICcmJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGRhc2ggKz0gb2Zmc2V0UHJlZml4ICsgJ3N0YXJ0PScgKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhsczogaGxzLFxuICAgICAgICAgICAgZGFzaDogZGFzaFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIHBsYXllciBjb25maWcgLSBzdHlsZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTdHlsZSh3ZWJjYXN0LCBzdGF0ZSkge1xuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgYXV0b0hpZGVDb250cm9sczogdHJ1ZSxcbiAgICAgICAgICAgIHBsYXlPdmVybGF5OiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seSkgJiYgd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHkpIHtcbiAgICAgICAgICAgICRzY29wZS5zaG93QXVkaW9Pbmx5U3RpbGxJbWFnZSA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuYXVkaW9Pbmx5U3RpbGxJbWFnZVVybCA9IGdldERlZmF1bHRTdGlsbEltYWdlKCk7XG4gICAgICAgICAgICBzdHlsZS5hdXRvSGlkZUNvbnRyb2xzID0gZmFsc2U7XG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHlTdGlsbFVybCkgJiZcbiAgICAgICAgICAgICAgICB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seVN0aWxsVXJsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICRzY29wZS5hdWRpb09ubHlTdGlsbEltYWdlVXJsID0gd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHlTdGlsbFVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLmFzcGVjdHJhdGlvID0gJzE2OjknO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERlZmF1bHRTdGlsbEltYWdlKCkge1xuICAgICAgICByZXR1cm4gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsLzlqLzRBQVFTa1pKUmdBQkFRRUFZQUJnQUFELy9nQStRMUpGUVZSUFVqb2daMlF0YW5CbFp5QjJNUzR3SUNoMWMybHVaeUJKU2tjZ1NsJyArXG4gICAgICAgICdCRlJ5QjJPREFwTENCa1pXWmhkV3gwSUhGMVlXeHBkSGtLLzlzQVF3QUlCZ1lIQmdVSUJ3Y0hDUWtJQ2d3VURRd0xDd3daRWhNUEZCMGFIeDRkR2h3Y0lDUXVKeUFpTENNY0hDZzNLU3d3JyArXG4gICAgICAgICdNVFEwTkI4bk9UMDRNand1TXpReS85c0FRd0VKQ1FrTUN3d1lEUTBZTWlFY0lUSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qJyArXG4gICAgICAgICdJeU1qSXkvOEFBRVFnQ2V3UnBBd0VpQUFJUkFRTVJBZi9FQUI4QUFBRUZBUUVCQVFFQkFBQUFBQUFBQUFBQkFnTUVCUVlIQ0FrS0MvL0VBTFVRQUFJQkF3TUNCQU1GQlFRRUFBQUJmUUVDJyArXG4gICAgICAgICdBd0FFRVFVU0lURkJCaE5SWVFjaWNSUXlnWkdoQ0NOQ3NjRVZVdEh3SkROaWNvSUpDaFlYR0JrYUpTWW5LQ2txTkRVMk56ZzVPa05FUlVaSFNFbEtVMVJWVmxkWVdWcGpaR1ZtWjJocGFuJyArXG4gICAgICAgICdOMGRYWjNlSGw2ZzRTRmhvZUlpWXFTazVTVmxwZVltWnFpbzZTbHBxZW9xYXF5czdTMXRyZTR1YnJDdzhURnhzZkl5Y3JTMDlUVjF0ZlkyZHJoNHVQazVlYm42T25xOGZMejlQWDI5L2o1JyArXG4gICAgICAgICcrdi9FQUI4QkFBTUJBUUVCQVFFQkFRRUFBQUFBQUFBQkFnTUVCUVlIQ0FrS0MvL0VBTFVSQUFJQkFnUUVBd1FIQlFRRUFBRUNkd0FCQWdNUkJBVWhNUVlTUVZFSFlYRVRJaktCQ0JSQ2thJyArXG4gICAgICAgICdHeHdRa2pNMUx3RldKeTBRb1dKRFRoSmZFWEdCa2FKaWNvS1NvMU5qYzRPVHBEUkVWR1IwaEpTbE5VVlZaWFdGbGFZMlJsWm1kb2FXcHpkSFYyZDNoNWVvS0RoSVdHaDRpSmlwS1RsSldXJyArXG4gICAgICAgICdsNWlabXFLanBLV21wNmlwcXJLenRMVzJ0N2k1dXNMRHhNWEd4OGpKeXRMVDFOWFcxOWpaMnVMajVPWG01K2pwNnZMejlQWDI5L2o1K3YvYUFBd0RBUUFDRVFNUkFEOEE5QkZLQlFCVGdLJyArXG4gICAgICAgICdBQUNsb3BjVUFKaWx4VHNVb0ZBRGNVdUtkaWx4UUF6RkxpblVVQU54UmluWVByUmcrdEFEY1VZcCtQZWpIdlFBekZHS2ZqM294NzBBTXhSaW4vQUkwZmpRQXpGR0tmajNveDcwQU14UmluJyArXG4gICAgICAgICc0OTZNZTlBRE1VWXArUGVqSHZRQXpGR0tmajNveDcwQU14UmluNDk2TWU5QURNVVlwK1Blakh2UUF6RkdLZmozb3g3MEFNeFJpbi9qUmozb0FaaWpGUHg3MFk5NkFHWW94VDhlOUdQZWdCJyArXG4gICAgICAgICdtS01VL0h2Umozb0FaaWpGUHg3MFk5NkFHWW94VDhlOUdLQUdZb3hUOGU5R1BlZ0JtS01VL0h2Umozb0FaaWpGUHg3MFk5NkFHWW94VDhVWTk2QUdZb3hUOGU5R1BlZ0JtS01VL0h2UmozJyArXG4gICAgICAgICdvQVppakZQeDcwWTk2QUdZb3hUOGU5R1BlZ0JtS01VL0h2Umozb0FaaWpGUHg3MFk5NkFHWW94VDhlOUdQZWdCbUtNVS9IdlJqM29BWmlqRlB4Umozb0FaaWpGUHg3MFk5NkFHWW94VDhlJyArXG4gICAgICAgICc5R1BlZ0JtS01VL0ZHUGVnQm1LTVUvSHZSajNvQVppakZQeDcwWTk2QUdZb3hUOGU5R1BlZ0JtS01VL0h2Umozb0FaaWpGUHg3MFk5NkFHWW94VDhlOUdQZWdCbUtNVS9IdlJqM29BWmlqJyArXG4gICAgICAgICdGUHg3MFk5NkFHWW94VDhlOUdQZWdCbUtNVS9IdlJqM29BWmlqRlB4NzBZOTZBR1lveFQ4ZTlHUGVnQm1LTVUvSHZSajNvQVppakZQeDcwWTk2QUdZb3hUL3dBYU1lOUFETVVZcCtQZWpIJyArXG4gICAgICAgICd2UUF6RkdLZmozb3g3MEFNeFJpbjQ5Nk1lOUFETVVZcCtQZWpIdlFBekZHS2YrTkdQZWdCbUtNVS9IdlJqM29BWmlqRlB4NzBZOTZBR1lveFQ4ZTlHUGVnQm1LTVUvSHZSajNvQVppakZQJyArXG4gICAgICAgICd4NzBZOTZBR1lveFQ4ZTlHUGVnQm1LTVUvSHZTWTk2QUc0b3hUc0gxb29BWmlnaW4wVUFSNHBNVkppa05BRENLVEZQMjAwaWdCcEZOSXA5SVJRQXdpa3hUc1VtRFFBL0ZMUlNnVUFHS2NCJyArXG4gICAgICAgICdRQlRnS0FBQ2x4UlNnVUFKaWx4UzRwY1VBSmlqRk94UmlnQk1VWXAxRkFEY1VZcDFGQURjVWJhZFJRQTNGR0tkUlFBM0ZHS2RSUUEzRkdLZFJRQTNiUnRwMUZBRGNVWXAxRkFEY1VZcDFGJyArXG4gICAgICAgICdBRGNVWXAxRkFEY1VZcDFGQURjVWJhZFJRQTNGR0tkUlFBM2JSdHAxRkFEY1VZcDFGQURjVVlwMUZBRGNVWXAxRkFEZHRHS2RSUUEzRkdLZFJRQTNGR0tkUlFBM0ZHMm5VVUFOeFJpblVVJyArXG4gICAgICAgICdBTnhSaW5VVUFOeFJpblVVQU4yMFlwMUZBRGNVWXAxRkFEY1VZcDFGQURjVVlwMUZBRGNVWXAxRkFEY1VZcDFGQURjVWJhZFJRQTNGR0tkUlFBM0ZHMm5VVUFOMjBZcDFGQURjVVlwMUZBJyArXG4gICAgICAgICdEZHRHS2RSUUEzYlJ0cDFGQURkdEcyblVVQU54UmluVVVBTjIwWXAxRkFEY1ViYWRSUUEzRkcyblVVQU4yMFlwMUZBRGNVWXAxRkFEZHRHMm5VVUFOMjBiYWRSUUEzRkdLZFJRQTNiUmluJyArXG4gICAgICAgICdVVUFOMjBiYWRSUUEzYlJ0cDFGQURjVVlwMUZBRGR0R0tkUlFBM2JSdHAxRkFEZHRHMm5VVUFOMjBiYWRSUUEzRkcyblVVQU4yMGJhZFJRQTNiUmluVVVBTnhSdHAxRkFEZHRHMm5VVUFOJyArXG4gICAgICAgICd4U1lwOUppZ0J1S1RGUHhTWW9BWVJSVHNVaEZBRGNVMDAra0lvQWpOSlR5S2FSUUEwMFV0SmlnQlJUaFNDbmdVQUxpbHBLY0JRQUFVNENnQ2x4UUFVdEdLVUNnQk1VdUtYRkdLQUV4UmlsJyArXG4gICAgICAgICd4UzRvQVRBcE1DbllwY1VBTndLTUNseFM0b0FaZ1V1QlRzVW1LQUV3S01DbllveFFBM0ZHQlM0cGNVQU13S1hBcGNVdUtBR1lGTGdVdUtNVUFKZ1VtQlQ4VVlvQVpnVVlGUHhSaWdCbUJSJyArXG4gICAgICAgICdnVS9GSmlnQnVCUzRGT3hSaWdCdUJSZ1U3RkdLQUc0RkpnVS9GR0tBRzRGSmdVL0ZHS0FHNEZKZ1UvRkdLQUdZRkxnVTdGR0tBRzRGSmdVL0ZHS0FHNEZKZ1UvRkdLQUdZRkxnVTdGR0tBJyArXG4gICAgICAgICdHWUZHQlQ4VVlvQVpnVVlGUHhSaWdCbUJTNEZPeFJpZ0JtQlM0Rk94UmlnQnVCU1lGUHhSaWdCbUJTNEZPeFJpZ0JtQlM0Rk94UmlnQnVCUmdVN0ZHS0FHWUZMZ1U3RkdLQUdZRkxnVTdGJyArXG4gICAgICAgICdHS0FHNEZHQlRzVVVBTXdLTUNuNG94UUEzQW93S2RpakZBRGNDa3dLZmlqRkFEY0NqQXAyS01VQU53S01DbllveFFBekFwY0NuWW94UUEzQXBNQ240b3hRQTNBb3dLZGlqRkFEY0NqQXAyJyArXG4gICAgICAgICdLTVVBTndLTUNuWW94UUEzQW93S2RpakZBRGNDa3dLZmlqRkFEY0NqQXAyS01VQU53S01DbllveFFBM0Fvd0tkaWpGQURjQ2pBcDJLTVVBTndLTUNuWW94UUEzQW93S2RpakZBRGNDakFwJyArXG4gICAgICAgICcyS01VQU53S01DbllveFFBekFvd0tmaWpGQURjQ2t3S2ZpakZBRGNDakFwMktNVUFNd0tYQXAyS01VQU53S1RBcCtLTVVBTXdLWEFwMktNVUFOd0tUQXArS01VQU53S1RBcCtLTVVBTndLJyArXG4gICAgICAgICdURlB4UmlnQm1LTVV1S1hGQURLS2NSU0VVQU5wQ0tkaWtJb0FZUlNVOGlta1VBTklwcHA5TklvQVppa3B4cHRBRGhUeFRSVGhRQW9GT0ZJS2NLQUZwYUtVQ2dBRkxpaWxvQUtXaWxvQVNsJyArXG4gICAgICAgICdvb29BS0tNVVVBRkZGRkFCUlJSUUFVVVVZb0FLS0tNVUFGRkdLS0FDaWlpZ0Fvb294UUFVVVlvb0FLS0tLQUNpakZGQUJSUlJpZ0Fvb3hSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFmaFJSUlFBVVVVVUFINFVVVVVBJyArXG4gICAgICAgICdGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpakZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGJyArXG4gICAgICAgICdGQUJSUlJRQVVVVVVBSmlqRkxSUUEya3A5Tk5BRGNVbE9wQ0tBR21rTk9wRFFCR2FRMDQ4MGhvQVlhYlRqVGFBSENuMDBVNmdCd3B3cG9wd29BV25Da0ZLS0FGcDFKUzBBRkZGTFFBVVlwJyArXG4gICAgICAgICdhS0FFeFJpbG9vQVRGR0tXaWdCTVVZcGFLQUV4Umlsb29BVEh2UmozcGFLQUV4NzBZcGFLQUV4Umlsb29BVEZHS1dpZ0JNVVlwYUtBRXhSaWxvb0FURkdLV2lnQk1VWXBhS0FFeFJpbG9vJyArXG4gICAgICAgICdBVEZHS1dpZ0JNVVlwYUtBRXhSaWxvb0FURkdLV2lnQk1VdUtLS0FERkppbG9vQVRGR0tXaWdCTWU5TGlpaWdCTVV1S0tLQUV4UzRvb29BVEZMaWlpZ0F4U1lwYUtBRXhSaWxvb0FURkxpJyArXG4gICAgICAgICdpaWdCTVV1S0tLQUV4Umlsb29BTVVtS1dpZ0JNVVlwYUtBRXhSaWxvb0FURkdLV2lnQk1VWXBhS0FFeFJqM3BhS0FFeFJqM3BhS0FFeFJpbG9vQVRGR0tXaWdCTWU5R0tXaWdCTWU5R0tXJyArXG4gICAgICAgICdpZ0JNZTlHUGVsb29BVEZHS1dpZ0JNVVlwYUtBRXg3MFlwYUtBRXhSaWxvb0FURkdLV2lnQk1VWXBhS0FFeFJqM3BhS0FFeFJqM3BhS0FFeFJqM3BhS0FFeFJpbG9vQVRGR0tXaWdCTVVZJyArXG4gICAgICAgICc5NldpZ0JNVVlwYUtBRXhSaWxvb0FURkdLV2lnQk1VWXBhS0FFeFJpbG9vQVRIdlJpbG9vQVNrcDFKUUFsRkZGQURhUTA0MGhvQVlhUTA0MDAwQU5OTnA1cG5lZ0JwcHRPUGVtMEFPRk83JyArXG4gICAgICAgICcwMFU0ZGFBSERyVCsxTkZPb0FVVW9wQlRoUUFvcGFLS0FGcGFRVXRBQjFwYUtLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BJyArXG4gICAgICAgICdLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnJyArXG4gICAgICAgICdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLJyArXG4gICAgICAgICdBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQVRGRkxTVUFJYVNsTklhQUNtbW5VMDBBTk5KU21rb0FhYVlldFBOTU5BQ0dtMDQwMmdCUlR4VEJUeFFBNFU2JyArXG4gICAgICAgICdtaW5VQUtPbFBIV21EcFRoMW9BZFJSUlFBb3BhUVV0QUMwVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVJyArXG4gICAgICAgICdVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSJyArXG4gICAgICAgICdSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVsTFNVQUI2VTJuSHBUYUFDa05MU0dnQnBwdE9OTm9BUTB3MDgwdzBBTk5OcHhwdEFDaW5pbUNuaWdCd3AxTkZPb0FVZEtkJyArXG4gICAgICAgICczcEIwcFIxb0FkUlJSUUFvcGFRVXRBQzBVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVJyArXG4gICAgICAgICdVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSJyArXG4gICAgICAgICdSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGJyArXG4gICAgICAgICdGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVWxMU1VBQjZVMDA0OUthYUFDa05MU0dnQnBwdE9OTm9BUTB3MDgwdzBBTk5OcHhwdEFDaW5pbUNuaWdCd3AxTkZPb0FVZEtlT3RNSFNuanJRJyArXG4gICAgICAgICdBdEZGQW9BVVV0SUtXZ0JhS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBJyArXG4gICAgICAgICdvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBJyArXG4gICAgICAgICdDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vJyArXG4gICAgICAgICdBS0tLS0FDaWlpZ0Fvb29vQUtTbHBLQUE5S2FhZDJwcG9BS1EwdElhQUdtbTA0OTZiUUFocGhwNXBob0FhYWJUajNwdEFDaW5pbUNuaWdCd3AxTkZPb0FVZEtjT3ROSFNuRHJRQTZpaWdVJyArXG4gICAgICAgICdBS0tXa0ZMUUF0RkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGJyArXG4gICAgICAgICdGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBJyArXG4gICAgICAgICdVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBJyArXG4gICAgICAgICdCUlJSUUFVVVVVQUZKUzBsQUFlbE5weDZVMDBBRklhV2tOQURUVGFjZTlOb0FhYWFhY2FhYUFHbW0wNDAyZ0JSVHhUQlR4UUE0VXRJS1dnQnc2VThkYVlPbFBIV2dCYUJSUUtBRkZMU0NsJyArXG4gICAgICAgICdvQVdpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vJyArXG4gICAgICAgICdvb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpJyArXG4gICAgICAgICdpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLJyArXG4gICAgICAgICdLS0tBQ2twYVNnQTdVMDA3dFRUUUFVaHBhUTBBTk5OcHg3MDJnQkRURFR6VERRQTAwMm5HbTBBS0tlS1lLZlFBNFV0SUtXZ0J3NlU4ZGFZT2xPb0FkUlJSUUFvcGFRVXRBQzBVVVVBRkZGJyArXG4gICAgICAgICdGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVJyArXG4gICAgICAgICdVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSJyArXG4gICAgICAgICdSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVWxMU1VBJyArXG4gICAgICAgICdCNlUwMDQ5S2FhQUNrTkxTR2dCcHB0T05Ob0FRMHcwODB3MEFOTk5weHB0QUNpbmltQ25pZ0J3cGFRVTZnQlIwcHdwbzZVOGRhQUZvb29vQVVVdElLV2dCYUtLS0FDaWlpZ0Fvb29vQUtLJyArXG4gICAgICAgICdLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0FvJyArXG4gICAgICAgICdvb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDJyArXG4gICAgICAgICdpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLU2xwS0FEdFRUVGowcHBvJyArXG4gICAgICAgICdBS1EwdEllMUFEVFRhY2FiUUFocGhwNXBob0FhYWJUalRhQUZGUEZNRlBIZWdCd3AxTkZPb0FVZEtjS1FkS1VkYUFIVVVVVUFLS1drRkxRQXRGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRJyArXG4gICAgICAgICdBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVZaczdRM1VoeWNJdlUwQVZxSzNQN090dHVOaCt1YXB6Nlc2NWFKdHcvdW5yUUJuMFVyS1ViYXdJSTdHa29BS0tLJyArXG4gICAgICAgICdLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vJyArXG4gICAgICAgICdvb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDa3BhU2dBUFNtbW5IcFRUUUFVaHBhUTBBTk5OcHhwdEFDR21Hbm1tR2dCcHB0T05Ob0FVVThVd1U4VUFPRk9wb3AxQUNqcFR4MXBnNlU0ZGFBJyArXG4gICAgICAgICdIVVVVVUFLS1drRkxRQXRGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVJyArXG4gICAgICAgICdVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlFBU2NEazFyV1ducWloNWdDNTZBOUJRQmswVjBid1JTTHRhTlNQcFdIZDIvMmVjJyArXG4gICAgICAgICdvUHVubGZwUUJCUlJSUUFVVVVVQUZhMmtzcGhkZTRiSnJKcDhVendTYjBPRFFCMGxKVkNEVTQzd0pSc1ByMnErckJoa0VFSHZRQkZQYlJYQzRkZWV4SFdzZTZzcExibjd5ZjNoL1d0NmtJJyArXG4gICAgICAgICdCR0NNaWdEbWFLMGJ6VDltWklSOHZkZlQ2Vm5VQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVJyArXG4gICAgICAgICdVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGSlMwbEFBZWxOTk9QU20wQUZJYVdrTkFEVFRhY2FiUUFqVXcwODB3MEFOTk5weHB0QUNpbmltJyArXG4gICAgICAgICdDbmlnQndwMU5GT29BVWRLY090SU9sS090QURxS0tLQUZGTFNDbG9BV2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpJyArXG4gICAgICAgICdpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDZ1pKd0JrbWdBa2dEa210ZXhzZktBa2xHWDdEJyArXG4gICAgICAgICcwb0FMR3g4b0NTUURmMkhwVitpbG9BU3NqVnYrUGhQOXordGJGWStyZjhmQ2Y3bjlhQUtGRkZGQUJSUlRvNDJsa0NJTWswQU5vcldUU1l3dnp1eFB0eFVNK2x1b0xSTnZIb2V0QUdmVTl2JyArXG4gICAgICAgICdkUzI1K1U1WHVwNlZDeXNyRU1DQ094cEtBTisydTQ3bGZsNGJ1cDYxUFhOSzdJd1pUZ2pvYTJiTzlGd05qNEVnL1dnQzRheTcreDI1bWlISDhTanQ3MXEwaEdSUUJ6TkZYTCswOGlUZWcvJyArXG4gICAgICAgICdkdCtocW5RQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVJyArXG4gICAgICAgICdVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCU1V0SlFBZHFhYWNlbE5OQUJTR2xwRFFBMDlLYlRqVGFBRU5NTlBOTU5BRFRUYWNlOU5vQVVVOFV3VThVQU9GT3BvcDFBQ2pwVHhUQjBwdzYwJyArXG4gICAgICAgICdBT29GRkZBQ2lscEJTMEFMUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBJyArXG4gICAgICAgICdGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGR0NTQUJ5YUFNbkE2bXRleHNmS0htU0Q5NGVnOUtBQ3hzUkVCSklQbjdEMHEvUlJRQXRGRkZBQldQJyArXG4gICAgICAgICdxMy9Id24rNS9XdGVzalZ2K1BoUDl6K3RBRkNpaWlnQXE5cGVQdEp6MTI4VlJwMGJ0RTRkRGhoUUIwbEZVYmZVbzVNTEw4amV2YXJ3T1JrVUFRejJzZHd1SEhQWmgxRlkxemF5V3pZWVpVJyArXG4gICAgICAgICc5R0hldWdwa2theW9VY1pCb0E1dWxWaWpCbEpCSFRGVDNkcTF0SmpxaDZHcTlBRzdaWFF1WStlSFhxUDYxWnJuWUptZ2xEcjI2ajFyb0k1RmxqVjE2RVVBSkxFczBiSXc0SXJuNW9taGxhJyArXG4gICAgICAgICdOdW9QNTEwZForcVcrNk1US1BtWGcvU2dESm9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBJyArXG4gICAgICAgICdvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDa3BhUTBBQjZVMDA3dFRUUUFVaHBhUTBBTk5OcHhwdEFDR21Hbm1tR2dCcHB0T1BlbVVBT0ZQRk1GUG9BY0tkJyArXG4gICAgICAgICdUUlRxQUZIU25EclRSMHB3NjBBT29vb29BVVV0SUtXZ0JhS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpJyArXG4gICAgICAgICdnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9yVnRkT2pDQjVodVkvdytsV3ZzTnQvenlXZ0RBb3JmK3cyMy9QSmFQc050L3dBOGxvQXdLQnljJyArXG4gICAgICAgICdEa250Vy84QVliYi9BSjVMU3BhUVJ1R1NNQmgwTkFGYXhzZktBa2tHWDdEMHEvUlMwQUZGRkZBQlJTVXRBQldQcTMvSHduKzUvV3Rpc2ZWditQaFA5eit0QUZDaWlpZ0FvcTdCcHNrcUJuJyArXG4gICAgICAgICdiWUQwR01tbGwwdVZCbEdEajB4ZzBBVWFzMjE3SmJrRE81TzZtcXhCVWtNQ0NPeG9vQTZPR1pKb3c2SElxU3VldGJscmFVTU9WUDNoNjF2STZ5SUhVNVVqSU5BRFo0Vm5pS04zNkgwTllFJyArXG4gICAgICAgICdzYlJTTWpEQkJybzZ6OVV0OXlDWlJ5dkIrbEFHVFdqcGR4dGN3c2VEeXYxck9wVWNvNnVwNUJ6UUIwdEl5aDFLa1pCR0RTUk9KSWxjZEdHYWZRQnpjMFJobWFNL3dtbVZvYXJGaVJKUjNHJyArXG4gICAgICAgICdEV2ZRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBJyArXG4gICAgICAgICdGRkZGQUJSUlJRQVVVVVVBRkpTMGxBQWVsTk5PUFNtbWdBcERTMGhvQWFhYlRqVGFBRU5NTk9OTk5BRFQzcHRPTk5vQVVVK21DbmlnQndwYVFVNmdCUjBwNDYwMGRLY090QUMwQ2lnVUFLJyArXG4gICAgICAgICdLV2tGTFFBdEZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGJyArXG4gICAgICAgICdGQUJSUlJRQVVVVVVBRkZGRkFCU3A5OWZxS1NuSi9yRitvb0E2UWRLV2tGTFFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCV1BxMy9Id24rNS9XdGlzZlZ2K1BoUDl6K3RBRkNwTGNCJyArXG4gICAgICAgICdyaU1OMExETlIwQTRPUjFGQUhUQ2xyUHROUVdRQkpUdGZwbnNhdjVvQXJYZG1sd2hQU1FkR3JFZEdqY293d1J3UlhTMW02cGJoa0V5amtjTjlLQU1xdEhTN2pER0Jqd2VWck9wMGJtT1JYJyArXG4gICAgICAgICdYcXB6UUIwdE5kUTZGVDBJd2FFWU9pc09oR2FkUUJ6VWlHT1ZrUFZUaW0xZDFPUGJkYnV6RE5VcUFOalM1ZDF1VUo1US9wVitzYlNueGNzdlpsclpvQXA2akh2czJQZGVheEs2T1pkOExyJyArXG4gICAgICAgICc2Z2l1Y29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLJyArXG4gICAgICAgICdLQUNpaWlnQW9vb29BS0tLS0FDa3BhU2dBN1UwMDd0VFRRQVVocGFRMEFOUFNtMDQ5NmJRQWhwaHA1cGhvQWFhYlRqVGFBRkZQRk1GUEZBRGhUcWFLZFFBbzZVOGRhWU9sUEhXZ0JhS0tLJyArXG4gICAgICAgICdBSENpa0ZMUUF0RkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGJyArXG4gICAgICAgICdGRkZBQlJSUlFBVVVVVUFGRkZGQUJUay8xaS9VVTJuSi9yRitvb0E2UVV0SlMwQUZGRkZBQlJSUlFBVVVVVUFGRkpTMEFGRkZGQUJXUHEzL0FCOEovdWYxclhySTFiL2o0VC9jL3JRQlFvJyArXG4gICAgICAgICdvb29BSzB0TnV5VzhoemtZK1Uvd0JLemFsdFNSZHhZL3ZpZ0RvcVpJZ2tqWlQwSXhUNlNnRG1TQ3JFSHFPS0trdUJpNWxIKzBham9BM2RQZmZacDdjVmFxanBmL0hxZjk0MWVvQXpOV1g1JyArXG4gICAgICAgICdJMjl5S3k2MTlXLzQ5ay8zL3dDaHJJb0FzV0IyM3NmdWNmcFcvWFBXZi9INUYvdkN1aG9BUTF6YmpFakQwSnJwRFhPVGY4ZkVuKytmNTBBTW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBJyArXG4gICAgICAgICdDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS1NscEtBQTlLYWFkMnBwJyArXG4gICAgICAgICdvQUJTSHRTMGg3VUFOTk5weHB0QUNHbUdubW1HZ0JwcGxQUGVtVUFPRlBGTUZQRkFEaFRxYUtkUUFvNlU4VXdkS2VPdEFDMFVVVUFLS1drRkxRQXRGRkZBQlJSUlFBVVVVVUFGRkZGQUJSJyArXG4gICAgICAgICdSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlRrLzFpL1VVMm5KJyArXG4gICAgICAgICcvckYrb29BNlFVdElLV2dBb29wS0FGb29vb0FLS0tLQUNpaWlnQW9vb29BS3g5Vy80K0UvM1A2MXNWajZ0L3g4Si91ZjFvQW9VVVVVQUZXdFBoTWwwclkrVk9UU1cxbEpjSGQ5MlAxUDlLJyArXG4gICAgICAgICcyWUlFZ2oySU9QNTBBUzBoNEdhV3FsL1A1TnMzUHpOd0tBTVdSdDhyTjZrbW0wVWQ2QU5yVEZ4YUQzSk5YYWlnajhxQkU3Z1ZKUUJuNnMzN21NZXJWazFvYXErWlVUMEdhejZBSjdJWnZZJyArXG4gICAgICAgICd2clhRVmg2WXU2OEIvdWdtdHlnQkRYTnluTXpuMVltdWpkdHFFK2d6WE5FNUpQclFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGSlMwbEFCMnBwcHg2VTAwQUZJYVdrUGFnQnBwdE9OTm9BUTB3MDgwdzBBTk5NJyArXG4gICAgICAgICdwNTcwMmdCUlR4VEJUeFFBNFU2bWluVUFLT2xQRk1IU25qclFBdEhlaWlnQlJTMGdwYUFGb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLJyArXG4gICAgICAgICdLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLY24rc1g2aW0wQTRJSTZpZ0RwaFMxREJNczhRZFNPZW85S21vQUtLS0tBJyArXG4gICAgICAgICdDaWlpZ0JLV2lpZ0Fvb29vQUtLS0tBQ3NmVnYrUGhQOXordGJGWStyZjhmQ2Y3bjlhQUtGUGhRU1RvaDZGZ0taU3F4Umd3Nmc1RkFIU0tvVlFBTUFkQlRxcVc5L0RLZzNNRWJ1Q2NVczEvJyArXG4gICAgICAgICdCRVB2Qno2S2MwQVdIZFkwTHNRQU9wckJ1N2czTXhib280VVVYTjNKY3R6d282S0tnb0FLdGFmQVpya0VqNVU1TlZsVXV3VlJrbmdBVnZXbHVMYUVML0FCSGxqNzBBVDBVdFZiNmZ5TFk0JyArXG4gICAgICAgICdQek53S0FNaTdsODY1ZHUyY0NvYUtLQU5UU1krSkpEM09CV25VRnBENU5zaTk4WlAxcWVnQ3ZldjVkbkllK01WZ1ZxNnRKaU5JZ2VTY21zcWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLJyArXG4gICAgICAgICdLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLU2xwS0FBOUthYWNlJyArXG4gICAgICAgICdsTk5BQUtROXFXa1BhZ0JwcHRPTk5vQWFhYWFlYVlhQUdtbVU4MHlnQndwNHBncDRvQWNLZFRSVHFBRkhTbmpyVFIwcHc2MEFMUlJSUUE0VVVDaWdCYUtLS0FDaWlpZ0Fvb29vQUtLS0tBJyArXG4gICAgICAgICdDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0J5U1BHJyArXG4gICAgICAgICcyVVlxZlkxSjlzdWYrZXovQUoxRFJRQk45c3VmK2V6L0FKMGZiTG4vQUo3UCtkUTBVQVRmYkxuL0FKN1ArZFBqdnJoSERGeXdIVUU5YXJVVUFkRkJPazhZZEQ5UjZWTFhPMjl3OXZKdlRwJyArXG4gICAgICAgICczSHJXN0JPazhZZEQ5UjZVQVMwVWxMUUFVVVVVQUZZK3JmOGZDZjduOWEyS3g5Vy80K0UvM1A2MEFVS0tLS0FDaWlpZ0FwVlV1d1ZRU3g2Q3JOdll6VDRPTnFlcHJWdDdTSzNIeWpMZDJQJyArXG4gICAgICAgICdXZ0NLeXNoYmplL01oL1NybEZGQUFTQUNUd0JXRGUzSDJpY2tmY1hoYXRhamVaekRHZjhBZUkvbFdiUUFWWnNJUE91UmtmS3ZKcXNBU2NBWk5iMW5iL1o0UUQ5NDhzYUFMQW9wYXEzMC9rJyArXG4gICAgICAgICdXNUlQek53S0FNcTlsODY2WmdmbEh5aXE5RkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGJyArXG4gICAgICAgICdGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVWxMU2Q2QUE5S2FhY2VsTk5BQUtRMHRJYUFHbW0wNDAyZ0JEVERUelREUUEwMHlubW1VQU9GUEZNRlBGQURoVHFhJyArXG4gICAgICAgICdLZFFBbzZVOGRhWU9sUEhXZ0JhS0tCUUE0VVVncGFBRm9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBJyArXG4gICAgICAgICdDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ3BiZTRlM2tEcWVPNDlhaW9vQTZLQ2RMaU1PaCtvOUtscm5iZTRlM2szJyArXG4gICAgICAgICdKMDdqMXJkZ25TZU1PaCtvOUtBSmFLS0tBQ3NmVnYrUGhQOXordGJGWStyZjhBSHduKzUvV2dDaFJSUlFBVmIwK0ZaYm41aGtLTTQ5NnFWUFozQXQ3Z01mdW5nMEFiOUZOU1JIVU1yQWoxJyArXG4gICAgICAgICdGUXozc01BSVpzdDZMelFCWUp4MTZWbVh1b2NHS0UvVi93RENxMXpmU1hIeWc3VTlCVldnQW9vcTdaV1JtWVNTREVZNkQxb0FsMDIweVJQSU9QNFIvV3RXa0F4d09sRkFCMEZZVjljZmFKJyArXG4gICAgICAgICd6Zy9JdkFxN3FOMXNUeVVQek45NCtnckpvQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BJyArXG4gICAgICAgICdLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBcEtXa29BRDBwcHAzYW1tZ0FwRDJwYVE5cUFHbW0wNDAyZ0JEVERUelREUUEwMDJuR21VQU9GUEZNRlBGQURoJyArXG4gICAgICAgICdUcWFLZFFBbzZVOGRhWU9sUEhXZ0JhQlJSUUFvcGFRVXRBQzBVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGJyArXG4gICAgICAgICdGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVkxiM0QyOG05T25jZGpVVkZBSFJRVHBQR0hRL1VlbFMxJyArXG4gICAgICAgICd6dHZjUGJ5QmxQSGNldGJzRTZYRVlkRDlSNlVBUzFqNnQveDhKL3VmMXJYckYxT1JaTG9BZndyZy9XZ0NuUlJSUUFVVVVVQUFKSFE0b29vb0FLQnljRHJWbUN4bm01MjdWOVdyVXRyS0szJyArXG4gICAgICAgICd3UU56L3dCNDBBVkxUVGljU1RqQTdKL2pXb0FBTUFjVVV0QUNWV3ZMb1cwZnE1KzZLVzZ1MHQwNTVjOUZyRGtrYWFRdTV5VFFBak1YWXN4eVNjazBsRkZBQlJSUlFBVVVVVUFGRkZGQUJSJyArXG4gICAgICAgICdSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGJyArXG4gICAgICAgICdKUzBsQUFlbE5OT1BTbW1nQXBEMnBhUTlxQUdtbTA0MDJnQkRURFR6VERRQTAweW5tbVVBT0ZQRk1GUEZBRGhUcWFLZFFBbzZVOGRhWU9sUEZBQzlxS0tLQUZGTFFLS0FGb29vb0FLS0tLJyArXG4gICAgICAgICdBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vJyArXG4gICAgICAgICdvQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS2ZGTkpBMjZOc1V5aWdDMCtvM0RydDNBZTZqRlZmclJSUUFVVVVVQUZGRkZBQldqcGxzcmxwWEdjSEFCck9yUzB1NFZkMExIJyArXG4gICAgICAgICdCSnlLQU5TbHBLcnoza01IM215MzkwZGFBTEZVYnZVVmp5a1h6UDY5aFZHNHY1WjhxUGxUMEZWYUFGWm1kaXpFbGoxSnBLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDJyArXG4gICAgICAgICdpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNrcGFTZ0FQU21tJyArXG4gICAgICAgICduSHBUVFFBVWg3VW9wRFFBMDAybkdtMEFJYVlhY2FhYUFHbW0wNDB5Z0J3cDRwZ3A0b0FjS2RUUlRxQUZIU25qclRCMHA0NjBBTFJSUlFBb3BhQlJRQXRGRkZBQlJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVJyArXG4gICAgICAgICdVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQVNlZk50MithK1BUY2Fqb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDJyArXG4gICAgICAgICdpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQXBLV2tvJyArXG4gICAgICAgICdBRDBwcHB4NlUwMEFGSWUxTFNHZ0JwcHRPTk5vQVEwdzA4MHcwQU5OTXA1cGxBRGhUeFRCVHhRQTRVNm1pblVBS09sUEhXbURwVHgxb0FXaWlpZ0J3b3BCUzBBTFJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVJyArXG4gICAgICAgICdVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSJyArXG4gICAgICAgICdSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCU1V0SlFBSHBUVFRqJyArXG4gICAgICAgICcwcHBvQUJTSHRTMGg3VUFOTk5weDcwMmdCRFREVHpURFFBMDB5bm52VEtBSENuaW1DbmlnQndwMU5GT29BVWRLZUtZT2xQSFdnQmFLS0tBRkZMU0Nsb0FXaWlpZ0Fvb29vQUtLS0tBQ2lpJyArXG4gICAgICAgICdpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLJyArXG4gICAgICAgICdLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0FvJyArXG4gICAgICAgICdvb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNrcGFTZ0E3VTAwNDlLYWFBJyArXG4gICAgICAgICdDa05LS1E5cUFHbW0wNDAyZ0JEVERUelREUUEwMDJuR20wQUtLZUtZS2VLQUhDblUwVTZnQlIwcDRwZzZVOGRhQUZvNzBVVUFLS1drRkxRQXRGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRJyArXG4gICAgICAgICdBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVJyArXG4gICAgICAgICdVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkpTMGxBQWVsTk5PN1UwMEFBcEQycFJTJyArXG4gICAgICAgICdIdFFBMDAybkdtMEFJYVlhZWFZYUFHbW1VODB5Z0J3cDQ3MHdVOFVBT0ZPcG9wMUFDanBUeDFwbzZVNGRhQUZvRkZGQUNpbG9GRkFDMFVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSJyArXG4gICAgICAgICdRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGJyArXG4gICAgICAgICdGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVJyArXG4gICAgICAgICdVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVbExTZDZBQTlLYWFjZWxOTkFBS1EwdElhQUdtJyArXG4gICAgICAgICdtMDQwMmdCRFREVHpURFFBMDB5bm1tVUFPRlBGTUZQRkFEaFRxYUtkUUFvNlU4ZGFZT2xQSFdnQmFLS0JRQTRVVWdwYUFGb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vJyArXG4gICAgICAgICdBS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpJyArXG4gICAgICAgICdnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLJyArXG4gICAgICAgICdLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0Fvb29vQUtLS0tBQ2lpaWdBb29vb0FLS0tLQUNpaWlnQW9vb29BS0tLS0FDaWlpZ0FwS1drb0FEMHBwcDNhbW1nQXBEMnBSU0h0UUEwMDJuR20wJyArXG4gICAgICAgICdBSWFZYWVhWWFBR21tMDQweWdCd3A0cGdwNG9BY0tkVFJUcUFGSFNuanJUQjBwNDYwQUxSUlJRQW9wYVFVdEFDMFVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBJyArXG4gICAgICAgICdCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVJyArXG4gICAgICAgICdBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSJyArXG4gICAgICAgICdRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVbExTR2dBUFNtbW5kcWFhQUNrUGFscEQyb0FhYWJUalRhQUVOTU5QJyArXG4gICAgICAgICdOTU5BRFRUS2VhYlFBb3A0cGdwd29BZUtkVFJUcUFGSFNuanJUQjBwNDYwQUwyb29vb0FjS0tRVXRBQzBVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRJyArXG4gICAgICAgICdBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGJyArXG4gICAgICAgICdBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVVVVJyArXG4gICAgICAgICdVQUZGRkZBQlJSUlFBVVVVVUFGRkZGQUJSUlJRQVVVVVVBRkZGRkFCUlJSUUFVVVVVQUZGRkZBQlJSUlFBVWxMU1VBQjZVMDBwNlVob0FLUTlxVVVob0FhYWJUalRhQUVOTU5QTk1OQURUJyArXG4gICAgICAgICczcGxQTk1vQWNLY090TkZPb0FlT3RPcGdwd29BY09sT0ZORk9GQURoUlNDbG9BV2xwS0tBRkhTbHB0TG1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtJyArXG4gICAgICAgICdnQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wJyArXG4gICAgICAgICdab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUJyArXG4gICAgICAgICdOR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpJyArXG4gICAgICAgICdrelJtZ0JhS1ROR2FBRm9wTTBab0FXaWt6Um1nQmFLVE5HYUFGb3BNMFpvQVdpa3pSbWdCYUtUTkdhQUZvcE0wWm9BV2lrelJtZ0JhS1ROR2FBRm9wTTBab0FLS0tTZ0FOSWFXa29BU2tOJyArXG4gICAgICAgICdMU0dnQnBwS1UwbEFEVFREVHpURDFvQVEweW5IdlRhQUZGUHBnTlBvQWNEelRxWUtlS0FGRk9CcHRLS0FIVTZtNXBRYUFGcGFTaWdCYzBVbWFLQUhVVTNOR2FBSFVVMmpOQURxS2Jtak5BJyArXG4gICAgICAgICdEcUtibWpOQURxS2Jtak5BRHFLYm1qTkFEcUtiUm1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGJyArXG4gICAgICAgICdOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxSDQwM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVVJyArXG4gICAgICAgICczTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUzTkdhQUhVVTNOR2FBSFVVM05HYUFIVVUzTkdhQUhVZmpUYzBab0FkUlRjMFpvQWRSVGMwWm9BZFIrTk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxJyArXG4gICAgICAgICdGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOelJtZ0IxRk56Um1nQjFGTnpSbWdCMUZOJyArXG4gICAgICAgICd6Um1nQjFGTnpSbWdCMUZOelJtZ0IxSlNab29BV2cwbWFLQUNpaWt6UUFVMG1scHBOQUNHa05MU0dnQnBwdE9OTm9BYWFiVGlhWm1nQlJUNllLY0tBSGcwNFV3VTRHZ0I5Rk56VHFBRkJwJyArXG4gICAgICAgICcxTXBRYUFINW96VGMwdWFBSFVVM05MbjNvQVdpa3o3MFo5NkFGb3BNKzlHZmVnQmFLVFB2Um4zb0FXaWt6NzBaOTZBRm9wTSs5R2FBRm9wTSs5R2ZlZ0JhS1ROR2ZlZ0JhS1RQdlJuM29BJyArXG4gICAgICAgICdXaWt6NzBaOTZBRm9wTSs5R2ZlZ0JhS1ROR2ZlZ0JhS1RQdlJuM29BV2lrelJuM29BV2lrelJtZ0JhS1ROR2ZlZ0JhS1RQdlJtZ0JhS1ROR2ZlZ0JhS1ROR2FBRm9wTSs5R2ZlZ0JhS1ROJyArXG4gICAgICAgICdHZmVnQmFLVE5HZmVnQmFLVFB2Um1nQmFLVFB2Um1nQmFLVFB2Um4zb0FXaWt6Um4zb0FXaWt6Um1nQmFLVE5HZmVnQmFLVE5HYUFGb3BNKzlHYUFGb3BNKzlHZmVnQmFLVE5HZmVnQmFLJyArXG4gICAgICAgICdUTkdhQUZvcE0rOUdhQUZvcE0wWm9BV2lrejcwWjk2QUZvcE0wWm9BV2lrejcwWm9BV2lrejcwWm9BV2lrelJtZ0JhS1ROR2FBRm9wTSs5R2FBRm9wTTBab0FXaWt6NzBab0FXaWt6Um1nJyArXG4gICAgICAgICdCYUtUTkdmZWdCYUtUTkdhQUZvcE0rOUdhQUZvcE0wWm9BV2lrelJtZ0JhS1RQdlJtZ0JhS1ROR2FBRm9wTTBaOTZBRm9wTSs5R2ZlZ0JhS1RQdlJuM29BV2lrejcwWm9BV2lrejcwWm9BJyArXG4gICAgICAgICdXaWt6Um4zb0FXaWt6NzBaOTZBRm9wTSs5R2ZlZ0JhU2t6Um1nQmMwbEptZ21nQUpwdEZGQUJUVFNrMDBtZ0JDYWFhVTAwbWdCRFRhVTAyZ0JSVGhUQlRnYUFIZzB0TkJwYzBBUEJwUWFZJyArXG4gICAgICAgICdEVGdhQUgwVTNOTG1nQjJhTTAybG9BWE5MbW0wVUFQelJtbVpvb0FmbWt6VGMwVUFQelNacHVhTTBBUHpTWnB0R2FBSFpvelRjMFpvQWRtak5OelJtZ0IyYU0wM05HYUFINXBNMDNOR2FBJyArXG4gICAgICAgICdIWm96VGMwWm9BZG1qTk56Um1nQjJhTTAzTkdhQUhab3pUYzBab0FkbWpOTnpSbWdCMmFNMDNOR2FBSFpvelRjMFpvQWZta3pUYzBVQVB6Um1tWm96UUEvTkptbTVvelFBN05MbW1ab29BJyArXG4gICAgICAgICdkbWpOTm9vQWRtbHpUTTBab0FmbWt6VGMwWm9BZG1qTk56UlFBN05HYWJtak5BRHMwWnB1YUtBSFpvelRjMFpvQWRtak5Ob3pRQTdOR2FibWlnQjJhWE5NelJtZ0IrYU0wek5HYUFINW96JyArXG4gICAgICAgICdUTTBab0FmbWt6VGMwWm9BZG1selRNMFVBT3pSbW0wWm9BZm1relRjMFVBT3pSbW0wVUFPelJtbTBVQU96Um1tMFpvQWRtak5OelJtZ0IrYVROTm96UUE3TkdhYlJtZ0IxR2FiUm1nQithJyArXG4gICAgICAgICdUTk56UlFBN05MbW1VVUFPelM1cGxHYUFIWnBjMHlpZ0IyYVhOTW96UUE3TkdhYm1qTkFEODBtYWJtaWdCMmFYTk1vb0FmUm1tVVpvQWRtak5OelJRQTZqTk5vb0FkbWpOTnpSbWdCK2FUJyArXG4gICAgICAgICdOTnpSUUE3TkxtbVVVQU96Um1tMFVBT3pSbW01b3pRQTdOR2FibWlnQmMwWnBLS0FGSnBLTTBtYUFGcHBOR2FRbWdBSnB0R2FUTkFBYWFhVW1tazBBSVRTVUdpZ0JLV21nMG9OQUR3YWNEJyArXG4gICAgICAgICdVZE9Cb0FmUzB6TkxtZ0IrYVhOTXBhQUg1b3pUTTB1YUFIWnBjMHpOR2FBSDVveUtabWpOQUQ4MFpGTXpSbWdCK2FNaW1ab3pRQS9OR2FabWpOQUQ4MFpwbWFNMEFQelJtbVpvelFBL05HJyArXG4gICAgICAgICdhWm1qTkFEODBacG1hTTBBUHpSbW1ab3pRQS9OR2FabWpOQUQ4MFpwbWFNMEFQelJtbVpvelFBL05HYVptak5BRDgwWnBtYU0rOUFEOGlqTk16Um1nQitSUmtVek5HYUFINUZHYVptak5BJyArXG4gICAgICAgICdEODBacG1hTTBBUHpSbW1ab3pRQS9Jb3pUTTBab0Fma1VaRk16Um1nQithTTB6TkdhQUg1RkdSVE0wWm9BZm1qTk16Um1nQithTWltWm96UUEvSW95S1ptak5BRDgwWkZNelJtZ0IrYU1pJyArXG4gICAgICAgICdtWjk2TTBBUHpSbW1ab3pRQS9OR1JUTTBab0Fma1VacG1hTTBBUHpSa1V6TkdhQUg1b3lLWm1qTkFEOGlqSXBtYU0wQVB5S01pbVpvelFBL05HYVptak5BRDhpaklwbWFNMEFQeUtNaW1aJyArXG4gICAgICAgICdvelFBL05HUlRNMFpvQWZrVVpwbWFNMEFQeUtNaW1ab3pRQS9Jb3lLWm1qTkFEOGlqSXBtYU0wQVB6UmtVek5HYUFINUZHUlRNMFpvQWZtaklwbWFNMEFQeUtNaW1ab3pRQS9Jb3lLWm1qJyArXG4gICAgICAgICdOQUQ4MFpwbWFNMEFQeUtNaW1ab3pRQS9Jb3lLWm1qTkFEOGlqSXBtYU0wQVB5S00wek5HYUFINW96VE0wWm9BZm1qSXBtYU0wQVB6Um1tWm96UUEvTkdSVE0wWm9BZmtVWkZNelJtZ0IrJyArXG4gICAgICAgICdhTTB6TkdhQUhab3pUYzBab0FjVFNacHVhS0FGSnBNMGxKbWdCYVFtak5OSm9BQ2FhYUtTZ0FORklhVE5BQ0EwNFV3VW9vQWZTMDBVb29BZFRzMHlpZ0I0TkxtbVVDZ0NUTkdhWlMwQU8vJyArXG4gICAgICAgICdDajhLYlJRQTdOTG1tVVVBT3pTNXBsRkFEczBacHRGQUQ4KzFHYVpSbWdCK2FNMHlpZ0IrYU0weWpOQUQ4MFpwbEZBRDgwWjlxWlJRQTdOTG1tWm96UUEvTkdhWlJRQS9OR2FabWlnQithJyArXG4gICAgICAgICdNMHlqTkFEODBacG1hVE5BRW1hTTB6TkptZ0NUTkdhanpSbWdDVE5HYVpta3pRQkptak5NelJtZ0IrYU0xSG1qTkFFbWFNMUhtak5BRW1hTTB6TkptZ0NUTkdhanpTNW9BZm1qTlI1cGMwJyArXG4gICAgICAgICdBUHpSbW1ab3pRQS9OR2FabWt6UUJKbWpOUjVwYzBBUHpSbW84MFpvQWt6Um1vODBab0FrelJtbVpwTTBBU1pvelVlYU0wQVNab3pUTTBtYUFKTTBacVBOR2FBSk0wWnFQTkdhQUpNMFpxJyArXG4gICAgICAgICdQTkxtZ0IrYU0wek5KbWdCK2FYTk16U1pvQWt6Um1vODB1YUFINW96VE0wWm9BZm1qTlI1cGMwQVB6Um1tWm96UUEvTkdhWm1relFCSm1qTlI1cGMwQVB6Um1vODBab0FrelJtbzgwdWFBJyArXG4gICAgICAgICdINW96VWVhWE5BRDgwWnBtYVROQUVtYU0xSG1selFBL05HYVptak5BRDgwWnBtYVROQUVtYU0xSG1selFBL05HYVptak5BRDgwWnFQTkxtZ0IrYU0xSG1qTkFFbWFNMHpOSm1nQ1ROR2FqJyArXG4gICAgICAgICd6Um1nQ1ROR2FabWpOQUQ4MFpwbWFNODBBUHpSbW84MFpvQWt6Um1tWnBNMEFTWnBNMDNOR2FBSGZoUm4ycHVhU2dCK2FRbW0wbEFEczBacHRKUUFwcEtLUTBBRklUU21tR2dBSm9wRFJRJyArXG4gICAgICAgICdCLy85az0nO1xuICAgIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkd2luZG93KSB7XG4gICAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgY29udHJvbGxlcjogJ01pQml0ZGFzaENvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICdiaXRkYXNoVm0nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgY29uZmlnOiAnPScsXG4gICAgICAgICAgICB3ZWJjYXN0OiAnPScsXG4gICAgICAgICAgICBvcHRpb25zOiAnPT8nXG5cbiAgICAgICAgfSxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0gc2NvcGUuY29uZmlnOyAgLy8gZGllIGNvbmZpZyB3aXJkIGF1dG9tYXRpc2NoIGR1cmNoIGRlbiBjb250cm9sbGVyIGVyd2VpdGVydFxuICAgICAgICAgICAgdmFyIHBsYXllciA9ICR3aW5kb3cud2luZG93LmJpdG1vdmluLnBsYXllcignbWktYml0ZGFzaC1wbGF5ZXInKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuc2V0dXAoY29uZmlnKTtcblxuICAgICAgICAgICAgdmFyIHN0YXRlID0gc2NvcGUud2ViY2FzdC5zdGF0ZSArICdTdGF0ZURhdGEnO1xuICAgICAgICAgICAgdmFyIGJpdG1vdmluQ29udHJvbGJhciA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiaXRkYXNoLXZjJykpO1xuXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc2NvcGUud2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHkpICYmIHNjb3BlLndlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuYXVkaW9Pbmx5KSB7XG4gICAgICAgICAgICAgICAgYml0bW92aW5Db250cm9sYmFyWzBdLnN0eWxlLm1pbkhlaWdodCA9ICczMHB4JztcbiAgICAgICAgICAgICAgICBiaXRtb3ZpbkNvbnRyb2xiYXJbMF0uc3R5bGUubWluV2lkdGggPSAnMTk1cHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYml0ZGFzaC1kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==