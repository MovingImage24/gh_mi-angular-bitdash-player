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

	  .directive('bitdashPlayer', __webpack_require__(2))
	  .controller('BitdashController', __webpack_require__(1))

	;


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
	  vm.whoosah = 'hyper hyper'; // ToDo remove after implement some logical stuff ... currently only for tests

	  // copy the basic config ... key is mandatory
	  vm.config = {};
	  if (angular.isDefined($scope.config) && angular.isDefined($scope.config.key)) {
	    vm.config = $scope.config;
	  } else {
	    $log.error('basic config for bitdash player is missing!');
	  }

	  // check webcast to expand and manipulate the basic bitdash player config
	  if (angular.isDefined($scope.webcast)) {
	    vm.webcastEnv = {};
	    processWebcast($scope.webcast);
	  }

	  // player config =====================================================================================================

	  function processWebcast(webcast) {
	    vm.config.source = getPlayerConfigSource(webcast);
	    vm.config.style = getPlayerConfigStyle(webcast);
	  }

	  // player config - source --------------------------------------------------------------------------------------------

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

	  // player config - style ---------------------------------------------------------------------------------------------

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
	module.exports = function ($log, $window) {
	  return {
	    restrict: 'EA', //E = element, A = attribute, C = class, M = comment
	    replace: true,
	    //bindToController: true,
	    controller: 'BitdashController',
	    controllerAs: 'bitdashVm',
	    templateUrl: function (element, attrs) {
	      return attrs.templateUrl || 'mi/template/bitdash-player.html';
	    },
	    scope: {
	      //@ reads the attribute value, = provides two-way binding, & works with functions
	      config: '=bitdashConfig',
	      webcast: '=bitdashWebcast'
	    },
	    link: function (scope) {
	      var config = scope.bitdashVm.config;
	      var player = $window.window.bitdash('bitdash-player');

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

	      // wenn man das teil doch nur re-rendern könnte ... so muss man das teil immer zerstören :(
	      if (player.isReady()) {
	        $log.info('Player already exists ... will destroy and reinit');  // ToDo remove after debugging
	        player.destroy();
	        player = $window.window.bitdash('bitdash-player');
	      }


	      if (flashForce) {
	        player.setup(config, 'flash.hls');  // ToDo check docs for that funny parameter
	      } else {
	        player.setup(config);
	      }
	      //player.setup(config);
	    }
	  };
	};
	module.exports.$inject = ["$log", "$window"];


	angular.module('mi/template/bitdash-player.html', []).run(['$templateCache', function ($templateCache) {
	  $templateCache.put('mi/template/bitdash-player.html',
	    '<div id="bitdash-player"></div>'
	  );
	}]);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmFiYWNjNDBiZGI3ZmEwZWMzYWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDZEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQy9EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQXVFO0FBQ3ZFO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSx3QkFBMEM7QUFDMUMsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEciLCJmaWxlIjoibWktYW5ndWxhci1iaXRkYXNoLXBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYmFiYWNjNDBiZGI3ZmEwZWMzYWJcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyXG4gIC5tb2R1bGUoJ21pLkJpdGRhc2hQbGF5ZXInLCBbXG4gICAgJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnXG4gIF0pXG5cbiAgLmRpcmVjdGl2ZSgnYml0ZGFzaFBsYXllcicsIHJlcXVpcmUoJy4vYml0ZGFzaC1kaXJlY3RpdmUnKSlcbiAgLmNvbnRyb2xsZXIoJ0JpdGRhc2hDb250cm9sbGVyJywgcmVxdWlyZSgnLi9iaXRkYXNoLWNvbnRyb2xsZXInKSlcblxuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkbG9nKSB7XG4gIC8vIGNvbnRyb2xsZXJBcyAtPiBiaXRkYXNoVm1cbiAgdmFyIHZtID0gdGhpcztcbiAgdm0ud2hvb3NhaCA9ICdoeXBlciBoeXBlcic7IC8vIFRvRG8gcmVtb3ZlIGFmdGVyIGltcGxlbWVudCBzb21lIGxvZ2ljYWwgc3R1ZmYgLi4uIGN1cnJlbnRseSBvbmx5IGZvciB0ZXN0c1xuXG4gIC8vIGNvcHkgdGhlIGJhc2ljIGNvbmZpZyAuLi4ga2V5IGlzIG1hbmRhdG9yeVxuICB2bS5jb25maWcgPSB7fTtcbiAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5jb25maWcpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5jb25maWcua2V5KSkge1xuICAgIHZtLmNvbmZpZyA9ICRzY29wZS5jb25maWc7XG4gIH0gZWxzZSB7XG4gICAgJGxvZy5lcnJvcignYmFzaWMgY29uZmlnIGZvciBiaXRkYXNoIHBsYXllciBpcyBtaXNzaW5nIScpO1xuICB9XG5cbiAgLy8gY2hlY2sgd2ViY2FzdCB0byBleHBhbmQgYW5kIG1hbmlwdWxhdGUgdGhlIGJhc2ljIGJpdGRhc2ggcGxheWVyIGNvbmZpZ1xuICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLndlYmNhc3QpKSB7XG4gICAgdm0ud2ViY2FzdEVudiA9IHt9O1xuICAgIHByb2Nlc3NXZWJjYXN0KCRzY29wZS53ZWJjYXN0KTtcbiAgfVxuXG4gIC8vIHBsYXllciBjb25maWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBwcm9jZXNzV2ViY2FzdCh3ZWJjYXN0KSB7XG4gICAgdm0uY29uZmlnLnNvdXJjZSA9IGdldFBsYXllckNvbmZpZ1NvdXJjZSh3ZWJjYXN0KTtcbiAgICB2bS5jb25maWcuc3R5bGUgPSBnZXRQbGF5ZXJDb25maWdTdHlsZSh3ZWJjYXN0KTtcbiAgfVxuXG4gIC8vIHBsYXllciBjb25maWcgLSBzb3VyY2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTb3VyY2Uod2ViY2FzdCkge1xuICAgIHZhciBzdGF0ZVByb3BlcnR5ID0gd2ViY2FzdC5zdGF0ZSArICdTdGF0ZURhdGEnO1xuICAgIHJldHVybiBnZXRQbGF5ZXJDb25maWdTb3VyY2VCeVN0YXRlKHdlYmNhc3QsIHN0YXRlUHJvcGVydHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGxheWVyQ29uZmlnU291cmNlQnlTdGF0ZSh3ZWJjYXN0LCBzdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBobHM6IHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuaGxzVXJsLFxuICAgICAgZGFzaDogd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5kYXNoVXJsXG4gICAgfTtcbiAgfVxuXG4gIC8vIHBsYXllciBjb25maWcgLSBzdHlsZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBmdW5jdGlvbiBnZXRQbGF5ZXJDb25maWdTdHlsZSh3ZWJjYXN0KSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGF1dG9IaWRlQ29udHJvbHM6IHRydWVcbiAgICB9O1xuXG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHdlYmNhc3QuYXVkaW9Pbmx5KSAmJiB3ZWJjYXN0LmF1ZGlvT25seSkge1xuICAgICAgc3R5bGUuYXV0b0hpZGVDb250cm9scyA9IGZhbHNlO1xuICAgICAgc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hc3BlY3RyYXRpbyA9ICcxNjo5JztcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cblxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvYml0ZGFzaC1jb250cm9sbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkbG9nLCAkd2luZG93KSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQScsIC8vRSA9IGVsZW1lbnQsIEEgPSBhdHRyaWJ1dGUsIEMgPSBjbGFzcywgTSA9IGNvbW1lbnRcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIC8vYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICBjb250cm9sbGVyOiAnQml0ZGFzaENvbnRyb2xsZXInLFxuICAgIGNvbnRyb2xsZXJBczogJ2JpdGRhc2hWbScsXG4gICAgdGVtcGxhdGVVcmw6IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICAgICAgcmV0dXJuIGF0dHJzLnRlbXBsYXRlVXJsIHx8ICdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJztcbiAgICB9LFxuICAgIHNjb3BlOiB7XG4gICAgICAvL0AgcmVhZHMgdGhlIGF0dHJpYnV0ZSB2YWx1ZSwgPSBwcm92aWRlcyB0d28td2F5IGJpbmRpbmcsICYgd29ya3Mgd2l0aCBmdW5jdGlvbnNcbiAgICAgIGNvbmZpZzogJz1iaXRkYXNoQ29uZmlnJyxcbiAgICAgIHdlYmNhc3Q6ICc9Yml0ZGFzaFdlYmNhc3QnXG4gICAgfSxcbiAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgIHZhciBjb25maWcgPSBzY29wZS5iaXRkYXNoVm0uY29uZmlnO1xuICAgICAgdmFyIHBsYXllciA9ICR3aW5kb3cud2luZG93LmJpdGRhc2goJ2JpdGRhc2gtcGxheWVyJyk7XG5cbiAgICAgIC8vIHRlY2ggc3VwcG9ydCAtIGZsYXNoIGFuZCBobHNcbiAgICAgIHZhciBzdXBwb3J0ZWRUZWNoID0gcGxheWVyLmdldFN1cHBvcnRlZFRlY2goKTtcbiAgICAgIC8vIGZvcmNlIEhMUyAvIEZsYXNoIHBsYXliYWNrIGlmIGF2YWlsYWJsZVxuICAgICAgdmFyIGhsc1RlY2ggPSBbXTtcbiAgICAgIHZhciBmbGFzaEZvcmNlID0gZmFsc2U7XG4gICAgICB2YXIgY3VlcG9pbnRzU3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdXBwb3J0ZWRUZWNoLCBmdW5jdGlvbiAodGVjaCkge1xuICAgICAgICBpZiAodGVjaC5zdHJlYW1pbmcgPT09ICdobHMnKSB7XG4gICAgICAgICAgaGxzVGVjaC5wdXNoKHRlY2gucGxheWVyICsgJy4nICsgdGVjaC5zdHJlYW1pbmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGhsc1RlY2guaW5kZXhPZignZmxhc2guaGxzJykgIT09IC0xKSB7XG4gICAgICAgIGZsYXNoRm9yY2UgPSB0cnVlO1xuICAgICAgICBjdWVwb2ludHNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGxzVGVjaC5pbmRleE9mKCduYXRpdmUuaGxzJykgIT09IC0xKSB7XG4gICAgICAgIGZsYXNoRm9yY2UgPSBmYWxzZTtcbiAgICAgICAgY3VlcG9pbnRzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gVG9EbyBjaGVjayBmb3IgQW5kcm9pZCwgQW5kcm9pZCBkb2VzIG5vdCBzdXBwb3J0IEN1ZVBvaW50cyB2aWEgSFRNTDVcbiAgICAgIH1cblxuICAgICAgLy8gd2VubiBtYW4gZGFzIHRlaWwgZG9jaCBudXIgcmUtcmVuZGVybiBrw7ZubnRlIC4uLiBzbyBtdXNzIG1hbiBkYXMgdGVpbCBpbW1lciB6ZXJzdMO2cmVuIDooXG4gICAgICBpZiAocGxheWVyLmlzUmVhZHkoKSkge1xuICAgICAgICAkbG9nLmluZm8oJ1BsYXllciBhbHJlYWR5IGV4aXN0cyAuLi4gd2lsbCBkZXN0cm95IGFuZCByZWluaXQnKTsgIC8vIFRvRG8gcmVtb3ZlIGFmdGVyIGRlYnVnZ2luZ1xuICAgICAgICBwbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdiaXRkYXNoLXBsYXllcicpO1xuICAgICAgfVxuXG5cbiAgICAgIGlmIChmbGFzaEZvcmNlKSB7XG4gICAgICAgIHBsYXllci5zZXR1cChjb25maWcsICdmbGFzaC5obHMnKTsgIC8vIFRvRG8gY2hlY2sgZG9jcyBmb3IgdGhhdCBmdW5ueSBwYXJhbWV0ZXJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYXllci5zZXR1cChjb25maWcpO1xuICAgICAgfVxuICAgICAgLy9wbGF5ZXIuc2V0dXAoY29uZmlnKTtcbiAgICB9XG4gIH07XG59O1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJywgW10pLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsXG4gICAgJzxkaXYgaWQ9XCJiaXRkYXNoLXBsYXllclwiPjwvZGl2PidcbiAgKTtcbn1dKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==