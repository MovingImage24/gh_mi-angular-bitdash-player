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

	  }])

	  // directive /////////////////////////////////////////////////////////////////////////////////////////////////////////
	  .directive('miBitdashPlayer', ['$window', '$log', function ($window, $log) {
	    return {
	      restrict: 'EA',
	      replace: true,
	      controller: 'MiBitdashController',
	      controllerAs: 'mibitdash',
	      templateUrl: function (element, attrs) {
	        return attrs.templateUrl || 'mi/template/bitdash-player.html';
	      },
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
	          $log.info('Player already exists ... will destroy destroy and reinit');
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
	  }])

	;


	angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
	  $templateCache.put('mi/template/bitdash-player.html',
	    '<div id="mi-bitdash-player"></div>'
	  );
	}]);


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWJhMDg3ZGEwMzg3ODAxMGMyZjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLG1DQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRDO0FBQzVDLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyIsImZpbGUiOiJtaS1hbmd1bGFyLWJpdGRhc2gtcGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlYmEwODdkYTAzODc4MDEwYzJmMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXJcbiAgLm1vZHVsZSgnbWkuQml0ZGFzaFBsYXllcicsIFsnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCddKVxuXG4gIC8vIGNvbnRyb2xsZXIgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLmNvbnRyb2xsZXIoJ01pQml0ZGFzaENvbnRyb2xsZXInLCBbJyRzY29wZScsICckbG9nJywgZnVuY3Rpb24gKCRzY29wZSwgJGxvZykge1xuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAvLyBjb3B5IHRoZSBiYXNpYyBjb25maWcgLi4uIGtleSBpcyBtYW5kYXRvcnlcbiAgICB2bS5jb25maWcgPSB7fTtcbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZykgJiYgYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmNvbmZpZy5rZXkpKSB7XG4gICAgICB2bS5jb25maWcgPSAkc2NvcGUuY29uZmlnO1xuICAgIH0gZWxzZSB7XG4gICAgICAkbG9nLmVycm9yKCdiYXNpYyBjb25maWcgZm9yIGJpdGRhc2ggcGxheWVyIGlzIG1pc3NpbmchJyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgd2ViY2FzdCB0byBleHBhbmQgYW5kIG1hbmlwdWxhdGUgdGhlIGJhc2ljIGJpdGRhc2ggcGxheWVyIGNvbmZpZ1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUud2ViY2FzdCkpIHtcbiAgICAgIHByb2Nlc3NXZWJjYXN0KCRzY29wZS53ZWJjYXN0KTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1dlYmNhc3Qod2ViY2FzdCkge1xuICAgICAgdm0uY29uZmlnLnNvdXJjZSA9IGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0KTtcbiAgICAgIHZtLmNvbmZpZy5zdHlsZSA9IGdldFBsYXllckNvbmZpZ1N0eWxlKHdlYmNhc3QpO1xuICAgIH1cblxuICAgIC8vIHBsYXllciBjb25maWcgLSBzb3VyY2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2Uod2ViY2FzdCkge1xuICAgICAgdmFyIHN0YXRlUHJvcGVydHkgPSB3ZWJjYXN0LnN0YXRlICsgJ1N0YXRlRGF0YSc7XG4gICAgICBpZiAod2ViY2FzdC51c2VEVlJQbGF5YmFja0luUG9zdExpdmUgPT09IHRydWUgJiYgd2ViY2FzdC5zdGF0ZSA9PT0gJ3Bvc3RsaXZlJykge1xuICAgICAgICByZXR1cm4gZ2V0RFZSUGxheWJhY2tUb1Bvc3RMaXZlKHdlYmNhc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGVQcm9wZXJ0eSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RFZSUGxheWJhY2tUb1Bvc3RMaXZlKHdlYmNhc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhsczogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuaGxzVXJsICsgJz9EVlInLFxuICAgICAgICBkYXNoOiB3ZWJjYXN0WydsaXZlU3RhdGVEYXRhJ10ucGxheW91dC5kYXNoVXJsICsgJz9EVlInXG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhsczogd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5obHNVcmwsXG4gICAgICAgIGRhc2g6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuZGFzaFVybFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCkge1xuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBhdXRvSGlkZUNvbnRyb2xzOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdC5hdWRpb09ubHkpICYmIHdlYmNhc3QuYXVkaW9Pbmx5KSB7XG4gICAgICAgIHN0eWxlLmF1dG9IaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGUuYXNwZWN0cmF0aW8gPSAnMTY6OSc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG5cbiAgfV0pXG5cbiAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAuZGlyZWN0aXZlKCdtaUJpdGRhc2hQbGF5ZXInLCBbJyR3aW5kb3cnLCAnJGxvZycsIGZ1bmN0aW9uICgkd2luZG93LCAkbG9nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6ICdNaUJpdGRhc2hDb250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ21pYml0ZGFzaCcsXG4gICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBhdHRycy50ZW1wbGF0ZVVybCB8fCAnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCc7XG4gICAgICB9LFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29uZmlnOiAnPScsXG4gICAgICAgIHdlYmNhc3Q6ICc9J1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICB2YXIgY29uZmlnID0gc2NvcGUuY29uZmlnOyAgLy8gZGllIGNvbmZpZyB3aXJkIGF1dG9tYXRpc2NoIGR1cmNoIGRlbiBjb250cm9sbGVyIGVyd2VpdGVydFxuICAgICAgICB2YXIgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0ZGFzaCgnbWktYml0ZGFzaC1wbGF5ZXInKTtcblxuICAgICAgICAvLyB0ZWNoIHN1cHBvcnQgLSBmbGFzaCBhbmQgaGxzXG4gICAgICAgIHZhciBzdXBwb3J0ZWRUZWNoID0gcGxheWVyLmdldFN1cHBvcnRlZFRlY2goKTtcbiAgICAgICAgLy8gZm9yY2UgSExTIC8gRmxhc2ggcGxheWJhY2sgaWYgYXZhaWxhYmxlXG4gICAgICAgIHZhciBobHNUZWNoID0gW107XG4gICAgICAgIHZhciBmbGFzaEZvcmNlID0gZmFsc2U7XG4gICAgICAgIHZhciBjdWVwb2ludHNTdXBwb3J0ZWQgPSBmYWxzZTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goc3VwcG9ydGVkVGVjaCwgZnVuY3Rpb24gKHRlY2gpIHtcbiAgICAgICAgICBpZiAodGVjaC5zdHJlYW1pbmcgPT09ICdobHMnKSB7XG4gICAgICAgICAgICBobHNUZWNoLnB1c2godGVjaC5wbGF5ZXIgKyAnLicgKyB0ZWNoLnN0cmVhbWluZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCdmbGFzaC5obHMnKSAhPT0gLTEpIHtcbiAgICAgICAgICBmbGFzaEZvcmNlID0gdHJ1ZTtcbiAgICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignbmF0aXZlLmhscycpICE9PSAtMSkge1xuICAgICAgICAgIGZsYXNoRm9yY2UgPSBmYWxzZTtcbiAgICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgIC8vIFRvRG8gY2hlY2sgZm9yIEFuZHJvaWQsIEFuZHJvaWQgZG9lcyBub3Qgc3VwcG9ydCBDdWVQb2ludHMgdmlhIEhUTUw1XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxheWVyLmlzUmVhZHkoKSAmJiAhZmxhc2hGb3JjZSkge1xuICAgICAgICAgIC8vIGZ1bmt0aW9uaWVydCBkZXJ6ZWl0IG51ciBmw7xyIGRlbiBOT04tRmxhc2ggLi4uIGZsYXNoaWUgc2VsYnN0IGbDpGxsdCBzZWhyIGxhdXQgaGluIC4uLiBEcmVja1xuICAgICAgICAgICRsb2cuaW5mbygnUGxheWVyIGFscmVhZHkgZXhpc3RzIC4uLiB3aWxsIGRlc3Ryb3kgZGVzdHJveSBhbmQgcmVpbml0Jyk7XG4gICAgICAgICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZsYXNoRm9yY2UpIHtcbiAgICAgICAgICBwbGF5ZXIuc2V0dXAoY29uZmlnLCAnZmxhc2guaGxzJyk7ICAvLyBUb0RvIGNoZWNrIGRvY3MgZm9yIHRoYXQgZnVubnkgcGFyYW1ldGVyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSlcblxuO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJywgW10pLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsXG4gICAgJzxkaXYgaWQ9XCJtaS1iaXRkYXNoLXBsYXllclwiPjwvZGl2PidcbiAgKTtcbn1dKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9