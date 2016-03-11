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
	  //var vm = this;
	  // controllerAs -> bitdashVm
	  $log.info('bitdash player - controller "bitdashVm" loaded');
	  $log.info('config: ', $scope.config);
	  $log.info('webcast: ', $scope.webcast);
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
	    bindToController: true,
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
	      var config = scope.config;

	      //config.events = {
	      //  onReady: function (data) {
	      //    console.log('version: ' + this.getVersion() + ', onReady Event data: ', data);
	      //  },
	      //  onPlay: function (data) {
	      //    // do awesome stuff
	      //    console.log('here we go ...', data);
	      //  },
	      //  onError: function (data) {
	      //    console.error('An error occurred:', data);
	      //  }
	      //};

	      var player = $window.window.bitdash('bitdash-player');

	      if (player.isReady()) {
	        $log.info('Player already exists ... will destroy and reinit');  // ToDo remove after debugging
	        player.destroy();
	        player = $window.window.bitdash('bitdash-player');
	      }

	      $log.info(config);  // ToDo remove after debugging

	      player.setup(config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNiYmEwOGQ5ZTMzMTAzYmUyNGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDZEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhCQUF1RTtBQUN2RTtBQUNBO0FBQ0E7O0FBRXdCOztBQUV4QjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEciLCJmaWxlIjoibWktYW5ndWxhci1iaXRkYXNoLXBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDNiYmEwOGQ5ZTMzMTAzYmUyNGJcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nSW5qZWN0XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyXG4gIC5tb2R1bGUoJ21pLkJpdGRhc2hQbGF5ZXInLCBbXG4gICAgJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnXG4gIF0pXG5cbiAgLmRpcmVjdGl2ZSgnYml0ZGFzaFBsYXllcicsIHJlcXVpcmUoJy4vYml0ZGFzaC1kaXJlY3RpdmUnKSlcbiAgLmNvbnRyb2xsZXIoJ0JpdGRhc2hDb250cm9sbGVyJywgcmVxdWlyZSgnLi9iaXRkYXNoLWNvbnRyb2xsZXInKSlcblxuO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHNjb3BlLCAkbG9nKSB7XG4gIC8vdmFyIHZtID0gdGhpcztcbiAgLy8gY29udHJvbGxlckFzIC0+IGJpdGRhc2hWbVxuICAkbG9nLmluZm8oJ2JpdGRhc2ggcGxheWVyIC0gY29udHJvbGxlciBcImJpdGRhc2hWbVwiIGxvYWRlZCcpO1xuICAkbG9nLmluZm8oJ2NvbmZpZzogJywgJHNjb3BlLmNvbmZpZyk7XG4gICRsb2cuaW5mbygnd2ViY2FzdDogJywgJHNjb3BlLndlYmNhc3QpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvYml0ZGFzaC1jb250cm9sbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkbG9nLCAkd2luZG93KSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFQScsIC8vRSA9IGVsZW1lbnQsIEEgPSBhdHRyaWJ1dGUsIEMgPSBjbGFzcywgTSA9IGNvbW1lbnRcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgY29udHJvbGxlcjogJ0JpdGRhc2hDb250cm9sbGVyJyxcbiAgICBjb250cm9sbGVyQXM6ICdiaXRkYXNoVm0nLFxuICAgIHRlbXBsYXRlVXJsOiBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgIHJldHVybiBhdHRycy50ZW1wbGF0ZVVybCB8fCAnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCc7XG4gICAgfSxcbiAgICBzY29wZToge1xuICAgICAgLy9AIHJlYWRzIHRoZSBhdHRyaWJ1dGUgdmFsdWUsID0gcHJvdmlkZXMgdHdvLXdheSBiaW5kaW5nLCAmIHdvcmtzIHdpdGggZnVuY3Rpb25zXG4gICAgICBjb25maWc6ICc9Yml0ZGFzaENvbmZpZycsXG4gICAgICB3ZWJjYXN0OiAnPWJpdGRhc2hXZWJjYXN0J1xuICAgIH0sXG5cbiAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgIHZhciBjb25maWcgPSBzY29wZS5jb25maWc7XG5cbiAgICAgIC8vY29uZmlnLmV2ZW50cyA9IHtcbiAgICAgIC8vICBvblJlYWR5OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgLy8gICAgY29uc29sZS5sb2coJ3ZlcnNpb246ICcgKyB0aGlzLmdldFZlcnNpb24oKSArICcsIG9uUmVhZHkgRXZlbnQgZGF0YTogJywgZGF0YSk7XG4gICAgICAvLyAgfSxcbiAgICAgIC8vICBvblBsYXk6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAvLyAgICAvLyBkbyBhd2Vzb21lIHN0dWZmXG4gICAgICAvLyAgICBjb25zb2xlLmxvZygnaGVyZSB3ZSBnbyAuLi4nLCBkYXRhKTtcbiAgICAgIC8vICB9LFxuICAgICAgLy8gIG9uRXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAvLyAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZDonLCBkYXRhKTtcbiAgICAgIC8vICB9XG4gICAgICAvL307XG5cbiAgICAgIHZhciBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdiaXRkYXNoLXBsYXllcicpO1xuXG4gICAgICBpZiAocGxheWVyLmlzUmVhZHkoKSkge1xuICAgICAgICAkbG9nLmluZm8oJ1BsYXllciBhbHJlYWR5IGV4aXN0cyAuLi4gd2lsbCBkZXN0cm95IGFuZCByZWluaXQnKTsgIC8vIFRvRG8gcmVtb3ZlIGFmdGVyIGRlYnVnZ2luZ1xuICAgICAgICBwbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICBwbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRkYXNoKCdiaXRkYXNoLXBsYXllcicpO1xuICAgICAgfVxuXG4gICAgICAkbG9nLmluZm8oY29uZmlnKTsgIC8vIFRvRG8gcmVtb3ZlIGFmdGVyIGRlYnVnZ2luZ1xuXG4gICAgICBwbGF5ZXIuc2V0dXAoY29uZmlnKTtcbiAgICB9XG4gIH07XG59O1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdtaS90ZW1wbGF0ZS9iaXRkYXNoLXBsYXllci5odG1sJywgW10pLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsXG4gICAgJzxkaXYgaWQ9XCJiaXRkYXNoLXBsYXllclwiPjwvZGl2PidcbiAgKTtcbn1dKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==