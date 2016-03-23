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
/***/ function(module, exports) {

	'use strict';

	/**
	 * @ngInject
	 */

	module.exports = angular
	  .module('mi.BitdashPlayer', ['mi/template/bitdash-player.html'])

	  // controller ////////////////////////////////////////////////////////////////////////////////////////////////////////
	  .controller('MiBitdashController', ['$scope', '$log', function ($scope, $log) {
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

	    // player config ===================================================================================================

	    function processWebcast(webcast) {
	      vm.config.source = getPlayerConfigSource(webcast);
	      vm.config.style = getPlayerConfigStyle(webcast);
	    }

	    // player config - source ------------------------------------------------------------------------------------------

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

	  }])

	  // directive /////////////////////////////////////////////////////////////////////////////////////////////////////////
	  .directive('miBitdashPlayer', ['$window', '$log', function ($window, $log) {
	    return {
	      restrict: 'EA',
	      replace: true,
	      controller: 'MiBitdashController',
	      controllerAs: 'mimimi',
	      templateUrl: function (element, attrs) {
	        return attrs.templateUrl || 'mi/template/bitdash-player.html';
	      },
	      scope: {
	        config: '=',
	        webcast: '='
	      },
	      link: function (scope) {
	        $log.info('miBitdashPlayer ... loaded');

	        var config = scope.config;  // die config wird automatisch durch den controller erweitert
	        var player = $window.window.bitdash('mi-bitdash-player');

	        // $log.warn(' player.isSetup :', player.isSetup());
	        // $log.warn(' player.isReady :', player.isReady());

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

	        if (flashForce) {
	          player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
	        } else {
	          player.setup(config);
	        }
	      }
	    };
	  }])

	;


	angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
	  $templateCache.put('mi/template/bitdash-player.html',
	    '<div id="mi-bitdash-player"></div>'
	  );
	}]);


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTYyMmM0MDM2YzgzODJjODliZmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsbUNBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRDO0FBQzVDLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyIsImZpbGUiOiJtaS1hbmd1bGFyLWJpdGRhc2gtcGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1NjIyYzQwMzZjODM4MmM4OWJmYVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXJcbiAgLm1vZHVsZSgnbWkuQml0ZGFzaFBsYXllcicsIFsnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCddKVxuXG4gIC8vIGNvbnRyb2xsZXIgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLmNvbnRyb2xsZXIoJ01pQml0ZGFzaENvbnRyb2xsZXInLCBbJyRzY29wZScsICckbG9nJywgZnVuY3Rpb24gKCRzY29wZSwgJGxvZykge1xuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAvLyBjb3B5IHRoZSBiYXNpYyBjb25maWcgLi4uIGtleSBpcyBtYW5kYXRvcnlcbiAgICB2bS5jb25maWcgPSB7fTtcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZykgJiYgYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZy5rZXkpKSB7XG4gICAgICB2bS5jb25maWcgPSAkc2NvcGUuY29uZmlnO1xuICAgIH0gZWxzZSB7XG4gICAgICAkbG9nLmVycm9yKCdiYXNpYyBjb25maWcgZm9yIGJpdGRhc2ggcGxheWVyIGlzIG1pc3NpbmchJyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgd2ViY2FzdCB0byBleHBhbmQgYW5kIG1hbmlwdWxhdGUgdGhlIGJhc2ljIGJpdGRhc2ggcGxheWVyIGNvbmZpZ1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUud2ViY2FzdCkpIHtcbiAgICAgIHByb2Nlc3NXZWJjYXN0KCRzY29wZS53ZWJjYXN0KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1dlYmNhc3Qod2ViY2FzdCkge1xuICAgICAgdm0uY29uZmlnLnNvdXJjZSA9IGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0KTtcbiAgICAgIHZtLmNvbmZpZy5zdHlsZSA9IGdldFBsYXllckNvbmZpZ1N0eWxlKHdlYmNhc3QpO1xuICAgIH1cblxuICAgIC8vIHBsYXllciBjb25maWcgLSBzb3VyY2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2Uod2ViY2FzdCkge1xuICAgICAgdmFyIHN0YXRlUHJvcGVydHkgPSB3ZWJjYXN0LnN0YXRlICsgJ1N0YXRlRGF0YSc7XG4gICAgICByZXR1cm4gZ2V0UGxheWVyQ29uZmlnU291cmNlQnlTdGF0ZSh3ZWJjYXN0LCBzdGF0ZVByb3BlcnR5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBobHM6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuaGxzVXJsLFxuICAgICAgICBkYXNoOiB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmRhc2hVcmxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyAtIHN0eWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1N0eWxlKHdlYmNhc3QpIHtcbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYXV0b0hpZGVDb250cm9sczogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHdlYmNhc3QuYXVkaW9Pbmx5KSAmJiB3ZWJjYXN0LmF1ZGlvT25seSkge1xuICAgICAgICBzdHlsZS5hdXRvSGlkZUNvbnRyb2xzID0gZmFsc2U7XG4gICAgICAgIHN0eWxlLmhlaWdodCA9ICczMHB4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlLmFzcGVjdHJhdGlvID0gJzE2OjknO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG4gIH1dKVxuXG4gIC8vIGRpcmVjdGl2ZSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLmRpcmVjdGl2ZSgnbWlCaXRkYXNoUGxheWVyJywgWyckd2luZG93JywgJyRsb2cnLCBmdW5jdGlvbiAoJHdpbmRvdywgJGxvZykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBjb250cm9sbGVyOiAnTWlCaXRkYXNoQ29udHJvbGxlcicsXG4gICAgICBjb250cm9sbGVyQXM6ICdtaW1pbWknLFxuICAgICAgdGVtcGxhdGVVcmw6IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gYXR0cnMudGVtcGxhdGVVcmwgfHwgJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnO1xuICAgICAgfSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNvbmZpZzogJz0nLFxuICAgICAgICB3ZWJjYXN0OiAnPSdcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgJGxvZy5pbmZvKCdtaUJpdGRhc2hQbGF5ZXIgLi4uIGxvYWRlZCcpO1xuXG4gICAgICAgIHZhciBjb25maWcgPSBzY29wZS5jb25maWc7ICAvLyBkaWUgY29uZmlnIHdpcmQgYXV0b21hdGlzY2ggZHVyY2ggZGVuIGNvbnRyb2xsZXIgZXJ3ZWl0ZXJ0XG4gICAgICAgIHZhciBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuXG4gICAgICAgIC8vICRsb2cud2FybignIHBsYXllci5pc1NldHVwIDonLCBwbGF5ZXIuaXNTZXR1cCgpKTtcbiAgICAgICAgLy8gJGxvZy53YXJuKCcgcGxheWVyLmlzUmVhZHkgOicsIHBsYXllci5pc1JlYWR5KCkpO1xuXG4gICAgICAgIC8vIHRlY2ggc3VwcG9ydCAtIGZsYXNoIGFuZCBobHNcbiAgICAgICAgdmFyIHN1cHBvcnRlZFRlY2ggPSBwbGF5ZXIuZ2V0U3VwcG9ydGVkVGVjaCgpO1xuICAgICAgICAvLyBmb3JjZSBITFMgLyBGbGFzaCBwbGF5YmFjayBpZiBhdmFpbGFibGVcbiAgICAgICAgdmFyIGhsc1RlY2ggPSBbXTtcbiAgICAgICAgdmFyIGZsYXNoRm9yY2UgPSBmYWxzZTtcbiAgICAgICAgdmFyIGN1ZXBvaW50c1N1cHBvcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdXBwb3J0ZWRUZWNoLCBmdW5jdGlvbiAodGVjaCkge1xuICAgICAgICAgIGlmICh0ZWNoLnN0cmVhbWluZyA9PT0gJ2hscycpIHtcbiAgICAgICAgICAgIGhsc1RlY2gucHVzaCh0ZWNoLnBsYXllciArICcuJyArIHRlY2guc3RyZWFtaW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChobHNUZWNoLmluZGV4T2YoJ2ZsYXNoLmhscycpICE9PSAtMSkge1xuICAgICAgICAgIGZsYXNoRm9yY2UgPSB0cnVlO1xuICAgICAgICAgIGN1ZXBvaW50c1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCduYXRpdmUuaGxzJykgIT09IC0xKSB7XG4gICAgICAgICAgZmxhc2hGb3JjZSA9IGZhbHNlO1xuICAgICAgICAgIGN1ZXBvaW50c1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgLy8gVG9EbyBjaGVjayBmb3IgQW5kcm9pZCwgQW5kcm9pZCBkb2VzIG5vdCBzdXBwb3J0IEN1ZVBvaW50cyB2aWEgSFRNTDVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmbGFzaEZvcmNlKSB7XG4gICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZywgJ2ZsYXNoLmhscycpOyAgLy8gVG9EbyBjaGVjayBkb2NzIGZvciB0aGF0IGZ1bm55IHBhcmFtZXRlclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBsYXllci5zZXR1cChjb25maWcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pXG5cbjtcblxuXG5hbmd1bGFyLm1vZHVsZSgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsIFtdKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLFxuICAgICc8ZGl2IGlkPVwibWktYml0ZGFzaC1wbGF5ZXJcIj48L2Rpdj4nXG4gICk7XG59XSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==