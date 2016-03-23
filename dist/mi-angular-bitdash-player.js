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

	module.exports = angular
	  .module('mi.BitdashPlayer', [
	    'mi/template/bitdash-player.html'
	  ])

	  .directive('bitdashPlayer', __webpack_require__(1))
	  //.controller('BitdashController', require('./bitdash-controller'))

	;


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @ngInject
	 */
	module.exports = function ($log, $window) {
	  return {
	    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
	    replace: true,
	    //controller: 'BitdashController',
	    //controllerAs: 'bitdashVm',
	    templateUrl: function (element, attrs) {
	      return attrs.templateUrl || 'mi/template/bitdash-player.html';
	    },
	    scope: {
	      //@ reads the attribute value, = provides two-way binding, & works with functions
	      config: '=',
	      webcast: '='
	    },
	    link: function (scope) {

	      // copy the basic config ... key is mandatory
	      var config = {};
	      if (angular.isDefined(scope.config) && angular.isDefined(scope.config.key)) {
	        config = scope.config;
	      } else {
	        $log.error('basic config for bitdash player is missing!');
	      }

	      // check webcast to expand and manipulate the basic bitdash player config
	      if (angular.isDefined(scope.webcast)) {
	        processWebcast(scope.webcast);
	      }

	      // player config =================================================================================================

	      function processWebcast(webcast) {
	        config.source = getPlayerConfigSource(webcast);
	        config.style = getPlayerConfigStyle(webcast);
	      }

	      // player config - source ----------------------------------------------------------------------------------------

	      function getPlayerConfigSource(webcast) {
	        var stateProperty = webcast.state + 'StateData';
	        return getPlayerConfigSourceByState(webcast, stateProperty);
	      }

	      function getPlayerConfigSourceByState(webcast, state) {
	        return {
	          hls: webcast[state].playout.hlsUrl,
	          dash: webcast[state].playout.dashUrl
	        };
	      }

	      // player config - style -----------------------------------------------------------------------------------------

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

	      // END OF CONTROLLER STUFF


	      var internalCounter = 0;
	      $log.warn('hit the bitdash directive - link');
	      $log.warn('bitdash directive - C: ', internalCounter++);

	      //var config = scope.bitdashVm.config;
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

	      $log.info('before player.isReady: ', player);
	      //$log.info('try player.isReady: ', player.isReady());
	      // wenn man das teil doch nur re-rendern könnte ... so muss man das teil immer zerstören :(
	      //if (player.isReady()) {
	      $log.warn('bitdash directive - C: ', internalCounter++);
	      $log.info('Player already exists ... will destroy and reinit');  // ToDo remove after debugging
	      player.destroy();
	      player = $window.window.bitdash('mi-bitdash-player');
	      //}
	      $log.info('after player.isReady');

	      $log.warn('before player.setup - C: ', internalCounter++);
	      if (flashForce) {
	        $log.warn('flashForce - C: ', internalCounter++);
	        player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
	      } else {
	        player.setup(config);
	      }
	      $log.warn('after player.setup - C: ', internalCounter++);
	    }
	  };
	};
	module.exports.$inject = ["$log", "$window"];


	angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
	  $templateCache.put('mi/template/bitdash-player.html',
	    '<div id="mi-bitdash-player"></div>'
	  );
	}]);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjY2MjQxZjFlNWMxOTJlNDc0NDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQ2RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEM7QUFDMUMsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEciLCJmaWxlIjoibWktYW5ndWxhci1iaXRkYXNoLXBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjY2MjQxZjFlNWMxOTJlNDc0NDJcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyXG4gIC5tb2R1bGUoJ21pLkJpdGRhc2hQbGF5ZXInLCBbXG4gICAgJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnXG4gIF0pXG5cbiAgLmRpcmVjdGl2ZSgnYml0ZGFzaFBsYXllcicsIHJlcXVpcmUoJy4vYml0ZGFzaC1kaXJlY3RpdmUnKSlcbiAgLy8uY29udHJvbGxlcignQml0ZGFzaENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2JpdGRhc2gtY29udHJvbGxlcicpKVxuXG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkbG9nLCAkd2luZG93KSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQScsIC8vRSA9IGVsZW1lbnQsIEEgPSBhdHRyaWJ1dGUsIEMgPSBjbGFzcywgTSA9IGNvbW1lbnRcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIC8vY29udHJvbGxlcjogJ0JpdGRhc2hDb250cm9sbGVyJyxcbiAgICAvL2NvbnRyb2xsZXJBczogJ2JpdGRhc2hWbScsXG4gICAgdGVtcGxhdGVVcmw6IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICAgICAgcmV0dXJuIGF0dHJzLnRlbXBsYXRlVXJsIHx8ICdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJztcbiAgICB9LFxuICAgIHNjb3BlOiB7XG4gICAgICAvL0AgcmVhZHMgdGhlIGF0dHJpYnV0ZSB2YWx1ZSwgPSBwcm92aWRlcyB0d28td2F5IGJpbmRpbmcsICYgd29ya3Mgd2l0aCBmdW5jdGlvbnNcbiAgICAgIGNvbmZpZzogJz0nLFxuICAgICAgd2ViY2FzdDogJz0nXG4gICAgfSxcbiAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcblxuICAgICAgLy8gY29weSB0aGUgYmFzaWMgY29uZmlnIC4uLiBrZXkgaXMgbWFuZGF0b3J5XG4gICAgICB2YXIgY29uZmlnID0ge307XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc2NvcGUuY29uZmlnKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChzY29wZS5jb25maWcua2V5KSkge1xuICAgICAgICBjb25maWcgPSBzY29wZS5jb25maWc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbG9nLmVycm9yKCdiYXNpYyBjb25maWcgZm9yIGJpdGRhc2ggcGxheWVyIGlzIG1pc3NpbmchJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIHdlYmNhc3QgdG8gZXhwYW5kIGFuZCBtYW5pcHVsYXRlIHRoZSBiYXNpYyBiaXRkYXNoIHBsYXllciBjb25maWdcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChzY29wZS53ZWJjYXN0KSkge1xuICAgICAgICBwcm9jZXNzV2ViY2FzdChzY29wZS53ZWJjYXN0KTtcbiAgICAgIH1cblxuICAgICAgLy8gcGxheWVyIGNvbmZpZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgIGZ1bmN0aW9uIHByb2Nlc3NXZWJjYXN0KHdlYmNhc3QpIHtcbiAgICAgICAgY29uZmlnLnNvdXJjZSA9IGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0KTtcbiAgICAgICAgY29uZmlnLnN0eWxlID0gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHBsYXllciBjb25maWcgLSBzb3VyY2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2Uod2ViY2FzdCkge1xuICAgICAgICB2YXIgc3RhdGVQcm9wZXJ0eSA9IHdlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcbiAgICAgICAgcmV0dXJuIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGVQcm9wZXJ0eSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBobHM6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuaGxzVXJsLFxuICAgICAgICAgIGRhc2g6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuZGFzaFVybFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCkge1xuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICBhdXRvSGlkZUNvbnRyb2xzOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHdlYmNhc3QuYXVkaW9Pbmx5KSAmJiB3ZWJjYXN0LmF1ZGlvT25seSkge1xuICAgICAgICAgIHN0eWxlLmF1dG9IaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgICBzdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUuYXNwZWN0cmF0aW8gPSAnMTY6OSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9XG5cbiAgICAgIC8vIEVORCBPRiBDT05UUk9MTEVSIFNUVUZGXG5cblxuICAgICAgdmFyIGludGVybmFsQ291bnRlciA9IDA7XG4gICAgICAkbG9nLndhcm4oJ2hpdCB0aGUgYml0ZGFzaCBkaXJlY3RpdmUgLSBsaW5rJyk7XG4gICAgICAkbG9nLndhcm4oJ2JpdGRhc2ggZGlyZWN0aXZlIC0gQzogJywgaW50ZXJuYWxDb3VudGVyKyspO1xuXG4gICAgICAvL3ZhciBjb25maWcgPSBzY29wZS5iaXRkYXNoVm0uY29uZmlnO1xuICAgICAgdmFyIHBsYXllciA9ICR3aW5kb3cud2luZG93LmJpdGRhc2goJ21pLWJpdGRhc2gtcGxheWVyJyk7XG5cbiAgICAgIC8vIHRlY2ggc3VwcG9ydCAtIGZsYXNoIGFuZCBobHNcbiAgICAgIHZhciBzdXBwb3J0ZWRUZWNoID0gcGxheWVyLmdldFN1cHBvcnRlZFRlY2goKTtcbiAgICAgIC8vIGZvcmNlIEhMUyAvIEZsYXNoIHBsYXliYWNrIGlmIGF2YWlsYWJsZVxuICAgICAgdmFyIGhsc1RlY2ggPSBbXTtcbiAgICAgIHZhciBmbGFzaEZvcmNlID0gZmFsc2U7XG4gICAgICB2YXIgY3VlcG9pbnRzU3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdXBwb3J0ZWRUZWNoLCBmdW5jdGlvbiAodGVjaCkge1xuICAgICAgICBpZiAodGVjaC5zdHJlYW1pbmcgPT09ICdobHMnKSB7XG4gICAgICAgICAgaGxzVGVjaC5wdXNoKHRlY2gucGxheWVyICsgJy4nICsgdGVjaC5zdHJlYW1pbmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignZmxhc2guaGxzJykgIT09IC0xKSB7XG4gICAgICAgIGZsYXNoRm9yY2UgPSB0cnVlO1xuICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCduYXRpdmUuaGxzJykgIT09IC0xKSB7XG4gICAgICAgIGZsYXNoRm9yY2UgPSBmYWxzZTtcbiAgICAgICAgY3VlcG9pbnRzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gVG9EbyBjaGVjayBmb3IgQW5kcm9pZCwgQW5kcm9pZCBkb2VzIG5vdCBzdXBwb3J0IEN1ZVBvaW50cyB2aWEgSFRNTDVcbiAgICAgIH1cblxuICAgICAgJGxvZy5pbmZvKCdiZWZvcmUgcGxheWVyLmlzUmVhZHk6ICcsIHBsYXllcik7XG4gICAgICAvLyRsb2cuaW5mbygndHJ5IHBsYXllci5pc1JlYWR5OiAnLCBwbGF5ZXIuaXNSZWFkeSgpKTtcbiAgICAgIC8vIHdlbm4gbWFuIGRhcyB0ZWlsIGRvY2ggbnVyIHJlLXJlbmRlcm4ga8O2bm50ZSAuLi4gc28gbXVzcyBtYW4gZGFzIHRlaWwgaW1tZXIgemVyc3TDtnJlbiA6KFxuICAgICAgLy9pZiAocGxheWVyLmlzUmVhZHkoKSkge1xuICAgICAgJGxvZy53YXJuKCdiaXRkYXNoIGRpcmVjdGl2ZSAtIEM6ICcsIGludGVybmFsQ291bnRlcisrKTtcbiAgICAgICRsb2cuaW5mbygnUGxheWVyIGFscmVhZHkgZXhpc3RzIC4uLiB3aWxsIGRlc3Ryb3kgYW5kIHJlaW5pdCcpOyAgLy8gVG9EbyByZW1vdmUgYWZ0ZXIgZGVidWdnaW5nXG4gICAgICBwbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0ZGFzaCgnbWktYml0ZGFzaC1wbGF5ZXInKTtcbiAgICAgIC8vfVxuICAgICAgJGxvZy5pbmZvKCdhZnRlciBwbGF5ZXIuaXNSZWFkeScpO1xuXG4gICAgICAkbG9nLndhcm4oJ2JlZm9yZSBwbGF5ZXIuc2V0dXAgLSBDOiAnLCBpbnRlcm5hbENvdW50ZXIrKyk7XG4gICAgICBpZiAoZmxhc2hGb3JjZSkge1xuICAgICAgICAkbG9nLndhcm4oJ2ZsYXNoRm9yY2UgLSBDOiAnLCBpbnRlcm5hbENvdW50ZXIrKyk7XG4gICAgICAgIHBsYXllci5zZXR1cChjb25maWcsICdmbGFzaC5obHMnKTsgIC8vIFRvRG8gY2hlY2sgZG9jcyBmb3IgdGhhdCBmdW5ueSBwYXJhbWV0ZXJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYXllci5zZXR1cChjb25maWcpO1xuICAgICAgfVxuICAgICAgJGxvZy53YXJuKCdhZnRlciBwbGF5ZXIuc2V0dXAgLSBDOiAnLCBpbnRlcm5hbENvdW50ZXIrKyk7XG4gICAgfVxuICB9O1xufTtcblxuXG5hbmd1bGFyLm1vZHVsZSgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsIFtdKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLFxuICAgICc8ZGl2IGlkPVwibWktYml0ZGFzaC1wbGF5ZXJcIj48L2Rpdj4nXG4gICk7XG59XSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9iaXRkYXNoLWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=