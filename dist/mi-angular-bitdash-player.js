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
	    .directive('MiBitdashDirective', BitdashDirective);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjM3NTQ2OWZiYjg5NGNlNjliZjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEOzs7Ozs7QUNiQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLGlDQUFzQztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQWtEO0FBQ2xELGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyIsImZpbGUiOiJtaS1hbmd1bGFyLWJpdGRhc2gtcGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2Mzc1NDY5ZmJiODk0Y2U2OWJmM1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xuXG52YXIgQml0ZGFzaENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2JpdGRhc2gtY29udHJvbGxlcicpLFxuICAgIEJpdGRhc2hEaXJlY3RpdmUgPSByZXF1aXJlKCcuL2JpdGRhc2gtZGlyZWN0aXZlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXJcbiAgICAubW9kdWxlKCdtaS5CaXRkYXNoUGxheWVyJywgWydtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJ10pXG4gICAgLy8gY29udHJvbGxlciAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC5jb250cm9sbGVyKCdNaUJpdGRhc2hDb250cm9sbGVyJywgQml0ZGFzaENvbnRyb2xsZXIpXG4gICAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC5kaXJlY3RpdmUoJ01pQml0ZGFzaERpcmVjdGl2ZScsIEJpdGRhc2hEaXJlY3RpdmUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJGxvZykge1xuICAgIC8vIGNvbnRyb2xsZXJBcyAtPiBiaXRkYXNoVm1cbiAgICB2YXIgdm0gPSB0aGlzO1xuXG5cbiAgICAvLyBjb3B5IHRoZSBiYXNpYyBjb25maWcgLi4uIGtleSBpcyBtYW5kYXRvcnlcbiAgICB2bS5jb25maWcgPSB7fTtcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZykgJiYgYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZy5rZXkpKSB7XG4gICAgICAgIHZtLmNvbmZpZyA9ICRzY29wZS5jb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGxvZy5lcnJvcignYmFzaWMgY29uZmlnIGZvciBiaXRkYXNoIHBsYXllciBpcyBtaXNzaW5nIScpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHdlYmNhc3QgdG8gZXhwYW5kIGFuZCBtYW5pcHVsYXRlIHRoZSBiYXNpYyBiaXRkYXNoIHBsYXllciBjb25maWdcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLndlYmNhc3QpKSB7XG4gICAgICAgIHByb2Nlc3NXZWJjYXN0KCRzY29wZS53ZWJjYXN0KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1dlYmNhc3Qod2ViY2FzdCkge1xuICAgICAgICB2bS5jb25maWcuc291cmNlID0gZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QpO1xuICAgICAgICB2bS5jb25maWcuc3R5bGUgPSBnZXRQbGF5ZXJDb25maWdTdHlsZSh3ZWJjYXN0KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc291cmNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QpIHtcbiAgICAgICAgdmFyIHN0YXRlUHJvcGVydHkgPSB3ZWJjYXN0LnN0YXRlICsgJ1N0YXRlRGF0YSc7XG4gICAgICAgIGlmICh3ZWJjYXN0LnVzZURWUlBsYXliYWNrSW5Qb3N0TGl2ZSA9PT0gdHJ1ZSAmJiB3ZWJjYXN0LnN0YXRlID09PSAncG9zdGxpdmUnKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0RFZSUGxheWJhY2tUb1Bvc3RMaXZlKHdlYmNhc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlUHJvcGVydHkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERWUlBsYXliYWNrVG9Qb3N0TGl2ZSh3ZWJjYXN0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBobHM6IHdlYmNhc3RbJ2xpdmVTdGF0ZURhdGEnXS5wbGF5b3V0Lmhsc1VybCArICc/RFZSJyxcbiAgICAgICAgICAgIGRhc2g6IHdlYmNhc3RbJ2xpdmVTdGF0ZURhdGEnXS5wbGF5b3V0LmRhc2hVcmwgKyAnP0RWUidcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBobHM6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuaGxzVXJsLFxuICAgICAgICAgICAgZGFzaDogd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5kYXNoVXJsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyAtIHN0eWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1N0eWxlKHdlYmNhc3QpIHtcbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGF1dG9IaWRlQ29udHJvbHM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdC5hdWRpb09ubHkpICYmIHdlYmNhc3QuYXVkaW9Pbmx5KSB7XG4gICAgICAgICAgICBzdHlsZS5hdXRvSGlkZUNvbnRyb2xzID0gZmFsc2U7XG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5hc3BlY3RyYXRpbyA9ICcxNjo5JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2JpdGRhc2gtY29udHJvbGxlci5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHdpbmRvdykge1xuICAgIC8vIGRpcmVjdGl2ZSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAvLyAgY29udHJvbGxlcjogJ01pQml0ZGFzaENvbnRyb2xsZXInLFxuICAgICAgLy8gIGNvbnRyb2xsZXJBczogJ21pYml0ZGFzaCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsXG5cbiAgICAgICAgLy90ZW1wbGF0ZVVybDogJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgY29uZmlnOiAnPScsXG4gICAgICAgICAgICB3ZWJjYXN0OiAnPSdcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0gc2NvcGUuY29uZmlnOyAgLy8gZGllIGNvbmZpZyB3aXJkIGF1dG9tYXRpc2NoIGR1cmNoIGRlbiBjb250cm9sbGVyIGVyd2VpdGVydFxuICAgICAgICAgICAgdmFyIHBsYXllciA9ICR3aW5kb3cud2luZG93LmJpdGRhc2goJ21pLWJpdGRhc2gtcGxheWVyJyk7XG5cbiAgICAgICAgICAgIC8vIHRlY2ggc3VwcG9ydCAtIGZsYXNoIGFuZCBobHNcbiAgICAgICAgICAgIHZhciBzdXBwb3J0ZWRUZWNoID0gcGxheWVyLmdldFN1cHBvcnRlZFRlY2goKTtcbiAgICAgICAgICAgIC8vIGZvcmNlIEhMUyAvIEZsYXNoIHBsYXliYWNrIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIGhsc1RlY2ggPSBbXTtcbiAgICAgICAgICAgIHZhciBmbGFzaEZvcmNlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgY3VlcG9pbnRzU3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdXBwb3J0ZWRUZWNoLCBmdW5jdGlvbiAodGVjaCkge1xuICAgICAgICAgICAgICAgIGlmICh0ZWNoLnN0cmVhbWluZyA9PT0gJ2hscycpIHtcbiAgICAgICAgICAgICAgICAgICAgaGxzVGVjaC5wdXNoKHRlY2gucGxheWVyICsgJy4nICsgdGVjaC5zdHJlYW1pbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCdmbGFzaC5obHMnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBmbGFzaEZvcmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCduYXRpdmUuaGxzJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZmxhc2hGb3JjZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGN1ZXBvaW50c1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gVG9EbyBjaGVjayBmb3IgQW5kcm9pZCwgQW5kcm9pZCBkb2VzIG5vdCBzdXBwb3J0IEN1ZVBvaW50cyB2aWEgSFRNTDVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYXllci5pc1JlYWR5KCkgJiYgIWZsYXNoRm9yY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBmdW5rdGlvbmllcnQgZGVyemVpdCBudXIgZsO8ciBkZW4gTk9OLUZsYXNoIC4uLiBmbGFzaGllIHNlbGJzdCBmw6RsbHQgc2VociBsYXV0IGhpbiAuLi4gRHJlY2tcbiAgICAgICAgICAgICAgIC8vICRsb2cuaW5mbygnUGxheWVyIGFscmVhZHkgZXhpc3RzIC4uLiB3aWxsIGRlc3Ryb3kgZGVzdHJveSBhbmQgcmVpbml0Jyk7XG4gICAgICAgICAgICAgICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxhc2hGb3JjZSkge1xuICAgICAgICAgICAgICAgIHBsYXllci5zZXR1cChjb25maWcsICdmbGFzaC5obHMnKTsgIC8vIFRvRG8gY2hlY2sgZG9jcyBmb3IgdGhhdCBmdW5ueSBwYXJhbWV0ZXJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLCBbXSkucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLFxuICAgICAgICAnPGRpdiBpZD1cIm1pLWJpdGRhc2gtcGxheWVyXCI+PC9kaXY+J1xuICAgICk7XG59XSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==