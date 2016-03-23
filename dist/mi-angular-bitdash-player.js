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
	        var config = scope.config;  // die config wird automatisch durch den controller erweitert
	        var player = $window.window.bitdash('mi-bitdash-player');

	        if (player.isReady()) {
	          $log.info('Player already exists ... will destroy destroy and reinit');
	          player.destroy();
	          player = $window.window.bitdash('mi-bitdash-player');
	        }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTllNzZkMDQ0ZGE4NGRhNTBjZjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsbUNBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEM7QUFDNUMsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDIiwiZmlsZSI6Im1pLWFuZ3VsYXItYml0ZGFzaC1wbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDU5ZTc2ZDA0NGRhODRkYTUwY2Y3XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhclxuICAubW9kdWxlKCdtaS5CaXRkYXNoUGxheWVyJywgWydtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJ10pXG5cbiAgLy8gY29udHJvbGxlciAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAuY29udHJvbGxlcignTWlCaXRkYXNoQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRsb2cnLCBmdW5jdGlvbiAoJHNjb3BlLCAkbG9nKSB7XG4gICAgdmFyIHZtID0gdGhpcztcblxuICAgIC8vIGNvcHkgdGhlIGJhc2ljIGNvbmZpZyAuLi4ga2V5IGlzIG1hbmRhdG9yeVxuICAgIHZtLmNvbmZpZyA9IHt9O1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuY29uZmlnKSAmJiBhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuY29uZmlnLmtleSkpIHtcbiAgICAgIHZtLmNvbmZpZyA9ICRzY29wZS5jb25maWc7XG4gICAgfSBlbHNlIHtcbiAgICAgICRsb2cuZXJyb3IoJ2Jhc2ljIGNvbmZpZyBmb3IgYml0ZGFzaCBwbGF5ZXIgaXMgbWlzc2luZyEnKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB3ZWJjYXN0IHRvIGV4cGFuZCBhbmQgbWFuaXB1bGF0ZSB0aGUgYmFzaWMgYml0ZGFzaCBwbGF5ZXIgY29uZmlnXG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS53ZWJjYXN0KSkge1xuICAgICAgcHJvY2Vzc1dlYmNhc3QoJHNjb3BlLndlYmNhc3QpO1xuICAgIH1cblxuICAgIC8vIHBsYXllciBjb25maWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzV2ViY2FzdCh3ZWJjYXN0KSB7XG4gICAgICB2bS5jb25maWcuc291cmNlID0gZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QpO1xuICAgICAgdm0uY29uZmlnLnN0eWxlID0gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCk7XG4gICAgfVxuXG4gICAgLy8gcGxheWVyIGNvbmZpZyAtIHNvdXJjZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0KSB7XG4gICAgICB2YXIgc3RhdGVQcm9wZXJ0eSA9IHdlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcbiAgICAgIHJldHVybiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlUHJvcGVydHkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhsczogd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5obHNVcmwsXG4gICAgICAgIGRhc2g6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuZGFzaFVybFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBwbGF5ZXIgY29uZmlnIC0gc3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU3R5bGUod2ViY2FzdCkge1xuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBhdXRvSGlkZUNvbnRyb2xzOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQod2ViY2FzdC5hdWRpb09ubHkpICYmIHdlYmNhc3QuYXVkaW9Pbmx5KSB7XG4gICAgICAgIHN0eWxlLmF1dG9IaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGUuYXNwZWN0cmF0aW8gPSAnMTY6OSc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG5cbiAgfV0pXG5cbiAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAuZGlyZWN0aXZlKCdtaUJpdGRhc2hQbGF5ZXInLCBbJyR3aW5kb3cnLCAnJGxvZycsIGZ1bmN0aW9uICgkd2luZG93LCAkbG9nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6ICdNaUJpdGRhc2hDb250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ21pbWltaScsXG4gICAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHJldHVybiBhdHRycy50ZW1wbGF0ZVVybCB8fCAnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCc7XG4gICAgICB9LFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29uZmlnOiAnPScsXG4gICAgICAgIHdlYmNhc3Q6ICc9J1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICB2YXIgY29uZmlnID0gc2NvcGUuY29uZmlnOyAgLy8gZGllIGNvbmZpZyB3aXJkIGF1dG9tYXRpc2NoIGR1cmNoIGRlbiBjb250cm9sbGVyIGVyd2VpdGVydFxuICAgICAgICB2YXIgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0ZGFzaCgnbWktYml0ZGFzaC1wbGF5ZXInKTtcblxuICAgICAgICBpZiAocGxheWVyLmlzUmVhZHkoKSkge1xuICAgICAgICAgICRsb2cuaW5mbygnUGxheWVyIGFscmVhZHkgZXhpc3RzIC4uLiB3aWxsIGRlc3Ryb3kgZGVzdHJveSBhbmQgcmVpbml0Jyk7XG4gICAgICAgICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdtaS1iaXRkYXNoLXBsYXllcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJGxvZy53YXJuKCcgcGxheWVyLmlzU2V0dXAgOicsIHBsYXllci5pc1NldHVwKCkpO1xuICAgICAgICAvLyAkbG9nLndhcm4oJyBwbGF5ZXIuaXNSZWFkeSA6JywgcGxheWVyLmlzUmVhZHkoKSk7XG5cbiAgICAgICAgLy8gdGVjaCBzdXBwb3J0IC0gZmxhc2ggYW5kIGhsc1xuICAgICAgICB2YXIgc3VwcG9ydGVkVGVjaCA9IHBsYXllci5nZXRTdXBwb3J0ZWRUZWNoKCk7XG4gICAgICAgIC8vIGZvcmNlIEhMUyAvIEZsYXNoIHBsYXliYWNrIGlmIGF2YWlsYWJsZVxuICAgICAgICB2YXIgaGxzVGVjaCA9IFtdO1xuICAgICAgICB2YXIgZmxhc2hGb3JjZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY3VlcG9pbnRzU3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHN1cHBvcnRlZFRlY2gsIGZ1bmN0aW9uICh0ZWNoKSB7XG4gICAgICAgICAgaWYgKHRlY2guc3RyZWFtaW5nID09PSAnaGxzJykge1xuICAgICAgICAgICAgaGxzVGVjaC5wdXNoKHRlY2gucGxheWVyICsgJy4nICsgdGVjaC5zdHJlYW1pbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignZmxhc2guaGxzJykgIT09IC0xKSB7XG4gICAgICAgICAgZmxhc2hGb3JjZSA9IHRydWU7XG4gICAgICAgICAgY3VlcG9pbnRzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChobHNUZWNoLmluZGV4T2YoJ25hdGl2ZS5obHMnKSAhPT0gLTEpIHtcbiAgICAgICAgICBmbGFzaEZvcmNlID0gZmFsc2U7XG4gICAgICAgICAgY3VlcG9pbnRzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAvLyBUb0RvIGNoZWNrIGZvciBBbmRyb2lkLCBBbmRyb2lkIGRvZXMgbm90IHN1cHBvcnQgQ3VlUG9pbnRzIHZpYSBIVE1MNVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZsYXNoRm9yY2UpIHtcbiAgICAgICAgICBwbGF5ZXIuc2V0dXAoY29uZmlnLCAnZmxhc2guaGxzJyk7ICAvLyBUb0RvIGNoZWNrIGRvY3MgZm9yIHRoYXQgZnVubnkgcGFyYW1ldGVyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSlcblxuO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJywgW10pLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsXG4gICAgJzxkaXYgaWQ9XCJtaS1iaXRkYXNoLXBsYXllclwiPjwvZGl2PidcbiAgKTtcbn1dKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9