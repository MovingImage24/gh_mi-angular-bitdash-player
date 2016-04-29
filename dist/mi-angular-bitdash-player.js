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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWJkZDBkZGJhODQ4ZGY3OTY4M2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsRzs7Ozs7O0FDbEJUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsaUNBQXNDO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQWtEO0FBQ2xELGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1pLWFuZ3VsYXItYml0ZGFzaC1wbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDliZGQwZGRiYTg0OGRmNzk2ODNkXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5cbnZhciBCaXRkYXNoQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYml0ZGFzaC1jb250cm9sbGVyJyksXG4gICAgQml0ZGFzaERpcmVjdGl2ZSA9IHJlcXVpcmUoJy4vYml0ZGFzaC1kaXJlY3RpdmUnKTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWkuQml0ZGFzaFBsYXllcicsIFsnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCddKVxuICAgICAgICAvLyBjb250cm9sbGVyIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgLmNvbnRyb2xsZXIoJ01pQml0ZGFzaENvbnRyb2xsZXInLCBCaXRkYXNoQ29udHJvbGxlcilcbiAgICAgICAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC5kaXJlY3RpdmUoJ21pQml0ZGFzaFBsYXllcicsIEJpdGRhc2hEaXJlY3RpdmUpO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLCBbXSlcbiAgICAgICAgLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLCAnPGRpdiBpZD1cIm1pLWJpdGRhc2gtcGxheWVyXCI+PC9kaXY+Jyk7XG4gICAgICAgIH1dKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICRsb2cpIHtcbiAgICAvLyBjb250cm9sbGVyQXMgLT4gYml0ZGFzaFZtXG4gICAgdmFyIHZtID0gdGhpcztcblxuXG4gICAgLy8gY29weSB0aGUgYmFzaWMgY29uZmlnIC4uLiBrZXkgaXMgbWFuZGF0b3J5XG4gICAgdm0uY29uZmlnID0ge307XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5jb25maWcpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5jb25maWcua2V5KSkge1xuICAgICAgICB2bS5jb25maWcgPSAkc2NvcGUuY29uZmlnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRsb2cuZXJyb3IoJ2Jhc2ljIGNvbmZpZyBmb3IgYml0ZGFzaCBwbGF5ZXIgaXMgbWlzc2luZyEnKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB3ZWJjYXN0IHRvIGV4cGFuZCBhbmQgbWFuaXB1bGF0ZSB0aGUgYmFzaWMgYml0ZGFzaCBwbGF5ZXIgY29uZmlnXG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS53ZWJjYXN0KSkge1xuICAgICAgICBwcm9jZXNzV2ViY2FzdCgkc2NvcGUud2ViY2FzdCk7XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NXZWJjYXN0KHdlYmNhc3QpIHtcbiAgICAgICAgdm0uY29uZmlnLnNvdXJjZSA9IGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0KTtcbiAgICAgICAgdm0uY29uZmlnLnN0eWxlID0gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCk7XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyAtIHNvdXJjZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0KSB7XG4gICAgICAgIHZhciBzdGF0ZVByb3BlcnR5ID0gd2ViY2FzdC5zdGF0ZSArICdTdGF0ZURhdGEnO1xuICAgICAgICBpZiAod2ViY2FzdC51c2VEVlJQbGF5YmFja0luUG9zdGxpdmUgPT09IHRydWUgJiYgd2ViY2FzdC5zdGF0ZSA9PT0gJ3Bvc3RsaXZlJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldERWUlBsYXliYWNrVG9Qb3N0bGl2ZSh3ZWJjYXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2V0UGxheWVyQ29uZmlnU291cmNlQnlTdGF0ZSh3ZWJjYXN0LCBzdGF0ZVByb3BlcnR5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREVlJQbGF5YmFja1RvUG9zdGxpdmUod2ViY2FzdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGxzOiB3ZWJjYXN0WydsaXZlU3RhdGVEYXRhJ10ucGxheW91dC5obHNVcmwucmVwbGFjZSgnL21hc3Rlci5tM3U4JywgJ0R2ci9tYXN0ZXIubTN1OD9EVlInKSxcbiAgICAgICAgICAgIGRhc2g6IHdlYmNhc3RbJ2xpdmVTdGF0ZURhdGEnXS5wbGF5b3V0LmRhc2hVcmwucmVwbGFjZSgnL3BsYXlsaXN0Lm0zdTgnLCAnRHZyL3BsYXlsaXN0Lm0zdTg/RFZSJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBobHM6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuaGxzVXJsLFxuICAgICAgICAgICAgZGFzaDogd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5kYXNoVXJsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyAtIHN0eWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1N0eWxlKHdlYmNhc3QpIHtcbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGF1dG9IaWRlQ29udHJvbHM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdC5hdWRpb09ubHkpICYmIHdlYmNhc3QuYXVkaW9Pbmx5KSB7XG4gICAgICAgICAgICBzdHlsZS5hdXRvSGlkZUNvbnRyb2xzID0gZmFsc2U7XG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5hc3BlY3RyYXRpbyA9ICcxNjo5JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2JpdGRhc2gtY29udHJvbGxlci5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHdpbmRvdykge1xuICAgIC8vIGRpcmVjdGl2ZSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdNaUJpdGRhc2hDb250cm9sbGVyJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAnYml0ZGFzaFZtJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGNvbmZpZzogJz0nLFxuICAgICAgICAgICAgd2ViY2FzdDogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHNjb3BlLmNvbmZpZzsgIC8vIGRpZSBjb25maWcgd2lyZCBhdXRvbWF0aXNjaCBkdXJjaCBkZW4gY29udHJvbGxlciBlcndlaXRlcnRcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuXG4gICAgICAgICAgICAvLyB0ZWNoIHN1cHBvcnQgLSBmbGFzaCBhbmQgaGxzXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkVGVjaCA9IHBsYXllci5nZXRTdXBwb3J0ZWRUZWNoKCk7XG4gICAgICAgICAgICAvLyBmb3JjZSBITFMgLyBGbGFzaCBwbGF5YmFjayBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBobHNUZWNoID0gW107XG4gICAgICAgICAgICB2YXIgZmxhc2hGb3JjZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGN1ZXBvaW50c1N1cHBvcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc3VwcG9ydGVkVGVjaCwgZnVuY3Rpb24gKHRlY2gpIHtcbiAgICAgICAgICAgICAgICBpZiAodGVjaC5zdHJlYW1pbmcgPT09ICdobHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGhsc1RlY2gucHVzaCh0ZWNoLnBsYXllciArICcuJyArIHRlY2guc3RyZWFtaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignZmxhc2guaGxzJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hGb3JjZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY3VlcG9pbnRzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignbmF0aXZlLmhscycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGZsYXNoRm9yY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIFRvRG8gY2hlY2sgZm9yIEFuZHJvaWQsIEFuZHJvaWQgZG9lcyBub3Qgc3VwcG9ydCBDdWVQb2ludHMgdmlhIEhUTUw1XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNSZWFkeSgpICYmICFmbGFzaEZvcmNlKSB7XG4gICAgICAgICAgICAgICAgLy8gZnVua3Rpb25pZXJ0IGRlcnplaXQgbnVyIGbDvHIgZGVuIE5PTi1GbGFzaCAuLi4gZmxhc2hpZSBzZWxic3QgZsOkbGx0IHNlaHIgbGF1dCBoaW4gLi4uIERyZWNrXG4gICAgICAgICAgICAgICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxhc2hGb3JjZSkge1xuICAgICAgICAgICAgICAgIHBsYXllci5zZXR1cChjb25maWcsICdmbGFzaC5obHMnKTsgIC8vIFRvRG8gY2hlY2sgZG9jcyBmb3IgdGhhdCBmdW5ueSBwYXJhbWV0ZXJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9iaXRkYXNoLWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=