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
	            $templateCache.put('mi/template/bitdash-player.html', '<div id="mi-bitdash-player"></div>');
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
	        if (webcast.useDVRPlaybackInPostLive === true && webcast.state === 'postlive') {
	            return getDVRPlaybackToPostLive(webcast);
	        }
	        return getPlayerConfigSourceByState(webcast, stateProperty);
	    }

	    function getDVRPlaybackToPostLive(webcast) {
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
	        templateUrl: 'mi/template/bitdash-player.html',
	        scope: {
	            config: '=',
	            webcast: '='
	        },
	        link: function (scope) {
	            var config = scope.config;  // die config wird automatisch durch den controller erweitert
	            var player = $window.window.bitdash('mi-bitdash-player');

	            // tech support - flash and hls
	            var supportedTech = player.getSupportedTech();
	            // force HLS / Flash playback if available
	            var hlsTech = [];
	            var flashForce = false;
	            var cuepointsSupported = false;

	            angular.forEach(supportedTech, function (tech) {
	                if (tech.streaming === 'hls') {
	                    hlsTech.push(tech.player + '.' + tech.streaming);
	                }
	            });

	            if (hlsTech.indexOf('flash.hls') !== -1) {
	                flashForce = true;
	                cuepointsSupported = true;
	            }

	            if (hlsTech.indexOf('native.hls') !== -1) {
	                flashForce = false;
	                cuepointsSupported = true;
	                // ToDo check for Android, Android does not support CuePoints via HTML5
	            }

	            if (player.isReady() && !flashForce) {
	                // funktioniert derzeit nur für den NON-Flash ... flashie selbst fällt sehr laut hin ... Dreck
	                player.destroy();
	                player = $window.window.bitdash('mi-bitdash-player');
	            }

	            if (flashForce) {
	                player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
	            } else {
	                player.setup(config);
	            }
	        }
	    };
	};
	module.exports.$inject = ["$window"];






/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDlkZmFlZmVmNGE3NmE5OTZmOGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsRzs7Ozs7O0FDbEJUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxpQ0FBc0M7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBa0Q7QUFDbEQsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWktYW5ndWxhci1iaXRkYXNoLXBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDlkZmFlZmVmNGE3NmE5OTZmOGZcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cblxudmFyIEJpdGRhc2hDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iaXRkYXNoLWNvbnRyb2xsZXInKSxcbiAgICBCaXRkYXNoRGlyZWN0aXZlID0gcmVxdWlyZSgnLi9iaXRkYXNoLWRpcmVjdGl2ZScpO1xuICAgIG1vZHVsZS5leHBvcnRzID0gYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdtaS5CaXRkYXNoUGxheWVyJywgWydtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJ10pXG4gICAgICAgIC8vIGNvbnRyb2xsZXIgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAuY29udHJvbGxlcignTWlCaXRkYXNoQ29udHJvbGxlcicsIEJpdGRhc2hDb250cm9sbGVyKVxuICAgICAgICAvLyBkaXJlY3RpdmUgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgLmRpcmVjdGl2ZSgnbWlCaXRkYXNoUGxheWVyJywgQml0ZGFzaERpcmVjdGl2ZSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsIFtdKVxuICAgICAgICAucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsICc8ZGl2IGlkPVwibWktYml0ZGFzaC1wbGF5ZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgfV0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGxvZykge1xuICAgIC8vIGNvbnRyb2xsZXJBcyAtPiBiaXRkYXNoVm1cbiAgICB2YXIgdm0gPSB0aGlzO1xuXG5cbiAgICAvLyBjb3B5IHRoZSBiYXNpYyBjb25maWcgLi4uIGtleSBpcyBtYW5kYXRvcnlcbiAgICB2bS5jb25maWcgPSB7fTtcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZykgJiYgYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZy5rZXkpKSB7XG4gICAgICAgIHZtLmNvbmZpZyA9ICRzY29wZS5jb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGxvZy5lcnJvcignYmFzaWMgY29uZmlnIGZvciBiaXRkYXNoIHBsYXllciBpcyBtaXNzaW5nIScpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHdlYmNhc3QgdG8gZXhwYW5kIGFuZCBtYW5pcHVsYXRlIHRoZSBiYXNpYyBiaXRkYXNoIHBsYXllciBjb25maWdcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLndlYmNhc3QpKSB7XG4gICAgICAgIHByb2Nlc3NXZWJjYXN0KCRzY29wZS53ZWJjYXN0KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1dlYmNhc3Qod2ViY2FzdCkge1xuICAgICAgICB2bS5jb25maWcuc291cmNlID0gZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QpO1xuICAgICAgICB2bS5jb25maWcuc3R5bGUgPSBnZXRQbGF5ZXJDb25maWdTdHlsZSh3ZWJjYXN0KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc291cmNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QpIHtcbiAgICAgICAgdmFyIHN0YXRlUHJvcGVydHkgPSB3ZWJjYXN0LnN0YXRlICsgJ1N0YXRlRGF0YSc7XG4gICAgICAgIGlmICh3ZWJjYXN0LnVzZURWUlBsYXliYWNrSW5Qb3N0TGl2ZSA9PT0gdHJ1ZSAmJiB3ZWJjYXN0LnN0YXRlID09PSAncG9zdGxpdmUnKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RFZSUGxheWJhY2tUb1Bvc3RMaXZlKHdlYmNhc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlUHJvcGVydHkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERWUlBsYXliYWNrVG9Qb3N0TGl2ZSh3ZWJjYXN0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBobHM6IHdlYmNhc3RbJ2xpdmVTdGF0ZURhdGEnXS5wbGF5b3V0Lmhsc1VybC5yZXBsYWNlKCcvbWFzdGVyLm0zdTgnLCAnRHZyL21hc3Rlci5tM3U4P0RWUicpLFxuICAgICAgICAgICAgZGFzaDogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuZGFzaFVybC5yZXBsYWNlKCcvcGxheWxpc3QubTN1OCcsICdEdnIvcGxheWxpc3QubTN1OD9EVlInKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhsczogd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5obHNVcmwsXG4gICAgICAgICAgICBkYXNoOiB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmRhc2hVcmxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCkge1xuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgYXV0b0hpZGVDb250cm9sczogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0LmF1ZGlvT25seSkgJiYgd2ViY2FzdC5hdWRpb09ubHkpIHtcbiAgICAgICAgICAgIHN0eWxlLmF1dG9IaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9ICczMHB4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLmFzcGVjdHJhdGlvID0gJzE2OjknO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvYml0ZGFzaC1jb250cm9sbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkd2luZG93KSB7XG4gICAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGNvbmZpZzogJz0nLFxuICAgICAgICAgICAgd2ViY2FzdDogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHNjb3BlLmNvbmZpZzsgIC8vIGRpZSBjb25maWcgd2lyZCBhdXRvbWF0aXNjaCBkdXJjaCBkZW4gY29udHJvbGxlciBlcndlaXRlcnRcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuXG4gICAgICAgICAgICAvLyB0ZWNoIHN1cHBvcnQgLSBmbGFzaCBhbmQgaGxzXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkVGVjaCA9IHBsYXllci5nZXRTdXBwb3J0ZWRUZWNoKCk7XG4gICAgICAgICAgICAvLyBmb3JjZSBITFMgLyBGbGFzaCBwbGF5YmFjayBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBobHNUZWNoID0gW107XG4gICAgICAgICAgICB2YXIgZmxhc2hGb3JjZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGN1ZXBvaW50c1N1cHBvcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc3VwcG9ydGVkVGVjaCwgZnVuY3Rpb24gKHRlY2gpIHtcbiAgICAgICAgICAgICAgICBpZiAodGVjaC5zdHJlYW1pbmcgPT09ICdobHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGhsc1RlY2gucHVzaCh0ZWNoLnBsYXllciArICcuJyArIHRlY2guc3RyZWFtaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignZmxhc2guaGxzJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hGb3JjZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY3VlcG9pbnRzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignbmF0aXZlLmhscycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGZsYXNoRm9yY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIFRvRG8gY2hlY2sgZm9yIEFuZHJvaWQsIEFuZHJvaWQgZG9lcyBub3Qgc3VwcG9ydCBDdWVQb2ludHMgdmlhIEhUTUw1XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNSZWFkeSgpICYmICFmbGFzaEZvcmNlKSB7XG4gICAgICAgICAgICAgICAgLy8gZnVua3Rpb25pZXJ0IGRlcnplaXQgbnVyIGbDvHIgZGVuIE5PTi1GbGFzaCAuLi4gZmxhc2hpZSBzZWxic3QgZsOkbGx0IHNlaHIgbGF1dCBoaW4gLi4uIERyZWNrXG4gICAgICAgICAgICAgICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxhc2hGb3JjZSkge1xuICAgICAgICAgICAgICAgIHBsYXllci5zZXR1cChjb25maWcsICdmbGFzaC5obHMnKTsgIC8vIFRvRG8gY2hlY2sgZG9jcyBmb3IgdGhhdCBmdW5ueSBwYXJhbWV0ZXJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9iaXRkYXNoLWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=