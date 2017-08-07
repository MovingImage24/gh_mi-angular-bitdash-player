/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(1);
/**
 * A container component that can contain a collection of child components.
 * Components can be added at construction time through the {@link ContainerConfig#components} setting, or later
 * through the {@link Container#addComponent} method. The UIManager automatically takes care of all components, i.e. it
 * initializes and configures them automatically.
 *
 * In the DOM, the container consists of an outer <div> (that can be configured by the config) and an inner wrapper
 * <div> that contains the components. This double-<div>-structure is often required to achieve many advanced effects
 * in CSS and/or JS, e.g. animations and certain formatting with absolute positioning.
 *
 * DOM example:
 * <code>
 *     <div class='ui-container'>
 *         <div class='container-wrapper'>
 *             ... child components ...
 *         </div>
 *     </div>
 * </code>
 */
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(config) {
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-container',
            components: []
        }, _this.config);
        return _this;
    }
    /**
     * Adds a child component to the container.
     * @param component the component to add
     */
    Container.prototype.addComponent = function (component) {
        this.config.components.push(component);
    };
    /**
     * Removes a child component from the container.
     * @param component the component to remove
     * @returns {boolean} true if the component has been removed, false if it is not contained in this container
     */
    Container.prototype.removeComponent = function (component) {
        return utils_1.ArrayUtils.remove(this.config.components, component) != null;
    };
    /**
     * Gets an array of all child components in this container.
     * @returns {Component<ComponentConfig>[]}
     */
    Container.prototype.getComponents = function () {
        return this.config.components;
    };
    /**
     * Removes all child components from the container.
     */
    Container.prototype.removeComponents = function () {
        for (var _i = 0, _a = this.getComponents(); _i < _a.length; _i++) {
            var component = _a[_i];
            this.removeComponent(component);
        }
    };
    /**
     * Updates the DOM of the container with the current components.
     */
    Container.prototype.updateComponents = function () {
        this.innerContainerElement.empty();
        for (var _i = 0, _a = this.config.components; _i < _a.length; _i++) {
            var component = _a[_i];
            this.innerContainerElement.append(component.getDomElement());
        }
    };
    Container.prototype.toDomElement = function () {
        // Create the container element (the outer <div>)
        var containerElement = new dom_1.DOM(this.config.tag, {
            'id': this.config.id,
            'class': this.getCssClasses()
        });
        // Create the inner container element (the inner <div>) that will contain the components
        var innerContainer = new dom_1.DOM(this.config.tag, {
            'class': this.prefixCss('container-wrapper')
        });
        this.innerContainerElement = innerContainer;
        this.updateComponents();
        containerElement.append(innerContainer);
        return containerElement;
    };
    return Container;
}(component_1.Component));
exports.Container = Container;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var eventdispatcher_1 = __webpack_require__(6);
var container_1 = __webpack_require__(0);
var ArrayUtils;
(function (ArrayUtils) {
    /**
     * Removes an item from an array.
     * @param array the array that may contain the item to remove
     * @param item the item to remove from the array
     * @returns {any} the removed item or null if it wasn't part of the array
     */
    function remove(array, item) {
        var index = array.indexOf(item);
        if (index > -1) {
            return array.splice(index, 1)[0];
        }
        else {
            return null;
        }
    }
    ArrayUtils.remove = remove;
})(ArrayUtils = exports.ArrayUtils || (exports.ArrayUtils = {}));
var StringUtils;
(function (StringUtils) {
    StringUtils.FORMAT_HHMMSS = 'hh:mm:ss';
    StringUtils.FORMAT_MMSS = 'mm:ss';
    /**
     * Formats a number of seconds into a time string with the pattern hh:mm:ss.
     *
     * @param totalSeconds the total number of seconds to format to string
     * @param format the time format to output (default: hh:mm:ss)
     * @returns {string} the formatted time string
     */
    function secondsToTime(totalSeconds, format) {
        if (format === void 0) { format = StringUtils.FORMAT_HHMMSS; }
        var isNegative = totalSeconds < 0;
        if (isNegative) {
            // If the time is negative, we make it positive for the calculation below
            // (else we'd get all negative numbers) and reattach the negative sign later.
            totalSeconds = -totalSeconds;
        }
        // Split into separate time parts
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor(totalSeconds / 60) - hours * 60;
        var seconds = Math.floor(totalSeconds) % 60;
        return (isNegative ? '-' : '') + format
            .replace('hh', leftPadWithZeros(hours, 2))
            .replace('mm', leftPadWithZeros(minutes, 2))
            .replace('ss', leftPadWithZeros(seconds, 2));
    }
    StringUtils.secondsToTime = secondsToTime;
    /**
     * Converts a number to a string and left-pads it with zeros to the specified length.
     * Example: leftPadWithZeros(123, 5) => '00123'
     *
     * @param num the number to convert to string and pad with zeros
     * @param length the desired length of the padded string
     * @returns {string} the padded number as string
     */
    function leftPadWithZeros(num, length) {
        var text = num + '';
        var padding = '0000000000'.substr(0, length - text.length);
        return padding + text;
    }
    /**
     * Fills out placeholders in an ad message.
     *
     * Has the placeholders '{remainingTime[formatString]}', '{playedTime[formatString]}' and
     * '{adDuration[formatString]}', which are replaced by the remaining time until the ad can be skipped, the current
     * time or the ad duration. The format string is optional. If not specified, the placeholder is replaced by the time
     * in seconds. If specified, it must be of the following format:
     * - %d - Inserts the time as an integer.
     * - %0Nd - Inserts the time as an integer with leading zeroes, if the length of the time string is smaller than N.
     * - %f - Inserts the time as a float.
     * - %0Nf - Inserts the time as a float with leading zeroes.
     * - %.Mf - Inserts the time as a float with M decimal places. Can be combined with %0Nf, e.g. %04.2f (the time
     * 10.123
     * would be printed as 0010.12).
     * - %hh:mm:ss
     * - %mm:ss
     *
     * @param adMessage an ad message with optional placeholders to fill
     * @param skipOffset if specified, {remainingTime} will be filled with the remaining time until the ad can be skipped
     * @param player the player to get the time data from
     * @returns {string} the ad message with filled placeholders
     */
    function replaceAdMessagePlaceholders(adMessage, skipOffset, player) {
        var adMessagePlaceholderRegex = new RegExp('\\{(remainingTime|playedTime|adDuration)(}|%((0[1-9]\\d*(\\.\\d+(d|f)|d|f)|\\.\\d+f|d|f)|hh:mm:ss|mm:ss)})', 'g');
        return adMessage.replace(adMessagePlaceholderRegex, function (formatString) {
            var time = 0;
            if (formatString.indexOf('remainingTime') > -1) {
                if (skipOffset) {
                    time = Math.ceil(skipOffset - player.getCurrentTime());
                }
                else {
                    time = player.getDuration() - player.getCurrentTime();
                }
            }
            else if (formatString.indexOf('playedTime') > -1) {
                time = player.getCurrentTime();
            }
            else if (formatString.indexOf('adDuration') > -1) {
                time = player.getDuration();
            }
            return formatNumber(time, formatString);
        });
    }
    StringUtils.replaceAdMessagePlaceholders = replaceAdMessagePlaceholders;
    function formatNumber(time, format) {
        var formatStringValidationRegex = /%((0[1-9]\d*(\.\d+(d|f)|d|f)|\.\d+f|d|f)|hh:mm:ss|mm:ss)/;
        var leadingZeroesRegex = /(%0[1-9]\d*)(?=(\.\d+f|f|d))/;
        var decimalPlacesRegex = /\.\d*(?=f)/;
        if (!formatStringValidationRegex.test(format)) {
            // If the format is invalid, we set a default fallback format
            format = '%d';
        }
        // Determine the number of leading zeros
        var leadingZeroes = 0;
        var leadingZeroesMatches = format.match(leadingZeroesRegex);
        if (leadingZeroesMatches) {
            leadingZeroes = parseInt(leadingZeroesMatches[0].substring(2));
        }
        // Determine the number of decimal places
        var numDecimalPlaces = null;
        var decimalPlacesMatches = format.match(decimalPlacesRegex);
        if (decimalPlacesMatches && !isNaN(parseInt(decimalPlacesMatches[0].substring(1)))) {
            numDecimalPlaces = parseInt(decimalPlacesMatches[0].substring(1));
            if (numDecimalPlaces > 20) {
                numDecimalPlaces = 20;
            }
        }
        // Float format
        if (format.indexOf('f') > -1) {
            var timeString = '';
            if (numDecimalPlaces !== null) {
                // Apply fixed number of decimal places
                timeString = time.toFixed(numDecimalPlaces);
            }
            else {
                timeString = '' + time;
            }
            // Apply leading zeros
            if (timeString.indexOf('.') > -1) {
                return leftPadWithZeros(timeString, timeString.length + (leadingZeroes - timeString.indexOf('.')));
            }
            else {
                return leftPadWithZeros(timeString, leadingZeroes);
            }
        }
        else if (format.indexOf(':') > -1) {
            var totalSeconds = Math.ceil(time);
            // hh:mm:ss format
            if (format.indexOf('hh') > -1) {
                return secondsToTime(totalSeconds);
            }
            else {
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds % 60;
                return leftPadWithZeros(minutes, 2) + ':' + leftPadWithZeros(seconds, 2);
            }
        }
        else {
            return leftPadWithZeros(Math.ceil(time), leadingZeroes);
        }
    }
})(StringUtils = exports.StringUtils || (exports.StringUtils = {}));
var PlayerUtils;
(function (PlayerUtils) {
    var PlayerState;
    (function (PlayerState) {
        PlayerState[PlayerState["IDLE"] = 0] = "IDLE";
        PlayerState[PlayerState["PREPARED"] = 1] = "PREPARED";
        PlayerState[PlayerState["PLAYING"] = 2] = "PLAYING";
        PlayerState[PlayerState["PAUSED"] = 3] = "PAUSED";
        PlayerState[PlayerState["FINISHED"] = 4] = "FINISHED";
    })(PlayerState = PlayerUtils.PlayerState || (PlayerUtils.PlayerState = {}));
    function isSourceLoaded(player) {
        return player.getConfig().source !== undefined;
    }
    PlayerUtils.isSourceLoaded = isSourceLoaded;
    function isTimeShiftAvailable(player) {
        return player.isLive() && player.getMaxTimeShift() !== 0;
    }
    PlayerUtils.isTimeShiftAvailable = isTimeShiftAvailable;
    function getState(player) {
        if (player.hasEnded()) {
            return PlayerState.FINISHED;
        }
        else if (player.isPlaying()) {
            return PlayerState.PLAYING;
        }
        else if (player.isPaused()) {
            return PlayerState.PAUSED;
        }
        else if (isSourceLoaded(player)) {
            return PlayerState.PREPARED;
        }
        else {
            return PlayerState.IDLE;
        }
    }
    PlayerUtils.getState = getState;
    var TimeShiftAvailabilityDetector = (function () {
        function TimeShiftAvailabilityDetector(player) {
            var _this = this;
            this.timeShiftAvailabilityChangedEvent = new eventdispatcher_1.EventDispatcher();
            this.player = player;
            this.timeShiftAvailable = undefined;
            var timeShiftDetector = function () {
                _this.detect();
            };
            // Try to detect timeshift availability in ON_READY, which works for DASH streams
            player.addEventHandler(player.EVENT.ON_READY, timeShiftDetector);
            // With HLS/NativePlayer streams, getMaxTimeShift can be 0 before the buffer fills, so we need to additionally
            // check timeshift availability in ON_TIME_CHANGED
            player.addEventHandler(player.EVENT.ON_TIME_CHANGED, timeShiftDetector);
        }
        TimeShiftAvailabilityDetector.prototype.detect = function () {
            if (this.player.isLive()) {
                var timeShiftAvailableNow = PlayerUtils.isTimeShiftAvailable(this.player);
                // When the availability changes, we fire the event
                if (timeShiftAvailableNow !== this.timeShiftAvailable) {
                    this.timeShiftAvailabilityChangedEvent.dispatch(this.player, { timeShiftAvailable: timeShiftAvailableNow });
                    this.timeShiftAvailable = timeShiftAvailableNow;
                }
            }
        };
        Object.defineProperty(TimeShiftAvailabilityDetector.prototype, "onTimeShiftAvailabilityChanged", {
            get: function () {
                return this.timeShiftAvailabilityChangedEvent.getEvent();
            },
            enumerable: true,
            configurable: true
        });
        return TimeShiftAvailabilityDetector;
    }());
    PlayerUtils.TimeShiftAvailabilityDetector = TimeShiftAvailabilityDetector;
    /**
     * Detects changes of the stream type, i.e. changes of the return value of the player#isLive method.
     * Normally, a stream cannot change its type during playback, it's either VOD or live. Due to bugs on some
     * platforms or browsers, it can still change. It is therefore unreliable to just check #isLive and this detector
     * should be used as a workaround instead.
     *
     * Known cases:
     *
     * - HLS VOD on Android 4.3
     * Video duration is initially 'Infinity' and only gets available after playback starts, so streams are wrongly
     * reported as 'live' before playback (the live-check in the player checks for infinite duration).
     */
    var LiveStreamDetector = (function () {
        function LiveStreamDetector(player) {
            var _this = this;
            this.liveChangedEvent = new eventdispatcher_1.EventDispatcher();
            this.player = player;
            this.live = undefined;
            var liveDetector = function () {
                _this.detect();
            };
            // Initialize when player is ready
            player.addEventHandler(player.EVENT.ON_READY, liveDetector);
            // Re-evaluate when playback starts
            player.addEventHandler(player.EVENT.ON_PLAY, liveDetector);
            // HLS live detection workaround for Android:
            // Also re-evaluate during playback, because that is when the live flag might change.
            // (Doing it only in Android Chrome saves unnecessary overhead on other plattforms)
            if (BrowserUtils.isAndroid && BrowserUtils.isChrome) {
                player.addEventHandler(player.EVENT.ON_TIME_CHANGED, liveDetector);
            }
        }
        LiveStreamDetector.prototype.detect = function () {
            var liveNow = this.player.isLive();
            // Compare current to previous live state flag and fire event when it changes. Since we initialize the flag
            // with undefined, there is always at least an initial event fired that tells listeners the live state.
            if (liveNow !== this.live) {
                this.liveChangedEvent.dispatch(this.player, { live: liveNow });
                this.live = liveNow;
            }
        };
        Object.defineProperty(LiveStreamDetector.prototype, "onLiveChanged", {
            get: function () {
                return this.liveChangedEvent.getEvent();
            },
            enumerable: true,
            configurable: true
        });
        return LiveStreamDetector;
    }());
    PlayerUtils.LiveStreamDetector = LiveStreamDetector;
})(PlayerUtils = exports.PlayerUtils || (exports.PlayerUtils = {}));
var UIUtils;
(function (UIUtils) {
    function traverseTree(component, visit) {
        var recursiveTreeWalker = function (component, parent) {
            visit(component, parent);
            // If the current component is a container, visit it's children
            if (component instanceof container_1.Container) {
                for (var _i = 0, _a = component.getComponents(); _i < _a.length; _i++) {
                    var childComponent = _a[_i];
                    recursiveTreeWalker(childComponent, component);
                }
            }
        };
        // Walk and configure the component tree
        recursiveTreeWalker(component);
    }
    UIUtils.traverseTree = traverseTree;
})(UIUtils = exports.UIUtils || (exports.UIUtils = {}));
var BrowserUtils;
(function (BrowserUtils) {
    // isMobile only needs to be evaluated once (it cannot change during a browser session)
    // Mobile detection according to Mozilla recommendation: "In summary, we recommend looking for the string “Mobi”
    // anywhere in the User Agent to detect a mobile device."
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
    BrowserUtils.isMobile = navigator && navigator.userAgent && /Mobi/.test(navigator.userAgent);
    BrowserUtils.isChrome = navigator && navigator.userAgent && /Chrome/.test(navigator.userAgent);
    BrowserUtils.isAndroid = navigator && navigator.userAgent && /Android/.test(navigator.userAgent);
})(BrowserUtils = exports.BrowserUtils || (exports.BrowserUtils = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = __webpack_require__(55);
var dom_1 = __webpack_require__(3);
var eventdispatcher_1 = __webpack_require__(6);
/**
 * The base class of the UI framework.
 * Each component must extend this class and optionally the config interface.
 */
var Component = (function () {
    /**
     * Constructs a component with an optionally supplied config. All subclasses must call the constructor of their
     * superclass and then merge their configuration into the component's configuration.
     * @param config the configuration for the component
     */
    function Component(config) {
        if (config === void 0) { config = {}; }
        /**
         * The list of events that this component offers. These events should always be private and only directly
         * accessed from within the implementing component.
         *
         * Because TypeScript does not support private properties with the same name on different class hierarchy levels
         * (i.e. superclass and subclass cannot contain a private property with the same name), the default naming
         * convention for the event list of a component that should be followed by subclasses is the concatenation of the
         * camel-cased class name + 'Events' (e.g. SubClass extends Component => subClassEvents).
         * See {@link #componentEvents} for an example.
         *
         * Event properties should be named in camel case with an 'on' prefix and in the present tense. Async events may
         * have a start event (when the operation starts) in the present tense, and must have an end event (when the
         * operation ends) in the past tense (or present tense in special cases (e.g. onStart/onStarted or onPlay/onPlaying).
         * See {@link #componentEvents#onShow} for an example.
         *
         * Each event should be accompanied with a protected method named by the convention eventName + 'Event'
         * (e.g. onStartEvent), that actually triggers the event by calling {@link EventDispatcher#dispatch dispatch} and
         * passing a reference to the component as first parameter. Components should always trigger their events with these
         * methods. Implementing this pattern gives subclasses means to directly listen to the events by overriding the
         * method (and saving the overhead of passing a handler to the event dispatcher) and more importantly to trigger
         * these events without having access to the private event list.
         * See {@link #onShow} for an example.
         *
         * To provide external code the possibility to listen to this component's events (subscribe, unsubscribe, etc.),
         * each event should also be accompanied by a public getter function with the same name as the event's property,
         * that returns the {@link Event} obtained from the event dispatcher by calling {@link EventDispatcher#getEvent}.
         * See {@link #onShow} for an example.
         *
         * Full example for an event representing an example action in a example component:
         *
         * <code>
         * // Define an example component class with an example event
         * class ExampleComponent extends Component<ComponentConfig> {
           *
           *     private exampleComponentEvents = {
           *         onExampleAction: new EventDispatcher<ExampleComponent, NoArgs>()
           *     }
           *
           *     // constructor and other stuff...
           *
           *     protected onExampleActionEvent() {
           *        this.exampleComponentEvents.onExampleAction.dispatch(this);
           *    }
           *
           *    get onExampleAction(): Event<ExampleComponent, NoArgs> {
           *        return this.exampleComponentEvents.onExampleAction.getEvent();
           *    }
           * }
         *
         * // Create an instance of the component somewhere
         * var exampleComponentInstance = new ExampleComponent();
         *
         * // Subscribe to the example event on the component
         * exampleComponentInstance.onExampleAction.subscribe(function (sender: ExampleComponent) {
           *     console.log('onExampleAction of ' + sender + ' has fired!');
           * });
         * </code>
         */
        this.componentEvents = {
            onShow: new eventdispatcher_1.EventDispatcher(),
            onHide: new eventdispatcher_1.EventDispatcher(),
            onHoverChanged: new eventdispatcher_1.EventDispatcher(),
        };
        // Create the configuration for this component
        this.config = this.mergeConfig(config, {
            tag: 'div',
            id: 'bmpui-id-' + guid_1.Guid.next(),
            cssPrefix: 'bmpui',
            cssClass: 'ui-component',
            cssClasses: [],
            hidden: false
        }, {});
    }
    /**
     * Initializes the component, e.g. by applying config settings.
     * This method must not be called from outside the UI framework.
     *
     * This method is automatically called by the {@link UIInstanceManager}. If the component is an inner component of
     * some component, and thus encapsulated abd managed internally and never directly exposed to the UIManager,
     * this method must be called from the managing component's {@link #initialize} method.
     */
    Component.prototype.initialize = function () {
        this.hidden = this.config.hidden;
        // Hide the component at initialization if it is configured to be hidden
        if (this.isHidden()) {
            this.hidden = false; // Set flag to false for the following hide() call to work (hide() checks the flag)
            this.hide();
        }
    };
    /**
     * Configures the component for the supplied Player and UIInstanceManager. This is the place where all the magic
     * happens, where components typically subscribe and react to events (on their DOM element, the Player, or the
     * UIInstanceManager), and basically everything that makes them interactive.
     * This method is called only once, when the UIManager initializes the UI.
     *
     * Subclasses usually overwrite this method to add their own functionality.
     *
     * @param player the player which this component controls
     * @param uimanager the UIInstanceManager that manages this component
     */
    Component.prototype.configure = function (player, uimanager) {
        var _this = this;
        this.onShow.subscribe(function () {
            uimanager.onComponentShow.dispatch(_this);
        });
        this.onHide.subscribe(function () {
            uimanager.onComponentHide.dispatch(_this);
        });
        // Track the hovered state of the element
        this.getDomElement().on('mouseenter', function () {
            _this.onHoverChangedEvent(true);
        });
        this.getDomElement().on('mouseleave', function () {
            _this.onHoverChangedEvent(false);
        });
    };
    /**
     * Releases all resources and dependencies that the component holds. Player, DOM, and UIManager events are
     * automatically removed during release and do not explicitly need to be removed here.
     * This method is called by the UIManager when it releases the UI.
     *
     * Subclasses that need to release resources should override this method and call super.release().
     */
    Component.prototype.release = function () {
        // Nothing to do here, override where necessary
    };
    /**
     * Generate the DOM element for this component.
     *
     * Subclasses usually overwrite this method to extend or replace the DOM element with their own design.
     */
    Component.prototype.toDomElement = function () {
        var element = new dom_1.DOM(this.config.tag, {
            'id': this.config.id,
            'class': this.getCssClasses()
        });
        return element;
    };
    /**
     * Returns the DOM element of this component. Creates the DOM element if it does not yet exist.
     *
     * Should not be overwritten by subclasses.
     *
     * @returns {DOM}
     */
    Component.prototype.getDomElement = function () {
        if (!this.element) {
            this.element = this.toDomElement();
        }
        return this.element;
    };
    /**
     * Merges a configuration with a default configuration and a base configuration from the superclass.
     *
     * @param config the configuration settings for the components, as usually passed to the constructor
     * @param defaults a default configuration for settings that are not passed with the configuration
     * @param base configuration inherited from a superclass
     * @returns {Config}
     */
    Component.prototype.mergeConfig = function (config, defaults, base) {
        // Extend default config with supplied config
        var merged = Object.assign({}, base, defaults, config);
        // Return the extended config
        return merged;
    };
    /**
     * Helper method that returns a string of all CSS classes of the component.
     *
     * @returns {string}
     */
    Component.prototype.getCssClasses = function () {
        var _this = this;
        // Merge all CSS classes into single array
        var flattenedArray = [this.config.cssClass].concat(this.config.cssClasses);
        // Prefix classes
        flattenedArray = flattenedArray.map(function (css) {
            return _this.prefixCss(css);
        });
        // Join array values into a string
        var flattenedString = flattenedArray.join(' ');
        // Return trimmed string to prevent whitespace at the end from the join operation
        return flattenedString.trim();
    };
    Component.prototype.prefixCss = function (cssClassOrId) {
        return this.config.cssPrefix + '-' + cssClassOrId;
    };
    /**
     * Returns the configuration object of the component.
     * @returns {Config}
     */
    Component.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * Hides the component if shown.
     * This method basically transfers the component into the hidden state. Actual hiding is done via CSS.
     */
    Component.prototype.hide = function () {
        if (!this.hidden) {
            this.hidden = true;
            this.getDomElement().addClass(this.prefixCss(Component.CLASS_HIDDEN));
            this.onHideEvent();
        }
    };
    /**
     * Shows the component if hidden.
     */
    Component.prototype.show = function () {
        if (this.hidden) {
            this.getDomElement().removeClass(this.prefixCss(Component.CLASS_HIDDEN));
            this.hidden = false;
            this.onShowEvent();
        }
    };
    /**
     * Determines if the component is hidden.
     * @returns {boolean} true if the component is hidden, else false
     */
    Component.prototype.isHidden = function () {
        return this.hidden;
    };
    /**
     * Determines if the component is shown.
     * @returns {boolean} true if the component is visible, else false
     */
    Component.prototype.isShown = function () {
        return !this.isHidden();
    };
    /**
     * Toggles the hidden state by hiding the component if it is shown, or showing it if hidden.
     */
    Component.prototype.toggleHidden = function () {
        if (this.isHidden()) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    /**
     * Determines if the component is currently hovered.
     * @returns {boolean} true if the component is hovered, else false
     */
    Component.prototype.isHovered = function () {
        return this.hovered;
    };
    /**
     * Fires the onShow event.
     * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
     */
    Component.prototype.onShowEvent = function () {
        this.componentEvents.onShow.dispatch(this);
    };
    /**
     * Fires the onHide event.
     * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
     */
    Component.prototype.onHideEvent = function () {
        this.componentEvents.onHide.dispatch(this);
    };
    /**
     * Fires the onHoverChanged event.
     * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
     */
    Component.prototype.onHoverChangedEvent = function (hovered) {
        this.hovered = hovered;
        this.componentEvents.onHoverChanged.dispatch(this, { hovered: hovered });
    };
    Object.defineProperty(Component.prototype, "onShow", {
        /**
         * Gets the event that is fired when the component is showing.
         * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
         * @returns {Event<Component<Config>, NoArgs>}
         */
        get: function () {
            return this.componentEvents.onShow.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "onHide", {
        /**
         * Gets the event that is fired when the component is hiding.
         * See the detailed explanation on event architecture on the {@link #componentEvents events list}.
         * @returns {Event<Component<Config>, NoArgs>}
         */
        get: function () {
            return this.componentEvents.onHide.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "onHoverChanged", {
        /**
         * Gets the event that is fired when the component's hover-state is changing.
         * @returns {Event<Component<Config>, ComponentHoverChangedEventArgs>}
         */
        get: function () {
            return this.componentEvents.onHoverChanged.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    return Component;
}());
/**
 * The classname that is attached to the element when it is in the hidden state.
 * @type {string}
 */
Component.CLASS_HIDDEN = 'hidden';
exports.Component = Component;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple DOM manipulation and DOM element event handling modeled after jQuery (as replacement for jQuery).
 *
 * Like jQuery, DOM operates on single elements and lists of elements. For example: creating an element returns a DOM
 * instance with a single element, selecting elements returns a DOM instance with zero, one, or many elements. Similar
 * to jQuery, setters usually affect all elements, while getters operate on only the first element.
 * Also similar to jQuery, most methods (except getters) return the DOM instance facilitating easy chaining of method
 * calls.
 *
 * Built with the help of: http://youmightnotneedjquery.com/
 */
var DOM = (function () {
    function DOM(something, attributes) {
        this.document = document; // Set the global document to the local document field
        if (something instanceof Array) {
            if (something.length > 0 && something[0] instanceof HTMLElement) {
                var elements = something;
                this.elements = elements;
            }
        }
        else if (something instanceof HTMLElement) {
            var element = something;
            this.elements = [element];
        }
        else if (something instanceof Document) {
            // When a document is passed in, we do not do anything with it, but by setting this.elements to null
            // we give the event handling method a means to detect if the events should be registered on the document
            // instead of elements.
            this.elements = null;
        }
        else if (attributes) {
            var tagName = something;
            var element = document.createElement(tagName);
            for (var attributeName in attributes) {
                var attributeValue = attributes[attributeName];
                element.setAttribute(attributeName, attributeValue);
            }
            this.elements = [element];
        }
        else {
            var selector = something;
            this.elements = this.findChildElements(selector);
        }
    }
    Object.defineProperty(DOM.prototype, "length", {
        /**
         * Gets the number of elements that this DOM instance currently holds.
         * @returns {number} the number of elements
         */
        get: function () {
            return this.elements ? this.elements.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the HTML elements that this DOM instance currently holds.
     * @returns {HTMLElement[]} the raw HTML elements
     */
    DOM.prototype.getElements = function () {
        return this.elements;
    };
    /**
     * A shortcut method for iterating all elements. Shorts this.elements.forEach(...) to this.forEach(...).
     * @param handler the handler to execute an operation on an element
     */
    DOM.prototype.forEach = function (handler) {
        this.elements.forEach(function (element) {
            handler(element);
        });
    };
    DOM.prototype.findChildElementsOfElement = function (element, selector) {
        var childElements = element.querySelectorAll(selector);
        // Convert NodeList to Array
        // https://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
        return [].slice.call(childElements);
    };
    DOM.prototype.findChildElements = function (selector) {
        var _this = this;
        var allChildElements = [];
        if (this.elements) {
            this.forEach(function (element) {
                allChildElements = allChildElements.concat(_this.findChildElementsOfElement(element, selector));
            });
        }
        else {
            return this.findChildElementsOfElement(document, selector);
        }
        return allChildElements;
    };
    /**
     * Finds all child elements of all elements matching the supplied selector.
     * @param selector the selector to match with child elements
     * @returns {DOM} a new DOM instance representing all matched children
     */
    DOM.prototype.find = function (selector) {
        var allChildElements = this.findChildElements(selector);
        return new DOM(allChildElements);
    };
    DOM.prototype.html = function (content) {
        if (arguments.length > 0) {
            return this.setHtml(content);
        }
        else {
            return this.getHtml();
        }
    };
    DOM.prototype.getHtml = function () {
        return this.elements[0].innerHTML;
    };
    DOM.prototype.setHtml = function (content) {
        if (content === undefined || content == null) {
            // Set to empty string to avoid innerHTML getting set to 'undefined' (all browsers) or 'null' (IE9)
            content = '';
        }
        this.forEach(function (element) {
            element.innerHTML = content;
        });
        return this;
    };
    /**
     * Clears the inner HTML of all elements (deletes all children).
     * @returns {DOM}
     */
    DOM.prototype.empty = function () {
        this.forEach(function (element) {
            element.innerHTML = '';
        });
        return this;
    };
    /**
     * Returns the current value of the first form element, e.g. the selected value of a select box or the text if an
     * input field.
     * @returns {string} the value of a form element
     */
    DOM.prototype.val = function () {
        var element = this.elements[0];
        if (element instanceof HTMLSelectElement || element instanceof HTMLInputElement) {
            return element.value;
        }
        else {
            // TODO add support for missing form elements
            throw new Error("val() not supported for " + typeof element);
        }
    };
    DOM.prototype.attr = function (attribute, value) {
        if (arguments.length > 1) {
            return this.setAttr(attribute, value);
        }
        else {
            return this.getAttr(attribute);
        }
    };
    DOM.prototype.getAttr = function (attribute) {
        return this.elements[0].getAttribute(attribute);
    };
    DOM.prototype.setAttr = function (attribute, value) {
        this.forEach(function (element) {
            element.setAttribute(attribute, value);
        });
        return this;
    };
    DOM.prototype.data = function (dataAttribute, value) {
        if (arguments.length > 1) {
            return this.setData(dataAttribute, value);
        }
        else {
            return this.getData(dataAttribute);
        }
    };
    DOM.prototype.getData = function (dataAttribute) {
        return this.elements[0].getAttribute('data-' + dataAttribute);
    };
    DOM.prototype.setData = function (dataAttribute, value) {
        this.forEach(function (element) {
            element.setAttribute('data-' + dataAttribute, value);
        });
        return this;
    };
    /**
     * Appends one or more DOM elements as children to all elements.
     * @param childElements the chrild elements to append
     * @returns {DOM}
     */
    DOM.prototype.append = function () {
        var childElements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            childElements[_i] = arguments[_i];
        }
        this.forEach(function (element) {
            childElements.forEach(function (childElement) {
                childElement.elements.forEach(function (_, index) {
                    element.appendChild(childElement.elements[index]);
                });
            });
        });
        return this;
    };
    /**
     * Removes all elements from the DOM.
     */
    DOM.prototype.remove = function () {
        this.forEach(function (element) {
            var parent = element.parentNode;
            if (parent) {
                parent.removeChild(element);
            }
        });
    };
    /**
     * Returns the offset of the first element from the document's top left corner.
     * @returns {Offset}
     */
    DOM.prototype.offset = function () {
        var element = this.elements[0];
        var elementRect = element.getBoundingClientRect();
        var htmlRect = document.body.parentElement.getBoundingClientRect();
        // Virtual viewport scroll handling (e.g. pinch zoomed viewports in mobile browsers or desktop Chrome/Edge)
        // 'normal' zooms and virtual viewport zooms (aka layout viewport) result in different
        // element.getBoundingClientRect() results:
        //  - with normal scrolls, the clientRect decreases with an increase in scroll(Top|Left)/page(X|Y)Offset
        //  - with pinch zoom scrolls, the clientRect stays the same while scroll/pageOffset changes
        // This means, that the combination of clientRect + scroll/pageOffset does not work to calculate the offset
        // from the document's upper left origin when pinch zoom is used.
        // To work around this issue, we do not use scroll/pageOffset but get the clientRect of the html element and
        // subtract it from the element's rect, which always results in the offset from the document origin.
        // NOTE: the current way of offset calculation was implemented specifically to track event positions on the
        // seek bar, and it might break compatibility with jQuery's offset() method. If this ever turns out to be a
        // problem, this method should be reverted to the old version and the offset calculation moved to the seek bar.
        return {
            top: elementRect.top - htmlRect.top,
            left: elementRect.left - htmlRect.left
        };
    };
    /**
     * Returns the width of the first element.
     * @returns {number} the width of the first element
     */
    DOM.prototype.width = function () {
        // TODO check if this is the same as jQuery's width() (probably not)
        return this.elements[0].offsetWidth;
    };
    /**
     * Returns the height of the first element.
     * @returns {number} the height of the first element
     */
    DOM.prototype.height = function () {
        // TODO check if this is the same as jQuery's height() (probably not)
        return this.elements[0].offsetHeight;
    };
    /**
     * Attaches an event handler to one or more events on all elements.
     * @param eventName the event name (or multiple names separated by space) to listen to
     * @param eventHandler the event handler to call when the event fires
     * @returns {DOM}
     */
    DOM.prototype.on = function (eventName, eventHandler) {
        var _this = this;
        var events = eventName.split(' ');
        events.forEach(function (event) {
            if (_this.elements == null) {
                _this.document.addEventListener(event, eventHandler);
            }
            else {
                _this.forEach(function (element) {
                    element.addEventListener(event, eventHandler);
                });
            }
        });
        return this;
    };
    /**
     * Removes an event handler from one or more events on all elements.
     * @param eventName the event name (or multiple names separated by space) to remove the handler from
     * @param eventHandler the event handler to remove
     * @returns {DOM}
     */
    DOM.prototype.off = function (eventName, eventHandler) {
        var _this = this;
        var events = eventName.split(' ');
        events.forEach(function (event) {
            if (_this.elements == null) {
                _this.document.removeEventListener(event, eventHandler);
            }
            else {
                _this.forEach(function (element) {
                    element.removeEventListener(event, eventHandler);
                });
            }
        });
        return this;
    };
    /**
     * Adds the specified class(es) to all elements.
     * @param className the class(es) to add, multiple classes separated by space
     * @returns {DOM}
     */
    DOM.prototype.addClass = function (className) {
        this.forEach(function (element) {
            if (element.classList) {
                element.classList.add(className);
            }
            else {
                element.className += ' ' + className;
            }
        });
        return this;
    };
    /**
     * Removed the specified class(es) from all elements.
     * @param className the class(es) to remove, multiple classes separated by space
     * @returns {DOM}
     */
    DOM.prototype.removeClass = function (className) {
        this.forEach(function (element) {
            if (element.classList) {
                element.classList.remove(className);
            }
            else {
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        });
        return this;
    };
    /**
     * Checks if any of the elements has the specified class.
     * @param className the class name to check
     * @returns {boolean} true if one of the elements has the class attached, else if no element has it attached
     */
    DOM.prototype.hasClass = function (className) {
        var hasClass = false;
        this.forEach(function (element) {
            if (element.classList) {
                if (element.classList.contains(className)) {
                    // Since we are inside a handler, we can't just 'return true'. Instead, we save it to a variable
                    // and return it at the end of the function body.
                    hasClass = true;
                }
            }
            else {
                if (new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)) {
                    // See comment above
                    hasClass = true;
                }
            }
        });
        return hasClass;
    };
    DOM.prototype.css = function (propertyNameOrCollection, value) {
        if (typeof propertyNameOrCollection === 'string') {
            var propertyName = propertyNameOrCollection;
            if (arguments.length === 2) {
                return this.setCss(propertyName, value);
            }
            else {
                return this.getCss(propertyName);
            }
        }
        else {
            var propertyValueCollection = propertyNameOrCollection;
            return this.setCssCollection(propertyValueCollection);
        }
    };
    DOM.prototype.getCss = function (propertyName) {
        return getComputedStyle(this.elements[0])[propertyName];
    };
    DOM.prototype.setCss = function (propertyName, value) {
        this.forEach(function (element) {
            // <any> cast to resolve TS7015: http://stackoverflow.com/a/36627114/370252
            element.style[propertyName] = value;
        });
        return this;
    };
    DOM.prototype.setCssCollection = function (ruleValueCollection) {
        this.forEach(function (element) {
            // http://stackoverflow.com/a/34490573/370252
            Object.assign(element.style, ruleValueCollection);
        });
        return this;
    };
    return DOM;
}());
exports.DOM = DOM;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(3);
var eventdispatcher_1 = __webpack_require__(6);
/**
 * A simple text label.
 *
 * DOM example:
 * <code>
 *     <span class='ui-label'>...some text...</span>
 * </code>
 */
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.labelEvents = {
            onClick: new eventdispatcher_1.EventDispatcher(),
            onTextChanged: new eventdispatcher_1.EventDispatcher(),
        };
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-label'
        }, _this.config);
        _this.text = _this.config.text;
        return _this;
    }
    Label.prototype.toDomElement = function () {
        var _this = this;
        var labelElement = new dom_1.DOM('span', {
            'id': this.config.id,
            'class': this.getCssClasses()
        }).html(this.text);
        labelElement.on('click', function () {
            _this.onClickEvent();
        });
        return labelElement;
    };
    /**
     * Set the text on this label.
     * @param text
     */
    Label.prototype.setText = function (text) {
        this.text = text;
        this.getDomElement().html(text);
        this.onTextChangedEvent(text);
    };
    /**
     * Gets the text on this label.
     * @return {string} The text on the label
     */
    Label.prototype.getText = function () {
        return this.text;
    };
    /**
     * Clears the text on this label.
     */
    Label.prototype.clearText = function () {
        this.getDomElement().html('');
        this.onTextChangedEvent(null);
    };
    /**
     * Tests if the label is empty and does not contain any text.
     * @return {boolean} True if the label is empty, else false
     */
    Label.prototype.isEmpty = function () {
        return !this.text;
    };
    /**
     * Fires the {@link #onClick} event.
     * Can be used by subclasses to listen to this event without subscribing an event listener by overwriting the method
     * and calling the super method.
     */
    Label.prototype.onClickEvent = function () {
        this.labelEvents.onClick.dispatch(this);
    };
    /**
     * Fires the {@link #onClick} event.
     * Can be used by subclasses to listen to this event without subscribing an event listener by overwriting the method
     * and calling the super method.
     */
    Label.prototype.onTextChangedEvent = function (text) {
        this.labelEvents.onTextChanged.dispatch(this, text);
    };
    Object.defineProperty(Label.prototype, "onClick", {
        /**
         * Gets the event that is fired when the label is clicked.
         * @returns {Event<Label<LabelConfig>, NoArgs>}
         */
        get: function () {
            return this.labelEvents.onClick.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "onTextChanged", {
        /**
         * Gets the event that is fired when the text on the label is changed.
         * @returns {Event<Label<LabelConfig>, string>}
         */
        get: function () {
            return this.labelEvents.onTextChanged.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    return Label;
}(component_1.Component));
exports.Label = Label;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(7);
var eventdispatcher_1 = __webpack_require__(6);
/**
 * A button that can be toggled between 'on' and 'off' states.
 */
var ToggleButton = (function (_super) {
    __extends(ToggleButton, _super);
    function ToggleButton(config) {
        var _this = _super.call(this, config) || this;
        _this.toggleButtonEvents = {
            onToggle: new eventdispatcher_1.EventDispatcher(),
            onToggleOn: new eventdispatcher_1.EventDispatcher(),
            onToggleOff: new eventdispatcher_1.EventDispatcher()
        };
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-togglebutton'
        }, _this.config);
        return _this;
    }
    /**
     * Toggles the button to the 'on' state.
     */
    ToggleButton.prototype.on = function () {
        if (this.isOff()) {
            this.onState = true;
            this.getDomElement().removeClass(this.prefixCss(ToggleButton.CLASS_OFF));
            this.getDomElement().addClass(this.prefixCss(ToggleButton.CLASS_ON));
            this.onToggleEvent();
            this.onToggleOnEvent();
        }
    };
    /**
     * Toggles the button to the 'off' state.
     */
    ToggleButton.prototype.off = function () {
        if (this.isOn()) {
            this.onState = false;
            this.getDomElement().removeClass(this.prefixCss(ToggleButton.CLASS_ON));
            this.getDomElement().addClass(this.prefixCss(ToggleButton.CLASS_OFF));
            this.onToggleEvent();
            this.onToggleOffEvent();
        }
    };
    /**
     * Toggle the button 'on' if it is 'off', or 'off' if it is 'on'.
     */
    ToggleButton.prototype.toggle = function () {
        if (this.isOn()) {
            this.off();
        }
        else {
            this.on();
        }
    };
    /**
     * Checks if the toggle button is in the 'on' state.
     * @returns {boolean} true if button is 'on', false if 'off'
     */
    ToggleButton.prototype.isOn = function () {
        return this.onState;
    };
    /**
     * Checks if the toggle button is in the 'off' state.
     * @returns {boolean} true if button is 'off', false if 'on'
     */
    ToggleButton.prototype.isOff = function () {
        return !this.isOn();
    };
    ToggleButton.prototype.onClickEvent = function () {
        _super.prototype.onClickEvent.call(this);
        // Fire the toggle event together with the click event
        // (they are technically the same, only the semantics are different)
        this.onToggleEvent();
    };
    ToggleButton.prototype.onToggleEvent = function () {
        this.toggleButtonEvents.onToggle.dispatch(this);
    };
    ToggleButton.prototype.onToggleOnEvent = function () {
        this.toggleButtonEvents.onToggleOn.dispatch(this);
    };
    ToggleButton.prototype.onToggleOffEvent = function () {
        this.toggleButtonEvents.onToggleOff.dispatch(this);
    };
    Object.defineProperty(ToggleButton.prototype, "onToggle", {
        /**
         * Gets the event that is fired when the button is toggled.
         * @returns {Event<ToggleButton<Config>, NoArgs>}
         */
        get: function () {
            return this.toggleButtonEvents.onToggle.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButton.prototype, "onToggleOn", {
        /**
         * Gets the event that is fired when the button is toggled 'on'.
         * @returns {Event<ToggleButton<Config>, NoArgs>}
         */
        get: function () {
            return this.toggleButtonEvents.onToggleOn.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButton.prototype, "onToggleOff", {
        /**
         * Gets the event that is fired when the button is toggled 'off'.
         * @returns {Event<ToggleButton<Config>, NoArgs>}
         */
        get: function () {
            return this.toggleButtonEvents.onToggleOff.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    return ToggleButton;
}(button_1.Button));
ToggleButton.CLASS_ON = 'on';
ToggleButton.CLASS_OFF = 'off';
exports.ToggleButton = ToggleButton;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
/**
 * Event dispatcher to subscribe and trigger events. Each event should have its own dispatcher.
 */
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listeners = [];
    }
    /**
     * {@inheritDoc}
     */
    EventDispatcher.prototype.subscribe = function (listener) {
        this.listeners.push(new EventListenerWrapper(listener));
    };
    /**
     * {@inheritDoc}
     */
    EventDispatcher.prototype.subscribeOnce = function (listener) {
        this.listeners.push(new EventListenerWrapper(listener, true));
    };
    /**
     * {@inheritDoc}
     */
    EventDispatcher.prototype.subscribeRateLimited = function (listener, rateMs) {
        this.listeners.push(new RateLimitedEventListenerWrapper(listener, rateMs));
    };
    /**
     * {@inheritDoc}
     */
    EventDispatcher.prototype.unsubscribe = function (listener) {
        // Iterate through listeners, compare with parameter, and remove if found
        for (var i = 0; i < this.listeners.length; i++) {
            var subscribedListener = this.listeners[i];
            if (subscribedListener.listener === listener) {
                utils_1.ArrayUtils.remove(this.listeners, subscribedListener);
                return true;
            }
        }
        return false;
    };
    /**
     * Removes all listeners from this dispatcher.
     */
    EventDispatcher.prototype.unsubscribeAll = function () {
        this.listeners = [];
    };
    /**
     * Dispatches an event to all subscribed listeners.
     * @param sender the source of the event
     * @param args the arguments for the event
     */
    EventDispatcher.prototype.dispatch = function (sender, args) {
        if (args === void 0) { args = null; }
        var listenersToRemove = [];
        // Call every listener
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener.fire(sender, args);
            if (listener.isOnce()) {
                listenersToRemove.push(listener);
            }
        }
        // Remove one-time listener
        for (var _b = 0, listenersToRemove_1 = listenersToRemove; _b < listenersToRemove_1.length; _b++) {
            var listenerToRemove = listenersToRemove_1[_b];
            utils_1.ArrayUtils.remove(this.listeners, listenerToRemove);
        }
    };
    /**
     * Returns the event that this dispatcher manages and on which listeners can subscribe and unsubscribe event handlers.
     * @returns {Event}
     */
    EventDispatcher.prototype.getEvent = function () {
        // For now, just cast the event dispatcher to the event interface. At some point in the future when the
        // codebase grows, it might make sense to split the dispatcher into separate dispatcher and event classes.
        return this;
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
/**
 * A basic event listener wrapper to manage listeners within the {@link EventDispatcher}. This is a 'private' class
 * for internal dispatcher use and it is therefore not exported.
 */
var EventListenerWrapper = (function () {
    function EventListenerWrapper(listener, once) {
        if (once === void 0) { once = false; }
        this.eventListener = listener;
        this.once = once;
    }
    Object.defineProperty(EventListenerWrapper.prototype, "listener", {
        /**
         * Returns the wrapped event listener.
         * @returns {EventListener<Sender, Args>}
         */
        get: function () {
            return this.eventListener;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fires the wrapped event listener with the given arguments.
     * @param sender
     * @param args
     */
    EventListenerWrapper.prototype.fire = function (sender, args) {
        this.eventListener(sender, args);
    };
    /**
     * Checks if this listener is scheduled to be called only once.
     * @returns {boolean} once if true
     */
    EventListenerWrapper.prototype.isOnce = function () {
        return this.once;
    };
    return EventListenerWrapper;
}());
/**
 * Extends the basic {@link EventListenerWrapper} with rate-limiting functionality.
 */
var RateLimitedEventListenerWrapper = (function (_super) {
    __extends(RateLimitedEventListenerWrapper, _super);
    function RateLimitedEventListenerWrapper(listener, rateMs) {
        var _this = _super.call(this, listener) || this;
        _this.rateMs = rateMs;
        _this.lastFireTime = 0;
        // Wrap the event listener with an event listener that does the rate-limiting
        _this.rateLimitingEventListener = function (sender, args) {
            if (Date.now() - _this.lastFireTime > _this.rateMs) {
                // Only if enough time since the previous call has passed, call the
                // actual event listener and record the current time
                _this.fireSuper(sender, args);
                _this.lastFireTime = Date.now();
            }
        };
        return _this;
    }
    RateLimitedEventListenerWrapper.prototype.fireSuper = function (sender, args) {
        // Fire the actual external event listener
        _super.prototype.fire.call(this, sender, args);
    };
    RateLimitedEventListenerWrapper.prototype.fire = function (sender, args) {
        // Fire the internal rate-limiting listener instead of the external event listener
        this.rateLimitingEventListener(sender, args);
    };
    return RateLimitedEventListenerWrapper;
}(EventListenerWrapper));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(3);
var eventdispatcher_1 = __webpack_require__(6);
/**
 * A simple clickable button.
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(config) {
        var _this = _super.call(this, config) || this;
        _this.buttonEvents = {
            onClick: new eventdispatcher_1.EventDispatcher()
        };
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-button'
        }, _this.config);
        return _this;
    }
    Button.prototype.toDomElement = function () {
        var _this = this;
        // Create the button element with the text label
        var buttonElement = new dom_1.DOM('button', {
            'type': 'button',
            'id': this.config.id,
            'class': this.getCssClasses()
        }).append(new dom_1.DOM('span', {
            'class': this.prefixCss('label')
        }).html(this.config.text));
        // Listen for the click event on the button element and trigger the corresponding event on the button component
        buttonElement.on('click', function () {
            _this.onClickEvent();
        });
        return buttonElement;
    };
    /**
     * Sets text on the label of the button.
     * @param text the text to put into the label of the button
     */
    Button.prototype.setText = function (text) {
        this.getDomElement().find('.' + this.prefixCss('label')).html(text);
    };
    Button.prototype.onClickEvent = function () {
        this.buttonEvents.onClick.dispatch(this);
    };
    Object.defineProperty(Button.prototype, "onClick", {
        /**
         * Gets the event that is fired when the button is clicked.
         * @returns {Event<Button<Config>, NoArgs>}
         */
        get: function () {
            return this.buttonEvents.onClick.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    return Button;
}(component_1.Component));
exports.Button = Button;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var listselector_1 = __webpack_require__(44);
var dom_1 = __webpack_require__(3);
/**
 * A simple select box providing the possibility to select a single item out of a list of available items.
 *
 * DOM example:
 * <code>
 *     <select class='ui-selectbox'>
 *         <option value='key'>label</option>
 *         ...
 *     </select>
 * </code>
 */
var SelectBox = (function (_super) {
    __extends(SelectBox, _super);
    function SelectBox(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-selectbox'
        }, _this.config);
        return _this;
    }
    SelectBox.prototype.toDomElement = function () {
        var _this = this;
        var selectElement = new dom_1.DOM('select', {
            'id': this.config.id,
            'class': this.getCssClasses()
        });
        this.selectElement = selectElement;
        this.updateDomItems();
        selectElement.on('change', function () {
            var value = selectElement.val();
            _this.onItemSelectedEvent(value, false);
        });
        return selectElement;
    };
    SelectBox.prototype.updateDomItems = function (selectedValue) {
        if (selectedValue === void 0) { selectedValue = null; }
        // Delete all children
        this.selectElement.empty();
        // Add updated children
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var optionElement = new dom_1.DOM('option', {
                'value': item.key
            }).html(item.label);
            if (item.key === selectedValue + '') {
                optionElement.attr('selected', 'selected');
            }
            this.selectElement.append(optionElement);
        }
    };
    SelectBox.prototype.onItemAddedEvent = function (value) {
        _super.prototype.onItemAddedEvent.call(this, value);
        this.updateDomItems(this.selectedItem);
    };
    SelectBox.prototype.onItemRemovedEvent = function (value) {
        _super.prototype.onItemRemovedEvent.call(this, value);
        this.updateDomItems(this.selectedItem);
    };
    SelectBox.prototype.onItemSelectedEvent = function (value, updateDomItems) {
        if (updateDomItems === void 0) { updateDomItems = true; }
        _super.prototype.onItemSelectedEvent.call(this, value);
        if (updateDomItems) {
            this.updateDomItems(value);
        }
    };
    return SelectBox;
}(listselector_1.ListSelector));
exports.SelectBox = SelectBox;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// TODO change to internal (not exported) class, how to use in other files?
/**
 * Executes a callback after a specified amount of time, optionally repeatedly until stopped.
 */
var Timeout = (function () {
    /**
     * Creates a new timeout callback handler.
     * @param delay the delay in milliseconds after which the callback should be executed
     * @param callback the callback to execute after the delay time
     * @param repeat if true, call the callback repeatedly in delay intervals
     */
    function Timeout(delay, callback, repeat) {
        if (repeat === void 0) { repeat = false; }
        this.delay = delay;
        this.callback = callback;
        this.repeat = repeat;
        this.timeoutHandle = 0;
    }
    /**
     * Starts the timeout and calls the callback when the timeout delay has passed.
     * @returns {Timeout} the current timeout (so the start call can be chained to the constructor)
     */
    Timeout.prototype.start = function () {
        this.reset();
        return this;
    };
    /**
     * Clears the timeout. The callback will not be called if clear is called during the timeout.
     */
    Timeout.prototype.clear = function () {
        clearTimeout(this.timeoutHandle);
    };
    /**
     * Resets the passed timeout delay to zero. Can be used to defer the calling of the callback.
     */
    Timeout.prototype.reset = function () {
        var _this = this;
        var lastScheduleTime = 0;
        var delayAdjust = 0;
        this.clear();
        var internalCallback = function () {
            _this.callback();
            if (_this.repeat) {
                var now = Date.now();
                // The time of one iteration from scheduling to executing the callback (usually a bit longer than the delay
                // time)
                var delta = now - lastScheduleTime;
                // Calculate the delay adjustment for the next schedule to keep a steady delay interval over time
                delayAdjust = _this.delay - delta + delayAdjust;
                lastScheduleTime = now;
                // Schedule next execution by the adjusted delay
                _this.timeoutHandle = setTimeout(internalCallback, _this.delay + delayAdjust);
            }
        };
        lastScheduleTime = Date.now();
        this.timeoutHandle = setTimeout(internalCallback, this.delay);
    };
    return Timeout;
}());
exports.Timeout = Timeout;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(7);
/**
 * A click overlay that opens an url in a new tab if clicked.
 */
var ClickOverlay = (function (_super) {
    __extends(ClickOverlay, _super);
    function ClickOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-clickoverlay'
        }, _this.config);
        return _this;
    }
    ClickOverlay.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.setUrl(this.config.url);
        var element = this.getDomElement();
        element.on('click', function () {
            if (element.data('url')) {
                window.open(element.data('url'), '_blank');
            }
        });
    };
    /**
     * Gets the URL that should be followed when the watermark is clicked.
     * @returns {string} the watermark URL
     */
    ClickOverlay.prototype.getUrl = function () {
        return this.getDomElement().data('url');
    };
    ClickOverlay.prototype.setUrl = function (url) {
        if (url === undefined || url == null) {
            url = '';
        }
        this.getDomElement().data('url', url);
    };
    return ClickOverlay;
}(button_1.Button));
exports.ClickOverlay = ClickOverlay;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(1);
var spacer_1 = __webpack_require__(24);
/**
 * A container for main player control components, e.g. play toggle button, seek bar, volume control, fullscreen toggle
 * button.
 */
var ControlBar = (function (_super) {
    __extends(ControlBar, _super);
    function ControlBar(config, autoHide) {
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-controlbar',
            hidden: autoHide
        }, _this.config);
        return _this;
    }
    ControlBar.prototype.configure = function (player, uimanager) {
        _super.prototype.configure.call(this, player, uimanager);
        var self = this;
        // Counts how many components are hovered and block hiding of the control bar
        var hoverStackCount = 0;
        // Track hover status of child components
        utils_1.UIUtils.traverseTree(this, function (component) {
            // Do not track hover status of child containers or spacers, only of 'real' controls
            if (component instanceof container_1.Container || component instanceof spacer_1.Spacer) {
                return;
            }
            // Subscribe hover event and keep a count of the number of hovered children
            component.onHoverChanged.subscribe(function (sender, args) {
                if (args.hovered) {
                    hoverStackCount++;
                }
                else {
                    hoverStackCount--;
                }
            });
        });
        uimanager.onControlsShow.subscribe(function () {
            if (self.config.hidden) {
                self.show();
            }
        });
        uimanager.onPreviewControlsHide.subscribe(function (sender, args) {
            // Cancel the hide event if hovered child components block hiding
            args.cancel = (hoverStackCount > 0);
        });
        uimanager.onControlsHide.subscribe(function () {
            if (self.config.hidden) {
                self.hide();
            }
        });
    };
    return ControlBar;
}(container_1.Container));
exports.ControlBar = ControlBar;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(1);
/**
 * A button that toggles between playback and pause.
 */
var PlaybackToggleButton = (function (_super) {
    __extends(PlaybackToggleButton, _super);
    function PlaybackToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-playbacktogglebutton',
            text: 'Play/Pause'
        }, _this.config);
        return _this;
    }
    PlaybackToggleButton.prototype.configure = function (player, uimanager, handleClickEvent) {
        var _this = this;
        if (handleClickEvent === void 0) { handleClickEvent = true; }
        _super.prototype.configure.call(this, player, uimanager);
        var isSeeking = false;
        // Handler to update button state based on player state
        var playbackStateHandler = function (event) {
            // If the UI is currently seeking, playback is temporarily stopped but the buttons should
            // not reflect that and stay as-is (e.g indicate playback while seeking).
            if (isSeeking) {
                return;
            }
            if (player.isPlaying()) {
                _this.on();
            }
            else {
                _this.off();
            }
        };
        // Call handler upon these events
        player.addEventHandler(player.EVENT.ON_PLAY, playbackStateHandler);
        player.addEventHandler(player.EVENT.ON_PAUSED, playbackStateHandler);
        // when playback finishes, player turns to paused mode
        player.addEventHandler(player.EVENT.ON_PLAYBACK_FINISHED, playbackStateHandler);
        player.addEventHandler(player.EVENT.ON_CAST_STARTED, playbackStateHandler);
        player.addEventHandler(player.EVENT.ON_CAST_PLAYING, playbackStateHandler);
        player.addEventHandler(player.EVENT.ON_CAST_PAUSED, playbackStateHandler);
        player.addEventHandler(player.EVENT.ON_CAST_PLAYBACK_FINISHED, playbackStateHandler);
        // Detect absence of timeshifting on live streams and add tagging class to convert button icons to play/stop
        var timeShiftDetector = new utils_1.PlayerUtils.TimeShiftAvailabilityDetector(player);
        timeShiftDetector.onTimeShiftAvailabilityChanged.subscribe(function (sender, args) {
            if (!args.timeShiftAvailable) {
                _this.getDomElement().addClass(_this.prefixCss(PlaybackToggleButton.CLASS_STOPTOGGLE));
            }
            else {
                _this.getDomElement().removeClass(_this.prefixCss(PlaybackToggleButton.CLASS_STOPTOGGLE));
            }
        });
        timeShiftDetector.detect(); // Initial detection
        if (handleClickEvent) {
            // Control player by button events
            // When a button event triggers a player API call, events are fired which in turn call the event handler
            // above that updated the button state.
            this.onClick.subscribe(function () {
                if (player.isPlaying()) {
                    player.pause('ui-button');
                }
                else {
                    player.play('ui-button');
                }
            });
        }
        // Track UI seeking status
        uimanager.onSeek.subscribe(function () {
            isSeeking = true;
        });
        uimanager.onSeeked.subscribe(function () {
            isSeeking = false;
        });
        // Startup init
        playbackStateHandler(null);
    };
    return PlaybackToggleButton;
}(togglebutton_1.ToggleButton));
PlaybackToggleButton.CLASS_STOPTOGGLE = 'stoptoggle';
exports.PlaybackToggleButton = PlaybackToggleButton;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(3);
var eventdispatcher_1 = __webpack_require__(6);
var timeout_1 = __webpack_require__(9);
var utils_1 = __webpack_require__(1);
/**
 * A seek bar to seek within the player's media. It displays the current playback position, amount of buffed data, seek
 * target, and keeps status about an ongoing seek.
 *
 * The seek bar displays different 'bars':
 *  - the playback position, i.e. the position in the media at which the player current playback pointer is positioned
 *  - the buffer position, which usually is the playback position plus the time span that is already buffered ahead
 *  - the seek position, used to preview to where in the timeline a seek will jump to
 */
var SeekBar = (function (_super) {
    __extends(SeekBar, _super);
    function SeekBar(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        /**
         * Buffer of the the current playback position. The position must be buffered in case the element
         * needs to be refreshed with {@link #refreshPlaybackPosition}.
         * @type {number}
         */
        _this.playbackPositionPercentage = 0;
        // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
        _this.touchSupported = ('ontouchstart' in window);
        _this.seekBarEvents = {
            /**
             * Fired when a scrubbing seek operation is started.
             */
            onSeek: new eventdispatcher_1.EventDispatcher(),
            /**
             * Fired during a scrubbing seek to indicate that the seek preview (i.e. the video frame) should be updated.
             */
            onSeekPreview: new eventdispatcher_1.EventDispatcher(),
            /**
             * Fired when a scrubbing seek has finished or when a direct seek is issued.
             */
            onSeeked: new eventdispatcher_1.EventDispatcher()
        };
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-seekbar',
            vertical: false,
            smoothPlaybackPositionUpdateIntervalMs: 50,
            hideInLivePlayback: true,
        }, _this.config);
        _this.label = _this.config.label;
        _this.timelineMarkers = [];
        return _this;
    }
    SeekBar.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        if (this.hasLabel()) {
            this.getLabel().initialize();
        }
    };
    SeekBar.prototype.configure = function (player, uimanager, configureSeek) {
        var _this = this;
        if (configureSeek === void 0) { configureSeek = true; }
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        if (!configureSeek) {
            // The configureSeek flag can be used by subclasses to disable configuration as seek bar. E.g. the volume
            // slider is reusing this component but adds its own functionality, and does not need the seek functionality.
            // This is actually a hack, the proper solution would be for both seek bar and volume sliders to extend
            // a common base slider component and implement their functionality there.
            return;
        }
        var playbackNotInitialized = true;
        var isPlaying = false;
        var isSeeking = false;
        // Update playback and buffer positions
        var playbackPositionHandler = function (event, forceUpdate) {
            if (event === void 0) { event = null; }
            if (forceUpdate === void 0) { forceUpdate = false; }
            // Once this handler os called, playback has been started and we set the flag to false
            playbackNotInitialized = false;
            if (isSeeking) {
                // We caught a seek preview seek, do not update the seekbar
                return;
            }
            if (player.isLive()) {
                if (player.getMaxTimeShift() === 0) {
                    // This case must be explicitly handled to avoid division by zero
                    _this.setPlaybackPosition(100);
                }
                else {
                    var playbackPositionPercentage = 100 - (100 / player.getMaxTimeShift() * player.getTimeShift());
                    _this.setPlaybackPosition(playbackPositionPercentage);
                }
                // Always show full buffer for live streams
                _this.setBufferPosition(100);
                // Hide SeekBar if required.
                // if (config.hideInLivePlayback) {
                _this.hide();
                // }
            }
            else {
                var playbackPositionPercentage = 100 / player.getDuration() * player.getCurrentTime();
                var videoBufferLength = player.getVideoBufferLength();
                var audioBufferLength = player.getAudioBufferLength();
                // Calculate the buffer length which is the smaller length of the audio and video buffers. If one of these
                // buffers is not available, we set it's value to MAX_VALUE to make sure that the other real value is taken
                // as the buffer length.
                var bufferLength = Math.min(videoBufferLength != null ? videoBufferLength : Number.MAX_VALUE, audioBufferLength != null ? audioBufferLength : Number.MAX_VALUE);
                // If both buffer lengths are missing, we set the buffer length to zero
                if (bufferLength === Number.MAX_VALUE) {
                    bufferLength = 0;
                }
                var bufferPercentage = 100 / player.getDuration() * bufferLength;
                // Update playback position only in paused state or in the initial startup state where player is neither
                // paused nor playing. Playback updates are handled in the Timeout below.
                if (_this.config.smoothPlaybackPositionUpdateIntervalMs === SeekBar.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED
                    || forceUpdate || player.isPaused() || (player.isPaused() === player.isPlaying())) {
                    _this.setPlaybackPosition(playbackPositionPercentage);
                }
                _this.setBufferPosition(playbackPositionPercentage + bufferPercentage);
            }
        };
        // Update seekbar upon these events
        // init playback position when the player is ready
        player.addEventHandler(player.EVENT.ON_READY, playbackPositionHandler);
        // update playback position when it changes
        player.addEventHandler(player.EVENT.ON_TIME_CHANGED, playbackPositionHandler);
        // update bufferlevel when buffering is complete
        player.addEventHandler(player.EVENT.ON_STALL_ENDED, playbackPositionHandler);
        // update playback position when a seek has finished
        player.addEventHandler(player.EVENT.ON_SEEKED, playbackPositionHandler);
        // update playback position when a timeshift has finished
        player.addEventHandler(player.EVENT.ON_TIME_SHIFTED, playbackPositionHandler);
        // update bufferlevel when a segment has been downloaded
        player.addEventHandler(player.EVENT.ON_SEGMENT_REQUEST_FINISHED, playbackPositionHandler);
        // update playback position of Cast playback
        player.addEventHandler(player.EVENT.ON_CAST_TIME_UPDATED, playbackPositionHandler);
        // Seek handling
        player.addEventHandler(player.EVENT.ON_SEEK, function () {
            _this.setSeeking(true);
        });
        player.addEventHandler(player.EVENT.ON_SEEKED, function () {
            _this.setSeeking(false);
        });
        player.addEventHandler(player.EVENT.ON_TIME_SHIFT, function () {
            _this.setSeeking(true);
        });
        player.addEventHandler(player.EVENT.ON_TIME_SHIFTED, function () {
            _this.setSeeking(false);
        });
        var seek = function (percentage) {
            if (player.isLive()) {
                player.timeShift(player.getMaxTimeShift() - (player.getMaxTimeShift() * (percentage / 100)));
            }
            else {
                player.seek(player.getDuration() * (percentage / 100));
            }
        };
        this.onSeek.subscribe(function (sender) {
            isSeeking = true; // track seeking status so we can catch events from seek preview seeks
            // Notify UI manager of started seek
            uimanager.onSeek.dispatch(sender);
            // Save current playback state
            isPlaying = player.isPlaying();
            // Pause playback while seeking
            if (isPlaying) {
                player.pause('ui-seek');
            }
        });
        this.onSeekPreview.subscribe(function (sender, args) {
            // Notify UI manager of seek preview
            uimanager.onSeekPreview.dispatch(sender, args);
        });
        this.onSeekPreview.subscribeRateLimited(function (sender, args) {
            // Rate-limited scrubbing seek
            if (args.scrubbing) {
                seek(args.position);
            }
        }, 200);
        this.onSeeked.subscribe(function (sender, percentage) {
            isSeeking = false;
            // Do the seek
            seek(percentage);
            // Continue playback after seek if player was playing when seek started
            if (isPlaying) {
                player.play('ui-seek');
            }
            // Notify UI manager of finished seek
            uimanager.onSeeked.dispatch(sender);
        });
        if (this.hasLabel()) {
            // Configure a seekbar label that is internal to the seekbar)
            this.getLabel().configure(player, uimanager);
        }
        // Hide seekbar for live sources without timeshift
        var isLive = false;
        var hasTimeShift = false;
        var switchVisibility = function (isLive, hasTimeShift) {
            if (isLive && !hasTimeShift) {
                _this.hide();
            }
            else {
                _this.show();
            }
            playbackPositionHandler(null, true);
            _this.refreshPlaybackPosition();
        };
        var liveStreamDetector = new utils_1.PlayerUtils.LiveStreamDetector(player);
        liveStreamDetector.onLiveChanged.subscribe(function (sender, args) {
            isLive = args.live;
            switchVisibility(isLive, hasTimeShift);
        });
        var timeShiftDetector = new utils_1.PlayerUtils.TimeShiftAvailabilityDetector(player);
        timeShiftDetector.onTimeShiftAvailabilityChanged.subscribe(function (sender, args) {
            hasTimeShift = args.timeShiftAvailable;
            switchVisibility(isLive, hasTimeShift);
        });
        // Initial detection
        liveStreamDetector.detect();
        timeShiftDetector.detect();
        // Refresh the playback position when the player resized or the UI is configured. The playback position marker
        // is positioned absolutely and must therefore be updated when the size of the seekbar changes.
        player.addEventHandler(player.EVENT.ON_PLAYER_RESIZE, function () {
            _this.refreshPlaybackPosition();
        });
        // Additionally, when this code is called, the seekbar is not part of the UI yet and therefore does not have a size,
        // resulting in a wrong initial position of the marker. Refreshing it once the UI is configured solved this issue.
        uimanager.onConfigured.subscribe(function () {
            _this.refreshPlaybackPosition();
        });
        // It can also happen that the value changes once the player is ready, or when a new source is loaded, so we need
        // to update on ON_READY too
        player.addEventHandler(player.EVENT.ON_READY, function () {
            _this.refreshPlaybackPosition();
        });
        // Initialize seekbar
        playbackPositionHandler(); // Set the playback position
        this.setBufferPosition(0);
        this.setSeekPosition(0);
        if (this.config.smoothPlaybackPositionUpdateIntervalMs !== SeekBar.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED) {
            this.configureSmoothPlaybackPositionUpdater(player, uimanager);
        }
        this.configureMarkers(player, uimanager);
    };
    SeekBar.prototype.configureSmoothPlaybackPositionUpdater = function (player, uimanager) {
        var _this = this;
        /*
         * Playback position update
         *
         * We do not update the position directly from the ON_TIME_CHANGED event, because it arrives very jittery and
         * results in a jittery position indicator since the CSS transition time is statically set.
         * To work around this issue, we maintain a local playback position that is updated in a stable regular interval
         * and kept in sync with the player.
         */
        var currentTimeSeekBar = 0;
        var currentTimePlayer = 0;
        var updateIntervalMs = 50;
        var currentTimeUpdateDeltaSecs = updateIntervalMs / 1000;
        this.smoothPlaybackPositionUpdater = new timeout_1.Timeout(updateIntervalMs, function () {
            currentTimeSeekBar += currentTimeUpdateDeltaSecs;
            currentTimePlayer = player.getCurrentTime();
            // Sync currentTime of seekbar to player
            var currentTimeDelta = currentTimeSeekBar - currentTimePlayer;
            // If the delta is larger that 2 secs, directly jump the seekbar to the
            // player time instead of smoothly fast forwarding/rewinding.
            if (Math.abs(currentTimeDelta) > 2) {
                currentTimeSeekBar = currentTimePlayer;
            }
            else if (currentTimeDelta <= -currentTimeUpdateDeltaSecs) {
                currentTimeSeekBar += currentTimeUpdateDeltaSecs;
            }
            else if (currentTimeDelta >= currentTimeUpdateDeltaSecs) {
                currentTimeSeekBar -= currentTimeUpdateDeltaSecs;
            }
            var playbackPositionPercentage = 100 / player.getDuration() * currentTimeSeekBar;
            _this.setPlaybackPosition(playbackPositionPercentage);
        }, true);
        var startSmoothPlaybackPositionUpdater = function () {
            if (!player.isLive()) {
                currentTimeSeekBar = player.getCurrentTime();
                _this.smoothPlaybackPositionUpdater.start();
            }
        };
        var stopSmoothPlaybackPositionUpdater = function () {
            _this.smoothPlaybackPositionUpdater.clear();
        };
        player.addEventHandler(player.EVENT.ON_PLAY, startSmoothPlaybackPositionUpdater);
        player.addEventHandler(player.EVENT.ON_CAST_PLAYING, startSmoothPlaybackPositionUpdater);
        player.addEventHandler(player.EVENT.ON_PAUSED, stopSmoothPlaybackPositionUpdater);
        player.addEventHandler(player.EVENT.ON_CAST_PAUSED, stopSmoothPlaybackPositionUpdater);
        player.addEventHandler(player.EVENT.ON_SEEKED, function () {
            currentTimeSeekBar = player.getCurrentTime();
        });
        if (player.isPlaying()) {
            startSmoothPlaybackPositionUpdater();
        }
    };
    SeekBar.prototype.configureMarkers = function (player, uimanager) {
        var _this = this;
        var clearMarkers = function () {
            _this.timelineMarkers = [];
            _this.updateMarkers();
        };
        var setupMarkers = function () {
            clearMarkers();
            var hasMarkersInUiConfig = uimanager.getConfig().metadata && uimanager.getConfig().metadata.markers
                && uimanager.getConfig().metadata.markers.length > 0;
            var hasMarkersInPlayerConfig = player.getConfig().source && player.getConfig().source.markers
                && player.getConfig().source.markers.length > 0;
            // Take markers from the UI config. If no markers defined, try to take them from the player's source config.
            var markers = hasMarkersInUiConfig ? uimanager.getConfig().metadata.markers :
                hasMarkersInPlayerConfig ? player.getConfig().source.markers : null;
            // Generate timeline markers from the config if we have markers and if we have a duration
            // The duration check is for buggy platforms where the duration is not available instantly (Chrome on Android 4.3)
            if (markers && player.getDuration() !== Infinity) {
                for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
                    var marker = markers_1[_i];
                    _this.timelineMarkers.push({
                        time: 100 / player.getDuration() * marker.time,
                        title: marker.title,
                    });
                }
            }
            // Populate the timeline with the markers
            _this.updateMarkers();
        };
        // Add markers when a source is loaded
        player.addEventHandler(player.EVENT.ON_READY, setupMarkers);
        // Remove markers when unloaded
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, clearMarkers);
        // Init markers at startup
        setupMarkers();
    };
    SeekBar.prototype.release = function () {
        _super.prototype.release.call(this);
        if (this.smoothPlaybackPositionUpdater) {
            this.smoothPlaybackPositionUpdater.clear();
        }
    };
    SeekBar.prototype.toDomElement = function () {
        var _this = this;
        if (this.config.vertical) {
            this.config.cssClasses.push('vertical');
        }
        var seekBarContainer = new dom_1.DOM('div', {
            'id': this.config.id,
            'class': this.getCssClasses()
        });
        var seekBar = new dom_1.DOM('div', {
            'class': this.prefixCss('seekbar')
        });
        this.seekBar = seekBar;
        // Indicator that shows the buffer fill level
        var seekBarBufferLevel = new dom_1.DOM('div', {
            'class': this.prefixCss('seekbar-bufferlevel')
        });
        this.seekBarBufferPosition = seekBarBufferLevel;
        // Indicator that shows the current playback position
        var seekBarPlaybackPosition = new dom_1.DOM('div', {
            'class': this.prefixCss('seekbar-playbackposition')
        });
        this.seekBarPlaybackPosition = seekBarPlaybackPosition;
        // A marker of the current playback position, e.g. a dot or line
        var seekBarPlaybackPositionMarker = new dom_1.DOM('div', {
            'class': this.prefixCss('seekbar-playbackposition-marker')
        });
        this.seekBarPlaybackPositionMarker = seekBarPlaybackPositionMarker;
        // Indicator that show where a seek will go to
        var seekBarSeekPosition = new dom_1.DOM('div', {
            'class': this.prefixCss('seekbar-seekposition')
        });
        this.seekBarSeekPosition = seekBarSeekPosition;
        // Indicator that shows the full seekbar
        var seekBarBackdrop = new dom_1.DOM('div', {
            'class': this.prefixCss('seekbar-backdrop')
        });
        this.seekBarBackdrop = seekBarBackdrop;
        var seekBarChapterMarkersContainer = new dom_1.DOM('div', {
            'class': this.prefixCss('seekbar-markers')
        });
        this.seekBarMarkersContainer = seekBarChapterMarkersContainer;
        seekBar.append(seekBarBackdrop, seekBarBufferLevel, seekBarSeekPosition, seekBarPlaybackPosition, seekBarChapterMarkersContainer, seekBarPlaybackPositionMarker);
        var seeking = false;
        // Define handler functions so we can attach/remove them later
        var mouseTouchMoveHandler = function (e) {
            e.preventDefault();
            // Avoid propagation to VR handler
            e.stopPropagation();
            var targetPercentage = 100 * _this.getOffset(e);
            _this.setSeekPosition(targetPercentage);
            _this.setPlaybackPosition(targetPercentage);
            _this.onSeekPreviewEvent(targetPercentage, true);
        };
        var mouseTouchUpHandler = function (e) {
            e.preventDefault();
            // Remove handlers, seek operation is finished
            new dom_1.DOM(document).off('touchmove mousemove', mouseTouchMoveHandler);
            new dom_1.DOM(document).off('touchend mouseup', mouseTouchUpHandler);
            var targetPercentage = 100 * _this.getOffset(e);
            var snappedChapter = _this.getMarkerAtPosition(targetPercentage);
            _this.setSeeking(false);
            seeking = false;
            // Fire seeked event
            _this.onSeekedEvent(snappedChapter ? snappedChapter.time : targetPercentage);
        };
        // A seek always start with a touchstart or mousedown directly on the seekbar.
        // To track a mouse seek also outside the seekbar (for touch events this works automatically),
        // so the user does not need to take care that the mouse always stays on the seekbar, we attach the mousemove
        // and mouseup handlers to the whole document. A seek is triggered when the user lifts the mouse key.
        // A seek mouse gesture is thus basically a click with a long time frame between down and up events.
        seekBar.on('touchstart mousedown', function (e) {
            var isTouchEvent = _this.touchSupported && e instanceof TouchEvent;
            // Prevent selection of DOM elements (also prevents mousedown if current event is touchstart)
            e.preventDefault();
            // Avoid propagation to VR handler
            e.stopPropagation();
            _this.setSeeking(true); // Set seeking class on DOM element
            seeking = true; // Set seek tracking flag
            // Fire seeked event
            _this.onSeekEvent();
            // Add handler to track the seek operation over the whole document
            new dom_1.DOM(document).on(isTouchEvent ? 'touchmove' : 'mousemove', mouseTouchMoveHandler);
            new dom_1.DOM(document).on(isTouchEvent ? 'touchend' : 'mouseup', mouseTouchUpHandler);
        });
        // Display seek target indicator when mouse hovers or finger slides over seekbar
        seekBar.on('touchmove mousemove', function (e) {
            e.preventDefault();
            if (seeking) {
                // During a seek (when mouse is down or touch move active), we need to stop propagation to avoid
                // the VR viewport reacting to the moves.
                e.stopPropagation();
                // Because the stopped propagation inhibits the event on the document, we need to call it from here
                mouseTouchMoveHandler(e);
            }
            var position = 100 * _this.getOffset(e);
            _this.setSeekPosition(position);
            _this.onSeekPreviewEvent(position, false);
            if (_this.hasLabel() && _this.getLabel().isHidden()) {
                _this.getLabel().show();
            }
        });
        // Hide seek target indicator when mouse or finger leaves seekbar
        seekBar.on('touchend mouseleave', function (e) {
            e.preventDefault();
            _this.setSeekPosition(0);
            if (_this.hasLabel()) {
                _this.getLabel().hide();
            }
        });
        seekBarContainer.append(seekBar);
        if (this.label) {
            seekBarContainer.append(this.label.getDomElement());
        }
        return seekBarContainer;
    };
    SeekBar.prototype.updateMarkers = function () {
        this.seekBarMarkersContainer.empty();
        for (var _i = 0, _a = this.timelineMarkers; _i < _a.length; _i++) {
            var marker = _a[_i];
            this.seekBarMarkersContainer.append(new dom_1.DOM('div', {
                'class': this.prefixCss('seekbar-marker'),
                'data-marker-time': String(marker.time),
                'data-marker-title': String(marker.title),
            }).css({
                'width': marker.time + '%',
            }));
        }
    };
    SeekBar.prototype.getMarkerAtPosition = function (percentage) {
        var snappedMarker = null;
        var snappingRange = 1;
        if (this.timelineMarkers.length > 0) {
            for (var _i = 0, _a = this.timelineMarkers; _i < _a.length; _i++) {
                var marker = _a[_i];
                if (percentage >= marker.time - snappingRange && percentage <= marker.time + snappingRange) {
                    snappedMarker = marker;
                    break;
                }
            }
        }
        return snappedMarker;
    };
    /**
     * Gets the horizontal offset of a mouse/touch event point from the left edge of the seek bar.
     * @param eventPageX the pageX coordinate of an event to calculate the offset from
     * @returns {number} a number in the range of [0, 1], where 0 is the left edge and 1 is the right edge
     */
    SeekBar.prototype.getHorizontalOffset = function (eventPageX) {
        var elementOffsetPx = this.seekBar.offset().left;
        var widthPx = this.seekBar.width();
        var offsetPx = eventPageX - elementOffsetPx;
        var offset = 1 / widthPx * offsetPx;
        return this.sanitizeOffset(offset);
    };
    /**
     * Gets the vertical offset of a mouse/touch event point from the bottom edge of the seek bar.
     * @param eventPageY the pageX coordinate of an event to calculate the offset from
     * @returns {number} a number in the range of [0, 1], where 0 is the bottom edge and 1 is the top edge
     */
    SeekBar.prototype.getVerticalOffset = function (eventPageY) {
        var elementOffsetPx = this.seekBar.offset().top;
        var widthPx = this.seekBar.height();
        var offsetPx = eventPageY - elementOffsetPx;
        var offset = 1 / widthPx * offsetPx;
        return 1 - this.sanitizeOffset(offset);
    };
    /**
     * Gets the mouse or touch event offset for the current configuration (horizontal or vertical).
     * @param e the event to calculate the offset from
     * @returns {number} a number in the range of [0, 1]
     * @see #getHorizontalOffset
     * @see #getVerticalOffset
     */
    SeekBar.prototype.getOffset = function (e) {
        if (this.touchSupported && e instanceof TouchEvent) {
            if (this.config.vertical) {
                return this.getVerticalOffset(e.type === 'touchend' ? e.changedTouches[0].pageY : e.touches[0].pageY);
            }
            else {
                return this.getHorizontalOffset(e.type === 'touchend' ? e.changedTouches[0].pageX : e.touches[0].pageX);
            }
        }
        else if (e instanceof MouseEvent) {
            if (this.config.vertical) {
                return this.getVerticalOffset(e.pageY);
            }
            else {
                return this.getHorizontalOffset(e.pageX);
            }
        }
        else {
            if (console) {
                console.warn('invalid event');
            }
            return 0;
        }
    };
    /**
     * Sanitizes the mouse offset to the range of [0, 1].
     *
     * When tracking the mouse outside the seek bar, the offset can be outside the desired range and this method
     * limits it to the desired range. E.g. a mouse event left of the left edge of a seek bar yields an offset below
     * zero, but to display the seek target on the seek bar, we need to limit it to zero.
     *
     * @param offset the offset to sanitize
     * @returns {number} the sanitized offset.
     */
    SeekBar.prototype.sanitizeOffset = function (offset) {
        // Since we track mouse moves over the whole document, the target can be outside the seek range,
        // and we need to limit it to the [0, 1] range.
        if (offset < 0) {
            offset = 0;
        }
        else if (offset > 1) {
            offset = 1;
        }
        return offset;
    };
    /**
     * Sets the position of the playback position indicator.
     * @param percent a number between 0 and 100 as returned by the player
     */
    SeekBar.prototype.setPlaybackPosition = function (percent) {
        this.playbackPositionPercentage = percent;
        // Set position of the bar
        this.setPosition(this.seekBarPlaybackPosition, percent);
        // Set position of the marker
        var px = (this.config.vertical ? this.seekBar.height() : this.seekBar.width()) / 100 * percent;
        if (this.config.vertical) {
            px = this.seekBar.height() - px;
        }
        var style = this.config.vertical ?
            // -ms-transform required for IE9
            { 'transform': 'translateY(' + px + 'px)', '-ms-transform': 'translateY(' + px + 'px)' } :
            { 'transform': 'translateX(' + px + 'px)', '-ms-transform': 'translateX(' + px + 'px)' };
        this.seekBarPlaybackPositionMarker.css(style);
    };
    /**
     * Refreshes the playback position. Can be used by subclasses to refresh the position when
     * the size of the component changes.
     */
    SeekBar.prototype.refreshPlaybackPosition = function () {
        this.setPlaybackPosition(this.playbackPositionPercentage);
    };
    /**
     * Sets the position until which media is buffered.
     * @param percent a number between 0 and 100
     */
    SeekBar.prototype.setBufferPosition = function (percent) {
        this.setPosition(this.seekBarBufferPosition, percent);
    };
    /**
     * Sets the position where a seek, if executed, would jump to.
     * @param percent a number between 0 and 100
     */
    SeekBar.prototype.setSeekPosition = function (percent) {
        this.setPosition(this.seekBarSeekPosition, percent);
    };
    /**
     * Set the actual position (width or height) of a DOM element that represent a bar in the seek bar.
     * @param element the element to set the position for
     * @param percent a number between 0 and 100
     */
    SeekBar.prototype.setPosition = function (element, percent) {
        var scale = percent / 100;
        var style = this.config.vertical ?
            // -ms-transform required for IE9
            { 'transform': 'scaleY(' + scale + ')', '-ms-transform': 'scaleY(' + scale + ')' } :
            { 'transform': 'scaleX(' + scale + ')', '-ms-transform': 'scaleX(' + scale + ')' };
        element.css(style);
    };
    /**
     * Puts the seek bar into or out of seeking state by adding/removing a class to the DOM element. This can be used
     * to adjust the styling while seeking.
     *
     * @param seeking should be true when entering seek state, false when exiting the seek state
     */
    SeekBar.prototype.setSeeking = function (seeking) {
        if (seeking) {
            this.getDomElement().addClass(this.prefixCss(SeekBar.CLASS_SEEKING));
        }
        else {
            this.getDomElement().removeClass(this.prefixCss(SeekBar.CLASS_SEEKING));
        }
    };
    /**
     * Checks if the seek bar is currently in the seek state.
     * @returns {boolean} true if in seek state, else false
     */
    SeekBar.prototype.isSeeking = function () {
        return this.getDomElement().hasClass(this.prefixCss(SeekBar.CLASS_SEEKING));
    };
    /**
     * Checks if the seek bar has a {@link SeekBarLabel}.
     * @returns {boolean} true if the seek bar has a label, else false
     */
    SeekBar.prototype.hasLabel = function () {
        return this.label != null;
    };
    /**
     * Gets the label of this seek bar.
     * @returns {SeekBarLabel} the label if this seek bar has a label, else null
     */
    SeekBar.prototype.getLabel = function () {
        return this.label;
    };
    SeekBar.prototype.onSeekEvent = function () {
        this.seekBarEvents.onSeek.dispatch(this);
    };
    SeekBar.prototype.onSeekPreviewEvent = function (percentage, scrubbing) {
        var snappedMarker = this.getMarkerAtPosition(percentage);
        if (this.label) {
            this.label.getDomElement().css({
                'left': (snappedMarker ? snappedMarker.time : percentage) + '%'
            });
        }
        this.seekBarEvents.onSeekPreview.dispatch(this, {
            scrubbing: scrubbing,
            position: percentage,
            marker: snappedMarker,
        });
    };
    SeekBar.prototype.onSeekedEvent = function (percentage) {
        this.seekBarEvents.onSeeked.dispatch(this, percentage);
    };
    Object.defineProperty(SeekBar.prototype, "onSeek", {
        /**
         * Gets the event that is fired when a scrubbing seek operation is started.
         * @returns {Event<SeekBar, NoArgs>}
         */
        get: function () {
            return this.seekBarEvents.onSeek.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SeekBar.prototype, "onSeekPreview", {
        /**
         * Gets the event that is fired during a scrubbing seek (to indicate that the seek preview, i.e. the video frame,
         * should be updated), or during a normal seek preview when the seek bar is hovered (and the seek target,
         * i.e. the seek bar label, should be updated).
         * @returns {Event<SeekBar, SeekPreviewEventArgs>}
         */
        get: function () {
            return this.seekBarEvents.onSeekPreview.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SeekBar.prototype, "onSeeked", {
        /**
         * Gets the event that is fired when a scrubbing seek has finished or when a direct seek is issued.
         * @returns {Event<SeekBar, number>}
         */
        get: function () {
            return this.seekBarEvents.onSeeked.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    SeekBar.prototype.onShowEvent = function () {
        _super.prototype.onShowEvent.call(this);
        // Refresh the position of the playback position when the seek bar becomes visible. To correctly set the position,
        // the DOM element must be fully initialized an have its size calculated, because the position is set as an absolute
        // value calculated from the size. This required size is not known when it is hidden.
        // For such cases, we refresh the position here in onShow because here it is guaranteed that the component knows
        // its size and can set the position correctly.
        this.refreshPlaybackPosition();
    };
    return SeekBar;
}(component_1.Component));
SeekBar.SMOOTH_PLAYBACK_POSITION_UPDATE_DISABLED = -1;
/**
 * The CSS class that is added to the DOM element while the seek bar is in 'seeking' state.
 */
SeekBar.CLASS_SEEKING = 'seeking';
exports.SeekBar = SeekBar;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(3);
var timeout_1 = __webpack_require__(9);
var utils_1 = __webpack_require__(1);
/**
 * The base container that contains all of the UI. The UIContainer is passed to the {@link UIManager} to build and
 * setup the UI.
 */
var UIContainer = (function (_super) {
    __extends(UIContainer, _super);
    function UIContainer(config) {
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-uicontainer',
            hideDelay: 5000,
        }, _this.config);
        return _this;
    }
    UIContainer.prototype.configure = function (player, uimanager) {
        _super.prototype.configure.call(this, player, uimanager);
        this.configureUIShowHide(player, uimanager);
        this.configurePlayerStates(player, uimanager);
    };
    UIContainer.prototype.configureUIShowHide = function (player, uimanager) {
        var _this = this;
        var container = this.getDomElement();
        var config = this.getConfig();
        var isUiShown = false;
        var isSeeking = false;
        var isFirstTouch = true;
        var showUi = function () {
            if (!isUiShown) {
                // Let subscribers know that they should reveal themselves
                uimanager.onControlsShow.dispatch(_this);
                isUiShown = true;
            }
            // Don't trigger timeout while seeking (it will be triggered once the seek is finished) or casting
            if (!isSeeking && !player.isCasting()) {
                _this.uiHideTimeout.start();
            }
        };
        var hideUi = function () {
            // Hide the UI only if it is shown, and if not casting
            if (isUiShown && !player.isCasting()) {
                // Issue a preview event to check if we are good to hide the controls
                var previewHideEventArgs = {};
                uimanager.onPreviewControlsHide.dispatch(_this, previewHideEventArgs);
                if (!previewHideEventArgs.cancel) {
                    // If the preview wasn't canceled, let subscribers know that they should now hide themselves
                    uimanager.onControlsHide.dispatch(_this);
                    isUiShown = false;
                }
                else {
                    // If the hide preview was canceled, continue to show UI
                    showUi();
                }
            }
        };
        // Timeout to defer UI hiding by the configured delay time
        this.uiHideTimeout = new timeout_1.Timeout(config.hideDelay, hideUi);
        // On touch displays, the first touch reveals the UI
        container.on('touchend', function (e) {
            if (!isUiShown) {
                // Only if the UI is hidden, we prevent other actions (except for the first touch) and reveal the UI instead.
                // The first touch is not prevented to let other listeners receive the event and trigger an initial action, e.g.
                // the huge playback button can directly start playback instead of requiring a double tap which 1. reveals
                // the UI and 2. starts playback.
                if (isFirstTouch) {
                    isFirstTouch = false;
                }
                else {
                    e.preventDefault();
                }
                showUi();
            }
        });
        // When the mouse enters, we show the UI
        container.on('mouseenter', function () {
            showUi();
        });
        // When the mouse moves within, we show the UI
        container.on('mousemove', function () {
            showUi();
        });
        // When the mouse leaves, we can prepare to hide the UI, except a seek is going on
        container.on('mouseleave', function () {
            // When a seek is going on, the seek scrub pointer may exit the UI area while still seeking, and we do not hide
            // the UI in such cases
            if (!isSeeking) {
                _this.uiHideTimeout.start();
            }
        });
        uimanager.onSeek.subscribe(function () {
            _this.uiHideTimeout.clear(); // Don't hide UI while a seek is in progress
            isSeeking = true;
        });
        uimanager.onSeeked.subscribe(function () {
            isSeeking = false;
            _this.uiHideTimeout.start(); // Re-enable UI hide timeout after a seek
        });
        player.addEventHandler(player.EVENT.ON_CAST_STARTED, function () {
            showUi(); // Show UI when a Cast session has started (UI will then stay permanently on during the session)
        });
    };
    UIContainer.prototype.configurePlayerStates = function (player, uimanager) {
        var _this = this;
        var container = this.getDomElement();
        // Convert player states into CSS class names
        var stateClassNames = [];
        for (var state in utils_1.PlayerUtils.PlayerState) {
            if (isNaN(Number(state))) {
                var enumName = utils_1.PlayerUtils.PlayerState[utils_1.PlayerUtils.PlayerState[state]];
                stateClassNames[utils_1.PlayerUtils.PlayerState[state]] =
                    this.prefixCss(UIContainer.STATE_PREFIX + enumName.toLowerCase());
            }
        }
        var removeStates = function () {
            container.removeClass(stateClassNames[utils_1.PlayerUtils.PlayerState.IDLE]);
            container.removeClass(stateClassNames[utils_1.PlayerUtils.PlayerState.PREPARED]);
            container.removeClass(stateClassNames[utils_1.PlayerUtils.PlayerState.PLAYING]);
            container.removeClass(stateClassNames[utils_1.PlayerUtils.PlayerState.PAUSED]);
            container.removeClass(stateClassNames[utils_1.PlayerUtils.PlayerState.FINISHED]);
        };
        player.addEventHandler(player.EVENT.ON_READY, function () {
            removeStates();
            container.addClass(stateClassNames[utils_1.PlayerUtils.PlayerState.PREPARED]);
        });
        player.addEventHandler(player.EVENT.ON_PLAY, function () {
            removeStates();
            container.addClass(stateClassNames[utils_1.PlayerUtils.PlayerState.PLAYING]);
        });
        player.addEventHandler(player.EVENT.ON_PAUSED, function () {
            removeStates();
            container.addClass(stateClassNames[utils_1.PlayerUtils.PlayerState.PAUSED]);
        });
        player.addEventHandler(player.EVENT.ON_PLAYBACK_FINISHED, function () {
            removeStates();
            container.addClass(stateClassNames[utils_1.PlayerUtils.PlayerState.FINISHED]);
        });
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, function () {
            removeStates();
            container.addClass(stateClassNames[utils_1.PlayerUtils.PlayerState.IDLE]);
        });
        // Init in current player state
        container.addClass(stateClassNames[utils_1.PlayerUtils.getState(player)]);
        // Fullscreen marker class
        player.addEventHandler(player.EVENT.ON_FULLSCREEN_ENTER, function () {
            container.addClass(_this.prefixCss(UIContainer.FULLSCREEN));
        });
        player.addEventHandler(player.EVENT.ON_FULLSCREEN_EXIT, function () {
            container.removeClass(_this.prefixCss(UIContainer.FULLSCREEN));
        });
        // Init fullscreen state
        if (player.isFullscreen()) {
            container.addClass(this.prefixCss(UIContainer.FULLSCREEN));
        }
        // Buffering marker class
        player.addEventHandler(player.EVENT.ON_STALL_STARTED, function () {
            container.addClass(_this.prefixCss(UIContainer.BUFFERING));
        });
        player.addEventHandler(player.EVENT.ON_STALL_ENDED, function () {
            container.removeClass(_this.prefixCss(UIContainer.BUFFERING));
        });
        // Init buffering state
        if (player.isStalled()) {
            container.addClass(this.prefixCss(UIContainer.BUFFERING));
        }
        // RemoteControl marker class
        player.addEventHandler(player.EVENT.ON_CAST_STARTED, function () {
            container.addClass(_this.prefixCss(UIContainer.REMOTE_CONTROL));
        });
        player.addEventHandler(player.EVENT.ON_CAST_STOPPED, function () {
            container.removeClass(_this.prefixCss(UIContainer.REMOTE_CONTROL));
        });
        // Init RemoteControl state
        if (player.isCasting()) {
            container.addClass(this.prefixCss(UIContainer.REMOTE_CONTROL));
        }
        // Controls visibility marker class
        uimanager.onControlsShow.subscribe(function () {
            container.removeClass(_this.prefixCss(UIContainer.CONTROLS_HIDDEN));
            container.addClass(_this.prefixCss(UIContainer.CONTROLS_SHOWN));
        });
        uimanager.onControlsHide.subscribe(function () {
            container.removeClass(_this.prefixCss(UIContainer.CONTROLS_SHOWN));
            container.addClass(_this.prefixCss(UIContainer.CONTROLS_HIDDEN));
        });
        // Layout size classes
        var updateLayoutSizeClasses = function (width, height) {
            container.removeClass(_this.prefixCss('layout-max-width-400'));
            container.removeClass(_this.prefixCss('layout-max-width-600'));
            container.removeClass(_this.prefixCss('layout-max-width-800'));
            container.removeClass(_this.prefixCss('layout-max-width-1200'));
            if (width <= 400) {
                container.addClass(_this.prefixCss('layout-max-width-400'));
            }
            else if (width <= 600) {
                container.addClass(_this.prefixCss('layout-max-width-600'));
            }
            else if (width <= 800) {
                container.addClass(_this.prefixCss('layout-max-width-800'));
            }
            else if (width <= 1200) {
                container.addClass(_this.prefixCss('layout-max-width-1200'));
            }
        };
        player.addEventHandler(player.EVENT.ON_PLAYER_RESIZE, function (e) {
            // Convert strings (with "px" suffix) to ints
            var width = Math.round(Number(e.width.substring(0, e.width.length - 2)));
            var height = Math.round(Number(e.height.substring(0, e.height.length - 2)));
            updateLayoutSizeClasses(width, height);
        });
        // Init layout state
        updateLayoutSizeClasses(new dom_1.DOM(player.getFigure()).width(), new dom_1.DOM(player.getFigure()).height());
    };
    UIContainer.prototype.release = function () {
        _super.prototype.release.call(this);
        this.uiHideTimeout.clear();
    };
    UIContainer.prototype.toDomElement = function () {
        var container = _super.prototype.toDomElement.call(this);
        // Detect flexbox support (not supported in IE9)
        if (document && typeof document.createElement('p').style.flex !== 'undefined') {
            container.addClass(this.prefixCss('flexbox'));
        }
        else {
            container.addClass(this.prefixCss('no-flexbox'));
        }
        return container;
    };
    return UIContainer;
}(container_1.Container));
UIContainer.STATE_PREFIX = 'player-state-';
UIContainer.FULLSCREEN = 'fullscreen';
UIContainer.BUFFERING = 'buffering';
UIContainer.REMOTE_CONTROL = 'remote-control';
UIContainer.CONTROLS_SHOWN = 'controls-shown';
UIContainer.CONTROLS_HIDDEN = 'controls-hidden';
exports.UIContainer = UIContainer;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var selectbox_1 = __webpack_require__(8);
/**
 * A select box providing a selection between 'auto' and the available audio qualities.
 */
var AudioQualitySelectBox = (function (_super) {
    __extends(AudioQualitySelectBox, _super);
    function AudioQualitySelectBox(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    AudioQualitySelectBox.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var updateAudioQualities = function () {
            var audioQualities = player.getAvailableAudioQualities();
            _this.clearItems();
            // Add entry for automatic quality switching (default setting)
            _this.addItem('auto', 'auto');
            // Add audio qualities
            for (var _i = 0, audioQualities_1 = audioQualities; _i < audioQualities_1.length; _i++) {
                var audioQuality = audioQualities_1[_i];
                _this.addItem(audioQuality.id, audioQuality.label);
            }
        };
        this.onItemSelected.subscribe(function (sender, value) {
            player.setAudioQuality(value);
        });
        // Update qualities when audio track has changed
        player.addEventHandler(player.EVENT.ON_AUDIO_CHANGED, updateAudioQualities);
        // Update qualities when source goes away
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, updateAudioQualities);
        // Update qualities when a new source is loaded
        player.addEventHandler(player.EVENT.ON_READY, updateAudioQualities);
        // Update quality selection when quality is changed (from outside)
        player.addEventHandler(player.EVENT.ON_AUDIO_DOWNLOAD_QUALITY_CHANGE, function () {
            var data = player.getDownloadedAudioData();
            _this.selectItem(data.isAuto ? 'auto' : data.id);
        });
        // Populate qualities at startup
        updateAudioQualities();
    };
    return AudioQualitySelectBox;
}(selectbox_1.SelectBox));
exports.AudioQualitySelectBox = AudioQualitySelectBox;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var label_1 = __webpack_require__(4);
var tvnoisecanvas_1 = __webpack_require__(52);
/**
 * Overlays the player and displays error messages.
 */
var ErrorMessageOverlay = (function (_super) {
    __extends(ErrorMessageOverlay, _super);
    function ErrorMessageOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.errorLabel = new label_1.Label({ cssClass: 'ui-errormessage-label' });
        _this.tvNoiseBackground = new tvnoisecanvas_1.TvNoiseCanvas();
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-errormessage-overlay',
            components: [_this.tvNoiseBackground, _this.errorLabel],
            hidden: true
        }, _this.config);
        return _this;
    }
    ErrorMessageOverlay.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        player.addEventHandler(player.EVENT.ON_ERROR, function (event) {
            var message = event.message;
            // Process message translations
            if (config.messages) {
                if (typeof config.messages === 'function') {
                    // Translation function for all errors
                    message = config.messages(event);
                }
                else if (config.messages[event.code]) {
                    // It's not a translation function, so it must be a map of strings or translation functions
                    var customMessage = config.messages[event.code];
                    if (typeof customMessage === 'string') {
                        message = customMessage;
                    }
                    else {
                        // The message is a translation function, so we call it
                        message = customMessage(event);
                    }
                }
            }
            _this.errorLabel.setText(message);
            _this.tvNoiseBackground.start();
            _this.show();
        });
        player.addEventHandler(player.EVENT.ON_SOURCE_LOADED, function (event) {
            if (_this.isShown()) {
                _this.tvNoiseBackground.stop();
                _this.hide();
            }
        });
    };
    return ErrorMessageOverlay;
}(container_1.Container));
exports.ErrorMessageOverlay = ErrorMessageOverlay;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var playbacktogglebutton_1 = __webpack_require__(12);
var dom_1 = __webpack_require__(3);
/**
 * A button that overlays the video and toggles between playback and pause.
 */
var HugePlaybackToggleButton = (function (_super) {
    __extends(HugePlaybackToggleButton, _super);
    function HugePlaybackToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-hugeplaybacktogglebutton',
            text: 'Play/Pause'
        }, _this.config);
        return _this;
    }
    HugePlaybackToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        // Update button state through API events
        _super.prototype.configure.call(this, player, uimanager, false);
        var togglePlayback = function () {
            if (player.isPlaying()) {
                player.pause('ui-overlay');
            }
            else {
                player.play('ui-overlay');
            }
        };
        var toggleFullscreen = function () {
            if (player.isFullscreen()) {
                player.exitFullscreen();
            }
            else {
                // player.enterFullscreen();
            }
        };
        var firstPlay = true;
        var clickTime = 0;
        var doubleClickTime = 0;
        /*
         * YouTube-style toggle button handling
         *
         * The goal is to prevent a short pause or playback interval between a click, that toggles playback, and a
         * double click, that toggles fullscreen. In this naive approach, the first click would e.g. start playback,
         * the second click would be detected as double click and toggle to fullscreen, and as second normal click stop
         * playback, which results is a short playback interval with max length of the double click detection
         * period (usually 500ms).
         *
         * To solve this issue, we defer handling of the first click for 200ms, which is almost unnoticeable to the user,
         * and just toggle playback if no second click (double click) has been registered during this period. If a double
         * click is registered, we just toggle the fullscreen. In the first 200ms, undesired playback changes thus cannot
         * happen. If a double click is registered within 500ms, we undo the playback change and switch fullscreen mode.
         * In the end, this method basically introduces a 200ms observing interval in which playback changes are prevented
         * if a double click happens.
         */
        this.onClick.subscribe(function () {
            // Directly start playback on first click of the button.
            // This is a required workaround for mobile browsers where video playback needs to be triggered directly
            // by the user. A deferred playback start through the timeout below is not considered as user action and
            // therefore ignored by mobile browsers.
            if (firstPlay) {
                // Try to start playback. Then we wait for ON_PLAY and only when it arrives, we disable the firstPlay flag.
                // If we disable the flag here, onClick was triggered programmatically instead of by a user interaction, and
                // playback is blocked (e.g. on mobile devices due to the programmatic play() call), we loose the chance to
                // ever start playback through a user interaction again with this button.
                togglePlayback();
                return;
            }
            var now = Date.now();
            if (now - clickTime < 200) {
                // We have a double click inside the 200ms interval, just toggle fullscreen mode
                toggleFullscreen();
                doubleClickTime = now;
                return;
            }
            else if (now - clickTime < 500) {
                // We have a double click inside the 500ms interval, undo playback toggle and toggle fullscreen mode
                toggleFullscreen();
                togglePlayback();
                doubleClickTime = now;
                return;
            }
            clickTime = now;
            setTimeout(function () {
                if (Date.now() - doubleClickTime > 200) {
                    // No double click detected, so we toggle playback and wait what happens next
                    togglePlayback();
                }
            }, 200);
        });
        player.addEventHandler(player.EVENT.ON_PLAY, function () {
            // Playback has really started, we can disable the flag to switch to normal toggle button handling
            firstPlay = false;
        });
        // Hide button while initializing a Cast session
        var castInitializationHandler = function (event) {
            if (event.type === player.EVENT.ON_CAST_START) {
                // Hide button when session is being initialized
                _this.hide();
            }
            else {
                // Show button when session is established or initialization was aborted
                _this.show();
            }
        };
        player.addEventHandler(player.EVENT.ON_CAST_START, castInitializationHandler);
        player.addEventHandler(player.EVENT.ON_CAST_STARTED, castInitializationHandler);
        player.addEventHandler(player.EVENT.ON_CAST_STOPPED, castInitializationHandler);
    };
    HugePlaybackToggleButton.prototype.toDomElement = function () {
        var buttonElement = _super.prototype.toDomElement.call(this);
        // Add child that contains the play button image
        // Setting the image directly on the button does not work together with scaling animations, because the button
        // can cover the whole video player are and scaling would extend it beyond. By adding an inner element, confined
        // to the size if the image, it can scale inside the player without overshooting.
        buttonElement.append(new dom_1.DOM('div', {
            'class': this.prefixCss('image')
        }));
        return buttonElement;
    };
    return HugePlaybackToggleButton;
}(playbacktogglebutton_1.PlaybackToggleButton));
exports.HugePlaybackToggleButton = HugePlaybackToggleButton;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(7);
var dom_1 = __webpack_require__(3);
/**
 * A button to play/replay a video.
 */
var HugeReplayButton = (function (_super) {
    __extends(HugeReplayButton, _super);
    function HugeReplayButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-hugereplaybutton',
            text: 'Replay'
        }, _this.config);
        return _this;
    }
    HugeReplayButton.prototype.configure = function (player, uimanager) {
        _super.prototype.configure.call(this, player, uimanager);
        this.onClick.subscribe(function () {
            player.play('ui-overlay');
        });
    };
    HugeReplayButton.prototype.toDomElement = function () {
        var buttonElement = _super.prototype.toDomElement.call(this);
        // Add child that contains the play button image
        // Setting the image directly on the button does not work together with scaling animations, because the button
        // can cover the whole video player are and scaling would extend it beyond. By adding an inner element, confined
        // to the size if the image, it can scale inside the player without overshooting.
        buttonElement.append(new dom_1.DOM('div', {
            'class': this.prefixCss('image')
        }));
        return buttonElement;
    };
    return HugeReplayButton;
}(button_1.Button));
exports.HugeReplayButton = HugeReplayButton;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var label_1 = __webpack_require__(4);
/**
 * Enumerates the types of content that the {@link MetadataLabel} can display.
 */
var MetadataLabelContent;
(function (MetadataLabelContent) {
    /**
     * Title of the data source.
     */
    MetadataLabelContent[MetadataLabelContent["Title"] = 0] = "Title";
    /**
     * Description fo the data source.
     */
    MetadataLabelContent[MetadataLabelContent["Description"] = 1] = "Description";
})(MetadataLabelContent = exports.MetadataLabelContent || (exports.MetadataLabelContent = {}));
/**
 * A label that can be configured to display certain metadata.
 */
var MetadataLabel = (function (_super) {
    __extends(MetadataLabel, _super);
    function MetadataLabel(config) {
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClasses: ['label-metadata', 'label-metadata-' + MetadataLabelContent[config.content].toLowerCase()]
        }, _this.config);
        return _this;
    }
    MetadataLabel.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        var uiconfig = uimanager.getConfig();
        var init = function () {
            switch (config.content) {
                case MetadataLabelContent.Title:
                    if (uiconfig && uiconfig.metadata && uiconfig.metadata.title) {
                        _this.setText(uiconfig.metadata.title);
                    }
                    else if (player.getConfig().source && player.getConfig().source.title) {
                        _this.setText(player.getConfig().source.title);
                    }
                    break;
                case MetadataLabelContent.Description:
                    if (uiconfig && uiconfig.metadata && uiconfig.metadata.description) {
                        _this.setText(uiconfig.metadata.description);
                    }
                    else if (player.getConfig().source && player.getConfig().source.description) {
                        _this.setText(player.getConfig().source.description);
                    }
                    break;
            }
        };
        var unload = function () {
            _this.setText(null);
        };
        // Init label
        init();
        // Reinit label when a new source is loaded
        player.addEventHandler(player.EVENT.ON_SOURCE_LOADED, init);
        // Clear labels when source is unloaded
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, unload);
    };
    return MetadataLabel;
}(label_1.Label));
exports.MetadataLabel = MetadataLabel;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var label_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(1);
var PlaybackTimeLabelMode;
(function (PlaybackTimeLabelMode) {
    PlaybackTimeLabelMode[PlaybackTimeLabelMode["CurrentTime"] = 0] = "CurrentTime";
    PlaybackTimeLabelMode[PlaybackTimeLabelMode["TotalTime"] = 1] = "TotalTime";
    PlaybackTimeLabelMode[PlaybackTimeLabelMode["CurrentAndTotalTime"] = 2] = "CurrentAndTotalTime";
})(PlaybackTimeLabelMode = exports.PlaybackTimeLabelMode || (exports.PlaybackTimeLabelMode = {}));
/**
 * A label that display the current playback time and the total time through {@link PlaybackTimeLabel#setTime setTime}
 * or any string through {@link PlaybackTimeLabel#setText setText}.
 */
var PlaybackTimeLabel = (function (_super) {
    __extends(PlaybackTimeLabel, _super);
    function PlaybackTimeLabel(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-playbacktimelabel',
            timeLabelMode: PlaybackTimeLabelMode.CurrentAndTotalTime,
            hideInLivePlayback: false,
        }, _this.config);
        return _this;
    }
    PlaybackTimeLabel.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        var live = false;
        var liveCssClass = this.prefixCss('ui-playbacktimelabel-live');
        var liveEdgeCssClass = this.prefixCss('ui-playbacktimelabel-live-edge');
        var minWidth = 0;
        var liveClickHandler = function () {
            player.timeShift(0);
        };
        var updateLiveState = function () {
            // Player is playing a live stream when the duration is infinite
            live = player.isLive();
            // Attach/detach live marker class
            if (live) {
                _this.getDomElement().addClass(liveCssClass);
                _this.setText('Live');
                if (config.hideInLivePlayback) {
                    _this.hide();
                }
                _this.onClick.subscribe(liveClickHandler);
                updateLiveTimeshiftState();
            }
            else {
                _this.getDomElement().removeClass(liveCssClass);
                _this.getDomElement().removeClass(liveEdgeCssClass);
                _this.show();
                _this.onClick.unsubscribe(liveClickHandler);
            }
        };
        var updateLiveTimeshiftState = function () {
            if (player.getTimeShift() === 0) {
                _this.getDomElement().addClass(liveEdgeCssClass);
            }
            else {
                _this.getDomElement().removeClass(liveEdgeCssClass);
            }
        };
        var liveStreamDetector = new utils_1.PlayerUtils.LiveStreamDetector(player);
        liveStreamDetector.onLiveChanged.subscribe(function (sender, args) {
            live = args.live;
            updateLiveState();
        });
        liveStreamDetector.detect(); // Initial detection
        var playbackTimeHandler = function () {
            if (!live && player.getDuration() !== Infinity) {
                _this.setTime(player.getCurrentTime(), player.getDuration());
            }
            // To avoid 'jumping' in the UI by varying label sizes due to non-monospaced fonts,
            // we gradually increase the min-width with the content to reach a stable size.
            var width = _this.getDomElement().width();
            if (width > minWidth) {
                minWidth = width;
                _this.getDomElement().css({
                    'min-width': minWidth + 'px'
                });
            }
        };
        player.addEventHandler(player.EVENT.ON_TIME_CHANGED, playbackTimeHandler);
        player.addEventHandler(player.EVENT.ON_SEEKED, playbackTimeHandler);
        player.addEventHandler(player.EVENT.ON_CAST_TIME_UPDATED, playbackTimeHandler);
        player.addEventHandler(player.EVENT.ON_TIME_SHIFT, updateLiveTimeshiftState);
        player.addEventHandler(player.EVENT.ON_TIME_SHIFTED, updateLiveTimeshiftState);
        var init = function () {
            // Reset min-width when a new source is ready (especially for switching VOD/Live modes where the label content
            // changes)
            minWidth = 0;
            _this.getDomElement().css({
                'min-width': null
            });
            // Set time format depending on source duration
            _this.timeFormat = Math.abs(player.isLive() ? player.getMaxTimeShift() : player.getDuration()) >= 3600 ?
                utils_1.StringUtils.FORMAT_HHMMSS : utils_1.StringUtils.FORMAT_MMSS;
            // Update time after the format has been set
            playbackTimeHandler();
        };
        player.addEventHandler(player.EVENT.ON_READY, init);
        init();
    };
    /**
     * Sets the current playback time and total duration.
     * @param playbackSeconds the current playback time in seconds
     * @param durationSeconds the total duration in seconds
     */
    PlaybackTimeLabel.prototype.setTime = function (playbackSeconds, durationSeconds) {
        var currentTime = utils_1.StringUtils.secondsToTime(playbackSeconds, this.timeFormat);
        var totalTime = utils_1.StringUtils.secondsToTime(durationSeconds, this.timeFormat);
        switch (this.config.timeLabelMode) {
            case PlaybackTimeLabelMode.CurrentTime:
                this.setText("" + currentTime);
                break;
            case PlaybackTimeLabelMode.TotalTime:
                this.setText("" + totalTime);
                break;
            case PlaybackTimeLabelMode.CurrentAndTotalTime:
                this.setText(currentTime + " / " + totalTime);
                break;
        }
    };
    return PlaybackTimeLabel;
}(label_1.Label));
exports.PlaybackTimeLabel = PlaybackTimeLabel;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var hugeplaybacktogglebutton_1 = __webpack_require__(18);
/**
 * Overlays the player and displays error messages.
 */
var PlaybackToggleOverlay = (function (_super) {
    __extends(PlaybackToggleOverlay, _super);
    function PlaybackToggleOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.playbackToggleButton = new hugeplaybacktogglebutton_1.HugePlaybackToggleButton();
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-playbacktoggle-overlay',
            components: [_this.playbackToggleButton]
        }, _this.config);
        return _this;
    }
    return PlaybackToggleOverlay;
}(container_1.Container));
exports.PlaybackToggleOverlay = PlaybackToggleOverlay;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var label_1 = __webpack_require__(4);
var component_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(1);
/**
 * A label for a {@link SeekBar} that can display the seek target time, a thumbnail, and title (e.g. chapter title).
 */
var SeekBarLabel = (function (_super) {
    __extends(SeekBarLabel, _super);
    function SeekBarLabel(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.timeLabel = new label_1.Label({ cssClasses: ['seekbar-label-time'] });
        _this.titleLabel = new label_1.Label({ cssClasses: ['seekbar-label-title'] });
        _this.thumbnail = new component_1.Component({ cssClasses: ['seekbar-thumbnail'] });
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-seekbar-label',
            components: [new container_1.Container({
                    components: [
                        // this.thumbnail,
                        new container_1.Container({
                            components: [_this.titleLabel, _this.timeLabel],
                            cssClass: 'seekbar-label-metadata',
                        })
                    ],
                    cssClass: 'seekbar-label-inner',
                })],
            hidden: true
        }, _this.config);
        return _this;
    }
    SeekBarLabel.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        uimanager.onSeekPreview.subscribe(function (sender, args) {
            if (player.isLive()) {
                var time = player.getMaxTimeShift() - player.getMaxTimeShift() * (args.position / 100);
                _this.setTime(time);
            }
            else {
                var percentage = 0;
                if (args.marker) {
                    percentage = args.marker.time;
                    _this.setTitleText(args.marker.title);
                }
                else {
                    percentage = args.position;
                    _this.setTitleText(null);
                }
                var time = player.getDuration() * (percentage / 100);
                _this.setTime(time);
                _this.setThumbnail(player.getThumb(time));
            }
        });
        var init = function () {
            // Set time format depending on source duration
            _this.timeFormat = Math.abs(player.isLive() ? player.getMaxTimeShift() : player.getDuration()) >= 3600 ?
                utils_1.StringUtils.FORMAT_HHMMSS : utils_1.StringUtils.FORMAT_MMSS;
        };
        player.addEventHandler(player.EVENT.ON_READY, init);
        init();
    };
    /**
     * Sets arbitrary text on the label.
     * @param text the text to show on the label
     */
    SeekBarLabel.prototype.setText = function (text) {
        this.timeLabel.setText(text);
    };
    /**
     * Sets a time to be displayed on the label.
     * @param seconds the time in seconds to display on the label
     */
    SeekBarLabel.prototype.setTime = function (seconds) {
        this.setText(utils_1.StringUtils.secondsToTime(seconds, this.timeFormat));
    };
    /**
     * Sets the text on the title label.
     * @param text the text to show on the label
     */
    SeekBarLabel.prototype.setTitleText = function (text) {
        this.titleLabel.setText(text);
    };
    /**
     * Sets or removes a thumbnail on the label.
     * @param thumbnail the thumbnail to display on the label or null to remove a displayed thumbnail
     */
    SeekBarLabel.prototype.setThumbnail = function (thumbnail) {
        if (thumbnail === void 0) { thumbnail = null; }
        var thumbnailElement = this.thumbnail.getDomElement();
        if (thumbnail == null) {
            thumbnailElement.css({
                'background-image': null,
                'display': null,
                'width': null,
                'height': null
            });
        }
        else {
            thumbnailElement.css({
                'display': 'inherit',
                'background-image': "url(" + thumbnail.url + ")",
                'width': thumbnail.w + 'px',
                'height': thumbnail.h + 'px',
                'background-position': "-" + thumbnail.x + "px -" + thumbnail.y + "px"
            });
        }
    };
    return SeekBarLabel;
}(container_1.Container));
exports.SeekBarLabel = SeekBarLabel;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(2);
/**
 * A dummy component that just reserves some space and does nothing else.
 */
var Spacer = (function (_super) {
    __extends(Spacer, _super);
    function Spacer(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-spacer',
        }, _this.config);
        return _this;
    }
    Spacer.prototype.onShowEvent = function () {
        // disable event firing by overwriting and not calling super
    };
    Spacer.prototype.onHideEvent = function () {
        // disable event firing by overwriting and not calling super
    };
    Spacer.prototype.onHoverChangedEvent = function (hovered) {
        // disable event firing by overwriting and not calling super
    };
    return Spacer;
}(component_1.Component));
exports.Spacer = Spacer;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var label_1 = __webpack_require__(4);
var controlbar_1 = __webpack_require__(11);
/**
 * Overlays the player to display subtitles.
 */
var SubtitleOverlay = (function (_super) {
    __extends(SubtitleOverlay, _super);
    function SubtitleOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-subtitle-overlay',
        }, _this.config);
        return _this;
    }
    SubtitleOverlay.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var subtitleManager = new ActiveSubtitleManager();
        player.addEventHandler(player.EVENT.ON_CUE_ENTER, function (event) {
            var labelToAdd = subtitleManager.cueEnter(event);
            _this.addComponent(labelToAdd);
            _this.updateComponents();
            _this.show();
        });
        player.addEventHandler(player.EVENT.ON_CUE_EXIT, function (event) {
            var labelToRemove = subtitleManager.cueExit(event);
            if (labelToRemove) {
                _this.removeComponent(labelToRemove);
                _this.updateComponents();
            }
            if (!subtitleManager.hasCues) {
                _this.hide();
            }
        });
        var subtitleClearHandler = function () {
            _this.hide();
            subtitleManager.clear();
            _this.removeComponents();
            _this.updateComponents();
        };
        player.addEventHandler(player.EVENT.ON_AUDIO_CHANGED, subtitleClearHandler);
        player.addEventHandler(player.EVENT.ON_SUBTITLE_CHANGED, subtitleClearHandler);
        player.addEventHandler(player.EVENT.ON_SEEK, subtitleClearHandler);
        player.addEventHandler(player.EVENT.ON_TIME_SHIFT, subtitleClearHandler);
        player.addEventHandler(player.EVENT.ON_PLAYBACK_FINISHED, subtitleClearHandler);
        uimanager.onComponentShow.subscribe(function (component) {
            if (component instanceof controlbar_1.ControlBar) {
                _this.getDomElement().addClass(_this.prefixCss(SubtitleOverlay.CLASS_CONTROLBAR_VISIBLE));
            }
        });
        uimanager.onComponentHide.subscribe(function (component) {
            if (component instanceof controlbar_1.ControlBar) {
                _this.getDomElement().removeClass(_this.prefixCss(SubtitleOverlay.CLASS_CONTROLBAR_VISIBLE));
            }
        });
        // Init
        subtitleClearHandler();
    };
    return SubtitleOverlay;
}(container_1.Container));
SubtitleOverlay.CLASS_CONTROLBAR_VISIBLE = 'controlbar-visible';
exports.SubtitleOverlay = SubtitleOverlay;
var SubtitleLabel = (function (_super) {
    __extends(SubtitleLabel, _super);
    function SubtitleLabel(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-subtitle-label'
        }, _this.config);
        return _this;
    }
    return SubtitleLabel;
}(label_1.Label));
var ActiveSubtitleManager = (function () {
    function ActiveSubtitleManager() {
        this.activeSubtitleCueMap = {};
    }
    /**
     * Calculates a unique ID for a subtitle cue, which is needed to associate an ON_CUE_ENTER with its ON_CUE_EXIT
     * event so we can remove the correct subtitle in ON_CUE_EXIT when multiple subtitles are active at the same time.
     * The start time plus the text should make a unique identifier, and in the only case where a collision
     * can happen, two similar texts will displayed at a similar time so it does not matter which one we delete.
     * The start time should always be known, because it is required to schedule the ON_CUE_ENTER event. The end time
     * must not necessarily be known and therefore cannot be used for the ID.
     * @param event
     * @return {string}
     */
    ActiveSubtitleManager.calculateId = function (event) {
        return event.start + event.text;
    };
    /**
     * Adds a subtitle cue to the manager and returns the label that should be added to the subtitle overlay.
     * @param event
     * @return {SubtitleLabel}
     */
    ActiveSubtitleManager.prototype.cueEnter = function (event) {
        var id = ActiveSubtitleManager.calculateId(event);
        var label = new SubtitleLabel({
            // Prefer the HTML subtitle text if set, else use the plain text
            text: event.html || event.text
        });
        this.activeSubtitleCueMap[id] = { event: event, label: label };
        return label;
    };
    /**
     * Removes the subtitle cue from the manager and returns the label that should be removed from the subtitle overlay,
     * or null if there is no associated label existing (e.g. because all labels have been {@link #clear cleared}.
     * @param event
     * @return {SubtitleLabel|null}
     */
    ActiveSubtitleManager.prototype.cueExit = function (event) {
        var id = ActiveSubtitleManager.calculateId(event);
        var activeSubtitleCue = this.activeSubtitleCueMap[id];
        if (activeSubtitleCue) {
            delete this.activeSubtitleCueMap[id];
            return activeSubtitleCue.label;
        }
        else {
            return null;
        }
    };
    Object.defineProperty(ActiveSubtitleManager.prototype, "cueCount", {
        /**
         * Returns the number of active subtitle cues.
         * @return {number}
         */
        get: function () {
            return Object.keys(this.activeSubtitleCueMap).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveSubtitleManager.prototype, "hasCues", {
        /**
         * Returns true if there are active subtitle cues, else false.
         * @return {boolean}
         */
        get: function () {
            return this.cueCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Removes all subtitle cues from the manager.
     */
    ActiveSubtitleManager.prototype.clear = function () {
        this.activeSubtitleCueMap = {};
    };
    return ActiveSubtitleManager;
}());


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var selectbox_1 = __webpack_require__(8);
/**
 * A select box providing a selection between 'auto' and the available video qualities.
 */
var VideoQualitySelectBox = (function (_super) {
    __extends(VideoQualitySelectBox, _super);
    function VideoQualitySelectBox(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    VideoQualitySelectBox.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var updateVideoQualities = function () {
            var videoQualities = player.getAvailableVideoQualities();
            _this.clearItems();
            // Add entry for automatic quality switching (default setting)
            _this.addItem('auto', 'auto');
            // Add video qualities
            for (var _i = 0, videoQualities_1 = videoQualities; _i < videoQualities_1.length; _i++) {
                var videoQuality = videoQualities_1[_i];
                _this.addItem(videoQuality.id, videoQuality.label);
            }
        };
        this.onItemSelected.subscribe(function (sender, value) {
            player.setVideoQuality(value);
        });
        // Update qualities when source goes away
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, updateVideoQualities);
        // Update qualities when a new source is loaded
        player.addEventHandler(player.EVENT.ON_READY, updateVideoQualities);
        // Update quality selection when quality is changed (from outside)
        player.addEventHandler(player.EVENT.ON_VIDEO_DOWNLOAD_QUALITY_CHANGE, function () {
            var data = player.getDownloadedVideoData();
            _this.selectItem(data.isAuto ? 'auto' : data.id);
        });
        // Populate qualities at startup
        updateVideoQualities();
    };
    return VideoQualitySelectBox;
}(selectbox_1.SelectBox));
exports.VideoQualitySelectBox = VideoQualitySelectBox;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var volumeslider_1 = __webpack_require__(28);
var volumetogglebutton_1 = __webpack_require__(29);
var timeout_1 = __webpack_require__(9);
/**
 * A composite volume control that consists of and internally manages a volume control button that can be used
 * for muting, and a (depending on the CSS style, e.g. slide-out) volume control bar.
 */
var VolumeControlButton = (function (_super) {
    __extends(VolumeControlButton, _super);
    function VolumeControlButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.volumeToggleButton = new volumetogglebutton_1.VolumeToggleButton();
        _this.volumeSlider = new volumeslider_1.VolumeSlider({
            vertical: config.vertical != null ? config.vertical : true,
            hidden: true
        });
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-volumecontrolbutton',
            components: [_this.volumeToggleButton, _this.volumeSlider],
            hideDelay: 500
        }, _this.config);
        return _this;
    }
    VolumeControlButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var volumeToggleButton = this.getVolumeToggleButton();
        var volumeSlider = this.getVolumeSlider();
        this.volumeSliderHideTimeout = new timeout_1.Timeout(this.getConfig().hideDelay, function () {
            volumeSlider.hide();
        });
        /*
         * Volume Slider visibility handling
         *
         * The volume slider shall be visible while the user hovers the mute toggle button, while the user hovers the
         * volume slider, and while the user slides the volume slider. If none of these situations are true, the slider
         * shall disappear.
         */
        var volumeSliderHovered = false;
        volumeToggleButton.getDomElement().on('mouseenter', function () {
            // Show volume slider when mouse enters the button area
            if (volumeSlider.isHidden()) {
                volumeSlider.show();
            }
            // Avoid hiding of the slider when button is hovered
            _this.volumeSliderHideTimeout.clear();
        });
        volumeToggleButton.getDomElement().on('mouseleave', function () {
            // Hide slider delayed when button is left
            _this.volumeSliderHideTimeout.reset();
        });
        volumeSlider.getDomElement().on('mouseenter', function () {
            // When the slider is entered, cancel the hide timeout activated by leaving the button
            _this.volumeSliderHideTimeout.clear();
            volumeSliderHovered = true;
        });
        volumeSlider.getDomElement().on('mouseleave', function () {
            // When mouse leaves the slider, only hide it if there is no slide operation in progress
            if (volumeSlider.isSeeking()) {
                _this.volumeSliderHideTimeout.clear();
            }
            else {
                _this.volumeSliderHideTimeout.reset();
            }
            volumeSliderHovered = false;
        });
        volumeSlider.onSeeked.subscribe(function () {
            // When a slide operation is done and the slider not hovered (mouse outside slider), hide slider delayed
            if (!volumeSliderHovered) {
                _this.volumeSliderHideTimeout.reset();
            }
        });
    };
    VolumeControlButton.prototype.release = function () {
        _super.prototype.release.call(this);
        this.volumeSliderHideTimeout.clear();
    };
    /**
     * Provides access to the internally managed volume toggle button.
     * @returns {VolumeToggleButton}
     */
    VolumeControlButton.prototype.getVolumeToggleButton = function () {
        return this.volumeToggleButton;
    };
    /**
     * Provides access to the internally managed volume silder.
     * @returns {VolumeSlider}
     */
    VolumeControlButton.prototype.getVolumeSlider = function () {
        return this.volumeSlider;
    };
    return VolumeControlButton;
}(container_1.Container));
exports.VolumeControlButton = VolumeControlButton;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var seekbar_1 = __webpack_require__(13);
/**
 * A simple volume slider component to adjust the player's volume setting.
 */
var VolumeSlider = (function (_super) {
    __extends(VolumeSlider, _super);
    function VolumeSlider(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-volumeslider',
            hideIfVolumeControlProhibited: true,
        }, _this.config);
        return _this;
    }
    VolumeSlider.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager, false);
        var config = this.getConfig();
        if (config.hideIfVolumeControlProhibited && !this.detectVolumeControlAvailability(player)) {
            this.hide();
            // We can just return from here, because the user will never interact with the control and any configured
            // functionality would only eat resources for no reason.
            return;
        }
        var volumeChangeHandler = function () {
            if (player.isMuted()) {
                _this.setPlaybackPosition(0);
                _this.setBufferPosition(0);
            }
            else {
                _this.setPlaybackPosition(player.getVolume());
                _this.setBufferPosition(player.getVolume());
            }
        };
        player.addEventHandler(player.EVENT.ON_READY, volumeChangeHandler);
        player.addEventHandler(player.EVENT.ON_VOLUME_CHANGED, volumeChangeHandler);
        player.addEventHandler(player.EVENT.ON_MUTED, volumeChangeHandler);
        player.addEventHandler(player.EVENT.ON_UNMUTED, volumeChangeHandler);
        this.onSeekPreview.subscribe(function (sender, args) {
            if (args.scrubbing) {
                player.setVolume(args.position);
            }
        });
        this.onSeeked.subscribe(function (sender, percentage) {
            player.setVolume(percentage);
        });
        // Update the volume slider marker when the player resized, a source is loaded and player is ready,
        // or the UI is configured. Check the seekbar for a detailed description.
        player.addEventHandler(player.EVENT.ON_PLAYER_RESIZE, function () {
            _this.refreshPlaybackPosition();
        });
        player.addEventHandler(player.EVENT.ON_READY, function () {
            _this.refreshPlaybackPosition();
        });
        uimanager.onConfigured.subscribe(function () {
            _this.refreshPlaybackPosition();
        });
        // Init volume bar
        volumeChangeHandler();
    };
    VolumeSlider.prototype.detectVolumeControlAvailability = function (player) {
        // Store current player state so we can restore it later
        var volume = player.getVolume();
        var muted = player.isMuted();
        var playing = player.isPlaying();
        /*
         * "On iOS devices, the audio level is always under the user’s physical control. The volume property is not
         * settable in JavaScript. Reading the volume property always returns 1."
         * https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
         *
         * Our player API returns a volume range of [0, 100] so we need to check for 100 instead of 1.
         */
        // Only if the volume is 100, there's the possibility we are on a volume-control-restricted iOS device
        if (volume === 100) {
            // We set the volume to zero (that's the only value that does not unmute a muted player!)
            player.setVolume(0);
            // Then we check if the value is still 100
            if (player.getVolume() === 100) {
                // If the volume stayed at 100, we're on a volume-control-restricted device
                return false;
            }
            else {
                // We can control volume, so we must restore the previous player state
                player.setVolume(volume);
                if (muted) {
                    player.mute();
                }
                if (playing) {
                    // The volume restore above pauses autoplay on mobile devices (e.g. Android) so we need to resume playback
                    // (We cannot check isPaused() here because it is not set when playback is prohibited by the mobile platform)
                    player.play();
                }
                return true;
            }
        }
        else {
            // Volume is not 100, so we're definitely not on a volume-control-restricted iOS device
            return true;
        }
    };
    return VolumeSlider;
}(seekbar_1.SeekBar));
exports.VolumeSlider = VolumeSlider;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
/**
 * A button that toggles audio muting.
 */
var VolumeToggleButton = (function (_super) {
    __extends(VolumeToggleButton, _super);
    function VolumeToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-volumetogglebutton',
            text: 'Volume/Mute'
        }, _this.config);
        return _this;
    }
    VolumeToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var muteStateHandler = function () {
            if (player.isMuted()) {
                _this.on();
            }
            else {
                _this.off();
            }
        };
        var volumeLevelHandler = function () {
            // Toggle low class to display low volume icon below 50% volume
            if (player.getVolume() < 50) {
                _this.getDomElement().addClass(_this.prefixCss('low'));
            }
            else {
                _this.getDomElement().removeClass(_this.prefixCss('low'));
            }
        };
        player.addEventHandler(player.EVENT.ON_MUTED, muteStateHandler);
        player.addEventHandler(player.EVENT.ON_UNMUTED, muteStateHandler);
        player.addEventHandler(player.EVENT.ON_VOLUME_CHANGED, volumeLevelHandler);
        this.onClick.subscribe(function () {
            if (player.isMuted()) {
                player.unmute();
            }
            else {
                player.mute();
            }
        });
        // Startup init
        muteStateHandler();
        volumeLevelHandler();
    };
    return VolumeToggleButton;
}(togglebutton_1.ToggleButton));
exports.VolumeToggleButton = VolumeToggleButton;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='player.d.ts' />
var uimanager_1 = __webpack_require__(56);
var button_1 = __webpack_require__(7);
var controlbar_1 = __webpack_require__(11);
var fullscreentogglebutton_1 = __webpack_require__(43);
var hugeplaybacktogglebutton_1 = __webpack_require__(18);
var playbacktimelabel_1 = __webpack_require__(21);
var playbacktogglebutton_1 = __webpack_require__(12);
var seekbar_1 = __webpack_require__(13);
var selectbox_1 = __webpack_require__(8);
var settingspanel_1 = __webpack_require__(48);
var settingstogglebutton_1 = __webpack_require__(49);
var togglebutton_1 = __webpack_require__(5);
var videoqualityselectbox_1 = __webpack_require__(26);
var volumetogglebutton_1 = __webpack_require__(29);
var vrtogglebutton_1 = __webpack_require__(53);
var watermark_1 = __webpack_require__(54);
var uicontainer_1 = __webpack_require__(14);
var container_1 = __webpack_require__(0);
var label_1 = __webpack_require__(4);
var audioqualityselectbox_1 = __webpack_require__(16);
var audiotrackselectbox_1 = __webpack_require__(37);
var caststatusoverlay_1 = __webpack_require__(39);
var casttogglebutton_1 = __webpack_require__(40);
var component_1 = __webpack_require__(2);
var errormessageoverlay_1 = __webpack_require__(17);
var recommendationoverlay_1 = __webpack_require__(47);
var seekbarlabel_1 = __webpack_require__(23);
var subtitleoverlay_1 = __webpack_require__(25);
var subtitleselectbox_1 = __webpack_require__(50);
var titlebar_1 = __webpack_require__(51);
var volumecontrolbutton_1 = __webpack_require__(27);
var clickoverlay_1 = __webpack_require__(10);
var adskipbutton_1 = __webpack_require__(34);
var admessagelabel_1 = __webpack_require__(33);
var adclickoverlay_1 = __webpack_require__(32);
var playbackspeedselectbox_1 = __webpack_require__(46);
var hugereplaybutton_1 = __webpack_require__(19);
var bufferingoverlay_1 = __webpack_require__(38);
var castuicontainer_1 = __webpack_require__(41);
var playbacktoggleoverlay_1 = __webpack_require__(22);
var closebutton_1 = __webpack_require__(42);
var metadatalabel_1 = __webpack_require__(20);
var airplaytogglebutton_1 = __webpack_require__(35);
var volumeslider_1 = __webpack_require__(28);
var pictureinpicturetogglebutton_1 = __webpack_require__(45);
var spacer_1 = __webpack_require__(24);
var utils_1 = __webpack_require__(1);
// Object.assign polyfill for ES5/IE9
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
// Expose classes to window
window.bitmovin.playerui = {
    // Management
    UIManager: uimanager_1.UIManager,
    UIInstanceManager: uimanager_1.UIInstanceManager,
    // Utils
    ArrayUtils: utils_1.ArrayUtils,
    StringUtils: utils_1.StringUtils,
    PlayerUtils: utils_1.PlayerUtils,
    UIUtils: utils_1.UIUtils,
    BrowserUtils: utils_1.BrowserUtils,
    // Components
    AdClickOverlay: adclickoverlay_1.AdClickOverlay,
    AdMessageLabel: admessagelabel_1.AdMessageLabel,
    AdSkipButton: adskipbutton_1.AdSkipButton,
    AirPlayToggleButton: airplaytogglebutton_1.AirPlayToggleButton,
    AudioQualitySelectBox: audioqualityselectbox_1.AudioQualitySelectBox,
    AudioTrackSelectBox: audiotrackselectbox_1.AudioTrackSelectBox,
    BufferingOverlay: bufferingoverlay_1.BufferingOverlay,
    Button: button_1.Button,
    CastStatusOverlay: caststatusoverlay_1.CastStatusOverlay,
    CastToggleButton: casttogglebutton_1.CastToggleButton,
    CastUIContainer: castuicontainer_1.CastUIContainer,
    ClickOverlay: clickoverlay_1.ClickOverlay,
    CloseButton: closebutton_1.CloseButton,
    Component: component_1.Component,
    Container: container_1.Container,
    ControlBar: controlbar_1.ControlBar,
    ErrorMessageOverlay: errormessageoverlay_1.ErrorMessageOverlay,
    FullscreenToggleButton: fullscreentogglebutton_1.FullscreenToggleButton,
    HugePlaybackToggleButton: hugeplaybacktogglebutton_1.HugePlaybackToggleButton,
    HugeReplayButton: hugereplaybutton_1.HugeReplayButton,
    Label: label_1.Label,
    MetadataLabel: metadatalabel_1.MetadataLabel,
    MetadataLabelContent: metadatalabel_1.MetadataLabelContent,
    PictureInPictureToggleButton: pictureinpicturetogglebutton_1.PictureInPictureToggleButton,
    PlaybackSpeedSelectBox: playbackspeedselectbox_1.PlaybackSpeedSelectBox,
    PlaybackTimeLabel: playbacktimelabel_1.PlaybackTimeLabel,
    PlaybackTimeLabelMode: playbacktimelabel_1.PlaybackTimeLabelMode,
    PlaybackToggleButton: playbacktogglebutton_1.PlaybackToggleButton,
    PlaybackToggleOverlay: playbacktoggleoverlay_1.PlaybackToggleOverlay,
    RecommendationOverlay: recommendationoverlay_1.RecommendationOverlay,
    SeekBar: seekbar_1.SeekBar,
    SeekBarLabel: seekbarlabel_1.SeekBarLabel,
    SelectBox: selectbox_1.SelectBox,
    SettingsPanel: settingspanel_1.SettingsPanel,
    SettingsPanelItem: settingspanel_1.SettingsPanelItem,
    SettingsToggleButton: settingstogglebutton_1.SettingsToggleButton,
    Spacer: spacer_1.Spacer,
    SubtitleOverlay: subtitleoverlay_1.SubtitleOverlay,
    SubtitleSelectBox: subtitleselectbox_1.SubtitleSelectBox,
    TitleBar: titlebar_1.TitleBar,
    ToggleButton: togglebutton_1.ToggleButton,
    UIContainer: uicontainer_1.UIContainer,
    VideoQualitySelectBox: videoqualityselectbox_1.VideoQualitySelectBox,
    VolumeControlButton: volumecontrolbutton_1.VolumeControlButton,
    VolumeSlider: volumeslider_1.VolumeSlider,
    VolumeToggleButton: volumetogglebutton_1.VolumeToggleButton,
    VRToggleButton: vrtogglebutton_1.VRToggleButton,
    Watermark: watermark_1.Watermark,
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(15);
var bitdash_controller_1 = __webpack_require__(57);
var bitdash_directive_1 = __webpack_require__(58);
var moduleName = 'mi.BitdashPlayer';
exports.default = angular.module(moduleName, [])
    .controller('MiBitdashController', bitdash_controller_1.default)
    .directive('miBitdashPlayer', bitdash_directive_1.default);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clickoverlay_1 = __webpack_require__(10);
/**
 * A simple click capture overlay for clickThroughUrls of ads.
 */
var AdClickOverlay = (function (_super) {
    __extends(AdClickOverlay, _super);
    function AdClickOverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdClickOverlay.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var clickThroughUrl = null;
        var clickThroughEnabled = !player.getConfig().advertising
            || !player.getConfig().advertising.hasOwnProperty('clickThroughEnabled')
            || player.getConfig().advertising.clickThroughEnabled;
        player.addEventHandler(player.EVENT.ON_AD_STARTED, function (event) {
            clickThroughUrl = event.clickThroughUrl;
            if (clickThroughEnabled) {
                _this.setUrl(clickThroughUrl);
            }
            else {
                // If click-through is disabled, we set the url to null to avoid it open
                _this.setUrl(null);
            }
        });
        // Clear click-through URL when ad has finished
        var adFinishedHandler = function () {
            _this.setUrl(null);
        };
        player.addEventHandler(player.EVENT.ON_AD_FINISHED, adFinishedHandler);
        player.addEventHandler(player.EVENT.ON_AD_SKIPPED, adFinishedHandler);
        player.addEventHandler(player.EVENT.ON_AD_ERROR, adFinishedHandler);
        this.onClick.subscribe(function () {
            // Pause the ad when overlay is clicked
            player.pause('ui-content-click');
            // Notify the player of the clicked ad
            player.fireEvent(player.EVENT.ON_AD_CLICKED, {
                clickThroughUrl: clickThroughUrl
            });
        });
    };
    return AdClickOverlay;
}(clickoverlay_1.ClickOverlay));
exports.AdClickOverlay = AdClickOverlay;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var label_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(1);
/**
 * A label that displays a message about a running ad, optionally with a countdown.
 */
var AdMessageLabel = (function (_super) {
    __extends(AdMessageLabel, _super);
    function AdMessageLabel(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-label-ad-message',
            text: 'This ad will end in {remainingTime} seconds.'
        }, _this.config);
        return _this;
    }
    AdMessageLabel.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var text = this.getConfig().text;
        var updateMessageHandler = function () {
            _this.setText(utils_1.StringUtils.replaceAdMessagePlaceholders(text, null, player));
        };
        var adStartHandler = function (event) {
            text = event.adMessage || text;
            updateMessageHandler();
            player.addEventHandler(player.EVENT.ON_TIME_CHANGED, updateMessageHandler);
            player.addEventHandler(player.EVENT.ON_CAST_TIME_UPDATED, updateMessageHandler);
        };
        var adEndHandler = function () {
            player.removeEventHandler(player.EVENT.ON_TIME_CHANGED, updateMessageHandler);
            player.removeEventHandler(player.EVENT.ON_CAST_TIME_UPDATED, updateMessageHandler);
        };
        player.addEventHandler(player.EVENT.ON_AD_STARTED, adStartHandler);
        player.addEventHandler(player.EVENT.ON_AD_SKIPPED, adEndHandler);
        player.addEventHandler(player.EVENT.ON_AD_ERROR, adEndHandler);
        player.addEventHandler(player.EVENT.ON_AD_FINISHED, adEndHandler);
    };
    return AdMessageLabel;
}(label_1.Label));
exports.AdMessageLabel = AdMessageLabel;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(1);
/**
 * A button that is displayed during ads and can be used to skip the ad.
 */
var AdSkipButton = (function (_super) {
    __extends(AdSkipButton, _super);
    function AdSkipButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-button-ad-skip',
            skipMessage: {
                countdown: 'Skip ad in {remainingTime}',
                skip: 'Skip ad'
            }
        }, _this.config);
        return _this;
    }
    AdSkipButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig(); // TODO get rid of generic cast
        var skipMessage = config.skipMessage;
        var adEvent = null;
        var updateSkipMessageHandler = function () {
            // Display this button only if ad is skippable
            if (adEvent.skipOffset) {
                _this.show();
            }
            else {
                _this.hide();
            }
            // Update the skip message on the button
            if (player.getCurrentTime() < adEvent.skipOffset) {
                _this.setText(utils_1.StringUtils.replaceAdMessagePlaceholders(config.skipMessage.countdown, adEvent.skipOffset, player));
            }
            else {
                _this.setText(config.skipMessage.skip);
            }
        };
        var adStartHandler = function (event) {
            adEvent = event;
            skipMessage = adEvent.skipMessage || skipMessage;
            updateSkipMessageHandler();
            player.addEventHandler(player.EVENT.ON_TIME_CHANGED, updateSkipMessageHandler);
            player.addEventHandler(player.EVENT.ON_CAST_TIME_UPDATED, updateSkipMessageHandler);
        };
        var adEndHandler = function () {
            player.removeEventHandler(player.EVENT.ON_TIME_CHANGED, updateSkipMessageHandler);
            player.removeEventHandler(player.EVENT.ON_CAST_TIME_UPDATED, updateSkipMessageHandler);
        };
        player.addEventHandler(player.EVENT.ON_AD_STARTED, adStartHandler);
        player.addEventHandler(player.EVENT.ON_AD_SKIPPED, adEndHandler);
        player.addEventHandler(player.EVENT.ON_AD_ERROR, adEndHandler);
        player.addEventHandler(player.EVENT.ON_AD_FINISHED, adEndHandler);
        this.onClick.subscribe(function () {
            // Try to skip the ad (this only works if it is skippable so we don't need to take extra care of that here)
            player.skipAd();
        });
    };
    return AdSkipButton;
}(button_1.Button));
exports.AdSkipButton = AdSkipButton;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
/**
 * A button that toggles Apple AirPlay.
 */
var AirPlayToggleButton = (function (_super) {
    __extends(AirPlayToggleButton, _super);
    function AirPlayToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-airplaytogglebutton',
            text: 'Apple AirPlay'
        }, _this.config);
        return _this;
    }
    AirPlayToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        if (!player.isAirplayAvailable) {
            // If the player does not support Airplay (player 7.0), we just hide this component and skip configuration
            this.hide();
            return;
        }
        this.onClick.subscribe(function () {
            if (player.isAirplayAvailable()) {
                player.showAirplayTargetPicker();
            }
            else {
                if (console) {
                    console.log('AirPlay unavailable');
                }
            }
        });
        var airPlayAvailableHandler = function () {
            if (player.isAirplayAvailable()) {
                _this.show();
            }
            else {
                _this.hide();
            }
        };
        player.addEventHandler(player.EVENT.ON_AIRPLAY_AVAILABLE, airPlayAvailableHandler);
        // Startup init
        airPlayAvailableHandler(); // Hide button if AirPlay is not available
    };
    return AirPlayToggleButton;
}(togglebutton_1.ToggleButton));
exports.AirPlayToggleButton = AirPlayToggleButton;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var component_1 = __webpack_require__(2);
/**
 * Overlays the player and displays an audio-only indicator.
 */
var AudioOnlyOverlay = (function (_super) {
    __extends(AudioOnlyOverlay, _super);
    function AudioOnlyOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.audioonly = [
            new component_1.Component({ tag: 'div', cssClass: 'ui-audioonly-overlay-indicator' })
        ];
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-audioonly-overlay',
            hidden: false,
            components: _this.audioonly
        }, _this.config);
        return _this;
    }
    AudioOnlyOverlay.prototype.configure = function (player, uimanager) {
        _super.prototype.configure.call(this, player, uimanager);
        var self = this;
    };
    return AudioOnlyOverlay;
}(container_1.Container));
exports.AudioOnlyOverlay = AudioOnlyOverlay;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var selectbox_1 = __webpack_require__(8);
/**
 * A select box providing a selection between available audio tracks (e.g. different languages).
 */
var AudioTrackSelectBox = (function (_super) {
    __extends(AudioTrackSelectBox, _super);
    function AudioTrackSelectBox(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    AudioTrackSelectBox.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var updateAudioTracks = function () {
            var audioTracks = player.getAvailableAudio();
            _this.clearItems();
            // Add audio tracks
            for (var _i = 0, audioTracks_1 = audioTracks; _i < audioTracks_1.length; _i++) {
                var audioTrack = audioTracks_1[_i];
                _this.addItem(audioTrack.id, audioTrack.label);
            }
        };
        this.onItemSelected.subscribe(function (sender, value) {
            player.setAudio(value);
        });
        var audioTrackHandler = function () {
            var currentAudioTrack = player.getAudio();
            // HLS streams don't always provide this, so we have to check
            if (currentAudioTrack) {
                _this.selectItem(currentAudioTrack.id);
            }
        };
        // Update selection when selected track has changed
        player.addEventHandler(player.EVENT.ON_AUDIO_CHANGED, audioTrackHandler);
        // Update tracks when source goes away
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, updateAudioTracks);
        // Update tracks when a new source is loaded
        player.addEventHandler(player.EVENT.ON_READY, updateAudioTracks);
        // Update tracks when a track is added or removed (since player 7.1.4)
        if (player.EVENT.ON_AUDIO_ADDED && player.EVENT.ON_AUDIO_REMOVED) {
            player.addEventHandler(player.EVENT.ON_AUDIO_ADDED, updateAudioTracks);
            player.addEventHandler(player.EVENT.ON_AUDIO_REMOVED, updateAudioTracks);
        }
        // Populate tracks at startup
        updateAudioTracks();
        // When `playback.audioLanguage` is set, the `ON_AUDIO_CHANGED` event for that change is triggered before the
        // UI is created. Therefore we need to set the audio track on configure.
        audioTrackHandler();
    };
    return AudioTrackSelectBox;
}(selectbox_1.SelectBox));
exports.AudioTrackSelectBox = AudioTrackSelectBox;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var component_1 = __webpack_require__(2);
var timeout_1 = __webpack_require__(9);
/**
 * Overlays the player and displays a buffering indicator.
 */
var BufferingOverlay = (function (_super) {
    __extends(BufferingOverlay, _super);
    function BufferingOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.indicators = [
            new component_1.Component({ tag: 'div', cssClass: 'ui-buffering-overlay-indicator' }),
            new component_1.Component({ tag: 'div', cssClass: 'ui-buffering-overlay-indicator' }),
            new component_1.Component({ tag: 'div', cssClass: 'ui-buffering-overlay-indicator' }),
        ];
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-buffering-overlay',
            hidden: true,
            components: _this.indicators,
            showDelayMs: 1000,
        }, _this.config);
        return _this;
    }
    BufferingOverlay.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        var overlayShowTimeout = new timeout_1.Timeout(config.showDelayMs, function () {
            _this.show();
        });
        var showOverlay = function () {
            overlayShowTimeout.start();
        };
        var hideOverlay = function () {
            overlayShowTimeout.clear();
            _this.hide();
        };
        player.addEventHandler(player.EVENT.ON_STALL_STARTED, showOverlay);
        player.addEventHandler(player.EVENT.ON_STALL_ENDED, hideOverlay);
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, hideOverlay);
        // Show overlay if player is already stalled at init
        if (player.isStalled()) {
            this.show();
        }
    };
    return BufferingOverlay;
}(container_1.Container));
exports.BufferingOverlay = BufferingOverlay;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var label_1 = __webpack_require__(4);
/**
 * Overlays the player and displays the status of a Cast session.
 */
var CastStatusOverlay = (function (_super) {
    __extends(CastStatusOverlay, _super);
    function CastStatusOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.statusLabel = new label_1.Label({ cssClass: 'ui-cast-status-label' });
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-cast-status-overlay',
            components: [_this.statusLabel],
            hidden: true
        }, _this.config);
        return _this;
    }
    CastStatusOverlay.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        player.addEventHandler(player.EVENT.ON_CAST_WAITING_FOR_DEVICE, function (event) {
            _this.show();
            // Get device name and update status text while connecting
            var castDeviceName = event.castPayload.deviceName;
            _this.statusLabel.setText("Connecting to <strong>" + castDeviceName + "</strong>...");
        });
        player.addEventHandler(player.EVENT.ON_CAST_STARTED, function (event) {
            // Session is started or resumed
            // For cases when a session is resumed, we do not receive the previous events and therefore show the status panel
            // here too
            _this.show();
            var castDeviceName = event.deviceName;
            _this.statusLabel.setText("Playing on <strong>" + castDeviceName + "</strong>");
        });
        player.addEventHandler(player.EVENT.ON_CAST_STOPPED, function (event) {
            // Cast session gone, hide the status panel
            _this.hide();
        });
    };
    return CastStatusOverlay;
}(container_1.Container));
exports.CastStatusOverlay = CastStatusOverlay;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
/**
 * A button that toggles casting to a Cast receiver.
 */
var CastToggleButton = (function (_super) {
    __extends(CastToggleButton, _super);
    function CastToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-casttogglebutton',
            text: 'Google Cast'
        }, _this.config);
        return _this;
    }
    CastToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        this.onClick.subscribe(function () {
            if (player.isCastAvailable()) {
                if (player.isCasting()) {
                    player.castStop();
                }
                else {
                    player.castVideo();
                }
            }
            else {
                if (console) {
                    console.log('Cast unavailable');
                }
            }
        });
        var castAvailableHander = function () {
            if (player.isCastAvailable()) {
                _this.show();
            }
            else {
                _this.hide();
            }
        };
        player.addEventHandler(player.EVENT.ON_CAST_AVAILABLE, castAvailableHander);
        // Toggle button 'on' state
        player.addEventHandler(player.EVENT.ON_CAST_WAITING_FOR_DEVICE, function () {
            _this.on();
        });
        player.addEventHandler(player.EVENT.ON_CAST_STARTED, function () {
            // When a session is resumed, there is no ON_CAST_START event, so we also need to toggle here for such cases
            _this.on();
        });
        player.addEventHandler(player.EVENT.ON_CAST_STOPPED, function () {
            _this.off();
        });
        // Startup init
        castAvailableHander(); // Hide button if Cast not available
        if (player.isCasting()) {
            this.on();
        }
    };
    return CastToggleButton;
}(togglebutton_1.ToggleButton));
exports.CastToggleButton = CastToggleButton;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var uicontainer_1 = __webpack_require__(14);
var timeout_1 = __webpack_require__(9);
/**
 * The base container for Cast receivers that contains all of the UI and takes care that the UI is shown on
 * certain playback events.
 */
var CastUIContainer = (function (_super) {
    __extends(CastUIContainer, _super);
    function CastUIContainer(config) {
        return _super.call(this, config) || this;
    }
    CastUIContainer.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        /*
         * Show UI on Cast devices at certain playback events
         *
         * Since a Cast receiver does not have a direct HCI, we show the UI on certain playback events to give the user
         * a chance to see on the screen what's going on, e.g. on play/pause or a seek the UI is shown and the user can
         * see the current time and position on the seek bar.
         * The UI is shown permanently while playback is paused, otherwise hides automatically after the configured
         * hide delay time.
         */
        var isUiShown = false;
        var hideUi = function () {
            uimanager.onControlsHide.dispatch(_this);
            isUiShown = false;
        };
        this.castUiHideTimeout = new timeout_1.Timeout(config.hideDelay, hideUi);
        var showUi = function () {
            if (!isUiShown) {
                uimanager.onControlsShow.dispatch(_this);
                isUiShown = true;
            }
        };
        var showUiPermanently = function () {
            showUi();
            _this.castUiHideTimeout.clear();
        };
        var showUiWithTimeout = function () {
            showUi();
            _this.castUiHideTimeout.start();
        };
        var showUiAfterSeek = function () {
            if (player.isPlaying()) {
                showUiWithTimeout();
            }
            else {
                showUiPermanently();
            }
        };
        player.addEventHandler(player.EVENT.ON_READY, showUiWithTimeout);
        player.addEventHandler(player.EVENT.ON_SOURCE_LOADED, showUiWithTimeout);
        player.addEventHandler(player.EVENT.ON_PLAY, showUiWithTimeout);
        player.addEventHandler(player.EVENT.ON_PAUSED, showUiPermanently);
        player.addEventHandler(player.EVENT.ON_SEEK, showUiPermanently);
        player.addEventHandler(player.EVENT.ON_SEEKED, showUiAfterSeek);
    };
    CastUIContainer.prototype.release = function () {
        _super.prototype.release.call(this);
        this.castUiHideTimeout.clear();
    };
    return CastUIContainer;
}(uicontainer_1.UIContainer));
exports.CastUIContainer = CastUIContainer;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(7);
/**
 * A button that closes (hides) a configured component.
 */
var CloseButton = (function (_super) {
    __extends(CloseButton, _super);
    function CloseButton(config) {
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-closebutton',
            text: 'Close'
        }, _this.config);
        return _this;
    }
    CloseButton.prototype.configure = function (player, uimanager) {
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        this.onClick.subscribe(function () {
            config.target.hide();
        });
    };
    return CloseButton;
}(button_1.Button));
exports.CloseButton = CloseButton;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
/**
 * A button that toggles the player between windowed and fullscreen view.
 */
var FullscreenToggleButton = (function (_super) {
    __extends(FullscreenToggleButton, _super);
    function FullscreenToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-fullscreentogglebutton',
            text: 'Fullscreen'
        }, _this.config);
        return _this;
    }
    FullscreenToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var fullscreenStateHandler = function () {
            if (player.isFullscreen()) {
                _this.on();
            }
            else {
                _this.off();
            }
        };
        player.addEventHandler(player.EVENT.ON_FULLSCREEN_ENTER, fullscreenStateHandler);
        player.addEventHandler(player.EVENT.ON_FULLSCREEN_EXIT, fullscreenStateHandler);
        this.onClick.subscribe(function () {
            if (player.isFullscreen()) {
                player.exitFullscreen();
            }
            else {
                player.enterFullscreen();
            }
        });
        // Startup init
        fullscreenStateHandler();
    };
    return FullscreenToggleButton;
}(togglebutton_1.ToggleButton));
exports.FullscreenToggleButton = FullscreenToggleButton;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(2);
var eventdispatcher_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(1);
var ListSelector = (function (_super) {
    __extends(ListSelector, _super);
    function ListSelector(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.listSelectorEvents = {
            onItemAdded: new eventdispatcher_1.EventDispatcher(),
            onItemRemoved: new eventdispatcher_1.EventDispatcher(),
            onItemSelected: new eventdispatcher_1.EventDispatcher()
        };
        _this.config = _this.mergeConfig(config, {
            items: [],
            cssClass: 'ui-listselector'
        }, _this.config);
        _this.items = _this.config.items;
        return _this;
    }
    ListSelector.prototype.getItemIndex = function (key) {
        for (var index in this.items) {
            if (key === this.items[index].key) {
                return parseInt(index);
            }
        }
        return -1;
    };
    /**
     * Checks if the specified item is part of this selector.
     * @param key the key of the item to check
     * @returns {boolean} true if the item is part of this selector, else false
     */
    ListSelector.prototype.hasItem = function (key) {
        return this.getItemIndex(key) > -1;
    };
    /**
     * Adds an item to this selector by appending it to the end of the list of items. If an item with the specified
     * key already exists, it is replaced.
     * @param key the key of the item to add
     * @param label the (human-readable) label of the item to add
     */
    ListSelector.prototype.addItem = function (key, label) {
        this.removeItem(key); // Try to remove key first to get overwrite behavior and avoid duplicate keys
        this.items.push({ key: key, label: label });
        this.onItemAddedEvent(key);
    };
    /**
     * Removes an item from this selector.
     * @param key the key of the item to remove
     * @returns {boolean} true if removal was successful, false if the item is not part of this selector
     */
    ListSelector.prototype.removeItem = function (key) {
        var index = this.getItemIndex(key);
        if (index > -1) {
            utils_1.ArrayUtils.remove(this.items, this.items[index]);
            this.onItemRemovedEvent(key);
            return true;
        }
        return false;
    };
    /**
     * Selects an item from the items in this selector.
     * @param key the key of the item to select
     * @returns {boolean} true is the selection was successful, false if the selected item is not part of the selector
     */
    ListSelector.prototype.selectItem = function (key) {
        if (key === this.selectedItem) {
            // itemConfig is already selected, suppress any further action
            return true;
        }
        var index = this.getItemIndex(key);
        if (index > -1) {
            this.selectedItem = key;
            this.onItemSelectedEvent(key);
            return true;
        }
        return false;
    };
    /**
     * Returns the key of the selected item.
     * @returns {string} the key of the selected item or null if no item is selected
     */
    ListSelector.prototype.getSelectedItem = function () {
        return this.selectedItem;
    };
    /**
     * Removes all items from this selector.
     */
    ListSelector.prototype.clearItems = function () {
        var items = this.items; // local copy for iteration after clear
        this.items = []; // clear items
        // fire events
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.onItemRemovedEvent(item.key);
        }
    };
    /**
     * Returns the number of items in this selector.
     * @returns {number}
     */
    ListSelector.prototype.itemCount = function () {
        return Object.keys(this.items).length;
    };
    ListSelector.prototype.onItemAddedEvent = function (key) {
        this.listSelectorEvents.onItemAdded.dispatch(this, key);
    };
    ListSelector.prototype.onItemRemovedEvent = function (key) {
        this.listSelectorEvents.onItemRemoved.dispatch(this, key);
    };
    ListSelector.prototype.onItemSelectedEvent = function (key) {
        this.listSelectorEvents.onItemSelected.dispatch(this, key);
    };
    Object.defineProperty(ListSelector.prototype, "onItemAdded", {
        /**
         * Gets the event that is fired when an item is added to the list of items.
         * @returns {Event<ListSelector<Config>, string>}
         */
        get: function () {
            return this.listSelectorEvents.onItemAdded.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListSelector.prototype, "onItemRemoved", {
        /**
         * Gets the event that is fired when an item is removed from the list of items.
         * @returns {Event<ListSelector<Config>, string>}
         */
        get: function () {
            return this.listSelectorEvents.onItemRemoved.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListSelector.prototype, "onItemSelected", {
        /**
         * Gets the event that is fired when an item is selected from the list of items.
         * @returns {Event<ListSelector<Config>, string>}
         */
        get: function () {
            return this.listSelectorEvents.onItemSelected.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    return ListSelector;
}(component_1.Component));
exports.ListSelector = ListSelector;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
/**
 * A button that toggles Apple macOS picture-in-picture mode.
 */
var PictureInPictureToggleButton = (function (_super) {
    __extends(PictureInPictureToggleButton, _super);
    function PictureInPictureToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-piptogglebutton',
            text: 'Picture-in-Picture'
        }, _this.config);
        return _this;
    }
    PictureInPictureToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        if (!player.isPictureInPictureAvailable) {
            // If the player does not support PIP (player 7.0), we just hide this component and skip configuration
            this.hide();
            return;
        }
        this.onClick.subscribe(function () {
            if (player.isPictureInPictureAvailable()) {
                if (player.isPictureInPicture()) {
                    player.exitPictureInPicture();
                }
                else {
                    player.enterPictureInPicture();
                }
            }
            else {
                if (console) {
                    console.log('PIP unavailable');
                }
            }
        });
        var pipAvailableHander = function () {
            if (player.isPictureInPictureAvailable()) {
                _this.show();
            }
            else {
                _this.hide();
            }
        };
        player.addEventHandler(player.EVENT.ON_READY, pipAvailableHander);
        // Toggle button 'on' state
        player.addEventHandler(player.EVENT.ON_PICTURE_IN_PICTURE_ENTER, function () {
            _this.on();
        });
        player.addEventHandler(player.EVENT.ON_PICTURE_IN_PICTURE_EXIT, function () {
            _this.off();
        });
        // Startup init
        pipAvailableHander(); // Hide button if PIP not available
        if (player.isPictureInPicture()) {
            this.on();
        }
    };
    return PictureInPictureToggleButton;
}(togglebutton_1.ToggleButton));
exports.PictureInPictureToggleButton = PictureInPictureToggleButton;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var selectbox_1 = __webpack_require__(8);
/**
 * A select box providing a selection of different playback speeds.
 */
var PlaybackSpeedSelectBox = (function (_super) {
    __extends(PlaybackSpeedSelectBox, _super);
    function PlaybackSpeedSelectBox(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    PlaybackSpeedSelectBox.prototype.configure = function (player, uimanager) {
        _super.prototype.configure.call(this, player, uimanager);
        this.addItem('0.25', '0.25x');
        this.addItem('0.5', '0.5x');
        this.addItem('1', 'Normal');
        this.addItem('1.5', '1.5x');
        this.addItem('2', '2x');
        this.selectItem('1');
        this.onItemSelected.subscribe(function (sender, value) {
            player.setPlaybackSpeed(parseFloat(value));
        });
    };
    return PlaybackSpeedSelectBox;
}(selectbox_1.SelectBox));
exports.PlaybackSpeedSelectBox = PlaybackSpeedSelectBox;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var component_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(1);
var hugereplaybutton_1 = __webpack_require__(19);
/**
 * Overlays the player and displays recommended videos.
 */
var RecommendationOverlay = (function (_super) {
    __extends(RecommendationOverlay, _super);
    function RecommendationOverlay(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.replayButton = new hugereplaybutton_1.HugeReplayButton();
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-recommendation-overlay',
            hidden: true,
            components: [_this.replayButton]
        }, _this.config);
        return _this;
    }
    RecommendationOverlay.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var clearRecommendations = function () {
            for (var _i = 0, _a = _this.getComponents(); _i < _a.length; _i++) {
                var component = _a[_i];
                if (component instanceof RecommendationItem) {
                    _this.removeComponent(component);
                }
            }
            _this.updateComponents();
            _this.getDomElement().removeClass(_this.prefixCss('recommendations'));
        };
        var setupRecommendations = function () {
            clearRecommendations();
            var hasRecommendationsInUiConfig = uimanager.getConfig().recommendations
                && uimanager.getConfig().recommendations.length > 0;
            var hasRecommendationsInPlayerConfig = player.getConfig().source && player.getConfig().source.recommendations
                && player.getConfig().source.recommendations.length > 0;
            // Take markers from the UI config. If no markers defined, try to take them from the player's source config.
            var recommendations = hasRecommendationsInUiConfig ? uimanager.getConfig().recommendations :
                hasRecommendationsInPlayerConfig ? player.getConfig().source.recommendations : null;
            // Generate timeline markers from the config if we have markers and if we have a duration
            // The duration check is for buggy platforms where the duration is not available instantly (Chrome on Android 4.3)
            if (recommendations) {
                var index = 1;
                for (var _i = 0, recommendations_1 = recommendations; _i < recommendations_1.length; _i++) {
                    var item = recommendations_1[_i];
                    _this.addComponent(new RecommendationItem({
                        itemConfig: item,
                        cssClasses: ['recommendation-item-' + (index++)]
                    }));
                }
                _this.updateComponents(); // create container DOM elements
                _this.getDomElement().addClass(_this.prefixCss('recommendations'));
            }
        };
        // Add recommendation when a source is loaded
        player.addEventHandler(player.EVENT.ON_READY, setupRecommendations);
        // Remove recommendations and hide overlay when source is unloaded
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, function () {
            clearRecommendations();
            _this.hide();
        });
        // Display recommendations when playback has finished
        player.addEventHandler(player.EVENT.ON_PLAYBACK_FINISHED, function () {
            // Dismiss ON_PLAYBACK_FINISHED events at the end of ads
            // TODO remove this workaround once issue #1278 is solved
            if (player.isAd()) {
                return;
            }
            _this.show();
        });
        // Hide recommendations when playback starts, e.g. a restart
        player.addEventHandler(player.EVENT.ON_PLAY, function () {
            _this.hide();
        });
        // Init on startup
        setupRecommendations();
    };
    return RecommendationOverlay;
}(container_1.Container));
exports.RecommendationOverlay = RecommendationOverlay;
/**
 * An item of the {@link RecommendationOverlay}. Used only internally in {@link RecommendationOverlay}.
 */
var RecommendationItem = (function (_super) {
    __extends(RecommendationItem, _super);
    function RecommendationItem(config) {
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-recommendation-item',
            itemConfig: null // this must be passed in from outside
        }, _this.config);
        return _this;
    }
    RecommendationItem.prototype.toDomElement = function () {
        var config = this.config.itemConfig; // TODO fix generics and get rid of cast
        var itemElement = new dom_1.DOM('a', {
            'id': this.config.id,
            'class': this.getCssClasses(),
            'href': config.url
        }).css({ 'background-image': "url(" + config.thumbnail + ")" });
        var bgElement = new dom_1.DOM('div', {
            'class': this.prefixCss('background')
        });
        itemElement.append(bgElement);
        var titleElement = new dom_1.DOM('span', {
            'class': this.prefixCss('title')
        }).append(new dom_1.DOM('span', {
            'class': this.prefixCss('innertitle')
        }).html(config.title));
        itemElement.append(titleElement);
        var timeElement = new dom_1.DOM('span', {
            'class': this.prefixCss('duration')
        }).append(new dom_1.DOM('span', {
            'class': this.prefixCss('innerduration')
        }).html(config.duration ? utils_1.StringUtils.secondsToTime(config.duration) : ''));
        itemElement.append(timeElement);
        return itemElement;
    };
    return RecommendationItem;
}(component_1.Component));


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var label_1 = __webpack_require__(4);
var videoqualityselectbox_1 = __webpack_require__(26);
var audioqualityselectbox_1 = __webpack_require__(16);
var timeout_1 = __webpack_require__(9);
var eventdispatcher_1 = __webpack_require__(6);
/**
 * A panel containing a list of {@link SettingsPanelItem items} that represent labelled settings.
 */
var SettingsPanel = (function (_super) {
    __extends(SettingsPanel, _super);
    function SettingsPanel(config) {
        var _this = _super.call(this, config) || this;
        _this.settingsPanelEvents = {
            onSettingsStateChanged: new eventdispatcher_1.EventDispatcher()
        };
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-settings-panel',
            hideDelay: 3000
        }, _this.config);
        return _this;
    }
    SettingsPanel.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig(); // TODO fix generics type inference
        if (config.hideDelay > -1) {
            this.hideTimeout = new timeout_1.Timeout(config.hideDelay, function () {
                _this.hide();
            });
            this.onShow.subscribe(function () {
                // Activate timeout when shown
                _this.hideTimeout.start();
            });
            this.getDomElement().on('mouseenter', function () {
                // On mouse enter clear the timeout
                _this.hideTimeout.clear();
            });
            this.getDomElement().on('mouseleave', function () {
                // On mouse leave activate the timeout
                _this.hideTimeout.reset();
            });
            this.onHide.subscribe(function () {
                // Clear timeout when hidden from outside
                _this.hideTimeout.clear();
            });
        }
        // Fire event when the state of a settings-item has changed
        var settingsStateChangedHandler = function () {
            _this.onSettingsStateChangedEvent();
            // Attach marker class to last visible item
            var lastShownItem = null;
            for (var _i = 0, _a = _this.getItems(); _i < _a.length; _i++) {
                var component = _a[_i];
                if (component instanceof SettingsPanelItem) {
                    component.getDomElement().removeClass(_this.prefixCss(SettingsPanel.CLASS_LAST));
                    if (component.isShown()) {
                        lastShownItem = component;
                    }
                }
            }
            if (lastShownItem) {
                lastShownItem.getDomElement().addClass(_this.prefixCss(SettingsPanel.CLASS_LAST));
            }
        };
        for (var _i = 0, _a = this.getItems(); _i < _a.length; _i++) {
            var component = _a[_i];
            if (component instanceof SettingsPanelItem) {
                component.onActiveChanged.subscribe(settingsStateChangedHandler);
            }
        }
    };
    SettingsPanel.prototype.release = function () {
        _super.prototype.release.call(this);
        if (this.hideTimeout) {
            this.hideTimeout.clear();
        }
    };
    /**
     * Checks if there are active settings within this settings panel. An active setting is a setting that is visible
     * and enabled, which the user can interact with.
     * @returns {boolean} true if there are active settings, false if the panel is functionally empty to a user
     */
    SettingsPanel.prototype.hasActiveSettings = function () {
        for (var _i = 0, _a = this.getItems(); _i < _a.length; _i++) {
            var component = _a[_i];
            if (component.isActive()) {
                return true;
            }
        }
        return false;
    };
    SettingsPanel.prototype.getItems = function () {
        return this.config.components;
    };
    SettingsPanel.prototype.onSettingsStateChangedEvent = function () {
        this.settingsPanelEvents.onSettingsStateChanged.dispatch(this);
    };
    Object.defineProperty(SettingsPanel.prototype, "onSettingsStateChanged", {
        /**
         * Gets the event that is fired when one or more {@link SettingsPanelItem items} have changed state.
         * @returns {Event<SettingsPanel, NoArgs>}
         */
        get: function () {
            return this.settingsPanelEvents.onSettingsStateChanged.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    return SettingsPanel;
}(container_1.Container));
SettingsPanel.CLASS_LAST = 'last';
exports.SettingsPanel = SettingsPanel;
/**
 * An item for a {@link SettingsPanel}, containing a {@link Label} and a component that configures a setting.
 * Supported setting components: {@link SelectBox}
 */
var SettingsPanelItem = (function (_super) {
    __extends(SettingsPanelItem, _super);
    function SettingsPanelItem(label, selectBox, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.settingsPanelItemEvents = {
            onActiveChanged: new eventdispatcher_1.EventDispatcher()
        };
        _this.label = new label_1.Label({ text: label });
        _this.setting = selectBox;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-settings-panel-item',
            components: [_this.label, _this.setting]
        }, _this.config);
        return _this;
    }
    SettingsPanelItem.prototype.configure = function (player, uimanager) {
        var _this = this;
        var handleConfigItemChanged = function () {
            // The minimum number of items that must be available for the setting to be displayed
            // By default, at least two items must be available, else a selection is not possible
            var minItemsToDisplay = 2;
            // Audio/video quality select boxes contain an additional 'auto' mode, which in combination with a single
            // available quality also does not make sense
            if (_this.setting instanceof videoqualityselectbox_1.VideoQualitySelectBox || _this.setting instanceof audioqualityselectbox_1.AudioQualitySelectBox) {
                minItemsToDisplay = 3;
            }
            // Hide the setting if no meaningful choice is available
            if (_this.setting.itemCount() < minItemsToDisplay) {
                _this.hide();
            }
            else {
                _this.show();
            }
            // Visibility might have changed and therefore the active state might have changed so we fire the event
            // TODO fire only when state has really changed (e.g. check if visibility has really changed)
            _this.onActiveChangedEvent();
        };
        this.setting.onItemAdded.subscribe(handleConfigItemChanged);
        this.setting.onItemRemoved.subscribe(handleConfigItemChanged);
        // Initialize hidden state
        handleConfigItemChanged();
    };
    /**
     * Checks if this settings panel item is active, i.e. visible and enabled and a user can interact with it.
     * @returns {boolean} true if the panel is active, else false
     */
    SettingsPanelItem.prototype.isActive = function () {
        return this.isShown();
    };
    SettingsPanelItem.prototype.onActiveChangedEvent = function () {
        this.settingsPanelItemEvents.onActiveChanged.dispatch(this);
    };
    Object.defineProperty(SettingsPanelItem.prototype, "onActiveChanged", {
        /**
         * Gets the event that is fired when the 'active' state of this item changes.
         * @see #isActive
         * @returns {Event<SettingsPanelItem, NoArgs>}
         */
        get: function () {
            return this.settingsPanelItemEvents.onActiveChanged.getEvent();
        },
        enumerable: true,
        configurable: true
    });
    return SettingsPanelItem;
}(container_1.Container));
exports.SettingsPanelItem = SettingsPanelItem;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
/**
 * A button that toggles visibility of a settings panel.
 */
var SettingsToggleButton = (function (_super) {
    __extends(SettingsToggleButton, _super);
    function SettingsToggleButton(config) {
        var _this = _super.call(this, config) || this;
        if (!config.settingsPanel) {
            throw new Error('Required SettingsPanel is missing');
        }
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-settingstogglebutton',
            text: 'Settings',
            settingsPanel: null,
            autoHideWhenNoActiveSettings: true
        }, _this.config);
        return _this;
    }
    SettingsToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig(); // TODO fix generics type inference
        var settingsPanel = config.settingsPanel;
        this.onClick.subscribe(function () {
            settingsPanel.toggleHidden();
        });
        settingsPanel.onShow.subscribe(function () {
            // Set toggle status to on when the settings panel shows
            _this.on();
        });
        settingsPanel.onHide.subscribe(function () {
            // Set toggle status to off when the settings panel hides
            _this.off();
        });
        // Handle automatic hiding of the button if there are no settings for the user to interact with
        if (config.autoHideWhenNoActiveSettings) {
            // Setup handler to show/hide button when the settings change
            var settingsPanelItemsChangedHandler = function () {
                if (settingsPanel.hasActiveSettings()) {
                    if (_this.isHidden()) {
                        _this.show();
                    }
                }
                else {
                    if (_this.isShown()) {
                        _this.hide();
                    }
                }
            };
            // Wire the handler to the event
            settingsPanel.onSettingsStateChanged.subscribe(settingsPanelItemsChangedHandler);
            // Call handler for first init at startup
            settingsPanelItemsChangedHandler();
        }
    };
    return SettingsToggleButton;
}(togglebutton_1.ToggleButton));
exports.SettingsToggleButton = SettingsToggleButton;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var selectbox_1 = __webpack_require__(8);
/**
 * A select box providing a selection between available subtitle and caption tracks.
 */
var SubtitleSelectBox = (function (_super) {
    __extends(SubtitleSelectBox, _super);
    function SubtitleSelectBox(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    SubtitleSelectBox.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var updateSubtitles = function () {
            _this.clearItems();
            for (var _i = 0, _a = player.getAvailableSubtitles(); _i < _a.length; _i++) {
                var subtitle = _a[_i];
                _this.addItem(subtitle.id, subtitle.label);
            }
        };
        this.onItemSelected.subscribe(function (sender, value) {
            player.setSubtitle(value === 'null' ? null : value);
        });
        // React to API events
        player.addEventHandler(player.EVENT.ON_SUBTITLE_ADDED, function (event) {
            _this.addItem(event.subtitle.id, event.subtitle.label);
        });
        player.addEventHandler(player.EVENT.ON_SUBTITLE_CHANGED, function (event) {
            _this.selectItem(event.targetSubtitle.id);
        });
        player.addEventHandler(player.EVENT.ON_SUBTITLE_REMOVED, function (event) {
            _this.removeItem(event.subtitleId);
        });
        // Update subtitles when source goes away
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, updateSubtitles);
        // Update subtitles when a new source is loaded
        player.addEventHandler(player.EVENT.ON_READY, updateSubtitles);
        // Populate subtitles at startup
        updateSubtitles();
    };
    return SubtitleSelectBox;
}(selectbox_1.SelectBox));
exports.SubtitleSelectBox = SubtitleSelectBox;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(0);
var metadatalabel_1 = __webpack_require__(20);
/**
 * Displays a title bar containing a label with the title of the video.
 */
var TitleBar = (function (_super) {
    __extends(TitleBar, _super);
    function TitleBar(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-titlebar',
            hidden: true,
            components: [
                new metadatalabel_1.MetadataLabel({ content: metadatalabel_1.MetadataLabelContent.Title }),
                new metadatalabel_1.MetadataLabel({ content: metadatalabel_1.MetadataLabelContent.Description })
            ],
            keepHiddenWithoutMetadata: false,
        }, _this.config);
        return _this;
    }
    TitleBar.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var config = this.getConfig();
        var shouldBeShown = !this.isHidden();
        var hasMetadataText = true; // Flag to track if any metadata label contains text
        var checkMetadataTextAndUpdateVisibility = function () {
            hasMetadataText = false;
            // Iterate through metadata labels and check if at least one of them contains text
            for (var _i = 0, _a = _this.getComponents(); _i < _a.length; _i++) {
                var component = _a[_i];
                if (component instanceof metadatalabel_1.MetadataLabel) {
                    if (!component.isEmpty()) {
                        hasMetadataText = true;
                        break;
                    }
                }
            }
            if (_this.isShown()) {
                // Hide a visible titlebar if it does not contain any text and the hidden flag is set
                if (config.keepHiddenWithoutMetadata && !hasMetadataText) {
                    _this.hide();
                }
            }
            else if (shouldBeShown) {
                // Show a hidden titlebar if it should actually be shown
                _this.show();
            }
        };
        // Listen to text change events to update the hasMetadataText flag when the metadata dynamically changes
        for (var _i = 0, _a = this.getComponents(); _i < _a.length; _i++) {
            var component = _a[_i];
            if (component instanceof metadatalabel_1.MetadataLabel) {
                component.onTextChanged.subscribe(checkMetadataTextAndUpdateVisibility);
            }
        }
        uimanager.onControlsShow.subscribe(function () {
            shouldBeShown = true;
            if (!(config.keepHiddenWithoutMetadata && !hasMetadataText)) {
                _this.show();
            }
        });
        uimanager.onControlsHide.subscribe(function () {
            shouldBeShown = false;
            _this.hide();
        });
        // init
        checkMetadataTextAndUpdateVisibility();
    };
    return TitleBar;
}(container_1.Container));
exports.TitleBar = TitleBar;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(3);
/**
 * Animated analog TV static noise.
 */
var TvNoiseCanvas = (function (_super) {
    __extends(TvNoiseCanvas, _super);
    function TvNoiseCanvas(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.canvasWidth = 160;
        _this.canvasHeight = 90;
        _this.interferenceHeight = 50;
        _this.lastFrameUpdate = 0;
        _this.frameInterval = 60;
        _this.useAnimationFrame = !!window.requestAnimationFrame;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-tvnoisecanvas'
        }, _this.config);
        return _this;
    }
    TvNoiseCanvas.prototype.toDomElement = function () {
        return this.canvas = new dom_1.DOM('canvas', { 'class': this.getCssClasses() });
    };
    TvNoiseCanvas.prototype.start = function () {
        this.canvasElement = this.canvas.getElements()[0];
        this.canvasContext = this.canvasElement.getContext('2d');
        this.noiseAnimationWindowPos = -this.canvasHeight;
        this.lastFrameUpdate = 0;
        this.canvasElement.width = this.canvasWidth;
        this.canvasElement.height = this.canvasHeight;
        this.renderFrame();
    };
    TvNoiseCanvas.prototype.stop = function () {
        if (this.useAnimationFrame) {
            cancelAnimationFrame(this.frameUpdateHandlerId);
        }
        else {
            clearTimeout(this.frameUpdateHandlerId);
        }
    };
    TvNoiseCanvas.prototype.renderFrame = function () {
        // This code has been copied from the player controls.js and simplified
        if (this.lastFrameUpdate + this.frameInterval > new Date().getTime()) {
            // It's too early to render the next frame
            this.scheduleNextRender();
            return;
        }
        var currentPixelOffset;
        var canvasWidth = this.canvasWidth;
        var canvasHeight = this.canvasHeight;
        // Create texture
        var noiseImage = this.canvasContext.createImageData(canvasWidth, canvasHeight);
        // Fill texture with noise
        for (var y = 0; y < canvasHeight; y++) {
            for (var x = 0; x < canvasWidth; x++) {
                currentPixelOffset = (canvasWidth * y * 4) + x * 4;
                noiseImage.data[currentPixelOffset] = Math.random() * 255;
                if (y < this.noiseAnimationWindowPos || y > this.noiseAnimationWindowPos + this.interferenceHeight) {
                    noiseImage.data[currentPixelOffset] *= 0.85;
                }
                noiseImage.data[currentPixelOffset + 1] = noiseImage.data[currentPixelOffset];
                noiseImage.data[currentPixelOffset + 2] = noiseImage.data[currentPixelOffset];
                noiseImage.data[currentPixelOffset + 3] = 50;
            }
        }
        // Put texture onto canvas
        this.canvasContext.putImageData(noiseImage, 0, 0);
        this.lastFrameUpdate = new Date().getTime();
        this.noiseAnimationWindowPos += 7;
        if (this.noiseAnimationWindowPos > canvasHeight) {
            this.noiseAnimationWindowPos = -canvasHeight;
        }
        this.scheduleNextRender();
    };
    TvNoiseCanvas.prototype.scheduleNextRender = function () {
        if (this.useAnimationFrame) {
            this.frameUpdateHandlerId = window.requestAnimationFrame(this.renderFrame.bind(this));
        }
        else {
            this.frameUpdateHandlerId = setTimeout(this.renderFrame.bind(this), this.frameInterval);
        }
    };
    return TvNoiseCanvas;
}(component_1.Component));
exports.TvNoiseCanvas = TvNoiseCanvas;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var togglebutton_1 = __webpack_require__(5);
/**
 * A button that toggles the video view between normal/mono and VR/stereo.
 */
var VRToggleButton = (function (_super) {
    __extends(VRToggleButton, _super);
    function VRToggleButton(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-vrtogglebutton',
            text: 'VR'
        }, _this.config);
        return _this;
    }
    VRToggleButton.prototype.configure = function (player, uimanager) {
        var _this = this;
        _super.prototype.configure.call(this, player, uimanager);
        var isVRConfigured = function () {
            // VR availability cannot be checked through getVRStatus() because it is asynchronously populated and not
            // available at UI initialization. As an alternative, we check the VR settings in the config.
            // TODO use getVRStatus() through isVRStereoAvailable() once the player has been rewritten and the status is
            // available in ON_READY
            var config = player.getConfig();
            return config.source && config.source.vr && config.source.vr.contentType !== 'none';
        };
        var isVRStereoAvailable = function () {
            return player.getVRStatus().contentType !== 'none';
        };
        var vrStateHandler = function () {
            if (isVRConfigured() && isVRStereoAvailable()) {
                _this.show(); // show button in case it is hidden
                if (player.getVRStatus().isStereo) {
                    _this.on();
                }
                else {
                    _this.off();
                }
            }
            else {
                _this.hide(); // hide button if no stereo mode available
            }
        };
        var vrButtonVisibilityHandler = function () {
            if (isVRConfigured()) {
                _this.show();
            }
            else {
                _this.hide();
            }
        };
        player.addEventHandler(player.EVENT.ON_VR_MODE_CHANGED, vrStateHandler);
        player.addEventHandler(player.EVENT.ON_VR_STEREO_CHANGED, vrStateHandler);
        player.addEventHandler(player.EVENT.ON_VR_ERROR, vrStateHandler);
        // Hide button when VR source goes away
        player.addEventHandler(player.EVENT.ON_SOURCE_UNLOADED, vrButtonVisibilityHandler);
        // Show button when a new source is loaded and it's VR
        player.addEventHandler(player.EVENT.ON_READY, vrButtonVisibilityHandler);
        this.onClick.subscribe(function () {
            if (!isVRStereoAvailable()) {
                if (console) {
                    console.log('No VR content');
                }
            }
            else {
                if (player.getVRStatus().isStereo) {
                    player.setVRStereo(false);
                }
                else {
                    player.setVRStereo(true);
                }
            }
        });
        // Set startup visibility
        vrButtonVisibilityHandler();
    };
    return VRToggleButton;
}(togglebutton_1.ToggleButton));
exports.VRToggleButton = VRToggleButton;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clickoverlay_1 = __webpack_require__(10);
/**
 * A watermark overlay with a clickable logo.
 */
var Watermark = (function (_super) {
    __extends(Watermark, _super);
    function Watermark(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.config = _this.mergeConfig(config, {
            cssClass: 'ui-watermark',
            url: 'https://www.movingimage.com'
        }, _this.config);
        return _this;
    }
    return Watermark;
}(clickoverlay_1.ClickOverlay));
exports.Watermark = Watermark;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Guid;
(function (Guid) {
    var guid = 1;
    function next() {
        return guid++;
    }
    Guid.next = next;
})(Guid = exports.Guid || (exports.Guid = {}));


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var uicontainer_1 = __webpack_require__(14);
var dom_1 = __webpack_require__(3);
var component_1 = __webpack_require__(2);
var container_1 = __webpack_require__(0);
var playbacktogglebutton_1 = __webpack_require__(12);
var seekbar_1 = __webpack_require__(13);
var playbacktimelabel_1 = __webpack_require__(21);
var controlbar_1 = __webpack_require__(11);
var eventdispatcher_1 = __webpack_require__(6);
var seekbarlabel_1 = __webpack_require__(23);
var subtitleoverlay_1 = __webpack_require__(25);
var volumecontrolbutton_1 = __webpack_require__(27);
var errormessageoverlay_1 = __webpack_require__(17);
var utils_1 = __webpack_require__(1);
var audioonlyoverlay_1 = __webpack_require__(36);
var playbacktoggleoverlay_1 = __webpack_require__(22);
var UIManager = (function () {
    function UIManager(player, playerUiOrUiVariants, config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        if (playerUiOrUiVariants instanceof uicontainer_1.UIContainer) {
            // Single-UI constructor has been called, transform arguments to UIVariant[] signature
            var playerUi = playerUiOrUiVariants;
            var adsUi = null;
            var uiVariants = [];
            // Add the ads UI if defined
            if (adsUi) {
                uiVariants.push({
                    ui: adsUi,
                    condition: function (context) {
                        return context.isAdWithUI;
                    },
                });
            }
            // Add the default player UI
            uiVariants.push({ ui: playerUi });
            this.uiVariants = uiVariants;
        }
        else {
            // Default constructor (UIVariant[]) has been called
            this.uiVariants = playerUiOrUiVariants;
        }
        this.player = player;
        this.config = config;
        this.managerPlayerWrapper = new PlayerWrapper(player);
        this.playerElement = new dom_1.DOM(player.getFigure());
        // Create UI instance managers for the UI variants
        // The instance managers map to the corresponding UI variants by their array index
        this.uiInstanceManagers = [];
        var uiVariantsWithoutCondition = [];
        for (var _i = 0, _a = this.uiVariants; _i < _a.length; _i++) {
            var uiVariant = _a[_i];
            if (uiVariant.condition == null) {
                // Collect variants without conditions for error checking
                uiVariantsWithoutCondition.push(uiVariant);
            }
            // Create the instance manager for a UI variant
            this.uiInstanceManagers.push(new InternalUIInstanceManager(player, uiVariant.ui, this.config));
        }
        // Make sure that there is only one UI variant without a condition
        // It does not make sense to have multiple variants without condition, because only the first one in the list
        // (the one with the lowest index) will ever be selected.
        if (uiVariantsWithoutCondition.length > 1) {
            throw Error('Too many UIs without a condition: You cannot have more than one default UI');
        }
        // Make sure that the default UI variant, if defined, is at the end of the list (last index)
        // If it comes earlier, the variants with conditions that come afterwards will never be selected because the
        // default variant without a condition always evaluates to 'true'
        if (uiVariantsWithoutCondition.length > 0
            && uiVariantsWithoutCondition[0] !== this.uiVariants[this.uiVariants.length - 1]) {
            throw Error('Invalid UI variant order: the default UI (without condition) must be at the end of the list');
        }
        var adStartedEvent = null; // keep the event stored here during ad playback
        var isMobile = utils_1.BrowserUtils.isMobile;
        // Dynamically select a UI variant that matches the current UI condition.
        var resolveUiVariant = function (event) {
            // Make sure that the ON_AD_STARTED event data is persisted through ad playback in case other events happen
            // in the meantime, e.g. player resize. We need to store this data because there is no other way to find out
            // ad details (e.g. the ad client) while an ad is playing.
            // Existing event data signals that an ad is currently active. We cannot use player.isAd() because it returns
            // true on ad start and also on ad end events, which is problematic.
            if (event != null) {
                switch (event.type) {
                    // When the ad starts, we store the event data
                    case player.EVENT.ON_AD_STARTED:
                        adStartedEvent = event;
                        break;
                    // When the ad ends, we delete the event data
                    case player.EVENT.ON_AD_FINISHED:
                    case player.EVENT.ON_AD_SKIPPED:
                    case player.EVENT.ON_AD_ERROR:
                        adStartedEvent = null;
                }
            }
            // Detect if an ad has started
            var ad = adStartedEvent != null;
            var adWithUI = ad && adStartedEvent.clientType === 'vast';
            // Determine the current context for which the UI variant will be resolved
            var context = {
                isAd: ad,
                isAdWithUI: adWithUI,
                isFullscreen: _this.player.isFullscreen(),
                isMobile: isMobile,
                width: _this.playerElement.width(),
                documentWidth: document.body.clientWidth,
            };
            var nextUi = null;
            var uiVariantChanged = false;
            // Select new UI variant
            // If no variant condition is fulfilled, we switch to *no* UI
            for (var _i = 0, _a = _this.uiVariants; _i < _a.length; _i++) {
                var uiVariant = _a[_i];
                if (uiVariant.condition == null || uiVariant.condition(context) === true) {
                    nextUi = _this.uiInstanceManagers[_this.uiVariants.indexOf(uiVariant)];
                    break;
                }
            }
            // Determine if the UI variant is changing
            if (nextUi !== _this.currentUi) {
                uiVariantChanged = true;
                // console.log('switched from ', this.currentUi ? this.currentUi.getUI() : 'none',
                //   ' to ', nextUi ? nextUi.getUI() : 'none');
            }
            // Only if the UI variant is changing, we need to do some stuff. Else we just leave everything as-is.
            if (uiVariantChanged) {
                // Hide the currently active UI variant
                if (_this.currentUi) {
                    _this.currentUi.getUI().hide();
                }
                // Assign the new UI variant as current UI
                _this.currentUi = nextUi;
                // When we switch to a different UI instance, there's some additional stuff to manage. If we do not switch
                // to an instance, we're done here.
                if (_this.currentUi != null) {
                    // Add the UI to the DOM (and configure it) the first time it is selected
                    if (!_this.currentUi.isConfigured()) {
                        _this.addUi(_this.currentUi);
                    }
                    // If this is an ad UI, we need to relay the saved ON_AD_STARTED event data so ad components can configure
                    // themselves for the current ad.
                    if (context.isAd) {
                        /* Relay the ON_AD_STARTED event to the ads UI
                         *
                         * Because the ads UI is initialized in the ON_AD_STARTED handler, i.e. when the ON_AD_STARTED event has
                         * already been fired, components in the ads UI that listen for the ON_AD_STARTED event never receive it.
                         * Since this can break functionality of components that rely on this event, we relay the event to the
                         * ads UI components with the following call.
                         */
                        _this.currentUi.getWrappedPlayer().fireEventInUI(_this.player.EVENT.ON_AD_STARTED, adStartedEvent);
                    }
                    _this.currentUi.getUI().show();
                }
            }
        };
        // Listen to the following events to trigger UI variant resolution
        this.managerPlayerWrapper.getPlayer().addEventHandler(this.player.EVENT.ON_AD_STARTED, resolveUiVariant);
        this.managerPlayerWrapper.getPlayer().addEventHandler(this.player.EVENT.ON_AD_FINISHED, resolveUiVariant);
        this.managerPlayerWrapper.getPlayer().addEventHandler(this.player.EVENT.ON_AD_SKIPPED, resolveUiVariant);
        this.managerPlayerWrapper.getPlayer().addEventHandler(this.player.EVENT.ON_AD_ERROR, resolveUiVariant);
        this.managerPlayerWrapper.getPlayer().addEventHandler(this.player.EVENT.ON_PLAYER_RESIZE, resolveUiVariant);
        this.managerPlayerWrapper.getPlayer().addEventHandler(this.player.EVENT.ON_FULLSCREEN_ENTER, resolveUiVariant);
        this.managerPlayerWrapper.getPlayer().addEventHandler(this.player.EVENT.ON_FULLSCREEN_EXIT, resolveUiVariant);
        // Initialize the UI
        resolveUiVariant(null);
    }
    UIManager.prototype.getConfig = function () {
        return this.config;
    };
    UIManager.prototype.addUi = function (ui) {
        var dom = ui.getUI().getDomElement();
        ui.configureControls();
        /* Append the UI DOM after configuration to avoid CSS transitions at initialization
         * Example: Components are hidden during configuration and these hides may trigger CSS transitions that are
         * undesirable at this time. */
        this.playerElement.append(dom);
        // Fire onConfigured after UI DOM elements are successfully added. When fired immediately, the DOM elements
        // might not be fully configured and e.g. do not have a size.
        // https://swizec.com/blog/how-to-properly-wait-for-dom-elements-to-show-up-in-modern-browsers/swizec/6663
        if (window.requestAnimationFrame) {
            requestAnimationFrame(function () { ui.onConfigured.dispatch(ui.getUI()); });
        }
        else {
            // IE9 fallback
            setTimeout(function () { ui.onConfigured.dispatch(ui.getUI()); }, 0);
        }
    };
    UIManager.prototype.releaseUi = function (ui) {
        ui.releaseControls();
        ui.getUI().getDomElement().remove();
        ui.clearEventHandlers();
    };
    UIManager.prototype.release = function () {
        for (var _i = 0, _a = this.uiInstanceManagers; _i < _a.length; _i++) {
            var uiInstanceManager = _a[_i];
            this.releaseUi(uiInstanceManager);
        }
        this.managerPlayerWrapper.clearEventHandlers();
    };
    return UIManager;
}());
exports.UIManager = UIManager;
(function (UIManager) {
    var Factory;
    (function (Factory) {
        function buildAudioVideoUI(player, config) {
            if (config === void 0) { config = {}; }
            var controlBar = new controlbar_1.ControlBar({
                components: [
                    new playbacktogglebutton_1.PlaybackToggleButton(),
                    new seekbar_1.SeekBar({ label: new seekbarlabel_1.SeekBarLabel(), hideInLivePlayback: true }),
                    new playbacktimelabel_1.PlaybackTimeLabel(),
                    new volumecontrolbutton_1.VolumeControlButton({ 'vertical': true }),
                    new component_1.Component({ cssClass: 'spacer' })
                ]
            }, true);
            var ui = new uicontainer_1.UIContainer({
                components: [
                    new subtitleoverlay_1.SubtitleOverlay(),
                    new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                    controlBar,
                    new errormessageoverlay_1.ErrorMessageOverlay()
                ], cssClasses: ['ui-skin']
            });
            return new UIManager(player, ui, config);
        }
        Factory.buildAudioVideoUI = buildAudioVideoUI;
        function buildAudioOnlyUI(player, config) {
            if (config === void 0) { config = {}; }
            var controlBar = new controlbar_1.ControlBar({
                components: [
                    new playbacktogglebutton_1.PlaybackToggleButton(),
                    new seekbar_1.SeekBar({ label: new seekbarlabel_1.SeekBarLabel(), hideInLivePlayback: true }),
                    new playbacktimelabel_1.PlaybackTimeLabel(),
                    new volumecontrolbutton_1.VolumeControlButton({ 'vertical': true }),
                    new component_1.Component({ cssClass: 'spacer' })
                ]
            }, false);
            var ui = new uicontainer_1.UIContainer({
                components: [
                    new subtitleoverlay_1.SubtitleOverlay(),
                    new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
                    new audioonlyoverlay_1.AudioOnlyOverlay(),
                    controlBar,
                    new errormessageoverlay_1.ErrorMessageOverlay()
                ], cssClasses: ['ui-skin']
            });
            return new UIManager(player, ui, config);
        }
        Factory.buildAudioOnlyUI = buildAudioOnlyUI;
    })(Factory = UIManager.Factory || (UIManager.Factory = {}));
})(UIManager = exports.UIManager || (exports.UIManager = {}));
exports.UIManager = UIManager;
/**
 * Encapsulates functionality to manage a UI instance. Used by the {@link UIManager} to manage multiple UI instances.
 */
var UIInstanceManager = (function () {
    function UIInstanceManager(player, ui, config) {
        if (config === void 0) { config = {}; }
        this.events = {
            onConfigured: new eventdispatcher_1.EventDispatcher(),
            onSeek: new eventdispatcher_1.EventDispatcher(),
            onSeekPreview: new eventdispatcher_1.EventDispatcher(),
            onSeeked: new eventdispatcher_1.EventDispatcher(),
            onComponentShow: new eventdispatcher_1.EventDispatcher(),
            onComponentHide: new eventdispatcher_1.EventDispatcher(),
            onControlsShow: new eventdispatcher_1.EventDispatcher(),
            onPreviewControlsHide: new eventdispatcher_1.EventDispatcher(),
            onControlsHide: new eventdispatcher_1.EventDispatcher(),
        };
        this.playerWrapper = new PlayerWrapper(player);
        this.ui = ui;
        this.config = config;
    }
    UIInstanceManager.prototype.getConfig = function () {
        return this.config;
    };
    UIInstanceManager.prototype.getUI = function () {
        return this.ui;
    };
    UIInstanceManager.prototype.getPlayer = function () {
        return this.playerWrapper.getPlayer();
    };
    Object.defineProperty(UIInstanceManager.prototype, "onConfigured", {
        /**
         * Fires when the UI is fully configured and added to the DOM.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onConfigured;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onSeek", {
        /**
         * Fires when a seek starts.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onSeek;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onSeekPreview", {
        /**
         * Fires when the seek timeline is scrubbed.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onSeekPreview;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onSeeked", {
        /**
         * Fires when a seek is finished.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onSeeked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onComponentShow", {
        /**
         * Fires when a component is showing.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onComponentShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onComponentHide", {
        /**
         * Fires when a component is hiding.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onComponentHide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onControlsShow", {
        /**
         * Fires when the UI controls are showing.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onControlsShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onPreviewControlsHide", {
        /**
         * Fires before the UI controls are hiding to check if they are allowed to hide.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onPreviewControlsHide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInstanceManager.prototype, "onControlsHide", {
        /**
         * Fires when the UI controls are hiding.
         * @returns {EventDispatcher}
         */
        get: function () {
            return this.events.onControlsHide;
        },
        enumerable: true,
        configurable: true
    });
    UIInstanceManager.prototype.clearEventHandlers = function () {
        this.playerWrapper.clearEventHandlers();
        var events = this.events; // avoid TS7017
        for (var event_1 in events) {
            var dispatcher = events[event_1];
            dispatcher.unsubscribeAll();
        }
    };
    return UIInstanceManager;
}());
exports.UIInstanceManager = UIInstanceManager;
/**
 * Extends the {@link UIInstanceManager} for internal use in the {@link UIManager} and provides access to functionality
 * that components receiving a reference to the {@link UIInstanceManager} should not have access to.
 */
var InternalUIInstanceManager = (function (_super) {
    __extends(InternalUIInstanceManager, _super);
    function InternalUIInstanceManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalUIInstanceManager.prototype.getWrappedPlayer = function () {
        // TODO find a non-hacky way to provide the WrappedPlayer to the UIManager without exporting it
        // getPlayer() actually returns the WrappedPlayer but its return type is set to Player so the WrappedPlayer does
        // not need to be exported
        return this.getPlayer();
    };
    InternalUIInstanceManager.prototype.configureControls = function () {
        this.configureControlsTree(this.getUI());
        this.configured = true;
    };
    InternalUIInstanceManager.prototype.isConfigured = function () {
        return this.configured;
    };
    InternalUIInstanceManager.prototype.configureControlsTree = function (component) {
        var _this = this;
        var configuredComponents = [];
        utils_1.UIUtils.traverseTree(component, function (component) {
            // First, check if we have already configured a component, and throw an error if we did. Multiple configuration
            // of the same component leads to unexpected UI behavior. Also, a component that is in the UI tree multiple
            // times hints at a wrong UI structure.
            // We could just skip configuration in such a case and not throw an exception, but enforcing a clean UI tree
            // seems like the better choice.
            for (var _i = 0, configuredComponents_1 = configuredComponents; _i < configuredComponents_1.length; _i++) {
                var configuredComponent = configuredComponents_1[_i];
                if (configuredComponent === component) {
                    // Write the component to the console to simplify identification of the culprit
                    // (e.g. by inspecting the config)
                    if (console) {
                        console.error('Circular reference in UI tree', component);
                    }
                    // Additionally throw an error, because this case must not happen and leads to unexpected UI behavior.
                    throw Error('Circular reference in UI tree: ' + component.constructor.name);
                }
            }
            component.initialize();
            component.configure(_this.getPlayer(), _this);
            configuredComponents.push(component);
        });
    };
    InternalUIInstanceManager.prototype.releaseControls = function () {
        // Do not call release methods if the components have never been configured; this can result in exceptions
        if (this.configured) {
            this.releaseControlsTree(this.getUI());
            this.configured = false;
        }
        this.released = true;
    };
    InternalUIInstanceManager.prototype.isReleased = function () {
        return this.released;
    };
    InternalUIInstanceManager.prototype.releaseControlsTree = function (component) {
        component.release();
        if (component instanceof container_1.Container) {
            for (var _i = 0, _a = component.getComponents(); _i < _a.length; _i++) {
                var childComponent = _a[_i];
                this.releaseControlsTree(childComponent);
            }
        }
    };
    InternalUIInstanceManager.prototype.clearEventHandlers = function () {
        _super.prototype.clearEventHandlers.call(this);
    };
    return InternalUIInstanceManager;
}(UIInstanceManager));
/**
 * Wraps the player to track event handlers and provide a simple method to remove all registered event
 * handlers from the player.
 */
var PlayerWrapper = (function () {
    function PlayerWrapper(player) {
        var _this = this;
        this.eventHandlers = {};
        this.player = player;
        // Collect all public API methods of the player
        var methods = [];
        for (var member in player) {
            if (typeof player[member] === 'function') {
                methods.push(member);
            }
        }
        // Create wrapper object and add function wrappers for all API methods that do nothing but calling the base method
        // on the player
        var wrapper = {};
        var _loop_1 = function (member) {
            wrapper[member] = function () {
                // console.log('called ' + member); // track method calls on the player
                return player[member].apply(player, arguments);
            };
        };
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var member = methods_1[_i];
            _loop_1(member);
        }
        // Collect all public properties of the player and add it to the wrapper
        for (var member in player) {
            if (typeof player[member] !== 'function') {
                wrapper[member] = player[member];
            }
        }
        // Explicitly add a wrapper method for 'addEventHandler' that adds added event handlers to the event list
        wrapper.addEventHandler = function (eventType, callback) {
            player.addEventHandler(eventType, callback);
            if (!_this.eventHandlers[eventType]) {
                _this.eventHandlers[eventType] = [];
            }
            _this.eventHandlers[eventType].push(callback);
            return wrapper;
        };
        // Explicitly add a wrapper method for 'removeEventHandler' that removes removed event handlers from the event list
        wrapper.removeEventHandler = function (eventType, callback) {
            player.removeEventHandler(eventType, callback);
            if (_this.eventHandlers[eventType]) {
                utils_1.ArrayUtils.remove(_this.eventHandlers[eventType], callback);
            }
            return wrapper;
        };
        wrapper.fireEventInUI = function (event, data) {
            if (_this.eventHandlers[event]) {
                // Extend the data object with default values to convert it to a {@link PlayerEvent} object.
                var playerEventData = Object.assign({}, {
                    timestamp: Date.now(),
                    type: event,
                    // Add a marker property so the UI can detect UI-internal player events
                    uiSourced: true,
                }, data);
                // Execute the registered callbacks
                for (var _i = 0, _a = _this.eventHandlers[event]; _i < _a.length; _i++) {
                    var callback = _a[_i];
                    callback(playerEventData);
                }
            }
        };
        this.wrapper = wrapper;
    }
    /**
     * Returns a wrapped player object that can be used on place of the normal player object.
     * @returns {WrappedPlayer} a wrapped player
     */
    PlayerWrapper.prototype.getPlayer = function () {
        return this.wrapper;
    };
    /**
     * Clears all registered event handlers from the player that were added through the wrapped player.
     */
    PlayerWrapper.prototype.clearEventHandlers = function () {
        for (var eventType in this.eventHandlers) {
            for (var _i = 0, _a = this.eventHandlers[eventType]; _i < _a.length; _i++) {
                var callback = _a[_i];
                this.player.removeEventHandler(eventType, callback);
            }
        }
    };
    return PlayerWrapper;
}());


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(15);
var BitmovinController = (function () {
    function BitmovinController($scope, $log) {
        this.$scope = $scope;
        this.$log = $log;
        this.config = {};
        this.options = {};
        this.$scope = $scope;
        this.$log = $log;
    }
    BitmovinController.prototype.$onInit = function () {
        if (angular.isDefined(this.$scope.config) && angular.isDefined(this.$scope.config.key)) {
            this.config = this.$scope.config;
        }
        else {
            this.$log.error('basic config for bitdash player is missing!');
        }
        if (angular.isDefined(this.$scope.options)) {
            this.options = this.$scope.options;
        }
        if (angular.isDefined(this.$scope.webcast)) {
            this.processWebcast(this.$scope.webcast);
        }
    };
    BitmovinController.prototype.processWebcast = function (webcast) {
        var stateProperty = webcast.state + 'StateData';
        if (angular.isDefined(this.options.forcedState)) {
            stateProperty = this.options.forcedState + 'StateData';
        }
        this.config.source = this.getPlayerConfigSource(webcast, stateProperty);
        this.config.style = { ux: false };
    };
    BitmovinController.prototype.getPlayerConfigSource = function (webcast, state) {
        if (webcast.useDVRPlaybackInPostlive === true && state === 'postliveStateData') {
            return this.getDVRPlaybackToPostlive(webcast);
        }
        return this.getPlayerConfigSourceByState(webcast, state);
    };
    BitmovinController.prototype.getDVRPlaybackToPostlive = function (webcast) {
        var offset = '';
        if (angular.isDefined(webcast['postliveStateData'].playout.offset)) {
            var playoutOffset = parseInt(webcast['postliveStateData'].playout.offset, 10);
            if (playoutOffset > 0) {
                offset = '&wowzadvrplayliststart=' + playoutOffset + '000';
            }
        }
        return {
            dash: webcast['liveStateData'].playout.dashUrl.replace('/playlist.m3u8', 'Dvr/playlist.m3u8?DVR' + offset),
            hls: webcast['liveStateData'].playout.hlsUrl.replace('/master.m3u8', 'Dvr/playlist.m3u8?DVR' + offset)
        };
    };
    BitmovinController.prototype.getPlayerConfigSourceByState = function (webcast, state) {
        var hls = webcast[state].playout.hlsUrl;
        var dash = webcast[state].playout.dashUrl;
        var title = webcast.name;
        if (angular.isDefined(webcast[state].playout.videoManagerHlsUrl) && webcast[state].playout.videoManagerHlsUrl) {
            hls = webcast[state].playout.videoManagerHlsUrl;
        }
        if (angular.isDefined(webcast[state].playout.offset)) {
            var offset = parseInt(webcast[state].playout.offset, 10);
            if (offset > 0) {
                var offsetPrefix = '?';
                var parser = document.createElement('a');
                parser.href = hls;
                if (parser.search) {
                    offsetPrefix = '&';
                }
                hls += offsetPrefix + 'start=' + offset;
                if (angular.isDefined(dash) && dash) {
                    offsetPrefix = '?';
                    parser.href = dash;
                    if (parser.search) {
                        offsetPrefix = '&';
                    }
                    dash += offsetPrefix + 'start=' + offset;
                }
            }
        }
        return { dash: dash, hls: hls, title: title };
    };
    return BitmovinController;
}());
BitmovinController.$inject = ['$scope', '$log'];
exports.default = BitmovinController;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(15);
var BitdashDirective = function ($window) { return ({
    controller: 'MiBitdashController',
    controllerAs: 'bitdashVm',
    replace: true,
    restrict: 'EA',
    scope: {
        config: '=',
        options: '=?',
        webcast: '=',
    },
    template: "<div id=\"mi-bitdash-player\" width=\"100%\" height=\"auto\"></div>",
    link: function (scope) {
        var bitmovinPlayer;
        var bitmovinUIManager;
        var bitmovinControlbar;
        var config = scope.config;
        var state = scope.webcast.state + 'StateData';
        buildPlayer();
        function buildPlayer() {
            bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');
            checkIsPlayerLoaded();
            bitmovinPlayer
                .setup(config)
                .then(function () {
                bitmovinUIManager = $window.window.bitmovin.playerui.UIManager.Factory;
                if (isAudioOnly()) {
                    bitmovinUIManager.buildAudioOnlyUI(bitmovinPlayer);
                    setAudioOnlyStillImage();
                }
                else {
                    bitmovinUIManager.buildAudioVideoUI(bitmovinPlayer);
                }
                if (state === 'liveStateData') {
                    angular.element(getElementsByClassName('bmpui-seekbar')).css('display', 'none');
                }
                bitmovinControlbar = getElementsByClassName('bitmovinplayer-container');
                if (angular.isDefined(bitmovinControlbar)) {
                    bitmovinControlbar.style.minWidth = '175px';
                    bitmovinControlbar.style.minHeight = '101px';
                }
            }, function (reason) {
                console.log('Error: ' + reason.code + ' - ' + reason.message);
            });
        }
        function checkIsPlayerLoaded() {
            if (angular.isDefined(bitmovinPlayer) && bitmovinPlayer.isReady() === true) {
                bitmovinPlayer.destroy();
                bitmovinPlayer = $window.window.bitmovin.player('mi-bitdash-player');
            }
        }
        function isAudioOnly() {
            return angular.isDefined(scope.webcast[state].playout.audioOnly) &&
                scope.webcast[state].playout.audioOnly;
        }
        function setAudioOnlyStillImage() {
            if (angular.isDefined(scope.webcast[state].playout.audioOnlyStillUrl) &&
                scope.webcast[state].playout.audioOnlyStillUrl !== '') {
                var element = getElementsByClassName('bmpui-ui-audioonly-overlay');
                element.style.backgroundImage = 'url(' + scope.webcast[state].playout.audioOnlyStillUrl + ')';
                element.style.backgroundSize = 'contain';
                element.style.backgroundPosition = 'center';
            }
        }
        function getElementsByClassName(className) {
            return document.getElementsByClassName(className)[0];
        }
    }
}); };
exports.default = BitdashDirective;
BitdashDirective.$inject = ['$window'];


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
module.exports = __webpack_require__(30);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTVhMzI2MDVlODk4M2UzMjg1M2IiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2NvbnRhaW5lci50cyIsIndlYnBhY2s6Ly8vLi4vbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9kb20udHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2xhYmVsLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy90b2dnbGVidXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9ldmVudGRpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2J1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvc2VsZWN0Ym94LnRzIiwid2VicGFjazovLy8uLi9saWIvdGltZW91dC50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvY2xpY2tvdmVybGF5LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9jb250cm9sYmFyLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvc2Vla2Jhci50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvdWljb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9hdWRpb3F1YWxpdHlzZWxlY3Rib3gudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2Vycm9ybWVzc2FnZW92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2h1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvaHVnZXJlcGxheWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvbWV0YWRhdGFsYWJlbC50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvcGxheWJhY2t0aW1lbGFiZWwudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3BsYXliYWNrdG9nZ2xlb3ZlcmxheS50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvc2Vla2JhcmxhYmVsLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9zcGFjZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3N1YnRpdGxlb3ZlcmxheS50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvdmlkZW9xdWFsaXR5c2VsZWN0Ym94LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy92b2x1bWVjb250cm9sYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy92b2x1bWVzbGlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3ZvbHVtZXRvZ2dsZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2FkY2xpY2tvdmVybGF5LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9hZG1lc3NhZ2VsYWJlbC50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvYWRza2lwYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9haXJwbGF5dG9nZ2xlYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9hdWRpb29ubHlvdmVybGF5LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9hdWRpb3RyYWNrc2VsZWN0Ym94LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9idWZmZXJpbmdvdmVybGF5LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9jYXN0c3RhdHVzb3ZlcmxheS50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvY2FzdHRvZ2dsZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvY2FzdHVpY29udGFpbmVyLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9jbG9zZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvZnVsbHNjcmVlbnRvZ2dsZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvbGlzdHNlbGVjdG9yLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9waWN0dXJlaW5waWN0dXJldG9nZ2xlYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9wbGF5YmFja3NwZWVkc2VsZWN0Ym94LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9yZWNvbW1lbmRhdGlvbm92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3NldHRpbmdzcGFuZWwudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3NldHRpbmdzdG9nZ2xlYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9zdWJ0aXRsZXNlbGVjdGJveC50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvdGl0bGViYXIudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3R2bm9pc2VjYW52YXMudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3ZydG9nZ2xlYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy93YXRlcm1hcmsudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9ndWlkLnRzIiwid2VicGFjazovLy8uLi9saWIvdWltYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL2JpdGRhc2gtY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9iaXRkYXNoLWRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxpQ0FBaUM7QUFDOUYsZ0JBQWdCLDZCQUE2QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnQkFBZ0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUN0R0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUk7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNkRBQTZEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxnQ0FBZ0Msb0NBQW9DO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDRCQUE0QixLQUFLLHlCQUF5QjtBQUN4RixTQUFTLHlCQUF5QjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBLHVEQUF1RCx1Q0FBdUMsK0RBQStEO0FBQzdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0VBQWdFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssd0VBQXdFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLDRDQUE0QztBQUM5SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsZ0JBQWdCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyxnRUFBZ0U7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsZ0JBQWdCO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0RBQW9EO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsbUVBQW1FOzs7Ozs7OztBQzdUcEU7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGFBQWE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsOEJBQThCO0FBQzlDO0FBQ0E7QUFDQSw2RUFBNkUsd0NBQXdDO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGNBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFlBQVksZ0RBQWdELCtCQUErQjtBQUN4SCxnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHdCQUF3QjtBQUMzRTtBQUNBLGlFQUFpRSxrQkFBa0I7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLG1DQUFtQztBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsbUNBQW1DO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxtQ0FBbUM7QUFDckc7QUFDQTtBQUNBO0FBQ0EsNERBQTRELG1CQUFtQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxtQ0FBbUM7QUFDekcscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxtQ0FBbUM7QUFDekcscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN2VUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsT0FBTztBQUM1QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsaUJBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsc0JBQXNCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsY0FBYztBQUNqRCx5Q0FBeUMscUJBQXFCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsdUJBQXVCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7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QSxxQkFBcUI7QUFDckIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMVBBLHlCOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFD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RDtBQUNBOzs7Ozs7OztBQ3JGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBRTtBQUNIO0FBQ0EiLCJmaWxlIjoibWktYW5ndWxhci1iaXRkYXNoLXBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE1YTMyNjA1ZTg5ODNlMzI4NTNiIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbi8qKlxyXG4gKiBBIGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBjYW4gY29udGFpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGQgY29tcG9uZW50cy5cclxuICogQ29tcG9uZW50cyBjYW4gYmUgYWRkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUgdGhyb3VnaCB0aGUge0BsaW5rIENvbnRhaW5lckNvbmZpZyNjb21wb25lbnRzfSBzZXR0aW5nLCBvciBsYXRlclxyXG4gKiB0aHJvdWdoIHRoZSB7QGxpbmsgQ29udGFpbmVyI2FkZENvbXBvbmVudH0gbWV0aG9kLiBUaGUgVUlNYW5hZ2VyIGF1dG9tYXRpY2FsbHkgdGFrZXMgY2FyZSBvZiBhbGwgY29tcG9uZW50cywgaS5lLiBpdFxyXG4gKiBpbml0aWFsaXplcyBhbmQgY29uZmlndXJlcyB0aGVtIGF1dG9tYXRpY2FsbHkuXHJcbiAqXHJcbiAqIEluIHRoZSBET00sIHRoZSBjb250YWluZXIgY29uc2lzdHMgb2YgYW4gb3V0ZXIgPGRpdj4gKHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgYnkgdGhlIGNvbmZpZykgYW5kIGFuIGlubmVyIHdyYXBwZXJcclxuICogPGRpdj4gdGhhdCBjb250YWlucyB0aGUgY29tcG9uZW50cy4gVGhpcyBkb3VibGUtPGRpdj4tc3RydWN0dXJlIGlzIG9mdGVuIHJlcXVpcmVkIHRvIGFjaGlldmUgbWFueSBhZHZhbmNlZCBlZmZlY3RzXHJcbiAqIGluIENTUyBhbmQvb3IgSlMsIGUuZy4gYW5pbWF0aW9ucyBhbmQgY2VydGFpbiBmb3JtYXR0aW5nIHdpdGggYWJzb2x1dGUgcG9zaXRpb25pbmcuXHJcbiAqXHJcbiAqIERPTSBleGFtcGxlOlxyXG4gKiA8Y29kZT5cclxuICogICAgIDxkaXYgY2xhc3M9J3VpLWNvbnRhaW5lcic+XHJcbiAqICAgICAgICAgPGRpdiBjbGFzcz0nY29udGFpbmVyLXdyYXBwZXInPlxyXG4gKiAgICAgICAgICAgICAuLi4gY2hpbGQgY29tcG9uZW50cyAuLi5cclxuICogICAgICAgICA8L2Rpdj5cclxuICogICAgIDwvZGl2PlxyXG4gKiA8L2NvZGU+XHJcbiAqL1xyXG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDb250YWluZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDb250YWluZXIoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IFtdXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBjaGlsZCBjb21wb25lbnQgdG8gdGhlIGNvbnRhaW5lci5cclxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgdGhlIGNvbXBvbmVudCB0byBhZGRcclxuICAgICAqL1xyXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgY2hpbGQgY29tcG9uZW50IGZyb20gdGhlIGNvbnRhaW5lci5cclxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgdGhlIGNvbXBvbmVudCB0byByZW1vdmVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gcmVtb3ZlZCwgZmFsc2UgaWYgaXQgaXMgbm90IGNvbnRhaW5lZCBpbiB0aGlzIGNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNvbXBvbmVudCA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICByZXR1cm4gdXRpbHNfMS5BcnJheVV0aWxzLnJlbW92ZSh0aGlzLmNvbmZpZy5jb21wb25lbnRzLCBjb21wb25lbnQpICE9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGFycmF5IG9mIGFsbCBjaGlsZCBjb21wb25lbnRzIGluIHRoaXMgY29udGFpbmVyLlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudDxDb21wb25lbnRDb25maWc+W119XHJcbiAgICAgKi9cclxuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q29tcG9uZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuY29tcG9uZW50cztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGNoaWxkIGNvbXBvbmVudHMgZnJvbSB0aGUgY29udGFpbmVyLlxyXG4gICAgICovXHJcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuZ2V0Q29tcG9uZW50cygpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNvbXBvbmVudChjb21wb25lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIERPTSBvZiB0aGUgY29udGFpbmVyIHdpdGggdGhlIGN1cnJlbnQgY29tcG9uZW50cy5cclxuICAgICAqL1xyXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51cGRhdGVDb21wb25lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaW5uZXJDb250YWluZXJFbGVtZW50LmVtcHR5KCk7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuY29uZmlnLmNvbXBvbmVudHM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIHRoaXMuaW5uZXJDb250YWluZXJFbGVtZW50LmFwcGVuZChjb21wb25lbnQuZ2V0RG9tRWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250YWluZXIgZWxlbWVudCAodGhlIG91dGVyIDxkaXY+KVxyXG4gICAgICAgIHZhciBjb250YWluZXJFbGVtZW50ID0gbmV3IGRvbV8xLkRPTSh0aGlzLmNvbmZpZy50YWcsIHtcclxuICAgICAgICAgICAgJ2lkJzogdGhpcy5jb25maWcuaWQsXHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMuZ2V0Q3NzQ2xhc3NlcygpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBpbm5lciBjb250YWluZXIgZWxlbWVudCAodGhlIGlubmVyIDxkaXY+KSB0aGF0IHdpbGwgY29udGFpbiB0aGUgY29tcG9uZW50c1xyXG4gICAgICAgIHZhciBpbm5lckNvbnRhaW5lciA9IG5ldyBkb21fMS5ET00odGhpcy5jb25maWcudGFnLCB7XHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMucHJlZml4Q3NzKCdjb250YWluZXItd3JhcHBlcicpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbm5lckNvbnRhaW5lckVsZW1lbnQgPSBpbm5lckNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudHMoKTtcclxuICAgICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZChpbm5lckNvbnRhaW5lcik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENvbnRhaW5lcjtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2NvbnRhaW5lci50c1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZXZlbnRkaXNwYXRjaGVyXzEgPSByZXF1aXJlKFwiLi9ldmVudGRpc3BhdGNoZXJcIik7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29udGFpbmVyXCIpO1xyXG52YXIgQXJyYXlVdGlscztcclxuKGZ1bmN0aW9uIChBcnJheVV0aWxzKSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIGFuIGFycmF5LlxyXG4gICAgICogQHBhcmFtIGFycmF5IHRoZSBhcnJheSB0aGF0IG1heSBjb250YWluIHRoZSBpdGVtIHRvIHJlbW92ZVxyXG4gICAgICogQHBhcmFtIGl0ZW0gdGhlIGl0ZW0gdG8gcmVtb3ZlIGZyb20gdGhlIGFycmF5XHJcbiAgICAgKiBAcmV0dXJucyB7YW55fSB0aGUgcmVtb3ZlZCBpdGVtIG9yIG51bGwgaWYgaXQgd2Fzbid0IHBhcnQgb2YgdGhlIGFycmF5XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlbW92ZShhcnJheSwgaXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSlbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBBcnJheVV0aWxzLnJlbW92ZSA9IHJlbW92ZTtcclxufSkoQXJyYXlVdGlscyA9IGV4cG9ydHMuQXJyYXlVdGlscyB8fCAoZXhwb3J0cy5BcnJheVV0aWxzID0ge30pKTtcclxudmFyIFN0cmluZ1V0aWxzO1xyXG4oZnVuY3Rpb24gKFN0cmluZ1V0aWxzKSB7XHJcbiAgICBTdHJpbmdVdGlscy5GT1JNQVRfSEhNTVNTID0gJ2hoOm1tOnNzJztcclxuICAgIFN0cmluZ1V0aWxzLkZPUk1BVF9NTVNTID0gJ21tOnNzJztcclxuICAgIC8qKlxyXG4gICAgICogRm9ybWF0cyBhIG51bWJlciBvZiBzZWNvbmRzIGludG8gYSB0aW1lIHN0cmluZyB3aXRoIHRoZSBwYXR0ZXJuIGhoOm1tOnNzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0b3RhbFNlY29uZHMgdGhlIHRvdGFsIG51bWJlciBvZiBzZWNvbmRzIHRvIGZvcm1hdCB0byBzdHJpbmdcclxuICAgICAqIEBwYXJhbSBmb3JtYXQgdGhlIHRpbWUgZm9ybWF0IHRvIG91dHB1dCAoZGVmYXVsdDogaGg6bW06c3MpXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZm9ybWF0dGVkIHRpbWUgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNlY29uZHNUb1RpbWUodG90YWxTZWNvbmRzLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoZm9ybWF0ID09PSB2b2lkIDApIHsgZm9ybWF0ID0gU3RyaW5nVXRpbHMuRk9STUFUX0hITU1TUzsgfVxyXG4gICAgICAgIHZhciBpc05lZ2F0aXZlID0gdG90YWxTZWNvbmRzIDwgMDtcclxuICAgICAgICBpZiAoaXNOZWdhdGl2ZSkge1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgdGltZSBpcyBuZWdhdGl2ZSwgd2UgbWFrZSBpdCBwb3NpdGl2ZSBmb3IgdGhlIGNhbGN1bGF0aW9uIGJlbG93XHJcbiAgICAgICAgICAgIC8vIChlbHNlIHdlJ2QgZ2V0IGFsbCBuZWdhdGl2ZSBudW1iZXJzKSBhbmQgcmVhdHRhY2ggdGhlIG5lZ2F0aXZlIHNpZ24gbGF0ZXIuXHJcbiAgICAgICAgICAgIHRvdGFsU2Vjb25kcyA9IC10b3RhbFNlY29uZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNwbGl0IGludG8gc2VwYXJhdGUgdGltZSBwYXJ0c1xyXG4gICAgICAgIHZhciBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDYwKSAtIGhvdXJzICogNjA7XHJcbiAgICAgICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcykgJSA2MDtcclxuICAgICAgICByZXR1cm4gKGlzTmVnYXRpdmUgPyAnLScgOiAnJykgKyBmb3JtYXRcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ2hoJywgbGVmdFBhZFdpdGhaZXJvcyhob3VycywgMikpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCdtbScsIGxlZnRQYWRXaXRoWmVyb3MobWludXRlcywgMikpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKCdzcycsIGxlZnRQYWRXaXRoWmVyb3Moc2Vjb25kcywgMikpO1xyXG4gICAgfVxyXG4gICAgU3RyaW5nVXRpbHMuc2Vjb25kc1RvVGltZSA9IHNlY29uZHNUb1RpbWU7XHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgbnVtYmVyIHRvIGEgc3RyaW5nIGFuZCBsZWZ0LXBhZHMgaXQgd2l0aCB6ZXJvcyB0byB0aGUgc3BlY2lmaWVkIGxlbmd0aC5cclxuICAgICAqIEV4YW1wbGU6IGxlZnRQYWRXaXRoWmVyb3MoMTIzLCA1KSA9PiAnMDAxMjMnXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG51bSB0aGUgbnVtYmVyIHRvIGNvbnZlcnQgdG8gc3RyaW5nIGFuZCBwYWQgd2l0aCB6ZXJvc1xyXG4gICAgICogQHBhcmFtIGxlbmd0aCB0aGUgZGVzaXJlZCBsZW5ndGggb2YgdGhlIHBhZGRlZCBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBwYWRkZWQgbnVtYmVyIGFzIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsZWZ0UGFkV2l0aFplcm9zKG51bSwgbGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIHRleHQgPSBudW0gKyAnJztcclxuICAgICAgICB2YXIgcGFkZGluZyA9ICcwMDAwMDAwMDAwJy5zdWJzdHIoMCwgbGVuZ3RoIC0gdGV4dC5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiBwYWRkaW5nICsgdGV4dDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRmlsbHMgb3V0IHBsYWNlaG9sZGVycyBpbiBhbiBhZCBtZXNzYWdlLlxyXG4gICAgICpcclxuICAgICAqIEhhcyB0aGUgcGxhY2Vob2xkZXJzICd7cmVtYWluaW5nVGltZVtmb3JtYXRTdHJpbmddfScsICd7cGxheWVkVGltZVtmb3JtYXRTdHJpbmddfScgYW5kXHJcbiAgICAgKiAne2FkRHVyYXRpb25bZm9ybWF0U3RyaW5nXX0nLCB3aGljaCBhcmUgcmVwbGFjZWQgYnkgdGhlIHJlbWFpbmluZyB0aW1lIHVudGlsIHRoZSBhZCBjYW4gYmUgc2tpcHBlZCwgdGhlIGN1cnJlbnRcclxuICAgICAqIHRpbWUgb3IgdGhlIGFkIGR1cmF0aW9uLiBUaGUgZm9ybWF0IHN0cmluZyBpcyBvcHRpb25hbC4gSWYgbm90IHNwZWNpZmllZCwgdGhlIHBsYWNlaG9sZGVyIGlzIHJlcGxhY2VkIGJ5IHRoZSB0aW1lXHJcbiAgICAgKiBpbiBzZWNvbmRzLiBJZiBzcGVjaWZpZWQsIGl0IG11c3QgYmUgb2YgdGhlIGZvbGxvd2luZyBmb3JtYXQ6XHJcbiAgICAgKiAtICVkIC0gSW5zZXJ0cyB0aGUgdGltZSBhcyBhbiBpbnRlZ2VyLlxyXG4gICAgICogLSAlME5kIC0gSW5zZXJ0cyB0aGUgdGltZSBhcyBhbiBpbnRlZ2VyIHdpdGggbGVhZGluZyB6ZXJvZXMsIGlmIHRoZSBsZW5ndGggb2YgdGhlIHRpbWUgc3RyaW5nIGlzIHNtYWxsZXIgdGhhbiBOLlxyXG4gICAgICogLSAlZiAtIEluc2VydHMgdGhlIHRpbWUgYXMgYSBmbG9hdC5cclxuICAgICAqIC0gJTBOZiAtIEluc2VydHMgdGhlIHRpbWUgYXMgYSBmbG9hdCB3aXRoIGxlYWRpbmcgemVyb2VzLlxyXG4gICAgICogLSAlLk1mIC0gSW5zZXJ0cyB0aGUgdGltZSBhcyBhIGZsb2F0IHdpdGggTSBkZWNpbWFsIHBsYWNlcy4gQ2FuIGJlIGNvbWJpbmVkIHdpdGggJTBOZiwgZS5nLiAlMDQuMmYgKHRoZSB0aW1lXHJcbiAgICAgKiAxMC4xMjNcclxuICAgICAqIHdvdWxkIGJlIHByaW50ZWQgYXMgMDAxMC4xMikuXHJcbiAgICAgKiAtICVoaDptbTpzc1xyXG4gICAgICogLSAlbW06c3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gYWRNZXNzYWdlIGFuIGFkIG1lc3NhZ2Ugd2l0aCBvcHRpb25hbCBwbGFjZWhvbGRlcnMgdG8gZmlsbFxyXG4gICAgICogQHBhcmFtIHNraXBPZmZzZXQgaWYgc3BlY2lmaWVkLCB7cmVtYWluaW5nVGltZX0gd2lsbCBiZSBmaWxsZWQgd2l0aCB0aGUgcmVtYWluaW5nIHRpbWUgdW50aWwgdGhlIGFkIGNhbiBiZSBza2lwcGVkXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIHRoZSBwbGF5ZXIgdG8gZ2V0IHRoZSB0aW1lIGRhdGEgZnJvbVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIGFkIG1lc3NhZ2Ugd2l0aCBmaWxsZWQgcGxhY2Vob2xkZXJzXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VBZE1lc3NhZ2VQbGFjZWhvbGRlcnMoYWRNZXNzYWdlLCBza2lwT2Zmc2V0LCBwbGF5ZXIpIHtcclxuICAgICAgICB2YXIgYWRNZXNzYWdlUGxhY2Vob2xkZXJSZWdleCA9IG5ldyBSZWdFeHAoJ1xcXFx7KHJlbWFpbmluZ1RpbWV8cGxheWVkVGltZXxhZER1cmF0aW9uKSh9fCUoKDBbMS05XVxcXFxkKihcXFxcLlxcXFxkKyhkfGYpfGR8Zil8XFxcXC5cXFxcZCtmfGR8Zil8aGg6bW06c3N8bW06c3MpfSknLCAnZycpO1xyXG4gICAgICAgIHJldHVybiBhZE1lc3NhZ2UucmVwbGFjZShhZE1lc3NhZ2VQbGFjZWhvbGRlclJlZ2V4LCBmdW5jdGlvbiAoZm9ybWF0U3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gMDtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdFN0cmluZy5pbmRleE9mKCdyZW1haW5pbmdUaW1lJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraXBPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lID0gTWF0aC5jZWlsKHNraXBPZmZzZXQgLSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lID0gcGxheWVyLmdldER1cmF0aW9uKCkgLSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmb3JtYXRTdHJpbmcuaW5kZXhPZigncGxheWVkVGltZScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmb3JtYXRTdHJpbmcuaW5kZXhPZignYWREdXJhdGlvbicpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBwbGF5ZXIuZ2V0RHVyYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0TnVtYmVyKHRpbWUsIGZvcm1hdFN0cmluZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBTdHJpbmdVdGlscy5yZXBsYWNlQWRNZXNzYWdlUGxhY2Vob2xkZXJzID0gcmVwbGFjZUFkTWVzc2FnZVBsYWNlaG9sZGVycztcclxuICAgIGZ1bmN0aW9uIGZvcm1hdE51bWJlcih0aW1lLCBmb3JtYXQpIHtcclxuICAgICAgICB2YXIgZm9ybWF0U3RyaW5nVmFsaWRhdGlvblJlZ2V4ID0gLyUoKDBbMS05XVxcZCooXFwuXFxkKyhkfGYpfGR8Zil8XFwuXFxkK2Z8ZHxmKXxoaDptbTpzc3xtbTpzcykvO1xyXG4gICAgICAgIHZhciBsZWFkaW5nWmVyb2VzUmVnZXggPSAvKCUwWzEtOV1cXGQqKSg/PShcXC5cXGQrZnxmfGQpKS87XHJcbiAgICAgICAgdmFyIGRlY2ltYWxQbGFjZXNSZWdleCA9IC9cXC5cXGQqKD89ZikvO1xyXG4gICAgICAgIGlmICghZm9ybWF0U3RyaW5nVmFsaWRhdGlvblJlZ2V4LnRlc3QoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgZm9ybWF0IGlzIGludmFsaWQsIHdlIHNldCBhIGRlZmF1bHQgZmFsbGJhY2sgZm9ybWF0XHJcbiAgICAgICAgICAgIGZvcm1hdCA9ICclZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgbnVtYmVyIG9mIGxlYWRpbmcgemVyb3NcclxuICAgICAgICB2YXIgbGVhZGluZ1plcm9lcyA9IDA7XHJcbiAgICAgICAgdmFyIGxlYWRpbmdaZXJvZXNNYXRjaGVzID0gZm9ybWF0Lm1hdGNoKGxlYWRpbmdaZXJvZXNSZWdleCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdaZXJvZXNNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdaZXJvZXMgPSBwYXJzZUludChsZWFkaW5nWmVyb2VzTWF0Y2hlc1swXS5zdWJzdHJpbmcoMikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xyXG4gICAgICAgIHZhciBudW1EZWNpbWFsUGxhY2VzID0gbnVsbDtcclxuICAgICAgICB2YXIgZGVjaW1hbFBsYWNlc01hdGNoZXMgPSBmb3JtYXQubWF0Y2goZGVjaW1hbFBsYWNlc1JlZ2V4KTtcclxuICAgICAgICBpZiAoZGVjaW1hbFBsYWNlc01hdGNoZXMgJiYgIWlzTmFOKHBhcnNlSW50KGRlY2ltYWxQbGFjZXNNYXRjaGVzWzBdLnN1YnN0cmluZygxKSkpKSB7XHJcbiAgICAgICAgICAgIG51bURlY2ltYWxQbGFjZXMgPSBwYXJzZUludChkZWNpbWFsUGxhY2VzTWF0Y2hlc1swXS5zdWJzdHJpbmcoMSkpO1xyXG4gICAgICAgICAgICBpZiAobnVtRGVjaW1hbFBsYWNlcyA+IDIwKSB7XHJcbiAgICAgICAgICAgICAgICBudW1EZWNpbWFsUGxhY2VzID0gMjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRmxvYXQgZm9ybWF0XHJcbiAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdmJykgPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgdGltZVN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICBpZiAobnVtRGVjaW1hbFBsYWNlcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgZml4ZWQgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXHJcbiAgICAgICAgICAgICAgICB0aW1lU3RyaW5nID0gdGltZS50b0ZpeGVkKG51bURlY2ltYWxQbGFjZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGltZVN0cmluZyA9ICcnICsgdGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBcHBseSBsZWFkaW5nIHplcm9zXHJcbiAgICAgICAgICAgIGlmICh0aW1lU3RyaW5nLmluZGV4T2YoJy4nKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFBhZFdpdGhaZXJvcyh0aW1lU3RyaW5nLCB0aW1lU3RyaW5nLmxlbmd0aCArIChsZWFkaW5nWmVyb2VzIC0gdGltZVN0cmluZy5pbmRleE9mKCcuJykpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0UGFkV2l0aFplcm9zKHRpbWVTdHJpbmcsIGxlYWRpbmdaZXJvZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCc6JykgPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgdG90YWxTZWNvbmRzID0gTWF0aC5jZWlsKHRpbWUpO1xyXG4gICAgICAgICAgICAvLyBoaDptbTpzcyBmb3JtYXRcclxuICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdoaCcpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWNvbmRzVG9UaW1lKHRvdGFsU2Vjb25kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0UGFkV2l0aFplcm9zKG1pbnV0ZXMsIDIpICsgJzonICsgbGVmdFBhZFdpdGhaZXJvcyhzZWNvbmRzLCAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxlZnRQYWRXaXRoWmVyb3MoTWF0aC5jZWlsKHRpbWUpLCBsZWFkaW5nWmVyb2VzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKFN0cmluZ1V0aWxzID0gZXhwb3J0cy5TdHJpbmdVdGlscyB8fCAoZXhwb3J0cy5TdHJpbmdVdGlscyA9IHt9KSk7XHJcbnZhciBQbGF5ZXJVdGlscztcclxuKGZ1bmN0aW9uIChQbGF5ZXJVdGlscykge1xyXG4gICAgdmFyIFBsYXllclN0YXRlO1xyXG4gICAgKGZ1bmN0aW9uIChQbGF5ZXJTdGF0ZSkge1xyXG4gICAgICAgIFBsYXllclN0YXRlW1BsYXllclN0YXRlW1wiSURMRVwiXSA9IDBdID0gXCJJRExFXCI7XHJcbiAgICAgICAgUGxheWVyU3RhdGVbUGxheWVyU3RhdGVbXCJQUkVQQVJFRFwiXSA9IDFdID0gXCJQUkVQQVJFRFwiO1xyXG4gICAgICAgIFBsYXllclN0YXRlW1BsYXllclN0YXRlW1wiUExBWUlOR1wiXSA9IDJdID0gXCJQTEFZSU5HXCI7XHJcbiAgICAgICAgUGxheWVyU3RhdGVbUGxheWVyU3RhdGVbXCJQQVVTRURcIl0gPSAzXSA9IFwiUEFVU0VEXCI7XHJcbiAgICAgICAgUGxheWVyU3RhdGVbUGxheWVyU3RhdGVbXCJGSU5JU0hFRFwiXSA9IDRdID0gXCJGSU5JU0hFRFwiO1xyXG4gICAgfSkoUGxheWVyU3RhdGUgPSBQbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZSB8fCAoUGxheWVyVXRpbHMuUGxheWVyU3RhdGUgPSB7fSkpO1xyXG4gICAgZnVuY3Rpb24gaXNTb3VyY2VMb2FkZWQocGxheWVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIFBsYXllclV0aWxzLmlzU291cmNlTG9hZGVkID0gaXNTb3VyY2VMb2FkZWQ7XHJcbiAgICBmdW5jdGlvbiBpc1RpbWVTaGlmdEF2YWlsYWJsZShwbGF5ZXIpIHtcclxuICAgICAgICByZXR1cm4gcGxheWVyLmlzTGl2ZSgpICYmIHBsYXllci5nZXRNYXhUaW1lU2hpZnQoKSAhPT0gMDtcclxuICAgIH1cclxuICAgIFBsYXllclV0aWxzLmlzVGltZVNoaWZ0QXZhaWxhYmxlID0gaXNUaW1lU2hpZnRBdmFpbGFibGU7XHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0ZShwbGF5ZXIpIHtcclxuICAgICAgICBpZiAocGxheWVyLmhhc0VuZGVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllclN0YXRlLkZJTklTSEVEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwbGF5ZXIuaXNQbGF5aW5nKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllclN0YXRlLlBMQVlJTkc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBsYXllci5pc1BhdXNlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQbGF5ZXJTdGF0ZS5QQVVTRUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzU291cmNlTG9hZGVkKHBsYXllcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllclN0YXRlLlBSRVBBUkVEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllclN0YXRlLklETEU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUGxheWVyVXRpbHMuZ2V0U3RhdGUgPSBnZXRTdGF0ZTtcclxuICAgIHZhciBUaW1lU2hpZnRBdmFpbGFiaWxpdHlEZXRlY3RvciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gVGltZVNoaWZ0QXZhaWxhYmlsaXR5RGV0ZWN0b3IocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVNoaWZ0QXZhaWxhYmlsaXR5Q2hhbmdlZEV2ZW50ID0gbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgdGhpcy50aW1lU2hpZnRBdmFpbGFibGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHZhciB0aW1lU2hpZnREZXRlY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRldGVjdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBUcnkgdG8gZGV0ZWN0IHRpbWVzaGlmdCBhdmFpbGFiaWxpdHkgaW4gT05fUkVBRFksIHdoaWNoIHdvcmtzIGZvciBEQVNIIHN0cmVhbXNcclxuICAgICAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUkVBRFksIHRpbWVTaGlmdERldGVjdG9yKTtcclxuICAgICAgICAgICAgLy8gV2l0aCBITFMvTmF0aXZlUGxheWVyIHN0cmVhbXMsIGdldE1heFRpbWVTaGlmdCBjYW4gYmUgMCBiZWZvcmUgdGhlIGJ1ZmZlciBmaWxscywgc28gd2UgbmVlZCB0byBhZGRpdGlvbmFsbHlcclxuICAgICAgICAgICAgLy8gY2hlY2sgdGltZXNoaWZ0IGF2YWlsYWJpbGl0eSBpbiBPTl9USU1FX0NIQU5HRURcclxuICAgICAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVElNRV9DSEFOR0VELCB0aW1lU2hpZnREZXRlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRpbWVTaGlmdEF2YWlsYWJpbGl0eURldGVjdG9yLnByb3RvdHlwZS5kZXRlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5pc0xpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVTaGlmdEF2YWlsYWJsZU5vdyA9IFBsYXllclV0aWxzLmlzVGltZVNoaWZ0QXZhaWxhYmxlKHRoaXMucGxheWVyKTtcclxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIGF2YWlsYWJpbGl0eSBjaGFuZ2VzLCB3ZSBmaXJlIHRoZSBldmVudFxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVTaGlmdEF2YWlsYWJsZU5vdyAhPT0gdGhpcy50aW1lU2hpZnRBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVTaGlmdEF2YWlsYWJpbGl0eUNoYW5nZWRFdmVudC5kaXNwYXRjaCh0aGlzLnBsYXllciwgeyB0aW1lU2hpZnRBdmFpbGFibGU6IHRpbWVTaGlmdEF2YWlsYWJsZU5vdyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVTaGlmdEF2YWlsYWJsZSA9IHRpbWVTaGlmdEF2YWlsYWJsZU5vdztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWVTaGlmdEF2YWlsYWJpbGl0eURldGVjdG9yLnByb3RvdHlwZSwgXCJvblRpbWVTaGlmdEF2YWlsYWJpbGl0eUNoYW5nZWRcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWVTaGlmdEF2YWlsYWJpbGl0eUNoYW5nZWRFdmVudC5nZXRFdmVudCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gVGltZVNoaWZ0QXZhaWxhYmlsaXR5RGV0ZWN0b3I7XHJcbiAgICB9KCkpO1xyXG4gICAgUGxheWVyVXRpbHMuVGltZVNoaWZ0QXZhaWxhYmlsaXR5RGV0ZWN0b3IgPSBUaW1lU2hpZnRBdmFpbGFiaWxpdHlEZXRlY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICogRGV0ZWN0cyBjaGFuZ2VzIG9mIHRoZSBzdHJlYW0gdHlwZSwgaS5lLiBjaGFuZ2VzIG9mIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIHBsYXllciNpc0xpdmUgbWV0aG9kLlxyXG4gICAgICogTm9ybWFsbHksIGEgc3RyZWFtIGNhbm5vdCBjaGFuZ2UgaXRzIHR5cGUgZHVyaW5nIHBsYXliYWNrLCBpdCdzIGVpdGhlciBWT0Qgb3IgbGl2ZS4gRHVlIHRvIGJ1Z3Mgb24gc29tZVxyXG4gICAgICogcGxhdGZvcm1zIG9yIGJyb3dzZXJzLCBpdCBjYW4gc3RpbGwgY2hhbmdlLiBJdCBpcyB0aGVyZWZvcmUgdW5yZWxpYWJsZSB0byBqdXN0IGNoZWNrICNpc0xpdmUgYW5kIHRoaXMgZGV0ZWN0b3JcclxuICAgICAqIHNob3VsZCBiZSB1c2VkIGFzIGEgd29ya2Fyb3VuZCBpbnN0ZWFkLlxyXG4gICAgICpcclxuICAgICAqIEtub3duIGNhc2VzOlxyXG4gICAgICpcclxuICAgICAqIC0gSExTIFZPRCBvbiBBbmRyb2lkIDQuM1xyXG4gICAgICogVmlkZW8gZHVyYXRpb24gaXMgaW5pdGlhbGx5ICdJbmZpbml0eScgYW5kIG9ubHkgZ2V0cyBhdmFpbGFibGUgYWZ0ZXIgcGxheWJhY2sgc3RhcnRzLCBzbyBzdHJlYW1zIGFyZSB3cm9uZ2x5XHJcbiAgICAgKiByZXBvcnRlZCBhcyAnbGl2ZScgYmVmb3JlIHBsYXliYWNrICh0aGUgbGl2ZS1jaGVjayBpbiB0aGUgcGxheWVyIGNoZWNrcyBmb3IgaW5maW5pdGUgZHVyYXRpb24pLlxyXG4gICAgICovXHJcbiAgICB2YXIgTGl2ZVN0cmVhbURldGVjdG9yID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBMaXZlU3RyZWFtRGV0ZWN0b3IocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZUNoYW5nZWRFdmVudCA9IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdmFyIGxpdmVEZXRlY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRldGVjdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdoZW4gcGxheWVyIGlzIHJlYWR5XHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBsaXZlRGV0ZWN0b3IpO1xyXG4gICAgICAgICAgICAvLyBSZS1ldmFsdWF0ZSB3aGVuIHBsYXliYWNrIHN0YXJ0c1xyXG4gICAgICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QTEFZLCBsaXZlRGV0ZWN0b3IpO1xyXG4gICAgICAgICAgICAvLyBITFMgbGl2ZSBkZXRlY3Rpb24gd29ya2Fyb3VuZCBmb3IgQW5kcm9pZDpcclxuICAgICAgICAgICAgLy8gQWxzbyByZS1ldmFsdWF0ZSBkdXJpbmcgcGxheWJhY2ssIGJlY2F1c2UgdGhhdCBpcyB3aGVuIHRoZSBsaXZlIGZsYWcgbWlnaHQgY2hhbmdlLlxyXG4gICAgICAgICAgICAvLyAoRG9pbmcgaXQgb25seSBpbiBBbmRyb2lkIENocm9tZSBzYXZlcyB1bm5lY2Vzc2FyeSBvdmVyaGVhZCBvbiBvdGhlciBwbGF0dGZvcm1zKVxyXG4gICAgICAgICAgICBpZiAoQnJvd3NlclV0aWxzLmlzQW5kcm9pZCAmJiBCcm93c2VyVXRpbHMuaXNDaHJvbWUpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfQ0hBTkdFRCwgbGl2ZURldGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMaXZlU3RyZWFtRGV0ZWN0b3IucHJvdG90eXBlLmRldGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxpdmVOb3cgPSB0aGlzLnBsYXllci5pc0xpdmUoKTtcclxuICAgICAgICAgICAgLy8gQ29tcGFyZSBjdXJyZW50IHRvIHByZXZpb3VzIGxpdmUgc3RhdGUgZmxhZyBhbmQgZmlyZSBldmVudCB3aGVuIGl0IGNoYW5nZXMuIFNpbmNlIHdlIGluaXRpYWxpemUgdGhlIGZsYWdcclxuICAgICAgICAgICAgLy8gd2l0aCB1bmRlZmluZWQsIHRoZXJlIGlzIGFsd2F5cyBhdCBsZWFzdCBhbiBpbml0aWFsIGV2ZW50IGZpcmVkIHRoYXQgdGVsbHMgbGlzdGVuZXJzIHRoZSBsaXZlIHN0YXRlLlxyXG4gICAgICAgICAgICBpZiAobGl2ZU5vdyAhPT0gdGhpcy5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpdmVDaGFuZ2VkRXZlbnQuZGlzcGF0Y2godGhpcy5wbGF5ZXIsIHsgbGl2ZTogbGl2ZU5vdyB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZSA9IGxpdmVOb3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXZlU3RyZWFtRGV0ZWN0b3IucHJvdG90eXBlLCBcIm9uTGl2ZUNoYW5nZWRcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxpdmVDaGFuZ2VkRXZlbnQuZ2V0RXZlbnQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIExpdmVTdHJlYW1EZXRlY3RvcjtcclxuICAgIH0oKSk7XHJcbiAgICBQbGF5ZXJVdGlscy5MaXZlU3RyZWFtRGV0ZWN0b3IgPSBMaXZlU3RyZWFtRGV0ZWN0b3I7XHJcbn0pKFBsYXllclV0aWxzID0gZXhwb3J0cy5QbGF5ZXJVdGlscyB8fCAoZXhwb3J0cy5QbGF5ZXJVdGlscyA9IHt9KSk7XHJcbnZhciBVSVV0aWxzO1xyXG4oZnVuY3Rpb24gKFVJVXRpbHMpIHtcclxuICAgIGZ1bmN0aW9uIHRyYXZlcnNlVHJlZShjb21wb25lbnQsIHZpc2l0KSB7XHJcbiAgICAgICAgdmFyIHJlY3Vyc2l2ZVRyZWVXYWxrZXIgPSBmdW5jdGlvbiAoY29tcG9uZW50LCBwYXJlbnQpIHtcclxuICAgICAgICAgICAgdmlzaXQoY29tcG9uZW50LCBwYXJlbnQpO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgY3VycmVudCBjb21wb25lbnQgaXMgYSBjb250YWluZXIsIHZpc2l0IGl0J3MgY2hpbGRyZW5cclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIGNvbnRhaW5lcl8xLkNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGNvbXBvbmVudC5nZXRDb21wb25lbnRzKCk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkQ29tcG9uZW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZVRyZWVXYWxrZXIoY2hpbGRDb21wb25lbnQsIGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFdhbGsgYW5kIGNvbmZpZ3VyZSB0aGUgY29tcG9uZW50IHRyZWVcclxuICAgICAgICByZWN1cnNpdmVUcmVlV2Fsa2VyKGNvbXBvbmVudCk7XHJcbiAgICB9XHJcbiAgICBVSVV0aWxzLnRyYXZlcnNlVHJlZSA9IHRyYXZlcnNlVHJlZTtcclxufSkoVUlVdGlscyA9IGV4cG9ydHMuVUlVdGlscyB8fCAoZXhwb3J0cy5VSVV0aWxzID0ge30pKTtcclxudmFyIEJyb3dzZXJVdGlscztcclxuKGZ1bmN0aW9uIChCcm93c2VyVXRpbHMpIHtcclxuICAgIC8vIGlzTW9iaWxlIG9ubHkgbmVlZHMgdG8gYmUgZXZhbHVhdGVkIG9uY2UgKGl0IGNhbm5vdCBjaGFuZ2UgZHVyaW5nIGEgYnJvd3NlciBzZXNzaW9uKVxyXG4gICAgLy8gTW9iaWxlIGRldGVjdGlvbiBhY2NvcmRpbmcgdG8gTW96aWxsYSByZWNvbW1lbmRhdGlvbjogXCJJbiBzdW1tYXJ5LCB3ZSByZWNvbW1lbmQgbG9va2luZyBmb3IgdGhlIHN0cmluZyDigJxNb2Jp4oCdXHJcbiAgICAvLyBhbnl3aGVyZSBpbiB0aGUgVXNlciBBZ2VudCB0byBkZXRlY3QgYSBtb2JpbGUgZGV2aWNlLlwiXHJcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50XHJcbiAgICBCcm93c2VyVXRpbHMuaXNNb2JpbGUgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiAvTW9iaS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgIEJyb3dzZXJVdGlscy5pc0Nocm9tZSA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIC9DaHJvbWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICBCcm93c2VyVXRpbHMuaXNBbmRyb2lkID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgL0FuZHJvaWQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbn0pKEJyb3dzZXJVdGlscyA9IGV4cG9ydHMuQnJvd3NlclV0aWxzIHx8IChleHBvcnRzLkJyb3dzZXJVdGlscyA9IHt9KSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi91dGlscy50c1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZ3VpZF8xID0gcmVxdWlyZShcIi4uL2d1aWRcIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuLi9kb21cIik7XHJcbnZhciBldmVudGRpc3BhdGNoZXJfMSA9IHJlcXVpcmUoXCIuLi9ldmVudGRpc3BhdGNoZXJcIik7XHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBjbGFzcyBvZiB0aGUgVUkgZnJhbWV3b3JrLlxyXG4gKiBFYWNoIGNvbXBvbmVudCBtdXN0IGV4dGVuZCB0aGlzIGNsYXNzIGFuZCBvcHRpb25hbGx5IHRoZSBjb25maWcgaW50ZXJmYWNlLlxyXG4gKi9cclxudmFyIENvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdHMgYSBjb21wb25lbnQgd2l0aCBhbiBvcHRpb25hbGx5IHN1cHBsaWVkIGNvbmZpZy4gQWxsIHN1YmNsYXNzZXMgbXVzdCBjYWxsIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGVpclxyXG4gICAgICogc3VwZXJjbGFzcyBhbmQgdGhlbiBtZXJnZSB0aGVpciBjb25maWd1cmF0aW9uIGludG8gdGhlIGNvbXBvbmVudCdzIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gY29uZmlnIHRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIENvbXBvbmVudChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgbGlzdCBvZiBldmVudHMgdGhhdCB0aGlzIGNvbXBvbmVudCBvZmZlcnMuIFRoZXNlIGV2ZW50cyBzaG91bGQgYWx3YXlzIGJlIHByaXZhdGUgYW5kIG9ubHkgZGlyZWN0bHlcclxuICAgICAgICAgKiBhY2Nlc3NlZCBmcm9tIHdpdGhpbiB0aGUgaW1wbGVtZW50aW5nIGNvbXBvbmVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEJlY2F1c2UgVHlwZVNjcmlwdCBkb2VzIG5vdCBzdXBwb3J0IHByaXZhdGUgcHJvcGVydGllcyB3aXRoIHRoZSBzYW1lIG5hbWUgb24gZGlmZmVyZW50IGNsYXNzIGhpZXJhcmNoeSBsZXZlbHNcclxuICAgICAgICAgKiAoaS5lLiBzdXBlcmNsYXNzIGFuZCBzdWJjbGFzcyBjYW5ub3QgY29udGFpbiBhIHByaXZhdGUgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lKSwgdGhlIGRlZmF1bHQgbmFtaW5nXHJcbiAgICAgICAgICogY29udmVudGlvbiBmb3IgdGhlIGV2ZW50IGxpc3Qgb2YgYSBjb21wb25lbnQgdGhhdCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgc3ViY2xhc3NlcyBpcyB0aGUgY29uY2F0ZW5hdGlvbiBvZiB0aGVcclxuICAgICAgICAgKiBjYW1lbC1jYXNlZCBjbGFzcyBuYW1lICsgJ0V2ZW50cycgKGUuZy4gU3ViQ2xhc3MgZXh0ZW5kcyBDb21wb25lbnQgPT4gc3ViQ2xhc3NFdmVudHMpLlxyXG4gICAgICAgICAqIFNlZSB7QGxpbmsgI2NvbXBvbmVudEV2ZW50c30gZm9yIGFuIGV4YW1wbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBFdmVudCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBuYW1lZCBpbiBjYW1lbCBjYXNlIHdpdGggYW4gJ29uJyBwcmVmaXggYW5kIGluIHRoZSBwcmVzZW50IHRlbnNlLiBBc3luYyBldmVudHMgbWF5XHJcbiAgICAgICAgICogaGF2ZSBhIHN0YXJ0IGV2ZW50ICh3aGVuIHRoZSBvcGVyYXRpb24gc3RhcnRzKSBpbiB0aGUgcHJlc2VudCB0ZW5zZSwgYW5kIG11c3QgaGF2ZSBhbiBlbmQgZXZlbnQgKHdoZW4gdGhlXHJcbiAgICAgICAgICogb3BlcmF0aW9uIGVuZHMpIGluIHRoZSBwYXN0IHRlbnNlIChvciBwcmVzZW50IHRlbnNlIGluIHNwZWNpYWwgY2FzZXMgKGUuZy4gb25TdGFydC9vblN0YXJ0ZWQgb3Igb25QbGF5L29uUGxheWluZykuXHJcbiAgICAgICAgICogU2VlIHtAbGluayAjY29tcG9uZW50RXZlbnRzI29uU2hvd30gZm9yIGFuIGV4YW1wbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBFYWNoIGV2ZW50IHNob3VsZCBiZSBhY2NvbXBhbmllZCB3aXRoIGEgcHJvdGVjdGVkIG1ldGhvZCBuYW1lZCBieSB0aGUgY29udmVudGlvbiBldmVudE5hbWUgKyAnRXZlbnQnXHJcbiAgICAgICAgICogKGUuZy4gb25TdGFydEV2ZW50KSwgdGhhdCBhY3R1YWxseSB0cmlnZ2VycyB0aGUgZXZlbnQgYnkgY2FsbGluZyB7QGxpbmsgRXZlbnREaXNwYXRjaGVyI2Rpc3BhdGNoIGRpc3BhdGNofSBhbmRcclxuICAgICAgICAgKiBwYXNzaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgYXMgZmlyc3QgcGFyYW1ldGVyLiBDb21wb25lbnRzIHNob3VsZCBhbHdheXMgdHJpZ2dlciB0aGVpciBldmVudHMgd2l0aCB0aGVzZVxyXG4gICAgICAgICAqIG1ldGhvZHMuIEltcGxlbWVudGluZyB0aGlzIHBhdHRlcm4gZ2l2ZXMgc3ViY2xhc3NlcyBtZWFucyB0byBkaXJlY3RseSBsaXN0ZW4gdG8gdGhlIGV2ZW50cyBieSBvdmVycmlkaW5nIHRoZVxyXG4gICAgICAgICAqIG1ldGhvZCAoYW5kIHNhdmluZyB0aGUgb3ZlcmhlYWQgb2YgcGFzc2luZyBhIGhhbmRsZXIgdG8gdGhlIGV2ZW50IGRpc3BhdGNoZXIpIGFuZCBtb3JlIGltcG9ydGFudGx5IHRvIHRyaWdnZXJcclxuICAgICAgICAgKiB0aGVzZSBldmVudHMgd2l0aG91dCBoYXZpbmcgYWNjZXNzIHRvIHRoZSBwcml2YXRlIGV2ZW50IGxpc3QuXHJcbiAgICAgICAgICogU2VlIHtAbGluayAjb25TaG93fSBmb3IgYW4gZXhhbXBsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRvIHByb3ZpZGUgZXh0ZXJuYWwgY29kZSB0aGUgcG9zc2liaWxpdHkgdG8gbGlzdGVuIHRvIHRoaXMgY29tcG9uZW50J3MgZXZlbnRzIChzdWJzY3JpYmUsIHVuc3Vic2NyaWJlLCBldGMuKSxcclxuICAgICAgICAgKiBlYWNoIGV2ZW50IHNob3VsZCBhbHNvIGJlIGFjY29tcGFuaWVkIGJ5IGEgcHVibGljIGdldHRlciBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGV2ZW50J3MgcHJvcGVydHksXHJcbiAgICAgICAgICogdGhhdCByZXR1cm5zIHRoZSB7QGxpbmsgRXZlbnR9IG9idGFpbmVkIGZyb20gdGhlIGV2ZW50IGRpc3BhdGNoZXIgYnkgY2FsbGluZyB7QGxpbmsgRXZlbnREaXNwYXRjaGVyI2dldEV2ZW50fS5cclxuICAgICAgICAgKiBTZWUge0BsaW5rICNvblNob3d9IGZvciBhbiBleGFtcGxlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogRnVsbCBleGFtcGxlIGZvciBhbiBldmVudCByZXByZXNlbnRpbmcgYW4gZXhhbXBsZSBhY3Rpb24gaW4gYSBleGFtcGxlIGNvbXBvbmVudDpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIDxjb2RlPlxyXG4gICAgICAgICAqIC8vIERlZmluZSBhbiBleGFtcGxlIGNvbXBvbmVudCBjbGFzcyB3aXRoIGFuIGV4YW1wbGUgZXZlbnRcclxuICAgICAgICAgKiBjbGFzcyBFeGFtcGxlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PENvbXBvbmVudENvbmZpZz4ge1xyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqICAgICBwcml2YXRlIGV4YW1wbGVDb21wb25lbnRFdmVudHMgPSB7XHJcbiAgICAgICAgICAgKiAgICAgICAgIG9uRXhhbXBsZUFjdGlvbjogbmV3IEV2ZW50RGlzcGF0Y2hlcjxFeGFtcGxlQ29tcG9uZW50LCBOb0FyZ3M+KClcclxuICAgICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yIGFuZCBvdGhlciBzdHVmZi4uLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqICAgICBwcm90ZWN0ZWQgb25FeGFtcGxlQWN0aW9uRXZlbnQoKSB7XHJcbiAgICAgICAgICAgKiAgICAgICAgdGhpcy5leGFtcGxlQ29tcG9uZW50RXZlbnRzLm9uRXhhbXBsZUFjdGlvbi5kaXNwYXRjaCh0aGlzKTtcclxuICAgICAgICAgICAqICAgIH1cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiAgICBnZXQgb25FeGFtcGxlQWN0aW9uKCk6IEV2ZW50PEV4YW1wbGVDb21wb25lbnQsIE5vQXJncz4ge1xyXG4gICAgICAgICAgICogICAgICAgIHJldHVybiB0aGlzLmV4YW1wbGVDb21wb25lbnRFdmVudHMub25FeGFtcGxlQWN0aW9uLmdldEV2ZW50KCk7XHJcbiAgICAgICAgICAgKiAgICB9XHJcbiAgICAgICAgICAgKiB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBzb21ld2hlcmVcclxuICAgICAgICAgKiB2YXIgZXhhbXBsZUNvbXBvbmVudEluc3RhbmNlID0gbmV3IEV4YW1wbGVDb21wb25lbnQoKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIC8vIFN1YnNjcmliZSB0byB0aGUgZXhhbXBsZSBldmVudCBvbiB0aGUgY29tcG9uZW50XHJcbiAgICAgICAgICogZXhhbXBsZUNvbXBvbmVudEluc3RhbmNlLm9uRXhhbXBsZUFjdGlvbi5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlcjogRXhhbXBsZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICogICAgIGNvbnNvbGUubG9nKCdvbkV4YW1wbGVBY3Rpb24gb2YgJyArIHNlbmRlciArICcgaGFzIGZpcmVkIScpO1xyXG4gICAgICAgICAgICogfSk7XHJcbiAgICAgICAgICogPC9jb2RlPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvblNob3c6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25IaWRlOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uSG92ZXJDaGFuZ2VkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgICAgICBpZDogJ2JtcHVpLWlkLScgKyBndWlkXzEuR3VpZC5uZXh0KCksXHJcbiAgICAgICAgICAgIGNzc1ByZWZpeDogJ2JtcHVpJyxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1jb21wb25lbnQnLFxyXG4gICAgICAgICAgICBjc3NDbGFzc2VzOiBbXSxcclxuICAgICAgICAgICAgaGlkZGVuOiBmYWxzZVxyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCwgZS5nLiBieSBhcHBseWluZyBjb25maWcgc2V0dGluZ3MuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBtdXN0IG5vdCBiZSBjYWxsZWQgZnJvbSBvdXRzaWRlIHRoZSBVSSBmcmFtZXdvcmsuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgYnkgdGhlIHtAbGluayBVSUluc3RhbmNlTWFuYWdlcn0uIElmIHRoZSBjb21wb25lbnQgaXMgYW4gaW5uZXIgY29tcG9uZW50IG9mXHJcbiAgICAgKiBzb21lIGNvbXBvbmVudCwgYW5kIHRodXMgZW5jYXBzdWxhdGVkIGFiZCBtYW5hZ2VkIGludGVybmFsbHkgYW5kIG5ldmVyIGRpcmVjdGx5IGV4cG9zZWQgdG8gdGhlIFVJTWFuYWdlcixcclxuICAgICAqIHRoaXMgbWV0aG9kIG11c3QgYmUgY2FsbGVkIGZyb20gdGhlIG1hbmFnaW5nIGNvbXBvbmVudCdzIHtAbGluayAjaW5pdGlhbGl6ZX0gbWV0aG9kLlxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0aGlzLmNvbmZpZy5oaWRkZW47XHJcbiAgICAgICAgLy8gSGlkZSB0aGUgY29tcG9uZW50IGF0IGluaXRpYWxpemF0aW9uIGlmIGl0IGlzIGNvbmZpZ3VyZWQgdG8gYmUgaGlkZGVuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4oKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlOyAvLyBTZXQgZmxhZyB0byBmYWxzZSBmb3IgdGhlIGZvbGxvd2luZyBoaWRlKCkgY2FsbCB0byB3b3JrIChoaWRlKCkgY2hlY2tzIHRoZSBmbGFnKVxyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb25maWd1cmVzIHRoZSBjb21wb25lbnQgZm9yIHRoZSBzdXBwbGllZCBQbGF5ZXIgYW5kIFVJSW5zdGFuY2VNYW5hZ2VyLiBUaGlzIGlzIHRoZSBwbGFjZSB3aGVyZSBhbGwgdGhlIG1hZ2ljXHJcbiAgICAgKiBoYXBwZW5zLCB3aGVyZSBjb21wb25lbnRzIHR5cGljYWxseSBzdWJzY3JpYmUgYW5kIHJlYWN0IHRvIGV2ZW50cyAob24gdGhlaXIgRE9NIGVsZW1lbnQsIHRoZSBQbGF5ZXIsIG9yIHRoZVxyXG4gICAgICogVUlJbnN0YW5jZU1hbmFnZXIpLCBhbmQgYmFzaWNhbGx5IGV2ZXJ5dGhpbmcgdGhhdCBtYWtlcyB0aGVtIGludGVyYWN0aXZlLlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIG9ubHkgb25jZSwgd2hlbiB0aGUgVUlNYW5hZ2VyIGluaXRpYWxpemVzIHRoZSBVSS5cclxuICAgICAqXHJcbiAgICAgKiBTdWJjbGFzc2VzIHVzdWFsbHkgb3ZlcndyaXRlIHRoaXMgbWV0aG9kIHRvIGFkZCB0aGVpciBvd24gZnVuY3Rpb25hbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIHRoZSBwbGF5ZXIgd2hpY2ggdGhpcyBjb21wb25lbnQgY29udHJvbHNcclxuICAgICAqIEBwYXJhbSB1aW1hbmFnZXIgdGhlIFVJSW5zdGFuY2VNYW5hZ2VyIHRoYXQgbWFuYWdlcyB0aGlzIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5vblNob3cuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWltYW5hZ2VyLm9uQ29tcG9uZW50U2hvdy5kaXNwYXRjaChfdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vbkhpZGUuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdWltYW5hZ2VyLm9uQ29tcG9uZW50SGlkZS5kaXNwYXRjaChfdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gVHJhY2sgdGhlIGhvdmVyZWQgc3RhdGUgb2YgdGhlIGVsZW1lbnRcclxuICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMub25Ib3ZlckNoYW5nZWRFdmVudCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMub25Ib3ZlckNoYW5nZWRFdmVudChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZWxlYXNlcyBhbGwgcmVzb3VyY2VzIGFuZCBkZXBlbmRlbmNpZXMgdGhhdCB0aGUgY29tcG9uZW50IGhvbGRzLiBQbGF5ZXIsIERPTSwgYW5kIFVJTWFuYWdlciBldmVudHMgYXJlXHJcbiAgICAgKiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgZHVyaW5nIHJlbGVhc2UgYW5kIGRvIG5vdCBleHBsaWNpdGx5IG5lZWQgdG8gYmUgcmVtb3ZlZCBoZXJlLlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBVSU1hbmFnZXIgd2hlbiBpdCByZWxlYXNlcyB0aGUgVUkuXHJcbiAgICAgKlxyXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IG5lZWQgdG8gcmVsZWFzZSByZXNvdXJjZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGFuZCBjYWxsIHN1cGVyLnJlbGVhc2UoKS5cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIE5vdGhpbmcgdG8gZG8gaGVyZSwgb3ZlcnJpZGUgd2hlcmUgbmVjZXNzYXJ5XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSB0aGUgRE9NIGVsZW1lbnQgZm9yIHRoaXMgY29tcG9uZW50LlxyXG4gICAgICpcclxuICAgICAqIFN1YmNsYXNzZXMgdXN1YWxseSBvdmVyd3JpdGUgdGhpcyBtZXRob2QgdG8gZXh0ZW5kIG9yIHJlcGxhY2UgdGhlIERPTSBlbGVtZW50IHdpdGggdGhlaXIgb3duIGRlc2lnbi5cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgZG9tXzEuRE9NKHRoaXMuY29uZmlnLnRhZywge1xyXG4gICAgICAgICAgICAnaWQnOiB0aGlzLmNvbmZpZy5pZCxcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5nZXRDc3NDbGFzc2VzKClcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIERPTSBlbGVtZW50IG9mIHRoaXMgY29tcG9uZW50LiBDcmVhdGVzIHRoZSBET00gZWxlbWVudCBpZiBpdCBkb2VzIG5vdCB5ZXQgZXhpc3QuXHJcbiAgICAgKlxyXG4gICAgICogU2hvdWxkIG5vdCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtET019XHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZ2V0RG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLnRvRG9tRWxlbWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogTWVyZ2VzIGEgY29uZmlndXJhdGlvbiB3aXRoIGEgZGVmYXVsdCBjb25maWd1cmF0aW9uIGFuZCBhIGJhc2UgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBzdXBlcmNsYXNzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjb25maWcgdGhlIGNvbmZpZ3VyYXRpb24gc2V0dGluZ3MgZm9yIHRoZSBjb21wb25lbnRzLCBhcyB1c3VhbGx5IHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSBkZWZhdWx0cyBhIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmb3Igc2V0dGluZ3MgdGhhdCBhcmUgbm90IHBhc3NlZCB3aXRoIHRoZSBjb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gYmFzZSBjb25maWd1cmF0aW9uIGluaGVyaXRlZCBmcm9tIGEgc3VwZXJjbGFzc1xyXG4gICAgICogQHJldHVybnMge0NvbmZpZ31cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5tZXJnZUNvbmZpZyA9IGZ1bmN0aW9uIChjb25maWcsIGRlZmF1bHRzLCBiYXNlKSB7XHJcbiAgICAgICAgLy8gRXh0ZW5kIGRlZmF1bHQgY29uZmlnIHdpdGggc3VwcGxpZWQgY29uZmlnXHJcbiAgICAgICAgdmFyIG1lcmdlZCA9IE9iamVjdC5hc3NpZ24oe30sIGJhc2UsIGRlZmF1bHRzLCBjb25maWcpO1xyXG4gICAgICAgIC8vIFJldHVybiB0aGUgZXh0ZW5kZWQgY29uZmlnXHJcbiAgICAgICAgcmV0dXJuIG1lcmdlZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBtZXRob2QgdGhhdCByZXR1cm5zIGEgc3RyaW5nIG9mIGFsbCBDU1MgY2xhc3NlcyBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZ2V0Q3NzQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIE1lcmdlIGFsbCBDU1MgY2xhc3NlcyBpbnRvIHNpbmdsZSBhcnJheVxyXG4gICAgICAgIHZhciBmbGF0dGVuZWRBcnJheSA9IFt0aGlzLmNvbmZpZy5jc3NDbGFzc10uY29uY2F0KHRoaXMuY29uZmlnLmNzc0NsYXNzZXMpO1xyXG4gICAgICAgIC8vIFByZWZpeCBjbGFzc2VzXHJcbiAgICAgICAgZmxhdHRlbmVkQXJyYXkgPSBmbGF0dGVuZWRBcnJheS5tYXAoZnVuY3Rpb24gKGNzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJlZml4Q3NzKGNzcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSm9pbiBhcnJheSB2YWx1ZXMgaW50byBhIHN0cmluZ1xyXG4gICAgICAgIHZhciBmbGF0dGVuZWRTdHJpbmcgPSBmbGF0dGVuZWRBcnJheS5qb2luKCcgJyk7XHJcbiAgICAgICAgLy8gUmV0dXJuIHRyaW1tZWQgc3RyaW5nIHRvIHByZXZlbnQgd2hpdGVzcGFjZSBhdCB0aGUgZW5kIGZyb20gdGhlIGpvaW4gb3BlcmF0aW9uXHJcbiAgICAgICAgcmV0dXJuIGZsYXR0ZW5lZFN0cmluZy50cmltKCk7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5wcmVmaXhDc3MgPSBmdW5jdGlvbiAoY3NzQ2xhc3NPcklkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmNzc1ByZWZpeCArICctJyArIGNzc0NsYXNzT3JJZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnfVxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWc7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgY29tcG9uZW50IGlmIHNob3duLlxyXG4gICAgICogVGhpcyBtZXRob2QgYmFzaWNhbGx5IHRyYW5zZmVycyB0aGUgY29tcG9uZW50IGludG8gdGhlIGhpZGRlbiBzdGF0ZS4gQWN0dWFsIGhpZGluZyBpcyBkb25lIHZpYSBDU1MuXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkuYWRkQ2xhc3ModGhpcy5wcmVmaXhDc3MoQ29tcG9uZW50LkNMQVNTX0hJRERFTikpO1xyXG4gICAgICAgICAgICB0aGlzLm9uSGlkZUV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2hvd3MgdGhlIGNvbXBvbmVudCBpZiBoaWRkZW4uXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkucmVtb3ZlQ2xhc3ModGhpcy5wcmVmaXhDc3MoQ29tcG9uZW50LkNMQVNTX0hJRERFTikpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hvd0V2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29tcG9uZW50IGlzIGhpZGRlbi5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBjb21wb25lbnQgaXMgaGlkZGVuLCBlbHNlIGZhbHNlXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29tcG9uZW50IGlzIHNob3duLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGNvbXBvbmVudCBpcyB2aXNpYmxlLCBlbHNlIGZhbHNlXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuaXNTaG93biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNIaWRkZW4oKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgdGhlIGhpZGRlbiBzdGF0ZSBieSBoaWRpbmcgdGhlIGNvbXBvbmVudCBpZiBpdCBpcyBzaG93biwgb3Igc2hvd2luZyBpdCBpZiBoaWRkZW4uXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUudG9nZ2xlSGlkZGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGlkZGVuKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb21wb25lbnQgaXMgY3VycmVudGx5IGhvdmVyZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgY29tcG9uZW50IGlzIGhvdmVyZWQsIGVsc2UgZmFsc2VcclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5pc0hvdmVyZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG92ZXJlZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIHRoZSBvblNob3cgZXZlbnQuXHJcbiAgICAgKiBTZWUgdGhlIGRldGFpbGVkIGV4cGxhbmF0aW9uIG9uIGV2ZW50IGFyY2hpdGVjdHVyZSBvbiB0aGUge0BsaW5rICNjb21wb25lbnRFdmVudHMgZXZlbnRzIGxpc3R9LlxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLm9uU2hvd0V2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RXZlbnRzLm9uU2hvdy5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIHRoZSBvbkhpZGUgZXZlbnQuXHJcbiAgICAgKiBTZWUgdGhlIGRldGFpbGVkIGV4cGxhbmF0aW9uIG9uIGV2ZW50IGFyY2hpdGVjdHVyZSBvbiB0aGUge0BsaW5rICNjb21wb25lbnRFdmVudHMgZXZlbnRzIGxpc3R9LlxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLm9uSGlkZUV2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RXZlbnRzLm9uSGlkZS5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIHRoZSBvbkhvdmVyQ2hhbmdlZCBldmVudC5cclxuICAgICAqIFNlZSB0aGUgZGV0YWlsZWQgZXhwbGFuYXRpb24gb24gZXZlbnQgYXJjaGl0ZWN0dXJlIG9uIHRoZSB7QGxpbmsgI2NvbXBvbmVudEV2ZW50cyBldmVudHMgbGlzdH0uXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUub25Ib3ZlckNoYW5nZWRFdmVudCA9IGZ1bmN0aW9uIChob3ZlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5ob3ZlcmVkID0gaG92ZXJlZDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudEV2ZW50cy5vbkhvdmVyQ2hhbmdlZC5kaXNwYXRjaCh0aGlzLCB7IGhvdmVyZWQ6IGhvdmVyZWQgfSk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsIFwib25TaG93XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBzaG93aW5nLlxyXG4gICAgICAgICAqIFNlZSB0aGUgZGV0YWlsZWQgZXhwbGFuYXRpb24gb24gZXZlbnQgYXJjaGl0ZWN0dXJlIG9uIHRoZSB7QGxpbmsgI2NvbXBvbmVudEV2ZW50cyBldmVudHMgbGlzdH0uXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PENvbXBvbmVudDxDb25maWc+LCBOb0FyZ3M+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRFdmVudHMub25TaG93LmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgXCJvbkhpZGVcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGhpZGluZy5cclxuICAgICAgICAgKiBTZWUgdGhlIGRldGFpbGVkIGV4cGxhbmF0aW9uIG9uIGV2ZW50IGFyY2hpdGVjdHVyZSBvbiB0aGUge0BsaW5rICNjb21wb25lbnRFdmVudHMgZXZlbnRzIGxpc3R9LlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxDb21wb25lbnQ8Q29uZmlnPiwgTm9BcmdzPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50RXZlbnRzLm9uSGlkZS5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsIFwib25Ib3ZlckNoYW5nZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgaG92ZXItc3RhdGUgaXMgY2hhbmdpbmcuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PENvbXBvbmVudDxDb25maWc+LCBDb21wb25lbnRIb3ZlckNoYW5nZWRFdmVudEFyZ3M+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRFdmVudHMub25Ib3ZlckNoYW5nZWQuZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBDb21wb25lbnQ7XHJcbn0oKSk7XHJcbi8qKlxyXG4gKiBUaGUgY2xhc3NuYW1lIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIGVsZW1lbnQgd2hlbiBpdCBpcyBpbiB0aGUgaGlkZGVuIHN0YXRlLlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuQ29tcG9uZW50LkNMQVNTX0hJRERFTiA9ICdoaWRkZW4nO1xyXG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvY29tcG9uZW50LnRzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8qKlxyXG4gKiBTaW1wbGUgRE9NIG1hbmlwdWxhdGlvbiBhbmQgRE9NIGVsZW1lbnQgZXZlbnQgaGFuZGxpbmcgbW9kZWxlZCBhZnRlciBqUXVlcnkgKGFzIHJlcGxhY2VtZW50IGZvciBqUXVlcnkpLlxyXG4gKlxyXG4gKiBMaWtlIGpRdWVyeSwgRE9NIG9wZXJhdGVzIG9uIHNpbmdsZSBlbGVtZW50cyBhbmQgbGlzdHMgb2YgZWxlbWVudHMuIEZvciBleGFtcGxlOiBjcmVhdGluZyBhbiBlbGVtZW50IHJldHVybnMgYSBET01cclxuICogaW5zdGFuY2Ugd2l0aCBhIHNpbmdsZSBlbGVtZW50LCBzZWxlY3RpbmcgZWxlbWVudHMgcmV0dXJucyBhIERPTSBpbnN0YW5jZSB3aXRoIHplcm8sIG9uZSwgb3IgbWFueSBlbGVtZW50cy4gU2ltaWxhclxyXG4gKiB0byBqUXVlcnksIHNldHRlcnMgdXN1YWxseSBhZmZlY3QgYWxsIGVsZW1lbnRzLCB3aGlsZSBnZXR0ZXJzIG9wZXJhdGUgb24gb25seSB0aGUgZmlyc3QgZWxlbWVudC5cclxuICogQWxzbyBzaW1pbGFyIHRvIGpRdWVyeSwgbW9zdCBtZXRob2RzIChleGNlcHQgZ2V0dGVycykgcmV0dXJuIHRoZSBET00gaW5zdGFuY2UgZmFjaWxpdGF0aW5nIGVhc3kgY2hhaW5pbmcgb2YgbWV0aG9kXHJcbiAqIGNhbGxzLlxyXG4gKlxyXG4gKiBCdWlsdCB3aXRoIHRoZSBoZWxwIG9mOiBodHRwOi8veW91bWlnaHRub3RuZWVkanF1ZXJ5LmNvbS9cclxuICovXHJcbnZhciBET00gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRE9NKHNvbWV0aGluZywgYXR0cmlidXRlcykge1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDsgLy8gU2V0IHRoZSBnbG9iYWwgZG9jdW1lbnQgdG8gdGhlIGxvY2FsIGRvY3VtZW50IGZpZWxkXHJcbiAgICAgICAgaWYgKHNvbWV0aGluZyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChzb21ldGhpbmcubGVuZ3RoID4gMCAmJiBzb21ldGhpbmdbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gc29tZXRoaW5nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNvbWV0aGluZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gc29tZXRoaW5nO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzID0gW2VsZW1lbnRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzb21ldGhpbmcgaW5zdGFuY2VvZiBEb2N1bWVudCkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIGEgZG9jdW1lbnQgaXMgcGFzc2VkIGluLCB3ZSBkbyBub3QgZG8gYW55dGhpbmcgd2l0aCBpdCwgYnV0IGJ5IHNldHRpbmcgdGhpcy5lbGVtZW50cyB0byBudWxsXHJcbiAgICAgICAgICAgIC8vIHdlIGdpdmUgdGhlIGV2ZW50IGhhbmRsaW5nIG1ldGhvZCBhIG1lYW5zIHRvIGRldGVjdCBpZiB0aGUgZXZlbnRzIHNob3VsZCBiZSByZWdpc3RlcmVkIG9uIHRoZSBkb2N1bWVudFxyXG4gICAgICAgICAgICAvLyBpbnN0ZWFkIG9mIGVsZW1lbnRzLlxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICB2YXIgdGFnTmFtZSA9IHNvbWV0aGluZztcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVWYWx1ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtlbGVtZW50XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IHNvbWV0aGluZztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuZmluZENoaWxkRWxlbWVudHMoc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShET00ucHJvdG90eXBlLCBcImxlbmd0aFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRoYXQgdGhpcyBET00gaW5zdGFuY2UgY3VycmVudGx5IGhvbGRzLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMgPyB0aGlzLmVsZW1lbnRzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIEhUTUwgZWxlbWVudHMgdGhhdCB0aGlzIERPTSBpbnN0YW5jZSBjdXJyZW50bHkgaG9sZHMuXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnRbXX0gdGhlIHJhdyBIVE1MIGVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIERPTS5wcm90b3R5cGUuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIHNob3J0Y3V0IG1ldGhvZCBmb3IgaXRlcmF0aW5nIGFsbCBlbGVtZW50cy4gU2hvcnRzIHRoaXMuZWxlbWVudHMuZm9yRWFjaCguLi4pIHRvIHRoaXMuZm9yRWFjaCguLi4pLlxyXG4gICAgICogQHBhcmFtIGhhbmRsZXIgdGhlIGhhbmRsZXIgdG8gZXhlY3V0ZSBhbiBvcGVyYXRpb24gb24gYW4gZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBoYW5kbGVyKGVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuZmluZENoaWxkRWxlbWVudHNPZkVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICB2YXIgY2hpbGRFbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgLy8gQ29udmVydCBOb2RlTGlzdCB0byBBcnJheVxyXG4gICAgICAgIC8vIGh0dHBzOi8vdG9kZG1vdHRvLmNvbS9hLWNvbXByZWhlbnNpdmUtZGl2ZS1pbnRvLW5vZGVsaXN0cy1hcnJheXMtY29udmVydGluZy1ub2RlbGlzdHMtYW5kLXVuZGVyc3RhbmRpbmctdGhlLWRvbS9cclxuICAgICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChjaGlsZEVsZW1lbnRzKTtcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmZpbmRDaGlsZEVsZW1lbnRzID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgYWxsQ2hpbGRFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgYWxsQ2hpbGRFbGVtZW50cyA9IGFsbENoaWxkRWxlbWVudHMuY29uY2F0KF90aGlzLmZpbmRDaGlsZEVsZW1lbnRzT2ZFbGVtZW50KGVsZW1lbnQsIHNlbGVjdG9yKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZENoaWxkRWxlbWVudHNPZkVsZW1lbnQoZG9jdW1lbnQsIHNlbGVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFsbENoaWxkRWxlbWVudHM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBhbGwgY2hpbGQgZWxlbWVudHMgb2YgYWxsIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzdXBwbGllZCBzZWxlY3Rvci5cclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciB0aGUgc2VsZWN0b3IgdG8gbWF0Y2ggd2l0aCBjaGlsZCBlbGVtZW50c1xyXG4gICAgICogQHJldHVybnMge0RPTX0gYSBuZXcgRE9NIGluc3RhbmNlIHJlcHJlc2VudGluZyBhbGwgbWF0Y2hlZCBjaGlsZHJlblxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICB2YXIgYWxsQ2hpbGRFbGVtZW50cyA9IHRoaXMuZmluZENoaWxkRWxlbWVudHMoc2VsZWN0b3IpO1xyXG4gICAgICAgIHJldHVybiBuZXcgRE9NKGFsbENoaWxkRWxlbWVudHMpO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEh0bWwoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRIdG1sKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuZ2V0SHRtbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1swXS5pbm5lckhUTUw7XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5zZXRIdG1sID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICBpZiAoY29udGVudCA9PT0gdW5kZWZpbmVkIHx8IGNvbnRlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBTZXQgdG8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIGlubmVySFRNTCBnZXR0aW5nIHNldCB0byAndW5kZWZpbmVkJyAoYWxsIGJyb3dzZXJzKSBvciAnbnVsbCcgKElFOSlcclxuICAgICAgICAgICAgY29udGVudCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBpbm5lciBIVE1MIG9mIGFsbCBlbGVtZW50cyAoZGVsZXRlcyBhbGwgY2hpbGRyZW4pLlxyXG4gICAgICogQHJldHVybnMge0RPTX1cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGZpcnN0IGZvcm0gZWxlbWVudCwgZS5nLiB0aGUgc2VsZWN0ZWQgdmFsdWUgb2YgYSBzZWxlY3QgYm94IG9yIHRoZSB0ZXh0IGlmIGFuXHJcbiAgICAgKiBpbnB1dCBmaWVsZC5cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSB2YWx1ZSBvZiBhIGZvcm0gZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudHNbMF07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gYWRkIHN1cHBvcnQgZm9yIG1pc3NpbmcgZm9ybSBlbGVtZW50c1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2YWwoKSBub3Qgc3VwcG9ydGVkIGZvciBcIiArIHR5cGVvZiBlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0QXR0cihhdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHIoYXR0cmlidXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5nZXRBdHRyID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWzBdLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuc2V0QXR0ciA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uIChkYXRhQXR0cmlidXRlLCB2YWx1ZSkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXREYXRhKGRhdGFBdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoZGF0YUF0dHJpYnV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uIChkYXRhQXR0cmlidXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBkYXRhQXR0cmlidXRlKTtcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLnNldERhdGEgPSBmdW5jdGlvbiAoZGF0YUF0dHJpYnV0ZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGRhdGFBdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEFwcGVuZHMgb25lIG9yIG1vcmUgRE9NIGVsZW1lbnRzIGFzIGNoaWxkcmVuIHRvIGFsbCBlbGVtZW50cy5cclxuICAgICAqIEBwYXJhbSBjaGlsZEVsZW1lbnRzIHRoZSBjaHJpbGQgZWxlbWVudHMgdG8gYXBwZW5kXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NfVxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hpbGRFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGNoaWxkRWxlbWVudHNbX2ldID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoXywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkRWxlbWVudC5lbGVtZW50c1tpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgZWxlbWVudHMgZnJvbSB0aGUgRE9NLlxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSB0aGUgZG9jdW1lbnQncyB0b3AgbGVmdCBjb3JuZXIuXHJcbiAgICAgKiBAcmV0dXJucyB7T2Zmc2V0fVxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLm9mZnNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudHNbMF07XHJcbiAgICAgICAgdmFyIGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB2YXIgaHRtbFJlY3QgPSBkb2N1bWVudC5ib2R5LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgLy8gVmlydHVhbCB2aWV3cG9ydCBzY3JvbGwgaGFuZGxpbmcgKGUuZy4gcGluY2ggem9vbWVkIHZpZXdwb3J0cyBpbiBtb2JpbGUgYnJvd3NlcnMgb3IgZGVza3RvcCBDaHJvbWUvRWRnZSlcclxuICAgICAgICAvLyAnbm9ybWFsJyB6b29tcyBhbmQgdmlydHVhbCB2aWV3cG9ydCB6b29tcyAoYWthIGxheW91dCB2aWV3cG9ydCkgcmVzdWx0IGluIGRpZmZlcmVudFxyXG4gICAgICAgIC8vIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgcmVzdWx0czpcclxuICAgICAgICAvLyAgLSB3aXRoIG5vcm1hbCBzY3JvbGxzLCB0aGUgY2xpZW50UmVjdCBkZWNyZWFzZXMgd2l0aCBhbiBpbmNyZWFzZSBpbiBzY3JvbGwoVG9wfExlZnQpL3BhZ2UoWHxZKU9mZnNldFxyXG4gICAgICAgIC8vICAtIHdpdGggcGluY2ggem9vbSBzY3JvbGxzLCB0aGUgY2xpZW50UmVjdCBzdGF5cyB0aGUgc2FtZSB3aGlsZSBzY3JvbGwvcGFnZU9mZnNldCBjaGFuZ2VzXHJcbiAgICAgICAgLy8gVGhpcyBtZWFucywgdGhhdCB0aGUgY29tYmluYXRpb24gb2YgY2xpZW50UmVjdCArIHNjcm9sbC9wYWdlT2Zmc2V0IGRvZXMgbm90IHdvcmsgdG8gY2FsY3VsYXRlIHRoZSBvZmZzZXRcclxuICAgICAgICAvLyBmcm9tIHRoZSBkb2N1bWVudCdzIHVwcGVyIGxlZnQgb3JpZ2luIHdoZW4gcGluY2ggem9vbSBpcyB1c2VkLlxyXG4gICAgICAgIC8vIFRvIHdvcmsgYXJvdW5kIHRoaXMgaXNzdWUsIHdlIGRvIG5vdCB1c2Ugc2Nyb2xsL3BhZ2VPZmZzZXQgYnV0IGdldCB0aGUgY2xpZW50UmVjdCBvZiB0aGUgaHRtbCBlbGVtZW50IGFuZFxyXG4gICAgICAgIC8vIHN1YnRyYWN0IGl0IGZyb20gdGhlIGVsZW1lbnQncyByZWN0LCB3aGljaCBhbHdheXMgcmVzdWx0cyBpbiB0aGUgb2Zmc2V0IGZyb20gdGhlIGRvY3VtZW50IG9yaWdpbi5cclxuICAgICAgICAvLyBOT1RFOiB0aGUgY3VycmVudCB3YXkgb2Ygb2Zmc2V0IGNhbGN1bGF0aW9uIHdhcyBpbXBsZW1lbnRlZCBzcGVjaWZpY2FsbHkgdG8gdHJhY2sgZXZlbnQgcG9zaXRpb25zIG9uIHRoZVxyXG4gICAgICAgIC8vIHNlZWsgYmFyLCBhbmQgaXQgbWlnaHQgYnJlYWsgY29tcGF0aWJpbGl0eSB3aXRoIGpRdWVyeSdzIG9mZnNldCgpIG1ldGhvZC4gSWYgdGhpcyBldmVyIHR1cm5zIG91dCB0byBiZSBhXHJcbiAgICAgICAgLy8gcHJvYmxlbSwgdGhpcyBtZXRob2Qgc2hvdWxkIGJlIHJldmVydGVkIHRvIHRoZSBvbGQgdmVyc2lvbiBhbmQgdGhlIG9mZnNldCBjYWxjdWxhdGlvbiBtb3ZlZCB0byB0aGUgc2VlayBiYXIuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiBlbGVtZW50UmVjdC50b3AgLSBodG1sUmVjdC50b3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IGVsZW1lbnRSZWN0LmxlZnQgLSBodG1sUmVjdC5sZWZ0XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBmaXJzdCBlbGVtZW50LlxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gdGhlIHdpZHRoIG9mIHRoZSBmaXJzdCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIERPTS5wcm90b3R5cGUud2lkdGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gVE9ETyBjaGVjayBpZiB0aGlzIGlzIHRoZSBzYW1lIGFzIGpRdWVyeSdzIHdpZHRoKCkgKHByb2JhYmx5IG5vdClcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1swXS5vZmZzZXRXaWR0aDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGUgZmlyc3QgZWxlbWVudC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBoZWlnaHQgb2YgdGhlIGZpcnN0IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5oZWlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gVE9ETyBjaGVjayBpZiB0aGlzIGlzIHRoZSBzYW1lIGFzIGpRdWVyeSdzIGhlaWdodCgpIChwcm9iYWJseSBub3QpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbMF0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoZXMgYW4gZXZlbnQgaGFuZGxlciB0byBvbmUgb3IgbW9yZSBldmVudHMgb24gYWxsIGVsZW1lbnRzLlxyXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSB0aGUgZXZlbnQgbmFtZSAob3IgbXVsdGlwbGUgbmFtZXMgc2VwYXJhdGVkIGJ5IHNwYWNlKSB0byBsaXN0ZW4gdG9cclxuICAgICAqIEBwYXJhbSBldmVudEhhbmRsZXIgdGhlIGV2ZW50IGhhbmRsZXIgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBmaXJlc1xyXG4gICAgICogQHJldHVybnMge0RPTX1cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50SGFuZGxlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdCgnICcpO1xyXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuZWxlbWVudHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBldmVudCBoYW5kbGVyIGZyb20gb25lIG9yIG1vcmUgZXZlbnRzIG9uIGFsbCBlbGVtZW50cy5cclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgdGhlIGV2ZW50IG5hbWUgKG9yIG11bHRpcGxlIG5hbWVzIHNlcGFyYXRlZCBieSBzcGFjZSkgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyIGZyb21cclxuICAgICAqIEBwYXJhbSBldmVudEhhbmRsZXIgdGhlIGV2ZW50IGhhbmRsZXIgdG8gcmVtb3ZlXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NfVxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50SGFuZGxlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdCgnICcpO1xyXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuZWxlbWVudHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgc3BlY2lmaWVkIGNsYXNzKGVzKSB0byBhbGwgZWxlbWVudHMuXHJcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lIHRoZSBjbGFzcyhlcykgdG8gYWRkLCBtdWx0aXBsZSBjbGFzc2VzIHNlcGFyYXRlZCBieSBzcGFjZVxyXG4gICAgICogQHJldHVybnMge0RPTX1cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlZCB0aGUgc3BlY2lmaWVkIGNsYXNzKGVzKSBmcm9tIGFsbCBlbGVtZW50cy5cclxuICAgICAqIEBwYXJhbSBjbGFzc05hbWUgdGhlIGNsYXNzKGVzKSB0byByZW1vdmUsIG11bHRpcGxlIGNsYXNzZXMgc2VwYXJhdGVkIGJ5IHNwYWNlXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NfVxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhbnkgb2YgdGhlIGVsZW1lbnRzIGhhcyB0aGUgc3BlY2lmaWVkIGNsYXNzLlxyXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZSB0aGUgY2xhc3MgbmFtZSB0byBjaGVja1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgb25lIG9mIHRoZSBlbGVtZW50cyBoYXMgdGhlIGNsYXNzIGF0dGFjaGVkLCBlbHNlIGlmIG5vIGVsZW1lbnQgaGFzIGl0IGF0dGFjaGVkXHJcbiAgICAgKi9cclxuICAgIERPTS5wcm90b3R5cGUuaGFzQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdmFyIGhhc0NsYXNzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBhcmUgaW5zaWRlIGEgaGFuZGxlciwgd2UgY2FuJ3QganVzdCAncmV0dXJuIHRydWUnLiBJbnN0ZWFkLCB3ZSBzYXZlIGl0IHRvIGEgdmFyaWFibGVcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgcmV0dXJuIGl0IGF0IHRoZSBlbmQgb2YgdGhlIGZ1bmN0aW9uIGJvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzQ2xhc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VlIGNvbW1lbnQgYWJvdmVcclxuICAgICAgICAgICAgICAgICAgICBoYXNDbGFzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaGFzQ2xhc3M7XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lT3JDb2xsZWN0aW9uLCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHlOYW1lT3JDb2xsZWN0aW9uID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lT3JDb2xsZWN0aW9uO1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q3NzKHByb3BlcnR5TmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3NzKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eVZhbHVlQ29sbGVjdGlvbiA9IHByb3BlcnR5TmFtZU9yQ29sbGVjdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0Q3NzQ29sbGVjdGlvbihwcm9wZXJ0eVZhbHVlQ29sbGVjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuZ2V0Q3NzID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudHNbMF0pW3Byb3BlcnR5TmFtZV07XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5zZXRDc3MgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAvLyA8YW55PiBjYXN0IHRvIHJlc29sdmUgVFM3MDE1OiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNjYyNzExNC8zNzAyNTJcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5zZXRDc3NDb2xsZWN0aW9uID0gZnVuY3Rpb24gKHJ1bGVWYWx1ZUNvbGxlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzQ0OTA1NzMvMzcwMjUyXHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgcnVsZVZhbHVlQ29sbGVjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERPTTtcclxufSgpKTtcclxuZXhwb3J0cy5ET00gPSBET007XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9kb20udHNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4uL2V2ZW50ZGlzcGF0Y2hlclwiKTtcclxuLyoqXHJcbiAqIEEgc2ltcGxlIHRleHQgbGFiZWwuXHJcbiAqXHJcbiAqIERPTSBleGFtcGxlOlxyXG4gKiA8Y29kZT5cclxuICogICAgIDxzcGFuIGNsYXNzPSd1aS1sYWJlbCc+Li4uc29tZSB0ZXh0Li4uPC9zcGFuPlxyXG4gKiA8L2NvZGU+XHJcbiAqL1xyXG52YXIgTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGFiZWwoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmxhYmVsRXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvbkNsaWNrOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uVGV4dENoYW5nZWQ6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWxhYmVsJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgX3RoaXMudGV4dCA9IF90aGlzLmNvbmZpZy50ZXh0O1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIExhYmVsLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbGFiZWxFbGVtZW50ID0gbmV3IGRvbV8xLkRPTSgnc3BhbicsIHtcclxuICAgICAgICAgICAgJ2lkJzogdGhpcy5jb25maWcuaWQsXHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMuZ2V0Q3NzQ2xhc3NlcygpXHJcbiAgICAgICAgfSkuaHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgIGxhYmVsRWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9uQ2xpY2tFdmVudCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsYWJlbEVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHRleHQgb24gdGhpcyBsYWJlbC5cclxuICAgICAqIEBwYXJhbSB0ZXh0XHJcbiAgICAgKi9cclxuICAgIExhYmVsLnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmh0bWwodGV4dCk7XHJcbiAgICAgICAgdGhpcy5vblRleHRDaGFuZ2VkRXZlbnQodGV4dCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0ZXh0IG9uIHRoaXMgbGFiZWwuXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0ZXh0IG9uIHRoZSBsYWJlbFxyXG4gICAgICovXHJcbiAgICBMYWJlbC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSB0ZXh0IG9uIHRoaXMgbGFiZWwuXHJcbiAgICAgKi9cclxuICAgIExhYmVsLnByb3RvdHlwZS5jbGVhclRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkuaHRtbCgnJyk7XHJcbiAgICAgICAgdGhpcy5vblRleHRDaGFuZ2VkRXZlbnQobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0cyBpZiB0aGUgbGFiZWwgaXMgZW1wdHkgYW5kIGRvZXMgbm90IGNvbnRhaW4gYW55IHRleHQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBsYWJlbCBpcyBlbXB0eSwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBMYWJlbC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMudGV4dDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIHRoZSB7QGxpbmsgI29uQ2xpY2t9IGV2ZW50LlxyXG4gICAgICogQ2FuIGJlIHVzZWQgYnkgc3ViY2xhc3NlcyB0byBsaXN0ZW4gdG8gdGhpcyBldmVudCB3aXRob3V0IHN1YnNjcmliaW5nIGFuIGV2ZW50IGxpc3RlbmVyIGJ5IG92ZXJ3cml0aW5nIHRoZSBtZXRob2RcclxuICAgICAqIGFuZCBjYWxsaW5nIHRoZSBzdXBlciBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIExhYmVsLnByb3RvdHlwZS5vbkNsaWNrRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbEV2ZW50cy5vbkNsaWNrLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIHtAbGluayAjb25DbGlja30gZXZlbnQuXHJcbiAgICAgKiBDYW4gYmUgdXNlZCBieSBzdWJjbGFzc2VzIHRvIGxpc3RlbiB0byB0aGlzIGV2ZW50IHdpdGhvdXQgc3Vic2NyaWJpbmcgYW4gZXZlbnQgbGlzdGVuZXIgYnkgb3ZlcndyaXRpbmcgdGhlIG1ldGhvZFxyXG4gICAgICogYW5kIGNhbGxpbmcgdGhlIHN1cGVyIG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgTGFiZWwucHJvdG90eXBlLm9uVGV4dENoYW5nZWRFdmVudCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbEV2ZW50cy5vblRleHRDaGFuZ2VkLmRpc3BhdGNoKHRoaXMsIHRleHQpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwib25DbGlja1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBsYWJlbCBpcyBjbGlja2VkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxMYWJlbDxMYWJlbENvbmZpZz4sIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsRXZlbnRzLm9uQ2xpY2suZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwib25UZXh0Q2hhbmdlZFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSB0ZXh0IG9uIHRoZSBsYWJlbCBpcyBjaGFuZ2VkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxMYWJlbDxMYWJlbENvbmZpZz4sIHN0cmluZz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsRXZlbnRzLm9uVGV4dENoYW5nZWQuZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBMYWJlbDtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuZXhwb3J0cy5MYWJlbCA9IExhYmVsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9sYWJlbC50c1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vYnV0dG9uXCIpO1xyXG52YXIgZXZlbnRkaXNwYXRjaGVyXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRkaXNwYXRjaGVyXCIpO1xyXG4vKipcclxuICogQSBidXR0b24gdGhhdCBjYW4gYmUgdG9nZ2xlZCBiZXR3ZWVuICdvbicgYW5kICdvZmYnIHN0YXRlcy5cclxuICovXHJcbnZhciBUb2dnbGVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFRvZ2dsZUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRvZ2dsZUJ1dHRvbihjb25maWcpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMudG9nZ2xlQnV0dG9uRXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvblRvZ2dsZTogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICBvblRvZ2dsZU9uOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uVG9nZ2xlT2ZmOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXRvZ2dsZWJ1dHRvbidcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgYnV0dG9uIHRvIHRoZSAnb24nIHN0YXRlLlxyXG4gICAgICovXHJcbiAgICBUb2dnbGVCdXR0b24ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT2ZmKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5vblN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkucmVtb3ZlQ2xhc3ModGhpcy5wcmVmaXhDc3MoVG9nZ2xlQnV0dG9uLkNMQVNTX09GRikpO1xyXG4gICAgICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyh0aGlzLnByZWZpeENzcyhUb2dnbGVCdXR0b24uQ0xBU1NfT04pKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvZ2dsZUV2ZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub2dnbGVPbkV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgYnV0dG9uIHRvIHRoZSAnb2ZmJyBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyh0aGlzLnByZWZpeENzcyhUb2dnbGVCdXR0b24uQ0xBU1NfT04pKTtcclxuICAgICAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkuYWRkQ2xhc3ModGhpcy5wcmVmaXhDc3MoVG9nZ2xlQnV0dG9uLkNMQVNTX09GRikpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG9nZ2xlRXZlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvZ2dsZU9mZkV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHRoZSBidXR0b24gJ29uJyBpZiBpdCBpcyAnb2ZmJywgb3IgJ29mZicgaWYgaXQgaXMgJ29uJy5cclxuICAgICAqL1xyXG4gICAgVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2ZmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGluIHRoZSAnb24nIHN0YXRlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgYnV0dG9uIGlzICdvbicsIGZhbHNlIGlmICdvZmYnXHJcbiAgICAgKi9cclxuICAgIFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuaXNPbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vblN0YXRlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGluIHRoZSAnb2ZmJyBzdGF0ZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIGJ1dHRvbiBpcyAnb2ZmJywgZmFsc2UgaWYgJ29uJ1xyXG4gICAgICovXHJcbiAgICBUb2dnbGVCdXR0b24ucHJvdG90eXBlLmlzT2ZmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09uKCk7XHJcbiAgICB9O1xyXG4gICAgVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vbkNsaWNrRXZlbnQuY2FsbCh0aGlzKTtcclxuICAgICAgICAvLyBGaXJlIHRoZSB0b2dnbGUgZXZlbnQgdG9nZXRoZXIgd2l0aCB0aGUgY2xpY2sgZXZlbnRcclxuICAgICAgICAvLyAodGhleSBhcmUgdGVjaG5pY2FsbHkgdGhlIHNhbWUsIG9ubHkgdGhlIHNlbWFudGljcyBhcmUgZGlmZmVyZW50KVxyXG4gICAgICAgIHRoaXMub25Ub2dnbGVFdmVudCgpO1xyXG4gICAgfTtcclxuICAgIFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUub25Ub2dnbGVFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvbkV2ZW50cy5vblRvZ2dsZS5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBUb2dnbGVCdXR0b24ucHJvdG90eXBlLm9uVG9nZ2xlT25FdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvbkV2ZW50cy5vblRvZ2dsZU9uLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUub25Ub2dnbGVPZmZFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvbkV2ZW50cy5vblRvZ2dsZU9mZi5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVG9nZ2xlQnV0dG9uLnByb3RvdHlwZSwgXCJvblRvZ2dsZVwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBidXR0b24gaXMgdG9nZ2xlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8VG9nZ2xlQnV0dG9uPENvbmZpZz4sIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbkV2ZW50cy5vblRvZ2dsZS5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUsIFwib25Ub2dnbGVPblwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBidXR0b24gaXMgdG9nZ2xlZCAnb24nLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxUb2dnbGVCdXR0b248Q29uZmlnPiwgTm9BcmdzPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uRXZlbnRzLm9uVG9nZ2xlT24uZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUb2dnbGVCdXR0b24ucHJvdG90eXBlLCBcIm9uVG9nZ2xlT2ZmXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gdGhlIGJ1dHRvbiBpcyB0b2dnbGVkICdvZmYnLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxUb2dnbGVCdXR0b248Q29uZmlnPiwgTm9BcmdzPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlQnV0dG9uRXZlbnRzLm9uVG9nZ2xlT2ZmLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gVG9nZ2xlQnV0dG9uO1xyXG59KGJ1dHRvbl8xLkJ1dHRvbikpO1xyXG5Ub2dnbGVCdXR0b24uQ0xBU1NfT04gPSAnb24nO1xyXG5Ub2dnbGVCdXR0b24uQ0xBU1NfT0ZGID0gJ29mZic7XHJcbmV4cG9ydHMuVG9nZ2xlQnV0dG9uID0gVG9nZ2xlQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy90b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbi8qKlxyXG4gKiBFdmVudCBkaXNwYXRjaGVyIHRvIHN1YnNjcmliZSBhbmQgdHJpZ2dlciBldmVudHMuIEVhY2ggZXZlbnQgc2hvdWxkIGhhdmUgaXRzIG93biBkaXNwYXRjaGVyLlxyXG4gKi9cclxudmFyIEV2ZW50RGlzcGF0Y2hlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFdmVudERpc3BhdGNoZXIoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0RG9jfVxyXG4gICAgICovXHJcbiAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobmV3IEV2ZW50TGlzdGVuZXJXcmFwcGVyKGxpc3RlbmVyKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiB7QGluaGVyaXREb2N9XHJcbiAgICAgKi9cclxuICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlT25jZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobmV3IEV2ZW50TGlzdGVuZXJXcmFwcGVyKGxpc3RlbmVyLCB0cnVlKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiB7QGluaGVyaXREb2N9XHJcbiAgICAgKi9cclxuICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlUmF0ZUxpbWl0ZWQgPSBmdW5jdGlvbiAobGlzdGVuZXIsIHJhdGVNcykge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobmV3IFJhdGVMaW1pdGVkRXZlbnRMaXN0ZW5lcldyYXBwZXIobGlzdGVuZXIsIHJhdGVNcykpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0RG9jfVxyXG4gICAgICovXHJcbiAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGxpc3RlbmVycywgY29tcGFyZSB3aXRoIHBhcmFtZXRlciwgYW5kIHJlbW92ZSBpZiBmb3VuZFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN1YnNjcmliZWRMaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlZExpc3RlbmVyLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5BcnJheVV0aWxzLnJlbW92ZSh0aGlzLmxpc3RlbmVycywgc3Vic2NyaWJlZExpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIHRoaXMgZGlzcGF0Y2hlci5cclxuICAgICAqL1xyXG4gICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS51bnN1YnNjcmliZUFsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRGlzcGF0Y2hlcyBhbiBldmVudCB0byBhbGwgc3Vic2NyaWJlZCBsaXN0ZW5lcnMuXHJcbiAgICAgKiBAcGFyYW0gc2VuZGVyIHRoZSBzb3VyY2Ugb2YgdGhlIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gYXJncyB0aGUgYXJndW1lbnRzIGZvciB0aGUgZXZlbnRcclxuICAgICAqL1xyXG4gICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXJncyA9PT0gdm9pZCAwKSB7IGFyZ3MgPSBudWxsOyB9XHJcbiAgICAgICAgdmFyIGxpc3RlbmVyc1RvUmVtb3ZlID0gW107XHJcbiAgICAgICAgLy8gQ2FsbCBldmVyeSBsaXN0ZW5lclxyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLmxpc3RlbmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5maXJlKHNlbmRlciwgYXJncyk7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lci5pc09uY2UoKSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzVG9SZW1vdmUucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIG9uZS10aW1lIGxpc3RlbmVyXHJcbiAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBsaXN0ZW5lcnNUb1JlbW92ZV8xID0gbGlzdGVuZXJzVG9SZW1vdmU7IF9iIDwgbGlzdGVuZXJzVG9SZW1vdmVfMS5sZW5ndGg7IF9iKyspIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVyVG9SZW1vdmUgPSBsaXN0ZW5lcnNUb1JlbW92ZV8xW19iXTtcclxuICAgICAgICAgICAgdXRpbHNfMS5BcnJheVV0aWxzLnJlbW92ZSh0aGlzLmxpc3RlbmVycywgbGlzdGVuZXJUb1JlbW92ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXZlbnQgdGhhdCB0aGlzIGRpc3BhdGNoZXIgbWFuYWdlcyBhbmQgb24gd2hpY2ggbGlzdGVuZXJzIGNhbiBzdWJzY3JpYmUgYW5kIHVuc3Vic2NyaWJlIGV2ZW50IGhhbmRsZXJzLlxyXG4gICAgICogQHJldHVybnMge0V2ZW50fVxyXG4gICAgICovXHJcbiAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmdldEV2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEZvciBub3csIGp1c3QgY2FzdCB0aGUgZXZlbnQgZGlzcGF0Y2hlciB0byB0aGUgZXZlbnQgaW50ZXJmYWNlLiBBdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUgd2hlbiB0aGVcclxuICAgICAgICAvLyBjb2RlYmFzZSBncm93cywgaXQgbWlnaHQgbWFrZSBzZW5zZSB0byBzcGxpdCB0aGUgZGlzcGF0Y2hlciBpbnRvIHNlcGFyYXRlIGRpc3BhdGNoZXIgYW5kIGV2ZW50IGNsYXNzZXMuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEV2ZW50RGlzcGF0Y2hlcjtcclxufSgpKTtcclxuZXhwb3J0cy5FdmVudERpc3BhdGNoZXIgPSBFdmVudERpc3BhdGNoZXI7XHJcbi8qKlxyXG4gKiBBIGJhc2ljIGV2ZW50IGxpc3RlbmVyIHdyYXBwZXIgdG8gbWFuYWdlIGxpc3RlbmVycyB3aXRoaW4gdGhlIHtAbGluayBFdmVudERpc3BhdGNoZXJ9LiBUaGlzIGlzIGEgJ3ByaXZhdGUnIGNsYXNzXHJcbiAqIGZvciBpbnRlcm5hbCBkaXNwYXRjaGVyIHVzZSBhbmQgaXQgaXMgdGhlcmVmb3JlIG5vdCBleHBvcnRlZC5cclxuICovXHJcbnZhciBFdmVudExpc3RlbmVyV3JhcHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFdmVudExpc3RlbmVyV3JhcHBlcihsaXN0ZW5lciwgb25jZSkge1xyXG4gICAgICAgIGlmIChvbmNlID09PSB2b2lkIDApIHsgb25jZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgdGhpcy5vbmNlID0gb25jZTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudExpc3RlbmVyV3JhcHBlci5wcm90b3R5cGUsIFwibGlzdGVuZXJcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgdGhlIHdyYXBwZWQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50TGlzdGVuZXI8U2VuZGVyLCBBcmdzPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRMaXN0ZW5lcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIHdyYXBwZWQgZXZlbnQgbGlzdGVuZXIgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxyXG4gICAgICogQHBhcmFtIHNlbmRlclxyXG4gICAgICogQHBhcmFtIGFyZ3NcclxuICAgICAqL1xyXG4gICAgRXZlbnRMaXN0ZW5lcldyYXBwZXIucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyKHNlbmRlciwgYXJncyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBsaXN0ZW5lciBpcyBzY2hlZHVsZWQgdG8gYmUgY2FsbGVkIG9ubHkgb25jZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBvbmNlIGlmIHRydWVcclxuICAgICAqL1xyXG4gICAgRXZlbnRMaXN0ZW5lcldyYXBwZXIucHJvdG90eXBlLmlzT25jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbmNlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBFdmVudExpc3RlbmVyV3JhcHBlcjtcclxufSgpKTtcclxuLyoqXHJcbiAqIEV4dGVuZHMgdGhlIGJhc2ljIHtAbGluayBFdmVudExpc3RlbmVyV3JhcHBlcn0gd2l0aCByYXRlLWxpbWl0aW5nIGZ1bmN0aW9uYWxpdHkuXHJcbiAqL1xyXG52YXIgUmF0ZUxpbWl0ZWRFdmVudExpc3RlbmVyV3JhcHBlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUmF0ZUxpbWl0ZWRFdmVudExpc3RlbmVyV3JhcHBlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFJhdGVMaW1pdGVkRXZlbnRMaXN0ZW5lcldyYXBwZXIobGlzdGVuZXIsIHJhdGVNcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGxpc3RlbmVyKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnJhdGVNcyA9IHJhdGVNcztcclxuICAgICAgICBfdGhpcy5sYXN0RmlyZVRpbWUgPSAwO1xyXG4gICAgICAgIC8vIFdyYXAgdGhlIGV2ZW50IGxpc3RlbmVyIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBkb2VzIHRoZSByYXRlLWxpbWl0aW5nXHJcbiAgICAgICAgX3RoaXMucmF0ZUxpbWl0aW5nRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSBfdGhpcy5sYXN0RmlyZVRpbWUgPiBfdGhpcy5yYXRlTXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgaWYgZW5vdWdoIHRpbWUgc2luY2UgdGhlIHByZXZpb3VzIGNhbGwgaGFzIHBhc3NlZCwgY2FsbCB0aGVcclxuICAgICAgICAgICAgICAgIC8vIGFjdHVhbCBldmVudCBsaXN0ZW5lciBhbmQgcmVjb3JkIHRoZSBjdXJyZW50IHRpbWVcclxuICAgICAgICAgICAgICAgIF90aGlzLmZpcmVTdXBlcihzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubGFzdEZpcmVUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUmF0ZUxpbWl0ZWRFdmVudExpc3RlbmVyV3JhcHBlci5wcm90b3R5cGUuZmlyZVN1cGVyID0gZnVuY3Rpb24gKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIC8vIEZpcmUgdGhlIGFjdHVhbCBleHRlcm5hbCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuZmlyZS5jYWxsKHRoaXMsIHNlbmRlciwgYXJncyk7XHJcbiAgICB9O1xyXG4gICAgUmF0ZUxpbWl0ZWRFdmVudExpc3RlbmVyV3JhcHBlci5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICAvLyBGaXJlIHRoZSBpbnRlcm5hbCByYXRlLWxpbWl0aW5nIGxpc3RlbmVyIGluc3RlYWQgb2YgdGhlIGV4dGVybmFsIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgdGhpcy5yYXRlTGltaXRpbmdFdmVudExpc3RlbmVyKHNlbmRlciwgYXJncyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJhdGVMaW1pdGVkRXZlbnRMaXN0ZW5lcldyYXBwZXI7XHJcbn0oRXZlbnRMaXN0ZW5lcldyYXBwZXIpKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2V2ZW50ZGlzcGF0Y2hlci50c1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50XCIpO1xyXG52YXIgZG9tXzEgPSByZXF1aXJlKFwiLi4vZG9tXCIpO1xyXG52YXIgZXZlbnRkaXNwYXRjaGVyXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRkaXNwYXRjaGVyXCIpO1xyXG4vKipcclxuICogQSBzaW1wbGUgY2xpY2thYmxlIGJ1dHRvbi5cclxuICovXHJcbnZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEJ1dHRvbihjb25maWcpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuYnV0dG9uRXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvbkNsaWNrOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWJ1dHRvbidcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEJ1dHRvbi5wcm90b3R5cGUudG9Eb21FbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBidXR0b24gZWxlbWVudCB3aXRoIHRoZSB0ZXh0IGxhYmVsXHJcbiAgICAgICAgdmFyIGJ1dHRvbkVsZW1lbnQgPSBuZXcgZG9tXzEuRE9NKCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgICd0eXBlJzogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICdpZCc6IHRoaXMuY29uZmlnLmlkLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLmdldENzc0NsYXNzZXMoKVxyXG4gICAgICAgIH0pLmFwcGVuZChuZXcgZG9tXzEuRE9NKCdzcGFuJywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnbGFiZWwnKVxyXG4gICAgICAgIH0pLmh0bWwodGhpcy5jb25maWcudGV4dCkpO1xyXG4gICAgICAgIC8vIExpc3RlbiBmb3IgdGhlIGNsaWNrIGV2ZW50IG9uIHRoZSBidXR0b24gZWxlbWVudCBhbmQgdHJpZ2dlciB0aGUgY29ycmVzcG9uZGluZyBldmVudCBvbiB0aGUgYnV0dG9uIGNvbXBvbmVudFxyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5vbkNsaWNrRXZlbnQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYnV0dG9uRWxlbWVudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGV4dCBvbiB0aGUgbGFiZWwgb2YgdGhlIGJ1dHRvbi5cclxuICAgICAqIEBwYXJhbSB0ZXh0IHRoZSB0ZXh0IHRvIHB1dCBpbnRvIHRoZSBsYWJlbCBvZiB0aGUgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIEJ1dHRvbi5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkuZmluZCgnLicgKyB0aGlzLnByZWZpeENzcygnbGFiZWwnKSkuaHRtbCh0ZXh0KTtcclxuICAgIH07XHJcbiAgICBCdXR0b24ucHJvdG90eXBlLm9uQ2xpY2tFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbkV2ZW50cy5vbkNsaWNrLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b24ucHJvdG90eXBlLCBcIm9uQ2xpY2tcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWQuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PEJ1dHRvbjxDb25maWc+LCBOb0FyZ3M+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5idXR0b25FdmVudHMub25DbGljay5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEJ1dHRvbjtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b247XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2J1dHRvbi50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGxpc3RzZWxlY3Rvcl8xID0gcmVxdWlyZShcIi4vbGlzdHNlbGVjdG9yXCIpO1xyXG52YXIgZG9tXzEgPSByZXF1aXJlKFwiLi4vZG9tXCIpO1xyXG4vKipcclxuICogQSBzaW1wbGUgc2VsZWN0IGJveCBwcm92aWRpbmcgdGhlIHBvc3NpYmlsaXR5IHRvIHNlbGVjdCBhIHNpbmdsZSBpdGVtIG91dCBvZiBhIGxpc3Qgb2YgYXZhaWxhYmxlIGl0ZW1zLlxyXG4gKlxyXG4gKiBET00gZXhhbXBsZTpcclxuICogPGNvZGU+XHJcbiAqICAgICA8c2VsZWN0IGNsYXNzPSd1aS1zZWxlY3Rib3gnPlxyXG4gKiAgICAgICAgIDxvcHRpb24gdmFsdWU9J2tleSc+bGFiZWw8L29wdGlvbj5cclxuICogICAgICAgICAuLi5cclxuICogICAgIDwvc2VsZWN0PlxyXG4gKiA8L2NvZGU+XHJcbiAqL1xyXG52YXIgU2VsZWN0Qm94ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTZWxlY3RCb3gsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZWxlY3RCb3goY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXNlbGVjdGJveCdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFNlbGVjdEJveC5wcm90b3R5cGUudG9Eb21FbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNlbGVjdEVsZW1lbnQgPSBuZXcgZG9tXzEuRE9NKCdzZWxlY3QnLCB7XHJcbiAgICAgICAgICAgICdpZCc6IHRoaXMuY29uZmlnLmlkLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLmdldENzc0NsYXNzZXMoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCA9IHNlbGVjdEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEb21JdGVtcygpO1xyXG4gICAgICAgIHNlbGVjdEVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gc2VsZWN0RWxlbWVudC52YWwoKTtcclxuICAgICAgICAgICAgX3RoaXMub25JdGVtU2VsZWN0ZWRFdmVudCh2YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RFbGVtZW50O1xyXG4gICAgfTtcclxuICAgIFNlbGVjdEJveC5wcm90b3R5cGUudXBkYXRlRG9tSXRlbXMgPSBmdW5jdGlvbiAoc2VsZWN0ZWRWYWx1ZSkge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZFZhbHVlID09PSB2b2lkIDApIHsgc2VsZWN0ZWRWYWx1ZSA9IG51bGw7IH1cclxuICAgICAgICAvLyBEZWxldGUgYWxsIGNoaWxkcmVuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LmVtcHR5KCk7XHJcbiAgICAgICAgLy8gQWRkIHVwZGF0ZWQgY2hpbGRyZW5cclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5pdGVtczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBfYVtfaV07XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25FbGVtZW50ID0gbmV3IGRvbV8xLkRPTSgnb3B0aW9uJywge1xyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogaXRlbS5rZXlcclxuICAgICAgICAgICAgfSkuaHRtbChpdGVtLmxhYmVsKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ua2V5ID09PSBzZWxlY3RlZFZhbHVlICsgJycpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbkVsZW1lbnQuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuYXBwZW5kKG9wdGlvbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBTZWxlY3RCb3gucHJvdG90eXBlLm9uSXRlbUFkZGVkRXZlbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLm9uSXRlbUFkZGVkRXZlbnQuY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEb21JdGVtcyh0aGlzLnNlbGVjdGVkSXRlbSk7XHJcbiAgICB9O1xyXG4gICAgU2VsZWN0Qm94LnByb3RvdHlwZS5vbkl0ZW1SZW1vdmVkRXZlbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLm9uSXRlbVJlbW92ZWRFdmVudC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURvbUl0ZW1zKHRoaXMuc2VsZWN0ZWRJdGVtKTtcclxuICAgIH07XHJcbiAgICBTZWxlY3RCb3gucHJvdG90eXBlLm9uSXRlbVNlbGVjdGVkRXZlbnQgPSBmdW5jdGlvbiAodmFsdWUsIHVwZGF0ZURvbUl0ZW1zKSB7XHJcbiAgICAgICAgaWYgKHVwZGF0ZURvbUl0ZW1zID09PSB2b2lkIDApIHsgdXBkYXRlRG9tSXRlbXMgPSB0cnVlOyB9XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vbkl0ZW1TZWxlY3RlZEV2ZW50LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgIGlmICh1cGRhdGVEb21JdGVtcykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvbUl0ZW1zKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNlbGVjdEJveDtcclxufShsaXN0c2VsZWN0b3JfMS5MaXN0U2VsZWN0b3IpKTtcclxuZXhwb3J0cy5TZWxlY3RCb3ggPSBTZWxlY3RCb3g7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3NlbGVjdGJveC50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyBUT0RPIGNoYW5nZSB0byBpbnRlcm5hbCAobm90IGV4cG9ydGVkKSBjbGFzcywgaG93IHRvIHVzZSBpbiBvdGhlciBmaWxlcz9cclxuLyoqXHJcbiAqIEV4ZWN1dGVzIGEgY2FsbGJhY2sgYWZ0ZXIgYSBzcGVjaWZpZWQgYW1vdW50IG9mIHRpbWUsIG9wdGlvbmFsbHkgcmVwZWF0ZWRseSB1bnRpbCBzdG9wcGVkLlxyXG4gKi9cclxudmFyIFRpbWVvdXQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHRpbWVvdXQgY2FsbGJhY2sgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSBkZWxheSB0aGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGFmdGVyIHdoaWNoIHRoZSBjYWxsYmFjayBzaG91bGQgYmUgZXhlY3V0ZWRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB0aGUgY2FsbGJhY2sgdG8gZXhlY3V0ZSBhZnRlciB0aGUgZGVsYXkgdGltZVxyXG4gICAgICogQHBhcmFtIHJlcGVhdCBpZiB0cnVlLCBjYWxsIHRoZSBjYWxsYmFjayByZXBlYXRlZGx5IGluIGRlbGF5IGludGVydmFsc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBUaW1lb3V0KGRlbGF5LCBjYWxsYmFjaywgcmVwZWF0KSB7XHJcbiAgICAgICAgaWYgKHJlcGVhdCA9PT0gdm9pZCAwKSB7IHJlcGVhdCA9IGZhbHNlOyB9XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnJlcGVhdCA9IHJlcGVhdDtcclxuICAgICAgICB0aGlzLnRpbWVvdXRIYW5kbGUgPSAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdGhlIHRpbWVvdXQgYW5kIGNhbGxzIHRoZSBjYWxsYmFjayB3aGVuIHRoZSB0aW1lb3V0IGRlbGF5IGhhcyBwYXNzZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7VGltZW91dH0gdGhlIGN1cnJlbnQgdGltZW91dCAoc28gdGhlIHN0YXJ0IGNhbGwgY2FuIGJlIGNoYWluZWQgdG8gdGhlIGNvbnN0cnVjdG9yKVxyXG4gICAgICovXHJcbiAgICBUaW1lb3V0LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIHRpbWVvdXQuIFRoZSBjYWxsYmFjayB3aWxsIG5vdCBiZSBjYWxsZWQgaWYgY2xlYXIgaXMgY2FsbGVkIGR1cmluZyB0aGUgdGltZW91dC5cclxuICAgICAqL1xyXG4gICAgVGltZW91dC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEhhbmRsZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgdGhlIHBhc3NlZCB0aW1lb3V0IGRlbGF5IHRvIHplcm8uIENhbiBiZSB1c2VkIHRvIGRlZmVyIHRoZSBjYWxsaW5nIG9mIHRoZSBjYWxsYmFjay5cclxuICAgICAqL1xyXG4gICAgVGltZW91dC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbGFzdFNjaGVkdWxlVGltZSA9IDA7XHJcbiAgICAgICAgdmFyIGRlbGF5QWRqdXN0ID0gMDtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdmFyIGludGVybmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5yZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIHRpbWUgb2Ygb25lIGl0ZXJhdGlvbiBmcm9tIHNjaGVkdWxpbmcgdG8gZXhlY3V0aW5nIHRoZSBjYWxsYmFjayAodXN1YWxseSBhIGJpdCBsb25nZXIgdGhhbiB0aGUgZGVsYXlcclxuICAgICAgICAgICAgICAgIC8vIHRpbWUpXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSBsYXN0U2NoZWR1bGVUaW1lO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZWxheSBhZGp1c3RtZW50IGZvciB0aGUgbmV4dCBzY2hlZHVsZSB0byBrZWVwIGEgc3RlYWR5IGRlbGF5IGludGVydmFsIG92ZXIgdGltZVxyXG4gICAgICAgICAgICAgICAgZGVsYXlBZGp1c3QgPSBfdGhpcy5kZWxheSAtIGRlbHRhICsgZGVsYXlBZGp1c3Q7XHJcbiAgICAgICAgICAgICAgICBsYXN0U2NoZWR1bGVUaW1lID0gbm93O1xyXG4gICAgICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV4dCBleGVjdXRpb24gYnkgdGhlIGFkanVzdGVkIGRlbGF5XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChpbnRlcm5hbENhbGxiYWNrLCBfdGhpcy5kZWxheSArIGRlbGF5QWRqdXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGFzdFNjaGVkdWxlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChpbnRlcm5hbENhbGxiYWNrLCB0aGlzLmRlbGF5KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVGltZW91dDtcclxufSgpKTtcclxuZXhwb3J0cy5UaW1lb3V0ID0gVGltZW91dDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL3RpbWVvdXQudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuL2J1dHRvblwiKTtcclxuLyoqXHJcbiAqIEEgY2xpY2sgb3ZlcmxheSB0aGF0IG9wZW5zIGFuIHVybCBpbiBhIG5ldyB0YWIgaWYgY2xpY2tlZC5cclxuICovXHJcbnZhciBDbGlja092ZXJsYXkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENsaWNrT3ZlcmxheSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENsaWNrT3ZlcmxheShjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktY2xpY2tvdmVybGF5J1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQ2xpY2tPdmVybGF5LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2V0VXJsKHRoaXMuY29uZmlnLnVybCk7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmdldERvbUVsZW1lbnQoKTtcclxuICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuZGF0YSgndXJsJykpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGVsZW1lbnQuZGF0YSgndXJsJyksICdfYmxhbmsnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgVVJMIHRoYXQgc2hvdWxkIGJlIGZvbGxvd2VkIHdoZW4gdGhlIHdhdGVybWFyayBpcyBjbGlja2VkLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHdhdGVybWFyayBVUkxcclxuICAgICAqL1xyXG4gICAgQ2xpY2tPdmVybGF5LnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmRhdGEoJ3VybCcpO1xyXG4gICAgfTtcclxuICAgIENsaWNrT3ZlcmxheS5wcm90b3R5cGUuc2V0VXJsID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIGlmICh1cmwgPT09IHVuZGVmaW5lZCB8fCB1cmwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmwgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkuZGF0YSgndXJsJywgdXJsKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2xpY2tPdmVybGF5O1xyXG59KGJ1dHRvbl8xLkJ1dHRvbikpO1xyXG5leHBvcnRzLkNsaWNrT3ZlcmxheSA9IENsaWNrT3ZlcmxheTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvY2xpY2tvdmVybGF5LnRzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxudmFyIHNwYWNlcl8xID0gcmVxdWlyZShcIi4vc3BhY2VyXCIpO1xyXG4vKipcclxuICogQSBjb250YWluZXIgZm9yIG1haW4gcGxheWVyIGNvbnRyb2wgY29tcG9uZW50cywgZS5nLiBwbGF5IHRvZ2dsZSBidXR0b24sIHNlZWsgYmFyLCB2b2x1bWUgY29udHJvbCwgZnVsbHNjcmVlbiB0b2dnbGVcclxuICogYnV0dG9uLlxyXG4gKi9cclxudmFyIENvbnRyb2xCYXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENvbnRyb2xCYXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDb250cm9sQmFyKGNvbmZpZywgYXV0b0hpZGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktY29udHJvbGJhcicsXHJcbiAgICAgICAgICAgIGhpZGRlbjogYXV0b0hpZGVcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIENvbnRyb2xCYXIucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyBDb3VudHMgaG93IG1hbnkgY29tcG9uZW50cyBhcmUgaG92ZXJlZCBhbmQgYmxvY2sgaGlkaW5nIG9mIHRoZSBjb250cm9sIGJhclxyXG4gICAgICAgIHZhciBob3ZlclN0YWNrQ291bnQgPSAwO1xyXG4gICAgICAgIC8vIFRyYWNrIGhvdmVyIHN0YXR1cyBvZiBjaGlsZCBjb21wb25lbnRzXHJcbiAgICAgICAgdXRpbHNfMS5VSVV0aWxzLnRyYXZlcnNlVHJlZSh0aGlzLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdCB0cmFjayBob3ZlciBzdGF0dXMgb2YgY2hpbGQgY29udGFpbmVycyBvciBzcGFjZXJzLCBvbmx5IG9mICdyZWFsJyBjb250cm9sc1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgY29udGFpbmVyXzEuQ29udGFpbmVyIHx8IGNvbXBvbmVudCBpbnN0YW5jZW9mIHNwYWNlcl8xLlNwYWNlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFN1YnNjcmliZSBob3ZlciBldmVudCBhbmQga2VlcCBhIGNvdW50IG9mIHRoZSBudW1iZXIgb2YgaG92ZXJlZCBjaGlsZHJlblxyXG4gICAgICAgICAgICBjb21wb25lbnQub25Ib3ZlckNoYW5nZWQuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmhvdmVyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3ZlclN0YWNrQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvdmVyU3RhY2tDb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB1aW1hbmFnZXIub25Db250cm9sc1Nob3cuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB1aW1hbmFnZXIub25QcmV2aWV3Q29udHJvbHNIaWRlLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIENhbmNlbCB0aGUgaGlkZSBldmVudCBpZiBob3ZlcmVkIGNoaWxkIGNvbXBvbmVudHMgYmxvY2sgaGlkaW5nXHJcbiAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gKGhvdmVyU3RhY2tDb3VudCA+IDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVpbWFuYWdlci5vbkNvbnRyb2xzSGlkZS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuaGlkZGVuKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDb250cm9sQmFyO1xyXG59KGNvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xyXG5leHBvcnRzLkNvbnRyb2xCYXIgPSBDb250cm9sQmFyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9jb250cm9sYmFyLnRzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vdG9nZ2xlYnV0dG9uXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIHRoYXQgdG9nZ2xlcyBiZXR3ZWVuIHBsYXliYWNrIGFuZCBwYXVzZS5cclxuICovXHJcbnZhciBQbGF5YmFja1RvZ2dsZUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUGxheWJhY2tUb2dnbGVCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5YmFja1RvZ2dsZUJ1dHRvbihjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktcGxheWJhY2t0b2dnbGVidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnUGxheS9QYXVzZSdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFBsYXliYWNrVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIsIGhhbmRsZUNsaWNrRXZlbnQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChoYW5kbGVDbGlja0V2ZW50ID09PSB2b2lkIDApIHsgaGFuZGxlQ2xpY2tFdmVudCA9IHRydWU7IH1cclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgaXNTZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgLy8gSGFuZGxlciB0byB1cGRhdGUgYnV0dG9uIHN0YXRlIGJhc2VkIG9uIHBsYXllciBzdGF0ZVxyXG4gICAgICAgIHZhciBwbGF5YmFja1N0YXRlSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgVUkgaXMgY3VycmVudGx5IHNlZWtpbmcsIHBsYXliYWNrIGlzIHRlbXBvcmFyaWx5IHN0b3BwZWQgYnV0IHRoZSBidXR0b25zIHNob3VsZFxyXG4gICAgICAgICAgICAvLyBub3QgcmVmbGVjdCB0aGF0IGFuZCBzdGF5IGFzLWlzIChlLmcgaW5kaWNhdGUgcGxheWJhY2sgd2hpbGUgc2Vla2luZykuXHJcbiAgICAgICAgICAgIGlmIChpc1NlZWtpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzUGxheWluZygpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub2ZmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIENhbGwgaGFuZGxlciB1cG9uIHRoZXNlIGV2ZW50c1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIHBsYXliYWNrU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QQVVTRUQsIHBsYXliYWNrU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICAvLyB3aGVuIHBsYXliYWNrIGZpbmlzaGVzLCBwbGF5ZXIgdHVybnMgdG8gcGF1c2VkIG1vZGVcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QTEFZQkFDS19GSU5JU0hFRCwgcGxheWJhY2tTdGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfU1RBUlRFRCwgcGxheWJhY2tTdGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfUExBWUlORywgcGxheWJhY2tTdGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfUEFVU0VELCBwbGF5YmFja1N0YXRlSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9QTEFZQkFDS19GSU5JU0hFRCwgcGxheWJhY2tTdGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIC8vIERldGVjdCBhYnNlbmNlIG9mIHRpbWVzaGlmdGluZyBvbiBsaXZlIHN0cmVhbXMgYW5kIGFkZCB0YWdnaW5nIGNsYXNzIHRvIGNvbnZlcnQgYnV0dG9uIGljb25zIHRvIHBsYXkvc3RvcFxyXG4gICAgICAgIHZhciB0aW1lU2hpZnREZXRlY3RvciA9IG5ldyB1dGlsc18xLlBsYXllclV0aWxzLlRpbWVTaGlmdEF2YWlsYWJpbGl0eURldGVjdG9yKHBsYXllcik7XHJcbiAgICAgICAgdGltZVNoaWZ0RGV0ZWN0b3Iub25UaW1lU2hpZnRBdmFpbGFiaWxpdHlDaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmICghYXJncy50aW1lU2hpZnRBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoUGxheWJhY2tUb2dnbGVCdXR0b24uQ0xBU1NfU1RPUFRPR0dMRSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcyhQbGF5YmFja1RvZ2dsZUJ1dHRvbi5DTEFTU19TVE9QVE9HR0xFKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aW1lU2hpZnREZXRlY3Rvci5kZXRlY3QoKTsgLy8gSW5pdGlhbCBkZXRlY3Rpb25cclxuICAgICAgICBpZiAoaGFuZGxlQ2xpY2tFdmVudCkge1xyXG4gICAgICAgICAgICAvLyBDb250cm9sIHBsYXllciBieSBidXR0b24gZXZlbnRzXHJcbiAgICAgICAgICAgIC8vIFdoZW4gYSBidXR0b24gZXZlbnQgdHJpZ2dlcnMgYSBwbGF5ZXIgQVBJIGNhbGwsIGV2ZW50cyBhcmUgZmlyZWQgd2hpY2ggaW4gdHVybiBjYWxsIHRoZSBldmVudCBoYW5kbGVyXHJcbiAgICAgICAgICAgIC8vIGFib3ZlIHRoYXQgdXBkYXRlZCB0aGUgYnV0dG9uIHN0YXRlLlxyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2suc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNQbGF5aW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGF1c2UoJ3VpLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBsYXkoJ3VpLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVHJhY2sgVUkgc2Vla2luZyBzdGF0dXNcclxuICAgICAgICB1aW1hbmFnZXIub25TZWVrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlzU2Vla2luZyA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uU2Vla2VkLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlzU2Vla2luZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFN0YXJ0dXAgaW5pdFxyXG4gICAgICAgIHBsYXliYWNrU3RhdGVIYW5kbGVyKG51bGwpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQbGF5YmFja1RvZ2dsZUJ1dHRvbjtcclxufSh0b2dnbGVidXR0b25fMS5Ub2dnbGVCdXR0b24pKTtcclxuUGxheWJhY2tUb2dnbGVCdXR0b24uQ0xBU1NfU1RPUFRPR0dMRSA9ICdzdG9wdG9nZ2xlJztcclxuZXhwb3J0cy5QbGF5YmFja1RvZ2dsZUJ1dHRvbiA9IFBsYXliYWNrVG9nZ2xlQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZWJ1dHRvbi50c1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4uL2V2ZW50ZGlzcGF0Y2hlclwiKTtcclxudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuLi90aW1lb3V0XCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxuLyoqXHJcbiAqIEEgc2VlayBiYXIgdG8gc2VlayB3aXRoaW4gdGhlIHBsYXllcidzIG1lZGlhLiBJdCBkaXNwbGF5cyB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiwgYW1vdW50IG9mIGJ1ZmZlZCBkYXRhLCBzZWVrXHJcbiAqIHRhcmdldCwgYW5kIGtlZXBzIHN0YXR1cyBhYm91dCBhbiBvbmdvaW5nIHNlZWsuXHJcbiAqXHJcbiAqIFRoZSBzZWVrIGJhciBkaXNwbGF5cyBkaWZmZXJlbnQgJ2JhcnMnOlxyXG4gKiAgLSB0aGUgcGxheWJhY2sgcG9zaXRpb24sIGkuZS4gdGhlIHBvc2l0aW9uIGluIHRoZSBtZWRpYSBhdCB3aGljaCB0aGUgcGxheWVyIGN1cnJlbnQgcGxheWJhY2sgcG9pbnRlciBpcyBwb3NpdGlvbmVkXHJcbiAqICAtIHRoZSBidWZmZXIgcG9zaXRpb24sIHdoaWNoIHVzdWFsbHkgaXMgdGhlIHBsYXliYWNrIHBvc2l0aW9uIHBsdXMgdGhlIHRpbWUgc3BhbiB0aGF0IGlzIGFscmVhZHkgYnVmZmVyZWQgYWhlYWRcclxuICogIC0gdGhlIHNlZWsgcG9zaXRpb24sIHVzZWQgdG8gcHJldmlldyB0byB3aGVyZSBpbiB0aGUgdGltZWxpbmUgYSBzZWVrIHdpbGwganVtcCB0b1xyXG4gKi9cclxudmFyIFNlZWtCYXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNlZWtCYXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZWVrQmFyKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCdWZmZXIgb2YgdGhlIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uLiBUaGUgcG9zaXRpb24gbXVzdCBiZSBidWZmZXJlZCBpbiBjYXNlIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICogbmVlZHMgdG8gYmUgcmVmcmVzaGVkIHdpdGgge0BsaW5rICNyZWZyZXNoUGxheWJhY2tQb3NpdGlvbn0uXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBfdGhpcy5wbGF5YmFja1Bvc2l0aW9uUGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9oYWNrcy5tb3ppbGxhLm9yZy8yMDEzLzA0L2RldGVjdGluZy10b3VjaC1pdHMtdGhlLXdoeS1ub3QtdGhlLWhvdy9cclxuICAgICAgICBfdGhpcy50b3VjaFN1cHBvcnRlZCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xyXG4gICAgICAgIF90aGlzLnNlZWtCYXJFdmVudHMgPSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBGaXJlZCB3aGVuIGEgc2NydWJiaW5nIHNlZWsgb3BlcmF0aW9uIGlzIHN0YXJ0ZWQuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBvblNlZWs6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEZpcmVkIGR1cmluZyBhIHNjcnViYmluZyBzZWVrIHRvIGluZGljYXRlIHRoYXQgdGhlIHNlZWsgcHJldmlldyAoaS5lLiB0aGUgdmlkZW8gZnJhbWUpIHNob3VsZCBiZSB1cGRhdGVkLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgb25TZWVrUHJldmlldzogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRmlyZWQgd2hlbiBhIHNjcnViYmluZyBzZWVrIGhhcyBmaW5pc2hlZCBvciB3aGVuIGEgZGlyZWN0IHNlZWsgaXMgaXNzdWVkLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgb25TZWVrZWQ6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktc2Vla2JhcicsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgICAgICAgICAgc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZUludGVydmFsTXM6IDUwLFxyXG4gICAgICAgICAgICBoaWRlSW5MaXZlUGxheWJhY2s6IHRydWUsXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICBfdGhpcy5sYWJlbCA9IF90aGlzLmNvbmZpZy5sYWJlbDtcclxuICAgICAgICBfdGhpcy50aW1lbGluZU1hcmtlcnMgPSBbXTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0xhYmVsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRMYWJlbCgpLmluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyLCBjb25maWd1cmVTZWVrKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoY29uZmlndXJlU2VlayA9PT0gdm9pZCAwKSB7IGNvbmZpZ3VyZVNlZWsgPSB0cnVlOyB9XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgaWYgKCFjb25maWd1cmVTZWVrKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBjb25maWd1cmVTZWVrIGZsYWcgY2FuIGJlIHVzZWQgYnkgc3ViY2xhc3NlcyB0byBkaXNhYmxlIGNvbmZpZ3VyYXRpb24gYXMgc2VlayBiYXIuIEUuZy4gdGhlIHZvbHVtZVxyXG4gICAgICAgICAgICAvLyBzbGlkZXIgaXMgcmV1c2luZyB0aGlzIGNvbXBvbmVudCBidXQgYWRkcyBpdHMgb3duIGZ1bmN0aW9uYWxpdHksIGFuZCBkb2VzIG5vdCBuZWVkIHRoZSBzZWVrIGZ1bmN0aW9uYWxpdHkuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYWN0dWFsbHkgYSBoYWNrLCB0aGUgcHJvcGVyIHNvbHV0aW9uIHdvdWxkIGJlIGZvciBib3RoIHNlZWsgYmFyIGFuZCB2b2x1bWUgc2xpZGVycyB0byBleHRlbmRcclxuICAgICAgICAgICAgLy8gYSBjb21tb24gYmFzZSBzbGlkZXIgY29tcG9uZW50IGFuZCBpbXBsZW1lbnQgdGhlaXIgZnVuY3Rpb25hbGl0eSB0aGVyZS5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGxheWJhY2tOb3RJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIGlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpc1NlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyBVcGRhdGUgcGxheWJhY2sgYW5kIGJ1ZmZlciBwb3NpdGlvbnNcclxuICAgICAgICB2YXIgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGZvcmNlVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCA9PT0gdm9pZCAwKSB7IGV2ZW50ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBpZiAoZm9yY2VVcGRhdGUgPT09IHZvaWQgMCkgeyBmb3JjZVVwZGF0ZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgICAgIC8vIE9uY2UgdGhpcyBoYW5kbGVyIG9zIGNhbGxlZCwgcGxheWJhY2sgaGFzIGJlZW4gc3RhcnRlZCBhbmQgd2Ugc2V0IHRoZSBmbGFnIHRvIGZhbHNlXHJcbiAgICAgICAgICAgIHBsYXliYWNrTm90SW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGlzU2Vla2luZykge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgY2F1Z2h0IGEgc2VlayBwcmV2aWV3IHNlZWssIGRvIG5vdCB1cGRhdGUgdGhlIHNlZWtiYXJcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmdldE1heFRpbWVTaGlmdCgpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBjYXNlIG11c3QgYmUgZXhwbGljaXRseSBoYW5kbGVkIHRvIGF2b2lkIGRpdmlzaW9uIGJ5IHplcm9cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UgPSAxMDAgLSAoMTAwIC8gcGxheWVyLmdldE1heFRpbWVTaGlmdCgpICogcGxheWVyLmdldFRpbWVTaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKHBsYXliYWNrUG9zaXRpb25QZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyBzaG93IGZ1bGwgYnVmZmVyIGZvciBsaXZlIHN0cmVhbXNcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEJ1ZmZlclBvc2l0aW9uKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBIaWRlIFNlZWtCYXIgaWYgcmVxdWlyZWQuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoY29uZmlnLmhpZGVJbkxpdmVQbGF5YmFjaykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXliYWNrUG9zaXRpb25QZXJjZW50YWdlID0gMTAwIC8gcGxheWVyLmdldER1cmF0aW9uKCkgKiBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlb0J1ZmZlckxlbmd0aCA9IHBsYXllci5nZXRWaWRlb0J1ZmZlckxlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF1ZGlvQnVmZmVyTGVuZ3RoID0gcGxheWVyLmdldEF1ZGlvQnVmZmVyTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGJ1ZmZlciBsZW5ndGggd2hpY2ggaXMgdGhlIHNtYWxsZXIgbGVuZ3RoIG9mIHRoZSBhdWRpbyBhbmQgdmlkZW8gYnVmZmVycy4gSWYgb25lIG9mIHRoZXNlXHJcbiAgICAgICAgICAgICAgICAvLyBidWZmZXJzIGlzIG5vdCBhdmFpbGFibGUsIHdlIHNldCBpdCdzIHZhbHVlIHRvIE1BWF9WQUxVRSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgb3RoZXIgcmVhbCB2YWx1ZSBpcyB0YWtlblxyXG4gICAgICAgICAgICAgICAgLy8gYXMgdGhlIGJ1ZmZlciBsZW5ndGguXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyTGVuZ3RoID0gTWF0aC5taW4odmlkZW9CdWZmZXJMZW5ndGggIT0gbnVsbCA/IHZpZGVvQnVmZmVyTGVuZ3RoIDogTnVtYmVyLk1BWF9WQUxVRSwgYXVkaW9CdWZmZXJMZW5ndGggIT0gbnVsbCA/IGF1ZGlvQnVmZmVyTGVuZ3RoIDogTnVtYmVyLk1BWF9WQUxVRSk7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGJ1ZmZlciBsZW5ndGhzIGFyZSBtaXNzaW5nLCB3ZSBzZXQgdGhlIGJ1ZmZlciBsZW5ndGggdG8gemVyb1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlckxlbmd0aCA9PT0gTnVtYmVyLk1BWF9WQUxVRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlckxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyUGVyY2VudGFnZSA9IDEwMCAvIHBsYXllci5nZXREdXJhdGlvbigpICogYnVmZmVyTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIG9ubHkgaW4gcGF1c2VkIHN0YXRlIG9yIGluIHRoZSBpbml0aWFsIHN0YXJ0dXAgc3RhdGUgd2hlcmUgcGxheWVyIGlzIG5laXRoZXJcclxuICAgICAgICAgICAgICAgIC8vIHBhdXNlZCBub3IgcGxheWluZy4gUGxheWJhY2sgdXBkYXRlcyBhcmUgaGFuZGxlZCBpbiB0aGUgVGltZW91dCBiZWxvdy5cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb25maWcuc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZUludGVydmFsTXMgPT09IFNlZWtCYXIuU01PT1RIX1BMQVlCQUNLX1BPU0lUSU9OX1VQREFURV9ESVNBQkxFRFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IGZvcmNlVXBkYXRlIHx8IHBsYXllci5pc1BhdXNlZCgpIHx8IChwbGF5ZXIuaXNQYXVzZWQoKSA9PT0gcGxheWVyLmlzUGxheWluZygpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFBsYXliYWNrUG9zaXRpb24ocGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QnVmZmVyUG9zaXRpb24ocGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UgKyBidWZmZXJQZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gVXBkYXRlIHNlZWtiYXIgdXBvbiB0aGVzZSBldmVudHNcclxuICAgICAgICAvLyBpbml0IHBsYXliYWNrIHBvc2l0aW9uIHdoZW4gdGhlIHBsYXllciBpcyByZWFkeVxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgLy8gdXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIHdoZW4gaXQgY2hhbmdlc1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfQ0hBTkdFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBidWZmZXJsZXZlbCB3aGVuIGJ1ZmZlcmluZyBpcyBjb21wbGV0ZVxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NUQUxMX0VOREVELCBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgLy8gdXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIHdoZW4gYSBzZWVrIGhhcyBmaW5pc2hlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NFRUtFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBwbGF5YmFjayBwb3NpdGlvbiB3aGVuIGEgdGltZXNoaWZ0IGhhcyBmaW5pc2hlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfU0hJRlRFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBidWZmZXJsZXZlbCB3aGVuIGEgc2VnbWVudCBoYXMgYmVlbiBkb3dubG9hZGVkXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU0VHTUVOVF9SRVFVRVNUX0ZJTklTSEVELCBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgLy8gdXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIG9mIENhc3QgcGxheWJhY2tcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1RJTUVfVVBEQVRFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIFNlZWsgaGFuZGxpbmdcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TRUVLLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU0VFS0VELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfU0hJRlQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9USU1FX1NISUZURUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHNlZWsgPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIudGltZVNoaWZ0KHBsYXllci5nZXRNYXhUaW1lU2hpZnQoKSAtIChwbGF5ZXIuZ2V0TWF4VGltZVNoaWZ0KCkgKiAocGVyY2VudGFnZSAvIDEwMCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5zZWVrKHBsYXllci5nZXREdXJhdGlvbigpICogKHBlcmNlbnRhZ2UgLyAxMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vblNlZWsuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZW5kZXIpIHtcclxuICAgICAgICAgICAgaXNTZWVraW5nID0gdHJ1ZTsgLy8gdHJhY2sgc2Vla2luZyBzdGF0dXMgc28gd2UgY2FuIGNhdGNoIGV2ZW50cyBmcm9tIHNlZWsgcHJldmlldyBzZWVrc1xyXG4gICAgICAgICAgICAvLyBOb3RpZnkgVUkgbWFuYWdlciBvZiBzdGFydGVkIHNlZWtcclxuICAgICAgICAgICAgdWltYW5hZ2VyLm9uU2Vlay5kaXNwYXRjaChzZW5kZXIpO1xyXG4gICAgICAgICAgICAvLyBTYXZlIGN1cnJlbnQgcGxheWJhY2sgc3RhdGVcclxuICAgICAgICAgICAgaXNQbGF5aW5nID0gcGxheWVyLmlzUGxheWluZygpO1xyXG4gICAgICAgICAgICAvLyBQYXVzZSBwbGF5YmFjayB3aGlsZSBzZWVraW5nXHJcbiAgICAgICAgICAgIGlmIChpc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZSgndWktc2VlaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vblNlZWtQcmV2aWV3LnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGlmeSBVSSBtYW5hZ2VyIG9mIHNlZWsgcHJldmlld1xyXG4gICAgICAgICAgICB1aW1hbmFnZXIub25TZWVrUHJldmlldy5kaXNwYXRjaChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub25TZWVrUHJldmlldy5zdWJzY3JpYmVSYXRlTGltaXRlZChmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIFJhdGUtbGltaXRlZCBzY3J1YmJpbmcgc2Vla1xyXG4gICAgICAgICAgICBpZiAoYXJncy5zY3J1YmJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHNlZWsoYXJncy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIHRoaXMub25TZWVrZWQuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZW5kZXIsIHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICAgICAgaXNTZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIERvIHRoZSBzZWVrXHJcbiAgICAgICAgICAgIHNlZWsocGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIC8vIENvbnRpbnVlIHBsYXliYWNrIGFmdGVyIHNlZWsgaWYgcGxheWVyIHdhcyBwbGF5aW5nIHdoZW4gc2VlayBzdGFydGVkXHJcbiAgICAgICAgICAgIGlmIChpc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KCd1aS1zZWVrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTm90aWZ5IFVJIG1hbmFnZXIgb2YgZmluaXNoZWQgc2Vla1xyXG4gICAgICAgICAgICB1aW1hbmFnZXIub25TZWVrZWQuZGlzcGF0Y2goc2VuZGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5oYXNMYWJlbCgpKSB7XHJcbiAgICAgICAgICAgIC8vIENvbmZpZ3VyZSBhIHNlZWtiYXIgbGFiZWwgdGhhdCBpcyBpbnRlcm5hbCB0byB0aGUgc2Vla2JhcilcclxuICAgICAgICAgICAgdGhpcy5nZXRMYWJlbCgpLmNvbmZpZ3VyZShwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEhpZGUgc2Vla2JhciBmb3IgbGl2ZSBzb3VyY2VzIHdpdGhvdXQgdGltZXNoaWZ0XHJcbiAgICAgICAgdmFyIGlzTGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBoYXNUaW1lU2hpZnQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3dpdGNoVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIChpc0xpdmUsIGhhc1RpbWVTaGlmdCkge1xyXG4gICAgICAgICAgICBpZiAoaXNMaXZlICYmICFoYXNUaW1lU2hpZnQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcihudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgX3RoaXMucmVmcmVzaFBsYXliYWNrUG9zaXRpb24oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBsaXZlU3RyZWFtRGV0ZWN0b3IgPSBuZXcgdXRpbHNfMS5QbGF5ZXJVdGlscy5MaXZlU3RyZWFtRGV0ZWN0b3IocGxheWVyKTtcclxuICAgICAgICBsaXZlU3RyZWFtRGV0ZWN0b3Iub25MaXZlQ2hhbmdlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgICAgICBpc0xpdmUgPSBhcmdzLmxpdmU7XHJcbiAgICAgICAgICAgIHN3aXRjaFZpc2liaWxpdHkoaXNMaXZlLCBoYXNUaW1lU2hpZnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciB0aW1lU2hpZnREZXRlY3RvciA9IG5ldyB1dGlsc18xLlBsYXllclV0aWxzLlRpbWVTaGlmdEF2YWlsYWJpbGl0eURldGVjdG9yKHBsYXllcik7XHJcbiAgICAgICAgdGltZVNoaWZ0RGV0ZWN0b3Iub25UaW1lU2hpZnRBdmFpbGFiaWxpdHlDaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGhhc1RpbWVTaGlmdCA9IGFyZ3MudGltZVNoaWZ0QXZhaWxhYmxlO1xyXG4gICAgICAgICAgICBzd2l0Y2hWaXNpYmlsaXR5KGlzTGl2ZSwgaGFzVGltZVNoaWZ0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0aWFsIGRldGVjdGlvblxyXG4gICAgICAgIGxpdmVTdHJlYW1EZXRlY3Rvci5kZXRlY3QoKTtcclxuICAgICAgICB0aW1lU2hpZnREZXRlY3Rvci5kZXRlY3QoKTtcclxuICAgICAgICAvLyBSZWZyZXNoIHRoZSBwbGF5YmFjayBwb3NpdGlvbiB3aGVuIHRoZSBwbGF5ZXIgcmVzaXplZCBvciB0aGUgVUkgaXMgY29uZmlndXJlZC4gVGhlIHBsYXliYWNrIHBvc2l0aW9uIG1hcmtlclxyXG4gICAgICAgIC8vIGlzIHBvc2l0aW9uZWQgYWJzb2x1dGVseSBhbmQgbXVzdCB0aGVyZWZvcmUgYmUgdXBkYXRlZCB3aGVuIHRoZSBzaXplIG9mIHRoZSBzZWVrYmFyIGNoYW5nZXMuXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUExBWUVSX1JFU0laRSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEFkZGl0aW9uYWxseSwgd2hlbiB0aGlzIGNvZGUgaXMgY2FsbGVkLCB0aGUgc2Vla2JhciBpcyBub3QgcGFydCBvZiB0aGUgVUkgeWV0IGFuZCB0aGVyZWZvcmUgZG9lcyBub3QgaGF2ZSBhIHNpemUsXHJcbiAgICAgICAgLy8gcmVzdWx0aW5nIGluIGEgd3JvbmcgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgbWFya2VyLiBSZWZyZXNoaW5nIGl0IG9uY2UgdGhlIFVJIGlzIGNvbmZpZ3VyZWQgc29sdmVkIHRoaXMgaXNzdWUuXHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29uZmlndXJlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEl0IGNhbiBhbHNvIGhhcHBlbiB0aGF0IHRoZSB2YWx1ZSBjaGFuZ2VzIG9uY2UgdGhlIHBsYXllciBpcyByZWFkeSwgb3Igd2hlbiBhIG5ldyBzb3VyY2UgaXMgbG9hZGVkLCBzbyB3ZSBuZWVkXHJcbiAgICAgICAgLy8gdG8gdXBkYXRlIG9uIE9OX1JFQURZIHRvb1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlZnJlc2hQbGF5YmFja1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzZWVrYmFyXHJcbiAgICAgICAgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIoKTsgLy8gU2V0IHRoZSBwbGF5YmFjayBwb3NpdGlvblxyXG4gICAgICAgIHRoaXMuc2V0QnVmZmVyUG9zaXRpb24oMCk7XHJcbiAgICAgICAgdGhpcy5zZXRTZWVrUG9zaXRpb24oMCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNtb290aFBsYXliYWNrUG9zaXRpb25VcGRhdGVJbnRlcnZhbE1zICE9PSBTZWVrQmFyLlNNT09USF9QTEFZQkFDS19QT1NJVElPTl9VUERBVEVfRElTQUJMRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlcihwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlndXJlTWFya2VycyhwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuY29uZmlndXJlU21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogUGxheWJhY2sgcG9zaXRpb24gdXBkYXRlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBXZSBkbyBub3QgdXBkYXRlIHRoZSBwb3NpdGlvbiBkaXJlY3RseSBmcm9tIHRoZSBPTl9USU1FX0NIQU5HRUQgZXZlbnQsIGJlY2F1c2UgaXQgYXJyaXZlcyB2ZXJ5IGppdHRlcnkgYW5kXHJcbiAgICAgICAgICogcmVzdWx0cyBpbiBhIGppdHRlcnkgcG9zaXRpb24gaW5kaWNhdG9yIHNpbmNlIHRoZSBDU1MgdHJhbnNpdGlvbiB0aW1lIGlzIHN0YXRpY2FsbHkgc2V0LlxyXG4gICAgICAgICAqIFRvIHdvcmsgYXJvdW5kIHRoaXMgaXNzdWUsIHdlIG1haW50YWluIGEgbG9jYWwgcGxheWJhY2sgcG9zaXRpb24gdGhhdCBpcyB1cGRhdGVkIGluIGEgc3RhYmxlIHJlZ3VsYXIgaW50ZXJ2YWxcclxuICAgICAgICAgKiBhbmQga2VwdCBpbiBzeW5jIHdpdGggdGhlIHBsYXllci5cclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgY3VycmVudFRpbWVTZWVrQmFyID0gMDtcclxuICAgICAgICB2YXIgY3VycmVudFRpbWVQbGF5ZXIgPSAwO1xyXG4gICAgICAgIHZhciB1cGRhdGVJbnRlcnZhbE1zID0gNTA7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUaW1lVXBkYXRlRGVsdGFTZWNzID0gdXBkYXRlSW50ZXJ2YWxNcyAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5zbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlciA9IG5ldyB0aW1lb3V0XzEuVGltZW91dCh1cGRhdGVJbnRlcnZhbE1zLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lU2Vla0JhciArPSBjdXJyZW50VGltZVVwZGF0ZURlbHRhU2VjcztcclxuICAgICAgICAgICAgY3VycmVudFRpbWVQbGF5ZXIgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgLy8gU3luYyBjdXJyZW50VGltZSBvZiBzZWVrYmFyIHRvIHBsYXllclxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbWVEZWx0YSA9IGN1cnJlbnRUaW1lU2Vla0JhciAtIGN1cnJlbnRUaW1lUGxheWVyO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsdGEgaXMgbGFyZ2VyIHRoYXQgMiBzZWNzLCBkaXJlY3RseSBqdW1wIHRoZSBzZWVrYmFyIHRvIHRoZVxyXG4gICAgICAgICAgICAvLyBwbGF5ZXIgdGltZSBpbnN0ZWFkIG9mIHNtb290aGx5IGZhc3QgZm9yd2FyZGluZy9yZXdpbmRpbmcuXHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhjdXJyZW50VGltZURlbHRhKSA+IDIpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lU2Vla0JhciA9IGN1cnJlbnRUaW1lUGxheWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRUaW1lRGVsdGEgPD0gLWN1cnJlbnRUaW1lVXBkYXRlRGVsdGFTZWNzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZVNlZWtCYXIgKz0gY3VycmVudFRpbWVVcGRhdGVEZWx0YVNlY3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFRpbWVEZWx0YSA+PSBjdXJyZW50VGltZVVwZGF0ZURlbHRhU2Vjcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWVTZWVrQmFyIC09IGN1cnJlbnRUaW1lVXBkYXRlRGVsdGFTZWNzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwbGF5YmFja1Bvc2l0aW9uUGVyY2VudGFnZSA9IDEwMCAvIHBsYXllci5nZXREdXJhdGlvbigpICogY3VycmVudFRpbWVTZWVrQmFyO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKHBsYXliYWNrUG9zaXRpb25QZXJjZW50YWdlKTtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB2YXIgc3RhcnRTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFwbGF5ZXIuaXNMaXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lU2Vla0JhciA9IHBsYXllci5nZXRDdXJyZW50VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHN0b3BTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIuY2xlYXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIHN0YXJ0U21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfUExBWUlORywgc3RhcnRTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUEFVU0VELCBzdG9wU21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfUEFVU0VELCBzdG9wU21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NFRUtFRCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJyZW50VGltZVNlZWtCYXIgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocGxheWVyLmlzUGxheWluZygpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0U21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuY29uZmlndXJlTWFya2VycyA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNsZWFyTWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudGltZWxpbmVNYXJrZXJzID0gW107XHJcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZU1hcmtlcnMoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBzZXR1cE1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyTWFya2VycygpO1xyXG4gICAgICAgICAgICB2YXIgaGFzTWFya2Vyc0luVWlDb25maWcgPSB1aW1hbmFnZXIuZ2V0Q29uZmlnKCkubWV0YWRhdGEgJiYgdWltYW5hZ2VyLmdldENvbmZpZygpLm1ldGFkYXRhLm1hcmtlcnNcclxuICAgICAgICAgICAgICAgICYmIHVpbWFuYWdlci5nZXRDb25maWcoKS5tZXRhZGF0YS5tYXJrZXJzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIHZhciBoYXNNYXJrZXJzSW5QbGF5ZXJDb25maWcgPSBwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlICYmIHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UubWFya2Vyc1xyXG4gICAgICAgICAgICAgICAgJiYgcGxheWVyLmdldENvbmZpZygpLnNvdXJjZS5tYXJrZXJzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIC8vIFRha2UgbWFya2VycyBmcm9tIHRoZSBVSSBjb25maWcuIElmIG5vIG1hcmtlcnMgZGVmaW5lZCwgdHJ5IHRvIHRha2UgdGhlbSBmcm9tIHRoZSBwbGF5ZXIncyBzb3VyY2UgY29uZmlnLlxyXG4gICAgICAgICAgICB2YXIgbWFya2VycyA9IGhhc01hcmtlcnNJblVpQ29uZmlnID8gdWltYW5hZ2VyLmdldENvbmZpZygpLm1ldGFkYXRhLm1hcmtlcnMgOlxyXG4gICAgICAgICAgICAgICAgaGFzTWFya2Vyc0luUGxheWVyQ29uZmlnID8gcGxheWVyLmdldENvbmZpZygpLnNvdXJjZS5tYXJrZXJzIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGltZWxpbmUgbWFya2VycyBmcm9tIHRoZSBjb25maWcgaWYgd2UgaGF2ZSBtYXJrZXJzIGFuZCBpZiB3ZSBoYXZlIGEgZHVyYXRpb25cclxuICAgICAgICAgICAgLy8gVGhlIGR1cmF0aW9uIGNoZWNrIGlzIGZvciBidWdneSBwbGF0Zm9ybXMgd2hlcmUgdGhlIGR1cmF0aW9uIGlzIG5vdCBhdmFpbGFibGUgaW5zdGFudGx5IChDaHJvbWUgb24gQW5kcm9pZCA0LjMpXHJcbiAgICAgICAgICAgIGlmIChtYXJrZXJzICYmIHBsYXllci5nZXREdXJhdGlvbigpICE9PSBJbmZpbml0eSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBtYXJrZXJzXzEgPSBtYXJrZXJzOyBfaSA8IG1hcmtlcnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyID0gbWFya2Vyc18xW19pXTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aW1lbGluZU1hcmtlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IDEwMCAvIHBsYXllci5nZXREdXJhdGlvbigpICogbWFya2VyLnRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtYXJrZXIudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgdGhlIHRpbWVsaW5lIHdpdGggdGhlIG1hcmtlcnNcclxuICAgICAgICAgICAgX3RoaXMudXBkYXRlTWFya2VycygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQWRkIG1hcmtlcnMgd2hlbiBhIHNvdXJjZSBpcyBsb2FkZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9SRUFEWSwgc2V0dXBNYXJrZXJzKTtcclxuICAgICAgICAvLyBSZW1vdmUgbWFya2VycyB3aGVuIHVubG9hZGVkXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU09VUkNFX1VOTE9BREVELCBjbGVhck1hcmtlcnMpO1xyXG4gICAgICAgIC8vIEluaXQgbWFya2VycyBhdCBzdGFydHVwXHJcbiAgICAgICAgc2V0dXBNYXJrZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJlbGVhc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5zbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNtb290aFBsYXliYWNrUG9zaXRpb25VcGRhdGVyLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jc3NDbGFzc2VzLnB1c2goJ3ZlcnRpY2FsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWVrQmFyQ29udGFpbmVyID0gbmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAnaWQnOiB0aGlzLmNvbmZpZy5pZCxcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5nZXRDc3NDbGFzc2VzKClcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgc2Vla0JhciA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXInKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhciA9IHNlZWtCYXI7XHJcbiAgICAgICAgLy8gSW5kaWNhdG9yIHRoYXQgc2hvd3MgdGhlIGJ1ZmZlciBmaWxsIGxldmVsXHJcbiAgICAgICAgdmFyIHNlZWtCYXJCdWZmZXJMZXZlbCA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItYnVmZmVybGV2ZWwnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhckJ1ZmZlclBvc2l0aW9uID0gc2Vla0JhckJ1ZmZlckxldmVsO1xyXG4gICAgICAgIC8vIEluZGljYXRvciB0aGF0IHNob3dzIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uXHJcbiAgICAgICAgdmFyIHNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uID0gbmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnc2Vla2Jhci1wbGF5YmFja3Bvc2l0aW9uJylcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uID0gc2Vla0JhclBsYXliYWNrUG9zaXRpb247XHJcbiAgICAgICAgLy8gQSBtYXJrZXIgb2YgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24sIGUuZy4gYSBkb3Qgb3IgbGluZVxyXG4gICAgICAgIHZhciBzZWVrQmFyUGxheWJhY2tQb3NpdGlvbk1hcmtlciA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItcGxheWJhY2twb3NpdGlvbi1tYXJrZXInKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhclBsYXliYWNrUG9zaXRpb25NYXJrZXIgPSBzZWVrQmFyUGxheWJhY2tQb3NpdGlvbk1hcmtlcjtcclxuICAgICAgICAvLyBJbmRpY2F0b3IgdGhhdCBzaG93IHdoZXJlIGEgc2VlayB3aWxsIGdvIHRvXHJcbiAgICAgICAgdmFyIHNlZWtCYXJTZWVrUG9zaXRpb24gPSBuZXcgZG9tXzEuRE9NKCdkaXYnLCB7XHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMucHJlZml4Q3NzKCdzZWVrYmFyLXNlZWtwb3NpdGlvbicpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyU2Vla1Bvc2l0aW9uID0gc2Vla0JhclNlZWtQb3NpdGlvbjtcclxuICAgICAgICAvLyBJbmRpY2F0b3IgdGhhdCBzaG93cyB0aGUgZnVsbCBzZWVrYmFyXHJcbiAgICAgICAgdmFyIHNlZWtCYXJCYWNrZHJvcCA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItYmFja2Ryb3AnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhckJhY2tkcm9wID0gc2Vla0JhckJhY2tkcm9wO1xyXG4gICAgICAgIHZhciBzZWVrQmFyQ2hhcHRlck1hcmtlcnNDb250YWluZXIgPSBuZXcgZG9tXzEuRE9NKCdkaXYnLCB7XHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMucHJlZml4Q3NzKCdzZWVrYmFyLW1hcmtlcnMnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0Jhck1hcmtlcnNDb250YWluZXIgPSBzZWVrQmFyQ2hhcHRlck1hcmtlcnNDb250YWluZXI7XHJcbiAgICAgICAgc2Vla0Jhci5hcHBlbmQoc2Vla0JhckJhY2tkcm9wLCBzZWVrQmFyQnVmZmVyTGV2ZWwsIHNlZWtCYXJTZWVrUG9zaXRpb24sIHNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uLCBzZWVrQmFyQ2hhcHRlck1hcmtlcnNDb250YWluZXIsIHNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uTWFya2VyKTtcclxuICAgICAgICB2YXIgc2Vla2luZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIERlZmluZSBoYW5kbGVyIGZ1bmN0aW9ucyBzbyB3ZSBjYW4gYXR0YWNoL3JlbW92ZSB0aGVtIGxhdGVyXHJcbiAgICAgICAgdmFyIG1vdXNlVG91Y2hNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpb24gdG8gVlIgaGFuZGxlclxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UGVyY2VudGFnZSA9IDEwMCAqIF90aGlzLmdldE9mZnNldChlKTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla1Bvc2l0aW9uKHRhcmdldFBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKHRhcmdldFBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICBfdGhpcy5vblNlZWtQcmV2aWV3RXZlbnQodGFyZ2V0UGVyY2VudGFnZSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgbW91c2VUb3VjaFVwSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGhhbmRsZXJzLCBzZWVrIG9wZXJhdGlvbiBpcyBmaW5pc2hlZFxyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vZmYoJ3RvdWNobW92ZSBtb3VzZW1vdmUnLCBtb3VzZVRvdWNoTW92ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vZmYoJ3RvdWNoZW5kIG1vdXNldXAnLCBtb3VzZVRvdWNoVXBIYW5kbGVyKTtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBlcmNlbnRhZ2UgPSAxMDAgKiBfdGhpcy5nZXRPZmZzZXQoZSk7XHJcbiAgICAgICAgICAgIHZhciBzbmFwcGVkQ2hhcHRlciA9IF90aGlzLmdldE1hcmtlckF0UG9zaXRpb24odGFyZ2V0UGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICBzZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEZpcmUgc2Vla2VkIGV2ZW50XHJcbiAgICAgICAgICAgIF90aGlzLm9uU2Vla2VkRXZlbnQoc25hcHBlZENoYXB0ZXIgPyBzbmFwcGVkQ2hhcHRlci50aW1lIDogdGFyZ2V0UGVyY2VudGFnZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBBIHNlZWsgYWx3YXlzIHN0YXJ0IHdpdGggYSB0b3VjaHN0YXJ0IG9yIG1vdXNlZG93biBkaXJlY3RseSBvbiB0aGUgc2Vla2Jhci5cclxuICAgICAgICAvLyBUbyB0cmFjayBhIG1vdXNlIHNlZWsgYWxzbyBvdXRzaWRlIHRoZSBzZWVrYmFyIChmb3IgdG91Y2ggZXZlbnRzIHRoaXMgd29ya3MgYXV0b21hdGljYWxseSksXHJcbiAgICAgICAgLy8gc28gdGhlIHVzZXIgZG9lcyBub3QgbmVlZCB0byB0YWtlIGNhcmUgdGhhdCB0aGUgbW91c2UgYWx3YXlzIHN0YXlzIG9uIHRoZSBzZWVrYmFyLCB3ZSBhdHRhY2ggdGhlIG1vdXNlbW92ZVxyXG4gICAgICAgIC8vIGFuZCBtb3VzZXVwIGhhbmRsZXJzIHRvIHRoZSB3aG9sZSBkb2N1bWVudC4gQSBzZWVrIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSB1c2VyIGxpZnRzIHRoZSBtb3VzZSBrZXkuXHJcbiAgICAgICAgLy8gQSBzZWVrIG1vdXNlIGdlc3R1cmUgaXMgdGh1cyBiYXNpY2FsbHkgYSBjbGljayB3aXRoIGEgbG9uZyB0aW1lIGZyYW1lIGJldHdlZW4gZG93biBhbmQgdXAgZXZlbnRzLlxyXG4gICAgICAgIHNlZWtCYXIub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGlzVG91Y2hFdmVudCA9IF90aGlzLnRvdWNoU3VwcG9ydGVkICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50O1xyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IHNlbGVjdGlvbiBvZiBET00gZWxlbWVudHMgKGFsc28gcHJldmVudHMgbW91c2Vkb3duIGlmIGN1cnJlbnQgZXZlbnQgaXMgdG91Y2hzdGFydClcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGlvbiB0byBWUiBoYW5kbGVyXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcodHJ1ZSk7IC8vIFNldCBzZWVraW5nIGNsYXNzIG9uIERPTSBlbGVtZW50XHJcbiAgICAgICAgICAgIHNlZWtpbmcgPSB0cnVlOyAvLyBTZXQgc2VlayB0cmFja2luZyBmbGFnXHJcbiAgICAgICAgICAgIC8vIEZpcmUgc2Vla2VkIGV2ZW50XHJcbiAgICAgICAgICAgIF90aGlzLm9uU2Vla0V2ZW50KCk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBoYW5kbGVyIHRvIHRyYWNrIHRoZSBzZWVrIG9wZXJhdGlvbiBvdmVyIHRoZSB3aG9sZSBkb2N1bWVudFxyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vbihpc1RvdWNoRXZlbnQgPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnLCBtb3VzZVRvdWNoTW92ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vbihpc1RvdWNoRXZlbnQgPyAndG91Y2hlbmQnIDogJ21vdXNldXAnLCBtb3VzZVRvdWNoVXBIYW5kbGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEaXNwbGF5IHNlZWsgdGFyZ2V0IGluZGljYXRvciB3aGVuIG1vdXNlIGhvdmVycyBvciBmaW5nZXIgc2xpZGVzIG92ZXIgc2Vla2JhclxyXG4gICAgICAgIHNlZWtCYXIub24oJ3RvdWNobW92ZSBtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmIChzZWVraW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEdXJpbmcgYSBzZWVrICh3aGVuIG1vdXNlIGlzIGRvd24gb3IgdG91Y2ggbW92ZSBhY3RpdmUpLCB3ZSBuZWVkIHRvIHN0b3AgcHJvcGFnYXRpb24gdG8gYXZvaWRcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBWUiB2aWV3cG9ydCByZWFjdGluZyB0byB0aGUgbW92ZXMuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gQmVjYXVzZSB0aGUgc3RvcHBlZCBwcm9wYWdhdGlvbiBpbmhpYml0cyB0aGUgZXZlbnQgb24gdGhlIGRvY3VtZW50LCB3ZSBuZWVkIHRvIGNhbGwgaXQgZnJvbSBoZXJlXHJcbiAgICAgICAgICAgICAgICBtb3VzZVRvdWNoTW92ZUhhbmRsZXIoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gMTAwICogX3RoaXMuZ2V0T2Zmc2V0KGUpO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTZWVrUG9zaXRpb24ocG9zaXRpb24pO1xyXG4gICAgICAgICAgICBfdGhpcy5vblNlZWtQcmV2aWV3RXZlbnQocG9zaXRpb24sIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmhhc0xhYmVsKCkgJiYgX3RoaXMuZ2V0TGFiZWwoKS5pc0hpZGRlbigpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRMYWJlbCgpLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEhpZGUgc2VlayB0YXJnZXQgaW5kaWNhdG9yIHdoZW4gbW91c2Ugb3IgZmluZ2VyIGxlYXZlcyBzZWVrYmFyXHJcbiAgICAgICAgc2Vla0Jhci5vbigndG91Y2hlbmQgbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla1Bvc2l0aW9uKDApO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaGFzTGFiZWwoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0TGFiZWwoKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWVrQmFyQ29udGFpbmVyLmFwcGVuZChzZWVrQmFyKTtcclxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xyXG4gICAgICAgICAgICBzZWVrQmFyQ29udGFpbmVyLmFwcGVuZCh0aGlzLmxhYmVsLmdldERvbUVsZW1lbnQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWVrQmFyQ29udGFpbmVyO1xyXG4gICAgfTtcclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnVwZGF0ZU1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyTWFya2Vyc0NvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnRpbWVsaW5lTWFya2VyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IF9hW19pXTtcclxuICAgICAgICAgICAgdGhpcy5zZWVrQmFyTWFya2Vyc0NvbnRhaW5lci5hcHBlbmQobmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItbWFya2VyJyksXHJcbiAgICAgICAgICAgICAgICAnZGF0YS1tYXJrZXItdGltZSc6IFN0cmluZyhtYXJrZXIudGltZSksXHJcbiAgICAgICAgICAgICAgICAnZGF0YS1tYXJrZXItdGl0bGUnOiBTdHJpbmcobWFya2VyLnRpdGxlKSxcclxuICAgICAgICAgICAgfSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6IG1hcmtlci50aW1lICsgJyUnLFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNlZWtCYXIucHJvdG90eXBlLmdldE1hcmtlckF0UG9zaXRpb24gPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xyXG4gICAgICAgIHZhciBzbmFwcGVkTWFya2VyID0gbnVsbDtcclxuICAgICAgICB2YXIgc25hcHBpbmdSYW5nZSA9IDE7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZWxpbmVNYXJrZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudGltZWxpbmVNYXJrZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hcmtlciA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGlmIChwZXJjZW50YWdlID49IG1hcmtlci50aW1lIC0gc25hcHBpbmdSYW5nZSAmJiBwZXJjZW50YWdlIDw9IG1hcmtlci50aW1lICsgc25hcHBpbmdSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNuYXBwZWRNYXJrZXIgPSBtYXJrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNuYXBwZWRNYXJrZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBob3Jpem9udGFsIG9mZnNldCBvZiBhIG1vdXNlL3RvdWNoIGV2ZW50IHBvaW50IGZyb20gdGhlIGxlZnQgZWRnZSBvZiB0aGUgc2VlayBiYXIuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRQYWdlWCB0aGUgcGFnZVggY29vcmRpbmF0ZSBvZiBhbiBldmVudCB0byBjYWxjdWxhdGUgdGhlIG9mZnNldCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBhIG51bWJlciBpbiB0aGUgcmFuZ2Ugb2YgWzAsIDFdLCB3aGVyZSAwIGlzIHRoZSBsZWZ0IGVkZ2UgYW5kIDEgaXMgdGhlIHJpZ2h0IGVkZ2VcclxuICAgICAqL1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuZ2V0SG9yaXpvbnRhbE9mZnNldCA9IGZ1bmN0aW9uIChldmVudFBhZ2VYKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXRQeCA9IHRoaXMuc2Vla0Jhci5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgIHZhciB3aWR0aFB4ID0gdGhpcy5zZWVrQmFyLndpZHRoKCk7XHJcbiAgICAgICAgdmFyIG9mZnNldFB4ID0gZXZlbnRQYWdlWCAtIGVsZW1lbnRPZmZzZXRQeDtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gMSAvIHdpZHRoUHggKiBvZmZzZXRQeDtcclxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZU9mZnNldChvZmZzZXQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmVydGljYWwgb2Zmc2V0IG9mIGEgbW91c2UvdG91Y2ggZXZlbnQgcG9pbnQgZnJvbSB0aGUgYm90dG9tIGVkZ2Ugb2YgdGhlIHNlZWsgYmFyLlxyXG4gICAgICogQHBhcmFtIGV2ZW50UGFnZVkgdGhlIHBhZ2VYIGNvb3JkaW5hdGUgb2YgYW4gZXZlbnQgdG8gY2FsY3VsYXRlIHRoZSBvZmZzZXQgZnJvbVxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gYSBudW1iZXIgaW4gdGhlIHJhbmdlIG9mIFswLCAxXSwgd2hlcmUgMCBpcyB0aGUgYm90dG9tIGVkZ2UgYW5kIDEgaXMgdGhlIHRvcCBlZGdlXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLmdldFZlcnRpY2FsT2Zmc2V0ID0gZnVuY3Rpb24gKGV2ZW50UGFnZVkpIHtcclxuICAgICAgICB2YXIgZWxlbWVudE9mZnNldFB4ID0gdGhpcy5zZWVrQmFyLm9mZnNldCgpLnRvcDtcclxuICAgICAgICB2YXIgd2lkdGhQeCA9IHRoaXMuc2Vla0Jhci5oZWlnaHQoKTtcclxuICAgICAgICB2YXIgb2Zmc2V0UHggPSBldmVudFBhZ2VZIC0gZWxlbWVudE9mZnNldFB4O1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSAxIC8gd2lkdGhQeCAqIG9mZnNldFB4O1xyXG4gICAgICAgIHJldHVybiAxIC0gdGhpcy5zYW5pdGl6ZU9mZnNldChvZmZzZXQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbW91c2Ugb3IgdG91Y2ggZXZlbnQgb2Zmc2V0IGZvciB0aGUgY3VycmVudCBjb25maWd1cmF0aW9uIChob3Jpem9udGFsIG9yIHZlcnRpY2FsKS5cclxuICAgICAqIEBwYXJhbSBlIHRoZSBldmVudCB0byBjYWxjdWxhdGUgdGhlIG9mZnNldCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBhIG51bWJlciBpbiB0aGUgcmFuZ2Ugb2YgWzAsIDFdXHJcbiAgICAgKiBAc2VlICNnZXRIb3Jpem9udGFsT2Zmc2V0XHJcbiAgICAgKiBAc2VlICNnZXRWZXJ0aWNhbE9mZnNldFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoU3VwcG9ydGVkICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmVydGljYWxPZmZzZXQoZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGUudG91Y2hlc1swXS5wYWdlWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRIb3Jpem9udGFsT2Zmc2V0KGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBlLnRvdWNoZXNbMF0ucGFnZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmVydGljYWxPZmZzZXQoZS5wYWdlWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRIb3Jpem9udGFsT2Zmc2V0KGUucGFnZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY29uc29sZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdpbnZhbGlkIGV2ZW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2FuaXRpemVzIHRoZSBtb3VzZSBvZmZzZXQgdG8gdGhlIHJhbmdlIG9mIFswLCAxXS5cclxuICAgICAqXHJcbiAgICAgKiBXaGVuIHRyYWNraW5nIHRoZSBtb3VzZSBvdXRzaWRlIHRoZSBzZWVrIGJhciwgdGhlIG9mZnNldCBjYW4gYmUgb3V0c2lkZSB0aGUgZGVzaXJlZCByYW5nZSBhbmQgdGhpcyBtZXRob2RcclxuICAgICAqIGxpbWl0cyBpdCB0byB0aGUgZGVzaXJlZCByYW5nZS4gRS5nLiBhIG1vdXNlIGV2ZW50IGxlZnQgb2YgdGhlIGxlZnQgZWRnZSBvZiBhIHNlZWsgYmFyIHlpZWxkcyBhbiBvZmZzZXQgYmVsb3dcclxuICAgICAqIHplcm8sIGJ1dCB0byBkaXNwbGF5IHRoZSBzZWVrIHRhcmdldCBvbiB0aGUgc2VlayBiYXIsIHdlIG5lZWQgdG8gbGltaXQgaXQgdG8gemVyby5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gc2FuaXRpemVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBzYW5pdGl6ZWQgb2Zmc2V0LlxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5zYW5pdGl6ZU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuICAgICAgICAvLyBTaW5jZSB3ZSB0cmFjayBtb3VzZSBtb3ZlcyBvdmVyIHRoZSB3aG9sZSBkb2N1bWVudCwgdGhlIHRhcmdldCBjYW4gYmUgb3V0c2lkZSB0aGUgc2VlayByYW5nZSxcclxuICAgICAgICAvLyBhbmQgd2UgbmVlZCB0byBsaW1pdCBpdCB0byB0aGUgWzAsIDFdIHJhbmdlLlxyXG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9mZnNldCA+IDEpIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBwb3NpdGlvbiBpbmRpY2F0b3IuXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudCBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMCBhcyByZXR1cm5lZCBieSB0aGUgcGxheWVyXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnNldFBsYXliYWNrUG9zaXRpb24gPSBmdW5jdGlvbiAocGVyY2VudCkge1xyXG4gICAgICAgIHRoaXMucGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UgPSBwZXJjZW50O1xyXG4gICAgICAgIC8vIFNldCBwb3NpdGlvbiBvZiB0aGUgYmFyXHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLnNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uLCBwZXJjZW50KTtcclxuICAgICAgICAvLyBTZXQgcG9zaXRpb24gb2YgdGhlIG1hcmtlclxyXG4gICAgICAgIHZhciBweCA9ICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCA/IHRoaXMuc2Vla0Jhci5oZWlnaHQoKSA6IHRoaXMuc2Vla0Jhci53aWR0aCgpKSAvIDEwMCAqIHBlcmNlbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHB4ID0gdGhpcy5zZWVrQmFyLmhlaWdodCgpIC0gcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuY29uZmlnLnZlcnRpY2FsID9cclxuICAgICAgICAgICAgLy8gLW1zLXRyYW5zZm9ybSByZXF1aXJlZCBmb3IgSUU5XHJcbiAgICAgICAgICAgIHsgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKCcgKyBweCArICdweCknLCAnLW1zLXRyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKCcgKyBweCArICdweCknIH0gOlxyXG4gICAgICAgICAgICB7ICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlWCgnICsgcHggKyAncHgpJywgJy1tcy10cmFuc2Zvcm0nOiAndHJhbnNsYXRlWCgnICsgcHggKyAncHgpJyB9O1xyXG4gICAgICAgIHRoaXMuc2Vla0JhclBsYXliYWNrUG9zaXRpb25NYXJrZXIuY3NzKHN0eWxlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgcGxheWJhY2sgcG9zaXRpb24uIENhbiBiZSB1c2VkIGJ5IHN1YmNsYXNzZXMgdG8gcmVmcmVzaCB0aGUgcG9zaXRpb24gd2hlblxyXG4gICAgICogdGhlIHNpemUgb2YgdGhlIGNvbXBvbmVudCBjaGFuZ2VzLlxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNldFBsYXliYWNrUG9zaXRpb24odGhpcy5wbGF5YmFja1Bvc2l0aW9uUGVyY2VudGFnZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb3NpdGlvbiB1bnRpbCB3aGljaCBtZWRpYSBpcyBidWZmZXJlZC5cclxuICAgICAqIEBwYXJhbSBwZXJjZW50IGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTAwXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnNldEJ1ZmZlclBvc2l0aW9uID0gZnVuY3Rpb24gKHBlcmNlbnQpIHtcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc2Vla0JhckJ1ZmZlclBvc2l0aW9uLCBwZXJjZW50KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvc2l0aW9uIHdoZXJlIGEgc2VlaywgaWYgZXhlY3V0ZWQsIHdvdWxkIGp1bXAgdG8uXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudCBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5zZXRTZWVrUG9zaXRpb24gPSBmdW5jdGlvbiAocGVyY2VudCkge1xyXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5zZWVrQmFyU2Vla1Bvc2l0aW9uLCBwZXJjZW50KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgYWN0dWFsIHBvc2l0aW9uICh3aWR0aCBvciBoZWlnaHQpIG9mIGEgRE9NIGVsZW1lbnQgdGhhdCByZXByZXNlbnQgYSBiYXIgaW4gdGhlIHNlZWsgYmFyLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBwb3NpdGlvbiBmb3JcclxuICAgICAqIEBwYXJhbSBwZXJjZW50IGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTAwXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBlcmNlbnQpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBwZXJjZW50IC8gMTAwO1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuY29uZmlnLnZlcnRpY2FsID9cclxuICAgICAgICAgICAgLy8gLW1zLXRyYW5zZm9ybSByZXF1aXJlZCBmb3IgSUU5XHJcbiAgICAgICAgICAgIHsgJ3RyYW5zZm9ybSc6ICdzY2FsZVkoJyArIHNjYWxlICsgJyknLCAnLW1zLXRyYW5zZm9ybSc6ICdzY2FsZVkoJyArIHNjYWxlICsgJyknIH0gOlxyXG4gICAgICAgICAgICB7ICd0cmFuc2Zvcm0nOiAnc2NhbGVYKCcgKyBzY2FsZSArICcpJywgJy1tcy10cmFuc2Zvcm0nOiAnc2NhbGVYKCcgKyBzY2FsZSArICcpJyB9O1xyXG4gICAgICAgIGVsZW1lbnQuY3NzKHN0eWxlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFB1dHMgdGhlIHNlZWsgYmFyIGludG8gb3Igb3V0IG9mIHNlZWtpbmcgc3RhdGUgYnkgYWRkaW5nL3JlbW92aW5nIGEgY2xhc3MgdG8gdGhlIERPTSBlbGVtZW50LiBUaGlzIGNhbiBiZSB1c2VkXHJcbiAgICAgKiB0byBhZGp1c3QgdGhlIHN0eWxpbmcgd2hpbGUgc2Vla2luZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2Vla2luZyBzaG91bGQgYmUgdHJ1ZSB3aGVuIGVudGVyaW5nIHNlZWsgc3RhdGUsIGZhbHNlIHdoZW4gZXhpdGluZyB0aGUgc2VlayBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5zZXRTZWVraW5nID0gZnVuY3Rpb24gKHNlZWtpbmcpIHtcclxuICAgICAgICBpZiAoc2Vla2luZykge1xyXG4gICAgICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyh0aGlzLnByZWZpeENzcyhTZWVrQmFyLkNMQVNTX1NFRUtJTkcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLnJlbW92ZUNsYXNzKHRoaXMucHJlZml4Q3NzKFNlZWtCYXIuQ0xBU1NfU0VFS0lORykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgc2VlayBiYXIgaXMgY3VycmVudGx5IGluIHRoZSBzZWVrIHN0YXRlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgaW4gc2VlayBzdGF0ZSwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5pc1NlZWtpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmhhc0NsYXNzKHRoaXMucHJlZml4Q3NzKFNlZWtCYXIuQ0xBU1NfU0VFS0lORykpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBzZWVrIGJhciBoYXMgYSB7QGxpbmsgU2Vla0JhckxhYmVsfS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBzZWVrIGJhciBoYXMgYSBsYWJlbCwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5oYXNMYWJlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbCAhPSBudWxsO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbGFiZWwgb2YgdGhpcyBzZWVrIGJhci5cclxuICAgICAqIEByZXR1cm5zIHtTZWVrQmFyTGFiZWx9IHRoZSBsYWJlbCBpZiB0aGlzIHNlZWsgYmFyIGhhcyBhIGxhYmVsLCBlbHNlIG51bGxcclxuICAgICAqL1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuZ2V0TGFiZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWw7XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUub25TZWVrRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyRXZlbnRzLm9uU2Vlay5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5vblNlZWtQcmV2aWV3RXZlbnQgPSBmdW5jdGlvbiAocGVyY2VudGFnZSwgc2NydWJiaW5nKSB7XHJcbiAgICAgICAgdmFyIHNuYXBwZWRNYXJrZXIgPSB0aGlzLmdldE1hcmtlckF0UG9zaXRpb24ocGVyY2VudGFnZSk7XHJcbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5nZXREb21FbGVtZW50KCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICdsZWZ0JzogKHNuYXBwZWRNYXJrZXIgPyBzbmFwcGVkTWFya2VyLnRpbWUgOiBwZXJjZW50YWdlKSArICclJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyRXZlbnRzLm9uU2Vla1ByZXZpZXcuZGlzcGF0Y2godGhpcywge1xyXG4gICAgICAgICAgICBzY3J1YmJpbmc6IHNjcnViYmluZyxcclxuICAgICAgICAgICAgcG9zaXRpb246IHBlcmNlbnRhZ2UsXHJcbiAgICAgICAgICAgIG1hcmtlcjogc25hcHBlZE1hcmtlcixcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5vblNlZWtlZEV2ZW50ID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICB0aGlzLnNlZWtCYXJFdmVudHMub25TZWVrZWQuZGlzcGF0Y2godGhpcywgcGVyY2VudGFnZSk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlZWtCYXIucHJvdG90eXBlLCBcIm9uU2Vla1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIGEgc2NydWJiaW5nIHNlZWsgb3BlcmF0aW9uIGlzIHN0YXJ0ZWQuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PFNlZWtCYXIsIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlZWtCYXJFdmVudHMub25TZWVrLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2Vla0Jhci5wcm90b3R5cGUsIFwib25TZWVrUHJldmlld1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCBkdXJpbmcgYSBzY3J1YmJpbmcgc2VlayAodG8gaW5kaWNhdGUgdGhhdCB0aGUgc2VlayBwcmV2aWV3LCBpLmUuIHRoZSB2aWRlbyBmcmFtZSxcclxuICAgICAgICAgKiBzaG91bGQgYmUgdXBkYXRlZCksIG9yIGR1cmluZyBhIG5vcm1hbCBzZWVrIHByZXZpZXcgd2hlbiB0aGUgc2VlayBiYXIgaXMgaG92ZXJlZCAoYW5kIHRoZSBzZWVrIHRhcmdldCxcclxuICAgICAgICAgKiBpLmUuIHRoZSBzZWVrIGJhciBsYWJlbCwgc2hvdWxkIGJlIHVwZGF0ZWQpLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxTZWVrQmFyLCBTZWVrUHJldmlld0V2ZW50QXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlZWtCYXJFdmVudHMub25TZWVrUHJldmlldy5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlZWtCYXIucHJvdG90eXBlLCBcIm9uU2Vla2VkXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gYSBzY3J1YmJpbmcgc2VlayBoYXMgZmluaXNoZWQgb3Igd2hlbiBhIGRpcmVjdCBzZWVrIGlzIGlzc3VlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8U2Vla0JhciwgbnVtYmVyPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Vla0JhckV2ZW50cy5vblNlZWtlZC5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUub25TaG93RXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vblNob3dFdmVudC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBwb3NpdGlvbiB3aGVuIHRoZSBzZWVrIGJhciBiZWNvbWVzIHZpc2libGUuIFRvIGNvcnJlY3RseSBzZXQgdGhlIHBvc2l0aW9uLFxyXG4gICAgICAgIC8vIHRoZSBET00gZWxlbWVudCBtdXN0IGJlIGZ1bGx5IGluaXRpYWxpemVkIGFuIGhhdmUgaXRzIHNpemUgY2FsY3VsYXRlZCwgYmVjYXVzZSB0aGUgcG9zaXRpb24gaXMgc2V0IGFzIGFuIGFic29sdXRlXHJcbiAgICAgICAgLy8gdmFsdWUgY2FsY3VsYXRlZCBmcm9tIHRoZSBzaXplLiBUaGlzIHJlcXVpcmVkIHNpemUgaXMgbm90IGtub3duIHdoZW4gaXQgaXMgaGlkZGVuLlxyXG4gICAgICAgIC8vIEZvciBzdWNoIGNhc2VzLCB3ZSByZWZyZXNoIHRoZSBwb3NpdGlvbiBoZXJlIGluIG9uU2hvdyBiZWNhdXNlIGhlcmUgaXQgaXMgZ3VhcmFudGVlZCB0aGF0IHRoZSBjb21wb25lbnQga25vd3NcclxuICAgICAgICAvLyBpdHMgc2l6ZSBhbmQgY2FuIHNldCB0aGUgcG9zaXRpb24gY29ycmVjdGx5LlxyXG4gICAgICAgIHRoaXMucmVmcmVzaFBsYXliYWNrUG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU2Vla0JhcjtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuU2Vla0Jhci5TTU9PVEhfUExBWUJBQ0tfUE9TSVRJT05fVVBEQVRFX0RJU0FCTEVEID0gLTE7XHJcbi8qKlxyXG4gKiBUaGUgQ1NTIGNsYXNzIHRoYXQgaXMgYWRkZWQgdG8gdGhlIERPTSBlbGVtZW50IHdoaWxlIHRoZSBzZWVrIGJhciBpcyBpbiAnc2Vla2luZycgc3RhdGUuXHJcbiAqL1xyXG5TZWVrQmFyLkNMQVNTX1NFRUtJTkcgPSAnc2Vla2luZyc7XHJcbmV4cG9ydHMuU2Vla0JhciA9IFNlZWtCYXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3NlZWtiYXIudHNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuLi9kb21cIik7XHJcbnZhciB0aW1lb3V0XzEgPSByZXF1aXJlKFwiLi4vdGltZW91dFwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBjb250YWluZXIgdGhhdCBjb250YWlucyBhbGwgb2YgdGhlIFVJLiBUaGUgVUlDb250YWluZXIgaXMgcGFzc2VkIHRvIHRoZSB7QGxpbmsgVUlNYW5hZ2VyfSB0byBidWlsZCBhbmRcclxuICogc2V0dXAgdGhlIFVJLlxyXG4gKi9cclxudmFyIFVJQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhVSUNvbnRhaW5lciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFVJQ29udGFpbmVyKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS11aWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIGhpZGVEZWxheTogNTAwMCxcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFVJQ29udGFpbmVyLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZVVJU2hvd0hpZGUocGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuY29uZmlndXJlUGxheWVyU3RhdGVzKHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgIH07XHJcbiAgICBVSUNvbnRhaW5lci5wcm90b3R5cGUuY29uZmlndXJlVUlTaG93SGlkZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuZ2V0RG9tRWxlbWVudCgpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIHZhciBpc1VpU2hvd24gPSBmYWxzZTtcclxuICAgICAgICB2YXIgaXNTZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGlzRmlyc3RUb3VjaCA9IHRydWU7XHJcbiAgICAgICAgdmFyIHNob3dVaSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFpc1VpU2hvd24pIHtcclxuICAgICAgICAgICAgICAgIC8vIExldCBzdWJzY3JpYmVycyBrbm93IHRoYXQgdGhleSBzaG91bGQgcmV2ZWFsIHRoZW1zZWx2ZXNcclxuICAgICAgICAgICAgICAgIHVpbWFuYWdlci5vbkNvbnRyb2xzU2hvdy5kaXNwYXRjaChfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpc1VpU2hvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIERvbid0IHRyaWdnZXIgdGltZW91dCB3aGlsZSBzZWVraW5nIChpdCB3aWxsIGJlIHRyaWdnZXJlZCBvbmNlIHRoZSBzZWVrIGlzIGZpbmlzaGVkKSBvciBjYXN0aW5nXHJcbiAgICAgICAgICAgIGlmICghaXNTZWVraW5nICYmICFwbGF5ZXIuaXNDYXN0aW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnVpSGlkZVRpbWVvdXQuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGhpZGVVaSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgVUkgb25seSBpZiBpdCBpcyBzaG93biwgYW5kIGlmIG5vdCBjYXN0aW5nXHJcbiAgICAgICAgICAgIGlmIChpc1VpU2hvd24gJiYgIXBsYXllci5pc0Nhc3RpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSXNzdWUgYSBwcmV2aWV3IGV2ZW50IHRvIGNoZWNrIGlmIHdlIGFyZSBnb29kIHRvIGhpZGUgdGhlIGNvbnRyb2xzXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlld0hpZGVFdmVudEFyZ3MgPSB7fTtcclxuICAgICAgICAgICAgICAgIHVpbWFuYWdlci5vblByZXZpZXdDb250cm9sc0hpZGUuZGlzcGF0Y2goX3RoaXMsIHByZXZpZXdIaWRlRXZlbnRBcmdzKTtcclxuICAgICAgICAgICAgICAgIGlmICghcHJldmlld0hpZGVFdmVudEFyZ3MuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByZXZpZXcgd2Fzbid0IGNhbmNlbGVkLCBsZXQgc3Vic2NyaWJlcnMga25vdyB0aGF0IHRoZXkgc2hvdWxkIG5vdyBoaWRlIHRoZW1zZWx2ZXNcclxuICAgICAgICAgICAgICAgICAgICB1aW1hbmFnZXIub25Db250cm9sc0hpZGUuZGlzcGF0Y2goX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVWlTaG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGhpZGUgcHJldmlldyB3YXMgY2FuY2VsZWQsIGNvbnRpbnVlIHRvIHNob3cgVUlcclxuICAgICAgICAgICAgICAgICAgICBzaG93VWkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gVGltZW91dCB0byBkZWZlciBVSSBoaWRpbmcgYnkgdGhlIGNvbmZpZ3VyZWQgZGVsYXkgdGltZVxyXG4gICAgICAgIHRoaXMudWlIaWRlVGltZW91dCA9IG5ldyB0aW1lb3V0XzEuVGltZW91dChjb25maWcuaGlkZURlbGF5LCBoaWRlVWkpO1xyXG4gICAgICAgIC8vIE9uIHRvdWNoIGRpc3BsYXlzLCB0aGUgZmlyc3QgdG91Y2ggcmV2ZWFscyB0aGUgVUlcclxuICAgICAgICBjb250YWluZXIub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCFpc1VpU2hvd24pIHtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgaWYgdGhlIFVJIGlzIGhpZGRlbiwgd2UgcHJldmVudCBvdGhlciBhY3Rpb25zIChleGNlcHQgZm9yIHRoZSBmaXJzdCB0b3VjaCkgYW5kIHJldmVhbCB0aGUgVUkgaW5zdGVhZC5cclxuICAgICAgICAgICAgICAgIC8vIFRoZSBmaXJzdCB0b3VjaCBpcyBub3QgcHJldmVudGVkIHRvIGxldCBvdGhlciBsaXN0ZW5lcnMgcmVjZWl2ZSB0aGUgZXZlbnQgYW5kIHRyaWdnZXIgYW4gaW5pdGlhbCBhY3Rpb24sIGUuZy5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSBodWdlIHBsYXliYWNrIGJ1dHRvbiBjYW4gZGlyZWN0bHkgc3RhcnQgcGxheWJhY2sgaW5zdGVhZCBvZiByZXF1aXJpbmcgYSBkb3VibGUgdGFwIHdoaWNoIDEuIHJldmVhbHNcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBVSSBhbmQgMi4gc3RhcnRzIHBsYXliYWNrLlxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRmlyc3RUb3VjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3RUb3VjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2hvd1VpKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBXaGVuIHRoZSBtb3VzZSBlbnRlcnMsIHdlIHNob3cgdGhlIFVJXHJcbiAgICAgICAgY29udGFpbmVyLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG93VWkoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBXaGVuIHRoZSBtb3VzZSBtb3ZlcyB3aXRoaW4sIHdlIHNob3cgdGhlIFVJXHJcbiAgICAgICAgY29udGFpbmVyLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dVaSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFdoZW4gdGhlIG1vdXNlIGxlYXZlcywgd2UgY2FuIHByZXBhcmUgdG8gaGlkZSB0aGUgVUksIGV4Y2VwdCBhIHNlZWsgaXMgZ29pbmcgb25cclxuICAgICAgICBjb250YWluZXIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gYSBzZWVrIGlzIGdvaW5nIG9uLCB0aGUgc2VlayBzY3J1YiBwb2ludGVyIG1heSBleGl0IHRoZSBVSSBhcmVhIHdoaWxlIHN0aWxsIHNlZWtpbmcsIGFuZCB3ZSBkbyBub3QgaGlkZVxyXG4gICAgICAgICAgICAvLyB0aGUgVUkgaW4gc3VjaCBjYXNlc1xyXG4gICAgICAgICAgICBpZiAoIWlzU2Vla2luZykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudWlIaWRlVGltZW91dC5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uU2Vlay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy51aUhpZGVUaW1lb3V0LmNsZWFyKCk7IC8vIERvbid0IGhpZGUgVUkgd2hpbGUgYSBzZWVrIGlzIGluIHByb2dyZXNzXHJcbiAgICAgICAgICAgIGlzU2Vla2luZyA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uU2Vla2VkLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlzU2Vla2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBfdGhpcy51aUhpZGVUaW1lb3V0LnN0YXJ0KCk7IC8vIFJlLWVuYWJsZSBVSSBoaWRlIHRpbWVvdXQgYWZ0ZXIgYSBzZWVrXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9TVEFSVEVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dVaSgpOyAvLyBTaG93IFVJIHdoZW4gYSBDYXN0IHNlc3Npb24gaGFzIHN0YXJ0ZWQgKFVJIHdpbGwgdGhlbiBzdGF5IHBlcm1hbmVudGx5IG9uIGR1cmluZyB0aGUgc2Vzc2lvbilcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBVSUNvbnRhaW5lci5wcm90b3R5cGUuY29uZmlndXJlUGxheWVyU3RhdGVzID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5nZXREb21FbGVtZW50KCk7XHJcbiAgICAgICAgLy8gQ29udmVydCBwbGF5ZXIgc3RhdGVzIGludG8gQ1NTIGNsYXNzIG5hbWVzXHJcbiAgICAgICAgdmFyIHN0YXRlQ2xhc3NOYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIHN0YXRlIGluIHV0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGlzTmFOKE51bWJlcihzdGF0ZSkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW51bU5hbWUgPSB1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGVbc3RhdGVdXTtcclxuICAgICAgICAgICAgICAgIHN0YXRlQ2xhc3NOYW1lc1t1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlW3N0YXRlXV0gPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLlNUQVRFX1BSRUZJWCArIGVudW1OYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZW1vdmVTdGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZS5JRExFXSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZS5QUkVQQVJFRF0pO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuUExBWUlOR10pO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuUEFVU0VEXSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZS5GSU5JU0hFRF0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUkVBRFksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlU3RhdGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZS5QUkVQQVJFRF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlU3RhdGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZS5QTEFZSU5HXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUEFVU0VELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVN0YXRlcygpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuUEFVU0VEXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUExBWUJBQ0tfRklOSVNIRUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlU3RhdGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZS5GSU5JU0hFRF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NPVVJDRV9VTkxPQURFRCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZW1vdmVTdGF0ZXMoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHN0YXRlQ2xhc3NOYW1lc1t1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlLklETEVdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0IGluIGN1cnJlbnQgcGxheWVyIHN0YXRlXHJcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHN0YXRlQ2xhc3NOYW1lc1t1dGlsc18xLlBsYXllclV0aWxzLmdldFN0YXRlKHBsYXllcildKTtcclxuICAgICAgICAvLyBGdWxsc2NyZWVuIG1hcmtlciBjbGFzc1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0ZVTExTQ1JFRU5fRU5URVIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKF90aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5GVUxMU0NSRUVOKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fRlVMTFNDUkVFTl9FWElULCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuRlVMTFNDUkVFTikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEluaXQgZnVsbHNjcmVlbiBzdGF0ZVxyXG4gICAgICAgIGlmIChwbGF5ZXIuaXNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHRoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLkZVTExTQ1JFRU4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQnVmZmVyaW5nIG1hcmtlciBjbGFzc1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NUQUxMX1NUQVJURUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKF90aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5CVUZGRVJJTkcpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TVEFMTF9FTkRFRCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLkJVRkZFUklORykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEluaXQgYnVmZmVyaW5nIHN0YXRlXHJcbiAgICAgICAgaWYgKHBsYXllci5pc1N0YWxsZWQoKSkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3ModGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuQlVGRkVSSU5HKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW90ZUNvbnRyb2wgbWFya2VyIGNsYXNzXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9TVEFSVEVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuUkVNT1RFX0NPTlRST0wpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1NUT1BQRUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5SRU1PVEVfQ09OVFJPTCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEluaXQgUmVtb3RlQ29udHJvbCBzdGF0ZVxyXG4gICAgICAgIGlmIChwbGF5ZXIuaXNDYXN0aW5nKCkpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHRoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLlJFTU9URV9DT05UUk9MKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENvbnRyb2xzIHZpc2liaWxpdHkgbWFya2VyIGNsYXNzXHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29udHJvbHNTaG93LnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuQ09OVFJPTFNfSElEREVOKSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuQ09OVFJPTFNfU0hPV04pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB1aW1hbmFnZXIub25Db250cm9sc0hpZGUuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5DT05UUk9MU19TSE9XTikpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLkNPTlRST0xTX0hJRERFTikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIExheW91dCBzaXplIGNsYXNzZXNcclxuICAgICAgICB2YXIgdXBkYXRlTGF5b3V0U2l6ZUNsYXNzZXMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsYXlvdXQtbWF4LXdpZHRoLTQwMCcpKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcygnbGF5b3V0LW1heC13aWR0aC02MDAnKSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoJ2xheW91dC1tYXgtd2lkdGgtODAwJykpO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsYXlvdXQtbWF4LXdpZHRoLTEyMDAnKSk7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aCA8PSA0MDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoJ2xheW91dC1tYXgtd2lkdGgtNDAwJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZHRoIDw9IDYwMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKF90aGlzLnByZWZpeENzcygnbGF5b3V0LW1heC13aWR0aC02MDAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAod2lkdGggPD0gODAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsYXlvdXQtbWF4LXdpZHRoLTgwMCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh3aWR0aCA8PSAxMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsYXlvdXQtbWF4LXdpZHRoLTEyMDAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVlFUl9SRVNJWkUsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5ncyAod2l0aCBcInB4XCIgc3VmZml4KSB0byBpbnRzXHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IE1hdGgucm91bmQoTnVtYmVyKGUud2lkdGguc3Vic3RyaW5nKDAsIGUud2lkdGgubGVuZ3RoIC0gMikpKTtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IE1hdGgucm91bmQoTnVtYmVyKGUuaGVpZ2h0LnN1YnN0cmluZygwLCBlLmhlaWdodC5sZW5ndGggLSAyKSkpO1xyXG4gICAgICAgICAgICB1cGRhdGVMYXlvdXRTaXplQ2xhc3Nlcyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0IGxheW91dCBzdGF0ZVxyXG4gICAgICAgIHVwZGF0ZUxheW91dFNpemVDbGFzc2VzKG5ldyBkb21fMS5ET00ocGxheWVyLmdldEZpZ3VyZSgpKS53aWR0aCgpLCBuZXcgZG9tXzEuRE9NKHBsYXllci5nZXRGaWd1cmUoKSkuaGVpZ2h0KCkpO1xyXG4gICAgfTtcclxuICAgIFVJQ29udGFpbmVyLnByb3RvdHlwZS5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVsZWFzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudWlIaWRlVGltZW91dC5jbGVhcigpO1xyXG4gICAgfTtcclxuICAgIFVJQ29udGFpbmVyLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IF9zdXBlci5wcm90b3R5cGUudG9Eb21FbGVtZW50LmNhbGwodGhpcyk7XHJcbiAgICAgICAgLy8gRGV0ZWN0IGZsZXhib3ggc3VwcG9ydCAobm90IHN1cHBvcnRlZCBpbiBJRTkpXHJcbiAgICAgICAgaWYgKGRvY3VtZW50ICYmIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykuc3R5bGUuZmxleCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHRoaXMucHJlZml4Q3NzKCdmbGV4Ym94JykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHRoaXMucHJlZml4Q3NzKCduby1mbGV4Ym94JykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBVSUNvbnRhaW5lcjtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuVUlDb250YWluZXIuU1RBVEVfUFJFRklYID0gJ3BsYXllci1zdGF0ZS0nO1xyXG5VSUNvbnRhaW5lci5GVUxMU0NSRUVOID0gJ2Z1bGxzY3JlZW4nO1xyXG5VSUNvbnRhaW5lci5CVUZGRVJJTkcgPSAnYnVmZmVyaW5nJztcclxuVUlDb250YWluZXIuUkVNT1RFX0NPTlRST0wgPSAncmVtb3RlLWNvbnRyb2wnO1xyXG5VSUNvbnRhaW5lci5DT05UUk9MU19TSE9XTiA9ICdjb250cm9scy1zaG93bic7XHJcblVJQ29udGFpbmVyLkNPTlRST0xTX0hJRERFTiA9ICdjb250cm9scy1oaWRkZW4nO1xyXG5leHBvcnRzLlVJQ29udGFpbmVyID0gVUlDb250YWluZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3VpY29udGFpbmVyLnRzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgc2VsZWN0Ym94XzEgPSByZXF1aXJlKFwiLi9zZWxlY3Rib3hcIik7XHJcbi8qKlxyXG4gKiBBIHNlbGVjdCBib3ggcHJvdmlkaW5nIGEgc2VsZWN0aW9uIGJldHdlZW4gJ2F1dG8nIGFuZCB0aGUgYXZhaWxhYmxlIGF1ZGlvIHF1YWxpdGllcy5cclxuICovXHJcbnZhciBBdWRpb1F1YWxpdHlTZWxlY3RCb3ggPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEF1ZGlvUXVhbGl0eVNlbGVjdEJveCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEF1ZGlvUXVhbGl0eVNlbGVjdEJveChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgQXVkaW9RdWFsaXR5U2VsZWN0Qm94LnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciB1cGRhdGVBdWRpb1F1YWxpdGllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvUXVhbGl0aWVzID0gcGxheWVyLmdldEF2YWlsYWJsZUF1ZGlvUXVhbGl0aWVzKCk7XHJcbiAgICAgICAgICAgIF90aGlzLmNsZWFySXRlbXMoKTtcclxuICAgICAgICAgICAgLy8gQWRkIGVudHJ5IGZvciBhdXRvbWF0aWMgcXVhbGl0eSBzd2l0Y2hpbmcgKGRlZmF1bHQgc2V0dGluZylcclxuICAgICAgICAgICAgX3RoaXMuYWRkSXRlbSgnYXV0bycsICdhdXRvJyk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBhdWRpbyBxdWFsaXRpZXNcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBhdWRpb1F1YWxpdGllc18xID0gYXVkaW9RdWFsaXRpZXM7IF9pIDwgYXVkaW9RdWFsaXRpZXNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdWRpb1F1YWxpdHkgPSBhdWRpb1F1YWxpdGllc18xW19pXTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZEl0ZW0oYXVkaW9RdWFsaXR5LmlkLCBhdWRpb1F1YWxpdHkubGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0QXVkaW9RdWFsaXR5KHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBVcGRhdGUgcXVhbGl0aWVzIHdoZW4gYXVkaW8gdHJhY2sgaGFzIGNoYW5nZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9BVURJT19DSEFOR0VELCB1cGRhdGVBdWRpb1F1YWxpdGllcyk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHF1YWxpdGllcyB3aGVuIHNvdXJjZSBnb2VzIGF3YXlcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfVU5MT0FERUQsIHVwZGF0ZUF1ZGlvUXVhbGl0aWVzKTtcclxuICAgICAgICAvLyBVcGRhdGUgcXVhbGl0aWVzIHdoZW4gYSBuZXcgc291cmNlIGlzIGxvYWRlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCB1cGRhdGVBdWRpb1F1YWxpdGllcyk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHF1YWxpdHkgc2VsZWN0aW9uIHdoZW4gcXVhbGl0eSBpcyBjaGFuZ2VkIChmcm9tIG91dHNpZGUpXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQVVESU9fRE9XTkxPQURfUVVBTElUWV9DSEFOR0UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBwbGF5ZXIuZ2V0RG93bmxvYWRlZEF1ZGlvRGF0YSgpO1xyXG4gICAgICAgICAgICBfdGhpcy5zZWxlY3RJdGVtKGRhdGEuaXNBdXRvID8gJ2F1dG8nIDogZGF0YS5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gUG9wdWxhdGUgcXVhbGl0aWVzIGF0IHN0YXJ0dXBcclxuICAgICAgICB1cGRhdGVBdWRpb1F1YWxpdGllcygpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBdWRpb1F1YWxpdHlTZWxlY3RCb3g7XHJcbn0oc2VsZWN0Ym94XzEuU2VsZWN0Qm94KSk7XHJcbmV4cG9ydHMuQXVkaW9RdWFsaXR5U2VsZWN0Qm94ID0gQXVkaW9RdWFsaXR5U2VsZWN0Qm94O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9hdWRpb3F1YWxpdHlzZWxlY3Rib3gudHNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4vbGFiZWxcIik7XHJcbnZhciB0dm5vaXNlY2FudmFzXzEgPSByZXF1aXJlKFwiLi90dm5vaXNlY2FudmFzXCIpO1xyXG4vKipcclxuICogT3ZlcmxheXMgdGhlIHBsYXllciBhbmQgZGlzcGxheXMgZXJyb3IgbWVzc2FnZXMuXHJcbiAqL1xyXG52YXIgRXJyb3JNZXNzYWdlT3ZlcmxheSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoRXJyb3JNZXNzYWdlT3ZlcmxheSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEVycm9yTWVzc2FnZU92ZXJsYXkoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmVycm9yTGFiZWwgPSBuZXcgbGFiZWxfMS5MYWJlbCh7IGNzc0NsYXNzOiAndWktZXJyb3JtZXNzYWdlLWxhYmVsJyB9KTtcclxuICAgICAgICBfdGhpcy50dk5vaXNlQmFja2dyb3VuZCA9IG5ldyB0dm5vaXNlY2FudmFzXzEuVHZOb2lzZUNhbnZhcygpO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWVycm9ybWVzc2FnZS1vdmVybGF5JyxcclxuICAgICAgICAgICAgY29tcG9uZW50czogW190aGlzLnR2Tm9pc2VCYWNrZ3JvdW5kLCBfdGhpcy5lcnJvckxhYmVsXSxcclxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBFcnJvck1lc3NhZ2VPdmVybGF5LnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0VSUk9SLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBldmVudC5tZXNzYWdlO1xyXG4gICAgICAgICAgICAvLyBQcm9jZXNzIG1lc3NhZ2UgdHJhbnNsYXRpb25zXHJcbiAgICAgICAgICAgIGlmIChjb25maWcubWVzc2FnZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnLm1lc3NhZ2VzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJhbnNsYXRpb24gZnVuY3Rpb24gZm9yIGFsbCBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gY29uZmlnLm1lc3NhZ2VzKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5tZXNzYWdlc1tldmVudC5jb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3Mgbm90IGEgdHJhbnNsYXRpb24gZnVuY3Rpb24sIHNvIGl0IG11c3QgYmUgYSBtYXAgb2Ygc3RyaW5ncyBvciB0cmFuc2xhdGlvbiBmdW5jdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VzdG9tTWVzc2FnZSA9IGNvbmZpZy5tZXNzYWdlc1tldmVudC5jb2RlXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1c3RvbU1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBjdXN0b21NZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG1lc3NhZ2UgaXMgYSB0cmFuc2xhdGlvbiBmdW5jdGlvbiwgc28gd2UgY2FsbCBpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gY3VzdG9tTWVzc2FnZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLmVycm9yTGFiZWwuc2V0VGV4dChtZXNzYWdlKTtcclxuICAgICAgICAgICAgX3RoaXMudHZOb2lzZUJhY2tncm91bmQuc3RhcnQoKTtcclxuICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NPVVJDRV9MT0FERUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaXNTaG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50dk5vaXNlQmFja2dyb3VuZC5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRXJyb3JNZXNzYWdlT3ZlcmxheTtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuZXhwb3J0cy5FcnJvck1lc3NhZ2VPdmVybGF5ID0gRXJyb3JNZXNzYWdlT3ZlcmxheTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvZXJyb3JtZXNzYWdlb3ZlcmxheS50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vcGxheWJhY2t0b2dnbGVidXR0b25cIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuLi9kb21cIik7XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiB0aGF0IG92ZXJsYXlzIHRoZSB2aWRlbyBhbmQgdG9nZ2xlcyBiZXR3ZWVuIHBsYXliYWNrIGFuZCBwYXVzZS5cclxuICovXHJcbnZhciBIdWdlUGxheWJhY2tUb2dnbGVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbihjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktaHVnZXBsYXliYWNrdG9nZ2xlYnV0dG9uJyxcclxuICAgICAgICAgICAgdGV4dDogJ1BsYXkvUGF1c2UnXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBIdWdlUGxheWJhY2tUb2dnbGVCdXR0b24ucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gVXBkYXRlIGJ1dHRvbiBzdGF0ZSB0aHJvdWdoIEFQSSBldmVudHNcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyLCBmYWxzZSk7XHJcbiAgICAgICAgdmFyIHRvZ2dsZVBsYXliYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzUGxheWluZygpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGF1c2UoJ3VpLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KCd1aS1vdmVybGF5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB0b2dnbGVGdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHBsYXllci5lbnRlckZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGZpcnN0UGxheSA9IHRydWU7XHJcbiAgICAgICAgdmFyIGNsaWNrVGltZSA9IDA7XHJcbiAgICAgICAgdmFyIGRvdWJsZUNsaWNrVGltZSA9IDA7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBZb3VUdWJlLXN0eWxlIHRvZ2dsZSBidXR0b24gaGFuZGxpbmdcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRoZSBnb2FsIGlzIHRvIHByZXZlbnQgYSBzaG9ydCBwYXVzZSBvciBwbGF5YmFjayBpbnRlcnZhbCBiZXR3ZWVuIGEgY2xpY2ssIHRoYXQgdG9nZ2xlcyBwbGF5YmFjaywgYW5kIGFcclxuICAgICAgICAgKiBkb3VibGUgY2xpY2ssIHRoYXQgdG9nZ2xlcyBmdWxsc2NyZWVuLiBJbiB0aGlzIG5haXZlIGFwcHJvYWNoLCB0aGUgZmlyc3QgY2xpY2sgd291bGQgZS5nLiBzdGFydCBwbGF5YmFjayxcclxuICAgICAgICAgKiB0aGUgc2Vjb25kIGNsaWNrIHdvdWxkIGJlIGRldGVjdGVkIGFzIGRvdWJsZSBjbGljayBhbmQgdG9nZ2xlIHRvIGZ1bGxzY3JlZW4sIGFuZCBhcyBzZWNvbmQgbm9ybWFsIGNsaWNrIHN0b3BcclxuICAgICAgICAgKiBwbGF5YmFjaywgd2hpY2ggcmVzdWx0cyBpcyBhIHNob3J0IHBsYXliYWNrIGludGVydmFsIHdpdGggbWF4IGxlbmd0aCBvZiB0aGUgZG91YmxlIGNsaWNrIGRldGVjdGlvblxyXG4gICAgICAgICAqIHBlcmlvZCAodXN1YWxseSA1MDBtcykuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBUbyBzb2x2ZSB0aGlzIGlzc3VlLCB3ZSBkZWZlciBoYW5kbGluZyBvZiB0aGUgZmlyc3QgY2xpY2sgZm9yIDIwMG1zLCB3aGljaCBpcyBhbG1vc3QgdW5ub3RpY2VhYmxlIHRvIHRoZSB1c2VyLFxyXG4gICAgICAgICAqIGFuZCBqdXN0IHRvZ2dsZSBwbGF5YmFjayBpZiBubyBzZWNvbmQgY2xpY2sgKGRvdWJsZSBjbGljaykgaGFzIGJlZW4gcmVnaXN0ZXJlZCBkdXJpbmcgdGhpcyBwZXJpb2QuIElmIGEgZG91YmxlXHJcbiAgICAgICAgICogY2xpY2sgaXMgcmVnaXN0ZXJlZCwgd2UganVzdCB0b2dnbGUgdGhlIGZ1bGxzY3JlZW4uIEluIHRoZSBmaXJzdCAyMDBtcywgdW5kZXNpcmVkIHBsYXliYWNrIGNoYW5nZXMgdGh1cyBjYW5ub3RcclxuICAgICAgICAgKiBoYXBwZW4uIElmIGEgZG91YmxlIGNsaWNrIGlzIHJlZ2lzdGVyZWQgd2l0aGluIDUwMG1zLCB3ZSB1bmRvIHRoZSBwbGF5YmFjayBjaGFuZ2UgYW5kIHN3aXRjaCBmdWxsc2NyZWVuIG1vZGUuXHJcbiAgICAgICAgICogSW4gdGhlIGVuZCwgdGhpcyBtZXRob2QgYmFzaWNhbGx5IGludHJvZHVjZXMgYSAyMDBtcyBvYnNlcnZpbmcgaW50ZXJ2YWwgaW4gd2hpY2ggcGxheWJhY2sgY2hhbmdlcyBhcmUgcHJldmVudGVkXHJcbiAgICAgICAgICogaWYgYSBkb3VibGUgY2xpY2sgaGFwcGVucy5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9uQ2xpY2suc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gRGlyZWN0bHkgc3RhcnQgcGxheWJhY2sgb24gZmlyc3QgY2xpY2sgb2YgdGhlIGJ1dHRvbi5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBhIHJlcXVpcmVkIHdvcmthcm91bmQgZm9yIG1vYmlsZSBicm93c2VycyB3aGVyZSB2aWRlbyBwbGF5YmFjayBuZWVkcyB0byBiZSB0cmlnZ2VyZWQgZGlyZWN0bHlcclxuICAgICAgICAgICAgLy8gYnkgdGhlIHVzZXIuIEEgZGVmZXJyZWQgcGxheWJhY2sgc3RhcnQgdGhyb3VnaCB0aGUgdGltZW91dCBiZWxvdyBpcyBub3QgY29uc2lkZXJlZCBhcyB1c2VyIGFjdGlvbiBhbmRcclxuICAgICAgICAgICAgLy8gdGhlcmVmb3JlIGlnbm9yZWQgYnkgbW9iaWxlIGJyb3dzZXJzLlxyXG4gICAgICAgICAgICBpZiAoZmlyc3RQbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gc3RhcnQgcGxheWJhY2suIFRoZW4gd2Ugd2FpdCBmb3IgT05fUExBWSBhbmQgb25seSB3aGVuIGl0IGFycml2ZXMsIHdlIGRpc2FibGUgdGhlIGZpcnN0UGxheSBmbGFnLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZGlzYWJsZSB0aGUgZmxhZyBoZXJlLCBvbkNsaWNrIHdhcyB0cmlnZ2VyZWQgcHJvZ3JhbW1hdGljYWxseSBpbnN0ZWFkIG9mIGJ5IGEgdXNlciBpbnRlcmFjdGlvbiwgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyBwbGF5YmFjayBpcyBibG9ja2VkIChlLmcuIG9uIG1vYmlsZSBkZXZpY2VzIGR1ZSB0byB0aGUgcHJvZ3JhbW1hdGljIHBsYXkoKSBjYWxsKSwgd2UgbG9vc2UgdGhlIGNoYW5jZSB0b1xyXG4gICAgICAgICAgICAgICAgLy8gZXZlciBzdGFydCBwbGF5YmFjayB0aHJvdWdoIGEgdXNlciBpbnRlcmFjdGlvbiBhZ2FpbiB3aXRoIHRoaXMgYnV0dG9uLlxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlUGxheWJhY2soKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgaWYgKG5vdyAtIGNsaWNrVGltZSA8IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIGRvdWJsZSBjbGljayBpbnNpZGUgdGhlIDIwMG1zIGludGVydmFsLCBqdXN0IHRvZ2dsZSBmdWxsc2NyZWVuIG1vZGVcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgIGRvdWJsZUNsaWNrVGltZSA9IG5vdztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChub3cgLSBjbGlja1RpbWUgPCA1MDApIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBkb3VibGUgY2xpY2sgaW5zaWRlIHRoZSA1MDBtcyBpbnRlcnZhbCwgdW5kbyBwbGF5YmFjayB0b2dnbGUgYW5kIHRvZ2dsZSBmdWxsc2NyZWVuIG1vZGVcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZVBsYXliYWNrKCk7XHJcbiAgICAgICAgICAgICAgICBkb3VibGVDbGlja1RpbWUgPSBub3c7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xpY2tUaW1lID0gbm93O1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gZG91YmxlQ2xpY2tUaW1lID4gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gZG91YmxlIGNsaWNrIGRldGVjdGVkLCBzbyB3ZSB0b2dnbGUgcGxheWJhY2sgYW5kIHdhaXQgd2hhdCBoYXBwZW5zIG5leHRcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVQbGF5YmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gUGxheWJhY2sgaGFzIHJlYWxseSBzdGFydGVkLCB3ZSBjYW4gZGlzYWJsZSB0aGUgZmxhZyB0byBzd2l0Y2ggdG8gbm9ybWFsIHRvZ2dsZSBidXR0b24gaGFuZGxpbmdcclxuICAgICAgICAgICAgZmlyc3RQbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSGlkZSBidXR0b24gd2hpbGUgaW5pdGlhbGl6aW5nIGEgQ2FzdCBzZXNzaW9uXHJcbiAgICAgICAgdmFyIGNhc3RJbml0aWFsaXphdGlvbkhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IHBsYXllci5FVkVOVC5PTl9DQVNUX1NUQVJUKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBIaWRlIGJ1dHRvbiB3aGVuIHNlc3Npb24gaXMgYmVpbmcgaW5pdGlhbGl6ZWRcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFNob3cgYnV0dG9uIHdoZW4gc2Vzc2lvbiBpcyBlc3RhYmxpc2hlZCBvciBpbml0aWFsaXphdGlvbiB3YXMgYWJvcnRlZFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1NUQVJULCBjYXN0SW5pdGlhbGl6YXRpb25IYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1NUQVJURUQsIGNhc3RJbml0aWFsaXphdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfU1RPUFBFRCwgY2FzdEluaXRpYWxpemF0aW9uSGFuZGxlcik7XHJcbiAgICB9O1xyXG4gICAgSHVnZVBsYXliYWNrVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbkVsZW1lbnQgPSBfc3VwZXIucHJvdG90eXBlLnRvRG9tRWxlbWVudC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIC8vIEFkZCBjaGlsZCB0aGF0IGNvbnRhaW5zIHRoZSBwbGF5IGJ1dHRvbiBpbWFnZVxyXG4gICAgICAgIC8vIFNldHRpbmcgdGhlIGltYWdlIGRpcmVjdGx5IG9uIHRoZSBidXR0b24gZG9lcyBub3Qgd29yayB0b2dldGhlciB3aXRoIHNjYWxpbmcgYW5pbWF0aW9ucywgYmVjYXVzZSB0aGUgYnV0dG9uXHJcbiAgICAgICAgLy8gY2FuIGNvdmVyIHRoZSB3aG9sZSB2aWRlbyBwbGF5ZXIgYXJlIGFuZCBzY2FsaW5nIHdvdWxkIGV4dGVuZCBpdCBiZXlvbmQuIEJ5IGFkZGluZyBhbiBpbm5lciBlbGVtZW50LCBjb25maW5lZFxyXG4gICAgICAgIC8vIHRvIHRoZSBzaXplIGlmIHRoZSBpbWFnZSwgaXQgY2FuIHNjYWxlIGluc2lkZSB0aGUgcGxheWVyIHdpdGhvdXQgb3ZlcnNob290aW5nLlxyXG4gICAgICAgIGJ1dHRvbkVsZW1lbnQuYXBwZW5kKG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ2ltYWdlJylcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbkVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbjtcclxufShwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xLlBsYXliYWNrVG9nZ2xlQnV0dG9uKSk7XHJcbmV4cG9ydHMuSHVnZVBsYXliYWNrVG9nZ2xlQnV0dG9uID0gSHVnZVBsYXliYWNrVG9nZ2xlQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9odWdlcGxheWJhY2t0b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b25cIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuLi9kb21cIik7XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiB0byBwbGF5L3JlcGxheSBhIHZpZGVvLlxyXG4gKi9cclxudmFyIEh1Z2VSZXBsYXlCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEh1Z2VSZXBsYXlCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBIdWdlUmVwbGF5QnV0dG9uKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1odWdlcmVwbGF5YnV0dG9uJyxcclxuICAgICAgICAgICAgdGV4dDogJ1JlcGxheSdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEh1Z2VSZXBsYXlCdXR0b24ucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMub25DbGljay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIucGxheSgndWktb3ZlcmxheScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh1Z2VSZXBsYXlCdXR0b24ucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYnV0dG9uRWxlbWVudCA9IF9zdXBlci5wcm90b3R5cGUudG9Eb21FbGVtZW50LmNhbGwodGhpcyk7XHJcbiAgICAgICAgLy8gQWRkIGNoaWxkIHRoYXQgY29udGFpbnMgdGhlIHBsYXkgYnV0dG9uIGltYWdlXHJcbiAgICAgICAgLy8gU2V0dGluZyB0aGUgaW1hZ2UgZGlyZWN0bHkgb24gdGhlIGJ1dHRvbiBkb2VzIG5vdCB3b3JrIHRvZ2V0aGVyIHdpdGggc2NhbGluZyBhbmltYXRpb25zLCBiZWNhdXNlIHRoZSBidXR0b25cclxuICAgICAgICAvLyBjYW4gY292ZXIgdGhlIHdob2xlIHZpZGVvIHBsYXllciBhcmUgYW5kIHNjYWxpbmcgd291bGQgZXh0ZW5kIGl0IGJleW9uZC4gQnkgYWRkaW5nIGFuIGlubmVyIGVsZW1lbnQsIGNvbmZpbmVkXHJcbiAgICAgICAgLy8gdG8gdGhlIHNpemUgaWYgdGhlIGltYWdlLCBpdCBjYW4gc2NhbGUgaW5zaWRlIHRoZSBwbGF5ZXIgd2l0aG91dCBvdmVyc2hvb3RpbmcuXHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5hcHBlbmQobmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnaW1hZ2UnKVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gYnV0dG9uRWxlbWVudDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSHVnZVJlcGxheUJ1dHRvbjtcclxufShidXR0b25fMS5CdXR0b24pKTtcclxuZXhwb3J0cy5IdWdlUmVwbGF5QnV0dG9uID0gSHVnZVJlcGxheUJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvaHVnZXJlcGxheWJ1dHRvbi50c1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4vbGFiZWxcIik7XHJcbi8qKlxyXG4gKiBFbnVtZXJhdGVzIHRoZSB0eXBlcyBvZiBjb250ZW50IHRoYXQgdGhlIHtAbGluayBNZXRhZGF0YUxhYmVsfSBjYW4gZGlzcGxheS5cclxuICovXHJcbnZhciBNZXRhZGF0YUxhYmVsQ29udGVudDtcclxuKGZ1bmN0aW9uIChNZXRhZGF0YUxhYmVsQ29udGVudCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaXRsZSBvZiB0aGUgZGF0YSBzb3VyY2UuXHJcbiAgICAgKi9cclxuICAgIE1ldGFkYXRhTGFiZWxDb250ZW50W01ldGFkYXRhTGFiZWxDb250ZW50W1wiVGl0bGVcIl0gPSAwXSA9IFwiVGl0bGVcIjtcclxuICAgIC8qKlxyXG4gICAgICogRGVzY3JpcHRpb24gZm8gdGhlIGRhdGEgc291cmNlLlxyXG4gICAgICovXHJcbiAgICBNZXRhZGF0YUxhYmVsQ29udGVudFtNZXRhZGF0YUxhYmVsQ29udGVudFtcIkRlc2NyaXB0aW9uXCJdID0gMV0gPSBcIkRlc2NyaXB0aW9uXCI7XHJcbn0pKE1ldGFkYXRhTGFiZWxDb250ZW50ID0gZXhwb3J0cy5NZXRhZGF0YUxhYmVsQ29udGVudCB8fCAoZXhwb3J0cy5NZXRhZGF0YUxhYmVsQ29udGVudCA9IHt9KSk7XHJcbi8qKlxyXG4gKiBBIGxhYmVsIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgdG8gZGlzcGxheSBjZXJ0YWluIG1ldGFkYXRhLlxyXG4gKi9cclxudmFyIE1ldGFkYXRhTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKE1ldGFkYXRhTGFiZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBNZXRhZGF0YUxhYmVsKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3NlczogWydsYWJlbC1tZXRhZGF0YScsICdsYWJlbC1tZXRhZGF0YS0nICsgTWV0YWRhdGFMYWJlbENvbnRlbnRbY29uZmlnLmNvbnRlbnRdLnRvTG93ZXJDYXNlKCldXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBNZXRhZGF0YUxhYmVsLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIHZhciB1aWNvbmZpZyA9IHVpbWFuYWdlci5nZXRDb25maWcoKTtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjb25maWcuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXRhZGF0YUxhYmVsQ29udGVudC5UaXRsZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodWljb25maWcgJiYgdWljb25maWcubWV0YWRhdGEgJiYgdWljb25maWcubWV0YWRhdGEudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0VGV4dCh1aWNvbmZpZy5tZXRhZGF0YS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UgJiYgcGxheWVyLmdldENvbmZpZygpLnNvdXJjZS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRUZXh0KHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTWV0YWRhdGFMYWJlbENvbnRlbnQuRGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVpY29uZmlnICYmIHVpY29uZmlnLm1ldGFkYXRhICYmIHVpY29uZmlnLm1ldGFkYXRhLmRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFRleHQodWljb25maWcubWV0YWRhdGEuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlICYmIHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UuZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0VGV4dChwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB1bmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFRleHQobnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBJbml0IGxhYmVsXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgIC8vIFJlaW5pdCBsYWJlbCB3aGVuIGEgbmV3IHNvdXJjZSBpcyBsb2FkZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfTE9BREVELCBpbml0KTtcclxuICAgICAgICAvLyBDbGVhciBsYWJlbHMgd2hlbiBzb3VyY2UgaXMgdW5sb2FkZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfVU5MT0FERUQsIHVubG9hZCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1ldGFkYXRhTGFiZWw7XHJcbn0obGFiZWxfMS5MYWJlbCkpO1xyXG5leHBvcnRzLk1ldGFkYXRhTGFiZWwgPSBNZXRhZGF0YUxhYmVsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9tZXRhZGF0YWxhYmVsLnRzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGxhYmVsXzEgPSByZXF1aXJlKFwiLi9sYWJlbFwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbnZhciBQbGF5YmFja1RpbWVMYWJlbE1vZGU7XHJcbihmdW5jdGlvbiAoUGxheWJhY2tUaW1lTGFiZWxNb2RlKSB7XHJcbiAgICBQbGF5YmFja1RpbWVMYWJlbE1vZGVbUGxheWJhY2tUaW1lTGFiZWxNb2RlW1wiQ3VycmVudFRpbWVcIl0gPSAwXSA9IFwiQ3VycmVudFRpbWVcIjtcclxuICAgIFBsYXliYWNrVGltZUxhYmVsTW9kZVtQbGF5YmFja1RpbWVMYWJlbE1vZGVbXCJUb3RhbFRpbWVcIl0gPSAxXSA9IFwiVG90YWxUaW1lXCI7XHJcbiAgICBQbGF5YmFja1RpbWVMYWJlbE1vZGVbUGxheWJhY2tUaW1lTGFiZWxNb2RlW1wiQ3VycmVudEFuZFRvdGFsVGltZVwiXSA9IDJdID0gXCJDdXJyZW50QW5kVG90YWxUaW1lXCI7XHJcbn0pKFBsYXliYWNrVGltZUxhYmVsTW9kZSA9IGV4cG9ydHMuUGxheWJhY2tUaW1lTGFiZWxNb2RlIHx8IChleHBvcnRzLlBsYXliYWNrVGltZUxhYmVsTW9kZSA9IHt9KSk7XHJcbi8qKlxyXG4gKiBBIGxhYmVsIHRoYXQgZGlzcGxheSB0aGUgY3VycmVudCBwbGF5YmFjayB0aW1lIGFuZCB0aGUgdG90YWwgdGltZSB0aHJvdWdoIHtAbGluayBQbGF5YmFja1RpbWVMYWJlbCNzZXRUaW1lIHNldFRpbWV9XHJcbiAqIG9yIGFueSBzdHJpbmcgdGhyb3VnaCB7QGxpbmsgUGxheWJhY2tUaW1lTGFiZWwjc2V0VGV4dCBzZXRUZXh0fS5cclxuICovXHJcbnZhciBQbGF5YmFja1RpbWVMYWJlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUGxheWJhY2tUaW1lTGFiZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5YmFja1RpbWVMYWJlbChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktcGxheWJhY2t0aW1lbGFiZWwnLFxyXG4gICAgICAgICAgICB0aW1lTGFiZWxNb2RlOiBQbGF5YmFja1RpbWVMYWJlbE1vZGUuQ3VycmVudEFuZFRvdGFsVGltZSxcclxuICAgICAgICAgICAgaGlkZUluTGl2ZVBsYXliYWNrOiBmYWxzZSxcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFBsYXliYWNrVGltZUxhYmVsLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIHZhciBsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGxpdmVDc3NDbGFzcyA9IHRoaXMucHJlZml4Q3NzKCd1aS1wbGF5YmFja3RpbWVsYWJlbC1saXZlJyk7XHJcbiAgICAgICAgdmFyIGxpdmVFZGdlQ3NzQ2xhc3MgPSB0aGlzLnByZWZpeENzcygndWktcGxheWJhY2t0aW1lbGFiZWwtbGl2ZS1lZGdlJyk7XHJcbiAgICAgICAgdmFyIG1pbldpZHRoID0gMDtcclxuICAgICAgICB2YXIgbGl2ZUNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcGxheWVyLnRpbWVTaGlmdCgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB1cGRhdGVMaXZlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFBsYXllciBpcyBwbGF5aW5nIGEgbGl2ZSBzdHJlYW0gd2hlbiB0aGUgZHVyYXRpb24gaXMgaW5maW5pdGVcclxuICAgICAgICAgICAgbGl2ZSA9IHBsYXllci5pc0xpdmUoKTtcclxuICAgICAgICAgICAgLy8gQXR0YWNoL2RldGFjaCBsaXZlIG1hcmtlciBjbGFzc1xyXG4gICAgICAgICAgICBpZiAobGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLmFkZENsYXNzKGxpdmVDc3NDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRUZXh0KCdMaXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmhpZGVJbkxpdmVQbGF5YmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLm9uQ2xpY2suc3Vic2NyaWJlKGxpdmVDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlTGl2ZVRpbWVzaGlmdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXREb21FbGVtZW50KCkucmVtb3ZlQ2xhc3MobGl2ZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyhsaXZlRWRnZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uQ2xpY2sudW5zdWJzY3JpYmUobGl2ZUNsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB1cGRhdGVMaXZlVGltZXNoaWZ0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0VGltZVNoaWZ0KCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyhsaXZlRWRnZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyhsaXZlRWRnZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGxpdmVTdHJlYW1EZXRlY3RvciA9IG5ldyB1dGlsc18xLlBsYXllclV0aWxzLkxpdmVTdHJlYW1EZXRlY3RvcihwbGF5ZXIpO1xyXG4gICAgICAgIGxpdmVTdHJlYW1EZXRlY3Rvci5vbkxpdmVDaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGxpdmUgPSBhcmdzLmxpdmU7XHJcbiAgICAgICAgICAgIHVwZGF0ZUxpdmVTdGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxpdmVTdHJlYW1EZXRlY3Rvci5kZXRlY3QoKTsgLy8gSW5pdGlhbCBkZXRlY3Rpb25cclxuICAgICAgICB2YXIgcGxheWJhY2tUaW1lSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFsaXZlICYmIHBsYXllci5nZXREdXJhdGlvbigpICE9PSBJbmZpbml0eSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGltZShwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSwgcGxheWVyLmdldER1cmF0aW9uKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRvIGF2b2lkICdqdW1waW5nJyBpbiB0aGUgVUkgYnkgdmFyeWluZyBsYWJlbCBzaXplcyBkdWUgdG8gbm9uLW1vbm9zcGFjZWQgZm9udHMsXHJcbiAgICAgICAgICAgIC8vIHdlIGdyYWR1YWxseSBpbmNyZWFzZSB0aGUgbWluLXdpZHRoIHdpdGggdGhlIGNvbnRlbnQgdG8gcmVhY2ggYSBzdGFibGUgc2l6ZS5cclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gX3RoaXMuZ2V0RG9tRWxlbWVudCgpLndpZHRoKCk7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aCA+IG1pbldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ21pbi13aWR0aCc6IG1pbldpZHRoICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfQ0hBTkdFRCwgcGxheWJhY2tUaW1lSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU0VFS0VELCBwbGF5YmFja1RpbWVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1RJTUVfVVBEQVRFRCwgcGxheWJhY2tUaW1lSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVElNRV9TSElGVCwgdXBkYXRlTGl2ZVRpbWVzaGlmdFN0YXRlKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9USU1FX1NISUZURUQsIHVwZGF0ZUxpdmVUaW1lc2hpZnRTdGF0ZSk7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IG1pbi13aWR0aCB3aGVuIGEgbmV3IHNvdXJjZSBpcyByZWFkeSAoZXNwZWNpYWxseSBmb3Igc3dpdGNoaW5nIFZPRC9MaXZlIG1vZGVzIHdoZXJlIHRoZSBsYWJlbCBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGNoYW5nZXMpXHJcbiAgICAgICAgICAgIG1pbldpZHRoID0gMDtcclxuICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnbWluLXdpZHRoJzogbnVsbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gU2V0IHRpbWUgZm9ybWF0IGRlcGVuZGluZyBvbiBzb3VyY2UgZHVyYXRpb25cclxuICAgICAgICAgICAgX3RoaXMudGltZUZvcm1hdCA9IE1hdGguYWJzKHBsYXllci5pc0xpdmUoKSA/IHBsYXllci5nZXRNYXhUaW1lU2hpZnQoKSA6IHBsYXllci5nZXREdXJhdGlvbigpKSA+PSAzNjAwID9cclxuICAgICAgICAgICAgICAgIHV0aWxzXzEuU3RyaW5nVXRpbHMuRk9STUFUX0hITU1TUyA6IHV0aWxzXzEuU3RyaW5nVXRpbHMuRk9STUFUX01NU1M7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lIGFmdGVyIHRoZSBmb3JtYXQgaGFzIGJlZW4gc2V0XHJcbiAgICAgICAgICAgIHBsYXliYWNrVGltZUhhbmRsZXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBpbml0KTtcclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHBsYXliYWNrIHRpbWUgYW5kIHRvdGFsIGR1cmF0aW9uLlxyXG4gICAgICogQHBhcmFtIHBsYXliYWNrU2Vjb25kcyB0aGUgY3VycmVudCBwbGF5YmFjayB0aW1lIGluIHNlY29uZHNcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblNlY29uZHMgdGhlIHRvdGFsIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICAgICAqL1xyXG4gICAgUGxheWJhY2tUaW1lTGFiZWwucHJvdG90eXBlLnNldFRpbWUgPSBmdW5jdGlvbiAocGxheWJhY2tTZWNvbmRzLCBkdXJhdGlvblNlY29uZHMpIHtcclxuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSB1dGlsc18xLlN0cmluZ1V0aWxzLnNlY29uZHNUb1RpbWUocGxheWJhY2tTZWNvbmRzLCB0aGlzLnRpbWVGb3JtYXQpO1xyXG4gICAgICAgIHZhciB0b3RhbFRpbWUgPSB1dGlsc18xLlN0cmluZ1V0aWxzLnNlY29uZHNUb1RpbWUoZHVyYXRpb25TZWNvbmRzLCB0aGlzLnRpbWVGb3JtYXQpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jb25maWcudGltZUxhYmVsTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBsYXliYWNrVGltZUxhYmVsTW9kZS5DdXJyZW50VGltZTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGV4dChcIlwiICsgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUGxheWJhY2tUaW1lTGFiZWxNb2RlLlRvdGFsVGltZTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGV4dChcIlwiICsgdG90YWxUaW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBsYXliYWNrVGltZUxhYmVsTW9kZS5DdXJyZW50QW5kVG90YWxUaW1lOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUZXh0KGN1cnJlbnRUaW1lICsgXCIgLyBcIiArIHRvdGFsVGltZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBsYXliYWNrVGltZUxhYmVsO1xyXG59KGxhYmVsXzEuTGFiZWwpKTtcclxuZXhwb3J0cy5QbGF5YmFja1RpbWVMYWJlbCA9IFBsYXliYWNrVGltZUxhYmVsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9wbGF5YmFja3RpbWVsYWJlbC50c1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcclxudmFyIGh1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vaHVnZXBsYXliYWNrdG9nZ2xlYnV0dG9uXCIpO1xyXG4vKipcclxuICogT3ZlcmxheXMgdGhlIHBsYXllciBhbmQgZGlzcGxheXMgZXJyb3IgbWVzc2FnZXMuXHJcbiAqL1xyXG52YXIgUGxheWJhY2tUb2dnbGVPdmVybGF5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhQbGF5YmFja1RvZ2dsZU92ZXJsYXksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5YmFja1RvZ2dsZU92ZXJsYXkoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnBsYXliYWNrVG9nZ2xlQnV0dG9uID0gbmV3IGh1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xLkh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbigpO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXBsYXliYWNrdG9nZ2xlLW92ZXJsYXknLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbX3RoaXMucGxheWJhY2tUb2dnbGVCdXR0b25dXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUGxheWJhY2tUb2dnbGVPdmVybGF5O1xyXG59KGNvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xyXG5leHBvcnRzLlBsYXliYWNrVG9nZ2xlT3ZlcmxheSA9IFBsYXliYWNrVG9nZ2xlT3ZlcmxheTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvcGxheWJhY2t0b2dnbGVvdmVybGF5LnRzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xyXG52YXIgbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2xhYmVsXCIpO1xyXG52YXIgY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xyXG4vKipcclxuICogQSBsYWJlbCBmb3IgYSB7QGxpbmsgU2Vla0Jhcn0gdGhhdCBjYW4gZGlzcGxheSB0aGUgc2VlayB0YXJnZXQgdGltZSwgYSB0aHVtYm5haWwsIGFuZCB0aXRsZSAoZS5nLiBjaGFwdGVyIHRpdGxlKS5cclxuICovXHJcbnZhciBTZWVrQmFyTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNlZWtCYXJMYWJlbCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFNlZWtCYXJMYWJlbChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMudGltZUxhYmVsID0gbmV3IGxhYmVsXzEuTGFiZWwoeyBjc3NDbGFzc2VzOiBbJ3NlZWtiYXItbGFiZWwtdGltZSddIH0pO1xyXG4gICAgICAgIF90aGlzLnRpdGxlTGFiZWwgPSBuZXcgbGFiZWxfMS5MYWJlbCh7IGNzc0NsYXNzZXM6IFsnc2Vla2Jhci1sYWJlbC10aXRsZSddIH0pO1xyXG4gICAgICAgIF90aGlzLnRodW1ibmFpbCA9IG5ldyBjb21wb25lbnRfMS5Db21wb25lbnQoeyBjc3NDbGFzc2VzOiBbJ3NlZWtiYXItdGh1bWJuYWlsJ10gfSk7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktc2Vla2Jhci1sYWJlbCcsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IFtuZXcgY29udGFpbmVyXzEuQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudGh1bWJuYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgY29udGFpbmVyXzEuQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IFtfdGhpcy50aXRsZUxhYmVsLCBfdGhpcy50aW1lTGFiZWxdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICdzZWVrYmFyLWxhYmVsLW1ldGFkYXRhJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAnc2Vla2Jhci1sYWJlbC1pbm5lcicsXHJcbiAgICAgICAgICAgICAgICB9KV0sXHJcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgU2Vla0JhckxhYmVsLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHVpbWFuYWdlci5vblNlZWtQcmV2aWV3LnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNMaXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gcGxheWVyLmdldE1heFRpbWVTaGlmdCgpIC0gcGxheWVyLmdldE1heFRpbWVTaGlmdCgpICogKGFyZ3MucG9zaXRpb24gLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGltZSh0aW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50YWdlID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLm1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSBhcmdzLm1hcmtlci50aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFRpdGxlVGV4dChhcmdzLm1hcmtlci50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50YWdlID0gYXJncy5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRUaXRsZVRleHQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IHBsYXllci5nZXREdXJhdGlvbigpICogKHBlcmNlbnRhZ2UgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGltZSh0aW1lKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFRodW1ibmFpbChwbGF5ZXIuZ2V0VGh1bWIodGltZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB0aW1lIGZvcm1hdCBkZXBlbmRpbmcgb24gc291cmNlIGR1cmF0aW9uXHJcbiAgICAgICAgICAgIF90aGlzLnRpbWVGb3JtYXQgPSBNYXRoLmFicyhwbGF5ZXIuaXNMaXZlKCkgPyBwbGF5ZXIuZ2V0TWF4VGltZVNoaWZ0KCkgOiBwbGF5ZXIuZ2V0RHVyYXRpb24oKSkgPj0gMzYwMCA/XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLlN0cmluZ1V0aWxzLkZPUk1BVF9ISE1NU1MgOiB1dGlsc18xLlN0cmluZ1V0aWxzLkZPUk1BVF9NTVNTO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUkVBRFksIGluaXQpO1xyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYXJiaXRyYXJ5IHRleHQgb24gdGhlIGxhYmVsLlxyXG4gICAgICogQHBhcmFtIHRleHQgdGhlIHRleHQgdG8gc2hvdyBvbiB0aGUgbGFiZWxcclxuICAgICAqL1xyXG4gICAgU2Vla0JhckxhYmVsLnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICB0aGlzLnRpbWVMYWJlbC5zZXRUZXh0KHRleHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIHRpbWUgdG8gYmUgZGlzcGxheWVkIG9uIHRoZSBsYWJlbC5cclxuICAgICAqIEBwYXJhbSBzZWNvbmRzIHRoZSB0aW1lIGluIHNlY29uZHMgdG8gZGlzcGxheSBvbiB0aGUgbGFiZWxcclxuICAgICAqL1xyXG4gICAgU2Vla0JhckxhYmVsLnByb3RvdHlwZS5zZXRUaW1lID0gZnVuY3Rpb24gKHNlY29uZHMpIHtcclxuICAgICAgICB0aGlzLnNldFRleHQodXRpbHNfMS5TdHJpbmdVdGlscy5zZWNvbmRzVG9UaW1lKHNlY29uZHMsIHRoaXMudGltZUZvcm1hdCkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdGV4dCBvbiB0aGUgdGl0bGUgbGFiZWwuXHJcbiAgICAgKiBAcGFyYW0gdGV4dCB0aGUgdGV4dCB0byBzaG93IG9uIHRoZSBsYWJlbFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyTGFiZWwucHJvdG90eXBlLnNldFRpdGxlVGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy50aXRsZUxhYmVsLnNldFRleHQodGV4dCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIG9yIHJlbW92ZXMgYSB0aHVtYm5haWwgb24gdGhlIGxhYmVsLlxyXG4gICAgICogQHBhcmFtIHRodW1ibmFpbCB0aGUgdGh1bWJuYWlsIHRvIGRpc3BsYXkgb24gdGhlIGxhYmVsIG9yIG51bGwgdG8gcmVtb3ZlIGEgZGlzcGxheWVkIHRodW1ibmFpbFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyTGFiZWwucHJvdG90eXBlLnNldFRodW1ibmFpbCA9IGZ1bmN0aW9uICh0aHVtYm5haWwpIHtcclxuICAgICAgICBpZiAodGh1bWJuYWlsID09PSB2b2lkIDApIHsgdGh1bWJuYWlsID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciB0aHVtYm5haWxFbGVtZW50ID0gdGhpcy50aHVtYm5haWwuZ2V0RG9tRWxlbWVudCgpO1xyXG4gICAgICAgIGlmICh0aHVtYm5haWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxFbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IG51bGxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxFbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdpbmhlcml0JyxcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogXCJ1cmwoXCIgKyB0aHVtYm5haWwudXJsICsgXCIpXCIsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiB0aHVtYm5haWwudyArICdweCcsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogdGh1bWJuYWlsLmggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nOiBcIi1cIiArIHRodW1ibmFpbC54ICsgXCJweCAtXCIgKyB0aHVtYm5haWwueSArIFwicHhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNlZWtCYXJMYWJlbDtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuZXhwb3J0cy5TZWVrQmFyTGFiZWwgPSBTZWVrQmFyTGFiZWw7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3NlZWtiYXJsYWJlbC50c1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxuLyoqXHJcbiAqIEEgZHVtbXkgY29tcG9uZW50IHRoYXQganVzdCByZXNlcnZlcyBzb21lIHNwYWNlIGFuZCBkb2VzIG5vdGhpbmcgZWxzZS5cclxuICovXHJcbnZhciBTcGFjZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNwYWNlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFNwYWNlcihjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktc3BhY2VyJyxcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFNwYWNlci5wcm90b3R5cGUub25TaG93RXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gZGlzYWJsZSBldmVudCBmaXJpbmcgYnkgb3ZlcndyaXRpbmcgYW5kIG5vdCBjYWxsaW5nIHN1cGVyXHJcbiAgICB9O1xyXG4gICAgU3BhY2VyLnByb3RvdHlwZS5vbkhpZGVFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBkaXNhYmxlIGV2ZW50IGZpcmluZyBieSBvdmVyd3JpdGluZyBhbmQgbm90IGNhbGxpbmcgc3VwZXJcclxuICAgIH07XHJcbiAgICBTcGFjZXIucHJvdG90eXBlLm9uSG92ZXJDaGFuZ2VkRXZlbnQgPSBmdW5jdGlvbiAoaG92ZXJlZCkge1xyXG4gICAgICAgIC8vIGRpc2FibGUgZXZlbnQgZmlyaW5nIGJ5IG92ZXJ3cml0aW5nIGFuZCBub3QgY2FsbGluZyBzdXBlclxyXG4gICAgfTtcclxuICAgIHJldHVybiBTcGFjZXI7XHJcbn0oY29tcG9uZW50XzEuQ29tcG9uZW50KSk7XHJcbmV4cG9ydHMuU3BhY2VyID0gU3BhY2VyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9zcGFjZXIudHNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4vbGFiZWxcIik7XHJcbnZhciBjb250cm9sYmFyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sYmFyXCIpO1xyXG4vKipcclxuICogT3ZlcmxheXMgdGhlIHBsYXllciB0byBkaXNwbGF5IHN1YnRpdGxlcy5cclxuICovXHJcbnZhciBTdWJ0aXRsZU92ZXJsYXkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFN1YnRpdGxlT3ZlcmxheSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFN1YnRpdGxlT3ZlcmxheShjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktc3VidGl0bGUtb3ZlcmxheScsXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTdWJ0aXRsZU92ZXJsYXkucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIHN1YnRpdGxlTWFuYWdlciA9IG5ldyBBY3RpdmVTdWJ0aXRsZU1hbmFnZXIoKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DVUVfRU5URVIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgbGFiZWxUb0FkZCA9IHN1YnRpdGxlTWFuYWdlci5jdWVFbnRlcihldmVudCk7XHJcbiAgICAgICAgICAgIF90aGlzLmFkZENvbXBvbmVudChsYWJlbFRvQWRkKTtcclxuICAgICAgICAgICAgX3RoaXMudXBkYXRlQ29tcG9uZW50cygpO1xyXG4gICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ1VFX0VYSVQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgbGFiZWxUb1JlbW92ZSA9IHN1YnRpdGxlTWFuYWdlci5jdWVFeGl0KGV2ZW50KTtcclxuICAgICAgICAgICAgaWYgKGxhYmVsVG9SZW1vdmUpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZUNvbXBvbmVudChsYWJlbFRvUmVtb3ZlKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZUNvbXBvbmVudHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN1YnRpdGxlTWFuYWdlci5oYXNDdWVzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgc3VidGl0bGVDbGVhckhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgc3VidGl0bGVNYW5hZ2VyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNvbXBvbmVudHMoKTtcclxuICAgICAgICAgICAgX3RoaXMudXBkYXRlQ29tcG9uZW50cygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQVVESU9fQ0hBTkdFRCwgc3VidGl0bGVDbGVhckhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NVQlRJVExFX0NIQU5HRUQsIHN1YnRpdGxlQ2xlYXJIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TRUVLLCBzdWJ0aXRsZUNsZWFySGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVElNRV9TSElGVCwgc3VidGl0bGVDbGVhckhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVlCQUNLX0ZJTklTSEVELCBzdWJ0aXRsZUNsZWFySGFuZGxlcik7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29tcG9uZW50U2hvdy5zdWJzY3JpYmUoZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgY29udHJvbGJhcl8xLkNvbnRyb2xCYXIpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoU3VidGl0bGVPdmVybGF5LkNMQVNTX0NPTlRST0xCQVJfVklTSUJMRSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29tcG9uZW50SGlkZS5zdWJzY3JpYmUoZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgY29udHJvbGJhcl8xLkNvbnRyb2xCYXIpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoU3VidGl0bGVPdmVybGF5LkNMQVNTX0NPTlRST0xCQVJfVklTSUJMRSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSW5pdFxyXG4gICAgICAgIHN1YnRpdGxlQ2xlYXJIYW5kbGVyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN1YnRpdGxlT3ZlcmxheTtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuU3VidGl0bGVPdmVybGF5LkNMQVNTX0NPTlRST0xCQVJfVklTSUJMRSA9ICdjb250cm9sYmFyLXZpc2libGUnO1xyXG5leHBvcnRzLlN1YnRpdGxlT3ZlcmxheSA9IFN1YnRpdGxlT3ZlcmxheTtcclxudmFyIFN1YnRpdGxlTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFN1YnRpdGxlTGFiZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTdWJ0aXRsZUxhYmVsKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1zdWJ0aXRsZS1sYWJlbCdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBTdWJ0aXRsZUxhYmVsO1xyXG59KGxhYmVsXzEuTGFiZWwpKTtcclxudmFyIEFjdGl2ZVN1YnRpdGxlTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBY3RpdmVTdWJ0aXRsZU1hbmFnZXIoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdWJ0aXRsZUN1ZU1hcCA9IHt9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIGEgdW5pcXVlIElEIGZvciBhIHN1YnRpdGxlIGN1ZSwgd2hpY2ggaXMgbmVlZGVkIHRvIGFzc29jaWF0ZSBhbiBPTl9DVUVfRU5URVIgd2l0aCBpdHMgT05fQ1VFX0VYSVRcclxuICAgICAqIGV2ZW50IHNvIHdlIGNhbiByZW1vdmUgdGhlIGNvcnJlY3Qgc3VidGl0bGUgaW4gT05fQ1VFX0VYSVQgd2hlbiBtdWx0aXBsZSBzdWJ0aXRsZXMgYXJlIGFjdGl2ZSBhdCB0aGUgc2FtZSB0aW1lLlxyXG4gICAgICogVGhlIHN0YXJ0IHRpbWUgcGx1cyB0aGUgdGV4dCBzaG91bGQgbWFrZSBhIHVuaXF1ZSBpZGVudGlmaWVyLCBhbmQgaW4gdGhlIG9ubHkgY2FzZSB3aGVyZSBhIGNvbGxpc2lvblxyXG4gICAgICogY2FuIGhhcHBlbiwgdHdvIHNpbWlsYXIgdGV4dHMgd2lsbCBkaXNwbGF5ZWQgYXQgYSBzaW1pbGFyIHRpbWUgc28gaXQgZG9lcyBub3QgbWF0dGVyIHdoaWNoIG9uZSB3ZSBkZWxldGUuXHJcbiAgICAgKiBUaGUgc3RhcnQgdGltZSBzaG91bGQgYWx3YXlzIGJlIGtub3duLCBiZWNhdXNlIGl0IGlzIHJlcXVpcmVkIHRvIHNjaGVkdWxlIHRoZSBPTl9DVUVfRU5URVIgZXZlbnQuIFRoZSBlbmQgdGltZVxyXG4gICAgICogbXVzdCBub3QgbmVjZXNzYXJpbHkgYmUga25vd24gYW5kIHRoZXJlZm9yZSBjYW5ub3QgYmUgdXNlZCBmb3IgdGhlIElELlxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEFjdGl2ZVN1YnRpdGxlTWFuYWdlci5jYWxjdWxhdGVJZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudC5zdGFydCArIGV2ZW50LnRleHQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgc3VidGl0bGUgY3VlIHRvIHRoZSBtYW5hZ2VyIGFuZCByZXR1cm5zIHRoZSBsYWJlbCB0aGF0IHNob3VsZCBiZSBhZGRlZCB0byB0aGUgc3VidGl0bGUgb3ZlcmxheS5cclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHJldHVybiB7U3VidGl0bGVMYWJlbH1cclxuICAgICAqL1xyXG4gICAgQWN0aXZlU3VidGl0bGVNYW5hZ2VyLnByb3RvdHlwZS5jdWVFbnRlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciBpZCA9IEFjdGl2ZVN1YnRpdGxlTWFuYWdlci5jYWxjdWxhdGVJZChldmVudCk7XHJcbiAgICAgICAgdmFyIGxhYmVsID0gbmV3IFN1YnRpdGxlTGFiZWwoe1xyXG4gICAgICAgICAgICAvLyBQcmVmZXIgdGhlIEhUTUwgc3VidGl0bGUgdGV4dCBpZiBzZXQsIGVsc2UgdXNlIHRoZSBwbGFpbiB0ZXh0XHJcbiAgICAgICAgICAgIHRleHQ6IGV2ZW50Lmh0bWwgfHwgZXZlbnQudGV4dFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3VidGl0bGVDdWVNYXBbaWRdID0geyBldmVudDogZXZlbnQsIGxhYmVsOiBsYWJlbCB9O1xyXG4gICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHN1YnRpdGxlIGN1ZSBmcm9tIHRoZSBtYW5hZ2VyIGFuZCByZXR1cm5zIHRoZSBsYWJlbCB0aGF0IHNob3VsZCBiZSByZW1vdmVkIGZyb20gdGhlIHN1YnRpdGxlIG92ZXJsYXksXHJcbiAgICAgKiBvciBudWxsIGlmIHRoZXJlIGlzIG5vIGFzc29jaWF0ZWQgbGFiZWwgZXhpc3RpbmcgKGUuZy4gYmVjYXVzZSBhbGwgbGFiZWxzIGhhdmUgYmVlbiB7QGxpbmsgI2NsZWFyIGNsZWFyZWR9LlxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKiBAcmV0dXJuIHtTdWJ0aXRsZUxhYmVsfG51bGx9XHJcbiAgICAgKi9cclxuICAgIEFjdGl2ZVN1YnRpdGxlTWFuYWdlci5wcm90b3R5cGUuY3VlRXhpdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciBpZCA9IEFjdGl2ZVN1YnRpdGxlTWFuYWdlci5jYWxjdWxhdGVJZChldmVudCk7XHJcbiAgICAgICAgdmFyIGFjdGl2ZVN1YnRpdGxlQ3VlID0gdGhpcy5hY3RpdmVTdWJ0aXRsZUN1ZU1hcFtpZF07XHJcbiAgICAgICAgaWYgKGFjdGl2ZVN1YnRpdGxlQ3VlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFjdGl2ZVN1YnRpdGxlQ3VlTWFwW2lkXTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZVN1YnRpdGxlQ3VlLmxhYmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBY3RpdmVTdWJ0aXRsZU1hbmFnZXIucHJvdG90eXBlLCBcImN1ZUNvdW50XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYWN0aXZlIHN1YnRpdGxlIGN1ZXMuXHJcbiAgICAgICAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5hY3RpdmVTdWJ0aXRsZUN1ZU1hcCkubGVuZ3RoO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFjdGl2ZVN1YnRpdGxlTWFuYWdlci5wcm90b3R5cGUsIFwiaGFzQ3Vlc1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBhY3RpdmUgc3VidGl0bGUgY3VlcywgZWxzZSBmYWxzZS5cclxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdWVDb3VudCA+IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIHN1YnRpdGxlIGN1ZXMgZnJvbSB0aGUgbWFuYWdlci5cclxuICAgICAqL1xyXG4gICAgQWN0aXZlU3VidGl0bGVNYW5hZ2VyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZVN1YnRpdGxlQ3VlTWFwID0ge307XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFjdGl2ZVN1YnRpdGxlTWFuYWdlcjtcclxufSgpKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvc3VidGl0bGVvdmVybGF5LnRzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHNlbGVjdGJveF8xID0gcmVxdWlyZShcIi4vc2VsZWN0Ym94XCIpO1xyXG4vKipcclxuICogQSBzZWxlY3QgYm94IHByb3ZpZGluZyBhIHNlbGVjdGlvbiBiZXR3ZWVuICdhdXRvJyBhbmQgdGhlIGF2YWlsYWJsZSB2aWRlbyBxdWFsaXRpZXMuXHJcbiAqL1xyXG52YXIgVmlkZW9RdWFsaXR5U2VsZWN0Qm94ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWaWRlb1F1YWxpdHlTZWxlY3RCb3gsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWaWRlb1F1YWxpdHlTZWxlY3RCb3goY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFZpZGVvUXVhbGl0eVNlbGVjdEJveC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgdXBkYXRlVmlkZW9RdWFsaXRpZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1F1YWxpdGllcyA9IHBsYXllci5nZXRBdmFpbGFibGVWaWRlb1F1YWxpdGllcygpO1xyXG4gICAgICAgICAgICBfdGhpcy5jbGVhckl0ZW1zKCk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBlbnRyeSBmb3IgYXV0b21hdGljIHF1YWxpdHkgc3dpdGNoaW5nIChkZWZhdWx0IHNldHRpbmcpXHJcbiAgICAgICAgICAgIF90aGlzLmFkZEl0ZW0oJ2F1dG8nLCAnYXV0bycpO1xyXG4gICAgICAgICAgICAvLyBBZGQgdmlkZW8gcXVhbGl0aWVzXHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgdmlkZW9RdWFsaXRpZXNfMSA9IHZpZGVvUXVhbGl0aWVzOyBfaSA8IHZpZGVvUXVhbGl0aWVzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9RdWFsaXR5ID0gdmlkZW9RdWFsaXRpZXNfMVtfaV07XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRJdGVtKHZpZGVvUXVhbGl0eS5pZCwgdmlkZW9RdWFsaXR5LmxhYmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlciwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcGxheWVyLnNldFZpZGVvUXVhbGl0eSh2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHF1YWxpdGllcyB3aGVuIHNvdXJjZSBnb2VzIGF3YXlcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfVU5MT0FERUQsIHVwZGF0ZVZpZGVvUXVhbGl0aWVzKTtcclxuICAgICAgICAvLyBVcGRhdGUgcXVhbGl0aWVzIHdoZW4gYSBuZXcgc291cmNlIGlzIGxvYWRlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCB1cGRhdGVWaWRlb1F1YWxpdGllcyk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHF1YWxpdHkgc2VsZWN0aW9uIHdoZW4gcXVhbGl0eSBpcyBjaGFuZ2VkIChmcm9tIG91dHNpZGUpXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVklERU9fRE9XTkxPQURfUVVBTElUWV9DSEFOR0UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBwbGF5ZXIuZ2V0RG93bmxvYWRlZFZpZGVvRGF0YSgpO1xyXG4gICAgICAgICAgICBfdGhpcy5zZWxlY3RJdGVtKGRhdGEuaXNBdXRvID8gJ2F1dG8nIDogZGF0YS5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gUG9wdWxhdGUgcXVhbGl0aWVzIGF0IHN0YXJ0dXBcclxuICAgICAgICB1cGRhdGVWaWRlb1F1YWxpdGllcygpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWaWRlb1F1YWxpdHlTZWxlY3RCb3g7XHJcbn0oc2VsZWN0Ym94XzEuU2VsZWN0Qm94KSk7XHJcbmV4cG9ydHMuVmlkZW9RdWFsaXR5U2VsZWN0Qm94ID0gVmlkZW9RdWFsaXR5U2VsZWN0Qm94O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy92aWRlb3F1YWxpdHlzZWxlY3Rib3gudHNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciB2b2x1bWVzbGlkZXJfMSA9IHJlcXVpcmUoXCIuL3ZvbHVtZXNsaWRlclwiKTtcclxudmFyIHZvbHVtZXRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vdm9sdW1ldG9nZ2xlYnV0dG9uXCIpO1xyXG52YXIgdGltZW91dF8xID0gcmVxdWlyZShcIi4uL3RpbWVvdXRcIik7XHJcbi8qKlxyXG4gKiBBIGNvbXBvc2l0ZSB2b2x1bWUgY29udHJvbCB0aGF0IGNvbnNpc3RzIG9mIGFuZCBpbnRlcm5hbGx5IG1hbmFnZXMgYSB2b2x1bWUgY29udHJvbCBidXR0b24gdGhhdCBjYW4gYmUgdXNlZFxyXG4gKiBmb3IgbXV0aW5nLCBhbmQgYSAoZGVwZW5kaW5nIG9uIHRoZSBDU1Mgc3R5bGUsIGUuZy4gc2xpZGUtb3V0KSB2b2x1bWUgY29udHJvbCBiYXIuXHJcbiAqL1xyXG52YXIgVm9sdW1lQ29udHJvbEJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVm9sdW1lQ29udHJvbEJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZvbHVtZUNvbnRyb2xCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnZvbHVtZVRvZ2dsZUJ1dHRvbiA9IG5ldyB2b2x1bWV0b2dnbGVidXR0b25fMS5Wb2x1bWVUb2dnbGVCdXR0b24oKTtcclxuICAgICAgICBfdGhpcy52b2x1bWVTbGlkZXIgPSBuZXcgdm9sdW1lc2xpZGVyXzEuVm9sdW1lU2xpZGVyKHtcclxuICAgICAgICAgICAgdmVydGljYWw6IGNvbmZpZy52ZXJ0aWNhbCAhPSBudWxsID8gY29uZmlnLnZlcnRpY2FsIDogdHJ1ZSxcclxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktdm9sdW1lY29udHJvbGJ1dHRvbicsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IFtfdGhpcy52b2x1bWVUb2dnbGVCdXR0b24sIF90aGlzLnZvbHVtZVNsaWRlcl0sXHJcbiAgICAgICAgICAgIGhpZGVEZWxheTogNTAwXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBWb2x1bWVDb250cm9sQnV0dG9uLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciB2b2x1bWVUb2dnbGVCdXR0b24gPSB0aGlzLmdldFZvbHVtZVRvZ2dsZUJ1dHRvbigpO1xyXG4gICAgICAgIHZhciB2b2x1bWVTbGlkZXIgPSB0aGlzLmdldFZvbHVtZVNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lU2xpZGVySGlkZVRpbWVvdXQgPSBuZXcgdGltZW91dF8xLlRpbWVvdXQodGhpcy5nZXRDb25maWcoKS5oaWRlRGVsYXksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdm9sdW1lU2xpZGVyLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIFZvbHVtZSBTbGlkZXIgdmlzaWJpbGl0eSBoYW5kbGluZ1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogVGhlIHZvbHVtZSBzbGlkZXIgc2hhbGwgYmUgdmlzaWJsZSB3aGlsZSB0aGUgdXNlciBob3ZlcnMgdGhlIG11dGUgdG9nZ2xlIGJ1dHRvbiwgd2hpbGUgdGhlIHVzZXIgaG92ZXJzIHRoZVxyXG4gICAgICAgICAqIHZvbHVtZSBzbGlkZXIsIGFuZCB3aGlsZSB0aGUgdXNlciBzbGlkZXMgdGhlIHZvbHVtZSBzbGlkZXIuIElmIG5vbmUgb2YgdGhlc2Ugc2l0dWF0aW9ucyBhcmUgdHJ1ZSwgdGhlIHNsaWRlclxyXG4gICAgICAgICAqIHNoYWxsIGRpc2FwcGVhci5cclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgdm9sdW1lU2xpZGVySG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZvbHVtZVRvZ2dsZUJ1dHRvbi5nZXREb21FbGVtZW50KCkub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFNob3cgdm9sdW1lIHNsaWRlciB3aGVuIG1vdXNlIGVudGVycyB0aGUgYnV0dG9uIGFyZWFcclxuICAgICAgICAgICAgaWYgKHZvbHVtZVNsaWRlci5pc0hpZGRlbigpKSB7XHJcbiAgICAgICAgICAgICAgICB2b2x1bWVTbGlkZXIuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEF2b2lkIGhpZGluZyBvZiB0aGUgc2xpZGVyIHdoZW4gYnV0dG9uIGlzIGhvdmVyZWRcclxuICAgICAgICAgICAgX3RoaXMudm9sdW1lU2xpZGVySGlkZVRpbWVvdXQuY2xlYXIoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2b2x1bWVUb2dnbGVCdXR0b24uZ2V0RG9tRWxlbWVudCgpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBIaWRlIHNsaWRlciBkZWxheWVkIHdoZW4gYnV0dG9uIGlzIGxlZnRcclxuICAgICAgICAgICAgX3RoaXMudm9sdW1lU2xpZGVySGlkZVRpbWVvdXQucmVzZXQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2b2x1bWVTbGlkZXIuZ2V0RG9tRWxlbWVudCgpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHRoZSBzbGlkZXIgaXMgZW50ZXJlZCwgY2FuY2VsIHRoZSBoaWRlIHRpbWVvdXQgYWN0aXZhdGVkIGJ5IGxlYXZpbmcgdGhlIGJ1dHRvblxyXG4gICAgICAgICAgICBfdGhpcy52b2x1bWVTbGlkZXJIaWRlVGltZW91dC5jbGVhcigpO1xyXG4gICAgICAgICAgICB2b2x1bWVTbGlkZXJIb3ZlcmVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2b2x1bWVTbGlkZXIuZ2V0RG9tRWxlbWVudCgpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIG1vdXNlIGxlYXZlcyB0aGUgc2xpZGVyLCBvbmx5IGhpZGUgaXQgaWYgdGhlcmUgaXMgbm8gc2xpZGUgb3BlcmF0aW9uIGluIHByb2dyZXNzXHJcbiAgICAgICAgICAgIGlmICh2b2x1bWVTbGlkZXIuaXNTZWVraW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnZvbHVtZVNsaWRlckhpZGVUaW1lb3V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy52b2x1bWVTbGlkZXJIaWRlVGltZW91dC5yZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZvbHVtZVNsaWRlckhvdmVyZWQgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2b2x1bWVTbGlkZXIub25TZWVrZWQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gV2hlbiBhIHNsaWRlIG9wZXJhdGlvbiBpcyBkb25lIGFuZCB0aGUgc2xpZGVyIG5vdCBob3ZlcmVkIChtb3VzZSBvdXRzaWRlIHNsaWRlciksIGhpZGUgc2xpZGVyIGRlbGF5ZWRcclxuICAgICAgICAgICAgaWYgKCF2b2x1bWVTbGlkZXJIb3ZlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy52b2x1bWVTbGlkZXJIaWRlVGltZW91dC5yZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVm9sdW1lQ29udHJvbEJ1dHRvbi5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJlbGVhc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLnZvbHVtZVNsaWRlckhpZGVUaW1lb3V0LmNsZWFyKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGludGVybmFsbHkgbWFuYWdlZCB2b2x1bWUgdG9nZ2xlIGJ1dHRvbi5cclxuICAgICAqIEByZXR1cm5zIHtWb2x1bWVUb2dnbGVCdXR0b259XHJcbiAgICAgKi9cclxuICAgIFZvbHVtZUNvbnRyb2xCdXR0b24ucHJvdG90eXBlLmdldFZvbHVtZVRvZ2dsZUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52b2x1bWVUb2dnbGVCdXR0b247XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGludGVybmFsbHkgbWFuYWdlZCB2b2x1bWUgc2lsZGVyLlxyXG4gICAgICogQHJldHVybnMge1ZvbHVtZVNsaWRlcn1cclxuICAgICAqL1xyXG4gICAgVm9sdW1lQ29udHJvbEJ1dHRvbi5wcm90b3R5cGUuZ2V0Vm9sdW1lU2xpZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZvbHVtZVNsaWRlcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVm9sdW1lQ29udHJvbEJ1dHRvbjtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuZXhwb3J0cy5Wb2x1bWVDb250cm9sQnV0dG9uID0gVm9sdW1lQ29udHJvbEJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvdm9sdW1lY29udHJvbGJ1dHRvbi50c1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBzZWVrYmFyXzEgPSByZXF1aXJlKFwiLi9zZWVrYmFyXCIpO1xyXG4vKipcclxuICogQSBzaW1wbGUgdm9sdW1lIHNsaWRlciBjb21wb25lbnQgdG8gYWRqdXN0IHRoZSBwbGF5ZXIncyB2b2x1bWUgc2V0dGluZy5cclxuICovXHJcbnZhciBWb2x1bWVTbGlkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFZvbHVtZVNsaWRlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZvbHVtZVNsaWRlcihjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktdm9sdW1lc2xpZGVyJyxcclxuICAgICAgICAgICAgaGlkZUlmVm9sdW1lQ29udHJvbFByb2hpYml0ZWQ6IHRydWUsXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBWb2x1bWVTbGlkZXIucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlciwgZmFsc2UpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIGlmIChjb25maWcuaGlkZUlmVm9sdW1lQ29udHJvbFByb2hpYml0ZWQgJiYgIXRoaXMuZGV0ZWN0Vm9sdW1lQ29udHJvbEF2YWlsYWJpbGl0eShwbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAvLyBXZSBjYW4ganVzdCByZXR1cm4gZnJvbSBoZXJlLCBiZWNhdXNlIHRoZSB1c2VyIHdpbGwgbmV2ZXIgaW50ZXJhY3Qgd2l0aCB0aGUgY29udHJvbCBhbmQgYW55IGNvbmZpZ3VyZWRcclxuICAgICAgICAgICAgLy8gZnVuY3Rpb25hbGl0eSB3b3VsZCBvbmx5IGVhdCByZXNvdXJjZXMgZm9yIG5vIHJlYXNvbi5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdm9sdW1lQ2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5pc011dGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFBsYXliYWNrUG9zaXRpb24oMCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRCdWZmZXJQb3NpdGlvbigwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFBsYXliYWNrUG9zaXRpb24ocGxheWVyLmdldFZvbHVtZSgpKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEJ1ZmZlclBvc2l0aW9uKHBsYXllci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCB2b2x1bWVDaGFuZ2VIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9WT0xVTUVfQ0hBTkdFRCwgdm9sdW1lQ2hhbmdlSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fTVVURUQsIHZvbHVtZUNoYW5nZUhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1VOTVVURUQsIHZvbHVtZUNoYW5nZUhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMub25TZWVrUHJldmlldy5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5zY3J1YmJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5zZXRWb2x1bWUoYXJncy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9uU2Vla2VkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBwZXJjZW50YWdlKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5zZXRWb2x1bWUocGVyY2VudGFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2b2x1bWUgc2xpZGVyIG1hcmtlciB3aGVuIHRoZSBwbGF5ZXIgcmVzaXplZCwgYSBzb3VyY2UgaXMgbG9hZGVkIGFuZCBwbGF5ZXIgaXMgcmVhZHksXHJcbiAgICAgICAgLy8gb3IgdGhlIFVJIGlzIGNvbmZpZ3VyZWQuIENoZWNrIHRoZSBzZWVrYmFyIGZvciBhIGRldGFpbGVkIGRlc2NyaXB0aW9uLlxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVlFUl9SRVNJWkUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMucmVmcmVzaFBsYXliYWNrUG9zaXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9SRUFEWSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVpbWFuYWdlci5vbkNvbmZpZ3VyZWQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMucmVmcmVzaFBsYXliYWNrUG9zaXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0IHZvbHVtZSBiYXJcclxuICAgICAgICB2b2x1bWVDaGFuZ2VIYW5kbGVyKCk7XHJcbiAgICB9O1xyXG4gICAgVm9sdW1lU2xpZGVyLnByb3RvdHlwZS5kZXRlY3RWb2x1bWVDb250cm9sQXZhaWxhYmlsaXR5ID0gZnVuY3Rpb24gKHBsYXllcikge1xyXG4gICAgICAgIC8vIFN0b3JlIGN1cnJlbnQgcGxheWVyIHN0YXRlIHNvIHdlIGNhbiByZXN0b3JlIGl0IGxhdGVyXHJcbiAgICAgICAgdmFyIHZvbHVtZSA9IHBsYXllci5nZXRWb2x1bWUoKTtcclxuICAgICAgICB2YXIgbXV0ZWQgPSBwbGF5ZXIuaXNNdXRlZCgpO1xyXG4gICAgICAgIHZhciBwbGF5aW5nID0gcGxheWVyLmlzUGxheWluZygpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogXCJPbiBpT1MgZGV2aWNlcywgdGhlIGF1ZGlvIGxldmVsIGlzIGFsd2F5cyB1bmRlciB0aGUgdXNlcuKAmXMgcGh5c2ljYWwgY29udHJvbC4gVGhlIHZvbHVtZSBwcm9wZXJ0eSBpcyBub3RcclxuICAgICAgICAgKiBzZXR0YWJsZSBpbiBKYXZhU2NyaXB0LiBSZWFkaW5nIHRoZSB2b2x1bWUgcHJvcGVydHkgYWx3YXlzIHJldHVybnMgMS5cIlxyXG4gICAgICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9saWJyYXJ5L2NvbnRlbnQvZG9jdW1lbnRhdGlvbi9BdWRpb1ZpZGVvL0NvbmNlcHR1YWwvVXNpbmdfSFRNTDVfQXVkaW9fVmlkZW8vRGV2aWNlLVNwZWNpZmljQ29uc2lkZXJhdGlvbnMvRGV2aWNlLVNwZWNpZmljQ29uc2lkZXJhdGlvbnMuaHRtbFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogT3VyIHBsYXllciBBUEkgcmV0dXJucyBhIHZvbHVtZSByYW5nZSBvZiBbMCwgMTAwXSBzbyB3ZSBuZWVkIHRvIGNoZWNrIGZvciAxMDAgaW5zdGVhZCBvZiAxLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8vIE9ubHkgaWYgdGhlIHZvbHVtZSBpcyAxMDAsIHRoZXJlJ3MgdGhlIHBvc3NpYmlsaXR5IHdlIGFyZSBvbiBhIHZvbHVtZS1jb250cm9sLXJlc3RyaWN0ZWQgaU9TIGRldmljZVxyXG4gICAgICAgIGlmICh2b2x1bWUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAvLyBXZSBzZXQgdGhlIHZvbHVtZSB0byB6ZXJvICh0aGF0J3MgdGhlIG9ubHkgdmFsdWUgdGhhdCBkb2VzIG5vdCB1bm11dGUgYSBtdXRlZCBwbGF5ZXIhKVxyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0Vm9sdW1lKDApO1xyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBzdGlsbCAxMDBcclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRWb2x1bWUoKSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdm9sdW1lIHN0YXllZCBhdCAxMDAsIHdlJ3JlIG9uIGEgdm9sdW1lLWNvbnRyb2wtcmVzdHJpY3RlZCBkZXZpY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBjb250cm9sIHZvbHVtZSwgc28gd2UgbXVzdCByZXN0b3JlIHRoZSBwcmV2aW91cyBwbGF5ZXIgc3RhdGVcclxuICAgICAgICAgICAgICAgIHBsYXllci5zZXRWb2x1bWUodm9sdW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChtdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5tdXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSB2b2x1bWUgcmVzdG9yZSBhYm92ZSBwYXVzZXMgYXV0b3BsYXkgb24gbW9iaWxlIGRldmljZXMgKGUuZy4gQW5kcm9pZCkgc28gd2UgbmVlZCB0byByZXN1bWUgcGxheWJhY2tcclxuICAgICAgICAgICAgICAgICAgICAvLyAoV2UgY2Fubm90IGNoZWNrIGlzUGF1c2VkKCkgaGVyZSBiZWNhdXNlIGl0IGlzIG5vdCBzZXQgd2hlbiBwbGF5YmFjayBpcyBwcm9oaWJpdGVkIGJ5IHRoZSBtb2JpbGUgcGxhdGZvcm0pXHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBWb2x1bWUgaXMgbm90IDEwMCwgc28gd2UncmUgZGVmaW5pdGVseSBub3Qgb24gYSB2b2x1bWUtY29udHJvbC1yZXN0cmljdGVkIGlPUyBkZXZpY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBWb2x1bWVTbGlkZXI7XHJcbn0oc2Vla2Jhcl8xLlNlZWtCYXIpKTtcclxuZXhwb3J0cy5Wb2x1bWVTbGlkZXIgPSBWb2x1bWVTbGlkZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3ZvbHVtZXNsaWRlci50c1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL3RvZ2dsZWJ1dHRvblwiKTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIHRoYXQgdG9nZ2xlcyBhdWRpbyBtdXRpbmcuXHJcbiAqL1xyXG52YXIgVm9sdW1lVG9nZ2xlQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWb2x1bWVUb2dnbGVCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWb2x1bWVUb2dnbGVCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXZvbHVtZXRvZ2dsZWJ1dHRvbicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdWb2x1bWUvTXV0ZSdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFZvbHVtZVRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgbXV0ZVN0YXRlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5pc011dGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHZvbHVtZUxldmVsSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gVG9nZ2xlIGxvdyBjbGFzcyB0byBkaXNwbGF5IGxvdyB2b2x1bWUgaWNvbiBiZWxvdyA1MCUgdm9sdW1lXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0Vm9sdW1lKCkgPCA1MCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLmFkZENsYXNzKF90aGlzLnByZWZpeENzcygnbG93JykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcygnbG93JykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9NVVRFRCwgbXV0ZVN0YXRlSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVU5NVVRFRCwgbXV0ZVN0YXRlSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVk9MVU1FX0NIQU5HRUQsIHZvbHVtZUxldmVsSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNNdXRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIudW5tdXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIubXV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gU3RhcnR1cCBpbml0XHJcbiAgICAgICAgbXV0ZVN0YXRlSGFuZGxlcigpO1xyXG4gICAgICAgIHZvbHVtZUxldmVsSGFuZGxlcigpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWb2x1bWVUb2dnbGVCdXR0b247XHJcbn0odG9nZ2xlYnV0dG9uXzEuVG9nZ2xlQnV0dG9uKSk7XHJcbmV4cG9ydHMuVm9sdW1lVG9nZ2xlQnV0dG9uID0gVm9sdW1lVG9nZ2xlQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy92b2x1bWV0b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J3BsYXllci5kLnRzJyAvPlxyXG52YXIgdWltYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi91aW1hbmFnZXJcIik7XHJcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYnV0dG9uXCIpO1xyXG52YXIgY29udHJvbGJhcl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jb250cm9sYmFyXCIpO1xyXG52YXIgZnVsbHNjcmVlbnRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9mdWxsc2NyZWVudG9nZ2xlYnV0dG9uXCIpO1xyXG52YXIgaHVnZXBsYXliYWNrdG9nZ2xlYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2h1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvblwiKTtcclxudmFyIHBsYXliYWNrdGltZWxhYmVsXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3BsYXliYWNrdGltZWxhYmVsXCIpO1xyXG52YXIgcGxheWJhY2t0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvcGxheWJhY2t0b2dnbGVidXR0b25cIik7XHJcbnZhciBzZWVrYmFyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlZWtiYXJcIik7XHJcbnZhciBzZWxlY3Rib3hfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2VsZWN0Ym94XCIpO1xyXG52YXIgc2V0dGluZ3NwYW5lbF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zZXR0aW5nc3BhbmVsXCIpO1xyXG52YXIgc2V0dGluZ3N0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2V0dGluZ3N0b2dnbGVidXR0b25cIik7XHJcbnZhciB0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdG9nZ2xlYnV0dG9uXCIpO1xyXG52YXIgdmlkZW9xdWFsaXR5c2VsZWN0Ym94XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3ZpZGVvcXVhbGl0eXNlbGVjdGJveFwiKTtcclxudmFyIHZvbHVtZXRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92b2x1bWV0b2dnbGVidXR0b25cIik7XHJcbnZhciB2cnRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92cnRvZ2dsZWJ1dHRvblwiKTtcclxudmFyIHdhdGVybWFya18xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy93YXRlcm1hcmtcIik7XHJcbnZhciB1aWNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91aWNvbnRhaW5lclwiKTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jb250YWluZXJcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9sYWJlbFwiKTtcclxudmFyIGF1ZGlvcXVhbGl0eXNlbGVjdGJveF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hdWRpb3F1YWxpdHlzZWxlY3Rib3hcIik7XHJcbnZhciBhdWRpb3RyYWNrc2VsZWN0Ym94XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2F1ZGlvdHJhY2tzZWxlY3Rib3hcIik7XHJcbnZhciBjYXN0c3RhdHVzb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jYXN0c3RhdHVzb3ZlcmxheVwiKTtcclxudmFyIGNhc3R0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY2FzdHRvZ2dsZWJ1dHRvblwiKTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jb21wb25lbnRcIik7XHJcbnZhciBlcnJvcm1lc3NhZ2VvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Vycm9ybWVzc2FnZW92ZXJsYXlcIik7XHJcbnZhciByZWNvbW1lbmRhdGlvbm92ZXJsYXlfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvcmVjb21tZW5kYXRpb25vdmVybGF5XCIpO1xyXG52YXIgc2Vla2JhcmxhYmVsXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlZWtiYXJsYWJlbFwiKTtcclxudmFyIHN1YnRpdGxlb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdWJ0aXRsZW92ZXJsYXlcIik7XHJcbnZhciBzdWJ0aXRsZXNlbGVjdGJveF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdWJ0aXRsZXNlbGVjdGJveFwiKTtcclxudmFyIHRpdGxlYmFyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RpdGxlYmFyXCIpO1xyXG52YXIgdm9sdW1lY29udHJvbGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92b2x1bWVjb250cm9sYnV0dG9uXCIpO1xyXG52YXIgY2xpY2tvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2NsaWNrb3ZlcmxheVwiKTtcclxudmFyIGFkc2tpcGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hZHNraXBidXR0b25cIik7XHJcbnZhciBhZG1lc3NhZ2VsYWJlbF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hZG1lc3NhZ2VsYWJlbFwiKTtcclxudmFyIGFkY2xpY2tvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FkY2xpY2tvdmVybGF5XCIpO1xyXG52YXIgcGxheWJhY2tzcGVlZHNlbGVjdGJveF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9wbGF5YmFja3NwZWVkc2VsZWN0Ym94XCIpO1xyXG52YXIgaHVnZXJlcGxheWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9odWdlcmVwbGF5YnV0dG9uXCIpO1xyXG52YXIgYnVmZmVyaW5nb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9idWZmZXJpbmdvdmVybGF5XCIpO1xyXG52YXIgY2FzdHVpY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Nhc3R1aWNvbnRhaW5lclwiKTtcclxudmFyIHBsYXliYWNrdG9nZ2xlb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZW92ZXJsYXlcIik7XHJcbnZhciBjbG9zZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jbG9zZWJ1dHRvblwiKTtcclxudmFyIG1ldGFkYXRhbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvbWV0YWRhdGFsYWJlbFwiKTtcclxudmFyIGFpcnBsYXl0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYWlycGxheXRvZ2dsZWJ1dHRvblwiKTtcclxudmFyIHZvbHVtZXNsaWRlcl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92b2x1bWVzbGlkZXJcIik7XHJcbnZhciBwaWN0dXJlaW5waWN0dXJldG9nZ2xlYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3BpY3R1cmVpbnBpY3R1cmV0b2dnbGVidXR0b25cIik7XHJcbnZhciBzcGFjZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc3BhY2VyXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG4vLyBPYmplY3QuYXNzaWduIHBvbHlmaWxsIGZvciBFUzUvSUU5XHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RlL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cclxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpO1xyXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfTtcclxufVxyXG4vLyBFeHBvc2UgY2xhc3NlcyB0byB3aW5kb3dcclxud2luZG93LmJpdG1vdmluLnBsYXllcnVpID0ge1xyXG4gICAgLy8gTWFuYWdlbWVudFxyXG4gICAgVUlNYW5hZ2VyOiB1aW1hbmFnZXJfMS5VSU1hbmFnZXIsXHJcbiAgICBVSUluc3RhbmNlTWFuYWdlcjogdWltYW5hZ2VyXzEuVUlJbnN0YW5jZU1hbmFnZXIsXHJcbiAgICAvLyBVdGlsc1xyXG4gICAgQXJyYXlVdGlsczogdXRpbHNfMS5BcnJheVV0aWxzLFxyXG4gICAgU3RyaW5nVXRpbHM6IHV0aWxzXzEuU3RyaW5nVXRpbHMsXHJcbiAgICBQbGF5ZXJVdGlsczogdXRpbHNfMS5QbGF5ZXJVdGlscyxcclxuICAgIFVJVXRpbHM6IHV0aWxzXzEuVUlVdGlscyxcclxuICAgIEJyb3dzZXJVdGlsczogdXRpbHNfMS5Ccm93c2VyVXRpbHMsXHJcbiAgICAvLyBDb21wb25lbnRzXHJcbiAgICBBZENsaWNrT3ZlcmxheTogYWRjbGlja292ZXJsYXlfMS5BZENsaWNrT3ZlcmxheSxcclxuICAgIEFkTWVzc2FnZUxhYmVsOiBhZG1lc3NhZ2VsYWJlbF8xLkFkTWVzc2FnZUxhYmVsLFxyXG4gICAgQWRTa2lwQnV0dG9uOiBhZHNraXBidXR0b25fMS5BZFNraXBCdXR0b24sXHJcbiAgICBBaXJQbGF5VG9nZ2xlQnV0dG9uOiBhaXJwbGF5dG9nZ2xlYnV0dG9uXzEuQWlyUGxheVRvZ2dsZUJ1dHRvbixcclxuICAgIEF1ZGlvUXVhbGl0eVNlbGVjdEJveDogYXVkaW9xdWFsaXR5c2VsZWN0Ym94XzEuQXVkaW9RdWFsaXR5U2VsZWN0Qm94LFxyXG4gICAgQXVkaW9UcmFja1NlbGVjdEJveDogYXVkaW90cmFja3NlbGVjdGJveF8xLkF1ZGlvVHJhY2tTZWxlY3RCb3gsXHJcbiAgICBCdWZmZXJpbmdPdmVybGF5OiBidWZmZXJpbmdvdmVybGF5XzEuQnVmZmVyaW5nT3ZlcmxheSxcclxuICAgIEJ1dHRvbjogYnV0dG9uXzEuQnV0dG9uLFxyXG4gICAgQ2FzdFN0YXR1c092ZXJsYXk6IGNhc3RzdGF0dXNvdmVybGF5XzEuQ2FzdFN0YXR1c092ZXJsYXksXHJcbiAgICBDYXN0VG9nZ2xlQnV0dG9uOiBjYXN0dG9nZ2xlYnV0dG9uXzEuQ2FzdFRvZ2dsZUJ1dHRvbixcclxuICAgIENhc3RVSUNvbnRhaW5lcjogY2FzdHVpY29udGFpbmVyXzEuQ2FzdFVJQ29udGFpbmVyLFxyXG4gICAgQ2xpY2tPdmVybGF5OiBjbGlja292ZXJsYXlfMS5DbGlja092ZXJsYXksXHJcbiAgICBDbG9zZUJ1dHRvbjogY2xvc2VidXR0b25fMS5DbG9zZUJ1dHRvbixcclxuICAgIENvbXBvbmVudDogY29tcG9uZW50XzEuQ29tcG9uZW50LFxyXG4gICAgQ29udGFpbmVyOiBjb250YWluZXJfMS5Db250YWluZXIsXHJcbiAgICBDb250cm9sQmFyOiBjb250cm9sYmFyXzEuQ29udHJvbEJhcixcclxuICAgIEVycm9yTWVzc2FnZU92ZXJsYXk6IGVycm9ybWVzc2FnZW92ZXJsYXlfMS5FcnJvck1lc3NhZ2VPdmVybGF5LFxyXG4gICAgRnVsbHNjcmVlblRvZ2dsZUJ1dHRvbjogZnVsbHNjcmVlbnRvZ2dsZWJ1dHRvbl8xLkZ1bGxzY3JlZW5Ub2dnbGVCdXR0b24sXHJcbiAgICBIdWdlUGxheWJhY2tUb2dnbGVCdXR0b246IGh1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xLkh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbixcclxuICAgIEh1Z2VSZXBsYXlCdXR0b246IGh1Z2VyZXBsYXlidXR0b25fMS5IdWdlUmVwbGF5QnV0dG9uLFxyXG4gICAgTGFiZWw6IGxhYmVsXzEuTGFiZWwsXHJcbiAgICBNZXRhZGF0YUxhYmVsOiBtZXRhZGF0YWxhYmVsXzEuTWV0YWRhdGFMYWJlbCxcclxuICAgIE1ldGFkYXRhTGFiZWxDb250ZW50OiBtZXRhZGF0YWxhYmVsXzEuTWV0YWRhdGFMYWJlbENvbnRlbnQsXHJcbiAgICBQaWN0dXJlSW5QaWN0dXJlVG9nZ2xlQnV0dG9uOiBwaWN0dXJlaW5waWN0dXJldG9nZ2xlYnV0dG9uXzEuUGljdHVyZUluUGljdHVyZVRvZ2dsZUJ1dHRvbixcclxuICAgIFBsYXliYWNrU3BlZWRTZWxlY3RCb3g6IHBsYXliYWNrc3BlZWRzZWxlY3Rib3hfMS5QbGF5YmFja1NwZWVkU2VsZWN0Qm94LFxyXG4gICAgUGxheWJhY2tUaW1lTGFiZWw6IHBsYXliYWNrdGltZWxhYmVsXzEuUGxheWJhY2tUaW1lTGFiZWwsXHJcbiAgICBQbGF5YmFja1RpbWVMYWJlbE1vZGU6IHBsYXliYWNrdGltZWxhYmVsXzEuUGxheWJhY2tUaW1lTGFiZWxNb2RlLFxyXG4gICAgUGxheWJhY2tUb2dnbGVCdXR0b246IHBsYXliYWNrdG9nZ2xlYnV0dG9uXzEuUGxheWJhY2tUb2dnbGVCdXR0b24sXHJcbiAgICBQbGF5YmFja1RvZ2dsZU92ZXJsYXk6IHBsYXliYWNrdG9nZ2xlb3ZlcmxheV8xLlBsYXliYWNrVG9nZ2xlT3ZlcmxheSxcclxuICAgIFJlY29tbWVuZGF0aW9uT3ZlcmxheTogcmVjb21tZW5kYXRpb25vdmVybGF5XzEuUmVjb21tZW5kYXRpb25PdmVybGF5LFxyXG4gICAgU2Vla0Jhcjogc2Vla2Jhcl8xLlNlZWtCYXIsXHJcbiAgICBTZWVrQmFyTGFiZWw6IHNlZWtiYXJsYWJlbF8xLlNlZWtCYXJMYWJlbCxcclxuICAgIFNlbGVjdEJveDogc2VsZWN0Ym94XzEuU2VsZWN0Qm94LFxyXG4gICAgU2V0dGluZ3NQYW5lbDogc2V0dGluZ3NwYW5lbF8xLlNldHRpbmdzUGFuZWwsXHJcbiAgICBTZXR0aW5nc1BhbmVsSXRlbTogc2V0dGluZ3NwYW5lbF8xLlNldHRpbmdzUGFuZWxJdGVtLFxyXG4gICAgU2V0dGluZ3NUb2dnbGVCdXR0b246IHNldHRpbmdzdG9nZ2xlYnV0dG9uXzEuU2V0dGluZ3NUb2dnbGVCdXR0b24sXHJcbiAgICBTcGFjZXI6IHNwYWNlcl8xLlNwYWNlcixcclxuICAgIFN1YnRpdGxlT3ZlcmxheTogc3VidGl0bGVvdmVybGF5XzEuU3VidGl0bGVPdmVybGF5LFxyXG4gICAgU3VidGl0bGVTZWxlY3RCb3g6IHN1YnRpdGxlc2VsZWN0Ym94XzEuU3VidGl0bGVTZWxlY3RCb3gsXHJcbiAgICBUaXRsZUJhcjogdGl0bGViYXJfMS5UaXRsZUJhcixcclxuICAgIFRvZ2dsZUJ1dHRvbjogdG9nZ2xlYnV0dG9uXzEuVG9nZ2xlQnV0dG9uLFxyXG4gICAgVUlDb250YWluZXI6IHVpY29udGFpbmVyXzEuVUlDb250YWluZXIsXHJcbiAgICBWaWRlb1F1YWxpdHlTZWxlY3RCb3g6IHZpZGVvcXVhbGl0eXNlbGVjdGJveF8xLlZpZGVvUXVhbGl0eVNlbGVjdEJveCxcclxuICAgIFZvbHVtZUNvbnRyb2xCdXR0b246IHZvbHVtZWNvbnRyb2xidXR0b25fMS5Wb2x1bWVDb250cm9sQnV0dG9uLFxyXG4gICAgVm9sdW1lU2xpZGVyOiB2b2x1bWVzbGlkZXJfMS5Wb2x1bWVTbGlkZXIsXHJcbiAgICBWb2x1bWVUb2dnbGVCdXR0b246IHZvbHVtZXRvZ2dsZWJ1dHRvbl8xLlZvbHVtZVRvZ2dsZUJ1dHRvbixcclxuICAgIFZSVG9nZ2xlQnV0dG9uOiB2cnRvZ2dsZWJ1dHRvbl8xLlZSVG9nZ2xlQnV0dG9uLFxyXG4gICAgV2F0ZXJtYXJrOiB3YXRlcm1hcmtfMS5XYXRlcm1hcmssXHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9tYWluLnRzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xyXG52YXIgYml0ZGFzaF9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9iaXRkYXNoLWNvbnRyb2xsZXJcIik7XHJcbnZhciBiaXRkYXNoX2RpcmVjdGl2ZV8xID0gcmVxdWlyZShcIi4vYml0ZGFzaC1kaXJlY3RpdmVcIik7XHJcbnZhciBtb2R1bGVOYW1lID0gJ21pLkJpdGRhc2hQbGF5ZXInO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdNaUJpdGRhc2hDb250cm9sbGVyJywgYml0ZGFzaF9jb250cm9sbGVyXzEuZGVmYXVsdClcclxuICAgIC5kaXJlY3RpdmUoJ21pQml0ZGFzaFBsYXllcicsIGJpdGRhc2hfZGlyZWN0aXZlXzEuZGVmYXVsdCk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vaW5kZXgudHNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY2xpY2tvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jbGlja292ZXJsYXlcIik7XHJcbi8qKlxyXG4gKiBBIHNpbXBsZSBjbGljayBjYXB0dXJlIG92ZXJsYXkgZm9yIGNsaWNrVGhyb3VnaFVybHMgb2YgYWRzLlxyXG4gKi9cclxudmFyIEFkQ2xpY2tPdmVybGF5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBZENsaWNrT3ZlcmxheSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEFkQ2xpY2tPdmVybGF5KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIEFkQ2xpY2tPdmVybGF5LnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjbGlja1Rocm91Z2hVcmwgPSBudWxsO1xyXG4gICAgICAgIHZhciBjbGlja1Rocm91Z2hFbmFibGVkID0gIXBsYXllci5nZXRDb25maWcoKS5hZHZlcnRpc2luZ1xyXG4gICAgICAgICAgICB8fCAhcGxheWVyLmdldENvbmZpZygpLmFkdmVydGlzaW5nLmhhc093blByb3BlcnR5KCdjbGlja1Rocm91Z2hFbmFibGVkJylcclxuICAgICAgICAgICAgfHwgcGxheWVyLmdldENvbmZpZygpLmFkdmVydGlzaW5nLmNsaWNrVGhyb3VnaEVuYWJsZWQ7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQURfU1RBUlRFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWNrVGhyb3VnaFVybCA9IGV2ZW50LmNsaWNrVGhyb3VnaFVybDtcclxuICAgICAgICAgICAgaWYgKGNsaWNrVGhyb3VnaEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFVybChjbGlja1Rocm91Z2hVcmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgY2xpY2stdGhyb3VnaCBpcyBkaXNhYmxlZCwgd2Ugc2V0IHRoZSB1cmwgdG8gbnVsbCB0byBhdm9pZCBpdCBvcGVuXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRVcmwobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBDbGVhciBjbGljay10aHJvdWdoIFVSTCB3aGVuIGFkIGhhcyBmaW5pc2hlZFxyXG4gICAgICAgIHZhciBhZEZpbmlzaGVkSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0VXJsKG51bGwpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQURfRklOSVNIRUQsIGFkRmluaXNoZWRIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9BRF9TS0lQUEVELCBhZEZpbmlzaGVkSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQURfRVJST1IsIGFkRmluaXNoZWRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLm9uQ2xpY2suc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gUGF1c2UgdGhlIGFkIHdoZW4gb3ZlcmxheSBpcyBjbGlja2VkXHJcbiAgICAgICAgICAgIHBsYXllci5wYXVzZSgndWktY29udGVudC1jbGljaycpO1xyXG4gICAgICAgICAgICAvLyBOb3RpZnkgdGhlIHBsYXllciBvZiB0aGUgY2xpY2tlZCBhZFxyXG4gICAgICAgICAgICBwbGF5ZXIuZmlyZUV2ZW50KHBsYXllci5FVkVOVC5PTl9BRF9DTElDS0VELCB7XHJcbiAgICAgICAgICAgICAgICBjbGlja1Rocm91Z2hVcmw6IGNsaWNrVGhyb3VnaFVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQWRDbGlja092ZXJsYXk7XHJcbn0oY2xpY2tvdmVybGF5XzEuQ2xpY2tPdmVybGF5KSk7XHJcbmV4cG9ydHMuQWRDbGlja092ZXJsYXkgPSBBZENsaWNrT3ZlcmxheTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvYWRjbGlja292ZXJsYXkudHNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2xhYmVsXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxuLyoqXHJcbiAqIEEgbGFiZWwgdGhhdCBkaXNwbGF5cyBhIG1lc3NhZ2UgYWJvdXQgYSBydW5uaW5nIGFkLCBvcHRpb25hbGx5IHdpdGggYSBjb3VudGRvd24uXHJcbiAqL1xyXG52YXIgQWRNZXNzYWdlTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEFkTWVzc2FnZUxhYmVsLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQWRNZXNzYWdlTGFiZWwoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWxhYmVsLWFkLW1lc3NhZ2UnLFxyXG4gICAgICAgICAgICB0ZXh0OiAnVGhpcyBhZCB3aWxsIGVuZCBpbiB7cmVtYWluaW5nVGltZX0gc2Vjb25kcy4nXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBBZE1lc3NhZ2VMYWJlbC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgdGV4dCA9IHRoaXMuZ2V0Q29uZmlnKCkudGV4dDtcclxuICAgICAgICB2YXIgdXBkYXRlTWVzc2FnZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFRleHQodXRpbHNfMS5TdHJpbmdVdGlscy5yZXBsYWNlQWRNZXNzYWdlUGxhY2Vob2xkZXJzKHRleHQsIG51bGwsIHBsYXllcikpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGFkU3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRleHQgPSBldmVudC5hZE1lc3NhZ2UgfHwgdGV4dDtcclxuICAgICAgICAgICAgdXBkYXRlTWVzc2FnZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVElNRV9DSEFOR0VELCB1cGRhdGVNZXNzYWdlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfVElNRV9VUERBVEVELCB1cGRhdGVNZXNzYWdlSGFuZGxlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgYWRFbmRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIucmVtb3ZlRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9USU1FX0NIQU5HRUQsIHVwZGF0ZU1lc3NhZ2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9USU1FX1VQREFURUQsIHVwZGF0ZU1lc3NhZ2VIYW5kbGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0FEX1NUQVJURUQsIGFkU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9BRF9TS0lQUEVELCBhZEVuZEhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0FEX0VSUk9SLCBhZEVuZEhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0FEX0ZJTklTSEVELCBhZEVuZEhhbmRsZXIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBZE1lc3NhZ2VMYWJlbDtcclxufShsYWJlbF8xLkxhYmVsKSk7XHJcbmV4cG9ydHMuQWRNZXNzYWdlTGFiZWwgPSBBZE1lc3NhZ2VMYWJlbDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvYWRtZXNzYWdlbGFiZWwudHNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b25cIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xyXG4vKipcclxuICogQSBidXR0b24gdGhhdCBpcyBkaXNwbGF5ZWQgZHVyaW5nIGFkcyBhbmQgY2FuIGJlIHVzZWQgdG8gc2tpcCB0aGUgYWQuXHJcbiAqL1xyXG52YXIgQWRTa2lwQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBZFNraXBCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBBZFNraXBCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWJ1dHRvbi1hZC1za2lwJyxcclxuICAgICAgICAgICAgc2tpcE1lc3NhZ2U6IHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZG93bjogJ1NraXAgYWQgaW4ge3JlbWFpbmluZ1RpbWV9JyxcclxuICAgICAgICAgICAgICAgIHNraXA6ICdTa2lwIGFkJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBBZFNraXBCdXR0b24ucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7IC8vIFRPRE8gZ2V0IHJpZCBvZiBnZW5lcmljIGNhc3RcclxuICAgICAgICB2YXIgc2tpcE1lc3NhZ2UgPSBjb25maWcuc2tpcE1lc3NhZ2U7XHJcbiAgICAgICAgdmFyIGFkRXZlbnQgPSBudWxsO1xyXG4gICAgICAgIHZhciB1cGRhdGVTa2lwTWVzc2FnZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIERpc3BsYXkgdGhpcyBidXR0b24gb25seSBpZiBhZCBpcyBza2lwcGFibGVcclxuICAgICAgICAgICAgaWYgKGFkRXZlbnQuc2tpcE9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc2tpcCBtZXNzYWdlIG9uIHRoZSBidXR0b25cclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRDdXJyZW50VGltZSgpIDwgYWRFdmVudC5za2lwT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRUZXh0KHV0aWxzXzEuU3RyaW5nVXRpbHMucmVwbGFjZUFkTWVzc2FnZVBsYWNlaG9sZGVycyhjb25maWcuc2tpcE1lc3NhZ2UuY291bnRkb3duLCBhZEV2ZW50LnNraXBPZmZzZXQsIHBsYXllcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGV4dChjb25maWcuc2tpcE1lc3NhZ2Uuc2tpcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBhZFN0YXJ0SGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBhZEV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIHNraXBNZXNzYWdlID0gYWRFdmVudC5za2lwTWVzc2FnZSB8fCBza2lwTWVzc2FnZTtcclxuICAgICAgICAgICAgdXBkYXRlU2tpcE1lc3NhZ2VIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfQ0hBTkdFRCwgdXBkYXRlU2tpcE1lc3NhZ2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9USU1FX1VQREFURUQsIHVwZGF0ZVNraXBNZXNzYWdlSGFuZGxlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgYWRFbmRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIucmVtb3ZlRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9USU1FX0NIQU5HRUQsIHVwZGF0ZVNraXBNZXNzYWdlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHBsYXllci5yZW1vdmVFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfVElNRV9VUERBVEVELCB1cGRhdGVTa2lwTWVzc2FnZUhhbmRsZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQURfU1RBUlRFRCwgYWRTdGFydEhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0FEX1NLSVBQRUQsIGFkRW5kSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQURfRVJST1IsIGFkRW5kSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQURfRklOSVNIRUQsIGFkRW5kSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBza2lwIHRoZSBhZCAodGhpcyBvbmx5IHdvcmtzIGlmIGl0IGlzIHNraXBwYWJsZSBzbyB3ZSBkb24ndCBuZWVkIHRvIHRha2UgZXh0cmEgY2FyZSBvZiB0aGF0IGhlcmUpXHJcbiAgICAgICAgICAgIHBsYXllci5za2lwQWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQWRTa2lwQnV0dG9uO1xyXG59KGJ1dHRvbl8xLkJ1dHRvbikpO1xyXG5leHBvcnRzLkFkU2tpcEJ1dHRvbiA9IEFkU2tpcEJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvYWRza2lwYnV0dG9uLnRzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vdG9nZ2xlYnV0dG9uXCIpO1xyXG4vKipcclxuICogQSBidXR0b24gdGhhdCB0b2dnbGVzIEFwcGxlIEFpclBsYXkuXHJcbiAqL1xyXG52YXIgQWlyUGxheVRvZ2dsZUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQWlyUGxheVRvZ2dsZUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEFpclBsYXlUb2dnbGVCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWFpcnBsYXl0b2dnbGVidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQXBwbGUgQWlyUGxheSdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEFpclBsYXlUb2dnbGVCdXR0b24ucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgaWYgKCFwbGF5ZXIuaXNBaXJwbGF5QXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBwbGF5ZXIgZG9lcyBub3Qgc3VwcG9ydCBBaXJwbGF5IChwbGF5ZXIgNy4wKSwgd2UganVzdCBoaWRlIHRoaXMgY29tcG9uZW50IGFuZCBza2lwIGNvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNBaXJwbGF5QXZhaWxhYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5zaG93QWlycGxheVRhcmdldFBpY2tlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWlyUGxheSB1bmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGFpclBsYXlBdmFpbGFibGVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzQWlycGxheUF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0FJUlBMQVlfQVZBSUxBQkxFLCBhaXJQbGF5QXZhaWxhYmxlSGFuZGxlcik7XHJcbiAgICAgICAgLy8gU3RhcnR1cCBpbml0XHJcbiAgICAgICAgYWlyUGxheUF2YWlsYWJsZUhhbmRsZXIoKTsgLy8gSGlkZSBidXR0b24gaWYgQWlyUGxheSBpcyBub3QgYXZhaWxhYmxlXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFpclBsYXlUb2dnbGVCdXR0b247XHJcbn0odG9nZ2xlYnV0dG9uXzEuVG9nZ2xlQnV0dG9uKSk7XHJcbmV4cG9ydHMuQWlyUGxheVRvZ2dsZUJ1dHRvbiA9IEFpclBsYXlUb2dnbGVCdXR0b247XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2FpcnBsYXl0b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxuLyoqXHJcbiAqIE92ZXJsYXlzIHRoZSBwbGF5ZXIgYW5kIGRpc3BsYXlzIGFuIGF1ZGlvLW9ubHkgaW5kaWNhdG9yLlxyXG4gKi9cclxudmFyIEF1ZGlvT25seU92ZXJsYXkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEF1ZGlvT25seU92ZXJsYXksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBBdWRpb09ubHlPdmVybGF5KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5hdWRpb29ubHkgPSBbXHJcbiAgICAgICAgICAgIG5ldyBjb21wb25lbnRfMS5Db21wb25lbnQoeyB0YWc6ICdkaXYnLCBjc3NDbGFzczogJ3VpLWF1ZGlvb25seS1vdmVybGF5LWluZGljYXRvcicgfSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWF1ZGlvb25seS1vdmVybGF5JyxcclxuICAgICAgICAgICAgaGlkZGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tcG9uZW50czogX3RoaXMuYXVkaW9vbmx5XHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBBdWRpb09ubHlPdmVybGF5LnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEF1ZGlvT25seU92ZXJsYXk7XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuQXVkaW9Pbmx5T3ZlcmxheSA9IEF1ZGlvT25seU92ZXJsYXk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2F1ZGlvb25seW92ZXJsYXkudHNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgc2VsZWN0Ym94XzEgPSByZXF1aXJlKFwiLi9zZWxlY3Rib3hcIik7XHJcbi8qKlxyXG4gKiBBIHNlbGVjdCBib3ggcHJvdmlkaW5nIGEgc2VsZWN0aW9uIGJldHdlZW4gYXZhaWxhYmxlIGF1ZGlvIHRyYWNrcyAoZS5nLiBkaWZmZXJlbnQgbGFuZ3VhZ2VzKS5cclxuICovXHJcbnZhciBBdWRpb1RyYWNrU2VsZWN0Qm94ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBdWRpb1RyYWNrU2VsZWN0Qm94LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQXVkaW9UcmFja1NlbGVjdEJveChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgQXVkaW9UcmFja1NlbGVjdEJveC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgdXBkYXRlQXVkaW9UcmFja3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhdWRpb1RyYWNrcyA9IHBsYXllci5nZXRBdmFpbGFibGVBdWRpbygpO1xyXG4gICAgICAgICAgICBfdGhpcy5jbGVhckl0ZW1zKCk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBhdWRpbyB0cmFja3NcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBhdWRpb1RyYWNrc18xID0gYXVkaW9UcmFja3M7IF9pIDwgYXVkaW9UcmFja3NfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdWRpb1RyYWNrID0gYXVkaW9UcmFja3NfMVtfaV07XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRJdGVtKGF1ZGlvVHJhY2suaWQsIGF1ZGlvVHJhY2subGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0QXVkaW8odmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBhdWRpb1RyYWNrSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRBdWRpb1RyYWNrID0gcGxheWVyLmdldEF1ZGlvKCk7XHJcbiAgICAgICAgICAgIC8vIEhMUyBzdHJlYW1zIGRvbid0IGFsd2F5cyBwcm92aWRlIHRoaXMsIHNvIHdlIGhhdmUgdG8gY2hlY2tcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRBdWRpb1RyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RJdGVtKGN1cnJlbnRBdWRpb1RyYWNrLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gVXBkYXRlIHNlbGVjdGlvbiB3aGVuIHNlbGVjdGVkIHRyYWNrIGhhcyBjaGFuZ2VkXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQVVESU9fQ0hBTkdFRCwgYXVkaW9UcmFja0hhbmRsZXIpO1xyXG4gICAgICAgIC8vIFVwZGF0ZSB0cmFja3Mgd2hlbiBzb3VyY2UgZ29lcyBhd2F5XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU09VUkNFX1VOTE9BREVELCB1cGRhdGVBdWRpb1RyYWNrcyk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHRyYWNrcyB3aGVuIGEgbmV3IHNvdXJjZSBpcyBsb2FkZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9SRUFEWSwgdXBkYXRlQXVkaW9UcmFja3MpO1xyXG4gICAgICAgIC8vIFVwZGF0ZSB0cmFja3Mgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIG9yIHJlbW92ZWQgKHNpbmNlIHBsYXllciA3LjEuNClcclxuICAgICAgICBpZiAocGxheWVyLkVWRU5ULk9OX0FVRElPX0FEREVEICYmIHBsYXllci5FVkVOVC5PTl9BVURJT19SRU1PVkVEKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0FVRElPX0FEREVELCB1cGRhdGVBdWRpb1RyYWNrcyk7XHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0FVRElPX1JFTU9WRUQsIHVwZGF0ZUF1ZGlvVHJhY2tzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUG9wdWxhdGUgdHJhY2tzIGF0IHN0YXJ0dXBcclxuICAgICAgICB1cGRhdGVBdWRpb1RyYWNrcygpO1xyXG4gICAgICAgIC8vIFdoZW4gYHBsYXliYWNrLmF1ZGlvTGFuZ3VhZ2VgIGlzIHNldCwgdGhlIGBPTl9BVURJT19DSEFOR0VEYCBldmVudCBmb3IgdGhhdCBjaGFuZ2UgaXMgdHJpZ2dlcmVkIGJlZm9yZSB0aGVcclxuICAgICAgICAvLyBVSSBpcyBjcmVhdGVkLiBUaGVyZWZvcmUgd2UgbmVlZCB0byBzZXQgdGhlIGF1ZGlvIHRyYWNrIG9uIGNvbmZpZ3VyZS5cclxuICAgICAgICBhdWRpb1RyYWNrSGFuZGxlcigpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBBdWRpb1RyYWNrU2VsZWN0Qm94O1xyXG59KHNlbGVjdGJveF8xLlNlbGVjdEJveCkpO1xyXG5leHBvcnRzLkF1ZGlvVHJhY2tTZWxlY3RCb3ggPSBBdWRpb1RyYWNrU2VsZWN0Qm94O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9hdWRpb3RyYWNrc2VsZWN0Ym94LnRzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xyXG52YXIgY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRcIik7XHJcbnZhciB0aW1lb3V0XzEgPSByZXF1aXJlKFwiLi4vdGltZW91dFwiKTtcclxuLyoqXHJcbiAqIE92ZXJsYXlzIHRoZSBwbGF5ZXIgYW5kIGRpc3BsYXlzIGEgYnVmZmVyaW5nIGluZGljYXRvci5cclxuICovXHJcbnZhciBCdWZmZXJpbmdPdmVybGF5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhCdWZmZXJpbmdPdmVybGF5LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQnVmZmVyaW5nT3ZlcmxheShjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuaW5kaWNhdG9ycyA9IFtcclxuICAgICAgICAgICAgbmV3IGNvbXBvbmVudF8xLkNvbXBvbmVudCh7IHRhZzogJ2RpdicsIGNzc0NsYXNzOiAndWktYnVmZmVyaW5nLW92ZXJsYXktaW5kaWNhdG9yJyB9KSxcclxuICAgICAgICAgICAgbmV3IGNvbXBvbmVudF8xLkNvbXBvbmVudCh7IHRhZzogJ2RpdicsIGNzc0NsYXNzOiAndWktYnVmZmVyaW5nLW92ZXJsYXktaW5kaWNhdG9yJyB9KSxcclxuICAgICAgICAgICAgbmV3IGNvbXBvbmVudF8xLkNvbXBvbmVudCh7IHRhZzogJ2RpdicsIGNzc0NsYXNzOiAndWktYnVmZmVyaW5nLW92ZXJsYXktaW5kaWNhdG9yJyB9KSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWJ1ZmZlcmluZy1vdmVybGF5JyxcclxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBfdGhpcy5pbmRpY2F0b3JzLFxyXG4gICAgICAgICAgICBzaG93RGVsYXlNczogMTAwMCxcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEJ1ZmZlcmluZ092ZXJsYXkucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgdmFyIG92ZXJsYXlTaG93VGltZW91dCA9IG5ldyB0aW1lb3V0XzEuVGltZW91dChjb25maWcuc2hvd0RlbGF5TXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBzaG93T3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb3ZlcmxheVNob3dUaW1lb3V0LnN0YXJ0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgaGlkZU92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG92ZXJsYXlTaG93VGltZW91dC5jbGVhcigpO1xyXG4gICAgICAgICAgICBfdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TVEFMTF9TVEFSVEVELCBzaG93T3ZlcmxheSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU1RBTExfRU5ERUQsIGhpZGVPdmVybGF5KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfVU5MT0FERUQsIGhpZGVPdmVybGF5KTtcclxuICAgICAgICAvLyBTaG93IG92ZXJsYXkgaWYgcGxheWVyIGlzIGFscmVhZHkgc3RhbGxlZCBhdCBpbml0XHJcbiAgICAgICAgaWYgKHBsYXllci5pc1N0YWxsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJ1ZmZlcmluZ092ZXJsYXk7XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuQnVmZmVyaW5nT3ZlcmxheSA9IEJ1ZmZlcmluZ092ZXJsYXk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2J1ZmZlcmluZ292ZXJsYXkudHNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4vbGFiZWxcIik7XHJcbi8qKlxyXG4gKiBPdmVybGF5cyB0aGUgcGxheWVyIGFuZCBkaXNwbGF5cyB0aGUgc3RhdHVzIG9mIGEgQ2FzdCBzZXNzaW9uLlxyXG4gKi9cclxudmFyIENhc3RTdGF0dXNPdmVybGF5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDYXN0U3RhdHVzT3ZlcmxheSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENhc3RTdGF0dXNPdmVybGF5KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0dXNMYWJlbCA9IG5ldyBsYWJlbF8xLkxhYmVsKHsgY3NzQ2xhc3M6ICd1aS1jYXN0LXN0YXR1cy1sYWJlbCcgfSk7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktY2FzdC1zdGF0dXMtb3ZlcmxheScsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IFtfdGhpcy5zdGF0dXNMYWJlbF0sXHJcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQ2FzdFN0YXR1c092ZXJsYXkucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9XQUlUSU5HX0ZPUl9ERVZJQ0UsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIC8vIEdldCBkZXZpY2UgbmFtZSBhbmQgdXBkYXRlIHN0YXR1cyB0ZXh0IHdoaWxlIGNvbm5lY3RpbmdcclxuICAgICAgICAgICAgdmFyIGNhc3REZXZpY2VOYW1lID0gZXZlbnQuY2FzdFBheWxvYWQuZGV2aWNlTmFtZTtcclxuICAgICAgICAgICAgX3RoaXMuc3RhdHVzTGFiZWwuc2V0VGV4dChcIkNvbm5lY3RpbmcgdG8gPHN0cm9uZz5cIiArIGNhc3REZXZpY2VOYW1lICsgXCI8L3N0cm9uZz4uLi5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9TVEFSVEVELCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gU2Vzc2lvbiBpcyBzdGFydGVkIG9yIHJlc3VtZWRcclxuICAgICAgICAgICAgLy8gRm9yIGNhc2VzIHdoZW4gYSBzZXNzaW9uIGlzIHJlc3VtZWQsIHdlIGRvIG5vdCByZWNlaXZlIHRoZSBwcmV2aW91cyBldmVudHMgYW5kIHRoZXJlZm9yZSBzaG93IHRoZSBzdGF0dXMgcGFuZWxcclxuICAgICAgICAgICAgLy8gaGVyZSB0b29cclxuICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB2YXIgY2FzdERldmljZU5hbWUgPSBldmVudC5kZXZpY2VOYW1lO1xyXG4gICAgICAgICAgICBfdGhpcy5zdGF0dXNMYWJlbC5zZXRUZXh0KFwiUGxheWluZyBvbiA8c3Ryb25nPlwiICsgY2FzdERldmljZU5hbWUgKyBcIjwvc3Ryb25nPlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1NUT1BQRUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAvLyBDYXN0IHNlc3Npb24gZ29uZSwgaGlkZSB0aGUgc3RhdHVzIHBhbmVsXHJcbiAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2FzdFN0YXR1c092ZXJsYXk7XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuQ2FzdFN0YXR1c092ZXJsYXkgPSBDYXN0U3RhdHVzT3ZlcmxheTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvY2FzdHN0YXR1c292ZXJsYXkudHNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdG9nZ2xlYnV0dG9uXzEgPSByZXF1aXJlKFwiLi90b2dnbGVidXR0b25cIik7XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiB0aGF0IHRvZ2dsZXMgY2FzdGluZyB0byBhIENhc3QgcmVjZWl2ZXIuXHJcbiAqL1xyXG52YXIgQ2FzdFRvZ2dsZUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQ2FzdFRvZ2dsZUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENhc3RUb2dnbGVCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWNhc3R0b2dnbGVidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnR29vZ2xlIENhc3QnXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBDYXN0VG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMub25DbGljay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzQ2FzdEF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmlzQ2FzdGluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmNhc3RTdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuY2FzdFZpZGVvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uc29sZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYXN0IHVuYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgY2FzdEF2YWlsYWJsZUhhbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5pc0Nhc3RBdmFpbGFibGUoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX0FWQUlMQUJMRSwgY2FzdEF2YWlsYWJsZUhhbmRlcik7XHJcbiAgICAgICAgLy8gVG9nZ2xlIGJ1dHRvbiAnb24nIHN0YXRlXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9XQUlUSU5HX0ZPUl9ERVZJQ0UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMub24oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1NUQVJURUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gV2hlbiBhIHNlc3Npb24gaXMgcmVzdW1lZCwgdGhlcmUgaXMgbm8gT05fQ0FTVF9TVEFSVCBldmVudCwgc28gd2UgYWxzbyBuZWVkIHRvIHRvZ2dsZSBoZXJlIGZvciBzdWNoIGNhc2VzXHJcbiAgICAgICAgICAgIF90aGlzLm9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9TVE9QUEVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9mZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFN0YXJ0dXAgaW5pdFxyXG4gICAgICAgIGNhc3RBdmFpbGFibGVIYW5kZXIoKTsgLy8gSGlkZSBidXR0b24gaWYgQ2FzdCBub3QgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYgKHBsYXllci5pc0Nhc3RpbmcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBDYXN0VG9nZ2xlQnV0dG9uO1xyXG59KHRvZ2dsZWJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbikpO1xyXG5leHBvcnRzLkNhc3RUb2dnbGVCdXR0b24gPSBDYXN0VG9nZ2xlQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9jYXN0dG9nZ2xlYnV0dG9uLnRzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHVpY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi91aWNvbnRhaW5lclwiKTtcclxudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuLi90aW1lb3V0XCIpO1xyXG4vKipcclxuICogVGhlIGJhc2UgY29udGFpbmVyIGZvciBDYXN0IHJlY2VpdmVycyB0aGF0IGNvbnRhaW5zIGFsbCBvZiB0aGUgVUkgYW5kIHRha2VzIGNhcmUgdGhhdCB0aGUgVUkgaXMgc2hvd24gb25cclxuICogY2VydGFpbiBwbGF5YmFjayBldmVudHMuXHJcbiAqL1xyXG52YXIgQ2FzdFVJQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDYXN0VUlDb250YWluZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDYXN0VUlDb250YWluZXIoY29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIENhc3RVSUNvbnRhaW5lci5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIFNob3cgVUkgb24gQ2FzdCBkZXZpY2VzIGF0IGNlcnRhaW4gcGxheWJhY2sgZXZlbnRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBTaW5jZSBhIENhc3QgcmVjZWl2ZXIgZG9lcyBub3QgaGF2ZSBhIGRpcmVjdCBIQ0ksIHdlIHNob3cgdGhlIFVJIG9uIGNlcnRhaW4gcGxheWJhY2sgZXZlbnRzIHRvIGdpdmUgdGhlIHVzZXJcclxuICAgICAgICAgKiBhIGNoYW5jZSB0byBzZWUgb24gdGhlIHNjcmVlbiB3aGF0J3MgZ29pbmcgb24sIGUuZy4gb24gcGxheS9wYXVzZSBvciBhIHNlZWsgdGhlIFVJIGlzIHNob3duIGFuZCB0aGUgdXNlciBjYW5cclxuICAgICAgICAgKiBzZWUgdGhlIGN1cnJlbnQgdGltZSBhbmQgcG9zaXRpb24gb24gdGhlIHNlZWsgYmFyLlxyXG4gICAgICAgICAqIFRoZSBVSSBpcyBzaG93biBwZXJtYW5lbnRseSB3aGlsZSBwbGF5YmFjayBpcyBwYXVzZWQsIG90aGVyd2lzZSBoaWRlcyBhdXRvbWF0aWNhbGx5IGFmdGVyIHRoZSBjb25maWd1cmVkXHJcbiAgICAgICAgICogaGlkZSBkZWxheSB0aW1lLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBpc1VpU2hvd24gPSBmYWxzZTtcclxuICAgICAgICB2YXIgaGlkZVVpID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1aW1hbmFnZXIub25Db250cm9sc0hpZGUuZGlzcGF0Y2goX3RoaXMpO1xyXG4gICAgICAgICAgICBpc1VpU2hvd24gPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2FzdFVpSGlkZVRpbWVvdXQgPSBuZXcgdGltZW91dF8xLlRpbWVvdXQoY29uZmlnLmhpZGVEZWxheSwgaGlkZVVpKTtcclxuICAgICAgICB2YXIgc2hvd1VpID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWlzVWlTaG93bikge1xyXG4gICAgICAgICAgICAgICAgdWltYW5hZ2VyLm9uQ29udHJvbHNTaG93LmRpc3BhdGNoKF90aGlzKTtcclxuICAgICAgICAgICAgICAgIGlzVWlTaG93biA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBzaG93VWlQZXJtYW5lbnRseSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2hvd1VpKCk7XHJcbiAgICAgICAgICAgIF90aGlzLmNhc3RVaUhpZGVUaW1lb3V0LmNsZWFyKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgc2hvd1VpV2l0aFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3dVaSgpO1xyXG4gICAgICAgICAgICBfdGhpcy5jYXN0VWlIaWRlVGltZW91dC5zdGFydCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHNob3dVaUFmdGVyU2VlayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5pc1BsYXlpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgc2hvd1VpV2l0aFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dVaVBlcm1hbmVudGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBzaG93VWlXaXRoVGltZW91dCk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU09VUkNFX0xPQURFRCwgc2hvd1VpV2l0aFRpbWVvdXQpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIHNob3dVaVdpdGhUaW1lb3V0KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QQVVTRUQsIHNob3dVaVBlcm1hbmVudGx5KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TRUVLLCBzaG93VWlQZXJtYW5lbnRseSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU0VFS0VELCBzaG93VWlBZnRlclNlZWspO1xyXG4gICAgfTtcclxuICAgIENhc3RVSUNvbnRhaW5lci5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJlbGVhc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNhc3RVaUhpZGVUaW1lb3V0LmNsZWFyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENhc3RVSUNvbnRhaW5lcjtcclxufSh1aWNvbnRhaW5lcl8xLlVJQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuQ2FzdFVJQ29udGFpbmVyID0gQ2FzdFVJQ29udGFpbmVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9jYXN0dWljb250YWluZXIudHNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b25cIik7XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiB0aGF0IGNsb3NlcyAoaGlkZXMpIGEgY29uZmlndXJlZCBjb21wb25lbnQuXHJcbiAqL1xyXG52YXIgQ2xvc2VCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKENsb3NlQnV0dG9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ2xvc2VCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWNsb3NlYnV0dG9uJyxcclxuICAgICAgICAgICAgdGV4dDogJ0Nsb3NlJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQ2xvc2VCdXR0b24ucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIHRoaXMub25DbGljay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25maWcudGFyZ2V0LmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2xvc2VCdXR0b247XHJcbn0oYnV0dG9uXzEuQnV0dG9uKSk7XHJcbmV4cG9ydHMuQ2xvc2VCdXR0b24gPSBDbG9zZUJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvY2xvc2VidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdG9nZ2xlYnV0dG9uXzEgPSByZXF1aXJlKFwiLi90b2dnbGVidXR0b25cIik7XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiB0aGF0IHRvZ2dsZXMgdGhlIHBsYXllciBiZXR3ZWVuIHdpbmRvd2VkIGFuZCBmdWxsc2NyZWVuIHZpZXcuXHJcbiAqL1xyXG52YXIgRnVsbHNjcmVlblRvZ2dsZUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoRnVsbHNjcmVlblRvZ2dsZUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEZ1bGxzY3JlZW5Ub2dnbGVCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWZ1bGxzY3JlZW50b2dnbGVidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnRnVsbHNjcmVlbidcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEZ1bGxzY3JlZW5Ub2dnbGVCdXR0b24ucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGZ1bGxzY3JlZW5TdGF0ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vZmYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fRlVMTFNDUkVFTl9FTlRFUiwgZnVsbHNjcmVlblN0YXRlSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fRlVMTFNDUkVFTl9FWElULCBmdWxsc2NyZWVuU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLm9uQ2xpY2suc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5pc0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZW50ZXJGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBTdGFydHVwIGluaXRcclxuICAgICAgICBmdWxsc2NyZWVuU3RhdGVIYW5kbGVyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEZ1bGxzY3JlZW5Ub2dnbGVCdXR0b247XHJcbn0odG9nZ2xlYnV0dG9uXzEuVG9nZ2xlQnV0dG9uKSk7XHJcbmV4cG9ydHMuRnVsbHNjcmVlblRvZ2dsZUJ1dHRvbiA9IEZ1bGxzY3JlZW5Ub2dnbGVCdXR0b247XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2Z1bGxzY3JlZW50b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRcIik7XHJcbnZhciBldmVudGRpc3BhdGNoZXJfMSA9IHJlcXVpcmUoXCIuLi9ldmVudGRpc3BhdGNoZXJcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xyXG52YXIgTGlzdFNlbGVjdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhMaXN0U2VsZWN0b3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBMaXN0U2VsZWN0b3IoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmxpc3RTZWxlY3RvckV2ZW50cyA9IHtcclxuICAgICAgICAgICAgb25JdGVtQWRkZWQ6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25JdGVtUmVtb3ZlZDogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICBvbkl0ZW1TZWxlY3RlZDogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWxpc3RzZWxlY3RvcidcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIF90aGlzLml0ZW1zID0gX3RoaXMuY29uZmlnLml0ZW1zO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUuZ2V0SXRlbUluZGV4ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMuaXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5pdGVtc1tpbmRleF0ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgc3BlY2lmaWVkIGl0ZW0gaXMgcGFydCBvZiB0aGlzIHNlbGVjdG9yLlxyXG4gICAgICogQHBhcmFtIGtleSB0aGUga2V5IG9mIHRoZSBpdGVtIHRvIGNoZWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgaXRlbSBpcyBwYXJ0IG9mIHRoaXMgc2VsZWN0b3IsIGVsc2UgZmFsc2VcclxuICAgICAqL1xyXG4gICAgTGlzdFNlbGVjdG9yLnByb3RvdHlwZS5oYXNJdGVtID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1JbmRleChrZXkpID4gLTE7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGFuIGl0ZW0gdG8gdGhpcyBzZWxlY3RvciBieSBhcHBlbmRpbmcgaXQgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiBpdGVtcy4gSWYgYW4gaXRlbSB3aXRoIHRoZSBzcGVjaWZpZWRcclxuICAgICAqIGtleSBhbHJlYWR5IGV4aXN0cywgaXQgaXMgcmVwbGFjZWQuXHJcbiAgICAgKiBAcGFyYW0ga2V5IHRoZSBrZXkgb2YgdGhlIGl0ZW0gdG8gYWRkXHJcbiAgICAgKiBAcGFyYW0gbGFiZWwgdGhlIChodW1hbi1yZWFkYWJsZSkgbGFiZWwgb2YgdGhlIGl0ZW0gdG8gYWRkXHJcbiAgICAgKi9cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUuYWRkSXRlbSA9IGZ1bmN0aW9uIChrZXksIGxhYmVsKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGtleSk7IC8vIFRyeSB0byByZW1vdmUga2V5IGZpcnN0IHRvIGdldCBvdmVyd3JpdGUgYmVoYXZpb3IgYW5kIGF2b2lkIGR1cGxpY2F0ZSBrZXlzXHJcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHsga2V5OiBrZXksIGxhYmVsOiBsYWJlbCB9KTtcclxuICAgICAgICB0aGlzLm9uSXRlbUFkZGVkRXZlbnQoa2V5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoaXMgc2VsZWN0b3IuXHJcbiAgICAgKiBAcGFyYW0ga2V5IHRoZSBrZXkgb2YgdGhlIGl0ZW0gdG8gcmVtb3ZlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiByZW1vdmFsIHdhcyBzdWNjZXNzZnVsLCBmYWxzZSBpZiB0aGUgaXRlbSBpcyBub3QgcGFydCBvZiB0aGlzIHNlbGVjdG9yXHJcbiAgICAgKi9cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleChrZXkpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuQXJyYXlVdGlscy5yZW1vdmUodGhpcy5pdGVtcywgdGhpcy5pdGVtc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uSXRlbVJlbW92ZWRFdmVudChrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyBhbiBpdGVtIGZyb20gdGhlIGl0ZW1zIGluIHRoaXMgc2VsZWN0b3IuXHJcbiAgICAgKiBAcGFyYW0ga2V5IHRoZSBrZXkgb2YgdGhlIGl0ZW0gdG8gc2VsZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpcyB0aGUgc2VsZWN0aW9uIHdhcyBzdWNjZXNzZnVsLCBmYWxzZSBpZiB0aGUgc2VsZWN0ZWQgaXRlbSBpcyBub3QgcGFydCBvZiB0aGUgc2VsZWN0b3JcclxuICAgICAqL1xyXG4gICAgTGlzdFNlbGVjdG9yLnByb3RvdHlwZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09IHRoaXMuc2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgICAgIC8vIGl0ZW1Db25maWcgaXMgYWxyZWFkeSBzZWxlY3RlZCwgc3VwcHJlc3MgYW55IGZ1cnRoZXIgYWN0aW9uXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleChrZXkpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0ga2V5O1xyXG4gICAgICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkRXZlbnQoa2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGtleSBvZiB0aGUgc2VsZWN0ZWQgaXRlbS5cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgb2YgdGhlIHNlbGVjdGVkIGl0ZW0gb3IgbnVsbCBpZiBubyBpdGVtIGlzIHNlbGVjdGVkXHJcbiAgICAgKi9cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJdGVtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhpcyBzZWxlY3Rvci5cclxuICAgICAqL1xyXG4gICAgTGlzdFNlbGVjdG9yLnByb3RvdHlwZS5jbGVhckl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuaXRlbXM7IC8vIGxvY2FsIGNvcHkgZm9yIGl0ZXJhdGlvbiBhZnRlciBjbGVhclxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTsgLy8gY2xlYXIgaXRlbXNcclxuICAgICAgICAvLyBmaXJlIGV2ZW50c1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgaXRlbXNfMSA9IGl0ZW1zOyBfaSA8IGl0ZW1zXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNfMVtfaV07XHJcbiAgICAgICAgICAgIHRoaXMub25JdGVtUmVtb3ZlZEV2ZW50KGl0ZW0ua2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gdGhpcyBzZWxlY3Rvci5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUuaXRlbUNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5sZW5ndGg7XHJcbiAgICB9O1xyXG4gICAgTGlzdFNlbGVjdG9yLnByb3RvdHlwZS5vbkl0ZW1BZGRlZEV2ZW50ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHRoaXMubGlzdFNlbGVjdG9yRXZlbnRzLm9uSXRlbUFkZGVkLmRpc3BhdGNoKHRoaXMsIGtleSk7XHJcbiAgICB9O1xyXG4gICAgTGlzdFNlbGVjdG9yLnByb3RvdHlwZS5vbkl0ZW1SZW1vdmVkRXZlbnQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdGhpcy5saXN0U2VsZWN0b3JFdmVudHMub25JdGVtUmVtb3ZlZC5kaXNwYXRjaCh0aGlzLCBrZXkpO1xyXG4gICAgfTtcclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUub25JdGVtU2VsZWN0ZWRFdmVudCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB0aGlzLmxpc3RTZWxlY3RvckV2ZW50cy5vbkl0ZW1TZWxlY3RlZC5kaXNwYXRjaCh0aGlzLCBrZXkpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0U2VsZWN0b3IucHJvdG90eXBlLCBcIm9uSXRlbUFkZGVkXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gYW4gaXRlbSBpcyBhZGRlZCB0byB0aGUgbGlzdCBvZiBpdGVtcy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8TGlzdFNlbGVjdG9yPENvbmZpZz4sIHN0cmluZz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RTZWxlY3RvckV2ZW50cy5vbkl0ZW1BZGRlZC5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpc3RTZWxlY3Rvci5wcm90b3R5cGUsIFwib25JdGVtUmVtb3ZlZFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIGFuIGl0ZW0gaXMgcmVtb3ZlZCBmcm9tIHRoZSBsaXN0IG9mIGl0ZW1zLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxMaXN0U2VsZWN0b3I8Q29uZmlnPiwgc3RyaW5nPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdFNlbGVjdG9yRXZlbnRzLm9uSXRlbVJlbW92ZWQuZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0U2VsZWN0b3IucHJvdG90eXBlLCBcIm9uSXRlbVNlbGVjdGVkXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gYW4gaXRlbSBpcyBzZWxlY3RlZCBmcm9tIHRoZSBsaXN0IG9mIGl0ZW1zLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxMaXN0U2VsZWN0b3I8Q29uZmlnPiwgc3RyaW5nPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdFNlbGVjdG9yRXZlbnRzLm9uSXRlbVNlbGVjdGVkLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gTGlzdFNlbGVjdG9yO1xyXG59KGNvbXBvbmVudF8xLkNvbXBvbmVudCkpO1xyXG5leHBvcnRzLkxpc3RTZWxlY3RvciA9IExpc3RTZWxlY3RvcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvbGlzdHNlbGVjdG9yLnRzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vdG9nZ2xlYnV0dG9uXCIpO1xyXG4vKipcclxuICogQSBidXR0b24gdGhhdCB0b2dnbGVzIEFwcGxlIG1hY09TIHBpY3R1cmUtaW4tcGljdHVyZSBtb2RlLlxyXG4gKi9cclxudmFyIFBpY3R1cmVJblBpY3R1cmVUb2dnbGVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFBpY3R1cmVJblBpY3R1cmVUb2dnbGVCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQaWN0dXJlSW5QaWN0dXJlVG9nZ2xlQnV0dG9uKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1waXB0b2dnbGVidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnUGljdHVyZS1pbi1QaWN0dXJlJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUGljdHVyZUluUGljdHVyZVRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICBpZiAoIXBsYXllci5pc1BpY3R1cmVJblBpY3R1cmVBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIHBsYXllciBkb2VzIG5vdCBzdXBwb3J0IFBJUCAocGxheWVyIDcuMCksIHdlIGp1c3QgaGlkZSB0aGlzIGNvbXBvbmVudCBhbmQgc2tpcCBjb25maWd1cmF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25DbGljay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzUGljdHVyZUluUGljdHVyZUF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmlzUGljdHVyZUluUGljdHVyZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmV4aXRQaWN0dXJlSW5QaWN0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZW50ZXJQaWN0dXJlSW5QaWN0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uc29sZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQSVAgdW5hdmFpbGFibGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBwaXBBdmFpbGFibGVIYW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNQaWN0dXJlSW5QaWN0dXJlQXZhaWxhYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUkVBRFksIHBpcEF2YWlsYWJsZUhhbmRlcik7XHJcbiAgICAgICAgLy8gVG9nZ2xlIGJ1dHRvbiAnb24nIHN0YXRlXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUElDVFVSRV9JTl9QSUNUVVJFX0VOVEVSLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUElDVFVSRV9JTl9QSUNUVVJFX0VYSVQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMub2ZmKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gU3RhcnR1cCBpbml0XHJcbiAgICAgICAgcGlwQXZhaWxhYmxlSGFuZGVyKCk7IC8vIEhpZGUgYnV0dG9uIGlmIFBJUCBub3QgYXZhaWxhYmxlXHJcbiAgICAgICAgaWYgKHBsYXllci5pc1BpY3R1cmVJblBpY3R1cmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBQaWN0dXJlSW5QaWN0dXJlVG9nZ2xlQnV0dG9uO1xyXG59KHRvZ2dsZWJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbikpO1xyXG5leHBvcnRzLlBpY3R1cmVJblBpY3R1cmVUb2dnbGVCdXR0b24gPSBQaWN0dXJlSW5QaWN0dXJlVG9nZ2xlQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9waWN0dXJlaW5waWN0dXJldG9nZ2xlYnV0dG9uLnRzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHNlbGVjdGJveF8xID0gcmVxdWlyZShcIi4vc2VsZWN0Ym94XCIpO1xyXG4vKipcclxuICogQSBzZWxlY3QgYm94IHByb3ZpZGluZyBhIHNlbGVjdGlvbiBvZiBkaWZmZXJlbnQgcGxheWJhY2sgc3BlZWRzLlxyXG4gKi9cclxudmFyIFBsYXliYWNrU3BlZWRTZWxlY3RCb3ggPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFBsYXliYWNrU3BlZWRTZWxlY3RCb3gsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5YmFja1NwZWVkU2VsZWN0Qm94KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBQbGF5YmFja1NwZWVkU2VsZWN0Qm94LnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmFkZEl0ZW0oJzAuMjUnLCAnMC4yNXgnKTtcclxuICAgICAgICB0aGlzLmFkZEl0ZW0oJzAuNScsICcwLjV4Jyk7XHJcbiAgICAgICAgdGhpcy5hZGRJdGVtKCcxJywgJ05vcm1hbCcpO1xyXG4gICAgICAgIHRoaXMuYWRkSXRlbSgnMS41JywgJzEuNXgnKTtcclxuICAgICAgICB0aGlzLmFkZEl0ZW0oJzInLCAnMngnKTtcclxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oJzEnKTtcclxuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0UGxheWJhY2tTcGVlZChwYXJzZUZsb2F0KHZhbHVlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBsYXliYWNrU3BlZWRTZWxlY3RCb3g7XHJcbn0oc2VsZWN0Ym94XzEuU2VsZWN0Qm94KSk7XHJcbmV4cG9ydHMuUGxheWJhY2tTcGVlZFNlbGVjdEJveCA9IFBsYXliYWNrU3BlZWRTZWxlY3RCb3g7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3BsYXliYWNrc3BlZWRzZWxlY3Rib3gudHNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbnZhciBodWdlcmVwbGF5YnV0dG9uXzEgPSByZXF1aXJlKFwiLi9odWdlcmVwbGF5YnV0dG9uXCIpO1xyXG4vKipcclxuICogT3ZlcmxheXMgdGhlIHBsYXllciBhbmQgZGlzcGxheXMgcmVjb21tZW5kZWQgdmlkZW9zLlxyXG4gKi9cclxudmFyIFJlY29tbWVuZGF0aW9uT3ZlcmxheSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUmVjb21tZW5kYXRpb25PdmVybGF5LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUmVjb21tZW5kYXRpb25PdmVybGF5KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5yZXBsYXlCdXR0b24gPSBuZXcgaHVnZXJlcGxheWJ1dHRvbl8xLkh1Z2VSZXBsYXlCdXR0b24oKTtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1yZWNvbW1lbmRhdGlvbi1vdmVybGF5JyxcclxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbX3RoaXMucmVwbGF5QnV0dG9uXVxyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUmVjb21tZW5kYXRpb25PdmVybGF5LnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjbGVhclJlY29tbWVuZGF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IF90aGlzLmdldENvbXBvbmVudHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgUmVjb21tZW5kYXRpb25JdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMudXBkYXRlQ29tcG9uZW50cygpO1xyXG4gICAgICAgICAgICBfdGhpcy5nZXREb21FbGVtZW50KCkucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdyZWNvbW1lbmRhdGlvbnMnKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgc2V0dXBSZWNvbW1lbmRhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyUmVjb21tZW5kYXRpb25zKCk7XHJcbiAgICAgICAgICAgIHZhciBoYXNSZWNvbW1lbmRhdGlvbnNJblVpQ29uZmlnID0gdWltYW5hZ2VyLmdldENvbmZpZygpLnJlY29tbWVuZGF0aW9uc1xyXG4gICAgICAgICAgICAgICAgJiYgdWltYW5hZ2VyLmdldENvbmZpZygpLnJlY29tbWVuZGF0aW9ucy5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICB2YXIgaGFzUmVjb21tZW5kYXRpb25zSW5QbGF5ZXJDb25maWcgPSBwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlICYmIHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UucmVjb21tZW5kYXRpb25zXHJcbiAgICAgICAgICAgICAgICAmJiBwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlLnJlY29tbWVuZGF0aW9ucy5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAvLyBUYWtlIG1hcmtlcnMgZnJvbSB0aGUgVUkgY29uZmlnLiBJZiBubyBtYXJrZXJzIGRlZmluZWQsIHRyeSB0byB0YWtlIHRoZW0gZnJvbSB0aGUgcGxheWVyJ3Mgc291cmNlIGNvbmZpZy5cclxuICAgICAgICAgICAgdmFyIHJlY29tbWVuZGF0aW9ucyA9IGhhc1JlY29tbWVuZGF0aW9uc0luVWlDb25maWcgPyB1aW1hbmFnZXIuZ2V0Q29uZmlnKCkucmVjb21tZW5kYXRpb25zIDpcclxuICAgICAgICAgICAgICAgIGhhc1JlY29tbWVuZGF0aW9uc0luUGxheWVyQ29uZmlnID8gcGxheWVyLmdldENvbmZpZygpLnNvdXJjZS5yZWNvbW1lbmRhdGlvbnMgOiBudWxsO1xyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aW1lbGluZSBtYXJrZXJzIGZyb20gdGhlIGNvbmZpZyBpZiB3ZSBoYXZlIG1hcmtlcnMgYW5kIGlmIHdlIGhhdmUgYSBkdXJhdGlvblxyXG4gICAgICAgICAgICAvLyBUaGUgZHVyYXRpb24gY2hlY2sgaXMgZm9yIGJ1Z2d5IHBsYXRmb3JtcyB3aGVyZSB0aGUgZHVyYXRpb24gaXMgbm90IGF2YWlsYWJsZSBpbnN0YW50bHkgKENocm9tZSBvbiBBbmRyb2lkIDQuMylcclxuICAgICAgICAgICAgaWYgKHJlY29tbWVuZGF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgcmVjb21tZW5kYXRpb25zXzEgPSByZWNvbW1lbmRhdGlvbnM7IF9pIDwgcmVjb21tZW5kYXRpb25zXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSByZWNvbW1lbmRhdGlvbnNfMVtfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkQ29tcG9uZW50KG5ldyBSZWNvbW1lbmRhdGlvbkl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnOiBpdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NDbGFzc2VzOiBbJ3JlY29tbWVuZGF0aW9uLWl0ZW0tJyArIChpbmRleCsrKV1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVDb21wb25lbnRzKCk7IC8vIGNyZWF0ZSBjb250YWluZXIgRE9NIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXREb21FbGVtZW50KCkuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdyZWNvbW1lbmRhdGlvbnMnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEFkZCByZWNvbW1lbmRhdGlvbiB3aGVuIGEgc291cmNlIGlzIGxvYWRlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBzZXR1cFJlY29tbWVuZGF0aW9ucyk7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHJlY29tbWVuZGF0aW9ucyBhbmQgaGlkZSBvdmVybGF5IHdoZW4gc291cmNlIGlzIHVubG9hZGVkXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU09VUkNFX1VOTE9BREVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyUmVjb21tZW5kYXRpb25zKCk7XHJcbiAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEaXNwbGF5IHJlY29tbWVuZGF0aW9ucyB3aGVuIHBsYXliYWNrIGhhcyBmaW5pc2hlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVlCQUNLX0ZJTklTSEVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIERpc21pc3MgT05fUExBWUJBQ0tfRklOSVNIRUQgZXZlbnRzIGF0IHRoZSBlbmQgb2YgYWRzXHJcbiAgICAgICAgICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd29ya2Fyb3VuZCBvbmNlIGlzc3VlICMxMjc4IGlzIHNvbHZlZFxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzQWQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBIaWRlIHJlY29tbWVuZGF0aW9ucyB3aGVuIHBsYXliYWNrIHN0YXJ0cywgZS5nLiBhIHJlc3RhcnRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QTEFZLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0IG9uIHN0YXJ0dXBcclxuICAgICAgICBzZXR1cFJlY29tbWVuZGF0aW9ucygpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZWNvbW1lbmRhdGlvbk92ZXJsYXk7XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuUmVjb21tZW5kYXRpb25PdmVybGF5ID0gUmVjb21tZW5kYXRpb25PdmVybGF5O1xyXG4vKipcclxuICogQW4gaXRlbSBvZiB0aGUge0BsaW5rIFJlY29tbWVuZGF0aW9uT3ZlcmxheX0uIFVzZWQgb25seSBpbnRlcm5hbGx5IGluIHtAbGluayBSZWNvbW1lbmRhdGlvbk92ZXJsYXl9LlxyXG4gKi9cclxudmFyIFJlY29tbWVuZGF0aW9uSXRlbSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUmVjb21tZW5kYXRpb25JdGVtLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUmVjb21tZW5kYXRpb25JdGVtKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1yZWNvbW1lbmRhdGlvbi1pdGVtJyxcclxuICAgICAgICAgICAgaXRlbUNvbmZpZzogbnVsbCAvLyB0aGlzIG11c3QgYmUgcGFzc2VkIGluIGZyb20gb3V0c2lkZVxyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgUmVjb21tZW5kYXRpb25JdGVtLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY29uZmlnLml0ZW1Db25maWc7IC8vIFRPRE8gZml4IGdlbmVyaWNzIGFuZCBnZXQgcmlkIG9mIGNhc3RcclxuICAgICAgICB2YXIgaXRlbUVsZW1lbnQgPSBuZXcgZG9tXzEuRE9NKCdhJywge1xyXG4gICAgICAgICAgICAnaWQnOiB0aGlzLmNvbmZpZy5pZCxcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5nZXRDc3NDbGFzc2VzKCksXHJcbiAgICAgICAgICAgICdocmVmJzogY29uZmlnLnVybFxyXG4gICAgICAgIH0pLmNzcyh7ICdiYWNrZ3JvdW5kLWltYWdlJzogXCJ1cmwoXCIgKyBjb25maWcudGh1bWJuYWlsICsgXCIpXCIgfSk7XHJcbiAgICAgICAgdmFyIGJnRWxlbWVudCA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ2JhY2tncm91bmQnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGl0ZW1FbGVtZW50LmFwcGVuZChiZ0VsZW1lbnQpO1xyXG4gICAgICAgIHZhciB0aXRsZUVsZW1lbnQgPSBuZXcgZG9tXzEuRE9NKCdzcGFuJywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygndGl0bGUnKVxyXG4gICAgICAgIH0pLmFwcGVuZChuZXcgZG9tXzEuRE9NKCdzcGFuJywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnaW5uZXJ0aXRsZScpXHJcbiAgICAgICAgfSkuaHRtbChjb25maWcudGl0bGUpKTtcclxuICAgICAgICBpdGVtRWxlbWVudC5hcHBlbmQodGl0bGVFbGVtZW50KTtcclxuICAgICAgICB2YXIgdGltZUVsZW1lbnQgPSBuZXcgZG9tXzEuRE9NKCdzcGFuJywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnZHVyYXRpb24nKVxyXG4gICAgICAgIH0pLmFwcGVuZChuZXcgZG9tXzEuRE9NKCdzcGFuJywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnaW5uZXJkdXJhdGlvbicpXHJcbiAgICAgICAgfSkuaHRtbChjb25maWcuZHVyYXRpb24gPyB1dGlsc18xLlN0cmluZ1V0aWxzLnNlY29uZHNUb1RpbWUoY29uZmlnLmR1cmF0aW9uKSA6ICcnKSk7XHJcbiAgICAgICAgaXRlbUVsZW1lbnQuYXBwZW5kKHRpbWVFbGVtZW50KTtcclxuICAgICAgICByZXR1cm4gaXRlbUVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlY29tbWVuZGF0aW9uSXRlbTtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvcmVjb21tZW5kYXRpb25vdmVybGF5LnRzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xyXG52YXIgbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2xhYmVsXCIpO1xyXG52YXIgdmlkZW9xdWFsaXR5c2VsZWN0Ym94XzEgPSByZXF1aXJlKFwiLi92aWRlb3F1YWxpdHlzZWxlY3Rib3hcIik7XHJcbnZhciBhdWRpb3F1YWxpdHlzZWxlY3Rib3hfMSA9IHJlcXVpcmUoXCIuL2F1ZGlvcXVhbGl0eXNlbGVjdGJveFwiKTtcclxudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuLi90aW1lb3V0XCIpO1xyXG52YXIgZXZlbnRkaXNwYXRjaGVyXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRkaXNwYXRjaGVyXCIpO1xyXG4vKipcclxuICogQSBwYW5lbCBjb250YWluaW5nIGEgbGlzdCBvZiB7QGxpbmsgU2V0dGluZ3NQYW5lbEl0ZW0gaXRlbXN9IHRoYXQgcmVwcmVzZW50IGxhYmVsbGVkIHNldHRpbmdzLlxyXG4gKi9cclxudmFyIFNldHRpbmdzUGFuZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNldHRpbmdzUGFuZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZXR0aW5nc1BhbmVsKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zZXR0aW5nc1BhbmVsRXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvblNldHRpbmdzU3RhdGVDaGFuZ2VkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXNldHRpbmdzLXBhbmVsJyxcclxuICAgICAgICAgICAgaGlkZURlbGF5OiAzMDAwXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTZXR0aW5nc1BhbmVsLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpOyAvLyBUT0RPIGZpeCBnZW5lcmljcyB0eXBlIGluZmVyZW5jZVxyXG4gICAgICAgIGlmIChjb25maWcuaGlkZURlbGF5ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dCA9IG5ldyB0aW1lb3V0XzEuVGltZW91dChjb25maWcuaGlkZURlbGF5LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hvdy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGltZW91dCB3aGVuIHNob3duXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlVGltZW91dC5zdGFydCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBtb3VzZSBlbnRlciBjbGVhciB0aGUgdGltZW91dFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZVRpbWVvdXQuY2xlYXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gT24gbW91c2UgbGVhdmUgYWN0aXZhdGUgdGhlIHRpbWVvdXRcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVUaW1lb3V0LnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uSGlkZS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgdGltZW91dCB3aGVuIGhpZGRlbiBmcm9tIG91dHNpZGVcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVUaW1lb3V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGaXJlIGV2ZW50IHdoZW4gdGhlIHN0YXRlIG9mIGEgc2V0dGluZ3MtaXRlbSBoYXMgY2hhbmdlZFxyXG4gICAgICAgIHZhciBzZXR0aW5nc1N0YXRlQ2hhbmdlZEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9uU2V0dGluZ3NTdGF0ZUNoYW5nZWRFdmVudCgpO1xyXG4gICAgICAgICAgICAvLyBBdHRhY2ggbWFya2VyIGNsYXNzIHRvIGxhc3QgdmlzaWJsZSBpdGVtXHJcbiAgICAgICAgICAgIHZhciBsYXN0U2hvd25JdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IF90aGlzLmdldEl0ZW1zKCk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIFNldHRpbmdzUGFuZWxJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoU2V0dGluZ3NQYW5lbC5DTEFTU19MQVNUKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5pc1Nob3duKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNob3duSXRlbSA9IGNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxhc3RTaG93bkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxhc3RTaG93bkl0ZW0uZ2V0RG9tRWxlbWVudCgpLmFkZENsYXNzKF90aGlzLnByZWZpeENzcyhTZXR0aW5nc1BhbmVsLkNMQVNTX0xBU1QpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuZ2V0SXRlbXMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IF9hW19pXTtcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIFNldHRpbmdzUGFuZWxJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQub25BY3RpdmVDaGFuZ2VkLnN1YnNjcmliZShzZXR0aW5nc1N0YXRlQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNldHRpbmdzUGFuZWwucHJvdG90eXBlLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5yZWxlYXNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaGlkZVRpbWVvdXQpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dC5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGVyZSBhcmUgYWN0aXZlIHNldHRpbmdzIHdpdGhpbiB0aGlzIHNldHRpbmdzIHBhbmVsLiBBbiBhY3RpdmUgc2V0dGluZyBpcyBhIHNldHRpbmcgdGhhdCBpcyB2aXNpYmxlXHJcbiAgICAgKiBhbmQgZW5hYmxlZCwgd2hpY2ggdGhlIHVzZXIgY2FuIGludGVyYWN0IHdpdGguXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGVyZSBhcmUgYWN0aXZlIHNldHRpbmdzLCBmYWxzZSBpZiB0aGUgcGFuZWwgaXMgZnVuY3Rpb25hbGx5IGVtcHR5IHRvIGEgdXNlclxyXG4gICAgICovXHJcbiAgICBTZXR0aW5nc1BhbmVsLnByb3RvdHlwZS5oYXNBY3RpdmVTZXR0aW5ncyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5nZXRJdGVtcygpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICBTZXR0aW5nc1BhbmVsLnByb3RvdHlwZS5nZXRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuY29tcG9uZW50cztcclxuICAgIH07XHJcbiAgICBTZXR0aW5nc1BhbmVsLnByb3RvdHlwZS5vblNldHRpbmdzU3RhdGVDaGFuZ2VkRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsRXZlbnRzLm9uU2V0dGluZ3NTdGF0ZUNoYW5nZWQuZGlzcGF0Y2godGhpcyk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldHRpbmdzUGFuZWwucHJvdG90eXBlLCBcIm9uU2V0dGluZ3NTdGF0ZUNoYW5nZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiBvbmUgb3IgbW9yZSB7QGxpbmsgU2V0dGluZ3NQYW5lbEl0ZW0gaXRlbXN9IGhhdmUgY2hhbmdlZCBzdGF0ZS5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8U2V0dGluZ3NQYW5lbCwgTm9BcmdzPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NQYW5lbEV2ZW50cy5vblNldHRpbmdzU3RhdGVDaGFuZ2VkLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gU2V0dGluZ3NQYW5lbDtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuU2V0dGluZ3NQYW5lbC5DTEFTU19MQVNUID0gJ2xhc3QnO1xyXG5leHBvcnRzLlNldHRpbmdzUGFuZWwgPSBTZXR0aW5nc1BhbmVsO1xyXG4vKipcclxuICogQW4gaXRlbSBmb3IgYSB7QGxpbmsgU2V0dGluZ3NQYW5lbH0sIGNvbnRhaW5pbmcgYSB7QGxpbmsgTGFiZWx9IGFuZCBhIGNvbXBvbmVudCB0aGF0IGNvbmZpZ3VyZXMgYSBzZXR0aW5nLlxyXG4gKiBTdXBwb3J0ZWQgc2V0dGluZyBjb21wb25lbnRzOiB7QGxpbmsgU2VsZWN0Qm94fVxyXG4gKi9cclxudmFyIFNldHRpbmdzUGFuZWxJdGVtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTZXR0aW5nc1BhbmVsSXRlbSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFNldHRpbmdzUGFuZWxJdGVtKGxhYmVsLCBzZWxlY3RCb3gsIGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zZXR0aW5nc1BhbmVsSXRlbUV2ZW50cyA9IHtcclxuICAgICAgICAgICAgb25BY3RpdmVDaGFuZ2VkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLmxhYmVsID0gbmV3IGxhYmVsXzEuTGFiZWwoeyB0ZXh0OiBsYWJlbCB9KTtcclxuICAgICAgICBfdGhpcy5zZXR0aW5nID0gc2VsZWN0Qm94O1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXNldHRpbmdzLXBhbmVsLWl0ZW0nLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbX3RoaXMubGFiZWwsIF90aGlzLnNldHRpbmddXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTZXR0aW5nc1BhbmVsSXRlbS5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaGFuZGxlQ29uZmlnSXRlbUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBtaW5pbXVtIG51bWJlciBvZiBpdGVtcyB0aGF0IG11c3QgYmUgYXZhaWxhYmxlIGZvciB0aGUgc2V0dGluZyB0byBiZSBkaXNwbGF5ZWRcclxuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgYXQgbGVhc3QgdHdvIGl0ZW1zIG11c3QgYmUgYXZhaWxhYmxlLCBlbHNlIGEgc2VsZWN0aW9uIGlzIG5vdCBwb3NzaWJsZVxyXG4gICAgICAgICAgICB2YXIgbWluSXRlbXNUb0Rpc3BsYXkgPSAyO1xyXG4gICAgICAgICAgICAvLyBBdWRpby92aWRlbyBxdWFsaXR5IHNlbGVjdCBib3hlcyBjb250YWluIGFuIGFkZGl0aW9uYWwgJ2F1dG8nIG1vZGUsIHdoaWNoIGluIGNvbWJpbmF0aW9uIHdpdGggYSBzaW5nbGVcclxuICAgICAgICAgICAgLy8gYXZhaWxhYmxlIHF1YWxpdHkgYWxzbyBkb2VzIG5vdCBtYWtlIHNlbnNlXHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5zZXR0aW5nIGluc3RhbmNlb2YgdmlkZW9xdWFsaXR5c2VsZWN0Ym94XzEuVmlkZW9RdWFsaXR5U2VsZWN0Qm94IHx8IF90aGlzLnNldHRpbmcgaW5zdGFuY2VvZiBhdWRpb3F1YWxpdHlzZWxlY3Rib3hfMS5BdWRpb1F1YWxpdHlTZWxlY3RCb3gpIHtcclxuICAgICAgICAgICAgICAgIG1pbkl0ZW1zVG9EaXNwbGF5ID0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBzZXR0aW5nIGlmIG5vIG1lYW5pbmdmdWwgY2hvaWNlIGlzIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuc2V0dGluZy5pdGVtQ291bnQoKSA8IG1pbkl0ZW1zVG9EaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVmlzaWJpbGl0eSBtaWdodCBoYXZlIGNoYW5nZWQgYW5kIHRoZXJlZm9yZSB0aGUgYWN0aXZlIHN0YXRlIG1pZ2h0IGhhdmUgY2hhbmdlZCBzbyB3ZSBmaXJlIHRoZSBldmVudFxyXG4gICAgICAgICAgICAvLyBUT0RPIGZpcmUgb25seSB3aGVuIHN0YXRlIGhhcyByZWFsbHkgY2hhbmdlZCAoZS5nLiBjaGVjayBpZiB2aXNpYmlsaXR5IGhhcyByZWFsbHkgY2hhbmdlZClcclxuICAgICAgICAgICAgX3RoaXMub25BY3RpdmVDaGFuZ2VkRXZlbnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2V0dGluZy5vbkl0ZW1BZGRlZC5zdWJzY3JpYmUoaGFuZGxlQ29uZmlnSXRlbUNoYW5nZWQpO1xyXG4gICAgICAgIHRoaXMuc2V0dGluZy5vbkl0ZW1SZW1vdmVkLnN1YnNjcmliZShoYW5kbGVDb25maWdJdGVtQ2hhbmdlZCk7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBoaWRkZW4gc3RhdGVcclxuICAgICAgICBoYW5kbGVDb25maWdJdGVtQ2hhbmdlZCgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgc2V0dGluZ3MgcGFuZWwgaXRlbSBpcyBhY3RpdmUsIGkuZS4gdmlzaWJsZSBhbmQgZW5hYmxlZCBhbmQgYSB1c2VyIGNhbiBpbnRlcmFjdCB3aXRoIGl0LlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIHBhbmVsIGlzIGFjdGl2ZSwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBTZXR0aW5nc1BhbmVsSXRlbS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTaG93bigpO1xyXG4gICAgfTtcclxuICAgIFNldHRpbmdzUGFuZWxJdGVtLnByb3RvdHlwZS5vbkFjdGl2ZUNoYW5nZWRFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWxJdGVtRXZlbnRzLm9uQWN0aXZlQ2hhbmdlZC5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0dGluZ3NQYW5lbEl0ZW0ucHJvdG90eXBlLCBcIm9uQWN0aXZlQ2hhbmdlZFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSAnYWN0aXZlJyBzdGF0ZSBvZiB0aGlzIGl0ZW0gY2hhbmdlcy5cclxuICAgICAgICAgKiBAc2VlICNpc0FjdGl2ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxTZXR0aW5nc1BhbmVsSXRlbSwgTm9BcmdzPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NQYW5lbEl0ZW1FdmVudHMub25BY3RpdmVDaGFuZ2VkLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gU2V0dGluZ3NQYW5lbEl0ZW07XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuU2V0dGluZ3NQYW5lbEl0ZW0gPSBTZXR0aW5nc1BhbmVsSXRlbTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvc2V0dGluZ3NwYW5lbC50c1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL3RvZ2dsZWJ1dHRvblwiKTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIHRoYXQgdG9nZ2xlcyB2aXNpYmlsaXR5IG9mIGEgc2V0dGluZ3MgcGFuZWwuXHJcbiAqL1xyXG52YXIgU2V0dGluZ3NUb2dnbGVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNldHRpbmdzVG9nZ2xlQnV0dG9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gU2V0dGluZ3NUb2dnbGVCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIGlmICghY29uZmlnLnNldHRpbmdzUGFuZWwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBTZXR0aW5nc1BhbmVsIGlzIG1pc3NpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktc2V0dGluZ3N0b2dnbGVidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnU2V0dGluZ3MnLFxyXG4gICAgICAgICAgICBzZXR0aW5nc1BhbmVsOiBudWxsLFxyXG4gICAgICAgICAgICBhdXRvSGlkZVdoZW5Ob0FjdGl2ZVNldHRpbmdzOiB0cnVlXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTZXR0aW5nc1RvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTsgLy8gVE9ETyBmaXggZ2VuZXJpY3MgdHlwZSBpbmZlcmVuY2VcclxuICAgICAgICB2YXIgc2V0dGluZ3NQYW5lbCA9IGNvbmZpZy5zZXR0aW5nc1BhbmVsO1xyXG4gICAgICAgIHRoaXMub25DbGljay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZXR0aW5nc1BhbmVsLnRvZ2dsZUhpZGRlbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldHRpbmdzUGFuZWwub25TaG93LnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB0b2dnbGUgc3RhdHVzIHRvIG9uIHdoZW4gdGhlIHNldHRpbmdzIHBhbmVsIHNob3dzXHJcbiAgICAgICAgICAgIF90aGlzLm9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0dGluZ3NQYW5lbC5vbkhpZGUuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gU2V0IHRvZ2dsZSBzdGF0dXMgdG8gb2ZmIHdoZW4gdGhlIHNldHRpbmdzIHBhbmVsIGhpZGVzXHJcbiAgICAgICAgICAgIF90aGlzLm9mZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEhhbmRsZSBhdXRvbWF0aWMgaGlkaW5nIG9mIHRoZSBidXR0b24gaWYgdGhlcmUgYXJlIG5vIHNldHRpbmdzIGZvciB0aGUgdXNlciB0byBpbnRlcmFjdCB3aXRoXHJcbiAgICAgICAgaWYgKGNvbmZpZy5hdXRvSGlkZVdoZW5Ob0FjdGl2ZVNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIC8vIFNldHVwIGhhbmRsZXIgdG8gc2hvdy9oaWRlIGJ1dHRvbiB3aGVuIHRoZSBzZXR0aW5ncyBjaGFuZ2VcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzUGFuZWxJdGVtc0NoYW5nZWRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzUGFuZWwuaGFzQWN0aXZlU2V0dGluZ3MoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc0hpZGRlbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNTaG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIFdpcmUgdGhlIGhhbmRsZXIgdG8gdGhlIGV2ZW50XHJcbiAgICAgICAgICAgIHNldHRpbmdzUGFuZWwub25TZXR0aW5nc1N0YXRlQ2hhbmdlZC5zdWJzY3JpYmUoc2V0dGluZ3NQYW5lbEl0ZW1zQ2hhbmdlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAvLyBDYWxsIGhhbmRsZXIgZm9yIGZpcnN0IGluaXQgYXQgc3RhcnR1cFxyXG4gICAgICAgICAgICBzZXR0aW5nc1BhbmVsSXRlbXNDaGFuZ2VkSGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gU2V0dGluZ3NUb2dnbGVCdXR0b247XHJcbn0odG9nZ2xlYnV0dG9uXzEuVG9nZ2xlQnV0dG9uKSk7XHJcbmV4cG9ydHMuU2V0dGluZ3NUb2dnbGVCdXR0b24gPSBTZXR0aW5nc1RvZ2dsZUJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvc2V0dGluZ3N0b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgc2VsZWN0Ym94XzEgPSByZXF1aXJlKFwiLi9zZWxlY3Rib3hcIik7XHJcbi8qKlxyXG4gKiBBIHNlbGVjdCBib3ggcHJvdmlkaW5nIGEgc2VsZWN0aW9uIGJldHdlZW4gYXZhaWxhYmxlIHN1YnRpdGxlIGFuZCBjYXB0aW9uIHRyYWNrcy5cclxuICovXHJcbnZhciBTdWJ0aXRsZVNlbGVjdEJveCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU3VidGl0bGVTZWxlY3RCb3gsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTdWJ0aXRsZVNlbGVjdEJveChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgU3VidGl0bGVTZWxlY3RCb3gucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIHVwZGF0ZVN1YnRpdGxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuY2xlYXJJdGVtcygpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gcGxheWVyLmdldEF2YWlsYWJsZVN1YnRpdGxlcygpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1YnRpdGxlID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRkSXRlbShzdWJ0aXRsZS5pZCwgc3VidGl0bGUubGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2V0U3VidGl0bGUodmFsdWUgPT09ICdudWxsJyA/IG51bGwgOiB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gUmVhY3QgdG8gQVBJIGV2ZW50c1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NVQlRJVExFX0FEREVELCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRkSXRlbShldmVudC5zdWJ0aXRsZS5pZCwgZXZlbnQuc3VidGl0bGUubGFiZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NVQlRJVExFX0NIQU5HRUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZWxlY3RJdGVtKGV2ZW50LnRhcmdldFN1YnRpdGxlLmlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TVUJUSVRMRV9SRU1PVkVELCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgX3RoaXMucmVtb3ZlSXRlbShldmVudC5zdWJ0aXRsZUlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBVcGRhdGUgc3VidGl0bGVzIHdoZW4gc291cmNlIGdvZXMgYXdheVxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NPVVJDRV9VTkxPQURFRCwgdXBkYXRlU3VidGl0bGVzKTtcclxuICAgICAgICAvLyBVcGRhdGUgc3VidGl0bGVzIHdoZW4gYSBuZXcgc291cmNlIGlzIGxvYWRlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCB1cGRhdGVTdWJ0aXRsZXMpO1xyXG4gICAgICAgIC8vIFBvcHVsYXRlIHN1YnRpdGxlcyBhdCBzdGFydHVwXHJcbiAgICAgICAgdXBkYXRlU3VidGl0bGVzKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFN1YnRpdGxlU2VsZWN0Qm94O1xyXG59KHNlbGVjdGJveF8xLlNlbGVjdEJveCkpO1xyXG5leHBvcnRzLlN1YnRpdGxlU2VsZWN0Qm94ID0gU3VidGl0bGVTZWxlY3RCb3g7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3N1YnRpdGxlc2VsZWN0Ym94LnRzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xyXG52YXIgbWV0YWRhdGFsYWJlbF8xID0gcmVxdWlyZShcIi4vbWV0YWRhdGFsYWJlbFwiKTtcclxuLyoqXHJcbiAqIERpc3BsYXlzIGEgdGl0bGUgYmFyIGNvbnRhaW5pbmcgYSBsYWJlbCB3aXRoIHRoZSB0aXRsZSBvZiB0aGUgdmlkZW8uXHJcbiAqL1xyXG52YXIgVGl0bGVCYXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFRpdGxlQmFyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVGl0bGVCYXIoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXRpdGxlYmFyJyxcclxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICBuZXcgbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWwoeyBjb250ZW50OiBtZXRhZGF0YWxhYmVsXzEuTWV0YWRhdGFMYWJlbENvbnRlbnQuVGl0bGUgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWwoeyBjb250ZW50OiBtZXRhZGF0YWxhYmVsXzEuTWV0YWRhdGFMYWJlbENvbnRlbnQuRGVzY3JpcHRpb24gfSlcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAga2VlcEhpZGRlbldpdGhvdXRNZXRhZGF0YTogZmFsc2UsXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBUaXRsZUJhci5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcclxuICAgICAgICB2YXIgc2hvdWxkQmVTaG93biA9ICF0aGlzLmlzSGlkZGVuKCk7XHJcbiAgICAgICAgdmFyIGhhc01ldGFkYXRhVGV4dCA9IHRydWU7IC8vIEZsYWcgdG8gdHJhY2sgaWYgYW55IG1ldGFkYXRhIGxhYmVsIGNvbnRhaW5zIHRleHRcclxuICAgICAgICB2YXIgY2hlY2tNZXRhZGF0YVRleHRBbmRVcGRhdGVWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoYXNNZXRhZGF0YVRleHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIG1ldGFkYXRhIGxhYmVscyBhbmQgY2hlY2sgaWYgYXQgbGVhc3Qgb25lIG9mIHRoZW0gY29udGFpbnMgdGV4dFxyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gX3RoaXMuZ2V0Q29tcG9uZW50cygpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBtZXRhZGF0YWxhYmVsXzEuTWV0YWRhdGFMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29tcG9uZW50LmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNNZXRhZGF0YVRleHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90aGlzLmlzU2hvd24oKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBhIHZpc2libGUgdGl0bGViYXIgaWYgaXQgZG9lcyBub3QgY29udGFpbiBhbnkgdGV4dCBhbmQgdGhlIGhpZGRlbiBmbGFnIGlzIHNldFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5rZWVwSGlkZGVuV2l0aG91dE1ldGFkYXRhICYmICFoYXNNZXRhZGF0YVRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2hvdWxkQmVTaG93bikge1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBhIGhpZGRlbiB0aXRsZWJhciBpZiBpdCBzaG91bGQgYWN0dWFsbHkgYmUgc2hvd25cclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gTGlzdGVuIHRvIHRleHQgY2hhbmdlIGV2ZW50cyB0byB1cGRhdGUgdGhlIGhhc01ldGFkYXRhVGV4dCBmbGFnIHdoZW4gdGhlIG1ldGFkYXRhIGR5bmFtaWNhbGx5IGNoYW5nZXNcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5nZXRDb21wb25lbnRzKCk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBtZXRhZGF0YWxhYmVsXzEuTWV0YWRhdGFMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Lm9uVGV4dENoYW5nZWQuc3Vic2NyaWJlKGNoZWNrTWV0YWRhdGFUZXh0QW5kVXBkYXRlVmlzaWJpbGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29udHJvbHNTaG93LnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3VsZEJlU2hvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoIShjb25maWcua2VlcEhpZGRlbldpdGhvdXRNZXRhZGF0YSAmJiAhaGFzTWV0YWRhdGFUZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29udHJvbHNIaWRlLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNob3VsZEJlU2hvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGluaXRcclxuICAgICAgICBjaGVja01ldGFkYXRhVGV4dEFuZFVwZGF0ZVZpc2liaWxpdHkoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVGl0bGVCYXI7XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuVGl0bGVCYXIgPSBUaXRsZUJhcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvdGl0bGViYXIudHNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRcIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuLi9kb21cIik7XHJcbi8qKlxyXG4gKiBBbmltYXRlZCBhbmFsb2cgVFYgc3RhdGljIG5vaXNlLlxyXG4gKi9cclxudmFyIFR2Tm9pc2VDYW52YXMgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFR2Tm9pc2VDYW52YXMsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBUdk5vaXNlQ2FudmFzKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jYW52YXNXaWR0aCA9IDE2MDtcclxuICAgICAgICBfdGhpcy5jYW52YXNIZWlnaHQgPSA5MDtcclxuICAgICAgICBfdGhpcy5pbnRlcmZlcmVuY2VIZWlnaHQgPSA1MDtcclxuICAgICAgICBfdGhpcy5sYXN0RnJhbWVVcGRhdGUgPSAwO1xyXG4gICAgICAgIF90aGlzLmZyYW1lSW50ZXJ2YWwgPSA2MDtcclxuICAgICAgICBfdGhpcy51c2VBbmltYXRpb25GcmFtZSA9ICEhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS10dm5vaXNlY2FudmFzJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgVHZOb2lzZUNhbnZhcy5wcm90b3R5cGUudG9Eb21FbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcyA9IG5ldyBkb21fMS5ET00oJ2NhbnZhcycsIHsgJ2NsYXNzJzogdGhpcy5nZXRDc3NDbGFzc2VzKCkgfSk7XHJcbiAgICB9O1xyXG4gICAgVHZOb2lzZUNhbnZhcy5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNFbGVtZW50ID0gdGhpcy5jYW52YXMuZ2V0RWxlbWVudHMoKVswXTtcclxuICAgICAgICB0aGlzLmNhbnZhc0NvbnRleHQgPSB0aGlzLmNhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLm5vaXNlQW5pbWF0aW9uV2luZG93UG9zID0gLXRoaXMuY2FudmFzSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubGFzdEZyYW1lVXBkYXRlID0gMDtcclxuICAgICAgICB0aGlzLmNhbnZhc0VsZW1lbnQud2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xyXG4gICAgICAgIHRoaXMuY2FudmFzRWxlbWVudC5oZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcclxuICAgICAgICB0aGlzLnJlbmRlckZyYW1lKCk7XHJcbiAgICB9O1xyXG4gICAgVHZOb2lzZUNhbnZhcy5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VBbmltYXRpb25GcmFtZSkge1xyXG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lVXBkYXRlSGFuZGxlcklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZyYW1lVXBkYXRlSGFuZGxlcklkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgVHZOb2lzZUNhbnZhcy5wcm90b3R5cGUucmVuZGVyRnJhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBjb2RlIGhhcyBiZWVuIGNvcGllZCBmcm9tIHRoZSBwbGF5ZXIgY29udHJvbHMuanMgYW5kIHNpbXBsaWZpZWRcclxuICAgICAgICBpZiAodGhpcy5sYXN0RnJhbWVVcGRhdGUgKyB0aGlzLmZyYW1lSW50ZXJ2YWwgPiBuZXcgRGF0ZSgpLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAvLyBJdCdzIHRvbyBlYXJseSB0byByZW5kZXIgdGhlIG5leHQgZnJhbWVcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU5leHRSZW5kZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudFBpeGVsT2Zmc2V0O1xyXG4gICAgICAgIHZhciBjYW52YXNXaWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdmFyIGNhbnZhc0hlaWdodCA9IHRoaXMuY2FudmFzSGVpZ2h0O1xyXG4gICAgICAgIC8vIENyZWF0ZSB0ZXh0dXJlXHJcbiAgICAgICAgdmFyIG5vaXNlSW1hZ2UgPSB0aGlzLmNhbnZhc0NvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpO1xyXG4gICAgICAgIC8vIEZpbGwgdGV4dHVyZSB3aXRoIG5vaXNlXHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBjYW52YXNIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGNhbnZhc1dpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQaXhlbE9mZnNldCA9IChjYW52YXNXaWR0aCAqIHkgKiA0KSArIHggKiA0O1xyXG4gICAgICAgICAgICAgICAgbm9pc2VJbWFnZS5kYXRhW2N1cnJlbnRQaXhlbE9mZnNldF0gPSBNYXRoLnJhbmRvbSgpICogMjU1O1xyXG4gICAgICAgICAgICAgICAgaWYgKHkgPCB0aGlzLm5vaXNlQW5pbWF0aW9uV2luZG93UG9zIHx8IHkgPiB0aGlzLm5vaXNlQW5pbWF0aW9uV2luZG93UG9zICsgdGhpcy5pbnRlcmZlcmVuY2VIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2lzZUltYWdlLmRhdGFbY3VycmVudFBpeGVsT2Zmc2V0XSAqPSAwLjg1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9pc2VJbWFnZS5kYXRhW2N1cnJlbnRQaXhlbE9mZnNldCArIDFdID0gbm9pc2VJbWFnZS5kYXRhW2N1cnJlbnRQaXhlbE9mZnNldF07XHJcbiAgICAgICAgICAgICAgICBub2lzZUltYWdlLmRhdGFbY3VycmVudFBpeGVsT2Zmc2V0ICsgMl0gPSBub2lzZUltYWdlLmRhdGFbY3VycmVudFBpeGVsT2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgIG5vaXNlSW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxPZmZzZXQgKyAzXSA9IDUwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFB1dCB0ZXh0dXJlIG9udG8gY2FudmFzXHJcbiAgICAgICAgdGhpcy5jYW52YXNDb250ZXh0LnB1dEltYWdlRGF0YShub2lzZUltYWdlLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmxhc3RGcmFtZVVwZGF0ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMubm9pc2VBbmltYXRpb25XaW5kb3dQb3MgKz0gNztcclxuICAgICAgICBpZiAodGhpcy5ub2lzZUFuaW1hdGlvbldpbmRvd1BvcyA+IGNhbnZhc0hlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vaXNlQW5pbWF0aW9uV2luZG93UG9zID0gLWNhbnZhc0hlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU5leHRSZW5kZXIoKTtcclxuICAgIH07XHJcbiAgICBUdk5vaXNlQ2FudmFzLnByb3RvdHlwZS5zY2hlZHVsZU5leHRSZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlQW5pbWF0aW9uRnJhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZVVwZGF0ZUhhbmRsZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJGcmFtZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVVcGRhdGVIYW5kbGVySWQgPSBzZXRUaW1lb3V0KHRoaXMucmVuZGVyRnJhbWUuYmluZCh0aGlzKSwgdGhpcy5mcmFtZUludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFR2Tm9pc2VDYW52YXM7XHJcbn0oY29tcG9uZW50XzEuQ29tcG9uZW50KSk7XHJcbmV4cG9ydHMuVHZOb2lzZUNhbnZhcyA9IFR2Tm9pc2VDYW52YXM7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3R2bm9pc2VjYW52YXMudHNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdG9nZ2xlYnV0dG9uXzEgPSByZXF1aXJlKFwiLi90b2dnbGVidXR0b25cIik7XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiB0aGF0IHRvZ2dsZXMgdGhlIHZpZGVvIHZpZXcgYmV0d2VlbiBub3JtYWwvbW9ubyBhbmQgVlIvc3RlcmVvLlxyXG4gKi9cclxudmFyIFZSVG9nZ2xlQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWUlRvZ2dsZUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZSVG9nZ2xlQnV0dG9uKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS12cnRvZ2dsZWJ1dHRvbicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdWUidcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFZSVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBpc1ZSQ29uZmlndXJlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gVlIgYXZhaWxhYmlsaXR5IGNhbm5vdCBiZSBjaGVja2VkIHRocm91Z2ggZ2V0VlJTdGF0dXMoKSBiZWNhdXNlIGl0IGlzIGFzeW5jaHJvbm91c2x5IHBvcHVsYXRlZCBhbmQgbm90XHJcbiAgICAgICAgICAgIC8vIGF2YWlsYWJsZSBhdCBVSSBpbml0aWFsaXphdGlvbi4gQXMgYW4gYWx0ZXJuYXRpdmUsIHdlIGNoZWNrIHRoZSBWUiBzZXR0aW5ncyBpbiB0aGUgY29uZmlnLlxyXG4gICAgICAgICAgICAvLyBUT0RPIHVzZSBnZXRWUlN0YXR1cygpIHRocm91Z2ggaXNWUlN0ZXJlb0F2YWlsYWJsZSgpIG9uY2UgdGhlIHBsYXllciBoYXMgYmVlbiByZXdyaXR0ZW4gYW5kIHRoZSBzdGF0dXMgaXNcclxuICAgICAgICAgICAgLy8gYXZhaWxhYmxlIGluIE9OX1JFQURZXHJcbiAgICAgICAgICAgIHZhciBjb25maWcgPSBwbGF5ZXIuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWcuc291cmNlICYmIGNvbmZpZy5zb3VyY2UudnIgJiYgY29uZmlnLnNvdXJjZS52ci5jb250ZW50VHlwZSAhPT0gJ25vbmUnO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGlzVlJTdGVyZW9BdmFpbGFibGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXIuZ2V0VlJTdGF0dXMoKS5jb250ZW50VHlwZSAhPT0gJ25vbmUnO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHZyU3RhdGVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoaXNWUkNvbmZpZ3VyZWQoKSAmJiBpc1ZSU3RlcmVvQXZhaWxhYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTsgLy8gc2hvdyBidXR0b24gaW4gY2FzZSBpdCBpcyBoaWRkZW5cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0VlJTdGF0dXMoKS5pc1N0ZXJlbykge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vZmYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTsgLy8gaGlkZSBidXR0b24gaWYgbm8gc3RlcmVvIG1vZGUgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB2ckJ1dHRvblZpc2liaWxpdHlIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoaXNWUkNvbmZpZ3VyZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9WUl9NT0RFX0NIQU5HRUQsIHZyU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9WUl9TVEVSRU9fQ0hBTkdFRCwgdnJTdGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1ZSX0VSUk9SLCB2clN0YXRlSGFuZGxlcik7XHJcbiAgICAgICAgLy8gSGlkZSBidXR0b24gd2hlbiBWUiBzb3VyY2UgZ29lcyBhd2F5XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU09VUkNFX1VOTE9BREVELCB2ckJ1dHRvblZpc2liaWxpdHlIYW5kbGVyKTtcclxuICAgICAgICAvLyBTaG93IGJ1dHRvbiB3aGVuIGEgbmV3IHNvdXJjZSBpcyBsb2FkZWQgYW5kIGl0J3MgVlJcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9SRUFEWSwgdnJCdXR0b25WaXNpYmlsaXR5SGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNWUlN0ZXJlb0F2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uc29sZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBWUiBjb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmdldFZSU3RhdHVzKCkuaXNTdGVyZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuc2V0VlJTdGVyZW8oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnNldFZSU3RlcmVvKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gU2V0IHN0YXJ0dXAgdmlzaWJpbGl0eVxyXG4gICAgICAgIHZyQnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJUb2dnbGVCdXR0b247XHJcbn0odG9nZ2xlYnV0dG9uXzEuVG9nZ2xlQnV0dG9uKSk7XHJcbmV4cG9ydHMuVlJUb2dnbGVCdXR0b24gPSBWUlRvZ2dsZUJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvdnJ0b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY2xpY2tvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jbGlja292ZXJsYXlcIik7XHJcbi8qKlxyXG4gKiBBIHdhdGVybWFyayBvdmVybGF5IHdpdGggYSBjbGlja2FibGUgbG9nby5cclxuICovXHJcbnZhciBXYXRlcm1hcmsgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFdhdGVybWFyaywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFdhdGVybWFyayhjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktd2F0ZXJtYXJrJyxcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cubW92aW5naW1hZ2UuY29tJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFdhdGVybWFyaztcclxufShjbGlja292ZXJsYXlfMS5DbGlja092ZXJsYXkpKTtcclxuZXhwb3J0cy5XYXRlcm1hcmsgPSBXYXRlcm1hcms7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3dhdGVybWFyay50c1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEd1aWQ7XHJcbihmdW5jdGlvbiAoR3VpZCkge1xyXG4gICAgdmFyIGd1aWQgPSAxO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICByZXR1cm4gZ3VpZCsrO1xyXG4gICAgfVxyXG4gICAgR3VpZC5uZXh0ID0gbmV4dDtcclxufSkoR3VpZCA9IGV4cG9ydHMuR3VpZCB8fCAoZXhwb3J0cy5HdWlkID0ge30pKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2d1aWQudHNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdWljb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdWljb250YWluZXJcIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jb21wb25lbnRcIik7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29udGFpbmVyXCIpO1xyXG52YXIgcGxheWJhY2t0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvcGxheWJhY2t0b2dnbGVidXR0b25cIik7XHJcbnZhciBzZWVrYmFyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlZWtiYXJcIik7XHJcbnZhciBwbGF5YmFja3RpbWVsYWJlbF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9wbGF5YmFja3RpbWVsYWJlbFwiKTtcclxudmFyIGNvbnRyb2xiYXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29udHJvbGJhclwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4vZXZlbnRkaXNwYXRjaGVyXCIpO1xyXG52YXIgc2Vla2JhcmxhYmVsXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlZWtiYXJsYWJlbFwiKTtcclxudmFyIHN1YnRpdGxlb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zdWJ0aXRsZW92ZXJsYXlcIik7XHJcbnZhciB2b2x1bWVjb250cm9sYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3ZvbHVtZWNvbnRyb2xidXR0b25cIik7XHJcbnZhciBlcnJvcm1lc3NhZ2VvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2Vycm9ybWVzc2FnZW92ZXJsYXlcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbnZhciBhdWRpb29ubHlvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2F1ZGlvb25seW92ZXJsYXlcIik7XHJcbnZhciBwbGF5YmFja3RvZ2dsZW92ZXJsYXlfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvcGxheWJhY2t0b2dnbGVvdmVybGF5XCIpO1xyXG52YXIgVUlNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFVJTWFuYWdlcihwbGF5ZXIsIHBsYXllclVpT3JVaVZhcmlhbnRzLCBjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChwbGF5ZXJVaU9yVWlWYXJpYW50cyBpbnN0YW5jZW9mIHVpY29udGFpbmVyXzEuVUlDb250YWluZXIpIHtcclxuICAgICAgICAgICAgLy8gU2luZ2xlLVVJIGNvbnN0cnVjdG9yIGhhcyBiZWVuIGNhbGxlZCwgdHJhbnNmb3JtIGFyZ3VtZW50cyB0byBVSVZhcmlhbnRbXSBzaWduYXR1cmVcclxuICAgICAgICAgICAgdmFyIHBsYXllclVpID0gcGxheWVyVWlPclVpVmFyaWFudHM7XHJcbiAgICAgICAgICAgIHZhciBhZHNVaSA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciB1aVZhcmlhbnRzID0gW107XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgYWRzIFVJIGlmIGRlZmluZWRcclxuICAgICAgICAgICAgaWYgKGFkc1VpKSB7XHJcbiAgICAgICAgICAgICAgICB1aVZhcmlhbnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHVpOiBhZHNVaSxcclxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LmlzQWRXaXRoVUk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgZGVmYXVsdCBwbGF5ZXIgVUlcclxuICAgICAgICAgICAgdWlWYXJpYW50cy5wdXNoKHsgdWk6IHBsYXllclVpIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnVpVmFyaWFudHMgPSB1aVZhcmlhbnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciAoVUlWYXJpYW50W10pIGhhcyBiZWVuIGNhbGxlZFxyXG4gICAgICAgICAgICB0aGlzLnVpVmFyaWFudHMgPSBwbGF5ZXJVaU9yVWlWYXJpYW50cztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGxheWVyV3JhcHBlciA9IG5ldyBQbGF5ZXJXcmFwcGVyKHBsYXllcik7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJFbGVtZW50ID0gbmV3IGRvbV8xLkRPTShwbGF5ZXIuZ2V0RmlndXJlKCkpO1xyXG4gICAgICAgIC8vIENyZWF0ZSBVSSBpbnN0YW5jZSBtYW5hZ2VycyBmb3IgdGhlIFVJIHZhcmlhbnRzXHJcbiAgICAgICAgLy8gVGhlIGluc3RhbmNlIG1hbmFnZXJzIG1hcCB0byB0aGUgY29ycmVzcG9uZGluZyBVSSB2YXJpYW50cyBieSB0aGVpciBhcnJheSBpbmRleFxyXG4gICAgICAgIHRoaXMudWlJbnN0YW5jZU1hbmFnZXJzID0gW107XHJcbiAgICAgICAgdmFyIHVpVmFyaWFudHNXaXRob3V0Q29uZGl0aW9uID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudWlWYXJpYW50czsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIHVpVmFyaWFudCA9IF9hW19pXTtcclxuICAgICAgICAgICAgaWYgKHVpVmFyaWFudC5jb25kaXRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29sbGVjdCB2YXJpYW50cyB3aXRob3V0IGNvbmRpdGlvbnMgZm9yIGVycm9yIGNoZWNraW5nXHJcbiAgICAgICAgICAgICAgICB1aVZhcmlhbnRzV2l0aG91dENvbmRpdGlvbi5wdXNoKHVpVmFyaWFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBpbnN0YW5jZSBtYW5hZ2VyIGZvciBhIFVJIHZhcmlhbnRcclxuICAgICAgICAgICAgdGhpcy51aUluc3RhbmNlTWFuYWdlcnMucHVzaChuZXcgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlcihwbGF5ZXIsIHVpVmFyaWFudC51aSwgdGhpcy5jb25maWcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgb25seSBvbmUgVUkgdmFyaWFudCB3aXRob3V0IGEgY29uZGl0aW9uXHJcbiAgICAgICAgLy8gSXQgZG9lcyBub3QgbWFrZSBzZW5zZSB0byBoYXZlIG11bHRpcGxlIHZhcmlhbnRzIHdpdGhvdXQgY29uZGl0aW9uLCBiZWNhdXNlIG9ubHkgdGhlIGZpcnN0IG9uZSBpbiB0aGUgbGlzdFxyXG4gICAgICAgIC8vICh0aGUgb25lIHdpdGggdGhlIGxvd2VzdCBpbmRleCkgd2lsbCBldmVyIGJlIHNlbGVjdGVkLlxyXG4gICAgICAgIGlmICh1aVZhcmlhbnRzV2l0aG91dENvbmRpdGlvbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUb28gbWFueSBVSXMgd2l0aG91dCBhIGNvbmRpdGlvbjogWW91IGNhbm5vdCBoYXZlIG1vcmUgdGhhbiBvbmUgZGVmYXVsdCBVSScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZGVmYXVsdCBVSSB2YXJpYW50LCBpZiBkZWZpbmVkLCBpcyBhdCB0aGUgZW5kIG9mIHRoZSBsaXN0IChsYXN0IGluZGV4KVxyXG4gICAgICAgIC8vIElmIGl0IGNvbWVzIGVhcmxpZXIsIHRoZSB2YXJpYW50cyB3aXRoIGNvbmRpdGlvbnMgdGhhdCBjb21lIGFmdGVyd2FyZHMgd2lsbCBuZXZlciBiZSBzZWxlY3RlZCBiZWNhdXNlIHRoZVxyXG4gICAgICAgIC8vIGRlZmF1bHQgdmFyaWFudCB3aXRob3V0IGEgY29uZGl0aW9uIGFsd2F5cyBldmFsdWF0ZXMgdG8gJ3RydWUnXHJcbiAgICAgICAgaWYgKHVpVmFyaWFudHNXaXRob3V0Q29uZGl0aW9uLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgJiYgdWlWYXJpYW50c1dpdGhvdXRDb25kaXRpb25bMF0gIT09IHRoaXMudWlWYXJpYW50c1t0aGlzLnVpVmFyaWFudHMubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgVUkgdmFyaWFudCBvcmRlcjogdGhlIGRlZmF1bHQgVUkgKHdpdGhvdXQgY29uZGl0aW9uKSBtdXN0IGJlIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3QnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFkU3RhcnRlZEV2ZW50ID0gbnVsbDsgLy8ga2VlcCB0aGUgZXZlbnQgc3RvcmVkIGhlcmUgZHVyaW5nIGFkIHBsYXliYWNrXHJcbiAgICAgICAgdmFyIGlzTW9iaWxlID0gdXRpbHNfMS5Ccm93c2VyVXRpbHMuaXNNb2JpbGU7XHJcbiAgICAgICAgLy8gRHluYW1pY2FsbHkgc2VsZWN0IGEgVUkgdmFyaWFudCB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnQgVUkgY29uZGl0aW9uLlxyXG4gICAgICAgIHZhciByZXNvbHZlVWlWYXJpYW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBPTl9BRF9TVEFSVEVEIGV2ZW50IGRhdGEgaXMgcGVyc2lzdGVkIHRocm91Z2ggYWQgcGxheWJhY2sgaW4gY2FzZSBvdGhlciBldmVudHMgaGFwcGVuXHJcbiAgICAgICAgICAgIC8vIGluIHRoZSBtZWFudGltZSwgZS5nLiBwbGF5ZXIgcmVzaXplLiBXZSBuZWVkIHRvIHN0b3JlIHRoaXMgZGF0YSBiZWNhdXNlIHRoZXJlIGlzIG5vIG90aGVyIHdheSB0byBmaW5kIG91dFxyXG4gICAgICAgICAgICAvLyBhZCBkZXRhaWxzIChlLmcuIHRoZSBhZCBjbGllbnQpIHdoaWxlIGFuIGFkIGlzIHBsYXlpbmcuXHJcbiAgICAgICAgICAgIC8vIEV4aXN0aW5nIGV2ZW50IGRhdGEgc2lnbmFscyB0aGF0IGFuIGFkIGlzIGN1cnJlbnRseSBhY3RpdmUuIFdlIGNhbm5vdCB1c2UgcGxheWVyLmlzQWQoKSBiZWNhdXNlIGl0IHJldHVybnNcclxuICAgICAgICAgICAgLy8gdHJ1ZSBvbiBhZCBzdGFydCBhbmQgYWxzbyBvbiBhZCBlbmQgZXZlbnRzLCB3aGljaCBpcyBwcm9ibGVtYXRpYy5cclxuICAgICAgICAgICAgaWYgKGV2ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIGFkIHN0YXJ0cywgd2Ugc3RvcmUgdGhlIGV2ZW50IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYXllci5FVkVOVC5PTl9BRF9TVEFSVEVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFN0YXJ0ZWRFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHRoZSBhZCBlbmRzLCB3ZSBkZWxldGUgdGhlIGV2ZW50IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYXllci5FVkVOVC5PTl9BRF9GSU5JU0hFRDpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHBsYXllci5FVkVOVC5PTl9BRF9TS0lQUEVEOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyLkVWRU5ULk9OX0FEX0VSUk9SOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZFN0YXJ0ZWRFdmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRGV0ZWN0IGlmIGFuIGFkIGhhcyBzdGFydGVkXHJcbiAgICAgICAgICAgIHZhciBhZCA9IGFkU3RhcnRlZEV2ZW50ICE9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhZFdpdGhVSSA9IGFkICYmIGFkU3RhcnRlZEV2ZW50LmNsaWVudFR5cGUgPT09ICd2YXN0JztcclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IGNvbnRleHQgZm9yIHdoaWNoIHRoZSBVSSB2YXJpYW50IHdpbGwgYmUgcmVzb2x2ZWRcclxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgICAgICBpc0FkOiBhZCxcclxuICAgICAgICAgICAgICAgIGlzQWRXaXRoVUk6IGFkV2l0aFVJLFxyXG4gICAgICAgICAgICAgICAgaXNGdWxsc2NyZWVuOiBfdGhpcy5wbGF5ZXIuaXNGdWxsc2NyZWVuKCksXHJcbiAgICAgICAgICAgICAgICBpc01vYmlsZTogaXNNb2JpbGUsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogX3RoaXMucGxheWVyRWxlbWVudC53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRXaWR0aDogZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIG5leHRVaSA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciB1aVZhcmlhbnRDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFNlbGVjdCBuZXcgVUkgdmFyaWFudFxyXG4gICAgICAgICAgICAvLyBJZiBubyB2YXJpYW50IGNvbmRpdGlvbiBpcyBmdWxmaWxsZWQsIHdlIHN3aXRjaCB0byAqbm8qIFVJXHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBfdGhpcy51aVZhcmlhbnRzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVpVmFyaWFudCA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGlmICh1aVZhcmlhbnQuY29uZGl0aW9uID09IG51bGwgfHwgdWlWYXJpYW50LmNvbmRpdGlvbihjb250ZXh0KSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRVaSA9IF90aGlzLnVpSW5zdGFuY2VNYW5hZ2Vyc1tfdGhpcy51aVZhcmlhbnRzLmluZGV4T2YodWlWYXJpYW50KV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBVSSB2YXJpYW50IGlzIGNoYW5naW5nXHJcbiAgICAgICAgICAgIGlmIChuZXh0VWkgIT09IF90aGlzLmN1cnJlbnRVaSkge1xyXG4gICAgICAgICAgICAgICAgdWlWYXJpYW50Q2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3dpdGNoZWQgZnJvbSAnLCB0aGlzLmN1cnJlbnRVaSA/IHRoaXMuY3VycmVudFVpLmdldFVJKCkgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAvLyAgICcgdG8gJywgbmV4dFVpID8gbmV4dFVpLmdldFVJKCkgOiAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIE9ubHkgaWYgdGhlIFVJIHZhcmlhbnQgaXMgY2hhbmdpbmcsIHdlIG5lZWQgdG8gZG8gc29tZSBzdHVmZi4gRWxzZSB3ZSBqdXN0IGxlYXZlIGV2ZXJ5dGhpbmcgYXMtaXMuXHJcbiAgICAgICAgICAgIGlmICh1aVZhcmlhbnRDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBIaWRlIHRoZSBjdXJyZW50bHkgYWN0aXZlIFVJIHZhcmlhbnRcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jdXJyZW50VWkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jdXJyZW50VWkuZ2V0VUkoKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gdGhlIG5ldyBVSSB2YXJpYW50IGFzIGN1cnJlbnQgVUlcclxuICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRVaSA9IG5leHRVaTtcclxuICAgICAgICAgICAgICAgIC8vIFdoZW4gd2Ugc3dpdGNoIHRvIGEgZGlmZmVyZW50IFVJIGluc3RhbmNlLCB0aGVyZSdzIHNvbWUgYWRkaXRpb25hbCBzdHVmZiB0byBtYW5hZ2UuIElmIHdlIGRvIG5vdCBzd2l0Y2hcclxuICAgICAgICAgICAgICAgIC8vIHRvIGFuIGluc3RhbmNlLCB3ZSdyZSBkb25lIGhlcmUuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY3VycmVudFVpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIFVJIHRvIHRoZSBET00gKGFuZCBjb25maWd1cmUgaXQpIHRoZSBmaXJzdCB0aW1lIGl0IGlzIHNlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jdXJyZW50VWkuaXNDb25maWd1cmVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkVWkoX3RoaXMuY3VycmVudFVpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiBhZCBVSSwgd2UgbmVlZCB0byByZWxheSB0aGUgc2F2ZWQgT05fQURfU1RBUlRFRCBldmVudCBkYXRhIHNvIGFkIGNvbXBvbmVudHMgY2FuIGNvbmZpZ3VyZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZW1zZWx2ZXMgZm9yIHRoZSBjdXJyZW50IGFkLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmlzQWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyogUmVsYXkgdGhlIE9OX0FEX1NUQVJURUQgZXZlbnQgdG8gdGhlIGFkcyBVSVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBCZWNhdXNlIHRoZSBhZHMgVUkgaXMgaW5pdGlhbGl6ZWQgaW4gdGhlIE9OX0FEX1NUQVJURUQgaGFuZGxlciwgaS5lLiB3aGVuIHRoZSBPTl9BRF9TVEFSVEVEIGV2ZW50IGhhc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBhbHJlYWR5IGJlZW4gZmlyZWQsIGNvbXBvbmVudHMgaW4gdGhlIGFkcyBVSSB0aGF0IGxpc3RlbiBmb3IgdGhlIE9OX0FEX1NUQVJURUQgZXZlbnQgbmV2ZXIgcmVjZWl2ZSBpdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICogU2luY2UgdGhpcyBjYW4gYnJlYWsgZnVuY3Rpb25hbGl0eSBvZiBjb21wb25lbnRzIHRoYXQgcmVseSBvbiB0aGlzIGV2ZW50LCB3ZSByZWxheSB0aGUgZXZlbnQgdG8gdGhlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIGFkcyBVSSBjb21wb25lbnRzIHdpdGggdGhlIGZvbGxvd2luZyBjYWxsLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY3VycmVudFVpLmdldFdyYXBwZWRQbGF5ZXIoKS5maXJlRXZlbnRJblVJKF90aGlzLnBsYXllci5FVkVOVC5PTl9BRF9TVEFSVEVELCBhZFN0YXJ0ZWRFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRVaS5nZXRVSSgpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSBmb2xsb3dpbmcgZXZlbnRzIHRvIHRyaWdnZXIgVUkgdmFyaWFudCByZXNvbHV0aW9uXHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGxheWVyV3JhcHBlci5nZXRQbGF5ZXIoKS5hZGRFdmVudEhhbmRsZXIodGhpcy5wbGF5ZXIuRVZFTlQuT05fQURfU1RBUlRFRCwgcmVzb2x2ZVVpVmFyaWFudCk7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGxheWVyV3JhcHBlci5nZXRQbGF5ZXIoKS5hZGRFdmVudEhhbmRsZXIodGhpcy5wbGF5ZXIuRVZFTlQuT05fQURfRklOSVNIRUQsIHJlc29sdmVVaVZhcmlhbnQpO1xyXG4gICAgICAgIHRoaXMubWFuYWdlclBsYXllcldyYXBwZXIuZ2V0UGxheWVyKCkuYWRkRXZlbnRIYW5kbGVyKHRoaXMucGxheWVyLkVWRU5ULk9OX0FEX1NLSVBQRUQsIHJlc29sdmVVaVZhcmlhbnQpO1xyXG4gICAgICAgIHRoaXMubWFuYWdlclBsYXllcldyYXBwZXIuZ2V0UGxheWVyKCkuYWRkRXZlbnRIYW5kbGVyKHRoaXMucGxheWVyLkVWRU5ULk9OX0FEX0VSUk9SLCByZXNvbHZlVWlWYXJpYW50KTtcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbGF5ZXJXcmFwcGVyLmdldFBsYXllcigpLmFkZEV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9QTEFZRVJfUkVTSVpFLCByZXNvbHZlVWlWYXJpYW50KTtcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbGF5ZXJXcmFwcGVyLmdldFBsYXllcigpLmFkZEV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9GVUxMU0NSRUVOX0VOVEVSLCByZXNvbHZlVWlWYXJpYW50KTtcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbGF5ZXJXcmFwcGVyLmdldFBsYXllcigpLmFkZEV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9GVUxMU0NSRUVOX0VYSVQsIHJlc29sdmVVaVZhcmlhbnQpO1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFVJXHJcbiAgICAgICAgcmVzb2x2ZVVpVmFyaWFudChudWxsKTtcclxuICAgIH1cclxuICAgIFVJTWFuYWdlci5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcclxuICAgIH07XHJcbiAgICBVSU1hbmFnZXIucHJvdG90eXBlLmFkZFVpID0gZnVuY3Rpb24gKHVpKSB7XHJcbiAgICAgICAgdmFyIGRvbSA9IHVpLmdldFVJKCkuZ2V0RG9tRWxlbWVudCgpO1xyXG4gICAgICAgIHVpLmNvbmZpZ3VyZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgLyogQXBwZW5kIHRoZSBVSSBET00gYWZ0ZXIgY29uZmlndXJhdGlvbiB0byBhdm9pZCBDU1MgdHJhbnNpdGlvbnMgYXQgaW5pdGlhbGl6YXRpb25cclxuICAgICAgICAgKiBFeGFtcGxlOiBDb21wb25lbnRzIGFyZSBoaWRkZW4gZHVyaW5nIGNvbmZpZ3VyYXRpb24gYW5kIHRoZXNlIGhpZGVzIG1heSB0cmlnZ2VyIENTUyB0cmFuc2l0aW9ucyB0aGF0IGFyZVxyXG4gICAgICAgICAqIHVuZGVzaXJhYmxlIGF0IHRoaXMgdGltZS4gKi9cclxuICAgICAgICB0aGlzLnBsYXllckVsZW1lbnQuYXBwZW5kKGRvbSk7XHJcbiAgICAgICAgLy8gRmlyZSBvbkNvbmZpZ3VyZWQgYWZ0ZXIgVUkgRE9NIGVsZW1lbnRzIGFyZSBzdWNjZXNzZnVsbHkgYWRkZWQuIFdoZW4gZmlyZWQgaW1tZWRpYXRlbHksIHRoZSBET00gZWxlbWVudHNcclxuICAgICAgICAvLyBtaWdodCBub3QgYmUgZnVsbHkgY29uZmlndXJlZCBhbmQgZS5nLiBkbyBub3QgaGF2ZSBhIHNpemUuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9zd2l6ZWMuY29tL2Jsb2cvaG93LXRvLXByb3Blcmx5LXdhaXQtZm9yLWRvbS1lbGVtZW50cy10by1zaG93LXVwLWluLW1vZGVybi1icm93c2Vycy9zd2l6ZWMvNjY2M1xyXG4gICAgICAgIGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHVpLm9uQ29uZmlndXJlZC5kaXNwYXRjaCh1aS5nZXRVSSgpKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJRTkgZmFsbGJhY2tcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHVpLm9uQ29uZmlndXJlZC5kaXNwYXRjaCh1aS5nZXRVSSgpKTsgfSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFVJTWFuYWdlci5wcm90b3R5cGUucmVsZWFzZVVpID0gZnVuY3Rpb24gKHVpKSB7XHJcbiAgICAgICAgdWkucmVsZWFzZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgdWkuZ2V0VUkoKS5nZXREb21FbGVtZW50KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgdWkuY2xlYXJFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgVUlNYW5hZ2VyLnByb3RvdHlwZS5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnVpSW5zdGFuY2VNYW5hZ2VyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIHVpSW5zdGFuY2VNYW5hZ2VyID0gX2FbX2ldO1xyXG4gICAgICAgICAgICB0aGlzLnJlbGVhc2VVaSh1aUluc3RhbmNlTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFuYWdlclBsYXllcldyYXBwZXIuY2xlYXJFdmVudEhhbmRsZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFVJTWFuYWdlcjtcclxufSgpKTtcclxuZXhwb3J0cy5VSU1hbmFnZXIgPSBVSU1hbmFnZXI7XHJcbihmdW5jdGlvbiAoVUlNYW5hZ2VyKSB7XHJcbiAgICB2YXIgRmFjdG9yeTtcclxuICAgIChmdW5jdGlvbiAoRmFjdG9yeSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQXVkaW9WaWRlb1VJKHBsYXllciwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgICAgICB2YXIgY29udHJvbEJhciA9IG5ldyBjb250cm9sYmFyXzEuQ29udHJvbEJhcih7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHBsYXliYWNrdG9nZ2xlYnV0dG9uXzEuUGxheWJhY2tUb2dnbGVCdXR0b24oKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc2Vla2Jhcl8xLlNlZWtCYXIoeyBsYWJlbDogbmV3IHNlZWtiYXJsYWJlbF8xLlNlZWtCYXJMYWJlbCgpLCBoaWRlSW5MaXZlUGxheWJhY2s6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHBsYXliYWNrdGltZWxhYmVsXzEuUGxheWJhY2tUaW1lTGFiZWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgdm9sdW1lY29udHJvbGJ1dHRvbl8xLlZvbHVtZUNvbnRyb2xCdXR0b24oeyAndmVydGljYWwnOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBjb21wb25lbnRfMS5Db21wb25lbnQoeyBjc3NDbGFzczogJ3NwYWNlcicgfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciB1aSA9IG5ldyB1aWNvbnRhaW5lcl8xLlVJQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc3VidGl0bGVvdmVybGF5XzEuU3VidGl0bGVPdmVybGF5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHBsYXliYWNrdG9nZ2xlb3ZlcmxheV8xLlBsYXliYWNrVG9nZ2xlT3ZlcmxheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xCYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IGVycm9ybWVzc2FnZW92ZXJsYXlfMS5FcnJvck1lc3NhZ2VPdmVybGF5KClcclxuICAgICAgICAgICAgICAgIF0sIGNzc0NsYXNzZXM6IFsndWktc2tpbiddXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVJTWFuYWdlcihwbGF5ZXIsIHVpLCBjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBGYWN0b3J5LmJ1aWxkQXVkaW9WaWRlb1VJID0gYnVpbGRBdWRpb1ZpZGVvVUk7XHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRBdWRpb09ubHlVSShwbGF5ZXIsIGNvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xCYXIgPSBuZXcgY29udHJvbGJhcl8xLkNvbnRyb2xCYXIoe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xLlBsYXliYWNrVG9nZ2xlQnV0dG9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHNlZWtiYXJfMS5TZWVrQmFyKHsgbGFiZWw6IG5ldyBzZWVrYmFybGFiZWxfMS5TZWVrQmFyTGFiZWwoKSwgaGlkZUluTGl2ZVBsYXliYWNrOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBwbGF5YmFja3RpbWVsYWJlbF8xLlBsYXliYWNrVGltZUxhYmVsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHZvbHVtZWNvbnRyb2xidXR0b25fMS5Wb2x1bWVDb250cm9sQnV0dG9uKHsgJ3ZlcnRpY2FsJzogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgY29tcG9uZW50XzEuQ29tcG9uZW50KHsgY3NzQ2xhc3M6ICdzcGFjZXInIH0pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgdmFyIHVpID0gbmV3IHVpY29udGFpbmVyXzEuVUlDb250YWluZXIoe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzdWJ0aXRsZW92ZXJsYXlfMS5TdWJ0aXRsZU92ZXJsYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgcGxheWJhY2t0b2dnbGVvdmVybGF5XzEuUGxheWJhY2tUb2dnbGVPdmVybGF5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IGF1ZGlvb25seW92ZXJsYXlfMS5BdWRpb09ubHlPdmVybGF5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbEJhcixcclxuICAgICAgICAgICAgICAgICAgICBuZXcgZXJyb3JtZXNzYWdlb3ZlcmxheV8xLkVycm9yTWVzc2FnZU92ZXJsYXkoKVxyXG4gICAgICAgICAgICAgICAgXSwgY3NzQ2xhc3NlczogWyd1aS1za2luJ11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVUlNYW5hZ2VyKHBsYXllciwgdWksIGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZhY3RvcnkuYnVpbGRBdWRpb09ubHlVSSA9IGJ1aWxkQXVkaW9Pbmx5VUk7XHJcbiAgICB9KShGYWN0b3J5ID0gVUlNYW5hZ2VyLkZhY3RvcnkgfHwgKFVJTWFuYWdlci5GYWN0b3J5ID0ge30pKTtcclxufSkoVUlNYW5hZ2VyID0gZXhwb3J0cy5VSU1hbmFnZXIgfHwgKGV4cG9ydHMuVUlNYW5hZ2VyID0ge30pKTtcclxuZXhwb3J0cy5VSU1hbmFnZXIgPSBVSU1hbmFnZXI7XHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgZnVuY3Rpb25hbGl0eSB0byBtYW5hZ2UgYSBVSSBpbnN0YW5jZS4gVXNlZCBieSB0aGUge0BsaW5rIFVJTWFuYWdlcn0gdG8gbWFuYWdlIG11bHRpcGxlIFVJIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBVSUluc3RhbmNlTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBVSUluc3RhbmNlTWFuYWdlcihwbGF5ZXIsIHVpLCBjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB0aGlzLmV2ZW50cyA9IHtcclxuICAgICAgICAgICAgb25Db25maWd1cmVkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uU2VlazogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICBvblNlZWtQcmV2aWV3OiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uU2Vla2VkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uQ29tcG9uZW50U2hvdzogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICBvbkNvbXBvbmVudEhpZGU6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25Db250cm9sc1Nob3c6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25QcmV2aWV3Q29udHJvbHNIaWRlOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uQ29udHJvbHNIaWRlOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBsYXllcldyYXBwZXIgPSBuZXcgUGxheWVyV3JhcHBlcihwbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMudWkgPSB1aTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuICAgIFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xyXG4gICAgfTtcclxuICAgIFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRVSSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51aTtcclxuICAgIH07XHJcbiAgICBVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuZ2V0UGxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllcldyYXBwZXIuZ2V0UGxheWVyKCk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZSwgXCJvbkNvbmZpZ3VyZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIFVJIGlzIGZ1bGx5IGNvbmZpZ3VyZWQgYW5kIGFkZGVkIHRvIHRoZSBET00uXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29uZmlndXJlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25TZWVrXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXJlcyB3aGVuIGEgc2VlayBzdGFydHMuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uU2VlaztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25TZWVrUHJldmlld1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgc2VlayB0aW1lbGluZSBpcyBzY3J1YmJlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnREaXNwYXRjaGVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMub25TZWVrUHJldmlldztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25TZWVrZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIHdoZW4gYSBzZWVrIGlzIGZpbmlzaGVkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudERpc3BhdGNoZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5vblNlZWtlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25Db21wb25lbnRTaG93XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXJlcyB3aGVuIGEgY29tcG9uZW50IGlzIHNob3dpbmcuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29tcG9uZW50U2hvdztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25Db21wb25lbnRIaWRlXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXJlcyB3aGVuIGEgY29tcG9uZW50IGlzIGhpZGluZy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnREaXNwYXRjaGVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMub25Db21wb25lbnRIaWRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZSwgXCJvbkNvbnRyb2xzU2hvd1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgVUkgY29udHJvbHMgYXJlIHNob3dpbmcuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29udHJvbHNTaG93O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZSwgXCJvblByZXZpZXdDb250cm9sc0hpZGVcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIGJlZm9yZSB0aGUgVUkgY29udHJvbHMgYXJlIGhpZGluZyB0byBjaGVjayBpZiB0aGV5IGFyZSBhbGxvd2VkIHRvIGhpZGUuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uUHJldmlld0NvbnRyb2xzSGlkZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25Db250cm9sc0hpZGVcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIFVJIGNvbnRyb2xzIGFyZSBoaWRpbmcuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29udHJvbHNIaWRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgVUlJbnN0YW5jZU1hbmFnZXIucHJvdG90eXBlLmNsZWFyRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnBsYXllcldyYXBwZXIuY2xlYXJFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzOyAvLyBhdm9pZCBUUzcwMTdcclxuICAgICAgICBmb3IgKHZhciBldmVudF8xIGluIGV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgZGlzcGF0Y2hlciA9IGV2ZW50c1tldmVudF8xXTtcclxuICAgICAgICAgICAgZGlzcGF0Y2hlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gVUlJbnN0YW5jZU1hbmFnZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVUlJbnN0YW5jZU1hbmFnZXIgPSBVSUluc3RhbmNlTWFuYWdlcjtcclxuLyoqXHJcbiAqIEV4dGVuZHMgdGhlIHtAbGluayBVSUluc3RhbmNlTWFuYWdlcn0gZm9yIGludGVybmFsIHVzZSBpbiB0aGUge0BsaW5rIFVJTWFuYWdlcn0gYW5kIHByb3ZpZGVzIGFjY2VzcyB0byBmdW5jdGlvbmFsaXR5XHJcbiAqIHRoYXQgY29tcG9uZW50cyByZWNlaXZpbmcgYSByZWZlcmVuY2UgdG8gdGhlIHtAbGluayBVSUluc3RhbmNlTWFuYWdlcn0gc2hvdWxkIG5vdCBoYXZlIGFjY2VzcyB0by5cclxuICovXHJcbnZhciBJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRXcmFwcGVkUGxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRPRE8gZmluZCBhIG5vbi1oYWNreSB3YXkgdG8gcHJvdmlkZSB0aGUgV3JhcHBlZFBsYXllciB0byB0aGUgVUlNYW5hZ2VyIHdpdGhvdXQgZXhwb3J0aW5nIGl0XHJcbiAgICAgICAgLy8gZ2V0UGxheWVyKCkgYWN0dWFsbHkgcmV0dXJucyB0aGUgV3JhcHBlZFBsYXllciBidXQgaXRzIHJldHVybiB0eXBlIGlzIHNldCB0byBQbGF5ZXIgc28gdGhlIFdyYXBwZWRQbGF5ZXIgZG9lc1xyXG4gICAgICAgIC8vIG5vdCBuZWVkIHRvIGJlIGV4cG9ydGVkXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxheWVyKCk7XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuY29uZmlndXJlQ29udHJvbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmVDb250cm9sc1RyZWUodGhpcy5nZXRVSSgpKTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIEludGVybmFsVUlJbnN0YW5jZU1hbmFnZXIucHJvdG90eXBlLmlzQ29uZmlndXJlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmVkO1xyXG4gICAgfTtcclxuICAgIEludGVybmFsVUlJbnN0YW5jZU1hbmFnZXIucHJvdG90eXBlLmNvbmZpZ3VyZUNvbnRyb2xzVHJlZSA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjb25maWd1cmVkQ29tcG9uZW50cyA9IFtdO1xyXG4gICAgICAgIHV0aWxzXzEuVUlVdGlscy50cmF2ZXJzZVRyZWUoY29tcG9uZW50LCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIC8vIEZpcnN0LCBjaGVjayBpZiB3ZSBoYXZlIGFscmVhZHkgY29uZmlndXJlZCBhIGNvbXBvbmVudCwgYW5kIHRocm93IGFuIGVycm9yIGlmIHdlIGRpZC4gTXVsdGlwbGUgY29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICAvLyBvZiB0aGUgc2FtZSBjb21wb25lbnQgbGVhZHMgdG8gdW5leHBlY3RlZCBVSSBiZWhhdmlvci4gQWxzbywgYSBjb21wb25lbnQgdGhhdCBpcyBpbiB0aGUgVUkgdHJlZSBtdWx0aXBsZVxyXG4gICAgICAgICAgICAvLyB0aW1lcyBoaW50cyBhdCBhIHdyb25nIFVJIHN0cnVjdHVyZS5cclxuICAgICAgICAgICAgLy8gV2UgY291bGQganVzdCBza2lwIGNvbmZpZ3VyYXRpb24gaW4gc3VjaCBhIGNhc2UgYW5kIG5vdCB0aHJvdyBhbiBleGNlcHRpb24sIGJ1dCBlbmZvcmNpbmcgYSBjbGVhbiBVSSB0cmVlXHJcbiAgICAgICAgICAgIC8vIHNlZW1zIGxpa2UgdGhlIGJldHRlciBjaG9pY2UuXHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgY29uZmlndXJlZENvbXBvbmVudHNfMSA9IGNvbmZpZ3VyZWRDb21wb25lbnRzOyBfaSA8IGNvbmZpZ3VyZWRDb21wb25lbnRzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlndXJlZENvbXBvbmVudCA9IGNvbmZpZ3VyZWRDb21wb25lbnRzXzFbX2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ3VyZWRDb21wb25lbnQgPT09IGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdyaXRlIHRoZSBjb21wb25lbnQgdG8gdGhlIGNvbnNvbGUgdG8gc2ltcGxpZnkgaWRlbnRpZmljYXRpb24gb2YgdGhlIGN1bHByaXRcclxuICAgICAgICAgICAgICAgICAgICAvLyAoZS5nLiBieSBpbnNwZWN0aW5nIHRoZSBjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIFVJIHRyZWUnLCBjb21wb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGRpdGlvbmFsbHkgdGhyb3cgYW4gZXJyb3IsIGJlY2F1c2UgdGhpcyBjYXNlIG11c3Qgbm90IGhhcHBlbiBhbmQgbGVhZHMgdG8gdW5leHBlY3RlZCBVSSBiZWhhdmlvci5cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIFVJIHRyZWU6ICcgKyBjb21wb25lbnQuY29uc3RydWN0b3IubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcG9uZW50LmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgY29tcG9uZW50LmNvbmZpZ3VyZShfdGhpcy5nZXRQbGF5ZXIoKSwgX3RoaXMpO1xyXG4gICAgICAgICAgICBjb25maWd1cmVkQ29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUucmVsZWFzZUNvbnRyb2xzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdCBjYWxsIHJlbGVhc2UgbWV0aG9kcyBpZiB0aGUgY29tcG9uZW50cyBoYXZlIG5ldmVyIGJlZW4gY29uZmlndXJlZDsgdGhpcyBjYW4gcmVzdWx0IGluIGV4Y2VwdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5jb25maWd1cmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZUNvbnRyb2xzVHJlZSh0aGlzLmdldFVJKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlZCA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuaXNSZWxlYXNlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxlYXNlZDtcclxuICAgIH07XHJcbiAgICBJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5yZWxlYXNlQ29udHJvbHNUcmVlID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbXBvbmVudC5yZWxlYXNlKCk7XHJcbiAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIGNvbnRhaW5lcl8xLkNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gY29tcG9uZW50LmdldENvbXBvbmVudHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZENvbXBvbmVudCA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZUNvbnRyb2xzVHJlZShjaGlsZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuY2xlYXJFdmVudEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY2xlYXJFdmVudEhhbmRsZXJzLmNhbGwodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEludGVybmFsVUlJbnN0YW5jZU1hbmFnZXI7XHJcbn0oVUlJbnN0YW5jZU1hbmFnZXIpKTtcclxuLyoqXHJcbiAqIFdyYXBzIHRoZSBwbGF5ZXIgdG8gdHJhY2sgZXZlbnQgaGFuZGxlcnMgYW5kIHByb3ZpZGUgYSBzaW1wbGUgbWV0aG9kIHRvIHJlbW92ZSBhbGwgcmVnaXN0ZXJlZCBldmVudFxyXG4gKiBoYW5kbGVycyBmcm9tIHRoZSBwbGF5ZXIuXHJcbiAqL1xyXG52YXIgUGxheWVyV3JhcHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQbGF5ZXJXcmFwcGVyKHBsYXllcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgLy8gQ29sbGVjdCBhbGwgcHVibGljIEFQSSBtZXRob2RzIG9mIHRoZSBwbGF5ZXJcclxuICAgICAgICB2YXIgbWV0aG9kcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG1lbWJlciBpbiBwbGF5ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwbGF5ZXJbbWVtYmVyXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKG1lbWJlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ3JlYXRlIHdyYXBwZXIgb2JqZWN0IGFuZCBhZGQgZnVuY3Rpb24gd3JhcHBlcnMgZm9yIGFsbCBBUEkgbWV0aG9kcyB0aGF0IGRvIG5vdGhpbmcgYnV0IGNhbGxpbmcgdGhlIGJhc2UgbWV0aG9kXHJcbiAgICAgICAgLy8gb24gdGhlIHBsYXllclxyXG4gICAgICAgIHZhciB3cmFwcGVyID0ge307XHJcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAobWVtYmVyKSB7XHJcbiAgICAgICAgICAgIHdyYXBwZXJbbWVtYmVyXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjYWxsZWQgJyArIG1lbWJlcik7IC8vIHRyYWNrIG1ldGhvZCBjYWxscyBvbiB0aGUgcGxheWVyXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyW21lbWJlcl0uYXBwbHkocGxheWVyLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBtZXRob2RzXzEgPSBtZXRob2RzOyBfaSA8IG1ldGhvZHNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG1lbWJlciA9IG1ldGhvZHNfMVtfaV07XHJcbiAgICAgICAgICAgIF9sb29wXzEobWVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ29sbGVjdCBhbGwgcHVibGljIHByb3BlcnRpZXMgb2YgdGhlIHBsYXllciBhbmQgYWRkIGl0IHRvIHRoZSB3cmFwcGVyXHJcbiAgICAgICAgZm9yICh2YXIgbWVtYmVyIGluIHBsYXllcikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBsYXllclttZW1iZXJdICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyW21lbWJlcl0gPSBwbGF5ZXJbbWVtYmVyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFeHBsaWNpdGx5IGFkZCBhIHdyYXBwZXIgbWV0aG9kIGZvciAnYWRkRXZlbnRIYW5kbGVyJyB0aGF0IGFkZHMgYWRkZWQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIGV2ZW50IGxpc3RcclxuICAgICAgICB3cmFwcGVyLmFkZEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChldmVudFR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIoZXZlbnRUeXBlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIGlmICghX3RoaXMuZXZlbnRIYW5kbGVyc1tldmVudFR5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50VHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50VHlwZV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gRXhwbGljaXRseSBhZGQgYSB3cmFwcGVyIG1ldGhvZCBmb3IgJ3JlbW92ZUV2ZW50SGFuZGxlcicgdGhhdCByZW1vdmVzIHJlbW92ZWQgZXZlbnQgaGFuZGxlcnMgZnJvbSB0aGUgZXZlbnQgbGlzdFxyXG4gICAgICAgIHdyYXBwZXIucmVtb3ZlRXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUV2ZW50SGFuZGxlcihldmVudFR5cGUsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmV2ZW50SGFuZGxlcnNbZXZlbnRUeXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5BcnJheVV0aWxzLnJlbW92ZShfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50VHlwZV0sIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdyYXBwZXIuZmlyZUV2ZW50SW5VSSA9IGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuZXZlbnRIYW5kbGVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgZGF0YSBvYmplY3Qgd2l0aCBkZWZhdWx0IHZhbHVlcyB0byBjb252ZXJ0IGl0IHRvIGEge0BsaW5rIFBsYXllckV2ZW50fSBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyRXZlbnREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYSBtYXJrZXIgcHJvcGVydHkgc28gdGhlIFVJIGNhbiBkZXRlY3QgVUktaW50ZXJuYWwgcGxheWVyIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHVpU291cmNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50XTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socGxheWVyRXZlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy53cmFwcGVyID0gd3JhcHBlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHdyYXBwZWQgcGxheWVyIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIG9uIHBsYWNlIG9mIHRoZSBub3JtYWwgcGxheWVyIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIHtXcmFwcGVkUGxheWVyfSBhIHdyYXBwZWQgcGxheWVyXHJcbiAgICAgKi9cclxuICAgIFBsYXllcldyYXBwZXIucHJvdG90eXBlLmdldFBsYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVyO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCByZWdpc3RlcmVkIGV2ZW50IGhhbmRsZXJzIGZyb20gdGhlIHBsYXllciB0aGF0IHdlcmUgYWRkZWQgdGhyb3VnaCB0aGUgd3JhcHBlZCBwbGF5ZXIuXHJcbiAgICAgKi9cclxuICAgIFBsYXllcldyYXBwZXIucHJvdG90eXBlLmNsZWFyRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBldmVudFR5cGUgaW4gdGhpcy5ldmVudEhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLmV2ZW50SGFuZGxlcnNbZXZlbnRUeXBlXTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlbW92ZUV2ZW50SGFuZGxlcihldmVudFR5cGUsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gUGxheWVyV3JhcHBlcjtcclxufSgpKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL3VpbWFuYWdlci50c1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcclxudmFyIEJpdG1vdmluQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCaXRtb3ZpbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XHJcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHt9O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XHJcbiAgICB9XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRoaXMuJHNjb3BlLmNvbmZpZykgJiYgYW5ndWxhci5pc0RlZmluZWQodGhpcy4kc2NvcGUuY29uZmlnLmtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLiRzY29wZS5jb25maWc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ2Jhc2ljIGNvbmZpZyBmb3IgYml0ZGFzaCBwbGF5ZXIgaXMgbWlzc2luZyEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRoaXMuJHNjb3BlLm9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuJHNjb3BlLm9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0aGlzLiRzY29wZS53ZWJjYXN0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NXZWJjYXN0KHRoaXMuJHNjb3BlLndlYmNhc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLnByb2Nlc3NXZWJjYXN0ID0gZnVuY3Rpb24gKHdlYmNhc3QpIHtcclxuICAgICAgICB2YXIgc3RhdGVQcm9wZXJ0eSA9IHdlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcclxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodGhpcy5vcHRpb25zLmZvcmNlZFN0YXRlKSkge1xyXG4gICAgICAgICAgICBzdGF0ZVByb3BlcnR5ID0gdGhpcy5vcHRpb25zLmZvcmNlZFN0YXRlICsgJ1N0YXRlRGF0YSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlnLnNvdXJjZSA9IHRoaXMuZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QsIHN0YXRlUHJvcGVydHkpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnN0eWxlID0geyB1eDogZmFsc2UgfTtcclxuICAgIH07XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBsYXllckNvbmZpZ1NvdXJjZSA9IGZ1bmN0aW9uICh3ZWJjYXN0LCBzdGF0ZSkge1xyXG4gICAgICAgIGlmICh3ZWJjYXN0LnVzZURWUlBsYXliYWNrSW5Qb3N0bGl2ZSA9PT0gdHJ1ZSAmJiBzdGF0ZSA9PT0gJ3Bvc3RsaXZlU3RhdGVEYXRhJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREVlJQbGF5YmFja1RvUG9zdGxpdmUod2ViY2FzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpO1xyXG4gICAgfTtcclxuICAgIEJpdG1vdmluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RFZSUGxheWJhY2tUb1Bvc3RsaXZlID0gZnVuY3Rpb24gKHdlYmNhc3QpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gJyc7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHdlYmNhc3RbJ3Bvc3RsaXZlU3RhdGVEYXRhJ10ucGxheW91dC5vZmZzZXQpKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5b3V0T2Zmc2V0ID0gcGFyc2VJbnQod2ViY2FzdFsncG9zdGxpdmVTdGF0ZURhdGEnXS5wbGF5b3V0Lm9mZnNldCwgMTApO1xyXG4gICAgICAgICAgICBpZiAocGxheW91dE9mZnNldCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9ICcmd293emFkdnJwbGF5bGlzdHN0YXJ0PScgKyBwbGF5b3V0T2Zmc2V0ICsgJzAwMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGFzaDogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuZGFzaFVybC5yZXBsYWNlKCcvcGxheWxpc3QubTN1OCcsICdEdnIvcGxheWxpc3QubTN1OD9EVlInICsgb2Zmc2V0KSxcclxuICAgICAgICAgICAgaGxzOiB3ZWJjYXN0WydsaXZlU3RhdGVEYXRhJ10ucGxheW91dC5obHNVcmwucmVwbGFjZSgnL21hc3Rlci5tM3U4JywgJ0R2ci9wbGF5bGlzdC5tM3U4P0RWUicgKyBvZmZzZXQpXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUgPSBmdW5jdGlvbiAod2ViY2FzdCwgc3RhdGUpIHtcclxuICAgICAgICB2YXIgaGxzID0gd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5obHNVcmw7XHJcbiAgICAgICAgdmFyIGRhc2ggPSB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmRhc2hVcmw7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gd2ViY2FzdC5uYW1lO1xyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LnZpZGVvTWFuYWdlckhsc1VybCkgJiYgd2ViY2FzdFtzdGF0ZV0ucGxheW91dC52aWRlb01hbmFnZXJIbHNVcmwpIHtcclxuICAgICAgICAgICAgaGxzID0gd2ViY2FzdFtzdGF0ZV0ucGxheW91dC52aWRlb01hbmFnZXJIbHNVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0Lm9mZnNldCkpIHtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHBhcnNlSW50KHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQub2Zmc2V0LCAxMCk7XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0UHJlZml4ID0gJz8nO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgICAgIHBhcnNlci5ocmVmID0gaGxzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRQcmVmaXggPSAnJic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBobHMgKz0gb2Zmc2V0UHJlZml4ICsgJ3N0YXJ0PScgKyBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoZGFzaCkgJiYgZGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFByZWZpeCA9ICc/JztcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuaHJlZiA9IGRhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UHJlZml4ID0gJyYnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYXNoICs9IG9mZnNldFByZWZpeCArICdzdGFydD0nICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IGRhc2g6IGRhc2gsIGhsczogaGxzLCB0aXRsZTogdGl0bGUgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQml0bW92aW5Db250cm9sbGVyO1xyXG59KCkpO1xyXG5CaXRtb3ZpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQml0bW92aW5Db250cm9sbGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2JpdGRhc2gtY29udHJvbGxlci50c1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcclxudmFyIEJpdGRhc2hEaXJlY3RpdmUgPSBmdW5jdGlvbiAoJHdpbmRvdykgeyByZXR1cm4gKHtcclxuICAgIGNvbnRyb2xsZXI6ICdNaUJpdGRhc2hDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJBczogJ2JpdGRhc2hWbScsXHJcbiAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICAgIGNvbmZpZzogJz0nLFxyXG4gICAgICAgIG9wdGlvbnM6ICc9PycsXHJcbiAgICAgICAgd2ViY2FzdDogJz0nLFxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiBcIjxkaXYgaWQ9XFxcIm1pLWJpdGRhc2gtcGxheWVyXFxcIiB3aWR0aD1cXFwiMTAwJVxcXCIgaGVpZ2h0PVxcXCJhdXRvXFxcIj48L2Rpdj5cIixcclxuICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xyXG4gICAgICAgIHZhciBiaXRtb3ZpblBsYXllcjtcclxuICAgICAgICB2YXIgYml0bW92aW5VSU1hbmFnZXI7XHJcbiAgICAgICAgdmFyIGJpdG1vdmluQ29udHJvbGJhcjtcclxuICAgICAgICB2YXIgY29uZmlnID0gc2NvcGUuY29uZmlnO1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IHNjb3BlLndlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcclxuICAgICAgICBidWlsZFBsYXllcigpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkUGxheWVyKCkge1xyXG4gICAgICAgICAgICBiaXRtb3ZpblBsYXllciA9ICR3aW5kb3cud2luZG93LmJpdG1vdmluLnBsYXllcignbWktYml0ZGFzaC1wbGF5ZXInKTtcclxuICAgICAgICAgICAgY2hlY2tJc1BsYXllckxvYWRlZCgpO1xyXG4gICAgICAgICAgICBiaXRtb3ZpblBsYXllclxyXG4gICAgICAgICAgICAgICAgLnNldHVwKGNvbmZpZylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGJpdG1vdmluVUlNYW5hZ2VyID0gJHdpbmRvdy53aW5kb3cuYml0bW92aW4ucGxheWVydWkuVUlNYW5hZ2VyLkZhY3Rvcnk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBdWRpb09ubHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdG1vdmluVUlNYW5hZ2VyLmJ1aWxkQXVkaW9Pbmx5VUkoYml0bW92aW5QbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEF1ZGlvT25seVN0aWxsSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdG1vdmluVUlNYW5hZ2VyLmJ1aWxkQXVkaW9WaWRlb1VJKGJpdG1vdmluUGxheWVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gJ2xpdmVTdGF0ZURhdGEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JtcHVpLXNlZWtiYXInKSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJpdG1vdmluQ29udHJvbGJhciA9IGdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JpdG1vdmlucGxheWVyLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGJpdG1vdmluQ29udHJvbGJhcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBiaXRtb3ZpbkNvbnRyb2xiYXIuc3R5bGUubWluV2lkdGggPSAnMTc1cHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJpdG1vdmluQ29udHJvbGJhci5zdHlsZS5taW5IZWlnaHQgPSAnMTAxcHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcgKyByZWFzb24uY29kZSArICcgLSAnICsgcmVhc29uLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tJc1BsYXllckxvYWRlZCgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGJpdG1vdmluUGxheWVyKSAmJiBiaXRtb3ZpblBsYXllci5pc1JlYWR5KCkgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGJpdG1vdmluUGxheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGJpdG1vdmluUGxheWVyID0gJHdpbmRvdy53aW5kb3cuYml0bW92aW4ucGxheWVyKCdtaS1iaXRkYXNoLXBsYXllcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGlzQXVkaW9Pbmx5KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc0RlZmluZWQoc2NvcGUud2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHkpICYmXHJcbiAgICAgICAgICAgICAgICBzY29wZS53ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gc2V0QXVkaW9Pbmx5U3RpbGxJbWFnZSgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHNjb3BlLndlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuYXVkaW9Pbmx5U3RpbGxVcmwpICYmXHJcbiAgICAgICAgICAgICAgICBzY29wZS53ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seVN0aWxsVXJsICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibXB1aS11aS1hdWRpb29ubHktb3ZlcmxheScpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBzY29wZS53ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seVN0aWxsVXJsICsgJyknO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb250YWluJztcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyB9O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBCaXRkYXNoRGlyZWN0aXZlO1xyXG5CaXRkYXNoRGlyZWN0aXZlLiRpbmplY3QgPSBbJyR3aW5kb3cnXTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9iaXRkYXNoLWRpcmVjdGl2ZS50c1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==