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
	    // controller /////////////////////////////////////////////////////////////////////////////////////////////////////
	    .controller('MiBitdashController', BitdashController)
	    // directive //////////////////////////////////////////////////////////////////////////////////////////////////////
	    .directive('miBitdashPlayer', BitdashDirective);

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
	            hls: webcast['liveStateData'].playout.hlsUrl + '?DVR',
	            dash: webcast['liveStateData'].playout.dashUrl + '?DVR'
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
	      //  controller: 'MiBitdashController',
	      //  controllerAs: 'mibitdash',
	        templateUrl: 'mi/template/bitdash-player.html',

	        //templateUrl: 'mi/template/bitdash-player.html',
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
	               // $log.info('Player already exists ... will destroy destroy and reinit');
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

	angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
	    $templateCache.put('mi/template/bitdash-player.html',
	        '<div id="mi-bitdash-player"></div>'
	    );
	}]);


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYThkMWZiODVkMDY0N2Y0ZjEyNDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEOzs7Ozs7QUNiQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLGlDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBa0Q7QUFDbEQsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDIiwiZmlsZSI6Im1pLWFuZ3VsYXItYml0ZGFzaC1wbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE4ZDFmYjg1ZDA2NDdmNGYxMjQ2XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5cbnZhciBCaXRkYXNoQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYml0ZGFzaC1jb250cm9sbGVyJyksXG4gICAgQml0ZGFzaERpcmVjdGl2ZSA9IHJlcXVpcmUoJy4vYml0ZGFzaC1kaXJlY3RpdmUnKTtcbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhclxuICAgIC5tb2R1bGUoJ21pLkJpdGRhc2hQbGF5ZXInLCBbJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnXSlcbiAgICAvLyBjb250cm9sbGVyIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLmNvbnRyb2xsZXIoJ01pQml0ZGFzaENvbnRyb2xsZXInLCBCaXRkYXNoQ29udHJvbGxlcilcbiAgICAvLyBkaXJlY3RpdmUgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLmRpcmVjdGl2ZSgnbWlCaXRkYXNoUGxheWVyJywgQml0ZGFzaERpcmVjdGl2ZSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkbG9nKSB7XG4gICAgLy8gY29udHJvbGxlckFzIC0+IGJpdGRhc2hWbVxuICAgIHZhciB2bSA9IHRoaXM7XG5cblxuICAgIC8vIGNvcHkgdGhlIGJhc2ljIGNvbmZpZyAuLi4ga2V5IGlzIG1hbmRhdG9yeVxuICAgIHZtLmNvbmZpZyA9IHt9O1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuY29uZmlnKSAmJiBhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuY29uZmlnLmtleSkpIHtcbiAgICAgICAgdm0uY29uZmlnID0gJHNjb3BlLmNvbmZpZztcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbG9nLmVycm9yKCdiYXNpYyBjb25maWcgZm9yIGJpdGRhc2ggcGxheWVyIGlzIG1pc3NpbmchJyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgd2ViY2FzdCB0byBleHBhbmQgYW5kIG1hbmlwdWxhdGUgdGhlIGJhc2ljIGJpdGRhc2ggcGxheWVyIGNvbmZpZ1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUud2ViY2FzdCkpIHtcbiAgICAgICAgcHJvY2Vzc1dlYmNhc3QoJHNjb3BlLndlYmNhc3QpO1xuICAgIH1cblxuICAgIC8vIHBsYXllciBjb25maWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzV2ViY2FzdCh3ZWJjYXN0KSB7XG4gICAgICAgIHZtLmNvbmZpZy5zb3VyY2UgPSBnZXRQbGF5ZXJDb25maWdTb3VyY2Uod2ViY2FzdCk7XG4gICAgICAgIHZtLmNvbmZpZy5zdHlsZSA9IGdldFBsYXllckNvbmZpZ1N0eWxlKHdlYmNhc3QpO1xuICAgIH1cblxuICAgIC8vIHBsYXllciBjb25maWcgLSBzb3VyY2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2Uod2ViY2FzdCkge1xuICAgICAgICB2YXIgc3RhdGVQcm9wZXJ0eSA9IHdlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcbiAgICAgICAgaWYgKHdlYmNhc3QudXNlRFZSUGxheWJhY2tJblBvc3RMaXZlID09PSB0cnVlICYmIHdlYmNhc3Quc3RhdGUgPT09ICdwb3N0bGl2ZScpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXREVlJQbGF5YmFja1RvUG9zdExpdmUod2ViY2FzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGVQcm9wZXJ0eSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RFZSUGxheWJhY2tUb1Bvc3RMaXZlKHdlYmNhc3QpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhsczogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuaGxzVXJsICsgJz9EVlInLFxuICAgICAgICAgICAgZGFzaDogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuZGFzaFVybCArICc/RFZSJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhsczogd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5obHNVcmwsXG4gICAgICAgICAgICBkYXNoOiB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmRhc2hVcmxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCkge1xuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgYXV0b0hpZGVDb250cm9sczogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0LmF1ZGlvT25seSkgJiYgd2ViY2FzdC5hdWRpb09ubHkpIHtcbiAgICAgICAgICAgIHN0eWxlLmF1dG9IaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9ICczMHB4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLmFzcGVjdHJhdGlvID0gJzE2OjknO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvYml0ZGFzaC1jb250cm9sbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkd2luZG93KSB7XG4gICAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIC8vICBjb250cm9sbGVyOiAnTWlCaXRkYXNoQ29udHJvbGxlcicsXG4gICAgICAvLyAgY29udHJvbGxlckFzOiAnbWliaXRkYXNoJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJyxcblxuICAgICAgICAvL3RlbXBsYXRlVXJsOiAnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBjb25maWc6ICc9JyxcbiAgICAgICAgICAgIHdlYmNhc3Q6ICc9J1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBzY29wZS5jb25maWc7ICAvLyBkaWUgY29uZmlnIHdpcmQgYXV0b21hdGlzY2ggZHVyY2ggZGVuIGNvbnRyb2xsZXIgZXJ3ZWl0ZXJ0XG4gICAgICAgICAgICB2YXIgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0ZGFzaCgnbWktYml0ZGFzaC1wbGF5ZXInKTtcbiAgICAgICAgICAgIC8vIHRlY2ggc3VwcG9ydCAtIGZsYXNoIGFuZCBobHNcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWRUZWNoID0gcGxheWVyLmdldFN1cHBvcnRlZFRlY2goKTtcbiAgICAgICAgICAgIC8vIGZvcmNlIEhMUyAvIEZsYXNoIHBsYXliYWNrIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIGhsc1RlY2ggPSBbXTtcbiAgICAgICAgICAgIHZhciBmbGFzaEZvcmNlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgY3VlcG9pbnRzU3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdXBwb3J0ZWRUZWNoLCBmdW5jdGlvbiAodGVjaCkge1xuICAgICAgICAgICAgICAgIGlmICh0ZWNoLnN0cmVhbWluZyA9PT0gJ2hscycpIHtcbiAgICAgICAgICAgICAgICAgICAgaGxzVGVjaC5wdXNoKHRlY2gucGxheWVyICsgJy4nICsgdGVjaC5zdHJlYW1pbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCdmbGFzaC5obHMnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBmbGFzaEZvcmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCduYXRpdmUuaGxzJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hGb3JjZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGN1ZXBvaW50c1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gVG9EbyBjaGVjayBmb3IgQW5kcm9pZCwgQW5kcm9pZCBkb2VzIG5vdCBzdXBwb3J0IEN1ZVBvaW50cyB2aWEgSFRNTDVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYXllci5pc1JlYWR5KCkgJiYgIWZsYXNoRm9yY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBmdW5rdGlvbmllcnQgZGVyemVpdCBudXIgZsO8ciBkZW4gTk9OLUZsYXNoIC4uLiBmbGFzaGllIHNlbGJzdCBmw6RsbHQgc2VociBsYXV0IGhpbiAuLi4gRHJlY2tcbiAgICAgICAgICAgICAgIC8vICRsb2cuaW5mbygnUGxheWVyIGFscmVhZHkgZXhpc3RzIC4uLiB3aWxsIGRlc3Ryb3kgZGVzdHJveSBhbmQgcmVpbml0Jyk7XG4gICAgICAgICAgICAgICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxhc2hGb3JjZSkge1xuICAgICAgICAgICAgICAgIHBsYXllci5zZXR1cChjb25maWcsICdmbGFzaC5obHMnKTsgIC8vIFRvRG8gY2hlY2sgZG9jcyBmb3IgdGhhdCBmdW5ueSBwYXJhbWV0ZXJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLCBbXSkucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLFxuICAgICAgICAnPGRpdiBpZD1cIm1pLWJpdGRhc2gtcGxheWVyXCI+PC9kaXY+J1xuICAgICk7XG59XSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==