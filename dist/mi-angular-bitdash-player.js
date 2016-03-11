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
	  var vm = this;
	  // controllerAs -> bitdashVm
	  vm.whoosah = 'hyper hyper'; // ToDo remove after implement some logical stuff ... currently only for tests

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTQ2Nzg2MzI3Y2Y3NTk5OGY3ZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9iaXRkYXNoLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpdGRhc2gtZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDZEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOEJBQXVFO0FBQ3ZFO0FBQ0E7QUFDQTs7QUFFd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRyIsImZpbGUiOiJtaS1hbmd1bGFyLWJpdGRhc2gtcGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NDY3ODYzMjdjZjc1OTk4ZjdmMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXJcbiAgLm1vZHVsZSgnbWkuQml0ZGFzaFBsYXllcicsIFtcbiAgICAnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCdcbiAgXSlcblxuICAuZGlyZWN0aXZlKCdiaXRkYXNoUGxheWVyJywgcmVxdWlyZSgnLi9iaXRkYXNoLWRpcmVjdGl2ZScpKVxuICAuY29udHJvbGxlcignQml0ZGFzaENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2JpdGRhc2gtY29udHJvbGxlcicpKVxuXG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBuZ0luamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkc2NvcGUsICRsb2cpIHtcbiAgdmFyIHZtID0gdGhpcztcbiAgLy8gY29udHJvbGxlckFzIC0+IGJpdGRhc2hWbVxuICB2bS53aG9vc2FoID0gJ2h5cGVyIGh5cGVyJzsgLy8gVG9EbyByZW1vdmUgYWZ0ZXIgaW1wbGVtZW50IHNvbWUgbG9naWNhbCBzdHVmZiAuLi4gY3VycmVudGx5IG9ubHkgZm9yIHRlc3RzXG5cbiAgJGxvZy5pbmZvKCdiaXRkYXNoIHBsYXllciAtIGNvbnRyb2xsZXIgXCJiaXRkYXNoVm1cIiBsb2FkZWQnKTtcbiAgJGxvZy5pbmZvKCdjb25maWc6ICcsICRzY29wZS5jb25maWcpO1xuICAkbG9nLmluZm8oJ3dlYmNhc3Q6ICcsICRzY29wZS53ZWJjYXN0KTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2JpdGRhc2gtY29udHJvbGxlci5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJGxvZywgJHdpbmRvdykge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRUEnLCAvL0UgPSBlbGVtZW50LCBBID0gYXR0cmlidXRlLCBDID0gY2xhc3MsIE0gPSBjb21tZW50XG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6ICdCaXRkYXNoQ29udHJvbGxlcicsXG4gICAgY29udHJvbGxlckFzOiAnYml0ZGFzaFZtJyxcbiAgICB0ZW1wbGF0ZVVybDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICByZXR1cm4gYXR0cnMudGVtcGxhdGVVcmwgfHwgJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnO1xuICAgIH0sXG4gICAgc2NvcGU6IHtcbiAgICAgIC8vQCByZWFkcyB0aGUgYXR0cmlidXRlIHZhbHVlLCA9IHByb3ZpZGVzIHR3by13YXkgYmluZGluZywgJiB3b3JrcyB3aXRoIGZ1bmN0aW9uc1xuICAgICAgY29uZmlnOiAnPWJpdGRhc2hDb25maWcnLFxuICAgICAgd2ViY2FzdDogJz1iaXRkYXNoV2ViY2FzdCdcbiAgICB9LFxuXG4gICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICB2YXIgY29uZmlnID0gc2NvcGUuY29uZmlnO1xuXG4gICAgICAvL2NvbmZpZy5ldmVudHMgPSB7XG4gICAgICAvLyAgb25SZWFkeTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIC8vICAgIGNvbnNvbGUubG9nKCd2ZXJzaW9uOiAnICsgdGhpcy5nZXRWZXJzaW9uKCkgKyAnLCBvblJlYWR5IEV2ZW50IGRhdGE6ICcsIGRhdGEpO1xuICAgICAgLy8gIH0sXG4gICAgICAvLyAgb25QbGF5OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgLy8gICAgLy8gZG8gYXdlc29tZSBzdHVmZlxuICAgICAgLy8gICAgY29uc29sZS5sb2coJ2hlcmUgd2UgZ28gLi4uJywgZGF0YSk7XG4gICAgICAvLyAgfSxcbiAgICAgIC8vICBvbkVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgLy8gICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQ6JywgZGF0YSk7XG4gICAgICAvLyAgfVxuICAgICAgLy99O1xuXG4gICAgICB2YXIgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0ZGFzaCgnYml0ZGFzaC1wbGF5ZXInKTtcblxuICAgICAgaWYgKHBsYXllci5pc1JlYWR5KCkpIHtcbiAgICAgICAgJGxvZy5pbmZvKCdQbGF5ZXIgYWxyZWFkeSBleGlzdHMgLi4uIHdpbGwgZGVzdHJveSBhbmQgcmVpbml0Jyk7ICAvLyBUb0RvIHJlbW92ZSBhZnRlciBkZWJ1Z2dpbmdcbiAgICAgICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgcGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0ZGFzaCgnYml0ZGFzaC1wbGF5ZXInKTtcbiAgICAgIH1cblxuICAgICAgJGxvZy5pbmZvKGNvbmZpZyk7ICAvLyBUb0RvIHJlbW92ZSBhZnRlciBkZWJ1Z2dpbmdcblxuICAgICAgcGxheWVyLnNldHVwKGNvbmZpZyk7XG4gICAgfVxuICB9O1xufTtcblxuXG5hbmd1bGFyLm1vZHVsZSgnbWkvdGVtcGxhdGUvYml0ZGFzaC1wbGF5ZXIuaHRtbCcsIFtdKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pL3RlbXBsYXRlL2JpdGRhc2gtcGxheWVyLmh0bWwnLFxuICAgICc8ZGl2IGlkPVwiYml0ZGFzaC1wbGF5ZXJcIj48L2Rpdj4nXG4gICk7XG59XSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9iaXRkYXNoLWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=