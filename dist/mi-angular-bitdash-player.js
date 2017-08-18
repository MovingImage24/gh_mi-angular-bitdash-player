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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = __webpack_require__(37);
var dom_1 = __webpack_require__(2);
var eventdispatcher_1 = __webpack_require__(4);
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
            id: 'mi-wbc-id-' + guid_1.Guid.next(),
            cssPrefix: 'mi-wbc',
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
/* 1 */
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
var component_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(3);
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var eventdispatcher_1 = __webpack_require__(4);
var container_1 = __webpack_require__(1);
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
var utils_1 = __webpack_require__(3);
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
var component_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(2);
var eventdispatcher_1 = __webpack_require__(4);
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
var component_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(2);
var eventdispatcher_1 = __webpack_require__(4);
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
/* 7 */
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
var togglebutton_1 = __webpack_require__(10);
var utils_1 = __webpack_require__(3);
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
/* 9 */
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
var component_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(2);
var eventdispatcher_1 = __webpack_require__(4);
var timeout_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(3);
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
var button_1 = __webpack_require__(5);
var eventdispatcher_1 = __webpack_require__(4);
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
/* 11 */
/***/ (function(module, exports) {

module.exports = angular;

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
var button_1 = __webpack_require__(5);
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
var container_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(3);
var spacer_1 = __webpack_require__(21);
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
var container_1 = __webpack_require__(1);
var label_1 = __webpack_require__(6);
var tvnoisecanvas_1 = __webpack_require__(34);
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
/* 15 */
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
var playbacktogglebutton_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(2);
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
var label_1 = __webpack_require__(6);
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
var label_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(3);
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
var container_1 = __webpack_require__(1);
var hugeplaybacktogglebutton_1 = __webpack_require__(15);
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
var container_1 = __webpack_require__(1);
var label_1 = __webpack_require__(6);
var component_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(3);
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
var listselector_1 = __webpack_require__(32);
var dom_1 = __webpack_require__(2);
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
var component_1 = __webpack_require__(0);
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
var container_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(2);
var timeout_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(3);
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
            hideDelay: 2500,
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
                    // e.preventDefault();
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
var container_1 = __webpack_require__(1);
var volumeslider_1 = __webpack_require__(24);
var volumetogglebutton_1 = __webpack_require__(25);
var timeout_1 = __webpack_require__(7);
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
var seekbar_1 = __webpack_require__(9);
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
var togglebutton_1 = __webpack_require__(10);
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='player.d.ts' />
var uimanager_1 = __webpack_require__(38);
var button_1 = __webpack_require__(5);
var controlbar_1 = __webpack_require__(13);
var hugeplaybacktogglebutton_1 = __webpack_require__(15);
var playbacktimelabel_1 = __webpack_require__(17);
var playbacktogglebutton_1 = __webpack_require__(8);
var seekbar_1 = __webpack_require__(9);
var selectbox_1 = __webpack_require__(20);
var togglebutton_1 = __webpack_require__(10);
var videoqualityselectbox_1 = __webpack_require__(35);
var volumetogglebutton_1 = __webpack_require__(25);
var watermark_1 = __webpack_require__(36);
var uicontainer_1 = __webpack_require__(22);
var container_1 = __webpack_require__(1);
var label_1 = __webpack_require__(6);
var component_1 = __webpack_require__(0);
var errormessageoverlay_1 = __webpack_require__(14);
var seekbarlabel_1 = __webpack_require__(19);
var titlebar_1 = __webpack_require__(33);
var volumecontrolbutton_1 = __webpack_require__(23);
var clickoverlay_1 = __webpack_require__(12);
var hugereplaybutton_1 = __webpack_require__(31);
var bufferingoverlay_1 = __webpack_require__(29);
var playbacktoggleoverlay_1 = __webpack_require__(18);
var closebutton_1 = __webpack_require__(30);
var metadatalabel_1 = __webpack_require__(16);
var volumeslider_1 = __webpack_require__(24);
var spacer_1 = __webpack_require__(21);
var utils_1 = __webpack_require__(3);
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
    BufferingOverlay: bufferingoverlay_1.BufferingOverlay,
    Button: button_1.Button,
    ClickOverlay: clickoverlay_1.ClickOverlay,
    CloseButton: closebutton_1.CloseButton,
    Component: component_1.Component,
    Container: container_1.Container,
    ControlBar: controlbar_1.ControlBar,
    ErrorMessageOverlay: errormessageoverlay_1.ErrorMessageOverlay,
    HugePlaybackToggleButton: hugeplaybacktogglebutton_1.HugePlaybackToggleButton,
    HugeReplayButton: hugereplaybutton_1.HugeReplayButton,
    Label: label_1.Label,
    MetadataLabel: metadatalabel_1.MetadataLabel,
    MetadataLabelContent: metadatalabel_1.MetadataLabelContent,
    PlaybackTimeLabel: playbacktimelabel_1.PlaybackTimeLabel,
    PlaybackTimeLabelMode: playbacktimelabel_1.PlaybackTimeLabelMode,
    PlaybackToggleButton: playbacktogglebutton_1.PlaybackToggleButton,
    PlaybackToggleOverlay: playbacktoggleoverlay_1.PlaybackToggleOverlay,
    SeekBar: seekbar_1.SeekBar,
    SeekBarLabel: seekbarlabel_1.SeekBarLabel,
    SelectBox: selectbox_1.SelectBox,
    Spacer: spacer_1.Spacer,
    TitleBar: titlebar_1.TitleBar,
    ToggleButton: togglebutton_1.ToggleButton,
    UIContainer: uicontainer_1.UIContainer,
    VideoQualitySelectBox: videoqualityselectbox_1.VideoQualitySelectBox,
    VolumeControlButton: volumecontrolbutton_1.VolumeControlButton,
    VolumeSlider: volumeslider_1.VolumeSlider,
    VolumeToggleButton: volumetogglebutton_1.VolumeToggleButton,
    Watermark: watermark_1.Watermark,
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(11);
var bitdash_controller_1 = __webpack_require__(39);
var bitdash_directive_1 = __webpack_require__(40);
var moduleName = 'mi.BitdashPlayer';
exports.default = angular.module(moduleName, [])
    .controller('MiBitdashController', bitdash_controller_1.default)
    .directive('miBitdashPlayer', bitdash_directive_1.default);


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
var container_1 = __webpack_require__(1);
var component_1 = __webpack_require__(0);
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
            components: _this.audioonly,
            hidden: false
        }, _this.config);
        return _this;
    }
    AudioOnlyOverlay.prototype.configure = function (player, uimanager) {
        _super.prototype.configure.call(this, player, uimanager);
        var self = this;
        var image = self.getDomElement().css('background-image');
        // Hide overlay when Player is paused, so we can see the Big Play Button
        player.addEventHandler(player.EVENT.ON_PAUSED, function (event) {
            self.getDomElement().css('background-image', 'none');
        });
        player.addEventHandler(player.EVENT.ON_PLAY, function (event) {
            self.getDomElement().css('background-image', image);
        });
        // Hide overlay if player is  paused at init (e.g. on mobile devices)
        if (!player.isPlaying()) {
            self.getDomElement().css('background-image', 'none');
        }
    };
    return AudioOnlyOverlay;
}(container_1.Container));
exports.AudioOnlyOverlay = AudioOnlyOverlay;


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
var container_1 = __webpack_require__(1);
var component_1 = __webpack_require__(0);
var timeout_1 = __webpack_require__(7);
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
/* 30 */
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
var button_1 = __webpack_require__(5);
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
/* 31 */
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
var button_1 = __webpack_require__(5);
var dom_1 = __webpack_require__(2);
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
var component_1 = __webpack_require__(0);
var eventdispatcher_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(3);
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
var container_1 = __webpack_require__(1);
var metadatalabel_1 = __webpack_require__(16);
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
var component_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(2);
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
var selectbox_1 = __webpack_require__(20);
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
var clickoverlay_1 = __webpack_require__(12);
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
/* 37 */
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
var uicontainer_1 = __webpack_require__(22);
var dom_1 = __webpack_require__(2);
var component_1 = __webpack_require__(0);
var container_1 = __webpack_require__(1);
var playbacktogglebutton_1 = __webpack_require__(8);
var seekbar_1 = __webpack_require__(9);
var playbacktimelabel_1 = __webpack_require__(17);
var controlbar_1 = __webpack_require__(13);
var eventdispatcher_1 = __webpack_require__(4);
var seekbarlabel_1 = __webpack_require__(19);
var volumecontrolbutton_1 = __webpack_require__(23);
var errormessageoverlay_1 = __webpack_require__(14);
var utils_1 = __webpack_require__(3);
var audioonlyoverlay_1 = __webpack_require__(28);
var playbacktoggleoverlay_1 = __webpack_require__(18);
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
                    new seekbar_1.SeekBar({ label: new seekbarlabel_1.SeekBarLabel() }),
                    new playbacktimelabel_1.PlaybackTimeLabel(),
                    new volumecontrolbutton_1.VolumeControlButton({ 'vertical': true }),
                    // new FullscreenToggleButton(),
                    new component_1.Component({ cssClass: 'spacer' })
                ]
            }, true);
            var ui = new uicontainer_1.UIContainer({
                components: [
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
                    new audioonlyoverlay_1.AudioOnlyOverlay(),
                    new playbacktoggleoverlay_1.PlaybackToggleOverlay(),
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(11);
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(11);
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
        var webcast = scope.webcast;
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
                    document.getElementById('bitmovinplayer-video-mi-bitdash-player').setAttribute('title', webcast.name);
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
module.exports = __webpack_require__(26);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTUzYjE2MDJmY2ExYWQ1ZjI2YmMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvY29udGFpbmVyLnRzIiwid2VicGFjazovLy8uLi9saWIvZG9tLnRzIiwid2VicGFjazovLy8uLi9saWIvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9ldmVudGRpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2J1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvbGFiZWwudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi90aW1lb3V0LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvc2Vla2Jhci50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvdG9nZ2xlYnV0dG9uLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvY2xpY2tvdmVybGF5LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9jb250cm9sYmFyLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9lcnJvcm1lc3NhZ2VvdmVybGF5LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9odWdlcGxheWJhY2t0b2dnbGVidXR0b24udHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL21ldGFkYXRhbGFiZWwudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3BsYXliYWNrdGltZWxhYmVsLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZW92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3NlZWtiYXJsYWJlbC50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2NvbXBvbmVudHMvc2VsZWN0Ym94LnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9zcGFjZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3VpY29udGFpbmVyLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy92b2x1bWVjb250cm9sYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy92b2x1bWVzbGlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3ZvbHVtZXRvZ2dsZWJ1dHRvbi50cyIsIndlYnBhY2s6Ly8vLi4vbGliL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2F1ZGlvb25seW92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2J1ZmZlcmluZ292ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL2Nsb3NlYnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9odWdlcmVwbGF5YnV0dG9uLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy9saXN0c2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3RpdGxlYmFyLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy90dm5vaXNlY2FudmFzLnRzIiwid2VicGFjazovLy8uLi9saWIvY29tcG9uZW50cy92aWRlb3F1YWxpdHlzZWxlY3Rib3gudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9jb21wb25lbnRzL3dhdGVybWFyay50cyIsIndlYnBhY2s6Ly8vLi4vbGliL2d1aWQudHMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi91aW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYml0ZGFzaC1jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL2JpdGRhc2gtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGFBQWE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsOEJBQThCO0FBQzlDO0FBQ0E7QUFDQSw2RUFBNkUsd0NBQXdDO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGNBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFlBQVksZ0RBQWdELCtCQUErQjtBQUN4SCxnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQ2hZQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw2REFBNkQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBLGdDQUFnQyxvQ0FBb0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsNEJBQTRCLEtBQUsseUJBQXlCO0FBQ3hGLFNBQVMseUJBQXlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGNBQWM7QUFDdEQ7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0EsdURBQXVELHVDQUF1QywrREFBK0Q7QUFDN0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx3RUFBd0U7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0YsNENBQTRDO0FBQzlIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxnQkFBZ0I7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDLGdFQUFnRTtBQUNqRTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELHVCQUF1QjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGdCQUFnQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHdDQUF3QztBQUN4QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7QUFDQSIsImZpbGUiOiJtaS1hbmd1bGFyLWJpdGRhc2gtcGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0MSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTUzYjE2MDJmY2ExYWQ1ZjI2YmMiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZ3VpZF8xID0gcmVxdWlyZShcIi4uL2d1aWRcIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuLi9kb21cIik7XHJcbnZhciBldmVudGRpc3BhdGNoZXJfMSA9IHJlcXVpcmUoXCIuLi9ldmVudGRpc3BhdGNoZXJcIik7XHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBjbGFzcyBvZiB0aGUgVUkgZnJhbWV3b3JrLlxyXG4gKiBFYWNoIGNvbXBvbmVudCBtdXN0IGV4dGVuZCB0aGlzIGNsYXNzIGFuZCBvcHRpb25hbGx5IHRoZSBjb25maWcgaW50ZXJmYWNlLlxyXG4gKi9cclxudmFyIENvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdHMgYSBjb21wb25lbnQgd2l0aCBhbiBvcHRpb25hbGx5IHN1cHBsaWVkIGNvbmZpZy4gQWxsIHN1YmNsYXNzZXMgbXVzdCBjYWxsIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGVpclxyXG4gICAgICogc3VwZXJjbGFzcyBhbmQgdGhlbiBtZXJnZSB0aGVpciBjb25maWd1cmF0aW9uIGludG8gdGhlIGNvbXBvbmVudCdzIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gY29uZmlnIHRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIENvbXBvbmVudChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgbGlzdCBvZiBldmVudHMgdGhhdCB0aGlzIGNvbXBvbmVudCBvZmZlcnMuIFRoZXNlIGV2ZW50cyBzaG91bGQgYWx3YXlzIGJlIHByaXZhdGUgYW5kIG9ubHkgZGlyZWN0bHlcclxuICAgICAgICAgKiBhY2Nlc3NlZCBmcm9tIHdpdGhpbiB0aGUgaW1wbGVtZW50aW5nIGNvbXBvbmVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEJlY2F1c2UgVHlwZVNjcmlwdCBkb2VzIG5vdCBzdXBwb3J0IHByaXZhdGUgcHJvcGVydGllcyB3aXRoIHRoZSBzYW1lIG5hbWUgb24gZGlmZmVyZW50IGNsYXNzIGhpZXJhcmNoeSBsZXZlbHNcclxuICAgICAgICAgKiAoaS5lLiBzdXBlcmNsYXNzIGFuZCBzdWJjbGFzcyBjYW5ub3QgY29udGFpbiBhIHByaXZhdGUgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lKSwgdGhlIGRlZmF1bHQgbmFtaW5nXHJcbiAgICAgICAgICogY29udmVudGlvbiBmb3IgdGhlIGV2ZW50IGxpc3Qgb2YgYSBjb21wb25lbnQgdGhhdCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgc3ViY2xhc3NlcyBpcyB0aGUgY29uY2F0ZW5hdGlvbiBvZiB0aGVcclxuICAgICAgICAgKiBjYW1lbC1jYXNlZCBjbGFzcyBuYW1lICsgJ0V2ZW50cycgKGUuZy4gU3ViQ2xhc3MgZXh0ZW5kcyBDb21wb25lbnQgPT4gc3ViQ2xhc3NFdmVudHMpLlxyXG4gICAgICAgICAqIFNlZSB7QGxpbmsgI2NvbXBvbmVudEV2ZW50c30gZm9yIGFuIGV4YW1wbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBFdmVudCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBuYW1lZCBpbiBjYW1lbCBjYXNlIHdpdGggYW4gJ29uJyBwcmVmaXggYW5kIGluIHRoZSBwcmVzZW50IHRlbnNlLiBBc3luYyBldmVudHMgbWF5XHJcbiAgICAgICAgICogaGF2ZSBhIHN0YXJ0IGV2ZW50ICh3aGVuIHRoZSBvcGVyYXRpb24gc3RhcnRzKSBpbiB0aGUgcHJlc2VudCB0ZW5zZSwgYW5kIG11c3QgaGF2ZSBhbiBlbmQgZXZlbnQgKHdoZW4gdGhlXHJcbiAgICAgICAgICogb3BlcmF0aW9uIGVuZHMpIGluIHRoZSBwYXN0IHRlbnNlIChvciBwcmVzZW50IHRlbnNlIGluIHNwZWNpYWwgY2FzZXMgKGUuZy4gb25TdGFydC9vblN0YXJ0ZWQgb3Igb25QbGF5L29uUGxheWluZykuXHJcbiAgICAgICAgICogU2VlIHtAbGluayAjY29tcG9uZW50RXZlbnRzI29uU2hvd30gZm9yIGFuIGV4YW1wbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBFYWNoIGV2ZW50IHNob3VsZCBiZSBhY2NvbXBhbmllZCB3aXRoIGEgcHJvdGVjdGVkIG1ldGhvZCBuYW1lZCBieSB0aGUgY29udmVudGlvbiBldmVudE5hbWUgKyAnRXZlbnQnXHJcbiAgICAgICAgICogKGUuZy4gb25TdGFydEV2ZW50KSwgdGhhdCBhY3R1YWxseSB0cmlnZ2VycyB0aGUgZXZlbnQgYnkgY2FsbGluZyB7QGxpbmsgRXZlbnREaXNwYXRjaGVyI2Rpc3BhdGNoIGRpc3BhdGNofSBhbmRcclxuICAgICAgICAgKiBwYXNzaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgYXMgZmlyc3QgcGFyYW1ldGVyLiBDb21wb25lbnRzIHNob3VsZCBhbHdheXMgdHJpZ2dlciB0aGVpciBldmVudHMgd2l0aCB0aGVzZVxyXG4gICAgICAgICAqIG1ldGhvZHMuIEltcGxlbWVudGluZyB0aGlzIHBhdHRlcm4gZ2l2ZXMgc3ViY2xhc3NlcyBtZWFucyB0byBkaXJlY3RseSBsaXN0ZW4gdG8gdGhlIGV2ZW50cyBieSBvdmVycmlkaW5nIHRoZVxyXG4gICAgICAgICAqIG1ldGhvZCAoYW5kIHNhdmluZyB0aGUgb3ZlcmhlYWQgb2YgcGFzc2luZyBhIGhhbmRsZXIgdG8gdGhlIGV2ZW50IGRpc3BhdGNoZXIpIGFuZCBtb3JlIGltcG9ydGFudGx5IHRvIHRyaWdnZXJcclxuICAgICAgICAgKiB0aGVzZSBldmVudHMgd2l0aG91dCBoYXZpbmcgYWNjZXNzIHRvIHRoZSBwcml2YXRlIGV2ZW50IGxpc3QuXHJcbiAgICAgICAgICogU2VlIHtAbGluayAjb25TaG93fSBmb3IgYW4gZXhhbXBsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRvIHByb3ZpZGUgZXh0ZXJuYWwgY29kZSB0aGUgcG9zc2liaWxpdHkgdG8gbGlzdGVuIHRvIHRoaXMgY29tcG9uZW50J3MgZXZlbnRzIChzdWJzY3JpYmUsIHVuc3Vic2NyaWJlLCBldGMuKSxcclxuICAgICAgICAgKiBlYWNoIGV2ZW50IHNob3VsZCBhbHNvIGJlIGFjY29tcGFuaWVkIGJ5IGEgcHVibGljIGdldHRlciBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGV2ZW50J3MgcHJvcGVydHksXHJcbiAgICAgICAgICogdGhhdCByZXR1cm5zIHRoZSB7QGxpbmsgRXZlbnR9IG9idGFpbmVkIGZyb20gdGhlIGV2ZW50IGRpc3BhdGNoZXIgYnkgY2FsbGluZyB7QGxpbmsgRXZlbnREaXNwYXRjaGVyI2dldEV2ZW50fS5cclxuICAgICAgICAgKiBTZWUge0BsaW5rICNvblNob3d9IGZvciBhbiBleGFtcGxlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogRnVsbCBleGFtcGxlIGZvciBhbiBldmVudCByZXByZXNlbnRpbmcgYW4gZXhhbXBsZSBhY3Rpb24gaW4gYSBleGFtcGxlIGNvbXBvbmVudDpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIDxjb2RlPlxyXG4gICAgICAgICAqIC8vIERlZmluZSBhbiBleGFtcGxlIGNvbXBvbmVudCBjbGFzcyB3aXRoIGFuIGV4YW1wbGUgZXZlbnRcclxuICAgICAgICAgKiBjbGFzcyBFeGFtcGxlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PENvbXBvbmVudENvbmZpZz4ge1xyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqICAgICBwcml2YXRlIGV4YW1wbGVDb21wb25lbnRFdmVudHMgPSB7XHJcbiAgICAgICAgICAgKiAgICAgICAgIG9uRXhhbXBsZUFjdGlvbjogbmV3IEV2ZW50RGlzcGF0Y2hlcjxFeGFtcGxlQ29tcG9uZW50LCBOb0FyZ3M+KClcclxuICAgICAgICAgICAqICAgICB9XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yIGFuZCBvdGhlciBzdHVmZi4uLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqICAgICBwcm90ZWN0ZWQgb25FeGFtcGxlQWN0aW9uRXZlbnQoKSB7XHJcbiAgICAgICAgICAgKiAgICAgICAgdGhpcy5leGFtcGxlQ29tcG9uZW50RXZlbnRzLm9uRXhhbXBsZUFjdGlvbi5kaXNwYXRjaCh0aGlzKTtcclxuICAgICAgICAgICAqICAgIH1cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiAgICBnZXQgb25FeGFtcGxlQWN0aW9uKCk6IEV2ZW50PEV4YW1wbGVDb21wb25lbnQsIE5vQXJncz4ge1xyXG4gICAgICAgICAgICogICAgICAgIHJldHVybiB0aGlzLmV4YW1wbGVDb21wb25lbnRFdmVudHMub25FeGFtcGxlQWN0aW9uLmdldEV2ZW50KCk7XHJcbiAgICAgICAgICAgKiAgICB9XHJcbiAgICAgICAgICAgKiB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBzb21ld2hlcmVcclxuICAgICAgICAgKiB2YXIgZXhhbXBsZUNvbXBvbmVudEluc3RhbmNlID0gbmV3IEV4YW1wbGVDb21wb25lbnQoKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIC8vIFN1YnNjcmliZSB0byB0aGUgZXhhbXBsZSBldmVudCBvbiB0aGUgY29tcG9uZW50XHJcbiAgICAgICAgICogZXhhbXBsZUNvbXBvbmVudEluc3RhbmNlLm9uRXhhbXBsZUFjdGlvbi5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlcjogRXhhbXBsZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICogICAgIGNvbnNvbGUubG9nKCdvbkV4YW1wbGVBY3Rpb24gb2YgJyArIHNlbmRlciArICcgaGFzIGZpcmVkIScpO1xyXG4gICAgICAgICAgICogfSk7XHJcbiAgICAgICAgICogPC9jb2RlPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvblNob3c6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25IaWRlOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uSG92ZXJDaGFuZ2VkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoaXMgY29tcG9uZW50XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgICAgICBpZDogJ21pLXdiYy1pZC0nICsgZ3VpZF8xLkd1aWQubmV4dCgpLFxyXG4gICAgICAgICAgICBjc3NQcmVmaXg6ICdtaS13YmMnLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWNvbXBvbmVudCcsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzZXM6IFtdLFxyXG4gICAgICAgICAgICBoaWRkZW46IGZhbHNlXHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50LCBlLmcuIGJ5IGFwcGx5aW5nIGNvbmZpZyBzZXR0aW5ncy5cclxuICAgICAqIFRoaXMgbWV0aG9kIG11c3Qgbm90IGJlIGNhbGxlZCBmcm9tIG91dHNpZGUgdGhlIFVJIGZyYW1ld29yay5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCBieSB0aGUge0BsaW5rIFVJSW5zdGFuY2VNYW5hZ2VyfS4gSWYgdGhlIGNvbXBvbmVudCBpcyBhbiBpbm5lciBjb21wb25lbnQgb2ZcclxuICAgICAqIHNvbWUgY29tcG9uZW50LCBhbmQgdGh1cyBlbmNhcHN1bGF0ZWQgYWJkIG1hbmFnZWQgaW50ZXJuYWxseSBhbmQgbmV2ZXIgZGlyZWN0bHkgZXhwb3NlZCB0byB0aGUgVUlNYW5hZ2VyLFxyXG4gICAgICogdGhpcyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgZnJvbSB0aGUgbWFuYWdpbmcgY29tcG9uZW50J3Mge0BsaW5rICNpbml0aWFsaXplfSBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRoaXMuY29uZmlnLmhpZGRlbjtcclxuICAgICAgICAvLyBIaWRlIHRoZSBjb21wb25lbnQgYXQgaW5pdGlhbGl6YXRpb24gaWYgaXQgaXMgY29uZmlndXJlZCB0byBiZSBoaWRkZW5cclxuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7IC8vIFNldCBmbGFnIHRvIGZhbHNlIGZvciB0aGUgZm9sbG93aW5nIGhpZGUoKSBjYWxsIHRvIHdvcmsgKGhpZGUoKSBjaGVja3MgdGhlIGZsYWcpXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgdGhlIGNvbXBvbmVudCBmb3IgdGhlIHN1cHBsaWVkIFBsYXllciBhbmQgVUlJbnN0YW5jZU1hbmFnZXIuIFRoaXMgaXMgdGhlIHBsYWNlIHdoZXJlIGFsbCB0aGUgbWFnaWNcclxuICAgICAqIGhhcHBlbnMsIHdoZXJlIGNvbXBvbmVudHMgdHlwaWNhbGx5IHN1YnNjcmliZSBhbmQgcmVhY3QgdG8gZXZlbnRzIChvbiB0aGVpciBET00gZWxlbWVudCwgdGhlIFBsYXllciwgb3IgdGhlXHJcbiAgICAgKiBVSUluc3RhbmNlTWFuYWdlciksIGFuZCBiYXNpY2FsbHkgZXZlcnl0aGluZyB0aGF0IG1ha2VzIHRoZW0gaW50ZXJhY3RpdmUuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgb25seSBvbmNlLCB3aGVuIHRoZSBVSU1hbmFnZXIgaW5pdGlhbGl6ZXMgdGhlIFVJLlxyXG4gICAgICpcclxuICAgICAqIFN1YmNsYXNzZXMgdXN1YWxseSBvdmVyd3JpdGUgdGhpcyBtZXRob2QgdG8gYWRkIHRoZWlyIG93biBmdW5jdGlvbmFsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgdGhlIHBsYXllciB3aGljaCB0aGlzIGNvbXBvbmVudCBjb250cm9sc1xyXG4gICAgICogQHBhcmFtIHVpbWFuYWdlciB0aGUgVUlJbnN0YW5jZU1hbmFnZXIgdGhhdCBtYW5hZ2VzIHRoaXMgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLm9uU2hvdy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1aW1hbmFnZXIub25Db21wb25lbnRTaG93LmRpc3BhdGNoKF90aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9uSGlkZS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB1aW1hbmFnZXIub25Db21wb25lbnRIaWRlLmRpc3BhdGNoKF90aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBUcmFjayB0aGUgaG92ZXJlZCBzdGF0ZSBvZiB0aGUgZWxlbWVudFxyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5vbkhvdmVyQ2hhbmdlZEV2ZW50KHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5vbkhvdmVyQ2hhbmdlZEV2ZW50KGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbGVhc2VzIGFsbCByZXNvdXJjZXMgYW5kIGRlcGVuZGVuY2llcyB0aGF0IHRoZSBjb21wb25lbnQgaG9sZHMuIFBsYXllciwgRE9NLCBhbmQgVUlNYW5hZ2VyIGV2ZW50cyBhcmVcclxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBkdXJpbmcgcmVsZWFzZSBhbmQgZG8gbm90IGV4cGxpY2l0bHkgbmVlZCB0byBiZSByZW1vdmVkIGhlcmUuXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIFVJTWFuYWdlciB3aGVuIGl0IHJlbGVhc2VzIHRoZSBVSS5cclxuICAgICAqXHJcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgbmVlZCB0byByZWxlYXNlIHJlc291cmNlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgYW5kIGNhbGwgc3VwZXIucmVsZWFzZSgpLlxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gTm90aGluZyB0byBkbyBoZXJlLCBvdmVycmlkZSB3aGVyZSBuZWNlc3NhcnlcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIHRoZSBET00gZWxlbWVudCBmb3IgdGhpcyBjb21wb25lbnQuXHJcbiAgICAgKlxyXG4gICAgICogU3ViY2xhc3NlcyB1c3VhbGx5IG92ZXJ3cml0ZSB0aGlzIG1ldGhvZCB0byBleHRlbmQgb3IgcmVwbGFjZSB0aGUgRE9NIGVsZW1lbnQgd2l0aCB0aGVpciBvd24gZGVzaWduLlxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBkb21fMS5ET00odGhpcy5jb25maWcudGFnLCB7XHJcbiAgICAgICAgICAgICdpZCc6IHRoaXMuY29uZmlnLmlkLFxyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLmdldENzc0NsYXNzZXMoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgRE9NIGVsZW1lbnQgb2YgdGhpcyBjb21wb25lbnQuIENyZWF0ZXMgdGhlIERPTSBlbGVtZW50IGlmIGl0IGRvZXMgbm90IHlldCBleGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBTaG91bGQgbm90IGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0RPTX1cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5nZXREb21FbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMudG9Eb21FbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBNZXJnZXMgYSBjb25maWd1cmF0aW9uIHdpdGggYSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gYW5kIGEgYmFzZSBjb25maWd1cmF0aW9uIGZyb20gdGhlIHN1cGVyY2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNvbmZpZyB0aGUgY29uZmlndXJhdGlvbiBzZXR0aW5ncyBmb3IgdGhlIGNvbXBvbmVudHMsIGFzIHVzdWFsbHkgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIGEgZGVmYXVsdCBjb25maWd1cmF0aW9uIGZvciBzZXR0aW5ncyB0aGF0IGFyZSBub3QgcGFzc2VkIHdpdGggdGhlIGNvbmZpZ3VyYXRpb25cclxuICAgICAqIEBwYXJhbSBiYXNlIGNvbmZpZ3VyYXRpb24gaW5oZXJpdGVkIGZyb20gYSBzdXBlcmNsYXNzXHJcbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnfVxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLm1lcmdlQ29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZywgZGVmYXVsdHMsIGJhc2UpIHtcclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWcgd2l0aCBzdXBwbGllZCBjb25maWdcclxuICAgICAgICB2YXIgbWVyZ2VkID0gT2JqZWN0LmFzc2lnbih7fSwgYmFzZSwgZGVmYXVsdHMsIGNvbmZpZyk7XHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBleHRlbmRlZCBjb25maWdcclxuICAgICAgICByZXR1cm4gbWVyZ2VkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIG1ldGhvZCB0aGF0IHJldHVybnMgYSBzdHJpbmcgb2YgYWxsIENTUyBjbGFzc2VzIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5nZXRDc3NDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gTWVyZ2UgYWxsIENTUyBjbGFzc2VzIGludG8gc2luZ2xlIGFycmF5XHJcbiAgICAgICAgdmFyIGZsYXR0ZW5lZEFycmF5ID0gW3RoaXMuY29uZmlnLmNzc0NsYXNzXS5jb25jYXQodGhpcy5jb25maWcuY3NzQ2xhc3Nlcyk7XHJcbiAgICAgICAgLy8gUHJlZml4IGNsYXNzZXNcclxuICAgICAgICBmbGF0dGVuZWRBcnJheSA9IGZsYXR0ZW5lZEFycmF5Lm1hcChmdW5jdGlvbiAoY3NzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5wcmVmaXhDc3MoY3NzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBKb2luIGFycmF5IHZhbHVlcyBpbnRvIGEgc3RyaW5nXHJcbiAgICAgICAgdmFyIGZsYXR0ZW5lZFN0cmluZyA9IGZsYXR0ZW5lZEFycmF5LmpvaW4oJyAnKTtcclxuICAgICAgICAvLyBSZXR1cm4gdHJpbW1lZCBzdHJpbmcgdG8gcHJldmVudCB3aGl0ZXNwYWNlIGF0IHRoZSBlbmQgZnJvbSB0aGUgam9pbiBvcGVyYXRpb25cclxuICAgICAgICByZXR1cm4gZmxhdHRlbmVkU3RyaW5nLnRyaW0oKTtcclxuICAgIH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnByZWZpeENzcyA9IGZ1bmN0aW9uIChjc3NDbGFzc09ySWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuY3NzUHJlZml4ICsgJy0nICsgY3NzQ2xhc3NPcklkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29uZmlndXJhdGlvbiBvYmplY3Qgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICAqIEByZXR1cm5zIHtDb25maWd9XHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhpZGVzIHRoZSBjb21wb25lbnQgaWYgc2hvd24uXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBiYXNpY2FsbHkgdHJhbnNmZXJzIHRoZSBjb21wb25lbnQgaW50byB0aGUgaGlkZGVuIHN0YXRlLiBBY3R1YWwgaGlkaW5nIGlzIGRvbmUgdmlhIENTUy5cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5oaWRkZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyh0aGlzLnByZWZpeENzcyhDb21wb25lbnQuQ0xBU1NfSElEREVOKSk7XHJcbiAgICAgICAgICAgIHRoaXMub25IaWRlRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93cyB0aGUgY29tcG9uZW50IGlmIGhpZGRlbi5cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xyXG4gICAgICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyh0aGlzLnByZWZpeENzcyhDb21wb25lbnQuQ0xBU1NfSElEREVOKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub25TaG93RXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb21wb25lbnQgaXMgaGlkZGVuLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGNvbXBvbmVudCBpcyBoaWRkZW4sIGVsc2UgZmFsc2VcclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5pc0hpZGRlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW47XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb21wb25lbnQgaXMgc2hvd24uXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgY29tcG9uZW50IGlzIHZpc2libGUsIGVsc2UgZmFsc2VcclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5pc1Nob3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc0hpZGRlbigpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlcyB0aGUgaGlkZGVuIHN0YXRlIGJ5IGhpZGluZyB0aGUgY29tcG9uZW50IGlmIGl0IGlzIHNob3duLCBvciBzaG93aW5nIGl0IGlmIGhpZGRlbi5cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS50b2dnbGVIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGNvbXBvbmVudCBpcyBjdXJyZW50bHkgaG92ZXJlZC5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBjb21wb25lbnQgaXMgaG92ZXJlZCwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLmlzSG92ZXJlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3ZlcmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIG9uU2hvdyBldmVudC5cclxuICAgICAqIFNlZSB0aGUgZGV0YWlsZWQgZXhwbGFuYXRpb24gb24gZXZlbnQgYXJjaGl0ZWN0dXJlIG9uIHRoZSB7QGxpbmsgI2NvbXBvbmVudEV2ZW50cyBldmVudHMgbGlzdH0uXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUub25TaG93RXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRFdmVudHMub25TaG93LmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIG9uSGlkZSBldmVudC5cclxuICAgICAqIFNlZSB0aGUgZGV0YWlsZWQgZXhwbGFuYXRpb24gb24gZXZlbnQgYXJjaGl0ZWN0dXJlIG9uIHRoZSB7QGxpbmsgI2NvbXBvbmVudEV2ZW50cyBldmVudHMgbGlzdH0uXHJcbiAgICAgKi9cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUub25IaWRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRFdmVudHMub25IaWRlLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIG9uSG92ZXJDaGFuZ2VkIGV2ZW50LlxyXG4gICAgICogU2VlIHRoZSBkZXRhaWxlZCBleHBsYW5hdGlvbiBvbiBldmVudCBhcmNoaXRlY3R1cmUgb24gdGhlIHtAbGluayAjY29tcG9uZW50RXZlbnRzIGV2ZW50cyBsaXN0fS5cclxuICAgICAqL1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5vbkhvdmVyQ2hhbmdlZEV2ZW50ID0gZnVuY3Rpb24gKGhvdmVyZWQpIHtcclxuICAgICAgICB0aGlzLmhvdmVyZWQgPSBob3ZlcmVkO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50RXZlbnRzLm9uSG92ZXJDaGFuZ2VkLmRpc3BhdGNoKHRoaXMsIHsgaG92ZXJlZDogaG92ZXJlZCB9KTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgXCJvblNob3dcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHNob3dpbmcuXHJcbiAgICAgICAgICogU2VlIHRoZSBkZXRhaWxlZCBleHBsYW5hdGlvbiBvbiBldmVudCBhcmNoaXRlY3R1cmUgb24gdGhlIHtAbGluayAjY29tcG9uZW50RXZlbnRzIGV2ZW50cyBsaXN0fS5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8Q29tcG9uZW50PENvbmZpZz4sIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudEV2ZW50cy5vblNob3cuZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnQucHJvdG90eXBlLCBcIm9uSGlkZVwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaGlkaW5nLlxyXG4gICAgICAgICAqIFNlZSB0aGUgZGV0YWlsZWQgZXhwbGFuYXRpb24gb24gZXZlbnQgYXJjaGl0ZWN0dXJlIG9uIHRoZSB7QGxpbmsgI2NvbXBvbmVudEV2ZW50cyBldmVudHMgbGlzdH0uXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PENvbXBvbmVudDxDb25maWc+LCBOb0FyZ3M+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRFdmVudHMub25IaWRlLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgXCJvbkhvdmVyQ2hhbmdlZFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBjb21wb25lbnQncyBob3Zlci1zdGF0ZSBpcyBjaGFuZ2luZy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8Q29tcG9uZW50PENvbmZpZz4sIENvbXBvbmVudEhvdmVyQ2hhbmdlZEV2ZW50QXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudEV2ZW50cy5vbkhvdmVyQ2hhbmdlZC5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIENvbXBvbmVudDtcclxufSgpKTtcclxuLyoqXHJcbiAqIFRoZSBjbGFzc25hbWUgdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgZWxlbWVudCB3aGVuIGl0IGlzIGluIHRoZSBoaWRkZW4gc3RhdGUuXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Db21wb25lbnQuQ0xBU1NfSElEREVOID0gJ2hpZGRlbic7XHJcbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9jb21wb25lbnQudHNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbi8qKlxyXG4gKiBBIGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBjYW4gY29udGFpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGQgY29tcG9uZW50cy5cclxuICogQ29tcG9uZW50cyBjYW4gYmUgYWRkZWQgYXQgY29uc3RydWN0aW9uIHRpbWUgdGhyb3VnaCB0aGUge0BsaW5rIENvbnRhaW5lckNvbmZpZyNjb21wb25lbnRzfSBzZXR0aW5nLCBvciBsYXRlclxyXG4gKiB0aHJvdWdoIHRoZSB7QGxpbmsgQ29udGFpbmVyI2FkZENvbXBvbmVudH0gbWV0aG9kLiBUaGUgVUlNYW5hZ2VyIGF1dG9tYXRpY2FsbHkgdGFrZXMgY2FyZSBvZiBhbGwgY29tcG9uZW50cywgaS5lLiBpdFxyXG4gKiBpbml0aWFsaXplcyBhbmQgY29uZmlndXJlcyB0aGVtIGF1dG9tYXRpY2FsbHkuXHJcbiAqXHJcbiAqIEluIHRoZSBET00sIHRoZSBjb250YWluZXIgY29uc2lzdHMgb2YgYW4gb3V0ZXIgPGRpdj4gKHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgYnkgdGhlIGNvbmZpZykgYW5kIGFuIGlubmVyIHdyYXBwZXJcclxuICogPGRpdj4gdGhhdCBjb250YWlucyB0aGUgY29tcG9uZW50cy4gVGhpcyBkb3VibGUtPGRpdj4tc3RydWN0dXJlIGlzIG9mdGVuIHJlcXVpcmVkIHRvIGFjaGlldmUgbWFueSBhZHZhbmNlZCBlZmZlY3RzXHJcbiAqIGluIENTUyBhbmQvb3IgSlMsIGUuZy4gYW5pbWF0aW9ucyBhbmQgY2VydGFpbiBmb3JtYXR0aW5nIHdpdGggYWJzb2x1dGUgcG9zaXRpb25pbmcuXHJcbiAqXHJcbiAqIERPTSBleGFtcGxlOlxyXG4gKiA8Y29kZT5cclxuICogICAgIDxkaXYgY2xhc3M9J3VpLWNvbnRhaW5lcic+XHJcbiAqICAgICAgICAgPGRpdiBjbGFzcz0nY29udGFpbmVyLXdyYXBwZXInPlxyXG4gKiAgICAgICAgICAgICAuLi4gY2hpbGQgY29tcG9uZW50cyAuLi5cclxuICogICAgICAgICA8L2Rpdj5cclxuICogICAgIDwvZGl2PlxyXG4gKiA8L2NvZGU+XHJcbiAqL1xyXG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDb250YWluZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDb250YWluZXIoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IFtdXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBjaGlsZCBjb21wb25lbnQgdG8gdGhlIGNvbnRhaW5lci5cclxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgdGhlIGNvbXBvbmVudCB0byBhZGRcclxuICAgICAqL1xyXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGEgY2hpbGQgY29tcG9uZW50IGZyb20gdGhlIGNvbnRhaW5lci5cclxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgdGhlIGNvbXBvbmVudCB0byByZW1vdmVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gcmVtb3ZlZCwgZmFsc2UgaWYgaXQgaXMgbm90IGNvbnRhaW5lZCBpbiB0aGlzIGNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNvbXBvbmVudCA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICByZXR1cm4gdXRpbHNfMS5BcnJheVV0aWxzLnJlbW92ZSh0aGlzLmNvbmZpZy5jb21wb25lbnRzLCBjb21wb25lbnQpICE9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIGFycmF5IG9mIGFsbCBjaGlsZCBjb21wb25lbnRzIGluIHRoaXMgY29udGFpbmVyLlxyXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudDxDb21wb25lbnRDb25maWc+W119XHJcbiAgICAgKi9cclxuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q29tcG9uZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuY29tcG9uZW50cztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGNoaWxkIGNvbXBvbmVudHMgZnJvbSB0aGUgY29udGFpbmVyLlxyXG4gICAgICovXHJcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuZ2V0Q29tcG9uZW50cygpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNvbXBvbmVudChjb21wb25lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIERPTSBvZiB0aGUgY29udGFpbmVyIHdpdGggdGhlIGN1cnJlbnQgY29tcG9uZW50cy5cclxuICAgICAqL1xyXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS51cGRhdGVDb21wb25lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaW5uZXJDb250YWluZXJFbGVtZW50LmVtcHR5KCk7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuY29uZmlnLmNvbXBvbmVudHM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIHRoaXMuaW5uZXJDb250YWluZXJFbGVtZW50LmFwcGVuZChjb21wb25lbnQuZ2V0RG9tRWxlbWVudCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250YWluZXIgZWxlbWVudCAodGhlIG91dGVyIDxkaXY+KVxyXG4gICAgICAgIHZhciBjb250YWluZXJFbGVtZW50ID0gbmV3IGRvbV8xLkRPTSh0aGlzLmNvbmZpZy50YWcsIHtcclxuICAgICAgICAgICAgJ2lkJzogdGhpcy5jb25maWcuaWQsXHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMuZ2V0Q3NzQ2xhc3NlcygpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBpbm5lciBjb250YWluZXIgZWxlbWVudCAodGhlIGlubmVyIDxkaXY+KSB0aGF0IHdpbGwgY29udGFpbiB0aGUgY29tcG9uZW50c1xyXG4gICAgICAgIHZhciBpbm5lckNvbnRhaW5lciA9IG5ldyBkb21fMS5ET00odGhpcy5jb25maWcudGFnLCB7XHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMucHJlZml4Q3NzKCdjb250YWluZXItd3JhcHBlcicpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbm5lckNvbnRhaW5lckVsZW1lbnQgPSBpbm5lckNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudHMoKTtcclxuICAgICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZChpbm5lckNvbnRhaW5lcik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENvbnRhaW5lcjtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2NvbnRhaW5lci50c1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vKipcclxuICogU2ltcGxlIERPTSBtYW5pcHVsYXRpb24gYW5kIERPTSBlbGVtZW50IGV2ZW50IGhhbmRsaW5nIG1vZGVsZWQgYWZ0ZXIgalF1ZXJ5IChhcyByZXBsYWNlbWVudCBmb3IgalF1ZXJ5KS5cclxuICpcclxuICogTGlrZSBqUXVlcnksIERPTSBvcGVyYXRlcyBvbiBzaW5nbGUgZWxlbWVudHMgYW5kIGxpc3RzIG9mIGVsZW1lbnRzLiBGb3IgZXhhbXBsZTogY3JlYXRpbmcgYW4gZWxlbWVudCByZXR1cm5zIGEgRE9NXHJcbiAqIGluc3RhbmNlIHdpdGggYSBzaW5nbGUgZWxlbWVudCwgc2VsZWN0aW5nIGVsZW1lbnRzIHJldHVybnMgYSBET00gaW5zdGFuY2Ugd2l0aCB6ZXJvLCBvbmUsIG9yIG1hbnkgZWxlbWVudHMuIFNpbWlsYXJcclxuICogdG8galF1ZXJ5LCBzZXR0ZXJzIHVzdWFsbHkgYWZmZWN0IGFsbCBlbGVtZW50cywgd2hpbGUgZ2V0dGVycyBvcGVyYXRlIG9uIG9ubHkgdGhlIGZpcnN0IGVsZW1lbnQuXHJcbiAqIEFsc28gc2ltaWxhciB0byBqUXVlcnksIG1vc3QgbWV0aG9kcyAoZXhjZXB0IGdldHRlcnMpIHJldHVybiB0aGUgRE9NIGluc3RhbmNlIGZhY2lsaXRhdGluZyBlYXN5IGNoYWluaW5nIG9mIG1ldGhvZFxyXG4gKiBjYWxscy5cclxuICpcclxuICogQnVpbHQgd2l0aCB0aGUgaGVscCBvZjogaHR0cDovL3lvdW1pZ2h0bm90bmVlZGpxdWVyeS5jb20vXHJcbiAqL1xyXG52YXIgRE9NID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERPTShzb21ldGhpbmcsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7IC8vIFNldCB0aGUgZ2xvYmFsIGRvY3VtZW50IHRvIHRoZSBsb2NhbCBkb2N1bWVudCBmaWVsZFxyXG4gICAgICAgIGlmIChzb21ldGhpbmcgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBpZiAoc29tZXRoaW5nLmxlbmd0aCA+IDAgJiYgc29tZXRoaW5nWzBdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IHNvbWV0aGluZztcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzb21ldGhpbmcgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHNvbWV0aGluZztcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtlbGVtZW50XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc29tZXRoaW5nIGluc3RhbmNlb2YgRG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gV2hlbiBhIGRvY3VtZW50IGlzIHBhc3NlZCBpbiwgd2UgZG8gbm90IGRvIGFueXRoaW5nIHdpdGggaXQsIGJ1dCBieSBzZXR0aW5nIHRoaXMuZWxlbWVudHMgdG8gbnVsbFxyXG4gICAgICAgICAgICAvLyB3ZSBnaXZlIHRoZSBldmVudCBoYW5kbGluZyBtZXRob2QgYSBtZWFucyB0byBkZXRlY3QgaWYgdGhlIGV2ZW50cyBzaG91bGQgYmUgcmVnaXN0ZXJlZCBvbiB0aGUgZG9jdW1lbnRcclxuICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBlbGVtZW50cy5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBzb21ldGhpbmc7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXR0cmlidXRlTmFtZSBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSBbZWxlbWVudF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBzb21ldGhpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLmZpbmRDaGlsZEVsZW1lbnRzKHNlbGVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NLnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBlbGVtZW50cyB0aGF0IHRoaXMgRE9NIGluc3RhbmNlIGN1cnJlbnRseSBob2xkcy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzID8gdGhpcy5lbGVtZW50cy5sZW5ndGggOiAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBIVE1MIGVsZW1lbnRzIHRoYXQgdGhpcyBET00gaW5zdGFuY2UgY3VycmVudGx5IGhvbGRzLlxyXG4gICAgICogQHJldHVybnMge0hUTUxFbGVtZW50W119IHRoZSByYXcgSFRNTCBlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQSBzaG9ydGN1dCBtZXRob2QgZm9yIGl0ZXJhdGluZyBhbGwgZWxlbWVudHMuIFNob3J0cyB0aGlzLmVsZW1lbnRzLmZvckVhY2goLi4uKSB0byB0aGlzLmZvckVhY2goLi4uKS5cclxuICAgICAqIEBwYXJhbSBoYW5kbGVyIHRoZSBoYW5kbGVyIHRvIGV4ZWN1dGUgYW4gb3BlcmF0aW9uIG9uIGFuIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaGFuZGxlcihlbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmZpbmRDaGlsZEVsZW1lbnRzT2ZFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgIC8vIENvbnZlcnQgTm9kZUxpc3QgdG8gQXJyYXlcclxuICAgICAgICAvLyBodHRwczovL3RvZGRtb3R0by5jb20vYS1jb21wcmVoZW5zaXZlLWRpdmUtaW50by1ub2RlbGlzdHMtYXJyYXlzLWNvbnZlcnRpbmctbm9kZWxpc3RzLWFuZC11bmRlcnN0YW5kaW5nLXRoZS1kb20vXHJcbiAgICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoY2hpbGRFbGVtZW50cyk7XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5maW5kQ2hpbGRFbGVtZW50cyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFsbENoaWxkRWxlbWVudHMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGFsbENoaWxkRWxlbWVudHMgPSBhbGxDaGlsZEVsZW1lbnRzLmNvbmNhdChfdGhpcy5maW5kQ2hpbGRFbGVtZW50c09mRWxlbWVudChlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRDaGlsZEVsZW1lbnRzT2ZFbGVtZW50KGRvY3VtZW50LCBzZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxDaGlsZEVsZW1lbnRzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYWxsIGNoaWxkIGVsZW1lbnRzIG9mIGFsbCBlbGVtZW50cyBtYXRjaGluZyB0aGUgc3VwcGxpZWQgc2VsZWN0b3IuXHJcbiAgICAgKiBAcGFyYW0gc2VsZWN0b3IgdGhlIHNlbGVjdG9yIHRvIG1hdGNoIHdpdGggY2hpbGQgZWxlbWVudHNcclxuICAgICAqIEByZXR1cm5zIHtET019IGEgbmV3IERPTSBpbnN0YW5jZSByZXByZXNlbnRpbmcgYWxsIG1hdGNoZWQgY2hpbGRyZW5cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIGFsbENoaWxkRWxlbWVudHMgPSB0aGlzLmZpbmRDaGlsZEVsZW1lbnRzKHNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm4gbmV3IERPTShhbGxDaGlsZEVsZW1lbnRzKTtcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRIdG1sKGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SHRtbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmdldEh0bWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbMF0uaW5uZXJIVE1MO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuc2V0SHRtbCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCB8fCBjb250ZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gU2V0IHRvIGVtcHR5IHN0cmluZyB0byBhdm9pZCBpbm5lckhUTUwgZ2V0dGluZyBzZXQgdG8gJ3VuZGVmaW5lZCcgKGFsbCBicm93c2Vycykgb3IgJ251bGwnIChJRTkpXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgaW5uZXIgSFRNTCBvZiBhbGwgZWxlbWVudHMgKGRlbGV0ZXMgYWxsIGNoaWxkcmVuKS5cclxuICAgICAqIEByZXR1cm5zIHtET019XHJcbiAgICAgKi9cclxuICAgIERPTS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBmaXJzdCBmb3JtIGVsZW1lbnQsIGUuZy4gdGhlIHNlbGVjdGVkIHZhbHVlIG9mIGEgc2VsZWN0IGJveCBvciB0aGUgdGV4dCBpZiBhblxyXG4gICAgICogaW5wdXQgZmllbGQuXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgdmFsdWUgb2YgYSBmb3JtIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS52YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzWzBdO1xyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHwgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGFkZCBzdXBwb3J0IGZvciBtaXNzaW5nIGZvcm0gZWxlbWVudHNcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmFsKCkgbm90IHN1cHBvcnRlZCBmb3IgXCIgKyB0eXBlb2YgZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEF0dHIoYXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyKGF0dHJpYnV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuZ2V0QXR0ciA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1swXS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLnNldEF0dHIgPSBmdW5jdGlvbiAoYXR0cmlidXRlLCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbiAoZGF0YUF0dHJpYnV0ZSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGF0YShkYXRhQXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKGRhdGFBdHRyaWJ1dGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbiAoZGF0YUF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgZGF0YUF0dHJpYnV0ZSk7XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24gKGRhdGFBdHRyaWJ1dGUsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBkYXRhQXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBcHBlbmRzIG9uZSBvciBtb3JlIERPTSBlbGVtZW50cyBhcyBjaGlsZHJlbiB0byBhbGwgZWxlbWVudHMuXHJcbiAgICAgKiBAcGFyYW0gY2hpbGRFbGVtZW50cyB0aGUgY2hyaWxkIGVsZW1lbnRzIHRvIGFwcGVuZFxyXG4gICAgICogQHJldHVybnMge0RPTX1cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkRWxlbWVudHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBjaGlsZEVsZW1lbnRzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBjaGlsZEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKF8sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQuZWxlbWVudHNbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIGVsZW1lbnRzIGZyb20gdGhlIERPTS5cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgb2Zmc2V0IG9mIHRoZSBmaXJzdCBlbGVtZW50IGZyb20gdGhlIGRvY3VtZW50J3MgdG9wIGxlZnQgY29ybmVyLlxyXG4gICAgICogQHJldHVybnMge09mZnNldH1cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzWzBdO1xyXG4gICAgICAgIHZhciBlbGVtZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIGh0bWxSZWN0ID0gZG9jdW1lbnQuYm9keS5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIC8vIFZpcnR1YWwgdmlld3BvcnQgc2Nyb2xsIGhhbmRsaW5nIChlLmcuIHBpbmNoIHpvb21lZCB2aWV3cG9ydHMgaW4gbW9iaWxlIGJyb3dzZXJzIG9yIGRlc2t0b3AgQ2hyb21lL0VkZ2UpXHJcbiAgICAgICAgLy8gJ25vcm1hbCcgem9vbXMgYW5kIHZpcnR1YWwgdmlld3BvcnQgem9vbXMgKGFrYSBsYXlvdXQgdmlld3BvcnQpIHJlc3VsdCBpbiBkaWZmZXJlbnRcclxuICAgICAgICAvLyBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIHJlc3VsdHM6XHJcbiAgICAgICAgLy8gIC0gd2l0aCBub3JtYWwgc2Nyb2xscywgdGhlIGNsaWVudFJlY3QgZGVjcmVhc2VzIHdpdGggYW4gaW5jcmVhc2UgaW4gc2Nyb2xsKFRvcHxMZWZ0KS9wYWdlKFh8WSlPZmZzZXRcclxuICAgICAgICAvLyAgLSB3aXRoIHBpbmNoIHpvb20gc2Nyb2xscywgdGhlIGNsaWVudFJlY3Qgc3RheXMgdGhlIHNhbWUgd2hpbGUgc2Nyb2xsL3BhZ2VPZmZzZXQgY2hhbmdlc1xyXG4gICAgICAgIC8vIFRoaXMgbWVhbnMsIHRoYXQgdGhlIGNvbWJpbmF0aW9uIG9mIGNsaWVudFJlY3QgKyBzY3JvbGwvcGFnZU9mZnNldCBkb2VzIG5vdCB3b3JrIHRvIGNhbGN1bGF0ZSB0aGUgb2Zmc2V0XHJcbiAgICAgICAgLy8gZnJvbSB0aGUgZG9jdW1lbnQncyB1cHBlciBsZWZ0IG9yaWdpbiB3aGVuIHBpbmNoIHpvb20gaXMgdXNlZC5cclxuICAgICAgICAvLyBUbyB3b3JrIGFyb3VuZCB0aGlzIGlzc3VlLCB3ZSBkbyBub3QgdXNlIHNjcm9sbC9wYWdlT2Zmc2V0IGJ1dCBnZXQgdGhlIGNsaWVudFJlY3Qgb2YgdGhlIGh0bWwgZWxlbWVudCBhbmRcclxuICAgICAgICAvLyBzdWJ0cmFjdCBpdCBmcm9tIHRoZSBlbGVtZW50J3MgcmVjdCwgd2hpY2ggYWx3YXlzIHJlc3VsdHMgaW4gdGhlIG9mZnNldCBmcm9tIHRoZSBkb2N1bWVudCBvcmlnaW4uXHJcbiAgICAgICAgLy8gTk9URTogdGhlIGN1cnJlbnQgd2F5IG9mIG9mZnNldCBjYWxjdWxhdGlvbiB3YXMgaW1wbGVtZW50ZWQgc3BlY2lmaWNhbGx5IHRvIHRyYWNrIGV2ZW50IHBvc2l0aW9ucyBvbiB0aGVcclxuICAgICAgICAvLyBzZWVrIGJhciwgYW5kIGl0IG1pZ2h0IGJyZWFrIGNvbXBhdGliaWxpdHkgd2l0aCBqUXVlcnkncyBvZmZzZXQoKSBtZXRob2QuIElmIHRoaXMgZXZlciB0dXJucyBvdXQgdG8gYmUgYVxyXG4gICAgICAgIC8vIHByb2JsZW0sIHRoaXMgbWV0aG9kIHNob3VsZCBiZSByZXZlcnRlZCB0byB0aGUgb2xkIHZlcnNpb24gYW5kIHRoZSBvZmZzZXQgY2FsY3VsYXRpb24gbW92ZWQgdG8gdGhlIHNlZWsgYmFyLlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogZWxlbWVudFJlY3QudG9wIC0gaHRtbFJlY3QudG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiBlbGVtZW50UmVjdC5sZWZ0IC0gaHRtbFJlY3QubGVmdFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGUgZmlyc3QgZWxlbWVudC5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSB3aWR0aCBvZiB0aGUgZmlyc3QgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLndpZHRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRPRE8gY2hlY2sgaWYgdGhpcyBpcyB0aGUgc2FtZSBhcyBqUXVlcnkncyB3aWR0aCgpIChwcm9iYWJseSBub3QpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbMF0ub2Zmc2V0V2lkdGg7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIGZpcnN0IGVsZW1lbnQuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoZSBmaXJzdCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIERPTS5wcm90b3R5cGUuaGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRPRE8gY2hlY2sgaWYgdGhpcyBpcyB0aGUgc2FtZSBhcyBqUXVlcnkncyBoZWlnaHQoKSAocHJvYmFibHkgbm90KVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWzBdLm9mZnNldEhlaWdodDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaGVzIGFuIGV2ZW50IGhhbmRsZXIgdG8gb25lIG9yIG1vcmUgZXZlbnRzIG9uIGFsbCBlbGVtZW50cy5cclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgdGhlIGV2ZW50IG5hbWUgKG9yIG11bHRpcGxlIG5hbWVzIHNlcGFyYXRlZCBieSBzcGFjZSkgdG8gbGlzdGVuIHRvXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRIYW5kbGVyIHRoZSBldmVudCBoYW5kbGVyIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgZmlyZXNcclxuICAgICAqIEByZXR1cm5zIHtET019XHJcbiAgICAgKi9cclxuICAgIERPTS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBldmVudHMgPSBldmVudE5hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmVsZW1lbnRzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYW4gZXZlbnQgaGFuZGxlciBmcm9tIG9uZSBvciBtb3JlIGV2ZW50cyBvbiBhbGwgZWxlbWVudHMuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIHRoZSBldmVudCBuYW1lIChvciBtdWx0aXBsZSBuYW1lcyBzZXBhcmF0ZWQgYnkgc3BhY2UpIHRvIHJlbW92ZSB0aGUgaGFuZGxlciBmcm9tXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRIYW5kbGVyIHRoZSBldmVudCBoYW5kbGVyIHRvIHJlbW92ZVxyXG4gICAgICogQHJldHVybnMge0RPTX1cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBldmVudHMgPSBldmVudE5hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmVsZW1lbnRzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIHNwZWNpZmllZCBjbGFzcyhlcykgdG8gYWxsIGVsZW1lbnRzLlxyXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZSB0aGUgY2xhc3MoZXMpIHRvIGFkZCwgbXVsdGlwbGUgY2xhc3NlcyBzZXBhcmF0ZWQgYnkgc3BhY2VcclxuICAgICAqIEByZXR1cm5zIHtET019XHJcbiAgICAgKi9cclxuICAgIERPTS5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZWQgdGhlIHNwZWNpZmllZCBjbGFzcyhlcykgZnJvbSBhbGwgZWxlbWVudHMuXHJcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lIHRoZSBjbGFzcyhlcykgdG8gcmVtb3ZlLCBtdWx0aXBsZSBjbGFzc2VzIHNlcGFyYXRlZCBieSBzcGFjZVxyXG4gICAgICogQHJldHVybnMge0RPTX1cclxuICAgICAqL1xyXG4gICAgRE9NLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgYW55IG9mIHRoZSBlbGVtZW50cyBoYXMgdGhlIHNwZWNpZmllZCBjbGFzcy5cclxuICAgICAqIEBwYXJhbSBjbGFzc05hbWUgdGhlIGNsYXNzIG5hbWUgdG8gY2hlY2tcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIG9uZSBvZiB0aGUgZWxlbWVudHMgaGFzIHRoZSBjbGFzcyBhdHRhY2hlZCwgZWxzZSBpZiBubyBlbGVtZW50IGhhcyBpdCBhdHRhY2hlZFxyXG4gICAgICovXHJcbiAgICBET00ucHJvdG90eXBlLmhhc0NsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHZhciBoYXNDbGFzcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2Ugd2UgYXJlIGluc2lkZSBhIGhhbmRsZXIsIHdlIGNhbid0IGp1c3QgJ3JldHVybiB0cnVlJy4gSW5zdGVhZCwgd2Ugc2F2ZSBpdCB0byBhIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHJldHVybiBpdCBhdCB0aGUgZW5kIG9mIHRoZSBmdW5jdGlvbiBib2R5LlxyXG4gICAgICAgICAgICAgICAgICAgIGhhc0NsYXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsZW1lbnQuY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNlZSBjb21tZW50IGFib3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzQ2xhc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGhhc0NsYXNzO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZU9yQ29sbGVjdGlvbiwgdmFsdWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5TmFtZU9yQ29sbGVjdGlvbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU9yQ29sbGVjdGlvbjtcclxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldENzcyhwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENzcyhwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHlWYWx1ZUNvbGxlY3Rpb24gPSBwcm9wZXJ0eU5hbWVPckNvbGxlY3Rpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldENzc0NvbGxlY3Rpb24ocHJvcGVydHlWYWx1ZUNvbGxlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmdldENzcyA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRzWzBdKVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuc2V0Q3NzID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gPGFueT4gY2FzdCB0byByZXNvbHZlIFRTNzAxNTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzY2MjcxMTQvMzcwMjUyXHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuc2V0Q3NzQ29sbGVjdGlvbiA9IGZ1bmN0aW9uIChydWxlVmFsdWVDb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM0NDkwNTczLzM3MDI1MlxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHJ1bGVWYWx1ZUNvbGxlY3Rpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBET007XHJcbn0oKSk7XHJcbmV4cG9ydHMuRE9NID0gRE9NO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvZG9tLnRzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBldmVudGRpc3BhdGNoZXJfMSA9IHJlcXVpcmUoXCIuL2V2ZW50ZGlzcGF0Y2hlclwiKTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jb250YWluZXJcIik7XHJcbnZhciBBcnJheVV0aWxzO1xyXG4oZnVuY3Rpb24gKEFycmF5VXRpbHMpIHtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gYW4gYXJyYXkuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkgdGhlIGFycmF5IHRoYXQgbWF5IGNvbnRhaW4gdGhlIGl0ZW0gdG8gcmVtb3ZlXHJcbiAgICAgKiBAcGFyYW0gaXRlbSB0aGUgaXRlbSB0byByZW1vdmUgZnJvbSB0aGUgYXJyYXlcclxuICAgICAqIEByZXR1cm5zIHthbnl9IHRoZSByZW1vdmVkIGl0ZW0gb3IgbnVsbCBpZiBpdCB3YXNuJ3QgcGFydCBvZiB0aGUgYXJyYXlcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEFycmF5VXRpbHMucmVtb3ZlID0gcmVtb3ZlO1xyXG59KShBcnJheVV0aWxzID0gZXhwb3J0cy5BcnJheVV0aWxzIHx8IChleHBvcnRzLkFycmF5VXRpbHMgPSB7fSkpO1xyXG52YXIgU3RyaW5nVXRpbHM7XHJcbihmdW5jdGlvbiAoU3RyaW5nVXRpbHMpIHtcclxuICAgIFN0cmluZ1V0aWxzLkZPUk1BVF9ISE1NU1MgPSAnaGg6bW06c3MnO1xyXG4gICAgU3RyaW5nVXRpbHMuRk9STUFUX01NU1MgPSAnbW06c3MnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtYXRzIGEgbnVtYmVyIG9mIHNlY29uZHMgaW50byBhIHRpbWUgc3RyaW5nIHdpdGggdGhlIHBhdHRlcm4gaGg6bW06c3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRvdGFsU2Vjb25kcyB0aGUgdG90YWwgbnVtYmVyIG9mIHNlY29uZHMgdG8gZm9ybWF0IHRvIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIGZvcm1hdCB0aGUgdGltZSBmb3JtYXQgdG8gb3V0cHV0IChkZWZhdWx0OiBoaDptbTpzcylcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgdGltZSBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2Vjb25kc1RvVGltZSh0b3RhbFNlY29uZHMsIGZvcm1hdCkge1xyXG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBTdHJpbmdVdGlscy5GT1JNQVRfSEhNTVNTOyB9XHJcbiAgICAgICAgdmFyIGlzTmVnYXRpdmUgPSB0b3RhbFNlY29uZHMgPCAwO1xyXG4gICAgICAgIGlmIChpc05lZ2F0aXZlKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB0aW1lIGlzIG5lZ2F0aXZlLCB3ZSBtYWtlIGl0IHBvc2l0aXZlIGZvciB0aGUgY2FsY3VsYXRpb24gYmVsb3dcclxuICAgICAgICAgICAgLy8gKGVsc2Ugd2UnZCBnZXQgYWxsIG5lZ2F0aXZlIG51bWJlcnMpIGFuZCByZWF0dGFjaCB0aGUgbmVnYXRpdmUgc2lnbiBsYXRlci5cclxuICAgICAgICAgICAgdG90YWxTZWNvbmRzID0gLXRvdGFsU2Vjb25kcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3BsaXQgaW50byBzZXBhcmF0ZSB0aW1lIHBhcnRzXHJcbiAgICAgICAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApIC0gaG91cnMgKiA2MDtcclxuICAgICAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzKSAlIDYwO1xyXG4gICAgICAgIHJldHVybiAoaXNOZWdhdGl2ZSA/ICctJyA6ICcnKSArIGZvcm1hdFxyXG4gICAgICAgICAgICAucmVwbGFjZSgnaGgnLCBsZWZ0UGFkV2l0aFplcm9zKGhvdXJzLCAyKSlcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ21tJywgbGVmdFBhZFdpdGhaZXJvcyhtaW51dGVzLCAyKSlcclxuICAgICAgICAgICAgLnJlcGxhY2UoJ3NzJywgbGVmdFBhZFdpdGhaZXJvcyhzZWNvbmRzLCAyKSk7XHJcbiAgICB9XHJcbiAgICBTdHJpbmdVdGlscy5zZWNvbmRzVG9UaW1lID0gc2Vjb25kc1RvVGltZTtcclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBudW1iZXIgdG8gYSBzdHJpbmcgYW5kIGxlZnQtcGFkcyBpdCB3aXRoIHplcm9zIHRvIHRoZSBzcGVjaWZpZWQgbGVuZ3RoLlxyXG4gICAgICogRXhhbXBsZTogbGVmdFBhZFdpdGhaZXJvcygxMjMsIDUpID0+ICcwMDEyMydcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbnVtIHRoZSBudW1iZXIgdG8gY29udmVydCB0byBzdHJpbmcgYW5kIHBhZCB3aXRoIHplcm9zXHJcbiAgICAgKiBAcGFyYW0gbGVuZ3RoIHRoZSBkZXNpcmVkIGxlbmd0aCBvZiB0aGUgcGFkZGVkIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIHBhZGRlZCBudW1iZXIgYXMgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGxlZnRQYWRXaXRoWmVyb3MobnVtLCBsZW5ndGgpIHtcclxuICAgICAgICB2YXIgdGV4dCA9IG51bSArICcnO1xyXG4gICAgICAgIHZhciBwYWRkaW5nID0gJzAwMDAwMDAwMDAnLnN1YnN0cigwLCBsZW5ndGggLSB0ZXh0Lmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBhZGRpbmcgKyB0ZXh0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxscyBvdXQgcGxhY2Vob2xkZXJzIGluIGFuIGFkIG1lc3NhZ2UuXHJcbiAgICAgKlxyXG4gICAgICogSGFzIHRoZSBwbGFjZWhvbGRlcnMgJ3tyZW1haW5pbmdUaW1lW2Zvcm1hdFN0cmluZ119JywgJ3twbGF5ZWRUaW1lW2Zvcm1hdFN0cmluZ119JyBhbmRcclxuICAgICAqICd7YWREdXJhdGlvbltmb3JtYXRTdHJpbmddfScsIHdoaWNoIGFyZSByZXBsYWNlZCBieSB0aGUgcmVtYWluaW5nIHRpbWUgdW50aWwgdGhlIGFkIGNhbiBiZSBza2lwcGVkLCB0aGUgY3VycmVudFxyXG4gICAgICogdGltZSBvciB0aGUgYWQgZHVyYXRpb24uIFRoZSBmb3JtYXQgc3RyaW5nIGlzIG9wdGlvbmFsLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgcGxhY2Vob2xkZXIgaXMgcmVwbGFjZWQgYnkgdGhlIHRpbWVcclxuICAgICAqIGluIHNlY29uZHMuIElmIHNwZWNpZmllZCwgaXQgbXVzdCBiZSBvZiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcclxuICAgICAqIC0gJWQgLSBJbnNlcnRzIHRoZSB0aW1lIGFzIGFuIGludGVnZXIuXHJcbiAgICAgKiAtICUwTmQgLSBJbnNlcnRzIHRoZSB0aW1lIGFzIGFuIGludGVnZXIgd2l0aCBsZWFkaW5nIHplcm9lcywgaWYgdGhlIGxlbmd0aCBvZiB0aGUgdGltZSBzdHJpbmcgaXMgc21hbGxlciB0aGFuIE4uXHJcbiAgICAgKiAtICVmIC0gSW5zZXJ0cyB0aGUgdGltZSBhcyBhIGZsb2F0LlxyXG4gICAgICogLSAlME5mIC0gSW5zZXJ0cyB0aGUgdGltZSBhcyBhIGZsb2F0IHdpdGggbGVhZGluZyB6ZXJvZXMuXHJcbiAgICAgKiAtICUuTWYgLSBJbnNlcnRzIHRoZSB0aW1lIGFzIGEgZmxvYXQgd2l0aCBNIGRlY2ltYWwgcGxhY2VzLiBDYW4gYmUgY29tYmluZWQgd2l0aCAlME5mLCBlLmcuICUwNC4yZiAodGhlIHRpbWVcclxuICAgICAqIDEwLjEyM1xyXG4gICAgICogd291bGQgYmUgcHJpbnRlZCBhcyAwMDEwLjEyKS5cclxuICAgICAqIC0gJWhoOm1tOnNzXHJcbiAgICAgKiAtICVtbTpzc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhZE1lc3NhZ2UgYW4gYWQgbWVzc2FnZSB3aXRoIG9wdGlvbmFsIHBsYWNlaG9sZGVycyB0byBmaWxsXHJcbiAgICAgKiBAcGFyYW0gc2tpcE9mZnNldCBpZiBzcGVjaWZpZWQsIHtyZW1haW5pbmdUaW1lfSB3aWxsIGJlIGZpbGxlZCB3aXRoIHRoZSByZW1haW5pbmcgdGltZSB1bnRpbCB0aGUgYWQgY2FuIGJlIHNraXBwZWRcclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgdGhlIHBsYXllciB0byBnZXQgdGhlIHRpbWUgZGF0YSBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgYWQgbWVzc2FnZSB3aXRoIGZpbGxlZCBwbGFjZWhvbGRlcnNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVwbGFjZUFkTWVzc2FnZVBsYWNlaG9sZGVycyhhZE1lc3NhZ2UsIHNraXBPZmZzZXQsIHBsYXllcikge1xyXG4gICAgICAgIHZhciBhZE1lc3NhZ2VQbGFjZWhvbGRlclJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFxcXHsocmVtYWluaW5nVGltZXxwbGF5ZWRUaW1lfGFkRHVyYXRpb24pKH18JSgoMFsxLTldXFxcXGQqKFxcXFwuXFxcXGQrKGR8Zil8ZHxmKXxcXFxcLlxcXFxkK2Z8ZHxmKXxoaDptbTpzc3xtbTpzcyl9KScsICdnJyk7XHJcbiAgICAgICAgcmV0dXJuIGFkTWVzc2FnZS5yZXBsYWNlKGFkTWVzc2FnZVBsYWNlaG9sZGVyUmVnZXgsIGZ1bmN0aW9uIChmb3JtYXRTdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIHRpbWUgPSAwO1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0U3RyaW5nLmluZGV4T2YoJ3JlbWFpbmluZ1RpbWUnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpcE9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSBNYXRoLmNlaWwoc2tpcE9mZnNldCAtIHBsYXllci5nZXRDdXJyZW50VGltZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSBwbGF5ZXIuZ2V0RHVyYXRpb24oKSAtIHBsYXllci5nZXRDdXJyZW50VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZvcm1hdFN0cmluZy5pbmRleE9mKCdwbGF5ZWRUaW1lJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGltZSA9IHBsYXllci5nZXRDdXJyZW50VGltZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZvcm1hdFN0cmluZy5pbmRleE9mKCdhZER1cmF0aW9uJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGltZSA9IHBsYXllci5nZXREdXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXROdW1iZXIodGltZSwgZm9ybWF0U3RyaW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFN0cmluZ1V0aWxzLnJlcGxhY2VBZE1lc3NhZ2VQbGFjZWhvbGRlcnMgPSByZXBsYWNlQWRNZXNzYWdlUGxhY2Vob2xkZXJzO1xyXG4gICAgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKHRpbWUsIGZvcm1hdCkge1xyXG4gICAgICAgIHZhciBmb3JtYXRTdHJpbmdWYWxpZGF0aW9uUmVnZXggPSAvJSgoMFsxLTldXFxkKihcXC5cXGQrKGR8Zil8ZHxmKXxcXC5cXGQrZnxkfGYpfGhoOm1tOnNzfG1tOnNzKS87XHJcbiAgICAgICAgdmFyIGxlYWRpbmdaZXJvZXNSZWdleCA9IC8oJTBbMS05XVxcZCopKD89KFxcLlxcZCtmfGZ8ZCkpLztcclxuICAgICAgICB2YXIgZGVjaW1hbFBsYWNlc1JlZ2V4ID0gL1xcLlxcZCooPz1mKS87XHJcbiAgICAgICAgaWYgKCFmb3JtYXRTdHJpbmdWYWxpZGF0aW9uUmVnZXgudGVzdChmb3JtYXQpKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBmb3JtYXQgaXMgaW52YWxpZCwgd2Ugc2V0IGEgZGVmYXVsdCBmYWxsYmFjayBmb3JtYXRcclxuICAgICAgICAgICAgZm9ybWF0ID0gJyVkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvc1xyXG4gICAgICAgIHZhciBsZWFkaW5nWmVyb2VzID0gMDtcclxuICAgICAgICB2YXIgbGVhZGluZ1plcm9lc01hdGNoZXMgPSBmb3JtYXQubWF0Y2gobGVhZGluZ1plcm9lc1JlZ2V4KTtcclxuICAgICAgICBpZiAobGVhZGluZ1plcm9lc01hdGNoZXMpIHtcclxuICAgICAgICAgICAgbGVhZGluZ1plcm9lcyA9IHBhcnNlSW50KGxlYWRpbmdaZXJvZXNNYXRjaGVzWzBdLnN1YnN0cmluZygyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXHJcbiAgICAgICAgdmFyIG51bURlY2ltYWxQbGFjZXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBkZWNpbWFsUGxhY2VzTWF0Y2hlcyA9IGZvcm1hdC5tYXRjaChkZWNpbWFsUGxhY2VzUmVnZXgpO1xyXG4gICAgICAgIGlmIChkZWNpbWFsUGxhY2VzTWF0Y2hlcyAmJiAhaXNOYU4ocGFyc2VJbnQoZGVjaW1hbFBsYWNlc01hdGNoZXNbMF0uc3Vic3RyaW5nKDEpKSkpIHtcclxuICAgICAgICAgICAgbnVtRGVjaW1hbFBsYWNlcyA9IHBhcnNlSW50KGRlY2ltYWxQbGFjZXNNYXRjaGVzWzBdLnN1YnN0cmluZygxKSk7XHJcbiAgICAgICAgICAgIGlmIChudW1EZWNpbWFsUGxhY2VzID4gMjApIHtcclxuICAgICAgICAgICAgICAgIG51bURlY2ltYWxQbGFjZXMgPSAyMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGbG9hdCBmb3JtYXRcclxuICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ2YnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lU3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChudW1EZWNpbWFsUGxhY2VzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBmaXhlZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcclxuICAgICAgICAgICAgICAgIHRpbWVTdHJpbmcgPSB0aW1lLnRvRml4ZWQobnVtRGVjaW1hbFBsYWNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lU3RyaW5nID0gJycgKyB0aW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFwcGx5IGxlYWRpbmcgemVyb3NcclxuICAgICAgICAgICAgaWYgKHRpbWVTdHJpbmcuaW5kZXhPZignLicpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0UGFkV2l0aFplcm9zKHRpbWVTdHJpbmcsIHRpbWVTdHJpbmcubGVuZ3RoICsgKGxlYWRpbmdaZXJvZXMgLSB0aW1lU3RyaW5nLmluZGV4T2YoJy4nKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRQYWRXaXRoWmVyb3ModGltZVN0cmluZywgbGVhZGluZ1plcm9lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJzonKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHZhciB0b3RhbFNlY29uZHMgPSBNYXRoLmNlaWwodGltZSk7XHJcbiAgICAgICAgICAgIC8vIGhoOm1tOnNzIGZvcm1hdFxyXG4gICAgICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ2hoJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlY29uZHNUb1RpbWUodG90YWxTZWNvbmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRQYWRXaXRoWmVyb3MobWludXRlcywgMikgKyAnOicgKyBsZWZ0UGFkV2l0aFplcm9zKHNlY29uZHMsIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbGVmdFBhZFdpdGhaZXJvcyhNYXRoLmNlaWwodGltZSksIGxlYWRpbmdaZXJvZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoU3RyaW5nVXRpbHMgPSBleHBvcnRzLlN0cmluZ1V0aWxzIHx8IChleHBvcnRzLlN0cmluZ1V0aWxzID0ge30pKTtcclxudmFyIFBsYXllclV0aWxzO1xyXG4oZnVuY3Rpb24gKFBsYXllclV0aWxzKSB7XHJcbiAgICB2YXIgUGxheWVyU3RhdGU7XHJcbiAgICAoZnVuY3Rpb24gKFBsYXllclN0YXRlKSB7XHJcbiAgICAgICAgUGxheWVyU3RhdGVbUGxheWVyU3RhdGVbXCJJRExFXCJdID0gMF0gPSBcIklETEVcIjtcclxuICAgICAgICBQbGF5ZXJTdGF0ZVtQbGF5ZXJTdGF0ZVtcIlBSRVBBUkVEXCJdID0gMV0gPSBcIlBSRVBBUkVEXCI7XHJcbiAgICAgICAgUGxheWVyU3RhdGVbUGxheWVyU3RhdGVbXCJQTEFZSU5HXCJdID0gMl0gPSBcIlBMQVlJTkdcIjtcclxuICAgICAgICBQbGF5ZXJTdGF0ZVtQbGF5ZXJTdGF0ZVtcIlBBVVNFRFwiXSA9IDNdID0gXCJQQVVTRURcIjtcclxuICAgICAgICBQbGF5ZXJTdGF0ZVtQbGF5ZXJTdGF0ZVtcIkZJTklTSEVEXCJdID0gNF0gPSBcIkZJTklTSEVEXCI7XHJcbiAgICB9KShQbGF5ZXJTdGF0ZSA9IFBsYXllclV0aWxzLlBsYXllclN0YXRlIHx8IChQbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZSA9IHt9KSk7XHJcbiAgICBmdW5jdGlvbiBpc1NvdXJjZUxvYWRlZChwbGF5ZXIpIHtcclxuICAgICAgICByZXR1cm4gcGxheWVyLmdldENvbmZpZygpLnNvdXJjZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgUGxheWVyVXRpbHMuaXNTb3VyY2VMb2FkZWQgPSBpc1NvdXJjZUxvYWRlZDtcclxuICAgIGZ1bmN0aW9uIGlzVGltZVNoaWZ0QXZhaWxhYmxlKHBsYXllcikge1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIuaXNMaXZlKCkgJiYgcGxheWVyLmdldE1heFRpbWVTaGlmdCgpICE9PSAwO1xyXG4gICAgfVxyXG4gICAgUGxheWVyVXRpbHMuaXNUaW1lU2hpZnRBdmFpbGFibGUgPSBpc1RpbWVTaGlmdEF2YWlsYWJsZTtcclxuICAgIGZ1bmN0aW9uIGdldFN0YXRlKHBsYXllcikge1xyXG4gICAgICAgIGlmIChwbGF5ZXIuaGFzRW5kZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUGxheWVyU3RhdGUuRklOSVNIRUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBsYXllci5pc1BsYXlpbmcoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUGxheWVyU3RhdGUuUExBWUlORztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGxheWVyLmlzUGF1c2VkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllclN0YXRlLlBBVVNFRDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNTb3VyY2VMb2FkZWQocGxheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUGxheWVyU3RhdGUuUFJFUEFSRUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUGxheWVyU3RhdGUuSURMRTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBQbGF5ZXJVdGlscy5nZXRTdGF0ZSA9IGdldFN0YXRlO1xyXG4gICAgdmFyIFRpbWVTaGlmdEF2YWlsYWJpbGl0eURldGVjdG9yID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBUaW1lU2hpZnRBdmFpbGFiaWxpdHlEZXRlY3RvcihwbGF5ZXIpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy50aW1lU2hpZnRBdmFpbGFiaWxpdHlDaGFuZ2VkRXZlbnQgPSBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTaGlmdEF2YWlsYWJsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdmFyIHRpbWVTaGlmdERldGVjdG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZGV0ZWN0KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBkZXRlY3QgdGltZXNoaWZ0IGF2YWlsYWJpbGl0eSBpbiBPTl9SRUFEWSwgd2hpY2ggd29ya3MgZm9yIERBU0ggc3RyZWFtc1xyXG4gICAgICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9SRUFEWSwgdGltZVNoaWZ0RGV0ZWN0b3IpO1xyXG4gICAgICAgICAgICAvLyBXaXRoIEhMUy9OYXRpdmVQbGF5ZXIgc3RyZWFtcywgZ2V0TWF4VGltZVNoaWZ0IGNhbiBiZSAwIGJlZm9yZSB0aGUgYnVmZmVyIGZpbGxzLCBzbyB3ZSBuZWVkIHRvIGFkZGl0aW9uYWxseVxyXG4gICAgICAgICAgICAvLyBjaGVjayB0aW1lc2hpZnQgYXZhaWxhYmlsaXR5IGluIE9OX1RJTUVfQ0hBTkdFRFxyXG4gICAgICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9USU1FX0NIQU5HRUQsIHRpbWVTaGlmdERldGVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVGltZVNoaWZ0QXZhaWxhYmlsaXR5RGV0ZWN0b3IucHJvdG90eXBlLmRldGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLmlzTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZVNoaWZ0QXZhaWxhYmxlTm93ID0gUGxheWVyVXRpbHMuaXNUaW1lU2hpZnRBdmFpbGFibGUodGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgYXZhaWxhYmlsaXR5IGNoYW5nZXMsIHdlIGZpcmUgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZVNoaWZ0QXZhaWxhYmxlTm93ICE9PSB0aGlzLnRpbWVTaGlmdEF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZVNoaWZ0QXZhaWxhYmlsaXR5Q2hhbmdlZEV2ZW50LmRpc3BhdGNoKHRoaXMucGxheWVyLCB7IHRpbWVTaGlmdEF2YWlsYWJsZTogdGltZVNoaWZ0QXZhaWxhYmxlTm93IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZVNoaWZ0QXZhaWxhYmxlID0gdGltZVNoaWZ0QXZhaWxhYmxlTm93O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZVNoaWZ0QXZhaWxhYmlsaXR5RGV0ZWN0b3IucHJvdG90eXBlLCBcIm9uVGltZVNoaWZ0QXZhaWxhYmlsaXR5Q2hhbmdlZFwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGltZVNoaWZ0QXZhaWxhYmlsaXR5Q2hhbmdlZEV2ZW50LmdldEV2ZW50KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBUaW1lU2hpZnRBdmFpbGFiaWxpdHlEZXRlY3RvcjtcclxuICAgIH0oKSk7XHJcbiAgICBQbGF5ZXJVdGlscy5UaW1lU2hpZnRBdmFpbGFiaWxpdHlEZXRlY3RvciA9IFRpbWVTaGlmdEF2YWlsYWJpbGl0eURldGVjdG9yO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlY3RzIGNoYW5nZXMgb2YgdGhlIHN0cmVhbSB0eXBlLCBpLmUuIGNoYW5nZXMgb2YgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgcGxheWVyI2lzTGl2ZSBtZXRob2QuXHJcbiAgICAgKiBOb3JtYWxseSwgYSBzdHJlYW0gY2Fubm90IGNoYW5nZSBpdHMgdHlwZSBkdXJpbmcgcGxheWJhY2ssIGl0J3MgZWl0aGVyIFZPRCBvciBsaXZlLiBEdWUgdG8gYnVncyBvbiBzb21lXHJcbiAgICAgKiBwbGF0Zm9ybXMgb3IgYnJvd3NlcnMsIGl0IGNhbiBzdGlsbCBjaGFuZ2UuIEl0IGlzIHRoZXJlZm9yZSB1bnJlbGlhYmxlIHRvIGp1c3QgY2hlY2sgI2lzTGl2ZSBhbmQgdGhpcyBkZXRlY3RvclxyXG4gICAgICogc2hvdWxkIGJlIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGluc3RlYWQuXHJcbiAgICAgKlxyXG4gICAgICogS25vd24gY2FzZXM6XHJcbiAgICAgKlxyXG4gICAgICogLSBITFMgVk9EIG9uIEFuZHJvaWQgNC4zXHJcbiAgICAgKiBWaWRlbyBkdXJhdGlvbiBpcyBpbml0aWFsbHkgJ0luZmluaXR5JyBhbmQgb25seSBnZXRzIGF2YWlsYWJsZSBhZnRlciBwbGF5YmFjayBzdGFydHMsIHNvIHN0cmVhbXMgYXJlIHdyb25nbHlcclxuICAgICAqIHJlcG9ydGVkIGFzICdsaXZlJyBiZWZvcmUgcGxheWJhY2sgKHRoZSBsaXZlLWNoZWNrIGluIHRoZSBwbGF5ZXIgY2hlY2tzIGZvciBpbmZpbml0ZSBkdXJhdGlvbikuXHJcbiAgICAgKi9cclxuICAgIHZhciBMaXZlU3RyZWFtRGV0ZWN0b3IgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIExpdmVTdHJlYW1EZXRlY3RvcihwbGF5ZXIpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5saXZlQ2hhbmdlZEV2ZW50ID0gbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB2YXIgbGl2ZURldGVjdG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZGV0ZWN0KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgd2hlbiBwbGF5ZXIgaXMgcmVhZHlcclxuICAgICAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUkVBRFksIGxpdmVEZXRlY3Rvcik7XHJcbiAgICAgICAgICAgIC8vIFJlLWV2YWx1YXRlIHdoZW4gcGxheWJhY2sgc3RhcnRzXHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIGxpdmVEZXRlY3Rvcik7XHJcbiAgICAgICAgICAgIC8vIEhMUyBsaXZlIGRldGVjdGlvbiB3b3JrYXJvdW5kIGZvciBBbmRyb2lkOlxyXG4gICAgICAgICAgICAvLyBBbHNvIHJlLWV2YWx1YXRlIGR1cmluZyBwbGF5YmFjaywgYmVjYXVzZSB0aGF0IGlzIHdoZW4gdGhlIGxpdmUgZmxhZyBtaWdodCBjaGFuZ2UuXHJcbiAgICAgICAgICAgIC8vIChEb2luZyBpdCBvbmx5IGluIEFuZHJvaWQgQ2hyb21lIHNhdmVzIHVubmVjZXNzYXJ5IG92ZXJoZWFkIG9uIG90aGVyIHBsYXR0Zm9ybXMpXHJcbiAgICAgICAgICAgIGlmIChCcm93c2VyVXRpbHMuaXNBbmRyb2lkICYmIEJyb3dzZXJVdGlscy5pc0Nocm9tZSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVElNRV9DSEFOR0VELCBsaXZlRGV0ZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpdmVTdHJlYW1EZXRlY3Rvci5wcm90b3R5cGUuZGV0ZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGl2ZU5vdyA9IHRoaXMucGxheWVyLmlzTGl2ZSgpO1xyXG4gICAgICAgICAgICAvLyBDb21wYXJlIGN1cnJlbnQgdG8gcHJldmlvdXMgbGl2ZSBzdGF0ZSBmbGFnIGFuZCBmaXJlIGV2ZW50IHdoZW4gaXQgY2hhbmdlcy4gU2luY2Ugd2UgaW5pdGlhbGl6ZSB0aGUgZmxhZ1xyXG4gICAgICAgICAgICAvLyB3aXRoIHVuZGVmaW5lZCwgdGhlcmUgaXMgYWx3YXlzIGF0IGxlYXN0IGFuIGluaXRpYWwgZXZlbnQgZmlyZWQgdGhhdCB0ZWxscyBsaXN0ZW5lcnMgdGhlIGxpdmUgc3RhdGUuXHJcbiAgICAgICAgICAgIGlmIChsaXZlTm93ICE9PSB0aGlzLmxpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZUNoYW5nZWRFdmVudC5kaXNwYXRjaCh0aGlzLnBsYXllciwgeyBsaXZlOiBsaXZlTm93IH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXZlID0gbGl2ZU5vdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExpdmVTdHJlYW1EZXRlY3Rvci5wcm90b3R5cGUsIFwib25MaXZlQ2hhbmdlZFwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGl2ZUNoYW5nZWRFdmVudC5nZXRFdmVudCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gTGl2ZVN0cmVhbURldGVjdG9yO1xyXG4gICAgfSgpKTtcclxuICAgIFBsYXllclV0aWxzLkxpdmVTdHJlYW1EZXRlY3RvciA9IExpdmVTdHJlYW1EZXRlY3RvcjtcclxufSkoUGxheWVyVXRpbHMgPSBleHBvcnRzLlBsYXllclV0aWxzIHx8IChleHBvcnRzLlBsYXllclV0aWxzID0ge30pKTtcclxudmFyIFVJVXRpbHM7XHJcbihmdW5jdGlvbiAoVUlVdGlscykge1xyXG4gICAgZnVuY3Rpb24gdHJhdmVyc2VUcmVlKGNvbXBvbmVudCwgdmlzaXQpIHtcclxuICAgICAgICB2YXIgcmVjdXJzaXZlVHJlZVdhbGtlciA9IGZ1bmN0aW9uIChjb21wb25lbnQsIHBhcmVudCkge1xyXG4gICAgICAgICAgICB2aXNpdChjb21wb25lbnQsIHBhcmVudCk7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBjdXJyZW50IGNvbXBvbmVudCBpcyBhIGNvbnRhaW5lciwgdmlzaXQgaXQncyBjaGlsZHJlblxyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgY29udGFpbmVyXzEuQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gY29tcG9uZW50LmdldENvbXBvbmVudHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRDb21wb25lbnQgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlVHJlZVdhbGtlcihjaGlsZENvbXBvbmVudCwgY29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gV2FsayBhbmQgY29uZmlndXJlIHRoZSBjb21wb25lbnQgdHJlZVxyXG4gICAgICAgIHJlY3Vyc2l2ZVRyZWVXYWxrZXIoY29tcG9uZW50KTtcclxuICAgIH1cclxuICAgIFVJVXRpbHMudHJhdmVyc2VUcmVlID0gdHJhdmVyc2VUcmVlO1xyXG59KShVSVV0aWxzID0gZXhwb3J0cy5VSVV0aWxzIHx8IChleHBvcnRzLlVJVXRpbHMgPSB7fSkpO1xyXG52YXIgQnJvd3NlclV0aWxzO1xyXG4oZnVuY3Rpb24gKEJyb3dzZXJVdGlscykge1xyXG4gICAgLy8gaXNNb2JpbGUgb25seSBuZWVkcyB0byBiZSBldmFsdWF0ZWQgb25jZSAoaXQgY2Fubm90IGNoYW5nZSBkdXJpbmcgYSBicm93c2VyIHNlc3Npb24pXHJcbiAgICAvLyBNb2JpbGUgZGV0ZWN0aW9uIGFjY29yZGluZyB0byBNb3ppbGxhIHJlY29tbWVuZGF0aW9uOiBcIkluIHN1bW1hcnksIHdlIHJlY29tbWVuZCBsb29raW5nIGZvciB0aGUgc3RyaW5nIOKAnE1vYmnigJ1cclxuICAgIC8vIGFueXdoZXJlIGluIHRoZSBVc2VyIEFnZW50IHRvIGRldGVjdCBhIG1vYmlsZSBkZXZpY2UuXCJcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnRcclxuICAgIEJyb3dzZXJVdGlscy5pc01vYmlsZSA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIC9Nb2JpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgQnJvd3NlclV0aWxzLmlzQ2hyb21lID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgL0Nocm9tZS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgIEJyb3dzZXJVdGlscy5pc0FuZHJvaWQgPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiAvQW5kcm9pZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxufSkoQnJvd3NlclV0aWxzID0gZXhwb3J0cy5Ccm93c2VyVXRpbHMgfHwgKGV4cG9ydHMuQnJvd3NlclV0aWxzID0ge30pKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL3V0aWxzLnRzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG4vKipcclxuICogRXZlbnQgZGlzcGF0Y2hlciB0byBzdWJzY3JpYmUgYW5kIHRyaWdnZXIgZXZlbnRzLiBFYWNoIGV2ZW50IHNob3VsZCBoYXZlIGl0cyBvd24gZGlzcGF0Y2hlci5cclxuICovXHJcbnZhciBFdmVudERpc3BhdGNoZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRXZlbnREaXNwYXRjaGVyKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHtAaW5oZXJpdERvY31cclxuICAgICAqL1xyXG4gICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKG5ldyBFdmVudExpc3RlbmVyV3JhcHBlcihsaXN0ZW5lcikpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0RG9jfVxyXG4gICAgICovXHJcbiAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZU9uY2UgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKG5ldyBFdmVudExpc3RlbmVyV3JhcHBlcihsaXN0ZW5lciwgdHJ1ZSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICoge0Bpbmhlcml0RG9jfVxyXG4gICAgICovXHJcbiAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZVJhdGVMaW1pdGVkID0gZnVuY3Rpb24gKGxpc3RlbmVyLCByYXRlTXMpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKG5ldyBSYXRlTGltaXRlZEV2ZW50TGlzdGVuZXJXcmFwcGVyKGxpc3RlbmVyLCByYXRlTXMpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIHtAaW5oZXJpdERvY31cclxuICAgICAqL1xyXG4gICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBsaXN0ZW5lcnMsIGNvbXBhcmUgd2l0aCBwYXJhbWV0ZXIsIGFuZCByZW1vdmUgaWYgZm91bmRcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdWJzY3JpYmVkTGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZWRMaXN0ZW5lci5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEuQXJyYXlVdGlscy5yZW1vdmUodGhpcy5saXN0ZW5lcnMsIHN1YnNjcmliZWRMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSB0aGlzIGRpc3BhdGNoZXIuXHJcbiAgICAgKi9cclxuICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUudW5zdWJzY3JpYmVBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIERpc3BhdGNoZXMgYW4gZXZlbnQgdG8gYWxsIHN1YnNjcmliZWQgbGlzdGVuZXJzLlxyXG4gICAgICogQHBhcmFtIHNlbmRlciB0aGUgc291cmNlIG9mIHRoZSBldmVudFxyXG4gICAgICogQHBhcmFtIGFyZ3MgdGhlIGFyZ3VtZW50cyBmb3IgdGhlIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT09IHZvaWQgMCkgeyBhcmdzID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciBsaXN0ZW5lcnNUb1JlbW92ZSA9IFtdO1xyXG4gICAgICAgIC8vIENhbGwgZXZlcnkgbGlzdGVuZXJcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5saXN0ZW5lcnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IF9hW19pXTtcclxuICAgICAgICAgICAgbGlzdGVuZXIuZmlyZShzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIuaXNPbmNlKCkpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyc1RvUmVtb3ZlLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lclxyXG4gICAgICAgIGZvciAodmFyIF9iID0gMCwgbGlzdGVuZXJzVG9SZW1vdmVfMSA9IGxpc3RlbmVyc1RvUmVtb3ZlOyBfYiA8IGxpc3RlbmVyc1RvUmVtb3ZlXzEubGVuZ3RoOyBfYisrKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lclRvUmVtb3ZlID0gbGlzdGVuZXJzVG9SZW1vdmVfMVtfYl07XHJcbiAgICAgICAgICAgIHV0aWxzXzEuQXJyYXlVdGlscy5yZW1vdmUodGhpcy5saXN0ZW5lcnMsIGxpc3RlbmVyVG9SZW1vdmUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGV2ZW50IHRoYXQgdGhpcyBkaXNwYXRjaGVyIG1hbmFnZXMgYW5kIG9uIHdoaWNoIGxpc3RlbmVycyBjYW4gc3Vic2NyaWJlIGFuZCB1bnN1YnNjcmliZSBldmVudCBoYW5kbGVycy5cclxuICAgICAqIEByZXR1cm5zIHtFdmVudH1cclxuICAgICAqL1xyXG4gICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5nZXRFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBGb3Igbm93LCBqdXN0IGNhc3QgdGhlIGV2ZW50IGRpc3BhdGNoZXIgdG8gdGhlIGV2ZW50IGludGVyZmFjZS4gQXQgc29tZSBwb2ludCBpbiB0aGUgZnV0dXJlIHdoZW4gdGhlXHJcbiAgICAgICAgLy8gY29kZWJhc2UgZ3Jvd3MsIGl0IG1pZ2h0IG1ha2Ugc2Vuc2UgdG8gc3BsaXQgdGhlIGRpc3BhdGNoZXIgaW50byBzZXBhcmF0ZSBkaXNwYXRjaGVyIGFuZCBldmVudCBjbGFzc2VzLlxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBFdmVudERpc3BhdGNoZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuRXZlbnREaXNwYXRjaGVyID0gRXZlbnREaXNwYXRjaGVyO1xyXG4vKipcclxuICogQSBiYXNpYyBldmVudCBsaXN0ZW5lciB3cmFwcGVyIHRvIG1hbmFnZSBsaXN0ZW5lcnMgd2l0aGluIHRoZSB7QGxpbmsgRXZlbnREaXNwYXRjaGVyfS4gVGhpcyBpcyBhICdwcml2YXRlJyBjbGFzc1xyXG4gKiBmb3IgaW50ZXJuYWwgZGlzcGF0Y2hlciB1c2UgYW5kIGl0IGlzIHRoZXJlZm9yZSBub3QgZXhwb3J0ZWQuXHJcbiAqL1xyXG52YXIgRXZlbnRMaXN0ZW5lcldyYXBwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRXZlbnRMaXN0ZW5lcldyYXBwZXIobGlzdGVuZXIsIG9uY2UpIHtcclxuICAgICAgICBpZiAob25jZSA9PT0gdm9pZCAwKSB7IG9uY2UgPSBmYWxzZTsgfVxyXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIHRoaXMub25jZSA9IG9uY2U7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRMaXN0ZW5lcldyYXBwZXIucHJvdG90eXBlLCBcImxpc3RlbmVyXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB3cmFwcGVkIGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudExpc3RlbmVyPFNlbmRlciwgQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50TGlzdGVuZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIHRoZSB3cmFwcGVkIGV2ZW50IGxpc3RlbmVyIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50cy5cclxuICAgICAqIEBwYXJhbSBzZW5kZXJcclxuICAgICAqIEBwYXJhbSBhcmdzXHJcbiAgICAgKi9cclxuICAgIEV2ZW50TGlzdGVuZXJXcmFwcGVyLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcihzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgbGlzdGVuZXIgaXMgc2NoZWR1bGVkIHRvIGJlIGNhbGxlZCBvbmx5IG9uY2UuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gb25jZSBpZiB0cnVlXHJcbiAgICAgKi9cclxuICAgIEV2ZW50TGlzdGVuZXJXcmFwcGVyLnByb3RvdHlwZS5pc09uY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub25jZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRXZlbnRMaXN0ZW5lcldyYXBwZXI7XHJcbn0oKSk7XHJcbi8qKlxyXG4gKiBFeHRlbmRzIHRoZSBiYXNpYyB7QGxpbmsgRXZlbnRMaXN0ZW5lcldyYXBwZXJ9IHdpdGggcmF0ZS1saW1pdGluZyBmdW5jdGlvbmFsaXR5LlxyXG4gKi9cclxudmFyIFJhdGVMaW1pdGVkRXZlbnRMaXN0ZW5lcldyYXBwZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFJhdGVMaW1pdGVkRXZlbnRMaXN0ZW5lcldyYXBwZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBSYXRlTGltaXRlZEV2ZW50TGlzdGVuZXJXcmFwcGVyKGxpc3RlbmVyLCByYXRlTXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBsaXN0ZW5lcikgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5yYXRlTXMgPSByYXRlTXM7XHJcbiAgICAgICAgX3RoaXMubGFzdEZpcmVUaW1lID0gMDtcclxuICAgICAgICAvLyBXcmFwIHRoZSBldmVudCBsaXN0ZW5lciB3aXRoIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgZG9lcyB0aGUgcmF0ZS1saW1pdGluZ1xyXG4gICAgICAgIF90aGlzLnJhdGVMaW1pdGluZ0V2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gX3RoaXMubGFzdEZpcmVUaW1lID4gX3RoaXMucmF0ZU1zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGlmIGVub3VnaCB0aW1lIHNpbmNlIHRoZSBwcmV2aW91cyBjYWxsIGhhcyBwYXNzZWQsIGNhbGwgdGhlXHJcbiAgICAgICAgICAgICAgICAvLyBhY3R1YWwgZXZlbnQgbGlzdGVuZXIgYW5kIHJlY29yZCB0aGUgY3VycmVudCB0aW1lXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5maXJlU3VwZXIoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxhc3RGaXJlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFJhdGVMaW1pdGVkRXZlbnRMaXN0ZW5lcldyYXBwZXIucHJvdG90eXBlLmZpcmVTdXBlciA9IGZ1bmN0aW9uIChzZW5kZXIsIGFyZ3MpIHtcclxuICAgICAgICAvLyBGaXJlIHRoZSBhY3R1YWwgZXh0ZXJuYWwgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmZpcmUuY2FsbCh0aGlzLCBzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfTtcclxuICAgIFJhdGVMaW1pdGVkRXZlbnRMaXN0ZW5lcldyYXBwZXIucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgLy8gRmlyZSB0aGUgaW50ZXJuYWwgcmF0ZS1saW1pdGluZyBsaXN0ZW5lciBpbnN0ZWFkIG9mIHRoZSBleHRlcm5hbCBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIHRoaXMucmF0ZUxpbWl0aW5nRXZlbnRMaXN0ZW5lcihzZW5kZXIsIGFyZ3MpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSYXRlTGltaXRlZEV2ZW50TGlzdGVuZXJXcmFwcGVyO1xyXG59KEV2ZW50TGlzdGVuZXJXcmFwcGVyKSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9ldmVudGRpc3BhdGNoZXIudHNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4uL2V2ZW50ZGlzcGF0Y2hlclwiKTtcclxuLyoqXHJcbiAqIEEgc2ltcGxlIGNsaWNrYWJsZSBidXR0b24uXHJcbiAqL1xyXG52YXIgQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmJ1dHRvbkV2ZW50cyA9IHtcclxuICAgICAgICAgICAgb25DbGljazogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1idXR0b24nXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBCdXR0b24ucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgYnV0dG9uIGVsZW1lbnQgd2l0aCB0aGUgdGV4dCBsYWJlbFxyXG4gICAgICAgIHZhciBidXR0b25FbGVtZW50ID0gbmV3IGRvbV8xLkRPTSgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICAndHlwZSc6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAnaWQnOiB0aGlzLmNvbmZpZy5pZCxcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5nZXRDc3NDbGFzc2VzKClcclxuICAgICAgICB9KS5hcHBlbmQobmV3IGRvbV8xLkRPTSgnc3BhbicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ2xhYmVsJylcclxuICAgICAgICB9KS5odG1sKHRoaXMuY29uZmlnLnRleHQpKTtcclxuICAgICAgICAvLyBMaXN0ZW4gZm9yIHRoZSBjbGljayBldmVudCBvbiB0aGUgYnV0dG9uIGVsZW1lbnQgYW5kIHRyaWdnZXIgdGhlIGNvcnJlc3BvbmRpbmcgZXZlbnQgb24gdGhlIGJ1dHRvbiBjb21wb25lbnRcclxuICAgICAgICBidXR0b25FbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMub25DbGlja0V2ZW50KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbkVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRleHQgb24gdGhlIGxhYmVsIG9mIHRoZSBidXR0b24uXHJcbiAgICAgKiBAcGFyYW0gdGV4dCB0aGUgdGV4dCB0byBwdXQgaW50byB0aGUgbGFiZWwgb2YgdGhlIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICBCdXR0b24ucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmZpbmQoJy4nICsgdGhpcy5wcmVmaXhDc3MoJ2xhYmVsJykpLmh0bWwodGV4dCk7XHJcbiAgICB9O1xyXG4gICAgQnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b25FdmVudHMub25DbGljay5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uLnByb3RvdHlwZSwgXCJvbkNsaWNrXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxCdXR0b248Q29uZmlnPiwgTm9BcmdzPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnV0dG9uRXZlbnRzLm9uQ2xpY2suZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBCdXR0b247XHJcbn0oY29tcG9uZW50XzEuQ29tcG9uZW50KSk7XHJcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9idXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4uL2V2ZW50ZGlzcGF0Y2hlclwiKTtcclxuLyoqXHJcbiAqIEEgc2ltcGxlIHRleHQgbGFiZWwuXHJcbiAqXHJcbiAqIERPTSBleGFtcGxlOlxyXG4gKiA8Y29kZT5cclxuICogICAgIDxzcGFuIGNsYXNzPSd1aS1sYWJlbCc+Li4uc29tZSB0ZXh0Li4uPC9zcGFuPlxyXG4gKiA8L2NvZGU+XHJcbiAqL1xyXG52YXIgTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGFiZWwoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmxhYmVsRXZlbnRzID0ge1xyXG4gICAgICAgICAgICBvbkNsaWNrOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uVGV4dENoYW5nZWQ6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWxhYmVsJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgX3RoaXMudGV4dCA9IF90aGlzLmNvbmZpZy50ZXh0O1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIExhYmVsLnByb3RvdHlwZS50b0RvbUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbGFiZWxFbGVtZW50ID0gbmV3IGRvbV8xLkRPTSgnc3BhbicsIHtcclxuICAgICAgICAgICAgJ2lkJzogdGhpcy5jb25maWcuaWQsXHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMuZ2V0Q3NzQ2xhc3NlcygpXHJcbiAgICAgICAgfSkuaHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgIGxhYmVsRWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9uQ2xpY2tFdmVudCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsYWJlbEVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHRleHQgb24gdGhpcyBsYWJlbC5cclxuICAgICAqIEBwYXJhbSB0ZXh0XHJcbiAgICAgKi9cclxuICAgIExhYmVsLnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmh0bWwodGV4dCk7XHJcbiAgICAgICAgdGhpcy5vblRleHRDaGFuZ2VkRXZlbnQodGV4dCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0ZXh0IG9uIHRoaXMgbGFiZWwuXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB0ZXh0IG9uIHRoZSBsYWJlbFxyXG4gICAgICovXHJcbiAgICBMYWJlbC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSB0ZXh0IG9uIHRoaXMgbGFiZWwuXHJcbiAgICAgKi9cclxuICAgIExhYmVsLnByb3RvdHlwZS5jbGVhclRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkuaHRtbCgnJyk7XHJcbiAgICAgICAgdGhpcy5vblRleHRDaGFuZ2VkRXZlbnQobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0cyBpZiB0aGUgbGFiZWwgaXMgZW1wdHkgYW5kIGRvZXMgbm90IGNvbnRhaW4gYW55IHRleHQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBsYWJlbCBpcyBlbXB0eSwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBMYWJlbC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMudGV4dDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIHRoZSB7QGxpbmsgI29uQ2xpY2t9IGV2ZW50LlxyXG4gICAgICogQ2FuIGJlIHVzZWQgYnkgc3ViY2xhc3NlcyB0byBsaXN0ZW4gdG8gdGhpcyBldmVudCB3aXRob3V0IHN1YnNjcmliaW5nIGFuIGV2ZW50IGxpc3RlbmVyIGJ5IG92ZXJ3cml0aW5nIHRoZSBtZXRob2RcclxuICAgICAqIGFuZCBjYWxsaW5nIHRoZSBzdXBlciBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIExhYmVsLnByb3RvdHlwZS5vbkNsaWNrRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbEV2ZW50cy5vbkNsaWNrLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIHtAbGluayAjb25DbGlja30gZXZlbnQuXHJcbiAgICAgKiBDYW4gYmUgdXNlZCBieSBzdWJjbGFzc2VzIHRvIGxpc3RlbiB0byB0aGlzIGV2ZW50IHdpdGhvdXQgc3Vic2NyaWJpbmcgYW4gZXZlbnQgbGlzdGVuZXIgYnkgb3ZlcndyaXRpbmcgdGhlIG1ldGhvZFxyXG4gICAgICogYW5kIGNhbGxpbmcgdGhlIHN1cGVyIG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgTGFiZWwucHJvdG90eXBlLm9uVGV4dENoYW5nZWRFdmVudCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbEV2ZW50cy5vblRleHRDaGFuZ2VkLmRpc3BhdGNoKHRoaXMsIHRleHQpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwib25DbGlja1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBsYWJlbCBpcyBjbGlja2VkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxMYWJlbDxMYWJlbENvbmZpZz4sIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsRXZlbnRzLm9uQ2xpY2suZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwib25UZXh0Q2hhbmdlZFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSB0ZXh0IG9uIHRoZSBsYWJlbCBpcyBjaGFuZ2VkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxMYWJlbDxMYWJlbENvbmZpZz4sIHN0cmluZz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsRXZlbnRzLm9uVGV4dENoYW5nZWQuZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBMYWJlbDtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuZXhwb3J0cy5MYWJlbCA9IExhYmVsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9sYWJlbC50c1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyBUT0RPIGNoYW5nZSB0byBpbnRlcm5hbCAobm90IGV4cG9ydGVkKSBjbGFzcywgaG93IHRvIHVzZSBpbiBvdGhlciBmaWxlcz9cclxuLyoqXHJcbiAqIEV4ZWN1dGVzIGEgY2FsbGJhY2sgYWZ0ZXIgYSBzcGVjaWZpZWQgYW1vdW50IG9mIHRpbWUsIG9wdGlvbmFsbHkgcmVwZWF0ZWRseSB1bnRpbCBzdG9wcGVkLlxyXG4gKi9cclxudmFyIFRpbWVvdXQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHRpbWVvdXQgY2FsbGJhY2sgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSBkZWxheSB0aGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGFmdGVyIHdoaWNoIHRoZSBjYWxsYmFjayBzaG91bGQgYmUgZXhlY3V0ZWRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB0aGUgY2FsbGJhY2sgdG8gZXhlY3V0ZSBhZnRlciB0aGUgZGVsYXkgdGltZVxyXG4gICAgICogQHBhcmFtIHJlcGVhdCBpZiB0cnVlLCBjYWxsIHRoZSBjYWxsYmFjayByZXBlYXRlZGx5IGluIGRlbGF5IGludGVydmFsc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBUaW1lb3V0KGRlbGF5LCBjYWxsYmFjaywgcmVwZWF0KSB7XHJcbiAgICAgICAgaWYgKHJlcGVhdCA9PT0gdm9pZCAwKSB7IHJlcGVhdCA9IGZhbHNlOyB9XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnJlcGVhdCA9IHJlcGVhdDtcclxuICAgICAgICB0aGlzLnRpbWVvdXRIYW5kbGUgPSAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgdGhlIHRpbWVvdXQgYW5kIGNhbGxzIHRoZSBjYWxsYmFjayB3aGVuIHRoZSB0aW1lb3V0IGRlbGF5IGhhcyBwYXNzZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7VGltZW91dH0gdGhlIGN1cnJlbnQgdGltZW91dCAoc28gdGhlIHN0YXJ0IGNhbGwgY2FuIGJlIGNoYWluZWQgdG8gdGhlIGNvbnN0cnVjdG9yKVxyXG4gICAgICovXHJcbiAgICBUaW1lb3V0LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIHRpbWVvdXQuIFRoZSBjYWxsYmFjayB3aWxsIG5vdCBiZSBjYWxsZWQgaWYgY2xlYXIgaXMgY2FsbGVkIGR1cmluZyB0aGUgdGltZW91dC5cclxuICAgICAqL1xyXG4gICAgVGltZW91dC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEhhbmRsZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgdGhlIHBhc3NlZCB0aW1lb3V0IGRlbGF5IHRvIHplcm8uIENhbiBiZSB1c2VkIHRvIGRlZmVyIHRoZSBjYWxsaW5nIG9mIHRoZSBjYWxsYmFjay5cclxuICAgICAqL1xyXG4gICAgVGltZW91dC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbGFzdFNjaGVkdWxlVGltZSA9IDA7XHJcbiAgICAgICAgdmFyIGRlbGF5QWRqdXN0ID0gMDtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdmFyIGludGVybmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5yZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIHRpbWUgb2Ygb25lIGl0ZXJhdGlvbiBmcm9tIHNjaGVkdWxpbmcgdG8gZXhlY3V0aW5nIHRoZSBjYWxsYmFjayAodXN1YWxseSBhIGJpdCBsb25nZXIgdGhhbiB0aGUgZGVsYXlcclxuICAgICAgICAgICAgICAgIC8vIHRpbWUpXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSBsYXN0U2NoZWR1bGVUaW1lO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZWxheSBhZGp1c3RtZW50IGZvciB0aGUgbmV4dCBzY2hlZHVsZSB0byBrZWVwIGEgc3RlYWR5IGRlbGF5IGludGVydmFsIG92ZXIgdGltZVxyXG4gICAgICAgICAgICAgICAgZGVsYXlBZGp1c3QgPSBfdGhpcy5kZWxheSAtIGRlbHRhICsgZGVsYXlBZGp1c3Q7XHJcbiAgICAgICAgICAgICAgICBsYXN0U2NoZWR1bGVUaW1lID0gbm93O1xyXG4gICAgICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV4dCBleGVjdXRpb24gYnkgdGhlIGFkanVzdGVkIGRlbGF5XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChpbnRlcm5hbENhbGxiYWNrLCBfdGhpcy5kZWxheSArIGRlbGF5QWRqdXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGFzdFNjaGVkdWxlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChpbnRlcm5hbENhbGxiYWNrLCB0aGlzLmRlbGF5KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVGltZW91dDtcclxufSgpKTtcclxuZXhwb3J0cy5UaW1lb3V0ID0gVGltZW91dDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL3RpbWVvdXQudHNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL3RvZ2dsZWJ1dHRvblwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiB0aGF0IHRvZ2dsZXMgYmV0d2VlbiBwbGF5YmFjayBhbmQgcGF1c2UuXHJcbiAqL1xyXG52YXIgUGxheWJhY2tUb2dnbGVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFBsYXliYWNrVG9nZ2xlQnV0dG9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUGxheWJhY2tUb2dnbGVCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXBsYXliYWNrdG9nZ2xlYnV0dG9uJyxcclxuICAgICAgICAgICAgdGV4dDogJ1BsYXkvUGF1c2UnXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBQbGF5YmFja1RvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyLCBoYW5kbGVDbGlja0V2ZW50KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoaGFuZGxlQ2xpY2tFdmVudCA9PT0gdm9pZCAwKSB7IGhhbmRsZUNsaWNrRXZlbnQgPSB0cnVlOyB9XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGlzU2Vla2luZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIEhhbmRsZXIgdG8gdXBkYXRlIGJ1dHRvbiBzdGF0ZSBiYXNlZCBvbiBwbGF5ZXIgc3RhdGVcclxuICAgICAgICB2YXIgcGxheWJhY2tTdGF0ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIFVJIGlzIGN1cnJlbnRseSBzZWVraW5nLCBwbGF5YmFjayBpcyB0ZW1wb3JhcmlseSBzdG9wcGVkIGJ1dCB0aGUgYnV0dG9ucyBzaG91bGRcclxuICAgICAgICAgICAgLy8gbm90IHJlZmxlY3QgdGhhdCBhbmQgc3RheSBhcy1pcyAoZS5nIGluZGljYXRlIHBsYXliYWNrIHdoaWxlIHNlZWtpbmcpLlxyXG4gICAgICAgICAgICBpZiAoaXNTZWVraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBsYXllci5pc1BsYXlpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9mZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBDYWxsIGhhbmRsZXIgdXBvbiB0aGVzZSBldmVudHNcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QTEFZLCBwbGF5YmFja1N0YXRlSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUEFVU0VELCBwbGF5YmFja1N0YXRlSGFuZGxlcik7XHJcbiAgICAgICAgLy8gd2hlbiBwbGF5YmFjayBmaW5pc2hlcywgcGxheWVyIHR1cm5zIHRvIHBhdXNlZCBtb2RlXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUExBWUJBQ0tfRklOSVNIRUQsIHBsYXliYWNrU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1NUQVJURUQsIHBsYXliYWNrU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1BMQVlJTkcsIHBsYXliYWNrU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1BBVVNFRCwgcGxheWJhY2tTdGF0ZUhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfUExBWUJBQ0tfRklOSVNIRUQsIHBsYXliYWNrU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICAvLyBEZXRlY3QgYWJzZW5jZSBvZiB0aW1lc2hpZnRpbmcgb24gbGl2ZSBzdHJlYW1zIGFuZCBhZGQgdGFnZ2luZyBjbGFzcyB0byBjb252ZXJ0IGJ1dHRvbiBpY29ucyB0byBwbGF5L3N0b3BcclxuICAgICAgICB2YXIgdGltZVNoaWZ0RGV0ZWN0b3IgPSBuZXcgdXRpbHNfMS5QbGF5ZXJVdGlscy5UaW1lU2hpZnRBdmFpbGFiaWxpdHlEZXRlY3RvcihwbGF5ZXIpO1xyXG4gICAgICAgIHRpbWVTaGlmdERldGVjdG9yLm9uVGltZVNoaWZ0QXZhaWxhYmlsaXR5Q2hhbmdlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgICAgICBpZiAoIWFyZ3MudGltZVNoaWZ0QXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXREb21FbGVtZW50KCkuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKFBsYXliYWNrVG9nZ2xlQnV0dG9uLkNMQVNTX1NUT1BUT0dHTEUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoUGxheWJhY2tUb2dnbGVCdXR0b24uQ0xBU1NfU1RPUFRPR0dMRSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGltZVNoaWZ0RGV0ZWN0b3IuZGV0ZWN0KCk7IC8vIEluaXRpYWwgZGV0ZWN0aW9uXHJcbiAgICAgICAgaWYgKGhhbmRsZUNsaWNrRXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gQ29udHJvbCBwbGF5ZXIgYnkgYnV0dG9uIGV2ZW50c1xyXG4gICAgICAgICAgICAvLyBXaGVuIGEgYnV0dG9uIGV2ZW50IHRyaWdnZXJzIGEgcGxheWVyIEFQSSBjYWxsLCBldmVudHMgYXJlIGZpcmVkIHdoaWNoIGluIHR1cm4gY2FsbCB0aGUgZXZlbnQgaGFuZGxlclxyXG4gICAgICAgICAgICAvLyBhYm92ZSB0aGF0IHVwZGF0ZWQgdGhlIGJ1dHRvbiBzdGF0ZS5cclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmlzUGxheWluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBhdXNlKCd1aS1idXR0b24nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KCd1aS1idXR0b24nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRyYWNrIFVJIHNlZWtpbmcgc3RhdHVzXHJcbiAgICAgICAgdWltYW5hZ2VyLm9uU2Vlay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpc1NlZWtpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVpbWFuYWdlci5vblNlZWtlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpc1NlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBTdGFydHVwIGluaXRcclxuICAgICAgICBwbGF5YmFja1N0YXRlSGFuZGxlcihudWxsKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGxheWJhY2tUb2dnbGVCdXR0b247XHJcbn0odG9nZ2xlYnV0dG9uXzEuVG9nZ2xlQnV0dG9uKSk7XHJcblBsYXliYWNrVG9nZ2xlQnV0dG9uLkNMQVNTX1NUT1BUT0dHTEUgPSAnc3RvcHRvZ2dsZSc7XHJcbmV4cG9ydHMuUGxheWJhY2tUb2dnbGVCdXR0b24gPSBQbGF5YmFja1RvZ2dsZUJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvcGxheWJhY2t0b2dnbGVidXR0b24udHNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4uL2V2ZW50ZGlzcGF0Y2hlclwiKTtcclxudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuLi90aW1lb3V0XCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxuLyoqXHJcbiAqIEEgc2VlayBiYXIgdG8gc2VlayB3aXRoaW4gdGhlIHBsYXllcidzIG1lZGlhLiBJdCBkaXNwbGF5cyB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiwgYW1vdW50IG9mIGJ1ZmZlZCBkYXRhLCBzZWVrXHJcbiAqIHRhcmdldCwgYW5kIGtlZXBzIHN0YXR1cyBhYm91dCBhbiBvbmdvaW5nIHNlZWsuXHJcbiAqXHJcbiAqIFRoZSBzZWVrIGJhciBkaXNwbGF5cyBkaWZmZXJlbnQgJ2JhcnMnOlxyXG4gKiAgLSB0aGUgcGxheWJhY2sgcG9zaXRpb24sIGkuZS4gdGhlIHBvc2l0aW9uIGluIHRoZSBtZWRpYSBhdCB3aGljaCB0aGUgcGxheWVyIGN1cnJlbnQgcGxheWJhY2sgcG9pbnRlciBpcyBwb3NpdGlvbmVkXHJcbiAqICAtIHRoZSBidWZmZXIgcG9zaXRpb24sIHdoaWNoIHVzdWFsbHkgaXMgdGhlIHBsYXliYWNrIHBvc2l0aW9uIHBsdXMgdGhlIHRpbWUgc3BhbiB0aGF0IGlzIGFscmVhZHkgYnVmZmVyZWQgYWhlYWRcclxuICogIC0gdGhlIHNlZWsgcG9zaXRpb24sIHVzZWQgdG8gcHJldmlldyB0byB3aGVyZSBpbiB0aGUgdGltZWxpbmUgYSBzZWVrIHdpbGwganVtcCB0b1xyXG4gKi9cclxudmFyIFNlZWtCYXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNlZWtCYXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTZWVrQmFyKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCdWZmZXIgb2YgdGhlIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uLiBUaGUgcG9zaXRpb24gbXVzdCBiZSBidWZmZXJlZCBpbiBjYXNlIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICogbmVlZHMgdG8gYmUgcmVmcmVzaGVkIHdpdGgge0BsaW5rICNyZWZyZXNoUGxheWJhY2tQb3NpdGlvbn0uXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBfdGhpcy5wbGF5YmFja1Bvc2l0aW9uUGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9oYWNrcy5tb3ppbGxhLm9yZy8yMDEzLzA0L2RldGVjdGluZy10b3VjaC1pdHMtdGhlLXdoeS1ub3QtdGhlLWhvdy9cclxuICAgICAgICBfdGhpcy50b3VjaFN1cHBvcnRlZCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xyXG4gICAgICAgIF90aGlzLnNlZWtCYXJFdmVudHMgPSB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBGaXJlZCB3aGVuIGEgc2NydWJiaW5nIHNlZWsgb3BlcmF0aW9uIGlzIHN0YXJ0ZWQuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBvblNlZWs6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEZpcmVkIGR1cmluZyBhIHNjcnViYmluZyBzZWVrIHRvIGluZGljYXRlIHRoYXQgdGhlIHNlZWsgcHJldmlldyAoaS5lLiB0aGUgdmlkZW8gZnJhbWUpIHNob3VsZCBiZSB1cGRhdGVkLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgb25TZWVrUHJldmlldzogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRmlyZWQgd2hlbiBhIHNjcnViYmluZyBzZWVrIGhhcyBmaW5pc2hlZCBvciB3aGVuIGEgZGlyZWN0IHNlZWsgaXMgaXNzdWVkLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgb25TZWVrZWQ6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktc2Vla2JhcicsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZSxcclxuICAgICAgICAgICAgc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZUludGVydmFsTXM6IDUwLFxyXG4gICAgICAgICAgICBoaWRlSW5MaXZlUGxheWJhY2s6IHRydWUsXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICBfdGhpcy5sYWJlbCA9IF90aGlzLmNvbmZpZy5sYWJlbDtcclxuICAgICAgICBfdGhpcy50aW1lbGluZU1hcmtlcnMgPSBbXTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0xhYmVsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRMYWJlbCgpLmluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyLCBjb25maWd1cmVTZWVrKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoY29uZmlndXJlU2VlayA9PT0gdm9pZCAwKSB7IGNvbmZpZ3VyZVNlZWsgPSB0cnVlOyB9XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgaWYgKCFjb25maWd1cmVTZWVrKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBjb25maWd1cmVTZWVrIGZsYWcgY2FuIGJlIHVzZWQgYnkgc3ViY2xhc3NlcyB0byBkaXNhYmxlIGNvbmZpZ3VyYXRpb24gYXMgc2VlayBiYXIuIEUuZy4gdGhlIHZvbHVtZVxyXG4gICAgICAgICAgICAvLyBzbGlkZXIgaXMgcmV1c2luZyB0aGlzIGNvbXBvbmVudCBidXQgYWRkcyBpdHMgb3duIGZ1bmN0aW9uYWxpdHksIGFuZCBkb2VzIG5vdCBuZWVkIHRoZSBzZWVrIGZ1bmN0aW9uYWxpdHkuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYWN0dWFsbHkgYSBoYWNrLCB0aGUgcHJvcGVyIHNvbHV0aW9uIHdvdWxkIGJlIGZvciBib3RoIHNlZWsgYmFyIGFuZCB2b2x1bWUgc2xpZGVycyB0byBleHRlbmRcclxuICAgICAgICAgICAgLy8gYSBjb21tb24gYmFzZSBzbGlkZXIgY29tcG9uZW50IGFuZCBpbXBsZW1lbnQgdGhlaXIgZnVuY3Rpb25hbGl0eSB0aGVyZS5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGxheWJhY2tOb3RJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIGlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpc1NlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyBVcGRhdGUgcGxheWJhY2sgYW5kIGJ1ZmZlciBwb3NpdGlvbnNcclxuICAgICAgICB2YXIgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGZvcmNlVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCA9PT0gdm9pZCAwKSB7IGV2ZW50ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBpZiAoZm9yY2VVcGRhdGUgPT09IHZvaWQgMCkgeyBmb3JjZVVwZGF0ZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgICAgIC8vIE9uY2UgdGhpcyBoYW5kbGVyIG9zIGNhbGxlZCwgcGxheWJhY2sgaGFzIGJlZW4gc3RhcnRlZCBhbmQgd2Ugc2V0IHRoZSBmbGFnIHRvIGZhbHNlXHJcbiAgICAgICAgICAgIHBsYXliYWNrTm90SW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGlzU2Vla2luZykge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgY2F1Z2h0IGEgc2VlayBwcmV2aWV3IHNlZWssIGRvIG5vdCB1cGRhdGUgdGhlIHNlZWtiYXJcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmdldE1heFRpbWVTaGlmdCgpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBjYXNlIG11c3QgYmUgZXhwbGljaXRseSBoYW5kbGVkIHRvIGF2b2lkIGRpdmlzaW9uIGJ5IHplcm9cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UgPSAxMDAgLSAoMTAwIC8gcGxheWVyLmdldE1heFRpbWVTaGlmdCgpICogcGxheWVyLmdldFRpbWVTaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKHBsYXliYWNrUG9zaXRpb25QZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyBzaG93IGZ1bGwgYnVmZmVyIGZvciBsaXZlIHN0cmVhbXNcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEJ1ZmZlclBvc2l0aW9uKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBIaWRlIFNlZWtCYXIgaWYgcmVxdWlyZWQuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoY29uZmlnLmhpZGVJbkxpdmVQbGF5YmFjaykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXliYWNrUG9zaXRpb25QZXJjZW50YWdlID0gMTAwIC8gcGxheWVyLmdldER1cmF0aW9uKCkgKiBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlb0J1ZmZlckxlbmd0aCA9IHBsYXllci5nZXRWaWRlb0J1ZmZlckxlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF1ZGlvQnVmZmVyTGVuZ3RoID0gcGxheWVyLmdldEF1ZGlvQnVmZmVyTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGJ1ZmZlciBsZW5ndGggd2hpY2ggaXMgdGhlIHNtYWxsZXIgbGVuZ3RoIG9mIHRoZSBhdWRpbyBhbmQgdmlkZW8gYnVmZmVycy4gSWYgb25lIG9mIHRoZXNlXHJcbiAgICAgICAgICAgICAgICAvLyBidWZmZXJzIGlzIG5vdCBhdmFpbGFibGUsIHdlIHNldCBpdCdzIHZhbHVlIHRvIE1BWF9WQUxVRSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgb3RoZXIgcmVhbCB2YWx1ZSBpcyB0YWtlblxyXG4gICAgICAgICAgICAgICAgLy8gYXMgdGhlIGJ1ZmZlciBsZW5ndGguXHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyTGVuZ3RoID0gTWF0aC5taW4odmlkZW9CdWZmZXJMZW5ndGggIT0gbnVsbCA/IHZpZGVvQnVmZmVyTGVuZ3RoIDogTnVtYmVyLk1BWF9WQUxVRSwgYXVkaW9CdWZmZXJMZW5ndGggIT0gbnVsbCA/IGF1ZGlvQnVmZmVyTGVuZ3RoIDogTnVtYmVyLk1BWF9WQUxVRSk7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBib3RoIGJ1ZmZlciBsZW5ndGhzIGFyZSBtaXNzaW5nLCB3ZSBzZXQgdGhlIGJ1ZmZlciBsZW5ndGggdG8gemVyb1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlckxlbmd0aCA9PT0gTnVtYmVyLk1BWF9WQUxVRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlckxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyUGVyY2VudGFnZSA9IDEwMCAvIHBsYXllci5nZXREdXJhdGlvbigpICogYnVmZmVyTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIG9ubHkgaW4gcGF1c2VkIHN0YXRlIG9yIGluIHRoZSBpbml0aWFsIHN0YXJ0dXAgc3RhdGUgd2hlcmUgcGxheWVyIGlzIG5laXRoZXJcclxuICAgICAgICAgICAgICAgIC8vIHBhdXNlZCBub3IgcGxheWluZy4gUGxheWJhY2sgdXBkYXRlcyBhcmUgaGFuZGxlZCBpbiB0aGUgVGltZW91dCBiZWxvdy5cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb25maWcuc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZUludGVydmFsTXMgPT09IFNlZWtCYXIuU01PT1RIX1BMQVlCQUNLX1BPU0lUSU9OX1VQREFURV9ESVNBQkxFRFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IGZvcmNlVXBkYXRlIHx8IHBsYXllci5pc1BhdXNlZCgpIHx8IChwbGF5ZXIuaXNQYXVzZWQoKSA9PT0gcGxheWVyLmlzUGxheWluZygpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFBsYXliYWNrUG9zaXRpb24ocGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QnVmZmVyUG9zaXRpb24ocGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UgKyBidWZmZXJQZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gVXBkYXRlIHNlZWtiYXIgdXBvbiB0aGVzZSBldmVudHNcclxuICAgICAgICAvLyBpbml0IHBsYXliYWNrIHBvc2l0aW9uIHdoZW4gdGhlIHBsYXllciBpcyByZWFkeVxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgLy8gdXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIHdoZW4gaXQgY2hhbmdlc1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfQ0hBTkdFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBidWZmZXJsZXZlbCB3aGVuIGJ1ZmZlcmluZyBpcyBjb21wbGV0ZVxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NUQUxMX0VOREVELCBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgLy8gdXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIHdoZW4gYSBzZWVrIGhhcyBmaW5pc2hlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NFRUtFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBwbGF5YmFjayBwb3NpdGlvbiB3aGVuIGEgdGltZXNoaWZ0IGhhcyBmaW5pc2hlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfU0hJRlRFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIHVwZGF0ZSBidWZmZXJsZXZlbCB3aGVuIGEgc2VnbWVudCBoYXMgYmVlbiBkb3dubG9hZGVkXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU0VHTUVOVF9SRVFVRVNUX0ZJTklTSEVELCBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgLy8gdXBkYXRlIHBsYXliYWNrIHBvc2l0aW9uIG9mIENhc3QgcGxheWJhY2tcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1RJTUVfVVBEQVRFRCwgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIC8vIFNlZWsgaGFuZGxpbmdcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TRUVLLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU0VFS0VELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfU0hJRlQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla2luZyh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9USU1FX1NISUZURUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla2luZyhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHNlZWsgPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIudGltZVNoaWZ0KHBsYXllci5nZXRNYXhUaW1lU2hpZnQoKSAtIChwbGF5ZXIuZ2V0TWF4VGltZVNoaWZ0KCkgKiAocGVyY2VudGFnZSAvIDEwMCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5zZWVrKHBsYXllci5nZXREdXJhdGlvbigpICogKHBlcmNlbnRhZ2UgLyAxMDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vblNlZWsuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZW5kZXIpIHtcclxuICAgICAgICAgICAgaXNTZWVraW5nID0gdHJ1ZTsgLy8gdHJhY2sgc2Vla2luZyBzdGF0dXMgc28gd2UgY2FuIGNhdGNoIGV2ZW50cyBmcm9tIHNlZWsgcHJldmlldyBzZWVrc1xyXG4gICAgICAgICAgICAvLyBOb3RpZnkgVUkgbWFuYWdlciBvZiBzdGFydGVkIHNlZWtcclxuICAgICAgICAgICAgdWltYW5hZ2VyLm9uU2Vlay5kaXNwYXRjaChzZW5kZXIpO1xyXG4gICAgICAgICAgICAvLyBTYXZlIGN1cnJlbnQgcGxheWJhY2sgc3RhdGVcclxuICAgICAgICAgICAgaXNQbGF5aW5nID0gcGxheWVyLmlzUGxheWluZygpO1xyXG4gICAgICAgICAgICAvLyBQYXVzZSBwbGF5YmFjayB3aGlsZSBzZWVraW5nXHJcbiAgICAgICAgICAgIGlmIChpc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZSgndWktc2VlaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vblNlZWtQcmV2aWV3LnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGlmeSBVSSBtYW5hZ2VyIG9mIHNlZWsgcHJldmlld1xyXG4gICAgICAgICAgICB1aW1hbmFnZXIub25TZWVrUHJldmlldy5kaXNwYXRjaChzZW5kZXIsIGFyZ3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub25TZWVrUHJldmlldy5zdWJzY3JpYmVSYXRlTGltaXRlZChmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIFJhdGUtbGltaXRlZCBzY3J1YmJpbmcgc2Vla1xyXG4gICAgICAgICAgICBpZiAoYXJncy5zY3J1YmJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHNlZWsoYXJncy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIHRoaXMub25TZWVrZWQuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZW5kZXIsIHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICAgICAgaXNTZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIERvIHRoZSBzZWVrXHJcbiAgICAgICAgICAgIHNlZWsocGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIC8vIENvbnRpbnVlIHBsYXliYWNrIGFmdGVyIHNlZWsgaWYgcGxheWVyIHdhcyBwbGF5aW5nIHdoZW4gc2VlayBzdGFydGVkXHJcbiAgICAgICAgICAgIGlmIChpc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KCd1aS1zZWVrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTm90aWZ5IFVJIG1hbmFnZXIgb2YgZmluaXNoZWQgc2Vla1xyXG4gICAgICAgICAgICB1aW1hbmFnZXIub25TZWVrZWQuZGlzcGF0Y2goc2VuZGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5oYXNMYWJlbCgpKSB7XHJcbiAgICAgICAgICAgIC8vIENvbmZpZ3VyZSBhIHNlZWtiYXIgbGFiZWwgdGhhdCBpcyBpbnRlcm5hbCB0byB0aGUgc2Vla2JhcilcclxuICAgICAgICAgICAgdGhpcy5nZXRMYWJlbCgpLmNvbmZpZ3VyZShwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEhpZGUgc2Vla2JhciBmb3IgbGl2ZSBzb3VyY2VzIHdpdGhvdXQgdGltZXNoaWZ0XHJcbiAgICAgICAgdmFyIGlzTGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBoYXNUaW1lU2hpZnQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc3dpdGNoVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIChpc0xpdmUsIGhhc1RpbWVTaGlmdCkge1xyXG4gICAgICAgICAgICBpZiAoaXNMaXZlICYmICFoYXNUaW1lU2hpZnQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwbGF5YmFja1Bvc2l0aW9uSGFuZGxlcihudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgX3RoaXMucmVmcmVzaFBsYXliYWNrUG9zaXRpb24oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBsaXZlU3RyZWFtRGV0ZWN0b3IgPSBuZXcgdXRpbHNfMS5QbGF5ZXJVdGlscy5MaXZlU3RyZWFtRGV0ZWN0b3IocGxheWVyKTtcclxuICAgICAgICBsaXZlU3RyZWFtRGV0ZWN0b3Iub25MaXZlQ2hhbmdlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgICAgICBpc0xpdmUgPSBhcmdzLmxpdmU7XHJcbiAgICAgICAgICAgIHN3aXRjaFZpc2liaWxpdHkoaXNMaXZlLCBoYXNUaW1lU2hpZnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciB0aW1lU2hpZnREZXRlY3RvciA9IG5ldyB1dGlsc18xLlBsYXllclV0aWxzLlRpbWVTaGlmdEF2YWlsYWJpbGl0eURldGVjdG9yKHBsYXllcik7XHJcbiAgICAgICAgdGltZVNoaWZ0RGV0ZWN0b3Iub25UaW1lU2hpZnRBdmFpbGFiaWxpdHlDaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGhhc1RpbWVTaGlmdCA9IGFyZ3MudGltZVNoaWZ0QXZhaWxhYmxlO1xyXG4gICAgICAgICAgICBzd2l0Y2hWaXNpYmlsaXR5KGlzTGl2ZSwgaGFzVGltZVNoaWZ0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0aWFsIGRldGVjdGlvblxyXG4gICAgICAgIGxpdmVTdHJlYW1EZXRlY3Rvci5kZXRlY3QoKTtcclxuICAgICAgICB0aW1lU2hpZnREZXRlY3Rvci5kZXRlY3QoKTtcclxuICAgICAgICAvLyBSZWZyZXNoIHRoZSBwbGF5YmFjayBwb3NpdGlvbiB3aGVuIHRoZSBwbGF5ZXIgcmVzaXplZCBvciB0aGUgVUkgaXMgY29uZmlndXJlZC4gVGhlIHBsYXliYWNrIHBvc2l0aW9uIG1hcmtlclxyXG4gICAgICAgIC8vIGlzIHBvc2l0aW9uZWQgYWJzb2x1dGVseSBhbmQgbXVzdCB0aGVyZWZvcmUgYmUgdXBkYXRlZCB3aGVuIHRoZSBzaXplIG9mIHRoZSBzZWVrYmFyIGNoYW5nZXMuXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUExBWUVSX1JFU0laRSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEFkZGl0aW9uYWxseSwgd2hlbiB0aGlzIGNvZGUgaXMgY2FsbGVkLCB0aGUgc2Vla2JhciBpcyBub3QgcGFydCBvZiB0aGUgVUkgeWV0IGFuZCB0aGVyZWZvcmUgZG9lcyBub3QgaGF2ZSBhIHNpemUsXHJcbiAgICAgICAgLy8gcmVzdWx0aW5nIGluIGEgd3JvbmcgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgbWFya2VyLiBSZWZyZXNoaW5nIGl0IG9uY2UgdGhlIFVJIGlzIGNvbmZpZ3VyZWQgc29sdmVkIHRoaXMgaXNzdWUuXHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29uZmlndXJlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEl0IGNhbiBhbHNvIGhhcHBlbiB0aGF0IHRoZSB2YWx1ZSBjaGFuZ2VzIG9uY2UgdGhlIHBsYXllciBpcyByZWFkeSwgb3Igd2hlbiBhIG5ldyBzb3VyY2UgaXMgbG9hZGVkLCBzbyB3ZSBuZWVkXHJcbiAgICAgICAgLy8gdG8gdXBkYXRlIG9uIE9OX1JFQURZIHRvb1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlZnJlc2hQbGF5YmFja1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzZWVrYmFyXHJcbiAgICAgICAgcGxheWJhY2tQb3NpdGlvbkhhbmRsZXIoKTsgLy8gU2V0IHRoZSBwbGF5YmFjayBwb3NpdGlvblxyXG4gICAgICAgIHRoaXMuc2V0QnVmZmVyUG9zaXRpb24oMCk7XHJcbiAgICAgICAgdGhpcy5zZXRTZWVrUG9zaXRpb24oMCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNtb290aFBsYXliYWNrUG9zaXRpb25VcGRhdGVJbnRlcnZhbE1zICE9PSBTZWVrQmFyLlNNT09USF9QTEFZQkFDS19QT1NJVElPTl9VUERBVEVfRElTQUJMRUQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlcihwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlndXJlTWFya2VycyhwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuY29uZmlndXJlU21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogUGxheWJhY2sgcG9zaXRpb24gdXBkYXRlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBXZSBkbyBub3QgdXBkYXRlIHRoZSBwb3NpdGlvbiBkaXJlY3RseSBmcm9tIHRoZSBPTl9USU1FX0NIQU5HRUQgZXZlbnQsIGJlY2F1c2UgaXQgYXJyaXZlcyB2ZXJ5IGppdHRlcnkgYW5kXHJcbiAgICAgICAgICogcmVzdWx0cyBpbiBhIGppdHRlcnkgcG9zaXRpb24gaW5kaWNhdG9yIHNpbmNlIHRoZSBDU1MgdHJhbnNpdGlvbiB0aW1lIGlzIHN0YXRpY2FsbHkgc2V0LlxyXG4gICAgICAgICAqIFRvIHdvcmsgYXJvdW5kIHRoaXMgaXNzdWUsIHdlIG1haW50YWluIGEgbG9jYWwgcGxheWJhY2sgcG9zaXRpb24gdGhhdCBpcyB1cGRhdGVkIGluIGEgc3RhYmxlIHJlZ3VsYXIgaW50ZXJ2YWxcclxuICAgICAgICAgKiBhbmQga2VwdCBpbiBzeW5jIHdpdGggdGhlIHBsYXllci5cclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgY3VycmVudFRpbWVTZWVrQmFyID0gMDtcclxuICAgICAgICB2YXIgY3VycmVudFRpbWVQbGF5ZXIgPSAwO1xyXG4gICAgICAgIHZhciB1cGRhdGVJbnRlcnZhbE1zID0gNTA7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUaW1lVXBkYXRlRGVsdGFTZWNzID0gdXBkYXRlSW50ZXJ2YWxNcyAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5zbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlciA9IG5ldyB0aW1lb3V0XzEuVGltZW91dCh1cGRhdGVJbnRlcnZhbE1zLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lU2Vla0JhciArPSBjdXJyZW50VGltZVVwZGF0ZURlbHRhU2VjcztcclxuICAgICAgICAgICAgY3VycmVudFRpbWVQbGF5ZXIgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgLy8gU3luYyBjdXJyZW50VGltZSBvZiBzZWVrYmFyIHRvIHBsYXllclxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbWVEZWx0YSA9IGN1cnJlbnRUaW1lU2Vla0JhciAtIGN1cnJlbnRUaW1lUGxheWVyO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsdGEgaXMgbGFyZ2VyIHRoYXQgMiBzZWNzLCBkaXJlY3RseSBqdW1wIHRoZSBzZWVrYmFyIHRvIHRoZVxyXG4gICAgICAgICAgICAvLyBwbGF5ZXIgdGltZSBpbnN0ZWFkIG9mIHNtb290aGx5IGZhc3QgZm9yd2FyZGluZy9yZXdpbmRpbmcuXHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhjdXJyZW50VGltZURlbHRhKSA+IDIpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lU2Vla0JhciA9IGN1cnJlbnRUaW1lUGxheWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRUaW1lRGVsdGEgPD0gLWN1cnJlbnRUaW1lVXBkYXRlRGVsdGFTZWNzKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZVNlZWtCYXIgKz0gY3VycmVudFRpbWVVcGRhdGVEZWx0YVNlY3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFRpbWVEZWx0YSA+PSBjdXJyZW50VGltZVVwZGF0ZURlbHRhU2Vjcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWVTZWVrQmFyIC09IGN1cnJlbnRUaW1lVXBkYXRlRGVsdGFTZWNzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwbGF5YmFja1Bvc2l0aW9uUGVyY2VudGFnZSA9IDEwMCAvIHBsYXllci5nZXREdXJhdGlvbigpICogY3VycmVudFRpbWVTZWVrQmFyO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKHBsYXliYWNrUG9zaXRpb25QZXJjZW50YWdlKTtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB2YXIgc3RhcnRTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFwbGF5ZXIuaXNMaXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lU2Vla0JhciA9IHBsYXllci5nZXRDdXJyZW50VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHN0b3BTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuc21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIuY2xlYXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIHN0YXJ0U21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfUExBWUlORywgc3RhcnRTbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUEFVU0VELCBzdG9wU21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfUEFVU0VELCBzdG9wU21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NFRUtFRCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdXJyZW50VGltZVNlZWtCYXIgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocGxheWVyLmlzUGxheWluZygpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0U21vb3RoUGxheWJhY2tQb3NpdGlvblVwZGF0ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuY29uZmlndXJlTWFya2VycyA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNsZWFyTWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudGltZWxpbmVNYXJrZXJzID0gW107XHJcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZU1hcmtlcnMoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBzZXR1cE1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsZWFyTWFya2VycygpO1xyXG4gICAgICAgICAgICB2YXIgaGFzTWFya2Vyc0luVWlDb25maWcgPSB1aW1hbmFnZXIuZ2V0Q29uZmlnKCkubWV0YWRhdGEgJiYgdWltYW5hZ2VyLmdldENvbmZpZygpLm1ldGFkYXRhLm1hcmtlcnNcclxuICAgICAgICAgICAgICAgICYmIHVpbWFuYWdlci5nZXRDb25maWcoKS5tZXRhZGF0YS5tYXJrZXJzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIHZhciBoYXNNYXJrZXJzSW5QbGF5ZXJDb25maWcgPSBwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlICYmIHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UubWFya2Vyc1xyXG4gICAgICAgICAgICAgICAgJiYgcGxheWVyLmdldENvbmZpZygpLnNvdXJjZS5tYXJrZXJzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIC8vIFRha2UgbWFya2VycyBmcm9tIHRoZSBVSSBjb25maWcuIElmIG5vIG1hcmtlcnMgZGVmaW5lZCwgdHJ5IHRvIHRha2UgdGhlbSBmcm9tIHRoZSBwbGF5ZXIncyBzb3VyY2UgY29uZmlnLlxyXG4gICAgICAgICAgICB2YXIgbWFya2VycyA9IGhhc01hcmtlcnNJblVpQ29uZmlnID8gdWltYW5hZ2VyLmdldENvbmZpZygpLm1ldGFkYXRhLm1hcmtlcnMgOlxyXG4gICAgICAgICAgICAgICAgaGFzTWFya2Vyc0luUGxheWVyQ29uZmlnID8gcGxheWVyLmdldENvbmZpZygpLnNvdXJjZS5tYXJrZXJzIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGltZWxpbmUgbWFya2VycyBmcm9tIHRoZSBjb25maWcgaWYgd2UgaGF2ZSBtYXJrZXJzIGFuZCBpZiB3ZSBoYXZlIGEgZHVyYXRpb25cclxuICAgICAgICAgICAgLy8gVGhlIGR1cmF0aW9uIGNoZWNrIGlzIGZvciBidWdneSBwbGF0Zm9ybXMgd2hlcmUgdGhlIGR1cmF0aW9uIGlzIG5vdCBhdmFpbGFibGUgaW5zdGFudGx5IChDaHJvbWUgb24gQW5kcm9pZCA0LjMpXHJcbiAgICAgICAgICAgIGlmIChtYXJrZXJzICYmIHBsYXllci5nZXREdXJhdGlvbigpICE9PSBJbmZpbml0eSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBtYXJrZXJzXzEgPSBtYXJrZXJzOyBfaSA8IG1hcmtlcnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyID0gbWFya2Vyc18xW19pXTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aW1lbGluZU1hcmtlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IDEwMCAvIHBsYXllci5nZXREdXJhdGlvbigpICogbWFya2VyLnRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtYXJrZXIudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgdGhlIHRpbWVsaW5lIHdpdGggdGhlIG1hcmtlcnNcclxuICAgICAgICAgICAgX3RoaXMudXBkYXRlTWFya2VycygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQWRkIG1hcmtlcnMgd2hlbiBhIHNvdXJjZSBpcyBsb2FkZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9SRUFEWSwgc2V0dXBNYXJrZXJzKTtcclxuICAgICAgICAvLyBSZW1vdmUgbWFya2VycyB3aGVuIHVubG9hZGVkXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU09VUkNFX1VOTE9BREVELCBjbGVhck1hcmtlcnMpO1xyXG4gICAgICAgIC8vIEluaXQgbWFya2VycyBhdCBzdGFydHVwXHJcbiAgICAgICAgc2V0dXBNYXJrZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJlbGVhc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5zbW9vdGhQbGF5YmFja1Bvc2l0aW9uVXBkYXRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNtb290aFBsYXliYWNrUG9zaXRpb25VcGRhdGVyLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jc3NDbGFzc2VzLnB1c2goJ3ZlcnRpY2FsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWVrQmFyQ29udGFpbmVyID0gbmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAnaWQnOiB0aGlzLmNvbmZpZy5pZCxcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5nZXRDc3NDbGFzc2VzKClcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgc2Vla0JhciA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXInKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhciA9IHNlZWtCYXI7XHJcbiAgICAgICAgLy8gSW5kaWNhdG9yIHRoYXQgc2hvd3MgdGhlIGJ1ZmZlciBmaWxsIGxldmVsXHJcbiAgICAgICAgdmFyIHNlZWtCYXJCdWZmZXJMZXZlbCA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItYnVmZmVybGV2ZWwnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhckJ1ZmZlclBvc2l0aW9uID0gc2Vla0JhckJ1ZmZlckxldmVsO1xyXG4gICAgICAgIC8vIEluZGljYXRvciB0aGF0IHNob3dzIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uXHJcbiAgICAgICAgdmFyIHNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uID0gbmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnc2Vla2Jhci1wbGF5YmFja3Bvc2l0aW9uJylcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uID0gc2Vla0JhclBsYXliYWNrUG9zaXRpb247XHJcbiAgICAgICAgLy8gQSBtYXJrZXIgb2YgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24sIGUuZy4gYSBkb3Qgb3IgbGluZVxyXG4gICAgICAgIHZhciBzZWVrQmFyUGxheWJhY2tQb3NpdGlvbk1hcmtlciA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItcGxheWJhY2twb3NpdGlvbi1tYXJrZXInKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhclBsYXliYWNrUG9zaXRpb25NYXJrZXIgPSBzZWVrQmFyUGxheWJhY2tQb3NpdGlvbk1hcmtlcjtcclxuICAgICAgICAvLyBJbmRpY2F0b3IgdGhhdCBzaG93IHdoZXJlIGEgc2VlayB3aWxsIGdvIHRvXHJcbiAgICAgICAgdmFyIHNlZWtCYXJTZWVrUG9zaXRpb24gPSBuZXcgZG9tXzEuRE9NKCdkaXYnLCB7XHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMucHJlZml4Q3NzKCdzZWVrYmFyLXNlZWtwb3NpdGlvbicpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyU2Vla1Bvc2l0aW9uID0gc2Vla0JhclNlZWtQb3NpdGlvbjtcclxuICAgICAgICAvLyBJbmRpY2F0b3IgdGhhdCBzaG93cyB0aGUgZnVsbCBzZWVrYmFyXHJcbiAgICAgICAgdmFyIHNlZWtCYXJCYWNrZHJvcCA9IG5ldyBkb21fMS5ET00oJ2RpdicsIHtcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItYmFja2Ryb3AnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0JhckJhY2tkcm9wID0gc2Vla0JhckJhY2tkcm9wO1xyXG4gICAgICAgIHZhciBzZWVrQmFyQ2hhcHRlck1hcmtlcnNDb250YWluZXIgPSBuZXcgZG9tXzEuRE9NKCdkaXYnLCB7XHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMucHJlZml4Q3NzKCdzZWVrYmFyLW1hcmtlcnMnKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Vla0Jhck1hcmtlcnNDb250YWluZXIgPSBzZWVrQmFyQ2hhcHRlck1hcmtlcnNDb250YWluZXI7XHJcbiAgICAgICAgc2Vla0Jhci5hcHBlbmQoc2Vla0JhckJhY2tkcm9wLCBzZWVrQmFyQnVmZmVyTGV2ZWwsIHNlZWtCYXJTZWVrUG9zaXRpb24sIHNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uLCBzZWVrQmFyQ2hhcHRlck1hcmtlcnNDb250YWluZXIsIHNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uTWFya2VyKTtcclxuICAgICAgICB2YXIgc2Vla2luZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIERlZmluZSBoYW5kbGVyIGZ1bmN0aW9ucyBzbyB3ZSBjYW4gYXR0YWNoL3JlbW92ZSB0aGVtIGxhdGVyXHJcbiAgICAgICAgdmFyIG1vdXNlVG91Y2hNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpb24gdG8gVlIgaGFuZGxlclxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UGVyY2VudGFnZSA9IDEwMCAqIF90aGlzLmdldE9mZnNldChlKTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla1Bvc2l0aW9uKHRhcmdldFBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRQbGF5YmFja1Bvc2l0aW9uKHRhcmdldFBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICBfdGhpcy5vblNlZWtQcmV2aWV3RXZlbnQodGFyZ2V0UGVyY2VudGFnZSwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgbW91c2VUb3VjaFVwSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGhhbmRsZXJzLCBzZWVrIG9wZXJhdGlvbiBpcyBmaW5pc2hlZFxyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vZmYoJ3RvdWNobW92ZSBtb3VzZW1vdmUnLCBtb3VzZVRvdWNoTW92ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vZmYoJ3RvdWNoZW5kIG1vdXNldXAnLCBtb3VzZVRvdWNoVXBIYW5kbGVyKTtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBlcmNlbnRhZ2UgPSAxMDAgKiBfdGhpcy5nZXRPZmZzZXQoZSk7XHJcbiAgICAgICAgICAgIHZhciBzbmFwcGVkQ2hhcHRlciA9IF90aGlzLmdldE1hcmtlckF0UG9zaXRpb24odGFyZ2V0UGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICBzZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEZpcmUgc2Vla2VkIGV2ZW50XHJcbiAgICAgICAgICAgIF90aGlzLm9uU2Vla2VkRXZlbnQoc25hcHBlZENoYXB0ZXIgPyBzbmFwcGVkQ2hhcHRlci50aW1lIDogdGFyZ2V0UGVyY2VudGFnZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBBIHNlZWsgYWx3YXlzIHN0YXJ0IHdpdGggYSB0b3VjaHN0YXJ0IG9yIG1vdXNlZG93biBkaXJlY3RseSBvbiB0aGUgc2Vla2Jhci5cclxuICAgICAgICAvLyBUbyB0cmFjayBhIG1vdXNlIHNlZWsgYWxzbyBvdXRzaWRlIHRoZSBzZWVrYmFyIChmb3IgdG91Y2ggZXZlbnRzIHRoaXMgd29ya3MgYXV0b21hdGljYWxseSksXHJcbiAgICAgICAgLy8gc28gdGhlIHVzZXIgZG9lcyBub3QgbmVlZCB0byB0YWtlIGNhcmUgdGhhdCB0aGUgbW91c2UgYWx3YXlzIHN0YXlzIG9uIHRoZSBzZWVrYmFyLCB3ZSBhdHRhY2ggdGhlIG1vdXNlbW92ZVxyXG4gICAgICAgIC8vIGFuZCBtb3VzZXVwIGhhbmRsZXJzIHRvIHRoZSB3aG9sZSBkb2N1bWVudC4gQSBzZWVrIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSB1c2VyIGxpZnRzIHRoZSBtb3VzZSBrZXkuXHJcbiAgICAgICAgLy8gQSBzZWVrIG1vdXNlIGdlc3R1cmUgaXMgdGh1cyBiYXNpY2FsbHkgYSBjbGljayB3aXRoIGEgbG9uZyB0aW1lIGZyYW1lIGJldHdlZW4gZG93biBhbmQgdXAgZXZlbnRzLlxyXG4gICAgICAgIHNlZWtCYXIub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGlzVG91Y2hFdmVudCA9IF90aGlzLnRvdWNoU3VwcG9ydGVkICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50O1xyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IHNlbGVjdGlvbiBvZiBET00gZWxlbWVudHMgKGFsc28gcHJldmVudHMgbW91c2Vkb3duIGlmIGN1cnJlbnQgZXZlbnQgaXMgdG91Y2hzdGFydClcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGlvbiB0byBWUiBoYW5kbGVyXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFNlZWtpbmcodHJ1ZSk7IC8vIFNldCBzZWVraW5nIGNsYXNzIG9uIERPTSBlbGVtZW50XHJcbiAgICAgICAgICAgIHNlZWtpbmcgPSB0cnVlOyAvLyBTZXQgc2VlayB0cmFja2luZyBmbGFnXHJcbiAgICAgICAgICAgIC8vIEZpcmUgc2Vla2VkIGV2ZW50XHJcbiAgICAgICAgICAgIF90aGlzLm9uU2Vla0V2ZW50KCk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBoYW5kbGVyIHRvIHRyYWNrIHRoZSBzZWVrIG9wZXJhdGlvbiBvdmVyIHRoZSB3aG9sZSBkb2N1bWVudFxyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vbihpc1RvdWNoRXZlbnQgPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnLCBtb3VzZVRvdWNoTW92ZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICBuZXcgZG9tXzEuRE9NKGRvY3VtZW50KS5vbihpc1RvdWNoRXZlbnQgPyAndG91Y2hlbmQnIDogJ21vdXNldXAnLCBtb3VzZVRvdWNoVXBIYW5kbGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEaXNwbGF5IHNlZWsgdGFyZ2V0IGluZGljYXRvciB3aGVuIG1vdXNlIGhvdmVycyBvciBmaW5nZXIgc2xpZGVzIG92ZXIgc2Vla2JhclxyXG4gICAgICAgIHNlZWtCYXIub24oJ3RvdWNobW92ZSBtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmIChzZWVraW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEdXJpbmcgYSBzZWVrICh3aGVuIG1vdXNlIGlzIGRvd24gb3IgdG91Y2ggbW92ZSBhY3RpdmUpLCB3ZSBuZWVkIHRvIHN0b3AgcHJvcGFnYXRpb24gdG8gYXZvaWRcclxuICAgICAgICAgICAgICAgIC8vIHRoZSBWUiB2aWV3cG9ydCByZWFjdGluZyB0byB0aGUgbW92ZXMuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gQmVjYXVzZSB0aGUgc3RvcHBlZCBwcm9wYWdhdGlvbiBpbmhpYml0cyB0aGUgZXZlbnQgb24gdGhlIGRvY3VtZW50LCB3ZSBuZWVkIHRvIGNhbGwgaXQgZnJvbSBoZXJlXHJcbiAgICAgICAgICAgICAgICBtb3VzZVRvdWNoTW92ZUhhbmRsZXIoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gMTAwICogX3RoaXMuZ2V0T2Zmc2V0KGUpO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTZWVrUG9zaXRpb24ocG9zaXRpb24pO1xyXG4gICAgICAgICAgICBfdGhpcy5vblNlZWtQcmV2aWV3RXZlbnQocG9zaXRpb24sIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmhhc0xhYmVsKCkgJiYgX3RoaXMuZ2V0TGFiZWwoKS5pc0hpZGRlbigpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRMYWJlbCgpLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEhpZGUgc2VlayB0YXJnZXQgaW5kaWNhdG9yIHdoZW4gbW91c2Ugb3IgZmluZ2VyIGxlYXZlcyBzZWVrYmFyXHJcbiAgICAgICAgc2Vla0Jhci5vbigndG91Y2hlbmQgbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U2Vla1Bvc2l0aW9uKDApO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaGFzTGFiZWwoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0TGFiZWwoKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWVrQmFyQ29udGFpbmVyLmFwcGVuZChzZWVrQmFyKTtcclxuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xyXG4gICAgICAgICAgICBzZWVrQmFyQ29udGFpbmVyLmFwcGVuZCh0aGlzLmxhYmVsLmdldERvbUVsZW1lbnQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWVrQmFyQ29udGFpbmVyO1xyXG4gICAgfTtcclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnVwZGF0ZU1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyTWFya2Vyc0NvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnRpbWVsaW5lTWFya2VyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IF9hW19pXTtcclxuICAgICAgICAgICAgdGhpcy5zZWVrQmFyTWFya2Vyc0NvbnRhaW5lci5hcHBlbmQobmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5wcmVmaXhDc3MoJ3NlZWtiYXItbWFya2VyJyksXHJcbiAgICAgICAgICAgICAgICAnZGF0YS1tYXJrZXItdGltZSc6IFN0cmluZyhtYXJrZXIudGltZSksXHJcbiAgICAgICAgICAgICAgICAnZGF0YS1tYXJrZXItdGl0bGUnOiBTdHJpbmcobWFya2VyLnRpdGxlKSxcclxuICAgICAgICAgICAgfSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6IG1hcmtlci50aW1lICsgJyUnLFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNlZWtCYXIucHJvdG90eXBlLmdldE1hcmtlckF0UG9zaXRpb24gPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xyXG4gICAgICAgIHZhciBzbmFwcGVkTWFya2VyID0gbnVsbDtcclxuICAgICAgICB2YXIgc25hcHBpbmdSYW5nZSA9IDE7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZWxpbmVNYXJrZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudGltZWxpbmVNYXJrZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hcmtlciA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGlmIChwZXJjZW50YWdlID49IG1hcmtlci50aW1lIC0gc25hcHBpbmdSYW5nZSAmJiBwZXJjZW50YWdlIDw9IG1hcmtlci50aW1lICsgc25hcHBpbmdSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNuYXBwZWRNYXJrZXIgPSBtYXJrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNuYXBwZWRNYXJrZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBob3Jpem9udGFsIG9mZnNldCBvZiBhIG1vdXNlL3RvdWNoIGV2ZW50IHBvaW50IGZyb20gdGhlIGxlZnQgZWRnZSBvZiB0aGUgc2VlayBiYXIuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRQYWdlWCB0aGUgcGFnZVggY29vcmRpbmF0ZSBvZiBhbiBldmVudCB0byBjYWxjdWxhdGUgdGhlIG9mZnNldCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBhIG51bWJlciBpbiB0aGUgcmFuZ2Ugb2YgWzAsIDFdLCB3aGVyZSAwIGlzIHRoZSBsZWZ0IGVkZ2UgYW5kIDEgaXMgdGhlIHJpZ2h0IGVkZ2VcclxuICAgICAqL1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuZ2V0SG9yaXpvbnRhbE9mZnNldCA9IGZ1bmN0aW9uIChldmVudFBhZ2VYKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXRQeCA9IHRoaXMuc2Vla0Jhci5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgIHZhciB3aWR0aFB4ID0gdGhpcy5zZWVrQmFyLndpZHRoKCk7XHJcbiAgICAgICAgdmFyIG9mZnNldFB4ID0gZXZlbnRQYWdlWCAtIGVsZW1lbnRPZmZzZXRQeDtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gMSAvIHdpZHRoUHggKiBvZmZzZXRQeDtcclxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZU9mZnNldChvZmZzZXQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdmVydGljYWwgb2Zmc2V0IG9mIGEgbW91c2UvdG91Y2ggZXZlbnQgcG9pbnQgZnJvbSB0aGUgYm90dG9tIGVkZ2Ugb2YgdGhlIHNlZWsgYmFyLlxyXG4gICAgICogQHBhcmFtIGV2ZW50UGFnZVkgdGhlIHBhZ2VYIGNvb3JkaW5hdGUgb2YgYW4gZXZlbnQgdG8gY2FsY3VsYXRlIHRoZSBvZmZzZXQgZnJvbVxyXG4gICAgICogQHJldHVybnMge251bWJlcn0gYSBudW1iZXIgaW4gdGhlIHJhbmdlIG9mIFswLCAxXSwgd2hlcmUgMCBpcyB0aGUgYm90dG9tIGVkZ2UgYW5kIDEgaXMgdGhlIHRvcCBlZGdlXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLmdldFZlcnRpY2FsT2Zmc2V0ID0gZnVuY3Rpb24gKGV2ZW50UGFnZVkpIHtcclxuICAgICAgICB2YXIgZWxlbWVudE9mZnNldFB4ID0gdGhpcy5zZWVrQmFyLm9mZnNldCgpLnRvcDtcclxuICAgICAgICB2YXIgd2lkdGhQeCA9IHRoaXMuc2Vla0Jhci5oZWlnaHQoKTtcclxuICAgICAgICB2YXIgb2Zmc2V0UHggPSBldmVudFBhZ2VZIC0gZWxlbWVudE9mZnNldFB4O1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSAxIC8gd2lkdGhQeCAqIG9mZnNldFB4O1xyXG4gICAgICAgIHJldHVybiAxIC0gdGhpcy5zYW5pdGl6ZU9mZnNldChvZmZzZXQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbW91c2Ugb3IgdG91Y2ggZXZlbnQgb2Zmc2V0IGZvciB0aGUgY3VycmVudCBjb25maWd1cmF0aW9uIChob3Jpem9udGFsIG9yIHZlcnRpY2FsKS5cclxuICAgICAqIEBwYXJhbSBlIHRoZSBldmVudCB0byBjYWxjdWxhdGUgdGhlIG9mZnNldCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBhIG51bWJlciBpbiB0aGUgcmFuZ2Ugb2YgWzAsIDFdXHJcbiAgICAgKiBAc2VlICNnZXRIb3Jpem9udGFsT2Zmc2V0XHJcbiAgICAgKiBAc2VlICNnZXRWZXJ0aWNhbE9mZnNldFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5nZXRPZmZzZXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoU3VwcG9ydGVkICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmVydGljYWxPZmZzZXQoZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGUudG91Y2hlc1swXS5wYWdlWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRIb3Jpem9udGFsT2Zmc2V0KGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBlLnRvdWNoZXNbMF0ucGFnZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmVydGljYWxPZmZzZXQoZS5wYWdlWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRIb3Jpem9udGFsT2Zmc2V0KGUucGFnZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY29uc29sZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdpbnZhbGlkIGV2ZW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2FuaXRpemVzIHRoZSBtb3VzZSBvZmZzZXQgdG8gdGhlIHJhbmdlIG9mIFswLCAxXS5cclxuICAgICAqXHJcbiAgICAgKiBXaGVuIHRyYWNraW5nIHRoZSBtb3VzZSBvdXRzaWRlIHRoZSBzZWVrIGJhciwgdGhlIG9mZnNldCBjYW4gYmUgb3V0c2lkZSB0aGUgZGVzaXJlZCByYW5nZSBhbmQgdGhpcyBtZXRob2RcclxuICAgICAqIGxpbWl0cyBpdCB0byB0aGUgZGVzaXJlZCByYW5nZS4gRS5nLiBhIG1vdXNlIGV2ZW50IGxlZnQgb2YgdGhlIGxlZnQgZWRnZSBvZiBhIHNlZWsgYmFyIHlpZWxkcyBhbiBvZmZzZXQgYmVsb3dcclxuICAgICAqIHplcm8sIGJ1dCB0byBkaXNwbGF5IHRoZSBzZWVrIHRhcmdldCBvbiB0aGUgc2VlayBiYXIsIHdlIG5lZWQgdG8gbGltaXQgaXQgdG8gemVyby5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gc2FuaXRpemVcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBzYW5pdGl6ZWQgb2Zmc2V0LlxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5zYW5pdGl6ZU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuICAgICAgICAvLyBTaW5jZSB3ZSB0cmFjayBtb3VzZSBtb3ZlcyBvdmVyIHRoZSB3aG9sZSBkb2N1bWVudCwgdGhlIHRhcmdldCBjYW4gYmUgb3V0c2lkZSB0aGUgc2VlayByYW5nZSxcclxuICAgICAgICAvLyBhbmQgd2UgbmVlZCB0byBsaW1pdCBpdCB0byB0aGUgWzAsIDFdIHJhbmdlLlxyXG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9mZnNldCA+IDEpIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9mZnNldDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBwb3NpdGlvbiBpbmRpY2F0b3IuXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudCBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMCBhcyByZXR1cm5lZCBieSB0aGUgcGxheWVyXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnNldFBsYXliYWNrUG9zaXRpb24gPSBmdW5jdGlvbiAocGVyY2VudCkge1xyXG4gICAgICAgIHRoaXMucGxheWJhY2tQb3NpdGlvblBlcmNlbnRhZ2UgPSBwZXJjZW50O1xyXG4gICAgICAgIC8vIFNldCBwb3NpdGlvbiBvZiB0aGUgYmFyXHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLnNlZWtCYXJQbGF5YmFja1Bvc2l0aW9uLCBwZXJjZW50KTtcclxuICAgICAgICAvLyBTZXQgcG9zaXRpb24gb2YgdGhlIG1hcmtlclxyXG4gICAgICAgIHZhciBweCA9ICh0aGlzLmNvbmZpZy52ZXJ0aWNhbCA/IHRoaXMuc2Vla0Jhci5oZWlnaHQoKSA6IHRoaXMuc2Vla0Jhci53aWR0aCgpKSAvIDEwMCAqIHBlcmNlbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHB4ID0gdGhpcy5zZWVrQmFyLmhlaWdodCgpIC0gcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuY29uZmlnLnZlcnRpY2FsID9cclxuICAgICAgICAgICAgLy8gLW1zLXRyYW5zZm9ybSByZXF1aXJlZCBmb3IgSUU5XHJcbiAgICAgICAgICAgIHsgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKCcgKyBweCArICdweCknLCAnLW1zLXRyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKCcgKyBweCArICdweCknIH0gOlxyXG4gICAgICAgICAgICB7ICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlWCgnICsgcHggKyAncHgpJywgJy1tcy10cmFuc2Zvcm0nOiAndHJhbnNsYXRlWCgnICsgcHggKyAncHgpJyB9O1xyXG4gICAgICAgIHRoaXMuc2Vla0JhclBsYXliYWNrUG9zaXRpb25NYXJrZXIuY3NzKHN0eWxlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2hlcyB0aGUgcGxheWJhY2sgcG9zaXRpb24uIENhbiBiZSB1c2VkIGJ5IHN1YmNsYXNzZXMgdG8gcmVmcmVzaCB0aGUgcG9zaXRpb24gd2hlblxyXG4gICAgICogdGhlIHNpemUgb2YgdGhlIGNvbXBvbmVudCBjaGFuZ2VzLlxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNldFBsYXliYWNrUG9zaXRpb24odGhpcy5wbGF5YmFja1Bvc2l0aW9uUGVyY2VudGFnZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBwb3NpdGlvbiB1bnRpbCB3aGljaCBtZWRpYSBpcyBidWZmZXJlZC5cclxuICAgICAqIEBwYXJhbSBwZXJjZW50IGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTAwXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnNldEJ1ZmZlclBvc2l0aW9uID0gZnVuY3Rpb24gKHBlcmNlbnQpIHtcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuc2Vla0JhckJ1ZmZlclBvc2l0aW9uLCBwZXJjZW50KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHBvc2l0aW9uIHdoZXJlIGEgc2VlaywgaWYgZXhlY3V0ZWQsIHdvdWxkIGp1bXAgdG8uXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudCBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEwMFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5zZXRTZWVrUG9zaXRpb24gPSBmdW5jdGlvbiAocGVyY2VudCkge1xyXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5zZWVrQmFyU2Vla1Bvc2l0aW9uLCBwZXJjZW50KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgYWN0dWFsIHBvc2l0aW9uICh3aWR0aCBvciBoZWlnaHQpIG9mIGEgRE9NIGVsZW1lbnQgdGhhdCByZXByZXNlbnQgYSBiYXIgaW4gdGhlIHNlZWsgYmFyLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBwb3NpdGlvbiBmb3JcclxuICAgICAqIEBwYXJhbSBwZXJjZW50IGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMTAwXHJcbiAgICAgKi9cclxuICAgIFNlZWtCYXIucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBlcmNlbnQpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBwZXJjZW50IC8gMTAwO1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuY29uZmlnLnZlcnRpY2FsID9cclxuICAgICAgICAgICAgLy8gLW1zLXRyYW5zZm9ybSByZXF1aXJlZCBmb3IgSUU5XHJcbiAgICAgICAgICAgIHsgJ3RyYW5zZm9ybSc6ICdzY2FsZVkoJyArIHNjYWxlICsgJyknLCAnLW1zLXRyYW5zZm9ybSc6ICdzY2FsZVkoJyArIHNjYWxlICsgJyknIH0gOlxyXG4gICAgICAgICAgICB7ICd0cmFuc2Zvcm0nOiAnc2NhbGVYKCcgKyBzY2FsZSArICcpJywgJy1tcy10cmFuc2Zvcm0nOiAnc2NhbGVYKCcgKyBzY2FsZSArICcpJyB9O1xyXG4gICAgICAgIGVsZW1lbnQuY3NzKHN0eWxlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFB1dHMgdGhlIHNlZWsgYmFyIGludG8gb3Igb3V0IG9mIHNlZWtpbmcgc3RhdGUgYnkgYWRkaW5nL3JlbW92aW5nIGEgY2xhc3MgdG8gdGhlIERPTSBlbGVtZW50LiBUaGlzIGNhbiBiZSB1c2VkXHJcbiAgICAgKiB0byBhZGp1c3QgdGhlIHN0eWxpbmcgd2hpbGUgc2Vla2luZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2Vla2luZyBzaG91bGQgYmUgdHJ1ZSB3aGVuIGVudGVyaW5nIHNlZWsgc3RhdGUsIGZhbHNlIHdoZW4gZXhpdGluZyB0aGUgc2VlayBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5zZXRTZWVraW5nID0gZnVuY3Rpb24gKHNlZWtpbmcpIHtcclxuICAgICAgICBpZiAoc2Vla2luZykge1xyXG4gICAgICAgICAgICB0aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyh0aGlzLnByZWZpeENzcyhTZWVrQmFyLkNMQVNTX1NFRUtJTkcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLnJlbW92ZUNsYXNzKHRoaXMucHJlZml4Q3NzKFNlZWtCYXIuQ0xBU1NfU0VFS0lORykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgc2VlayBiYXIgaXMgY3VycmVudGx5IGluIHRoZSBzZWVrIHN0YXRlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgaW4gc2VlayBzdGF0ZSwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5pc1NlZWtpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmhhc0NsYXNzKHRoaXMucHJlZml4Q3NzKFNlZWtCYXIuQ0xBU1NfU0VFS0lORykpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBzZWVrIGJhciBoYXMgYSB7QGxpbmsgU2Vla0JhckxhYmVsfS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBzZWVrIGJhciBoYXMgYSBsYWJlbCwgZWxzZSBmYWxzZVxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5oYXNMYWJlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbCAhPSBudWxsO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbGFiZWwgb2YgdGhpcyBzZWVrIGJhci5cclxuICAgICAqIEByZXR1cm5zIHtTZWVrQmFyTGFiZWx9IHRoZSBsYWJlbCBpZiB0aGlzIHNlZWsgYmFyIGhhcyBhIGxhYmVsLCBlbHNlIG51bGxcclxuICAgICAqL1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUuZ2V0TGFiZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWw7XHJcbiAgICB9O1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUub25TZWVrRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyRXZlbnRzLm9uU2Vlay5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5vblNlZWtQcmV2aWV3RXZlbnQgPSBmdW5jdGlvbiAocGVyY2VudGFnZSwgc2NydWJiaW5nKSB7XHJcbiAgICAgICAgdmFyIHNuYXBwZWRNYXJrZXIgPSB0aGlzLmdldE1hcmtlckF0UG9zaXRpb24ocGVyY2VudGFnZSk7XHJcbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5nZXREb21FbGVtZW50KCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICdsZWZ0JzogKHNuYXBwZWRNYXJrZXIgPyBzbmFwcGVkTWFya2VyLnRpbWUgOiBwZXJjZW50YWdlKSArICclJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWVrQmFyRXZlbnRzLm9uU2Vla1ByZXZpZXcuZGlzcGF0Y2godGhpcywge1xyXG4gICAgICAgICAgICBzY3J1YmJpbmc6IHNjcnViYmluZyxcclxuICAgICAgICAgICAgcG9zaXRpb246IHBlcmNlbnRhZ2UsXHJcbiAgICAgICAgICAgIG1hcmtlcjogc25hcHBlZE1hcmtlcixcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBTZWVrQmFyLnByb3RvdHlwZS5vblNlZWtlZEV2ZW50ID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICB0aGlzLnNlZWtCYXJFdmVudHMub25TZWVrZWQuZGlzcGF0Y2godGhpcywgcGVyY2VudGFnZSk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlZWtCYXIucHJvdG90eXBlLCBcIm9uU2Vla1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIGEgc2NydWJiaW5nIHNlZWsgb3BlcmF0aW9uIGlzIHN0YXJ0ZWQuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PFNlZWtCYXIsIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlZWtCYXJFdmVudHMub25TZWVrLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2Vla0Jhci5wcm90b3R5cGUsIFwib25TZWVrUHJldmlld1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCBkdXJpbmcgYSBzY3J1YmJpbmcgc2VlayAodG8gaW5kaWNhdGUgdGhhdCB0aGUgc2VlayBwcmV2aWV3LCBpLmUuIHRoZSB2aWRlbyBmcmFtZSxcclxuICAgICAgICAgKiBzaG91bGQgYmUgdXBkYXRlZCksIG9yIGR1cmluZyBhIG5vcm1hbCBzZWVrIHByZXZpZXcgd2hlbiB0aGUgc2VlayBiYXIgaXMgaG92ZXJlZCAoYW5kIHRoZSBzZWVrIHRhcmdldCxcclxuICAgICAgICAgKiBpLmUuIHRoZSBzZWVrIGJhciBsYWJlbCwgc2hvdWxkIGJlIHVwZGF0ZWQpLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudDxTZWVrQmFyLCBTZWVrUHJldmlld0V2ZW50QXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlZWtCYXJFdmVudHMub25TZWVrUHJldmlldy5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlZWtCYXIucHJvdG90eXBlLCBcIm9uU2Vla2VkXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXRzIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gYSBzY3J1YmJpbmcgc2VlayBoYXMgZmluaXNoZWQgb3Igd2hlbiBhIGRpcmVjdCBzZWVrIGlzIGlzc3VlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8U2Vla0JhciwgbnVtYmVyPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Vla0JhckV2ZW50cy5vblNlZWtlZC5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgU2Vla0Jhci5wcm90b3R5cGUub25TaG93RXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vblNob3dFdmVudC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIC8vIFJlZnJlc2ggdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBwb3NpdGlvbiB3aGVuIHRoZSBzZWVrIGJhciBiZWNvbWVzIHZpc2libGUuIFRvIGNvcnJlY3RseSBzZXQgdGhlIHBvc2l0aW9uLFxyXG4gICAgICAgIC8vIHRoZSBET00gZWxlbWVudCBtdXN0IGJlIGZ1bGx5IGluaXRpYWxpemVkIGFuIGhhdmUgaXRzIHNpemUgY2FsY3VsYXRlZCwgYmVjYXVzZSB0aGUgcG9zaXRpb24gaXMgc2V0IGFzIGFuIGFic29sdXRlXHJcbiAgICAgICAgLy8gdmFsdWUgY2FsY3VsYXRlZCBmcm9tIHRoZSBzaXplLiBUaGlzIHJlcXVpcmVkIHNpemUgaXMgbm90IGtub3duIHdoZW4gaXQgaXMgaGlkZGVuLlxyXG4gICAgICAgIC8vIEZvciBzdWNoIGNhc2VzLCB3ZSByZWZyZXNoIHRoZSBwb3NpdGlvbiBoZXJlIGluIG9uU2hvdyBiZWNhdXNlIGhlcmUgaXQgaXMgZ3VhcmFudGVlZCB0aGF0IHRoZSBjb21wb25lbnQga25vd3NcclxuICAgICAgICAvLyBpdHMgc2l6ZSBhbmQgY2FuIHNldCB0aGUgcG9zaXRpb24gY29ycmVjdGx5LlxyXG4gICAgICAgIHRoaXMucmVmcmVzaFBsYXliYWNrUG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU2Vla0JhcjtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuU2Vla0Jhci5TTU9PVEhfUExBWUJBQ0tfUE9TSVRJT05fVVBEQVRFX0RJU0FCTEVEID0gLTE7XHJcbi8qKlxyXG4gKiBUaGUgQ1NTIGNsYXNzIHRoYXQgaXMgYWRkZWQgdG8gdGhlIERPTSBlbGVtZW50IHdoaWxlIHRoZSBzZWVrIGJhciBpcyBpbiAnc2Vla2luZycgc3RhdGUuXHJcbiAqL1xyXG5TZWVrQmFyLkNMQVNTX1NFRUtJTkcgPSAnc2Vla2luZyc7XHJcbmV4cG9ydHMuU2Vla0JhciA9IFNlZWtCYXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3NlZWtiYXIudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuL2J1dHRvblwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4uL2V2ZW50ZGlzcGF0Y2hlclwiKTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIHRoYXQgY2FuIGJlIHRvZ2dsZWQgYmV0d2VlbiAnb24nIGFuZCAnb2ZmJyBzdGF0ZXMuXHJcbiAqL1xyXG52YXIgVG9nZ2xlQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhUb2dnbGVCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBUb2dnbGVCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnRvZ2dsZUJ1dHRvbkV2ZW50cyA9IHtcclxuICAgICAgICAgICAgb25Ub2dnbGU6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25Ub2dnbGVPbjogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICBvblRvZ2dsZU9mZjogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS10b2dnbGVidXR0b24nXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgdGhlIGJ1dHRvbiB0byB0aGUgJ29uJyBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc09mZigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLnJlbW92ZUNsYXNzKHRoaXMucHJlZml4Q3NzKFRvZ2dsZUJ1dHRvbi5DTEFTU19PRkYpKTtcclxuICAgICAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkuYWRkQ2xhc3ModGhpcy5wcmVmaXhDc3MoVG9nZ2xlQnV0dG9uLkNMQVNTX09OKSk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub2dnbGVFdmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG9nZ2xlT25FdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgdGhlIGJ1dHRvbiB0byB0aGUgJ29mZicgc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT24oKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5nZXREb21FbGVtZW50KCkucmVtb3ZlQ2xhc3ModGhpcy5wcmVmaXhDc3MoVG9nZ2xlQnV0dG9uLkNMQVNTX09OKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmFkZENsYXNzKHRoaXMucHJlZml4Q3NzKFRvZ2dsZUJ1dHRvbi5DTEFTU19PRkYpKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvZ2dsZUV2ZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Ub2dnbGVPZmZFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSB0aGUgYnV0dG9uICdvbicgaWYgaXQgaXMgJ29mZicsIG9yICdvZmYnIGlmIGl0IGlzICdvbicuXHJcbiAgICAgKi9cclxuICAgIFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT24oKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9mZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBpbiB0aGUgJ29uJyBzdGF0ZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIGJ1dHRvbiBpcyAnb24nLCBmYWxzZSBpZiAnb2ZmJ1xyXG4gICAgICovXHJcbiAgICBUb2dnbGVCdXR0b24ucHJvdG90eXBlLmlzT24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub25TdGF0ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBpbiB0aGUgJ29mZicgc3RhdGUuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiBidXR0b24gaXMgJ29mZicsIGZhbHNlIGlmICdvbidcclxuICAgICAqL1xyXG4gICAgVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5pc09mZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNPbigpO1xyXG4gICAgfTtcclxuICAgIFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUub25DbGlja0V2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUub25DbGlja0V2ZW50LmNhbGwodGhpcyk7XHJcbiAgICAgICAgLy8gRmlyZSB0aGUgdG9nZ2xlIGV2ZW50IHRvZ2V0aGVyIHdpdGggdGhlIGNsaWNrIGV2ZW50XHJcbiAgICAgICAgLy8gKHRoZXkgYXJlIHRlY2huaWNhbGx5IHRoZSBzYW1lLCBvbmx5IHRoZSBzZW1hbnRpY3MgYXJlIGRpZmZlcmVudClcclxuICAgICAgICB0aGlzLm9uVG9nZ2xlRXZlbnQoKTtcclxuICAgIH07XHJcbiAgICBUb2dnbGVCdXR0b24ucHJvdG90eXBlLm9uVG9nZ2xlRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25FdmVudHMub25Ub2dnbGUuZGlzcGF0Y2godGhpcyk7XHJcbiAgICB9O1xyXG4gICAgVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5vblRvZ2dsZU9uRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25FdmVudHMub25Ub2dnbGVPbi5kaXNwYXRjaCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBUb2dnbGVCdXR0b24ucHJvdG90eXBlLm9uVG9nZ2xlT2ZmRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25FdmVudHMub25Ub2dnbGVPZmYuZGlzcGF0Y2godGhpcyk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUsIFwib25Ub2dnbGVcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgYnV0dG9uIGlzIHRvZ2dsZWQuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PFRvZ2dsZUJ1dHRvbjxDb25maWc+LCBOb0FyZ3M+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVCdXR0b25FdmVudHMub25Ub2dnbGUuZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUb2dnbGVCdXR0b24ucHJvdG90eXBlLCBcIm9uVG9nZ2xlT25cIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgYnV0dG9uIGlzIHRvZ2dsZWQgJ29uJy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8VG9nZ2xlQnV0dG9uPENvbmZpZz4sIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbkV2ZW50cy5vblRvZ2dsZU9uLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVG9nZ2xlQnV0dG9uLnByb3RvdHlwZSwgXCJvblRvZ2dsZU9mZlwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIHRoZSBidXR0b24gaXMgdG9nZ2xlZCAnb2ZmJy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8VG9nZ2xlQnV0dG9uPENvbmZpZz4sIE5vQXJncz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbkV2ZW50cy5vblRvZ2dsZU9mZi5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFRvZ2dsZUJ1dHRvbjtcclxufShidXR0b25fMS5CdXR0b24pKTtcclxuVG9nZ2xlQnV0dG9uLkNMQVNTX09OID0gJ29uJztcclxuVG9nZ2xlQnV0dG9uLkNMQVNTX09GRiA9ICdvZmYnO1xyXG5leHBvcnRzLlRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvdG9nZ2xlYnV0dG9uLnRzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b25cIik7XHJcbi8qKlxyXG4gKiBBIGNsaWNrIG92ZXJsYXkgdGhhdCBvcGVucyBhbiB1cmwgaW4gYSBuZXcgdGFiIGlmIGNsaWNrZWQuXHJcbiAqL1xyXG52YXIgQ2xpY2tPdmVybGF5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDbGlja092ZXJsYXksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDbGlja092ZXJsYXkoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWNsaWNrb3ZlcmxheSdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIENsaWNrT3ZlcmxheS5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNldFVybCh0aGlzLmNvbmZpZy51cmwpO1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5nZXREb21FbGVtZW50KCk7XHJcbiAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmRhdGEoJ3VybCcpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihlbGVtZW50LmRhdGEoJ3VybCcpLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIFVSTCB0aGF0IHNob3VsZCBiZSBmb2xsb3dlZCB3aGVuIHRoZSB3YXRlcm1hcmsgaXMgY2xpY2tlZC5cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSB3YXRlcm1hcmsgVVJMXHJcbiAgICAgKi9cclxuICAgIENsaWNrT3ZlcmxheS5wcm90b3R5cGUuZ2V0VXJsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldERvbUVsZW1lbnQoKS5kYXRhKCd1cmwnKTtcclxuICAgIH07XHJcbiAgICBDbGlja092ZXJsYXkucHJvdG90eXBlLnNldFVybCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICBpZiAodXJsID09PSB1bmRlZmluZWQgfHwgdXJsID09IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudCgpLmRhdGEoJ3VybCcsIHVybCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENsaWNrT3ZlcmxheTtcclxufShidXR0b25fMS5CdXR0b24pKTtcclxuZXhwb3J0cy5DbGlja092ZXJsYXkgPSBDbGlja092ZXJsYXk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2NsaWNrb3ZlcmxheS50c1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbnZhciBzcGFjZXJfMSA9IHJlcXVpcmUoXCIuL3NwYWNlclwiKTtcclxuLyoqXHJcbiAqIEEgY29udGFpbmVyIGZvciBtYWluIHBsYXllciBjb250cm9sIGNvbXBvbmVudHMsIGUuZy4gcGxheSB0b2dnbGUgYnV0dG9uLCBzZWVrIGJhciwgdm9sdW1lIGNvbnRyb2wsIGZ1bGxzY3JlZW4gdG9nZ2xlXHJcbiAqIGJ1dHRvbi5cclxuICovXHJcbnZhciBDb250cm9sQmFyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDb250cm9sQmFyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQ29udHJvbEJhcihjb25maWcsIGF1dG9IaWRlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWNvbnRyb2xiYXInLFxyXG4gICAgICAgICAgICBoaWRkZW46IGF1dG9IaWRlXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBDb250cm9sQmFyLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gQ291bnRzIGhvdyBtYW55IGNvbXBvbmVudHMgYXJlIGhvdmVyZWQgYW5kIGJsb2NrIGhpZGluZyBvZiB0aGUgY29udHJvbCBiYXJcclxuICAgICAgICB2YXIgaG92ZXJTdGFja0NvdW50ID0gMDtcclxuICAgICAgICAvLyBUcmFjayBob3ZlciBzdGF0dXMgb2YgY2hpbGQgY29tcG9uZW50c1xyXG4gICAgICAgIHV0aWxzXzEuVUlVdGlscy50cmF2ZXJzZVRyZWUodGhpcywgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAvLyBEbyBub3QgdHJhY2sgaG92ZXIgc3RhdHVzIG9mIGNoaWxkIGNvbnRhaW5lcnMgb3Igc3BhY2Vycywgb25seSBvZiAncmVhbCcgY29udHJvbHNcclxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIGNvbnRhaW5lcl8xLkNvbnRhaW5lciB8fCBjb21wb25lbnQgaW5zdGFuY2VvZiBzcGFjZXJfMS5TcGFjZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgaG92ZXIgZXZlbnQgYW5kIGtlZXAgYSBjb3VudCBvZiB0aGUgbnVtYmVyIG9mIGhvdmVyZWQgY2hpbGRyZW5cclxuICAgICAgICAgICAgY29tcG9uZW50Lm9uSG92ZXJDaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5ob3ZlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJTdGFja0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBob3ZlclN0YWNrQ291bnQtLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29udHJvbHNTaG93LnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uUHJldmlld0NvbnRyb2xzSGlkZS5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlciwgYXJncykge1xyXG4gICAgICAgICAgICAvLyBDYW5jZWwgdGhlIGhpZGUgZXZlbnQgaWYgaG92ZXJlZCBjaGlsZCBjb21wb25lbnRzIGJsb2NrIGhpZGluZ1xyXG4gICAgICAgICAgICBhcmdzLmNhbmNlbCA9IChob3ZlclN0YWNrQ291bnQgPiAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB1aW1hbmFnZXIub25Db250cm9sc0hpZGUuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ29udHJvbEJhcjtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuZXhwb3J0cy5Db250cm9sQmFyID0gQ29udHJvbEJhcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvY29udHJvbGJhci50c1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcclxudmFyIGxhYmVsXzEgPSByZXF1aXJlKFwiLi9sYWJlbFwiKTtcclxudmFyIHR2bm9pc2VjYW52YXNfMSA9IHJlcXVpcmUoXCIuL3R2bm9pc2VjYW52YXNcIik7XHJcbi8qKlxyXG4gKiBPdmVybGF5cyB0aGUgcGxheWVyIGFuZCBkaXNwbGF5cyBlcnJvciBtZXNzYWdlcy5cclxuICovXHJcbnZhciBFcnJvck1lc3NhZ2VPdmVybGF5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhFcnJvck1lc3NhZ2VPdmVybGF5LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gRXJyb3JNZXNzYWdlT3ZlcmxheShjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuZXJyb3JMYWJlbCA9IG5ldyBsYWJlbF8xLkxhYmVsKHsgY3NzQ2xhc3M6ICd1aS1lcnJvcm1lc3NhZ2UtbGFiZWwnIH0pO1xyXG4gICAgICAgIF90aGlzLnR2Tm9pc2VCYWNrZ3JvdW5kID0gbmV3IHR2bm9pc2VjYW52YXNfMS5Udk5vaXNlQ2FudmFzKCk7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktZXJyb3JtZXNzYWdlLW92ZXJsYXknLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbX3RoaXMudHZOb2lzZUJhY2tncm91bmQsIF90aGlzLmVycm9yTGFiZWxdLFxyXG4gICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEVycm9yTWVzc2FnZU92ZXJsYXkucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fRVJST1IsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGV2ZW50Lm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIC8vIFByb2Nlc3MgbWVzc2FnZSB0cmFuc2xhdGlvbnNcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5tZXNzYWdlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcubWVzc2FnZXMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2xhdGlvbiBmdW5jdGlvbiBmb3IgYWxsIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBjb25maWcubWVzc2FnZXMoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uZmlnLm1lc3NhZ2VzW2V2ZW50LmNvZGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBub3QgYSB0cmFuc2xhdGlvbiBmdW5jdGlvbiwgc28gaXQgbXVzdCBiZSBhIG1hcCBvZiBzdHJpbmdzIG9yIHRyYW5zbGF0aW9uIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21NZXNzYWdlID0gY29uZmlnLm1lc3NhZ2VzW2V2ZW50LmNvZGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3VzdG9tTWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGN1c3RvbU1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbWVzc2FnZSBpcyBhIHRyYW5zbGF0aW9uIGZ1bmN0aW9uLCBzbyB3ZSBjYWxsIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBjdXN0b21NZXNzYWdlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMuZXJyb3JMYWJlbC5zZXRUZXh0KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBfdGhpcy50dk5vaXNlQmFja2dyb3VuZC5zdGFydCgpO1xyXG4gICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU09VUkNFX0xPQURFRCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5pc1Nob3duKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnR2Tm9pc2VCYWNrZ3JvdW5kLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBFcnJvck1lc3NhZ2VPdmVybGF5O1xyXG59KGNvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xyXG5leHBvcnRzLkVycm9yTWVzc2FnZU92ZXJsYXkgPSBFcnJvck1lc3NhZ2VPdmVybGF5O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9lcnJvcm1lc3NhZ2VvdmVybGF5LnRzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHBsYXliYWNrdG9nZ2xlYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9wbGF5YmFja3RvZ2dsZWJ1dHRvblwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIHRoYXQgb3ZlcmxheXMgdGhlIHZpZGVvIGFuZCB0b2dnbGVzIGJldHdlZW4gcGxheWJhY2sgYW5kIHBhdXNlLlxyXG4gKi9cclxudmFyIEh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoSHVnZVBsYXliYWNrVG9nZ2xlQnV0dG9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gSHVnZVBsYXliYWNrVG9nZ2xlQnV0dG9uKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1odWdlcGxheWJhY2t0b2dnbGVidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnUGxheS9QYXVzZSdcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvLyBVcGRhdGUgYnV0dG9uIHN0YXRlIHRocm91Z2ggQVBJIGV2ZW50c1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIsIGZhbHNlKTtcclxuICAgICAgICB2YXIgdG9nZ2xlUGxheWJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNQbGF5aW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZSgndWktb3ZlcmxheScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnBsYXkoJ3VpLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHRvZ2dsZUZ1bGxzY3JlZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNGdWxsc2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5leGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcGxheWVyLmVudGVyRnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgZmlyc3RQbGF5ID0gdHJ1ZTtcclxuICAgICAgICB2YXIgY2xpY2tUaW1lID0gMDtcclxuICAgICAgICB2YXIgZG91YmxlQ2xpY2tUaW1lID0gMDtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIFlvdVR1YmUtc3R5bGUgdG9nZ2xlIGJ1dHRvbiBoYW5kbGluZ1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogVGhlIGdvYWwgaXMgdG8gcHJldmVudCBhIHNob3J0IHBhdXNlIG9yIHBsYXliYWNrIGludGVydmFsIGJldHdlZW4gYSBjbGljaywgdGhhdCB0b2dnbGVzIHBsYXliYWNrLCBhbmQgYVxyXG4gICAgICAgICAqIGRvdWJsZSBjbGljaywgdGhhdCB0b2dnbGVzIGZ1bGxzY3JlZW4uIEluIHRoaXMgbmFpdmUgYXBwcm9hY2gsIHRoZSBmaXJzdCBjbGljayB3b3VsZCBlLmcuIHN0YXJ0IHBsYXliYWNrLFxyXG4gICAgICAgICAqIHRoZSBzZWNvbmQgY2xpY2sgd291bGQgYmUgZGV0ZWN0ZWQgYXMgZG91YmxlIGNsaWNrIGFuZCB0b2dnbGUgdG8gZnVsbHNjcmVlbiwgYW5kIGFzIHNlY29uZCBub3JtYWwgY2xpY2sgc3RvcFxyXG4gICAgICAgICAqIHBsYXliYWNrLCB3aGljaCByZXN1bHRzIGlzIGEgc2hvcnQgcGxheWJhY2sgaW50ZXJ2YWwgd2l0aCBtYXggbGVuZ3RoIG9mIHRoZSBkb3VibGUgY2xpY2sgZGV0ZWN0aW9uXHJcbiAgICAgICAgICogcGVyaW9kICh1c3VhbGx5IDUwMG1zKS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRvIHNvbHZlIHRoaXMgaXNzdWUsIHdlIGRlZmVyIGhhbmRsaW5nIG9mIHRoZSBmaXJzdCBjbGljayBmb3IgMjAwbXMsIHdoaWNoIGlzIGFsbW9zdCB1bm5vdGljZWFibGUgdG8gdGhlIHVzZXIsXHJcbiAgICAgICAgICogYW5kIGp1c3QgdG9nZ2xlIHBsYXliYWNrIGlmIG5vIHNlY29uZCBjbGljayAoZG91YmxlIGNsaWNrKSBoYXMgYmVlbiByZWdpc3RlcmVkIGR1cmluZyB0aGlzIHBlcmlvZC4gSWYgYSBkb3VibGVcclxuICAgICAgICAgKiBjbGljayBpcyByZWdpc3RlcmVkLCB3ZSBqdXN0IHRvZ2dsZSB0aGUgZnVsbHNjcmVlbi4gSW4gdGhlIGZpcnN0IDIwMG1zLCB1bmRlc2lyZWQgcGxheWJhY2sgY2hhbmdlcyB0aHVzIGNhbm5vdFxyXG4gICAgICAgICAqIGhhcHBlbi4gSWYgYSBkb3VibGUgY2xpY2sgaXMgcmVnaXN0ZXJlZCB3aXRoaW4gNTAwbXMsIHdlIHVuZG8gdGhlIHBsYXliYWNrIGNoYW5nZSBhbmQgc3dpdGNoIGZ1bGxzY3JlZW4gbW9kZS5cclxuICAgICAgICAgKiBJbiB0aGUgZW5kLCB0aGlzIG1ldGhvZCBiYXNpY2FsbHkgaW50cm9kdWNlcyBhIDIwMG1zIG9ic2VydmluZyBpbnRlcnZhbCBpbiB3aGljaCBwbGF5YmFjayBjaGFuZ2VzIGFyZSBwcmV2ZW50ZWRcclxuICAgICAgICAgKiBpZiBhIGRvdWJsZSBjbGljayBoYXBwZW5zLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub25DbGljay5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBEaXJlY3RseSBzdGFydCBwbGF5YmFjayBvbiBmaXJzdCBjbGljayBvZiB0aGUgYnV0dG9uLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGEgcmVxdWlyZWQgd29ya2Fyb3VuZCBmb3IgbW9iaWxlIGJyb3dzZXJzIHdoZXJlIHZpZGVvIHBsYXliYWNrIG5lZWRzIHRvIGJlIHRyaWdnZXJlZCBkaXJlY3RseVxyXG4gICAgICAgICAgICAvLyBieSB0aGUgdXNlci4gQSBkZWZlcnJlZCBwbGF5YmFjayBzdGFydCB0aHJvdWdoIHRoZSB0aW1lb3V0IGJlbG93IGlzIG5vdCBjb25zaWRlcmVkIGFzIHVzZXIgYWN0aW9uIGFuZFxyXG4gICAgICAgICAgICAvLyB0aGVyZWZvcmUgaWdub3JlZCBieSBtb2JpbGUgYnJvd3NlcnMuXHJcbiAgICAgICAgICAgIGlmIChmaXJzdFBsYXkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBzdGFydCBwbGF5YmFjay4gVGhlbiB3ZSB3YWl0IGZvciBPTl9QTEFZIGFuZCBvbmx5IHdoZW4gaXQgYXJyaXZlcywgd2UgZGlzYWJsZSB0aGUgZmlyc3RQbGF5IGZsYWcuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBkaXNhYmxlIHRoZSBmbGFnIGhlcmUsIG9uQ2xpY2sgd2FzIHRyaWdnZXJlZCBwcm9ncmFtbWF0aWNhbGx5IGluc3RlYWQgb2YgYnkgYSB1c2VyIGludGVyYWN0aW9uLCBhbmRcclxuICAgICAgICAgICAgICAgIC8vIHBsYXliYWNrIGlzIGJsb2NrZWQgKGUuZy4gb24gbW9iaWxlIGRldmljZXMgZHVlIHRvIHRoZSBwcm9ncmFtbWF0aWMgcGxheSgpIGNhbGwpLCB3ZSBsb29zZSB0aGUgY2hhbmNlIHRvXHJcbiAgICAgICAgICAgICAgICAvLyBldmVyIHN0YXJ0IHBsYXliYWNrIHRocm91Z2ggYSB1c2VyIGludGVyYWN0aW9uIGFnYWluIHdpdGggdGhpcyBidXR0b24uXHJcbiAgICAgICAgICAgICAgICB0b2dnbGVQbGF5YmFjaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICBpZiAobm93IC0gY2xpY2tUaW1lIDwgMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgZG91YmxlIGNsaWNrIGluc2lkZSB0aGUgMjAwbXMgaW50ZXJ2YWwsIGp1c3QgdG9nZ2xlIGZ1bGxzY3JlZW4gbW9kZVxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlRnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgZG91YmxlQ2xpY2tUaW1lID0gbm93O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5vdyAtIGNsaWNrVGltZSA8IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIGRvdWJsZSBjbGljayBpbnNpZGUgdGhlIDUwMG1zIGludGVydmFsLCB1bmRvIHBsYXliYWNrIHRvZ2dsZSBhbmQgdG9nZ2xlIGZ1bGxzY3JlZW4gbW9kZVxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlRnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlUGxheWJhY2soKTtcclxuICAgICAgICAgICAgICAgIGRvdWJsZUNsaWNrVGltZSA9IG5vdztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbGlja1RpbWUgPSBub3c7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSBkb3VibGVDbGlja1RpbWUgPiAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBObyBkb3VibGUgY2xpY2sgZGV0ZWN0ZWQsIHNvIHdlIHRvZ2dsZSBwbGF5YmFjayBhbmQgd2FpdCB3aGF0IGhhcHBlbnMgbmV4dFxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVBsYXliYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUExBWSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBQbGF5YmFjayBoYXMgcmVhbGx5IHN0YXJ0ZWQsIHdlIGNhbiBkaXNhYmxlIHRoZSBmbGFnIHRvIHN3aXRjaCB0byBub3JtYWwgdG9nZ2xlIGJ1dHRvbiBoYW5kbGluZ1xyXG4gICAgICAgICAgICBmaXJzdFBsYXkgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBIaWRlIGJ1dHRvbiB3aGlsZSBpbml0aWFsaXppbmcgYSBDYXN0IHNlc3Npb25cclxuICAgICAgICB2YXIgY2FzdEluaXRpYWxpemF0aW9uSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gcGxheWVyLkVWRU5ULk9OX0NBU1RfU1RBUlQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEhpZGUgYnV0dG9uIHdoZW4gc2Vzc2lvbiBpcyBiZWluZyBpbml0aWFsaXplZFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBidXR0b24gd2hlbiBzZXNzaW9uIGlzIGVzdGFibGlzaGVkIG9yIGluaXRpYWxpemF0aW9uIHdhcyBhYm9ydGVkXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfU1RBUlQsIGNhc3RJbml0aWFsaXphdGlvbkhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfU1RBUlRFRCwgY2FzdEluaXRpYWxpemF0aW9uSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9TVE9QUEVELCBjYXN0SW5pdGlhbGl6YXRpb25IYW5kbGVyKTtcclxuICAgIH07XHJcbiAgICBIdWdlUGxheWJhY2tUb2dnbGVCdXR0b24ucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYnV0dG9uRWxlbWVudCA9IF9zdXBlci5wcm90b3R5cGUudG9Eb21FbGVtZW50LmNhbGwodGhpcyk7XHJcbiAgICAgICAgLy8gQWRkIGNoaWxkIHRoYXQgY29udGFpbnMgdGhlIHBsYXkgYnV0dG9uIGltYWdlXHJcbiAgICAgICAgLy8gU2V0dGluZyB0aGUgaW1hZ2UgZGlyZWN0bHkgb24gdGhlIGJ1dHRvbiBkb2VzIG5vdCB3b3JrIHRvZ2V0aGVyIHdpdGggc2NhbGluZyBhbmltYXRpb25zLCBiZWNhdXNlIHRoZSBidXR0b25cclxuICAgICAgICAvLyBjYW4gY292ZXIgdGhlIHdob2xlIHZpZGVvIHBsYXllciBhcmUgYW5kIHNjYWxpbmcgd291bGQgZXh0ZW5kIGl0IGJleW9uZC4gQnkgYWRkaW5nIGFuIGlubmVyIGVsZW1lbnQsIGNvbmZpbmVkXHJcbiAgICAgICAgLy8gdG8gdGhlIHNpemUgaWYgdGhlIGltYWdlLCBpdCBjYW4gc2NhbGUgaW5zaWRlIHRoZSBwbGF5ZXIgd2l0aG91dCBvdmVyc2hvb3RpbmcuXHJcbiAgICAgICAgYnV0dG9uRWxlbWVudC5hcHBlbmQobmV3IGRvbV8xLkRPTSgnZGl2Jywge1xyXG4gICAgICAgICAgICAnY2xhc3MnOiB0aGlzLnByZWZpeENzcygnaW1hZ2UnKVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gYnV0dG9uRWxlbWVudDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSHVnZVBsYXliYWNrVG9nZ2xlQnV0dG9uO1xyXG59KHBsYXliYWNrdG9nZ2xlYnV0dG9uXzEuUGxheWJhY2tUb2dnbGVCdXR0b24pKTtcclxuZXhwb3J0cy5IdWdlUGxheWJhY2tUb2dnbGVCdXR0b24gPSBIdWdlUGxheWJhY2tUb2dnbGVCdXR0b247XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2h1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvbi50c1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBsYWJlbF8xID0gcmVxdWlyZShcIi4vbGFiZWxcIik7XHJcbi8qKlxyXG4gKiBFbnVtZXJhdGVzIHRoZSB0eXBlcyBvZiBjb250ZW50IHRoYXQgdGhlIHtAbGluayBNZXRhZGF0YUxhYmVsfSBjYW4gZGlzcGxheS5cclxuICovXHJcbnZhciBNZXRhZGF0YUxhYmVsQ29udGVudDtcclxuKGZ1bmN0aW9uIChNZXRhZGF0YUxhYmVsQ29udGVudCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaXRsZSBvZiB0aGUgZGF0YSBzb3VyY2UuXHJcbiAgICAgKi9cclxuICAgIE1ldGFkYXRhTGFiZWxDb250ZW50W01ldGFkYXRhTGFiZWxDb250ZW50W1wiVGl0bGVcIl0gPSAwXSA9IFwiVGl0bGVcIjtcclxuICAgIC8qKlxyXG4gICAgICogRGVzY3JpcHRpb24gZm8gdGhlIGRhdGEgc291cmNlLlxyXG4gICAgICovXHJcbiAgICBNZXRhZGF0YUxhYmVsQ29udGVudFtNZXRhZGF0YUxhYmVsQ29udGVudFtcIkRlc2NyaXB0aW9uXCJdID0gMV0gPSBcIkRlc2NyaXB0aW9uXCI7XHJcbn0pKE1ldGFkYXRhTGFiZWxDb250ZW50ID0gZXhwb3J0cy5NZXRhZGF0YUxhYmVsQ29udGVudCB8fCAoZXhwb3J0cy5NZXRhZGF0YUxhYmVsQ29udGVudCA9IHt9KSk7XHJcbi8qKlxyXG4gKiBBIGxhYmVsIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgdG8gZGlzcGxheSBjZXJ0YWluIG1ldGFkYXRhLlxyXG4gKi9cclxudmFyIE1ldGFkYXRhTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKE1ldGFkYXRhTGFiZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBNZXRhZGF0YUxhYmVsKGNvbmZpZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3NlczogWydsYWJlbC1tZXRhZGF0YScsICdsYWJlbC1tZXRhZGF0YS0nICsgTWV0YWRhdGFMYWJlbENvbnRlbnRbY29uZmlnLmNvbnRlbnRdLnRvTG93ZXJDYXNlKCldXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBNZXRhZGF0YUxhYmVsLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIHZhciB1aWNvbmZpZyA9IHVpbWFuYWdlci5nZXRDb25maWcoKTtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjb25maWcuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXRhZGF0YUxhYmVsQ29udGVudC5UaXRsZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodWljb25maWcgJiYgdWljb25maWcubWV0YWRhdGEgJiYgdWljb25maWcubWV0YWRhdGEudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0VGV4dCh1aWNvbmZpZy5tZXRhZGF0YS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UgJiYgcGxheWVyLmdldENvbmZpZygpLnNvdXJjZS50aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRUZXh0KHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTWV0YWRhdGFMYWJlbENvbnRlbnQuRGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVpY29uZmlnICYmIHVpY29uZmlnLm1ldGFkYXRhICYmIHVpY29uZmlnLm1ldGFkYXRhLmRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFRleHQodWljb25maWcubWV0YWRhdGEuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlICYmIHBsYXllci5nZXRDb25maWcoKS5zb3VyY2UuZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0VGV4dChwbGF5ZXIuZ2V0Q29uZmlnKCkuc291cmNlLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB1bmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFRleHQobnVsbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBJbml0IGxhYmVsXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgIC8vIFJlaW5pdCBsYWJlbCB3aGVuIGEgbmV3IHNvdXJjZSBpcyBsb2FkZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfTE9BREVELCBpbml0KTtcclxuICAgICAgICAvLyBDbGVhciBsYWJlbHMgd2hlbiBzb3VyY2UgaXMgdW5sb2FkZWRcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfVU5MT0FERUQsIHVubG9hZCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1ldGFkYXRhTGFiZWw7XHJcbn0obGFiZWxfMS5MYWJlbCkpO1xyXG5leHBvcnRzLk1ldGFkYXRhTGFiZWwgPSBNZXRhZGF0YUxhYmVsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9tZXRhZGF0YWxhYmVsLnRzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGxhYmVsXzEgPSByZXF1aXJlKFwiLi9sYWJlbFwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbnZhciBQbGF5YmFja1RpbWVMYWJlbE1vZGU7XHJcbihmdW5jdGlvbiAoUGxheWJhY2tUaW1lTGFiZWxNb2RlKSB7XHJcbiAgICBQbGF5YmFja1RpbWVMYWJlbE1vZGVbUGxheWJhY2tUaW1lTGFiZWxNb2RlW1wiQ3VycmVudFRpbWVcIl0gPSAwXSA9IFwiQ3VycmVudFRpbWVcIjtcclxuICAgIFBsYXliYWNrVGltZUxhYmVsTW9kZVtQbGF5YmFja1RpbWVMYWJlbE1vZGVbXCJUb3RhbFRpbWVcIl0gPSAxXSA9IFwiVG90YWxUaW1lXCI7XHJcbiAgICBQbGF5YmFja1RpbWVMYWJlbE1vZGVbUGxheWJhY2tUaW1lTGFiZWxNb2RlW1wiQ3VycmVudEFuZFRvdGFsVGltZVwiXSA9IDJdID0gXCJDdXJyZW50QW5kVG90YWxUaW1lXCI7XHJcbn0pKFBsYXliYWNrVGltZUxhYmVsTW9kZSA9IGV4cG9ydHMuUGxheWJhY2tUaW1lTGFiZWxNb2RlIHx8IChleHBvcnRzLlBsYXliYWNrVGltZUxhYmVsTW9kZSA9IHt9KSk7XHJcbi8qKlxyXG4gKiBBIGxhYmVsIHRoYXQgZGlzcGxheSB0aGUgY3VycmVudCBwbGF5YmFjayB0aW1lIGFuZCB0aGUgdG90YWwgdGltZSB0aHJvdWdoIHtAbGluayBQbGF5YmFja1RpbWVMYWJlbCNzZXRUaW1lIHNldFRpbWV9XHJcbiAqIG9yIGFueSBzdHJpbmcgdGhyb3VnaCB7QGxpbmsgUGxheWJhY2tUaW1lTGFiZWwjc2V0VGV4dCBzZXRUZXh0fS5cclxuICovXHJcbnZhciBQbGF5YmFja1RpbWVMYWJlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUGxheWJhY2tUaW1lTGFiZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5YmFja1RpbWVMYWJlbChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktcGxheWJhY2t0aW1lbGFiZWwnLFxyXG4gICAgICAgICAgICB0aW1lTGFiZWxNb2RlOiBQbGF5YmFja1RpbWVMYWJlbE1vZGUuQ3VycmVudEFuZFRvdGFsVGltZSxcclxuICAgICAgICAgICAgaGlkZUluTGl2ZVBsYXliYWNrOiBmYWxzZSxcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFBsYXliYWNrVGltZUxhYmVsLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xyXG4gICAgICAgIHZhciBsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGxpdmVDc3NDbGFzcyA9IHRoaXMucHJlZml4Q3NzKCd1aS1wbGF5YmFja3RpbWVsYWJlbC1saXZlJyk7XHJcbiAgICAgICAgdmFyIGxpdmVFZGdlQ3NzQ2xhc3MgPSB0aGlzLnByZWZpeENzcygndWktcGxheWJhY2t0aW1lbGFiZWwtbGl2ZS1lZGdlJyk7XHJcbiAgICAgICAgdmFyIG1pbldpZHRoID0gMDtcclxuICAgICAgICB2YXIgbGl2ZUNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcGxheWVyLnRpbWVTaGlmdCgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB1cGRhdGVMaXZlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFBsYXllciBpcyBwbGF5aW5nIGEgbGl2ZSBzdHJlYW0gd2hlbiB0aGUgZHVyYXRpb24gaXMgaW5maW5pdGVcclxuICAgICAgICAgICAgbGl2ZSA9IHBsYXllci5pc0xpdmUoKTtcclxuICAgICAgICAgICAgLy8gQXR0YWNoL2RldGFjaCBsaXZlIG1hcmtlciBjbGFzc1xyXG4gICAgICAgICAgICBpZiAobGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLmFkZENsYXNzKGxpdmVDc3NDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRUZXh0KCdMaXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmhpZGVJbkxpdmVQbGF5YmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLm9uQ2xpY2suc3Vic2NyaWJlKGxpdmVDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlTGl2ZVRpbWVzaGlmdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXREb21FbGVtZW50KCkucmVtb3ZlQ2xhc3MobGl2ZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyhsaXZlRWRnZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uQ2xpY2sudW5zdWJzY3JpYmUobGl2ZUNsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB1cGRhdGVMaXZlVGltZXNoaWZ0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0VGltZVNoaWZ0KCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5hZGRDbGFzcyhsaXZlRWRnZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERvbUVsZW1lbnQoKS5yZW1vdmVDbGFzcyhsaXZlRWRnZUNzc0NsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGxpdmVTdHJlYW1EZXRlY3RvciA9IG5ldyB1dGlsc18xLlBsYXllclV0aWxzLkxpdmVTdHJlYW1EZXRlY3RvcihwbGF5ZXIpO1xyXG4gICAgICAgIGxpdmVTdHJlYW1EZXRlY3Rvci5vbkxpdmVDaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGxpdmUgPSBhcmdzLmxpdmU7XHJcbiAgICAgICAgICAgIHVwZGF0ZUxpdmVTdGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxpdmVTdHJlYW1EZXRlY3Rvci5kZXRlY3QoKTsgLy8gSW5pdGlhbCBkZXRlY3Rpb25cclxuICAgICAgICB2YXIgcGxheWJhY2tUaW1lSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFsaXZlICYmIHBsYXllci5nZXREdXJhdGlvbigpICE9PSBJbmZpbml0eSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGltZShwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSwgcGxheWVyLmdldER1cmF0aW9uKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRvIGF2b2lkICdqdW1waW5nJyBpbiB0aGUgVUkgYnkgdmFyeWluZyBsYWJlbCBzaXplcyBkdWUgdG8gbm9uLW1vbm9zcGFjZWQgZm9udHMsXHJcbiAgICAgICAgICAgIC8vIHdlIGdyYWR1YWxseSBpbmNyZWFzZSB0aGUgbWluLXdpZHRoIHdpdGggdGhlIGNvbnRlbnQgdG8gcmVhY2ggYSBzdGFibGUgc2l6ZS5cclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gX3RoaXMuZ2V0RG9tRWxlbWVudCgpLndpZHRoKCk7XHJcbiAgICAgICAgICAgIGlmICh3aWR0aCA+IG1pbldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ21pbi13aWR0aCc6IG1pbldpZHRoICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1RJTUVfQ0hBTkdFRCwgcGxheWJhY2tUaW1lSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU0VFS0VELCBwbGF5YmFja1RpbWVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9DQVNUX1RJTUVfVVBEQVRFRCwgcGxheWJhY2tUaW1lSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVElNRV9TSElGVCwgdXBkYXRlTGl2ZVRpbWVzaGlmdFN0YXRlKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9USU1FX1NISUZURUQsIHVwZGF0ZUxpdmVUaW1lc2hpZnRTdGF0ZSk7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IG1pbi13aWR0aCB3aGVuIGEgbmV3IHNvdXJjZSBpcyByZWFkeSAoZXNwZWNpYWxseSBmb3Igc3dpdGNoaW5nIFZPRC9MaXZlIG1vZGVzIHdoZXJlIHRoZSBsYWJlbCBjb250ZW50XHJcbiAgICAgICAgICAgIC8vIGNoYW5nZXMpXHJcbiAgICAgICAgICAgIG1pbldpZHRoID0gMDtcclxuICAgICAgICAgICAgX3RoaXMuZ2V0RG9tRWxlbWVudCgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnbWluLXdpZHRoJzogbnVsbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gU2V0IHRpbWUgZm9ybWF0IGRlcGVuZGluZyBvbiBzb3VyY2UgZHVyYXRpb25cclxuICAgICAgICAgICAgX3RoaXMudGltZUZvcm1hdCA9IE1hdGguYWJzKHBsYXllci5pc0xpdmUoKSA/IHBsYXllci5nZXRNYXhUaW1lU2hpZnQoKSA6IHBsYXllci5nZXREdXJhdGlvbigpKSA+PSAzNjAwID9cclxuICAgICAgICAgICAgICAgIHV0aWxzXzEuU3RyaW5nVXRpbHMuRk9STUFUX0hITU1TUyA6IHV0aWxzXzEuU3RyaW5nVXRpbHMuRk9STUFUX01NU1M7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lIGFmdGVyIHRoZSBmb3JtYXQgaGFzIGJlZW4gc2V0XHJcbiAgICAgICAgICAgIHBsYXliYWNrVGltZUhhbmRsZXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBpbml0KTtcclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHBsYXliYWNrIHRpbWUgYW5kIHRvdGFsIGR1cmF0aW9uLlxyXG4gICAgICogQHBhcmFtIHBsYXliYWNrU2Vjb25kcyB0aGUgY3VycmVudCBwbGF5YmFjayB0aW1lIGluIHNlY29uZHNcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvblNlY29uZHMgdGhlIHRvdGFsIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICAgICAqL1xyXG4gICAgUGxheWJhY2tUaW1lTGFiZWwucHJvdG90eXBlLnNldFRpbWUgPSBmdW5jdGlvbiAocGxheWJhY2tTZWNvbmRzLCBkdXJhdGlvblNlY29uZHMpIHtcclxuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSB1dGlsc18xLlN0cmluZ1V0aWxzLnNlY29uZHNUb1RpbWUocGxheWJhY2tTZWNvbmRzLCB0aGlzLnRpbWVGb3JtYXQpO1xyXG4gICAgICAgIHZhciB0b3RhbFRpbWUgPSB1dGlsc18xLlN0cmluZ1V0aWxzLnNlY29uZHNUb1RpbWUoZHVyYXRpb25TZWNvbmRzLCB0aGlzLnRpbWVGb3JtYXQpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jb25maWcudGltZUxhYmVsTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBsYXliYWNrVGltZUxhYmVsTW9kZS5DdXJyZW50VGltZTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGV4dChcIlwiICsgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUGxheWJhY2tUaW1lTGFiZWxNb2RlLlRvdGFsVGltZTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGV4dChcIlwiICsgdG90YWxUaW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBsYXliYWNrVGltZUxhYmVsTW9kZS5DdXJyZW50QW5kVG90YWxUaW1lOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUZXh0KGN1cnJlbnRUaW1lICsgXCIgLyBcIiArIHRvdGFsVGltZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBsYXliYWNrVGltZUxhYmVsO1xyXG59KGxhYmVsXzEuTGFiZWwpKTtcclxuZXhwb3J0cy5QbGF5YmFja1RpbWVMYWJlbCA9IFBsYXliYWNrVGltZUxhYmVsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9wbGF5YmFja3RpbWVsYWJlbC50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcclxudmFyIGh1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vaHVnZXBsYXliYWNrdG9nZ2xlYnV0dG9uXCIpO1xyXG4vKipcclxuICogT3ZlcmxheXMgdGhlIHBsYXllciBhbmQgZGlzcGxheXMgZXJyb3IgbWVzc2FnZXMuXHJcbiAqL1xyXG52YXIgUGxheWJhY2tUb2dnbGVPdmVybGF5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhQbGF5YmFja1RvZ2dsZU92ZXJsYXksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQbGF5YmFja1RvZ2dsZU92ZXJsYXkoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnBsYXliYWNrVG9nZ2xlQnV0dG9uID0gbmV3IGh1Z2VwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xLkh1Z2VQbGF5YmFja1RvZ2dsZUJ1dHRvbigpO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXBsYXliYWNrdG9nZ2xlLW92ZXJsYXknLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBbX3RoaXMucGxheWJhY2tUb2dnbGVCdXR0b25dXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUGxheWJhY2tUb2dnbGVPdmVybGF5O1xyXG59KGNvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xyXG5leHBvcnRzLlBsYXliYWNrVG9nZ2xlT3ZlcmxheSA9IFBsYXliYWNrVG9nZ2xlT3ZlcmxheTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvcGxheWJhY2t0b2dnbGVvdmVybGF5LnRzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xyXG52YXIgbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2xhYmVsXCIpO1xyXG52YXIgY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xyXG4vKipcclxuICogQSBsYWJlbCBmb3IgYSB7QGxpbmsgU2Vla0Jhcn0gdGhhdCBjYW4gZGlzcGxheSB0aGUgc2VlayB0YXJnZXQgdGltZSwgYSB0aHVtYm5haWwsIGFuZCB0aXRsZSAoZS5nLiBjaGFwdGVyIHRpdGxlKS5cclxuICovXHJcbnZhciBTZWVrQmFyTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFNlZWtCYXJMYWJlbCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFNlZWtCYXJMYWJlbChjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMudGltZUxhYmVsID0gbmV3IGxhYmVsXzEuTGFiZWwoeyBjc3NDbGFzc2VzOiBbJ3NlZWtiYXItbGFiZWwtdGltZSddIH0pO1xyXG4gICAgICAgIF90aGlzLnRpdGxlTGFiZWwgPSBuZXcgbGFiZWxfMS5MYWJlbCh7IGNzc0NsYXNzZXM6IFsnc2Vla2Jhci1sYWJlbC10aXRsZSddIH0pO1xyXG4gICAgICAgIF90aGlzLnRodW1ibmFpbCA9IG5ldyBjb21wb25lbnRfMS5Db21wb25lbnQoeyBjc3NDbGFzc2VzOiBbJ3NlZWtiYXItdGh1bWJuYWlsJ10gfSk7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktc2Vla2Jhci1sYWJlbCcsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IFtuZXcgY29udGFpbmVyXzEuQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudGh1bWJuYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgY29udGFpbmVyXzEuQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IFtfdGhpcy50aXRsZUxhYmVsLCBfdGhpcy50aW1lTGFiZWxdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICdzZWVrYmFyLWxhYmVsLW1ldGFkYXRhJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAnc2Vla2Jhci1sYWJlbC1pbm5lcicsXHJcbiAgICAgICAgICAgICAgICB9KV0sXHJcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgU2Vla0JhckxhYmVsLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHVpbWFuYWdlci5vblNlZWtQcmV2aWV3LnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuaXNMaXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gcGxheWVyLmdldE1heFRpbWVTaGlmdCgpIC0gcGxheWVyLmdldE1heFRpbWVTaGlmdCgpICogKGFyZ3MucG9zaXRpb24gLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGltZSh0aW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50YWdlID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLm1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSBhcmdzLm1hcmtlci50aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFRpdGxlVGV4dChhcmdzLm1hcmtlci50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50YWdlID0gYXJncy5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRUaXRsZVRleHQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IHBsYXllci5nZXREdXJhdGlvbigpICogKHBlcmNlbnRhZ2UgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGltZSh0aW1lKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFRodW1ibmFpbChwbGF5ZXIuZ2V0VGh1bWIodGltZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB0aW1lIGZvcm1hdCBkZXBlbmRpbmcgb24gc291cmNlIGR1cmF0aW9uXHJcbiAgICAgICAgICAgIF90aGlzLnRpbWVGb3JtYXQgPSBNYXRoLmFicyhwbGF5ZXIuaXNMaXZlKCkgPyBwbGF5ZXIuZ2V0TWF4VGltZVNoaWZ0KCkgOiBwbGF5ZXIuZ2V0RHVyYXRpb24oKSkgPj0gMzYwMCA/XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLlN0cmluZ1V0aWxzLkZPUk1BVF9ISE1NU1MgOiB1dGlsc18xLlN0cmluZ1V0aWxzLkZPUk1BVF9NTVNTO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUkVBRFksIGluaXQpO1xyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYXJiaXRyYXJ5IHRleHQgb24gdGhlIGxhYmVsLlxyXG4gICAgICogQHBhcmFtIHRleHQgdGhlIHRleHQgdG8gc2hvdyBvbiB0aGUgbGFiZWxcclxuICAgICAqL1xyXG4gICAgU2Vla0JhckxhYmVsLnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICB0aGlzLnRpbWVMYWJlbC5zZXRUZXh0KHRleHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBhIHRpbWUgdG8gYmUgZGlzcGxheWVkIG9uIHRoZSBsYWJlbC5cclxuICAgICAqIEBwYXJhbSBzZWNvbmRzIHRoZSB0aW1lIGluIHNlY29uZHMgdG8gZGlzcGxheSBvbiB0aGUgbGFiZWxcclxuICAgICAqL1xyXG4gICAgU2Vla0JhckxhYmVsLnByb3RvdHlwZS5zZXRUaW1lID0gZnVuY3Rpb24gKHNlY29uZHMpIHtcclxuICAgICAgICB0aGlzLnNldFRleHQodXRpbHNfMS5TdHJpbmdVdGlscy5zZWNvbmRzVG9UaW1lKHNlY29uZHMsIHRoaXMudGltZUZvcm1hdCkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdGV4dCBvbiB0aGUgdGl0bGUgbGFiZWwuXHJcbiAgICAgKiBAcGFyYW0gdGV4dCB0aGUgdGV4dCB0byBzaG93IG9uIHRoZSBsYWJlbFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyTGFiZWwucHJvdG90eXBlLnNldFRpdGxlVGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy50aXRsZUxhYmVsLnNldFRleHQodGV4dCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIG9yIHJlbW92ZXMgYSB0aHVtYm5haWwgb24gdGhlIGxhYmVsLlxyXG4gICAgICogQHBhcmFtIHRodW1ibmFpbCB0aGUgdGh1bWJuYWlsIHRvIGRpc3BsYXkgb24gdGhlIGxhYmVsIG9yIG51bGwgdG8gcmVtb3ZlIGEgZGlzcGxheWVkIHRodW1ibmFpbFxyXG4gICAgICovXHJcbiAgICBTZWVrQmFyTGFiZWwucHJvdG90eXBlLnNldFRodW1ibmFpbCA9IGZ1bmN0aW9uICh0aHVtYm5haWwpIHtcclxuICAgICAgICBpZiAodGh1bWJuYWlsID09PSB2b2lkIDApIHsgdGh1bWJuYWlsID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciB0aHVtYm5haWxFbGVtZW50ID0gdGhpcy50aHVtYm5haWwuZ2V0RG9tRWxlbWVudCgpO1xyXG4gICAgICAgIGlmICh0aHVtYm5haWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxFbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IG51bGxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHVtYm5haWxFbGVtZW50LmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdpbmhlcml0JyxcclxuICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogXCJ1cmwoXCIgKyB0aHVtYm5haWwudXJsICsgXCIpXCIsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiB0aHVtYm5haWwudyArICdweCcsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogdGh1bWJuYWlsLmggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nOiBcIi1cIiArIHRodW1ibmFpbC54ICsgXCJweCAtXCIgKyB0aHVtYm5haWwueSArIFwicHhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNlZWtCYXJMYWJlbDtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuZXhwb3J0cy5TZWVrQmFyTGFiZWwgPSBTZWVrQmFyTGFiZWw7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3NlZWtiYXJsYWJlbC50c1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBsaXN0c2VsZWN0b3JfMSA9IHJlcXVpcmUoXCIuL2xpc3RzZWxlY3RvclwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxuLyoqXHJcbiAqIEEgc2ltcGxlIHNlbGVjdCBib3ggcHJvdmlkaW5nIHRoZSBwb3NzaWJpbGl0eSB0byBzZWxlY3QgYSBzaW5nbGUgaXRlbSBvdXQgb2YgYSBsaXN0IG9mIGF2YWlsYWJsZSBpdGVtcy5cclxuICpcclxuICogRE9NIGV4YW1wbGU6XHJcbiAqIDxjb2RlPlxyXG4gKiAgICAgPHNlbGVjdCBjbGFzcz0ndWktc2VsZWN0Ym94Jz5cclxuICogICAgICAgICA8b3B0aW9uIHZhbHVlPSdrZXknPmxhYmVsPC9vcHRpb24+XHJcbiAqICAgICAgICAgLi4uXHJcbiAqICAgICA8L3NlbGVjdD5cclxuICogPC9jb2RlPlxyXG4gKi9cclxudmFyIFNlbGVjdEJveCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU2VsZWN0Qm94LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gU2VsZWN0Qm94KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1zZWxlY3Rib3gnXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTZWxlY3RCb3gucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzZWxlY3RFbGVtZW50ID0gbmV3IGRvbV8xLkRPTSgnc2VsZWN0Jywge1xyXG4gICAgICAgICAgICAnaWQnOiB0aGlzLmNvbmZpZy5pZCxcclxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5nZXRDc3NDbGFzc2VzKClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtZW50O1xyXG4gICAgICAgIHRoaXMudXBkYXRlRG9tSXRlbXMoKTtcclxuICAgICAgICBzZWxlY3RFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHNlbGVjdEVsZW1lbnQudmFsKCk7XHJcbiAgICAgICAgICAgIF90aGlzLm9uSXRlbVNlbGVjdGVkRXZlbnQodmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VsZWN0RWxlbWVudDtcclxuICAgIH07XHJcbiAgICBTZWxlY3RCb3gucHJvdG90eXBlLnVwZGF0ZURvbUl0ZW1zID0gZnVuY3Rpb24gKHNlbGVjdGVkVmFsdWUpIHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gdm9pZCAwKSB7IHNlbGVjdGVkVmFsdWUgPSBudWxsOyB9XHJcbiAgICAgICAgLy8gRGVsZXRlIGFsbCBjaGlsZHJlblxyXG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5lbXB0eSgpO1xyXG4gICAgICAgIC8vIEFkZCB1cGRhdGVkIGNoaWxkcmVuXHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuaXRlbXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gX2FbX2ldO1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9uRWxlbWVudCA9IG5ldyBkb21fMS5ET00oJ29wdGlvbicsIHtcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IGl0ZW0ua2V5XHJcbiAgICAgICAgICAgIH0pLmh0bWwoaXRlbS5sYWJlbCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmtleSA9PT0gc2VsZWN0ZWRWYWx1ZSArICcnKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25FbGVtZW50LmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LmFwcGVuZChvcHRpb25FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU2VsZWN0Qm94LnByb3RvdHlwZS5vbkl0ZW1BZGRlZEV2ZW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vbkl0ZW1BZGRlZEV2ZW50LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRG9tSXRlbXModGhpcy5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgfTtcclxuICAgIFNlbGVjdEJveC5wcm90b3R5cGUub25JdGVtUmVtb3ZlZEV2ZW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5vbkl0ZW1SZW1vdmVkRXZlbnQuY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEb21JdGVtcyh0aGlzLnNlbGVjdGVkSXRlbSk7XHJcbiAgICB9O1xyXG4gICAgU2VsZWN0Qm94LnByb3RvdHlwZS5vbkl0ZW1TZWxlY3RlZEV2ZW50ID0gZnVuY3Rpb24gKHZhbHVlLCB1cGRhdGVEb21JdGVtcykge1xyXG4gICAgICAgIGlmICh1cGRhdGVEb21JdGVtcyA9PT0gdm9pZCAwKSB7IHVwZGF0ZURvbUl0ZW1zID0gdHJ1ZTsgfVxyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUub25JdGVtU2VsZWN0ZWRFdmVudC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICBpZiAodXBkYXRlRG9tSXRlbXMpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVEb21JdGVtcyh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBTZWxlY3RCb3g7XHJcbn0obGlzdHNlbGVjdG9yXzEuTGlzdFNlbGVjdG9yKSk7XHJcbmV4cG9ydHMuU2VsZWN0Qm94ID0gU2VsZWN0Qm94O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9zZWxlY3Rib3gudHNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRcIik7XHJcbi8qKlxyXG4gKiBBIGR1bW15IGNvbXBvbmVudCB0aGF0IGp1c3QgcmVzZXJ2ZXMgc29tZSBzcGFjZSBhbmQgZG9lcyBub3RoaW5nIGVsc2UuXHJcbiAqL1xyXG52YXIgU3BhY2VyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhTcGFjZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBTcGFjZXIoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLXNwYWNlcicsXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBTcGFjZXIucHJvdG90eXBlLm9uU2hvd0V2ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIGRpc2FibGUgZXZlbnQgZmlyaW5nIGJ5IG92ZXJ3cml0aW5nIGFuZCBub3QgY2FsbGluZyBzdXBlclxyXG4gICAgfTtcclxuICAgIFNwYWNlci5wcm90b3R5cGUub25IaWRlRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gZGlzYWJsZSBldmVudCBmaXJpbmcgYnkgb3ZlcndyaXRpbmcgYW5kIG5vdCBjYWxsaW5nIHN1cGVyXHJcbiAgICB9O1xyXG4gICAgU3BhY2VyLnByb3RvdHlwZS5vbkhvdmVyQ2hhbmdlZEV2ZW50ID0gZnVuY3Rpb24gKGhvdmVyZWQpIHtcclxuICAgICAgICAvLyBkaXNhYmxlIGV2ZW50IGZpcmluZyBieSBvdmVyd3JpdGluZyBhbmQgbm90IGNhbGxpbmcgc3VwZXJcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3BhY2VyO1xyXG59KGNvbXBvbmVudF8xLkNvbXBvbmVudCkpO1xyXG5leHBvcnRzLlNwYWNlciA9IFNwYWNlcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvc3BhY2VyLnRzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vY29udGFpbmVyXCIpO1xyXG52YXIgZG9tXzEgPSByZXF1aXJlKFwiLi4vZG9tXCIpO1xyXG52YXIgdGltZW91dF8xID0gcmVxdWlyZShcIi4uL3RpbWVvdXRcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xyXG4vKipcclxuICogVGhlIGJhc2UgY29udGFpbmVyIHRoYXQgY29udGFpbnMgYWxsIG9mIHRoZSBVSS4gVGhlIFVJQ29udGFpbmVyIGlzIHBhc3NlZCB0byB0aGUge0BsaW5rIFVJTWFuYWdlcn0gdG8gYnVpbGQgYW5kXHJcbiAqIHNldHVwIHRoZSBVSS5cclxuICovXHJcbnZhciBVSUNvbnRhaW5lciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVUlDb250YWluZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBVSUNvbnRhaW5lcihjb25maWcpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktdWljb250YWluZXInLFxyXG4gICAgICAgICAgICBoaWRlRGVsYXk6IDI1MDAsXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBVSUNvbnRhaW5lci5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmVVSVNob3dIaWRlKHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZVBsYXllclN0YXRlcyhwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICB9O1xyXG4gICAgVUlDb250YWluZXIucHJvdG90eXBlLmNvbmZpZ3VyZVVJU2hvd0hpZGUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmdldERvbUVsZW1lbnQoKTtcclxuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcclxuICAgICAgICB2YXIgaXNVaVNob3duID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGlzU2Vla2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBpc0ZpcnN0VG91Y2ggPSB0cnVlO1xyXG4gICAgICAgIHZhciBzaG93VWkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNVaVNob3duKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZXQgc3Vic2NyaWJlcnMga25vdyB0aGF0IHRoZXkgc2hvdWxkIHJldmVhbCB0aGVtc2VsdmVzXHJcbiAgICAgICAgICAgICAgICB1aW1hbmFnZXIub25Db250cm9sc1Nob3cuZGlzcGF0Y2goX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgaXNVaVNob3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBEb24ndCB0cmlnZ2VyIHRpbWVvdXQgd2hpbGUgc2Vla2luZyAoaXQgd2lsbCBiZSB0cmlnZ2VyZWQgb25jZSB0aGUgc2VlayBpcyBmaW5pc2hlZCkgb3IgY2FzdGluZ1xyXG4gICAgICAgICAgICBpZiAoIWlzU2Vla2luZyAmJiAhcGxheWVyLmlzQ2FzdGluZygpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy51aUhpZGVUaW1lb3V0LnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBoaWRlVWkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIFVJIG9ubHkgaWYgaXQgaXMgc2hvd24sIGFuZCBpZiBub3QgY2FzdGluZ1xyXG4gICAgICAgICAgICBpZiAoaXNVaVNob3duICYmICFwbGF5ZXIuaXNDYXN0aW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIElzc3VlIGEgcHJldmlldyBldmVudCB0byBjaGVjayBpZiB3ZSBhcmUgZ29vZCB0byBoaWRlIHRoZSBjb250cm9sc1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZpZXdIaWRlRXZlbnRBcmdzID0ge307XHJcbiAgICAgICAgICAgICAgICB1aW1hbmFnZXIub25QcmV2aWV3Q29udHJvbHNIaWRlLmRpc3BhdGNoKF90aGlzLCBwcmV2aWV3SGlkZUV2ZW50QXJncyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXByZXZpZXdIaWRlRXZlbnRBcmdzLmNhbmNlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBwcmV2aWV3IHdhc24ndCBjYW5jZWxlZCwgbGV0IHN1YnNjcmliZXJzIGtub3cgdGhhdCB0aGV5IHNob3VsZCBub3cgaGlkZSB0aGVtc2VsdmVzXHJcbiAgICAgICAgICAgICAgICAgICAgdWltYW5hZ2VyLm9uQ29udHJvbHNIaWRlLmRpc3BhdGNoKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBpc1VpU2hvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBoaWRlIHByZXZpZXcgd2FzIGNhbmNlbGVkLCBjb250aW51ZSB0byBzaG93IFVJXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFRpbWVvdXQgdG8gZGVmZXIgVUkgaGlkaW5nIGJ5IHRoZSBjb25maWd1cmVkIGRlbGF5IHRpbWVcclxuICAgICAgICB0aGlzLnVpSGlkZVRpbWVvdXQgPSBuZXcgdGltZW91dF8xLlRpbWVvdXQoY29uZmlnLmhpZGVEZWxheSwgaGlkZVVpKTtcclxuICAgICAgICAvLyBPbiB0b3VjaCBkaXNwbGF5cywgdGhlIGZpcnN0IHRvdWNoIHJldmVhbHMgdGhlIFVJXHJcbiAgICAgICAgY29udGFpbmVyLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNVaVNob3duKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGlmIHRoZSBVSSBpcyBoaWRkZW4sIHdlIHByZXZlbnQgb3RoZXIgYWN0aW9ucyAoZXhjZXB0IGZvciB0aGUgZmlyc3QgdG91Y2gpIGFuZCByZXZlYWwgdGhlIFVJIGluc3RlYWQuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZmlyc3QgdG91Y2ggaXMgbm90IHByZXZlbnRlZCB0byBsZXQgb3RoZXIgbGlzdGVuZXJzIHJlY2VpdmUgdGhlIGV2ZW50IGFuZCB0cmlnZ2VyIGFuIGluaXRpYWwgYWN0aW9uLCBlLmcuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgaHVnZSBwbGF5YmFjayBidXR0b24gY2FuIGRpcmVjdGx5IHN0YXJ0IHBsYXliYWNrIGluc3RlYWQgb2YgcmVxdWlyaW5nIGEgZG91YmxlIHRhcCB3aGljaCAxLiByZXZlYWxzXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgVUkgYW5kIDIuIHN0YXJ0cyBwbGF5YmFjay5cclxuICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0VG91Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0VG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNob3dVaSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gV2hlbiB0aGUgbW91c2UgZW50ZXJzLCB3ZSBzaG93IHRoZSBVSVxyXG4gICAgICAgIGNvbnRhaW5lci5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2hvd1VpKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gV2hlbiB0aGUgbW91c2UgbW92ZXMgd2l0aGluLCB3ZSBzaG93IHRoZSBVSVxyXG4gICAgICAgIGNvbnRhaW5lci5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG93VWkoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBXaGVuIHRoZSBtb3VzZSBsZWF2ZXMsIHdlIGNhbiBwcmVwYXJlIHRvIGhpZGUgdGhlIFVJLCBleGNlcHQgYSBzZWVrIGlzIGdvaW5nIG9uXHJcbiAgICAgICAgY29udGFpbmVyLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIGEgc2VlayBpcyBnb2luZyBvbiwgdGhlIHNlZWsgc2NydWIgcG9pbnRlciBtYXkgZXhpdCB0aGUgVUkgYXJlYSB3aGlsZSBzdGlsbCBzZWVraW5nLCBhbmQgd2UgZG8gbm90IGhpZGVcclxuICAgICAgICAgICAgLy8gdGhlIFVJIGluIHN1Y2ggY2FzZXNcclxuICAgICAgICAgICAgaWYgKCFpc1NlZWtpbmcpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnVpSGlkZVRpbWVvdXQuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVpbWFuYWdlci5vblNlZWsuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMudWlIaWRlVGltZW91dC5jbGVhcigpOyAvLyBEb24ndCBoaWRlIFVJIHdoaWxlIGEgc2VlayBpcyBpbiBwcm9ncmVzc1xyXG4gICAgICAgICAgICBpc1NlZWtpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVpbWFuYWdlci5vblNlZWtlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpc1NlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgX3RoaXMudWlIaWRlVGltZW91dC5zdGFydCgpOyAvLyBSZS1lbmFibGUgVUkgaGlkZSB0aW1lb3V0IGFmdGVyIGEgc2Vla1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfU1RBUlRFRCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG93VWkoKTsgLy8gU2hvdyBVSSB3aGVuIGEgQ2FzdCBzZXNzaW9uIGhhcyBzdGFydGVkIChVSSB3aWxsIHRoZW4gc3RheSBwZXJtYW5lbnRseSBvbiBkdXJpbmcgdGhlIHNlc3Npb24pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVUlDb250YWluZXIucHJvdG90eXBlLmNvbmZpZ3VyZVBsYXllclN0YXRlcyA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuZ2V0RG9tRWxlbWVudCgpO1xyXG4gICAgICAgIC8vIENvbnZlcnQgcGxheWVyIHN0YXRlcyBpbnRvIENTUyBjbGFzcyBuYW1lc1xyXG4gICAgICAgIHZhciBzdGF0ZUNsYXNzTmFtZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBzdGF0ZSBpbiB1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChpc05hTihOdW1iZXIoc3RhdGUpKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVudW1OYW1lID0gdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZVt1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlW3N0YXRlXV07XHJcbiAgICAgICAgICAgICAgICBzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZVtzdGF0ZV1dID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5TVEFURV9QUkVGSVggKyBlbnVtTmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVtb3ZlU3RhdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuSURMRV0pO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuUFJFUEFSRURdKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKHN0YXRlQ2xhc3NOYW1lc1t1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlLlBMQVlJTkddKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKHN0YXRlQ2xhc3NOYW1lc1t1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlLlBBVVNFRF0pO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuRklOSVNIRURdKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVN0YXRlcygpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuUFJFUEFSRURdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QTEFZLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVN0YXRlcygpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuUExBWUlOR10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BBVVNFRCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZW1vdmVTdGF0ZXMoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHN0YXRlQ2xhc3NOYW1lc1t1dGlsc18xLlBsYXllclV0aWxzLlBsYXllclN0YXRlLlBBVVNFRF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVlCQUNLX0ZJTklTSEVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZVN0YXRlcygpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Moc3RhdGVDbGFzc05hbWVzW3V0aWxzXzEuUGxheWVyVXRpbHMuUGxheWVyU3RhdGUuRklOSVNIRURdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfVU5MT0FERUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVtb3ZlU3RhdGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5QbGF5ZXJTdGF0ZS5JRExFXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSW5pdCBpbiBjdXJyZW50IHBsYXllciBzdGF0ZVxyXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhzdGF0ZUNsYXNzTmFtZXNbdXRpbHNfMS5QbGF5ZXJVdGlscy5nZXRTdGF0ZShwbGF5ZXIpXSk7XHJcbiAgICAgICAgLy8gRnVsbHNjcmVlbiBtYXJrZXIgY2xhc3NcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9GVUxMU0NSRUVOX0VOVEVSLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuRlVMTFNDUkVFTikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0ZVTExTQ1JFRU5fRVhJVCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLkZVTExTQ1JFRU4pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0IGZ1bGxzY3JlZW4gc3RhdGVcclxuICAgICAgICBpZiAocGxheWVyLmlzRnVsbHNjcmVlbigpKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5GVUxMU0NSRUVOKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEJ1ZmZlcmluZyBtYXJrZXIgY2xhc3NcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TVEFMTF9TVEFSVEVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuQlVGRkVSSU5HKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fU1RBTExfRU5ERUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5CVUZGRVJJTkcpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0IGJ1ZmZlcmluZyBzdGF0ZVxyXG4gICAgICAgIGlmIChwbGF5ZXIuaXNTdGFsbGVkKCkpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHRoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLkJVRkZFUklORykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdGVDb250cm9sIG1hcmtlciBjbGFzc1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX0NBU1RfU1RBUlRFRCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLlJFTU9URV9DT05UUk9MKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fQ0FTVF9TVE9QUEVELCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuUkVNT1RFX0NPTlRST0wpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBJbml0IFJlbW90ZUNvbnRyb2wgc3RhdGVcclxuICAgICAgICBpZiAocGxheWVyLmlzQ2FzdGluZygpKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5SRU1PVEVfQ09OVFJPTCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDb250cm9scyB2aXNpYmlsaXR5IG1hcmtlciBjbGFzc1xyXG4gICAgICAgIHVpbWFuYWdlci5vbkNvbnRyb2xzU2hvdy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLkNPTlRST0xTX0hJRERFTikpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKFVJQ29udGFpbmVyLkNPTlRST0xTX1NIT1dOKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29udHJvbHNIaWRlLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoVUlDb250YWluZXIuQ09OVFJPTFNfU0hPV04pKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKF90aGlzLnByZWZpeENzcyhVSUNvbnRhaW5lci5DT05UUk9MU19ISURERU4pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBMYXlvdXQgc2l6ZSBjbGFzc2VzXHJcbiAgICAgICAgdmFyIHVwZGF0ZUxheW91dFNpemVDbGFzc2VzID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcygnbGF5b3V0LW1heC13aWR0aC00MDAnKSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhfdGhpcy5wcmVmaXhDc3MoJ2xheW91dC1tYXgtd2lkdGgtNjAwJykpO1xyXG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsYXlvdXQtbWF4LXdpZHRoLTgwMCcpKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKF90aGlzLnByZWZpeENzcygnbGF5b3V0LW1heC13aWR0aC0xMjAwJykpO1xyXG4gICAgICAgICAgICBpZiAod2lkdGggPD0gNDAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsYXlvdXQtbWF4LXdpZHRoLTQwMCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh3aWR0aCA8PSA2MDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhfdGhpcy5wcmVmaXhDc3MoJ2xheW91dC1tYXgtd2lkdGgtNjAwJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZHRoIDw9IDgwMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKF90aGlzLnByZWZpeENzcygnbGF5b3V0LW1heC13aWR0aC04MDAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAod2lkdGggPD0gMTIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKF90aGlzLnByZWZpeENzcygnbGF5b3V0LW1heC13aWR0aC0xMjAwJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QTEFZRVJfUkVTSVpFLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZ3MgKHdpdGggXCJweFwiIHN1ZmZpeCkgdG8gaW50c1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBNYXRoLnJvdW5kKE51bWJlcihlLndpZHRoLnN1YnN0cmluZygwLCBlLndpZHRoLmxlbmd0aCAtIDIpKSk7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBNYXRoLnJvdW5kKE51bWJlcihlLmhlaWdodC5zdWJzdHJpbmcoMCwgZS5oZWlnaHQubGVuZ3RoIC0gMikpKTtcclxuICAgICAgICAgICAgdXBkYXRlTGF5b3V0U2l6ZUNsYXNzZXMod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSW5pdCBsYXlvdXQgc3RhdGVcclxuICAgICAgICB1cGRhdGVMYXlvdXRTaXplQ2xhc3NlcyhuZXcgZG9tXzEuRE9NKHBsYXllci5nZXRGaWd1cmUoKSkud2lkdGgoKSwgbmV3IGRvbV8xLkRPTShwbGF5ZXIuZ2V0RmlndXJlKCkpLmhlaWdodCgpKTtcclxuICAgIH07XHJcbiAgICBVSUNvbnRhaW5lci5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJlbGVhc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICB0aGlzLnVpSGlkZVRpbWVvdXQuY2xlYXIoKTtcclxuICAgIH07XHJcbiAgICBVSUNvbnRhaW5lci5wcm90b3R5cGUudG9Eb21FbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBfc3VwZXIucHJvdG90eXBlLnRvRG9tRWxlbWVudC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIC8vIERldGVjdCBmbGV4Ym94IHN1cHBvcnQgKG5vdCBzdXBwb3J0ZWQgaW4gSUU5KVxyXG4gICAgICAgIGlmIChkb2N1bWVudCAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLnN0eWxlLmZsZXggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnByZWZpeENzcygnZmxleGJveCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyh0aGlzLnByZWZpeENzcygnbm8tZmxleGJveCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVUlDb250YWluZXI7XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcblVJQ29udGFpbmVyLlNUQVRFX1BSRUZJWCA9ICdwbGF5ZXItc3RhdGUtJztcclxuVUlDb250YWluZXIuRlVMTFNDUkVFTiA9ICdmdWxsc2NyZWVuJztcclxuVUlDb250YWluZXIuQlVGRkVSSU5HID0gJ2J1ZmZlcmluZyc7XHJcblVJQ29udGFpbmVyLlJFTU9URV9DT05UUk9MID0gJ3JlbW90ZS1jb250cm9sJztcclxuVUlDb250YWluZXIuQ09OVFJPTFNfU0hPV04gPSAnY29udHJvbHMtc2hvd24nO1xyXG5VSUNvbnRhaW5lci5DT05UUk9MU19ISURERU4gPSAnY29udHJvbHMtaGlkZGVuJztcclxuZXhwb3J0cy5VSUNvbnRhaW5lciA9IFVJQ29udGFpbmVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy91aWNvbnRhaW5lci50c1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcclxudmFyIHZvbHVtZXNsaWRlcl8xID0gcmVxdWlyZShcIi4vdm9sdW1lc2xpZGVyXCIpO1xyXG52YXIgdm9sdW1ldG9nZ2xlYnV0dG9uXzEgPSByZXF1aXJlKFwiLi92b2x1bWV0b2dnbGVidXR0b25cIik7XHJcbnZhciB0aW1lb3V0XzEgPSByZXF1aXJlKFwiLi4vdGltZW91dFwiKTtcclxuLyoqXHJcbiAqIEEgY29tcG9zaXRlIHZvbHVtZSBjb250cm9sIHRoYXQgY29uc2lzdHMgb2YgYW5kIGludGVybmFsbHkgbWFuYWdlcyBhIHZvbHVtZSBjb250cm9sIGJ1dHRvbiB0aGF0IGNhbiBiZSB1c2VkXHJcbiAqIGZvciBtdXRpbmcsIGFuZCBhIChkZXBlbmRpbmcgb24gdGhlIENTUyBzdHlsZSwgZS5nLiBzbGlkZS1vdXQpIHZvbHVtZSBjb250cm9sIGJhci5cclxuICovXHJcbnZhciBWb2x1bWVDb250cm9sQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWb2x1bWVDb250cm9sQnV0dG9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVm9sdW1lQ29udHJvbEJ1dHRvbihjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMudm9sdW1lVG9nZ2xlQnV0dG9uID0gbmV3IHZvbHVtZXRvZ2dsZWJ1dHRvbl8xLlZvbHVtZVRvZ2dsZUJ1dHRvbigpO1xyXG4gICAgICAgIF90aGlzLnZvbHVtZVNsaWRlciA9IG5ldyB2b2x1bWVzbGlkZXJfMS5Wb2x1bWVTbGlkZXIoe1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbDogY29uZmlnLnZlcnRpY2FsICE9IG51bGwgPyBjb25maWcudmVydGljYWwgOiB0cnVlLFxyXG4gICAgICAgICAgICBoaWRkZW46IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS12b2x1bWVjb250cm9sYnV0dG9uJyxcclxuICAgICAgICAgICAgY29tcG9uZW50czogW190aGlzLnZvbHVtZVRvZ2dsZUJ1dHRvbiwgX3RoaXMudm9sdW1lU2xpZGVyXSxcclxuICAgICAgICAgICAgaGlkZURlbGF5OiA1MDBcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFZvbHVtZUNvbnRyb2xCdXR0b24ucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIHZvbHVtZVRvZ2dsZUJ1dHRvbiA9IHRoaXMuZ2V0Vm9sdW1lVG9nZ2xlQnV0dG9uKCk7XHJcbiAgICAgICAgdmFyIHZvbHVtZVNsaWRlciA9IHRoaXMuZ2V0Vm9sdW1lU2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy52b2x1bWVTbGlkZXJIaWRlVGltZW91dCA9IG5ldyB0aW1lb3V0XzEuVGltZW91dCh0aGlzLmdldENvbmZpZygpLmhpZGVEZWxheSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2b2x1bWVTbGlkZXIuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogVm9sdW1lIFNsaWRlciB2aXNpYmlsaXR5IGhhbmRsaW5nXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBUaGUgdm9sdW1lIHNsaWRlciBzaGFsbCBiZSB2aXNpYmxlIHdoaWxlIHRoZSB1c2VyIGhvdmVycyB0aGUgbXV0ZSB0b2dnbGUgYnV0dG9uLCB3aGlsZSB0aGUgdXNlciBob3ZlcnMgdGhlXHJcbiAgICAgICAgICogdm9sdW1lIHNsaWRlciwgYW5kIHdoaWxlIHRoZSB1c2VyIHNsaWRlcyB0aGUgdm9sdW1lIHNsaWRlci4gSWYgbm9uZSBvZiB0aGVzZSBzaXR1YXRpb25zIGFyZSB0cnVlLCB0aGUgc2xpZGVyXHJcbiAgICAgICAgICogc2hhbGwgZGlzYXBwZWFyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciB2b2x1bWVTbGlkZXJIb3ZlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgdm9sdW1lVG9nZ2xlQnV0dG9uLmdldERvbUVsZW1lbnQoKS5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gU2hvdyB2b2x1bWUgc2xpZGVyIHdoZW4gbW91c2UgZW50ZXJzIHRoZSBidXR0b24gYXJlYVxyXG4gICAgICAgICAgICBpZiAodm9sdW1lU2xpZGVyLmlzSGlkZGVuKCkpIHtcclxuICAgICAgICAgICAgICAgIHZvbHVtZVNsaWRlci5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQXZvaWQgaGlkaW5nIG9mIHRoZSBzbGlkZXIgd2hlbiBidXR0b24gaXMgaG92ZXJlZFxyXG4gICAgICAgICAgICBfdGhpcy52b2x1bWVTbGlkZXJIaWRlVGltZW91dC5jbGVhcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZvbHVtZVRvZ2dsZUJ1dHRvbi5nZXREb21FbGVtZW50KCkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEhpZGUgc2xpZGVyIGRlbGF5ZWQgd2hlbiBidXR0b24gaXMgbGVmdFxyXG4gICAgICAgICAgICBfdGhpcy52b2x1bWVTbGlkZXJIaWRlVGltZW91dC5yZXNldCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZvbHVtZVNsaWRlci5nZXREb21FbGVtZW50KCkub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gdGhlIHNsaWRlciBpcyBlbnRlcmVkLCBjYW5jZWwgdGhlIGhpZGUgdGltZW91dCBhY3RpdmF0ZWQgYnkgbGVhdmluZyB0aGUgYnV0dG9uXHJcbiAgICAgICAgICAgIF90aGlzLnZvbHVtZVNsaWRlckhpZGVUaW1lb3V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHZvbHVtZVNsaWRlckhvdmVyZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZvbHVtZVNsaWRlci5nZXREb21FbGVtZW50KCkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gbW91c2UgbGVhdmVzIHRoZSBzbGlkZXIsIG9ubHkgaGlkZSBpdCBpZiB0aGVyZSBpcyBubyBzbGlkZSBvcGVyYXRpb24gaW4gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgaWYgKHZvbHVtZVNsaWRlci5pc1NlZWtpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudm9sdW1lU2xpZGVySGlkZVRpbWVvdXQuY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnZvbHVtZVNsaWRlckhpZGVUaW1lb3V0LnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdm9sdW1lU2xpZGVySG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZvbHVtZVNsaWRlci5vblNlZWtlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIGEgc2xpZGUgb3BlcmF0aW9uIGlzIGRvbmUgYW5kIHRoZSBzbGlkZXIgbm90IGhvdmVyZWQgKG1vdXNlIG91dHNpZGUgc2xpZGVyKSwgaGlkZSBzbGlkZXIgZGVsYXllZFxyXG4gICAgICAgICAgICBpZiAoIXZvbHVtZVNsaWRlckhvdmVyZWQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnZvbHVtZVNsaWRlckhpZGVUaW1lb3V0LnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBWb2x1bWVDb250cm9sQnV0dG9uLnByb3RvdHlwZS5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVsZWFzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lU2xpZGVySGlkZVRpbWVvdXQuY2xlYXIoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgaW50ZXJuYWxseSBtYW5hZ2VkIHZvbHVtZSB0b2dnbGUgYnV0dG9uLlxyXG4gICAgICogQHJldHVybnMge1ZvbHVtZVRvZ2dsZUJ1dHRvbn1cclxuICAgICAqL1xyXG4gICAgVm9sdW1lQ29udHJvbEJ1dHRvbi5wcm90b3R5cGUuZ2V0Vm9sdW1lVG9nZ2xlQnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZvbHVtZVRvZ2dsZUJ1dHRvbjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFByb3ZpZGVzIGFjY2VzcyB0byB0aGUgaW50ZXJuYWxseSBtYW5hZ2VkIHZvbHVtZSBzaWxkZXIuXHJcbiAgICAgKiBAcmV0dXJucyB7Vm9sdW1lU2xpZGVyfVxyXG4gICAgICovXHJcbiAgICBWb2x1bWVDb250cm9sQnV0dG9uLnByb3RvdHlwZS5nZXRWb2x1bWVTbGlkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudm9sdW1lU2xpZGVyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWb2x1bWVDb250cm9sQnV0dG9uO1xyXG59KGNvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xyXG5leHBvcnRzLlZvbHVtZUNvbnRyb2xCdXR0b24gPSBWb2x1bWVDb250cm9sQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy92b2x1bWVjb250cm9sYnV0dG9uLnRzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHNlZWtiYXJfMSA9IHJlcXVpcmUoXCIuL3NlZWtiYXJcIik7XHJcbi8qKlxyXG4gKiBBIHNpbXBsZSB2b2x1bWUgc2xpZGVyIGNvbXBvbmVudCB0byBhZGp1c3QgdGhlIHBsYXllcidzIHZvbHVtZSBzZXR0aW5nLlxyXG4gKi9cclxudmFyIFZvbHVtZVNsaWRlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVm9sdW1lU2xpZGVyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVm9sdW1lU2xpZGVyKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS12b2x1bWVzbGlkZXInLFxyXG4gICAgICAgICAgICBoaWRlSWZWb2x1bWVDb250cm9sUHJvaGliaXRlZDogdHJ1ZSxcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFZvbHVtZVNsaWRlci5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyLCBmYWxzZSk7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5oaWRlSWZWb2x1bWVDb250cm9sUHJvaGliaXRlZCAmJiAhdGhpcy5kZXRlY3RWb2x1bWVDb250cm9sQXZhaWxhYmlsaXR5KHBsYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIC8vIFdlIGNhbiBqdXN0IHJldHVybiBmcm9tIGhlcmUsIGJlY2F1c2UgdGhlIHVzZXIgd2lsbCBuZXZlciBpbnRlcmFjdCB3aXRoIHRoZSBjb250cm9sIGFuZCBhbnkgY29uZmlndXJlZFxyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbmFsaXR5IHdvdWxkIG9ubHkgZWF0IHJlc291cmNlcyBmb3Igbm8gcmVhc29uLlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2b2x1bWVDaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzTXV0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0UGxheWJhY2tQb3NpdGlvbigwKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEJ1ZmZlclBvc2l0aW9uKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0UGxheWJhY2tQb3NpdGlvbihwbGF5ZXIuZ2V0Vm9sdW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QnVmZmVyUG9zaXRpb24ocGxheWVyLmdldFZvbHVtZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUkVBRFksIHZvbHVtZUNoYW5nZUhhbmRsZXIpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1ZPTFVNRV9DSEFOR0VELCB2b2x1bWVDaGFuZ2VIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9NVVRFRCwgdm9sdW1lQ2hhbmdlSGFuZGxlcik7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVU5NVVRFRCwgdm9sdW1lQ2hhbmdlSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5vblNlZWtQcmV2aWV3LnN1YnNjcmliZShmdW5jdGlvbiAoc2VuZGVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLnNjcnViYmluZykge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnNldFZvbHVtZShhcmdzLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub25TZWVrZWQuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZW5kZXIsIHBlcmNlbnRhZ2UpIHtcclxuICAgICAgICAgICAgcGxheWVyLnNldFZvbHVtZShwZXJjZW50YWdlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHZvbHVtZSBzbGlkZXIgbWFya2VyIHdoZW4gdGhlIHBsYXllciByZXNpemVkLCBhIHNvdXJjZSBpcyBsb2FkZWQgYW5kIHBsYXllciBpcyByZWFkeSxcclxuICAgICAgICAvLyBvciB0aGUgVUkgaXMgY29uZmlndXJlZC4gQ2hlY2sgdGhlIHNlZWtiYXIgZm9yIGEgZGV0YWlsZWQgZGVzY3JpcHRpb24uXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fUExBWUVSX1JFU0laRSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlZnJlc2hQbGF5YmFja1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdWltYW5hZ2VyLm9uQ29uZmlndXJlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZWZyZXNoUGxheWJhY2tQb3NpdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEluaXQgdm9sdW1lIGJhclxyXG4gICAgICAgIHZvbHVtZUNoYW5nZUhhbmRsZXIoKTtcclxuICAgIH07XHJcbiAgICBWb2x1bWVTbGlkZXIucHJvdG90eXBlLmRldGVjdFZvbHVtZUNvbnRyb2xBdmFpbGFiaWxpdHkgPSBmdW5jdGlvbiAocGxheWVyKSB7XHJcbiAgICAgICAgLy8gU3RvcmUgY3VycmVudCBwbGF5ZXIgc3RhdGUgc28gd2UgY2FuIHJlc3RvcmUgaXQgbGF0ZXJcclxuICAgICAgICB2YXIgdm9sdW1lID0gcGxheWVyLmdldFZvbHVtZSgpO1xyXG4gICAgICAgIHZhciBtdXRlZCA9IHBsYXllci5pc011dGVkKCk7XHJcbiAgICAgICAgdmFyIHBsYXlpbmcgPSBwbGF5ZXIuaXNQbGF5aW5nKCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBcIk9uIGlPUyBkZXZpY2VzLCB0aGUgYXVkaW8gbGV2ZWwgaXMgYWx3YXlzIHVuZGVyIHRoZSB1c2Vy4oCZcyBwaHlzaWNhbCBjb250cm9sLiBUaGUgdm9sdW1lIHByb3BlcnR5IGlzIG5vdFxyXG4gICAgICAgICAqIHNldHRhYmxlIGluIEphdmFTY3JpcHQuIFJlYWRpbmcgdGhlIHZvbHVtZSBwcm9wZXJ0eSBhbHdheXMgcmV0dXJucyAxLlwiXHJcbiAgICAgICAgICogaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2xpYnJhcnkvY29udGVudC9kb2N1bWVudGF0aW9uL0F1ZGlvVmlkZW8vQ29uY2VwdHVhbC9Vc2luZ19IVE1MNV9BdWRpb19WaWRlby9EZXZpY2UtU3BlY2lmaWNDb25zaWRlcmF0aW9ucy9EZXZpY2UtU3BlY2lmaWNDb25zaWRlcmF0aW9ucy5odG1sXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBPdXIgcGxheWVyIEFQSSByZXR1cm5zIGEgdm9sdW1lIHJhbmdlIG9mIFswLCAxMDBdIHNvIHdlIG5lZWQgdG8gY2hlY2sgZm9yIDEwMCBpbnN0ZWFkIG9mIDEuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy8gT25seSBpZiB0aGUgdm9sdW1lIGlzIDEwMCwgdGhlcmUncyB0aGUgcG9zc2liaWxpdHkgd2UgYXJlIG9uIGEgdm9sdW1lLWNvbnRyb2wtcmVzdHJpY3RlZCBpT1MgZGV2aWNlXHJcbiAgICAgICAgaWYgKHZvbHVtZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgIC8vIFdlIHNldCB0aGUgdm9sdW1lIHRvIHplcm8gKHRoYXQncyB0aGUgb25seSB2YWx1ZSB0aGF0IGRvZXMgbm90IHVubXV0ZSBhIG11dGVkIHBsYXllciEpXHJcbiAgICAgICAgICAgIHBsYXllci5zZXRWb2x1bWUoMCk7XHJcbiAgICAgICAgICAgIC8vIFRoZW4gd2UgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIHN0aWxsIDEwMFxyXG4gICAgICAgICAgICBpZiAocGxheWVyLmdldFZvbHVtZSgpID09PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB2b2x1bWUgc3RheWVkIGF0IDEwMCwgd2UncmUgb24gYSB2b2x1bWUtY29udHJvbC1yZXN0cmljdGVkIGRldmljZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgY2FuIGNvbnRyb2wgdm9sdW1lLCBzbyB3ZSBtdXN0IHJlc3RvcmUgdGhlIHByZXZpb3VzIHBsYXllciBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgcGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG11dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLm11dGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHZvbHVtZSByZXN0b3JlIGFib3ZlIHBhdXNlcyBhdXRvcGxheSBvbiBtb2JpbGUgZGV2aWNlcyAoZS5nLiBBbmRyb2lkKSBzbyB3ZSBuZWVkIHRvIHJlc3VtZSBwbGF5YmFja1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIChXZSBjYW5ub3QgY2hlY2sgaXNQYXVzZWQoKSBoZXJlIGJlY2F1c2UgaXQgaXMgbm90IHNldCB3aGVuIHBsYXliYWNrIGlzIHByb2hpYml0ZWQgYnkgdGhlIG1vYmlsZSBwbGF0Zm9ybSlcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFZvbHVtZSBpcyBub3QgMTAwLCBzbyB3ZSdyZSBkZWZpbml0ZWx5IG5vdCBvbiBhIHZvbHVtZS1jb250cm9sLXJlc3RyaWN0ZWQgaU9TIGRldmljZVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZvbHVtZVNsaWRlcjtcclxufShzZWVrYmFyXzEuU2Vla0JhcikpO1xyXG5leHBvcnRzLlZvbHVtZVNsaWRlciA9IFZvbHVtZVNsaWRlcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvdm9sdW1lc2xpZGVyLnRzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vdG9nZ2xlYnV0dG9uXCIpO1xyXG4vKipcclxuICogQSBidXR0b24gdGhhdCB0b2dnbGVzIGF1ZGlvIG11dGluZy5cclxuICovXHJcbnZhciBWb2x1bWVUb2dnbGVCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFZvbHVtZVRvZ2dsZUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZvbHVtZVRvZ2dsZUJ1dHRvbihjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktdm9sdW1ldG9nZ2xlYnV0dG9uJyxcclxuICAgICAgICAgICAgdGV4dDogJ1ZvbHVtZS9NdXRlJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgVm9sdW1lVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAocGxheWVyLCB1aW1hbmFnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBtdXRlU3RhdGVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLmlzTXV0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9mZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgdm9sdW1lTGV2ZWxIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBUb2dnbGUgbG93IGNsYXNzIHRvIGRpc3BsYXkgbG93IHZvbHVtZSBpY29uIGJlbG93IDUwJSB2b2x1bWVcclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRWb2x1bWUoKSA8IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXREb21FbGVtZW50KCkuYWRkQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsb3cnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXREb21FbGVtZW50KCkucmVtb3ZlQ2xhc3MoX3RoaXMucHJlZml4Q3NzKCdsb3cnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX01VVEVELCBtdXRlU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9VTk1VVEVELCBtdXRlU3RhdGVIYW5kbGVyKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9WT0xVTUVfQ0hBTkdFRCwgdm9sdW1lTGV2ZWxIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLm9uQ2xpY2suc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5pc011dGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci51bm11dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5tdXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBTdGFydHVwIGluaXRcclxuICAgICAgICBtdXRlU3RhdGVIYW5kbGVyKCk7XHJcbiAgICAgICAgdm9sdW1lTGV2ZWxIYW5kbGVyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZvbHVtZVRvZ2dsZUJ1dHRvbjtcclxufSh0b2dnbGVidXR0b25fMS5Ub2dnbGVCdXR0b24pKTtcclxuZXhwb3J0cy5Wb2x1bWVUb2dnbGVCdXR0b24gPSBWb2x1bWVUb2dnbGVCdXR0b247XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3ZvbHVtZXRvZ2dsZWJ1dHRvbi50c1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0ncGxheWVyLmQudHMnIC8+XHJcbnZhciB1aW1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL3VpbWFuYWdlclwiKTtcclxudmFyIGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9idXR0b25cIik7XHJcbnZhciBjb250cm9sYmFyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2NvbnRyb2xiYXJcIik7XHJcbnZhciBodWdlcGxheWJhY2t0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaHVnZXBsYXliYWNrdG9nZ2xlYnV0dG9uXCIpO1xyXG52YXIgcGxheWJhY2t0aW1lbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvcGxheWJhY2t0aW1lbGFiZWxcIik7XHJcbnZhciBwbGF5YmFja3RvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZWJ1dHRvblwiKTtcclxudmFyIHNlZWtiYXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc2Vla2JhclwiKTtcclxudmFyIHNlbGVjdGJveF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zZWxlY3Rib3hcIik7XHJcbnZhciB0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdG9nZ2xlYnV0dG9uXCIpO1xyXG52YXIgdmlkZW9xdWFsaXR5c2VsZWN0Ym94XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3ZpZGVvcXVhbGl0eXNlbGVjdGJveFwiKTtcclxudmFyIHZvbHVtZXRvZ2dsZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92b2x1bWV0b2dnbGVidXR0b25cIik7XHJcbnZhciB3YXRlcm1hcmtfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvd2F0ZXJtYXJrXCIpO1xyXG52YXIgdWljb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdWljb250YWluZXJcIik7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29udGFpbmVyXCIpO1xyXG52YXIgbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvbGFiZWxcIik7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29tcG9uZW50XCIpO1xyXG52YXIgZXJyb3JtZXNzYWdlb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9lcnJvcm1lc3NhZ2VvdmVybGF5XCIpO1xyXG52YXIgc2Vla2JhcmxhYmVsXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlZWtiYXJsYWJlbFwiKTtcclxudmFyIHRpdGxlYmFyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3RpdGxlYmFyXCIpO1xyXG52YXIgdm9sdW1lY29udHJvbGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92b2x1bWVjb250cm9sYnV0dG9uXCIpO1xyXG52YXIgY2xpY2tvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2NsaWNrb3ZlcmxheVwiKTtcclxudmFyIGh1Z2VyZXBsYXlidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaHVnZXJlcGxheWJ1dHRvblwiKTtcclxudmFyIGJ1ZmZlcmluZ292ZXJsYXlfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYnVmZmVyaW5nb3ZlcmxheVwiKTtcclxudmFyIHBsYXliYWNrdG9nZ2xlb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZW92ZXJsYXlcIik7XHJcbnZhciBjbG9zZWJ1dHRvbl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jbG9zZWJ1dHRvblwiKTtcclxudmFyIG1ldGFkYXRhbGFiZWxfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvbWV0YWRhdGFsYWJlbFwiKTtcclxudmFyIHZvbHVtZXNsaWRlcl8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92b2x1bWVzbGlkZXJcIik7XHJcbnZhciBzcGFjZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvc3BhY2VyXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xyXG4vLyBPYmplY3QuYXNzaWduIHBvbHlmaWxsIGZvciBFUzUvSUU5XHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RlL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cclxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpO1xyXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfTtcclxufVxyXG4vLyBFeHBvc2UgY2xhc3NlcyB0byB3aW5kb3dcclxud2luZG93LmJpdG1vdmluLnBsYXllcnVpID0ge1xyXG4gICAgLy8gTWFuYWdlbWVudFxyXG4gICAgVUlNYW5hZ2VyOiB1aW1hbmFnZXJfMS5VSU1hbmFnZXIsXHJcbiAgICBVSUluc3RhbmNlTWFuYWdlcjogdWltYW5hZ2VyXzEuVUlJbnN0YW5jZU1hbmFnZXIsXHJcbiAgICAvLyBVdGlsc1xyXG4gICAgQXJyYXlVdGlsczogdXRpbHNfMS5BcnJheVV0aWxzLFxyXG4gICAgU3RyaW5nVXRpbHM6IHV0aWxzXzEuU3RyaW5nVXRpbHMsXHJcbiAgICBQbGF5ZXJVdGlsczogdXRpbHNfMS5QbGF5ZXJVdGlscyxcclxuICAgIFVJVXRpbHM6IHV0aWxzXzEuVUlVdGlscyxcclxuICAgIEJyb3dzZXJVdGlsczogdXRpbHNfMS5Ccm93c2VyVXRpbHMsXHJcbiAgICAvLyBDb21wb25lbnRzXHJcbiAgICBCdWZmZXJpbmdPdmVybGF5OiBidWZmZXJpbmdvdmVybGF5XzEuQnVmZmVyaW5nT3ZlcmxheSxcclxuICAgIEJ1dHRvbjogYnV0dG9uXzEuQnV0dG9uLFxyXG4gICAgQ2xpY2tPdmVybGF5OiBjbGlja292ZXJsYXlfMS5DbGlja092ZXJsYXksXHJcbiAgICBDbG9zZUJ1dHRvbjogY2xvc2VidXR0b25fMS5DbG9zZUJ1dHRvbixcclxuICAgIENvbXBvbmVudDogY29tcG9uZW50XzEuQ29tcG9uZW50LFxyXG4gICAgQ29udGFpbmVyOiBjb250YWluZXJfMS5Db250YWluZXIsXHJcbiAgICBDb250cm9sQmFyOiBjb250cm9sYmFyXzEuQ29udHJvbEJhcixcclxuICAgIEVycm9yTWVzc2FnZU92ZXJsYXk6IGVycm9ybWVzc2FnZW92ZXJsYXlfMS5FcnJvck1lc3NhZ2VPdmVybGF5LFxyXG4gICAgSHVnZVBsYXliYWNrVG9nZ2xlQnV0dG9uOiBodWdlcGxheWJhY2t0b2dnbGVidXR0b25fMS5IdWdlUGxheWJhY2tUb2dnbGVCdXR0b24sXHJcbiAgICBIdWdlUmVwbGF5QnV0dG9uOiBodWdlcmVwbGF5YnV0dG9uXzEuSHVnZVJlcGxheUJ1dHRvbixcclxuICAgIExhYmVsOiBsYWJlbF8xLkxhYmVsLFxyXG4gICAgTWV0YWRhdGFMYWJlbDogbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWwsXHJcbiAgICBNZXRhZGF0YUxhYmVsQ29udGVudDogbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWxDb250ZW50LFxyXG4gICAgUGxheWJhY2tUaW1lTGFiZWw6IHBsYXliYWNrdGltZWxhYmVsXzEuUGxheWJhY2tUaW1lTGFiZWwsXHJcbiAgICBQbGF5YmFja1RpbWVMYWJlbE1vZGU6IHBsYXliYWNrdGltZWxhYmVsXzEuUGxheWJhY2tUaW1lTGFiZWxNb2RlLFxyXG4gICAgUGxheWJhY2tUb2dnbGVCdXR0b246IHBsYXliYWNrdG9nZ2xlYnV0dG9uXzEuUGxheWJhY2tUb2dnbGVCdXR0b24sXHJcbiAgICBQbGF5YmFja1RvZ2dsZU92ZXJsYXk6IHBsYXliYWNrdG9nZ2xlb3ZlcmxheV8xLlBsYXliYWNrVG9nZ2xlT3ZlcmxheSxcclxuICAgIFNlZWtCYXI6IHNlZWtiYXJfMS5TZWVrQmFyLFxyXG4gICAgU2Vla0JhckxhYmVsOiBzZWVrYmFybGFiZWxfMS5TZWVrQmFyTGFiZWwsXHJcbiAgICBTZWxlY3RCb3g6IHNlbGVjdGJveF8xLlNlbGVjdEJveCxcclxuICAgIFNwYWNlcjogc3BhY2VyXzEuU3BhY2VyLFxyXG4gICAgVGl0bGVCYXI6IHRpdGxlYmFyXzEuVGl0bGVCYXIsXHJcbiAgICBUb2dnbGVCdXR0b246IHRvZ2dsZWJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbixcclxuICAgIFVJQ29udGFpbmVyOiB1aWNvbnRhaW5lcl8xLlVJQ29udGFpbmVyLFxyXG4gICAgVmlkZW9RdWFsaXR5U2VsZWN0Qm94OiB2aWRlb3F1YWxpdHlzZWxlY3Rib3hfMS5WaWRlb1F1YWxpdHlTZWxlY3RCb3gsXHJcbiAgICBWb2x1bWVDb250cm9sQnV0dG9uOiB2b2x1bWVjb250cm9sYnV0dG9uXzEuVm9sdW1lQ29udHJvbEJ1dHRvbixcclxuICAgIFZvbHVtZVNsaWRlcjogdm9sdW1lc2xpZGVyXzEuVm9sdW1lU2xpZGVyLFxyXG4gICAgVm9sdW1lVG9nZ2xlQnV0dG9uOiB2b2x1bWV0b2dnbGVidXR0b25fMS5Wb2x1bWVUb2dnbGVCdXR0b24sXHJcbiAgICBXYXRlcm1hcms6IHdhdGVybWFya18xLldhdGVybWFyayxcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL21haW4udHNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XHJcbnZhciBiaXRkYXNoX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2JpdGRhc2gtY29udHJvbGxlclwiKTtcclxudmFyIGJpdGRhc2hfZGlyZWN0aXZlXzEgPSByZXF1aXJlKFwiLi9iaXRkYXNoLWRpcmVjdGl2ZVwiKTtcclxudmFyIG1vZHVsZU5hbWUgPSAnbWkuQml0ZGFzaFBsYXllcic7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ01pQml0ZGFzaENvbnRyb2xsZXInLCBiaXRkYXNoX2NvbnRyb2xsZXJfMS5kZWZhdWx0KVxyXG4gICAgLmRpcmVjdGl2ZSgnbWlCaXRkYXNoUGxheWVyJywgYml0ZGFzaF9kaXJlY3RpdmVfMS5kZWZhdWx0KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9pbmRleC50c1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50XCIpO1xyXG4vKipcclxuICogT3ZlcmxheXMgdGhlIHBsYXllciBhbmQgZGlzcGxheXMgYW4gYXVkaW8tb25seSBpbmRpY2F0b3IuXHJcbiAqL1xyXG52YXIgQXVkaW9Pbmx5T3ZlcmxheSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQXVkaW9Pbmx5T3ZlcmxheSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEF1ZGlvT25seU92ZXJsYXkoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmF1ZGlvb25seSA9IFtcclxuICAgICAgICAgICAgbmV3IGNvbXBvbmVudF8xLkNvbXBvbmVudCh7IHRhZzogJ2RpdicsIGNzc0NsYXNzOiAndWktYXVkaW9vbmx5LW92ZXJsYXktaW5kaWNhdG9yJyB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktYXVkaW9vbmx5LW92ZXJsYXknLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBfdGhpcy5hdWRpb29ubHksXHJcbiAgICAgICAgICAgIGhpZGRlbjogZmFsc2VcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEF1ZGlvT25seU92ZXJsYXkucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgcGxheWVyLCB1aW1hbmFnZXIpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgaW1hZ2UgPSBzZWxmLmdldERvbUVsZW1lbnQoKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICAvLyBIaWRlIG92ZXJsYXkgd2hlbiBQbGF5ZXIgaXMgcGF1c2VkLCBzbyB3ZSBjYW4gc2VlIHRoZSBCaWcgUGxheSBCdXR0b25cclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9QQVVTRUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzZWxmLmdldERvbUVsZW1lbnQoKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnbm9uZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1BMQVksIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzZWxmLmdldERvbUVsZW1lbnQoKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBpbWFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gSGlkZSBvdmVybGF5IGlmIHBsYXllciBpcyAgcGF1c2VkIGF0IGluaXQgKGUuZy4gb24gbW9iaWxlIGRldmljZXMpXHJcbiAgICAgICAgaWYgKCFwbGF5ZXIuaXNQbGF5aW5nKCkpIHtcclxuICAgICAgICAgICAgc2VsZi5nZXREb21FbGVtZW50KCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEF1ZGlvT25seU92ZXJsYXk7XHJcbn0oY29udGFpbmVyXzEuQ29udGFpbmVyKSk7XHJcbmV4cG9ydHMuQXVkaW9Pbmx5T3ZlcmxheSA9IEF1ZGlvT25seU92ZXJsYXk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2F1ZGlvb25seW92ZXJsYXkudHNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9jb250YWluZXJcIik7XHJcbnZhciBjb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudFwiKTtcclxudmFyIHRpbWVvdXRfMSA9IHJlcXVpcmUoXCIuLi90aW1lb3V0XCIpO1xyXG4vKipcclxuICogT3ZlcmxheXMgdGhlIHBsYXllciBhbmQgZGlzcGxheXMgYSBidWZmZXJpbmcgaW5kaWNhdG9yLlxyXG4gKi9cclxudmFyIEJ1ZmZlcmluZ092ZXJsYXkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEJ1ZmZlcmluZ092ZXJsYXksIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBCdWZmZXJpbmdPdmVybGF5KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5pbmRpY2F0b3JzID0gW1xyXG4gICAgICAgICAgICBuZXcgY29tcG9uZW50XzEuQ29tcG9uZW50KHsgdGFnOiAnZGl2JywgY3NzQ2xhc3M6ICd1aS1idWZmZXJpbmctb3ZlcmxheS1pbmRpY2F0b3InIH0pLFxyXG4gICAgICAgICAgICBuZXcgY29tcG9uZW50XzEuQ29tcG9uZW50KHsgdGFnOiAnZGl2JywgY3NzQ2xhc3M6ICd1aS1idWZmZXJpbmctb3ZlcmxheS1pbmRpY2F0b3InIH0pLFxyXG4gICAgICAgICAgICBuZXcgY29tcG9uZW50XzEuQ29tcG9uZW50KHsgdGFnOiAnZGl2JywgY3NzQ2xhc3M6ICd1aS1idWZmZXJpbmctb3ZlcmxheS1pbmRpY2F0b3InIH0pLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktYnVmZmVyaW5nLW92ZXJsYXknLFxyXG4gICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IF90aGlzLmluZGljYXRvcnMsXHJcbiAgICAgICAgICAgIHNob3dEZWxheU1zOiAxMDAwLFxyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgQnVmZmVyaW5nT3ZlcmxheS5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcclxuICAgICAgICB2YXIgb3ZlcmxheVNob3dUaW1lb3V0ID0gbmV3IHRpbWVvdXRfMS5UaW1lb3V0KGNvbmZpZy5zaG93RGVsYXlNcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHNob3dPdmVybGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvdmVybGF5U2hvd1RpbWVvdXQuc3RhcnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBoaWRlT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgb3ZlcmxheVNob3dUaW1lb3V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NUQUxMX1NUQVJURUQsIHNob3dPdmVybGF5KTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TVEFMTF9FTkRFRCwgaGlkZU92ZXJsYXkpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1NPVVJDRV9VTkxPQURFRCwgaGlkZU92ZXJsYXkpO1xyXG4gICAgICAgIC8vIFNob3cgb3ZlcmxheSBpZiBwbGF5ZXIgaXMgYWxyZWFkeSBzdGFsbGVkIGF0IGluaXRcclxuICAgICAgICBpZiAocGxheWVyLmlzU3RhbGxlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gQnVmZmVyaW5nT3ZlcmxheTtcclxufShjb250YWluZXJfMS5Db250YWluZXIpKTtcclxuZXhwb3J0cy5CdWZmZXJpbmdPdmVybGF5ID0gQnVmZmVyaW5nT3ZlcmxheTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2NvbXBvbmVudHMvYnVmZmVyaW5nb3ZlcmxheS50c1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuL2J1dHRvblwiKTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIHRoYXQgY2xvc2VzIChoaWRlcykgYSBjb25maWd1cmVkIGNvbXBvbmVudC5cclxuICovXHJcbnZhciBDbG9zZUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQ2xvc2VCdXR0b24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBDbG9zZUJ1dHRvbihjb25maWcpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktY2xvc2VidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQ2xvc2UnXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBDbG9zZUJ1dHRvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy50YXJnZXQuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDbG9zZUJ1dHRvbjtcclxufShidXR0b25fMS5CdXR0b24pKTtcclxuZXhwb3J0cy5DbG9zZUJ1dHRvbiA9IENsb3NlQnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9jbG9zZWJ1dHRvbi50c1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBidXR0b25fMSA9IHJlcXVpcmUoXCIuL2J1dHRvblwiKTtcclxudmFyIGRvbV8xID0gcmVxdWlyZShcIi4uL2RvbVwiKTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIHRvIHBsYXkvcmVwbGF5IGEgdmlkZW8uXHJcbiAqL1xyXG52YXIgSHVnZVJlcGxheUJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoSHVnZVJlcGxheUJ1dHRvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEh1Z2VSZXBsYXlCdXR0b24oY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IF90aGlzLm1lcmdlQ29uZmlnKGNvbmZpZywge1xyXG4gICAgICAgICAgICBjc3NDbGFzczogJ3VpLWh1Z2VyZXBsYXlidXR0b24nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnUmVwbGF5J1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgSHVnZVJlcGxheUJ1dHRvbi5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5wbGF5KCd1aS1vdmVybGF5Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHVnZVJlcGxheUJ1dHRvbi5wcm90b3R5cGUudG9Eb21FbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBidXR0b25FbGVtZW50ID0gX3N1cGVyLnByb3RvdHlwZS50b0RvbUVsZW1lbnQuY2FsbCh0aGlzKTtcclxuICAgICAgICAvLyBBZGQgY2hpbGQgdGhhdCBjb250YWlucyB0aGUgcGxheSBidXR0b24gaW1hZ2VcclxuICAgICAgICAvLyBTZXR0aW5nIHRoZSBpbWFnZSBkaXJlY3RseSBvbiB0aGUgYnV0dG9uIGRvZXMgbm90IHdvcmsgdG9nZXRoZXIgd2l0aCBzY2FsaW5nIGFuaW1hdGlvbnMsIGJlY2F1c2UgdGhlIGJ1dHRvblxyXG4gICAgICAgIC8vIGNhbiBjb3ZlciB0aGUgd2hvbGUgdmlkZW8gcGxheWVyIGFyZSBhbmQgc2NhbGluZyB3b3VsZCBleHRlbmQgaXQgYmV5b25kLiBCeSBhZGRpbmcgYW4gaW5uZXIgZWxlbWVudCwgY29uZmluZWRcclxuICAgICAgICAvLyB0byB0aGUgc2l6ZSBpZiB0aGUgaW1hZ2UsIGl0IGNhbiBzY2FsZSBpbnNpZGUgdGhlIHBsYXllciB3aXRob3V0IG92ZXJzaG9vdGluZy5cclxuICAgICAgICBidXR0b25FbGVtZW50LmFwcGVuZChuZXcgZG9tXzEuRE9NKCdkaXYnLCB7XHJcbiAgICAgICAgICAgICdjbGFzcyc6IHRoaXMucHJlZml4Q3NzKCdpbWFnZScpXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHJldHVybiBidXR0b25FbGVtZW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIdWdlUmVwbGF5QnV0dG9uO1xyXG59KGJ1dHRvbl8xLkJ1dHRvbikpO1xyXG5leHBvcnRzLkh1Z2VSZXBsYXlCdXR0b24gPSBIdWdlUmVwbGF5QnV0dG9uO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy9odWdlcmVwbGF5YnV0dG9uLnRzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50XCIpO1xyXG52YXIgZXZlbnRkaXNwYXRjaGVyXzEgPSByZXF1aXJlKFwiLi4vZXZlbnRkaXNwYXRjaGVyXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxudmFyIExpc3RTZWxlY3RvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTGlzdFNlbGVjdG9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTGlzdFNlbGVjdG9yKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5saXN0U2VsZWN0b3JFdmVudHMgPSB7XHJcbiAgICAgICAgICAgIG9uSXRlbUFkZGVkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uSXRlbVJlbW92ZWQ6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25JdGVtU2VsZWN0ZWQ6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS1saXN0c2VsZWN0b3InXHJcbiAgICAgICAgfSwgX3RoaXMuY29uZmlnKTtcclxuICAgICAgICBfdGhpcy5pdGVtcyA9IF90aGlzLmNvbmZpZy5pdGVtcztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBMaXN0U2VsZWN0b3IucHJvdG90eXBlLmdldEl0ZW1JbmRleCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLml0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHRoaXMuaXRlbXNbaW5kZXhdLmtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIHNwZWNpZmllZCBpdGVtIGlzIHBhcnQgb2YgdGhpcyBzZWxlY3Rvci5cclxuICAgICAqIEBwYXJhbSBrZXkgdGhlIGtleSBvZiB0aGUgaXRlbSB0byBjaGVja1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGl0ZW0gaXMgcGFydCBvZiB0aGlzIHNlbGVjdG9yLCBlbHNlIGZhbHNlXHJcbiAgICAgKi9cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUuaGFzSXRlbSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtSW5kZXgoa2V5KSA+IC0xO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBpdGVtIHRvIHRoaXMgc2VsZWN0b3IgYnkgYXBwZW5kaW5nIGl0IHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgaXRlbXMuIElmIGFuIGl0ZW0gd2l0aCB0aGUgc3BlY2lmaWVkXHJcbiAgICAgKiBrZXkgYWxyZWFkeSBleGlzdHMsIGl0IGlzIHJlcGxhY2VkLlxyXG4gICAgICogQHBhcmFtIGtleSB0aGUga2V5IG9mIHRoZSBpdGVtIHRvIGFkZFxyXG4gICAgICogQHBhcmFtIGxhYmVsIHRoZSAoaHVtYW4tcmVhZGFibGUpIGxhYmVsIG9mIHRoZSBpdGVtIHRvIGFkZFxyXG4gICAgICovXHJcbiAgICBMaXN0U2VsZWN0b3IucHJvdG90eXBlLmFkZEl0ZW0gPSBmdW5jdGlvbiAoa2V5LCBsYWJlbCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlSXRlbShrZXkpOyAvLyBUcnkgdG8gcmVtb3ZlIGtleSBmaXJzdCB0byBnZXQgb3ZlcndyaXRlIGJlaGF2aW9yIGFuZCBhdm9pZCBkdXBsaWNhdGUga2V5c1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7IGtleToga2V5LCBsYWJlbDogbGFiZWwgfSk7XHJcbiAgICAgICAgdGhpcy5vbkl0ZW1BZGRlZEV2ZW50KGtleSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGlzIHNlbGVjdG9yLlxyXG4gICAgICogQHBhcmFtIGtleSB0aGUga2V5IG9mIHRoZSBpdGVtIHRvIHJlbW92ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgcmVtb3ZhbCB3YXMgc3VjY2Vzc2Z1bCwgZmFsc2UgaWYgdGhlIGl0ZW0gaXMgbm90IHBhcnQgb2YgdGhpcyBzZWxlY3RvclxyXG4gICAgICovXHJcbiAgICBMaXN0U2VsZWN0b3IucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoa2V5KTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB1dGlsc18xLkFycmF5VXRpbHMucmVtb3ZlKHRoaXMuaXRlbXMsIHRoaXMuaXRlbXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5vbkl0ZW1SZW1vdmVkRXZlbnQoa2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdHMgYW4gaXRlbSBmcm9tIHRoZSBpdGVtcyBpbiB0aGlzIHNlbGVjdG9yLlxyXG4gICAgICogQHBhcmFtIGtleSB0aGUga2V5IG9mIHRoZSBpdGVtIHRvIHNlbGVjdFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaXMgdGhlIHNlbGVjdGlvbiB3YXMgc3VjY2Vzc2Z1bCwgZmFsc2UgaWYgdGhlIHNlbGVjdGVkIGl0ZW0gaXMgbm90IHBhcnQgb2YgdGhlIHNlbGVjdG9yXHJcbiAgICAgKi9cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSB0aGlzLnNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgICAgICAvLyBpdGVtQ29uZmlnIGlzIGFscmVhZHkgc2VsZWN0ZWQsIHN1cHByZXNzIGFueSBmdXJ0aGVyIGFjdGlvblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoa2V5KTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGtleTtcclxuICAgICAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZEV2ZW50KGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBrZXkgb2YgdGhlIHNlbGVjdGVkIGl0ZW0uXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUga2V5IG9mIHRoZSBzZWxlY3RlZCBpdGVtIG9yIG51bGwgaWYgbm8gaXRlbSBpcyBzZWxlY3RlZFxyXG4gICAgICovXHJcbiAgICBMaXN0U2VsZWN0b3IucHJvdG90eXBlLmdldFNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW07XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIHRoaXMgc2VsZWN0b3IuXHJcbiAgICAgKi9cclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUuY2xlYXJJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLml0ZW1zOyAvLyBsb2NhbCBjb3B5IGZvciBpdGVyYXRpb24gYWZ0ZXIgY2xlYXJcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107IC8vIGNsZWFyIGl0ZW1zXHJcbiAgICAgICAgLy8gZmlyZSBldmVudHNcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGl0ZW1zXzEgPSBpdGVtczsgX2kgPCBpdGVtc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zXzFbX2ldO1xyXG4gICAgICAgICAgICB0aGlzLm9uSXRlbVJlbW92ZWRFdmVudChpdGVtLmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIHRoaXMgc2VsZWN0b3IuXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBMaXN0U2VsZWN0b3IucHJvdG90eXBlLml0ZW1Db3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5pdGVtcykubGVuZ3RoO1xyXG4gICAgfTtcclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUub25JdGVtQWRkZWRFdmVudCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB0aGlzLmxpc3RTZWxlY3RvckV2ZW50cy5vbkl0ZW1BZGRlZC5kaXNwYXRjaCh0aGlzLCBrZXkpO1xyXG4gICAgfTtcclxuICAgIExpc3RTZWxlY3Rvci5wcm90b3R5cGUub25JdGVtUmVtb3ZlZEV2ZW50ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHRoaXMubGlzdFNlbGVjdG9yRXZlbnRzLm9uSXRlbVJlbW92ZWQuZGlzcGF0Y2godGhpcywga2V5KTtcclxuICAgIH07XHJcbiAgICBMaXN0U2VsZWN0b3IucHJvdG90eXBlLm9uSXRlbVNlbGVjdGVkRXZlbnQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdGhpcy5saXN0U2VsZWN0b3JFdmVudHMub25JdGVtU2VsZWN0ZWQuZGlzcGF0Y2godGhpcywga2V5KTtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGlzdFNlbGVjdG9yLnByb3RvdHlwZSwgXCJvbkl0ZW1BZGRlZFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIGFuIGl0ZW0gaXMgYWRkZWQgdG8gdGhlIGxpc3Qgb2YgaXRlbXMuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50PExpc3RTZWxlY3RvcjxDb25maWc+LCBzdHJpbmc+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0U2VsZWN0b3JFdmVudHMub25JdGVtQWRkZWQuZ2V0RXZlbnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaXN0U2VsZWN0b3IucHJvdG90eXBlLCBcIm9uSXRlbVJlbW92ZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiBhbiBpdGVtIGlzIHJlbW92ZWQgZnJvbSB0aGUgbGlzdCBvZiBpdGVtcy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8TGlzdFNlbGVjdG9yPENvbmZpZz4sIHN0cmluZz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RTZWxlY3RvckV2ZW50cy5vbkl0ZW1SZW1vdmVkLmdldEV2ZW50KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGlzdFNlbGVjdG9yLnByb3RvdHlwZSwgXCJvbkl0ZW1TZWxlY3RlZFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUgZXZlbnQgdGhhdCBpcyBmaXJlZCB3aGVuIGFuIGl0ZW0gaXMgc2VsZWN0ZWQgZnJvbSB0aGUgbGlzdCBvZiBpdGVtcy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnQ8TGlzdFNlbGVjdG9yPENvbmZpZz4sIHN0cmluZz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RTZWxlY3RvckV2ZW50cy5vbkl0ZW1TZWxlY3RlZC5nZXRFdmVudCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIExpc3RTZWxlY3RvcjtcclxufShjb21wb25lbnRfMS5Db21wb25lbnQpKTtcclxuZXhwb3J0cy5MaXN0U2VsZWN0b3IgPSBMaXN0U2VsZWN0b3I7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL2xpc3RzZWxlY3Rvci50c1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRhaW5lclwiKTtcclxudmFyIG1ldGFkYXRhbGFiZWxfMSA9IHJlcXVpcmUoXCIuL21ldGFkYXRhbGFiZWxcIik7XHJcbi8qKlxyXG4gKiBEaXNwbGF5cyBhIHRpdGxlIGJhciBjb250YWluaW5nIGEgbGFiZWwgd2l0aCB0aGUgdGl0bGUgb2YgdGhlIHZpZGVvLlxyXG4gKi9cclxudmFyIFRpdGxlQmFyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhUaXRsZUJhciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRpdGxlQmFyKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBfdGhpcy5tZXJnZUNvbmZpZyhjb25maWcsIHtcclxuICAgICAgICAgICAgY3NzQ2xhc3M6ICd1aS10aXRsZWJhcicsXHJcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29tcG9uZW50czogW1xyXG4gICAgICAgICAgICAgICAgbmV3IG1ldGFkYXRhbGFiZWxfMS5NZXRhZGF0YUxhYmVsKHsgY29udGVudDogbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWxDb250ZW50LlRpdGxlIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IG1ldGFkYXRhbGFiZWxfMS5NZXRhZGF0YUxhYmVsKHsgY29udGVudDogbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWxDb250ZW50LkRlc2NyaXB0aW9uIH0pXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGtlZXBIaWRkZW5XaXRob3V0TWV0YWRhdGE6IGZhbHNlLFxyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgVGl0bGVCYXIucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwbGF5ZXIsIHVpbWFuYWdlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBwbGF5ZXIsIHVpbWFuYWdlcik7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICAgICAgdmFyIHNob3VsZEJlU2hvd24gPSAhdGhpcy5pc0hpZGRlbigpO1xyXG4gICAgICAgIHZhciBoYXNNZXRhZGF0YVRleHQgPSB0cnVlOyAvLyBGbGFnIHRvIHRyYWNrIGlmIGFueSBtZXRhZGF0YSBsYWJlbCBjb250YWlucyB0ZXh0XHJcbiAgICAgICAgdmFyIGNoZWNrTWV0YWRhdGFUZXh0QW5kVXBkYXRlVmlzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaGFzTWV0YWRhdGFUZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBtZXRhZGF0YSBsYWJlbHMgYW5kIGNoZWNrIGlmIGF0IGxlYXN0IG9uZSBvZiB0aGVtIGNvbnRhaW5zIHRleHRcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IF90aGlzLmdldENvbXBvbmVudHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzTWV0YWRhdGFUZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5pc1Nob3duKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIEhpZGUgYSB2aXNpYmxlIHRpdGxlYmFyIGlmIGl0IGRvZXMgbm90IGNvbnRhaW4gYW55IHRleHQgYW5kIHRoZSBoaWRkZW4gZmxhZyBpcyBzZXRcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWcua2VlcEhpZGRlbldpdGhvdXRNZXRhZGF0YSAmJiAhaGFzTWV0YWRhdGFUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNob3VsZEJlU2hvd24pIHtcclxuICAgICAgICAgICAgICAgIC8vIFNob3cgYSBoaWRkZW4gdGl0bGViYXIgaWYgaXQgc2hvdWxkIGFjdHVhbGx5IGJlIHNob3duXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIExpc3RlbiB0byB0ZXh0IGNoYW5nZSBldmVudHMgdG8gdXBkYXRlIHRoZSBoYXNNZXRhZGF0YVRleHQgZmxhZyB3aGVuIHRoZSBtZXRhZGF0YSBkeW5hbWljYWxseSBjaGFuZ2VzXHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuZ2V0Q29tcG9uZW50cygpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgbWV0YWRhdGFsYWJlbF8xLk1ldGFkYXRhTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5vblRleHRDaGFuZ2VkLnN1YnNjcmliZShjaGVja01ldGFkYXRhVGV4dEFuZFVwZGF0ZVZpc2liaWxpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVpbWFuYWdlci5vbkNvbnRyb2xzU2hvdy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG91bGRCZVNob3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCEoY29uZmlnLmtlZXBIaWRkZW5XaXRob3V0TWV0YWRhdGEgJiYgIWhhc01ldGFkYXRhVGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHVpbWFuYWdlci5vbkNvbnRyb2xzSGlkZS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaG91bGRCZVNob3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgIF90aGlzLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBpbml0XHJcbiAgICAgICAgY2hlY2tNZXRhZGF0YVRleHRBbmRVcGRhdGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRpdGxlQmFyO1xyXG59KGNvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xyXG5leHBvcnRzLlRpdGxlQmFyID0gVGl0bGVCYXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3RpdGxlYmFyLnRzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50XCIpO1xyXG52YXIgZG9tXzEgPSByZXF1aXJlKFwiLi4vZG9tXCIpO1xyXG4vKipcclxuICogQW5pbWF0ZWQgYW5hbG9nIFRWIHN0YXRpYyBub2lzZS5cclxuICovXHJcbnZhciBUdk5vaXNlQ2FudmFzID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhUdk5vaXNlQ2FudmFzLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVHZOb2lzZUNhbnZhcyhjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY2FudmFzV2lkdGggPSAxNjA7XHJcbiAgICAgICAgX3RoaXMuY2FudmFzSGVpZ2h0ID0gOTA7XHJcbiAgICAgICAgX3RoaXMuaW50ZXJmZXJlbmNlSGVpZ2h0ID0gNTA7XHJcbiAgICAgICAgX3RoaXMubGFzdEZyYW1lVXBkYXRlID0gMDtcclxuICAgICAgICBfdGhpcy5mcmFtZUludGVydmFsID0gNjA7XHJcbiAgICAgICAgX3RoaXMudXNlQW5pbWF0aW9uRnJhbWUgPSAhIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktdHZub2lzZWNhbnZhcydcclxuICAgICAgICB9LCBfdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFR2Tm9pc2VDYW52YXMucHJvdG90eXBlLnRvRG9tRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMgPSBuZXcgZG9tXzEuRE9NKCdjYW52YXMnLCB7ICdjbGFzcyc6IHRoaXMuZ2V0Q3NzQ2xhc3NlcygpIH0pO1xyXG4gICAgfTtcclxuICAgIFR2Tm9pc2VDYW52YXMucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzRWxlbWVudCA9IHRoaXMuY2FudmFzLmdldEVsZW1lbnRzKClbMF07XHJcbiAgICAgICAgdGhpcy5jYW52YXNDb250ZXh0ID0gdGhpcy5jYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5ub2lzZUFuaW1hdGlvbldpbmRvd1BvcyA9IC10aGlzLmNhbnZhc0hlaWdodDtcclxuICAgICAgICB0aGlzLmxhc3RGcmFtZVVwZGF0ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jYW52YXNFbGVtZW50LndpZHRoID0gdGhpcy5jYW52YXNXaWR0aDtcclxuICAgICAgICB0aGlzLmNhbnZhc0VsZW1lbnQuaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGcmFtZSgpO1xyXG4gICAgfTtcclxuICAgIFR2Tm9pc2VDYW52YXMucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlQW5pbWF0aW9uRnJhbWUpIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZVVwZGF0ZUhhbmRsZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mcmFtZVVwZGF0ZUhhbmRsZXJJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFR2Tm9pc2VDYW52YXMucHJvdG90eXBlLnJlbmRlckZyYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSBoYXMgYmVlbiBjb3BpZWQgZnJvbSB0aGUgcGxheWVyIGNvbnRyb2xzLmpzIGFuZCBzaW1wbGlmaWVkXHJcbiAgICAgICAgaWYgKHRoaXMubGFzdEZyYW1lVXBkYXRlICsgdGhpcy5mcmFtZUludGVydmFsID4gbmV3IERhdGUoKS5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgLy8gSXQncyB0b28gZWFybHkgdG8gcmVuZGVyIHRoZSBuZXh0IGZyYW1lXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVOZXh0UmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRQaXhlbE9mZnNldDtcclxuICAgICAgICB2YXIgY2FudmFzV2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xyXG4gICAgICAgIHZhciBjYW52YXNIZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcclxuICAgICAgICAvLyBDcmVhdGUgdGV4dHVyZVxyXG4gICAgICAgIHZhciBub2lzZUltYWdlID0gdGhpcy5jYW52YXNDb250ZXh0LmNyZWF0ZUltYWdlRGF0YShjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcclxuICAgICAgICAvLyBGaWxsIHRleHR1cmUgd2l0aCBub2lzZVxyXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgY2FudmFzSGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBjYW52YXNXaWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UGl4ZWxPZmZzZXQgPSAoY2FudmFzV2lkdGggKiB5ICogNCkgKyB4ICogNDtcclxuICAgICAgICAgICAgICAgIG5vaXNlSW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxPZmZzZXRdID0gTWF0aC5yYW5kb20oKSAqIDI1NTtcclxuICAgICAgICAgICAgICAgIGlmICh5IDwgdGhpcy5ub2lzZUFuaW1hdGlvbldpbmRvd1BvcyB8fCB5ID4gdGhpcy5ub2lzZUFuaW1hdGlvbldpbmRvd1BvcyArIHRoaXMuaW50ZXJmZXJlbmNlSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9pc2VJbWFnZS5kYXRhW2N1cnJlbnRQaXhlbE9mZnNldF0gKj0gMC44NTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vaXNlSW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxPZmZzZXQgKyAxXSA9IG5vaXNlSW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxPZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgbm9pc2VJbWFnZS5kYXRhW2N1cnJlbnRQaXhlbE9mZnNldCArIDJdID0gbm9pc2VJbWFnZS5kYXRhW2N1cnJlbnRQaXhlbE9mZnNldF07XHJcbiAgICAgICAgICAgICAgICBub2lzZUltYWdlLmRhdGFbY3VycmVudFBpeGVsT2Zmc2V0ICsgM10gPSA1MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBQdXQgdGV4dHVyZSBvbnRvIGNhbnZhc1xyXG4gICAgICAgIHRoaXMuY2FudmFzQ29udGV4dC5wdXRJbWFnZURhdGEobm9pc2VJbWFnZSwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5sYXN0RnJhbWVVcGRhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLm5vaXNlQW5pbWF0aW9uV2luZG93UG9zICs9IDc7XHJcbiAgICAgICAgaWYgKHRoaXMubm9pc2VBbmltYXRpb25XaW5kb3dQb3MgPiBjYW52YXNIZWlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2lzZUFuaW1hdGlvbldpbmRvd1BvcyA9IC1jYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVOZXh0UmVuZGVyKCk7XHJcbiAgICB9O1xyXG4gICAgVHZOb2lzZUNhbnZhcy5wcm90b3R5cGUuc2NoZWR1bGVOZXh0UmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZUFuaW1hdGlvbkZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVVcGRhdGVIYW5kbGVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyRnJhbWUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lVXBkYXRlSGFuZGxlcklkID0gc2V0VGltZW91dCh0aGlzLnJlbmRlckZyYW1lLmJpbmQodGhpcyksIHRoaXMuZnJhbWVJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBUdk5vaXNlQ2FudmFzO1xyXG59KGNvbXBvbmVudF8xLkNvbXBvbmVudCkpO1xyXG5leHBvcnRzLlR2Tm9pc2VDYW52YXMgPSBUdk5vaXNlQ2FudmFzO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy90dm5vaXNlY2FudmFzLnRzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHNlbGVjdGJveF8xID0gcmVxdWlyZShcIi4vc2VsZWN0Ym94XCIpO1xyXG4vKipcclxuICogQSBzZWxlY3QgYm94IHByb3ZpZGluZyBhIHNlbGVjdGlvbiBiZXR3ZWVuICdhdXRvJyBhbmQgdGhlIGF2YWlsYWJsZSB2aWRlbyBxdWFsaXRpZXMuXHJcbiAqL1xyXG52YXIgVmlkZW9RdWFsaXR5U2VsZWN0Qm94ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWaWRlb1F1YWxpdHlTZWxlY3RCb3gsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWaWRlb1F1YWxpdHlTZWxlY3RCb3goY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFZpZGVvUXVhbGl0eVNlbGVjdEJveC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHBsYXllciwgdWltYW5hZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIHBsYXllciwgdWltYW5hZ2VyKTtcclxuICAgICAgICB2YXIgdXBkYXRlVmlkZW9RdWFsaXRpZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1F1YWxpdGllcyA9IHBsYXllci5nZXRBdmFpbGFibGVWaWRlb1F1YWxpdGllcygpO1xyXG4gICAgICAgICAgICBfdGhpcy5jbGVhckl0ZW1zKCk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBlbnRyeSBmb3IgYXV0b21hdGljIHF1YWxpdHkgc3dpdGNoaW5nIChkZWZhdWx0IHNldHRpbmcpXHJcbiAgICAgICAgICAgIF90aGlzLmFkZEl0ZW0oJ2F1dG8nLCAnYXV0bycpO1xyXG4gICAgICAgICAgICAvLyBBZGQgdmlkZW8gcXVhbGl0aWVzXHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgdmlkZW9RdWFsaXRpZXNfMSA9IHZpZGVvUXVhbGl0aWVzOyBfaSA8IHZpZGVvUXVhbGl0aWVzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9RdWFsaXR5ID0gdmlkZW9RdWFsaXRpZXNfMVtfaV07XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRJdGVtKHZpZGVvUXVhbGl0eS5pZCwgdmlkZW9RdWFsaXR5LmxhYmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkl0ZW1TZWxlY3RlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKHNlbmRlciwgdmFsdWUpIHtcclxuICAgICAgICAgICAgcGxheWVyLnNldFZpZGVvUXVhbGl0eSh2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHF1YWxpdGllcyB3aGVuIHNvdXJjZSBnb2VzIGF3YXlcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRIYW5kbGVyKHBsYXllci5FVkVOVC5PTl9TT1VSQ0VfVU5MT0FERUQsIHVwZGF0ZVZpZGVvUXVhbGl0aWVzKTtcclxuICAgICAgICAvLyBVcGRhdGUgcXVhbGl0aWVzIHdoZW4gYSBuZXcgc291cmNlIGlzIGxvYWRlZFxyXG4gICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIocGxheWVyLkVWRU5ULk9OX1JFQURZLCB1cGRhdGVWaWRlb1F1YWxpdGllcyk7XHJcbiAgICAgICAgLy8gVXBkYXRlIHF1YWxpdHkgc2VsZWN0aW9uIHdoZW4gcXVhbGl0eSBpcyBjaGFuZ2VkIChmcm9tIG91dHNpZGUpXHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50SGFuZGxlcihwbGF5ZXIuRVZFTlQuT05fVklERU9fRE9XTkxPQURfUVVBTElUWV9DSEFOR0UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBwbGF5ZXIuZ2V0RG93bmxvYWRlZFZpZGVvRGF0YSgpO1xyXG4gICAgICAgICAgICBfdGhpcy5zZWxlY3RJdGVtKGRhdGEuaXNBdXRvID8gJ2F1dG8nIDogZGF0YS5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gUG9wdWxhdGUgcXVhbGl0aWVzIGF0IHN0YXJ0dXBcclxuICAgICAgICB1cGRhdGVWaWRlb1F1YWxpdGllcygpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWaWRlb1F1YWxpdHlTZWxlY3RCb3g7XHJcbn0oc2VsZWN0Ym94XzEuU2VsZWN0Qm94KSk7XHJcbmV4cG9ydHMuVmlkZW9RdWFsaXR5U2VsZWN0Qm94ID0gVmlkZW9RdWFsaXR5U2VsZWN0Qm94O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9saWIvY29tcG9uZW50cy92aWRlb3F1YWxpdHlzZWxlY3Rib3gudHNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY2xpY2tvdmVybGF5XzEgPSByZXF1aXJlKFwiLi9jbGlja292ZXJsYXlcIik7XHJcbi8qKlxyXG4gKiBBIHdhdGVybWFyayBvdmVybGF5IHdpdGggYSBjbGlja2FibGUgbG9nby5cclxuICovXHJcbnZhciBXYXRlcm1hcmsgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFdhdGVybWFyaywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFdhdGVybWFyayhjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gX3RoaXMubWVyZ2VDb25maWcoY29uZmlnLCB7XHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiAndWktd2F0ZXJtYXJrJyxcclxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cubW92aW5naW1hZ2UuY29tJ1xyXG4gICAgICAgIH0sIF90aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFdhdGVybWFyaztcclxufShjbGlja292ZXJsYXlfMS5DbGlja092ZXJsYXkpKTtcclxuZXhwb3J0cy5XYXRlcm1hcmsgPSBXYXRlcm1hcms7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL2xpYi9jb21wb25lbnRzL3dhdGVybWFyay50c1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEd1aWQ7XHJcbihmdW5jdGlvbiAoR3VpZCkge1xyXG4gICAgdmFyIGd1aWQgPSAxO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICByZXR1cm4gZ3VpZCsrO1xyXG4gICAgfVxyXG4gICAgR3VpZC5uZXh0ID0gbmV4dDtcclxufSkoR3VpZCA9IGV4cG9ydHMuR3VpZCB8fCAoZXhwb3J0cy5HdWlkID0ge30pKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL2d1aWQudHNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdWljb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdWljb250YWluZXJcIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcclxudmFyIGNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9jb21wb25lbnRcIik7XHJcbnZhciBjb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29udGFpbmVyXCIpO1xyXG52YXIgcGxheWJhY2t0b2dnbGVidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvcGxheWJhY2t0b2dnbGVidXR0b25cIik7XHJcbnZhciBzZWVrYmFyXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlZWtiYXJcIik7XHJcbnZhciBwbGF5YmFja3RpbWVsYWJlbF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9wbGF5YmFja3RpbWVsYWJlbFwiKTtcclxudmFyIGNvbnRyb2xiYXJfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvY29udHJvbGJhclwiKTtcclxudmFyIGV2ZW50ZGlzcGF0Y2hlcl8xID0gcmVxdWlyZShcIi4vZXZlbnRkaXNwYXRjaGVyXCIpO1xyXG52YXIgc2Vla2JhcmxhYmVsXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3NlZWtiYXJsYWJlbFwiKTtcclxudmFyIHZvbHVtZWNvbnRyb2xidXR0b25fMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdm9sdW1lY29udHJvbGJ1dHRvblwiKTtcclxudmFyIGVycm9ybWVzc2FnZW92ZXJsYXlfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZXJyb3JtZXNzYWdlb3ZlcmxheVwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxudmFyIGF1ZGlvb25seW92ZXJsYXlfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYXVkaW9vbmx5b3ZlcmxheVwiKTtcclxudmFyIHBsYXliYWNrdG9nZ2xlb3ZlcmxheV8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9wbGF5YmFja3RvZ2dsZW92ZXJsYXlcIik7XHJcbnZhciBVSU1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVUlNYW5hZ2VyKHBsYXllciwgcGxheWVyVWlPclVpVmFyaWFudHMsIGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHBsYXllclVpT3JVaVZhcmlhbnRzIGluc3RhbmNlb2YgdWljb250YWluZXJfMS5VSUNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAvLyBTaW5nbGUtVUkgY29uc3RydWN0b3IgaGFzIGJlZW4gY2FsbGVkLCB0cmFuc2Zvcm0gYXJndW1lbnRzIHRvIFVJVmFyaWFudFtdIHNpZ25hdHVyZVxyXG4gICAgICAgICAgICB2YXIgcGxheWVyVWkgPSBwbGF5ZXJVaU9yVWlWYXJpYW50cztcclxuICAgICAgICAgICAgdmFyIGFkc1VpID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHVpVmFyaWFudHMgPSBbXTtcclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBhZHMgVUkgaWYgZGVmaW5lZFxyXG4gICAgICAgICAgICBpZiAoYWRzVWkpIHtcclxuICAgICAgICAgICAgICAgIHVpVmFyaWFudHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdWk6IGFkc1VpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuaXNBZFdpdGhVSTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBkZWZhdWx0IHBsYXllciBVSVxyXG4gICAgICAgICAgICB1aVZhcmlhbnRzLnB1c2goeyB1aTogcGxheWVyVWkgfSk7XHJcbiAgICAgICAgICAgIHRoaXMudWlWYXJpYW50cyA9IHVpVmFyaWFudHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIChVSVZhcmlhbnRbXSkgaGFzIGJlZW4gY2FsbGVkXHJcbiAgICAgICAgICAgIHRoaXMudWlWYXJpYW50cyA9IHBsYXllclVpT3JVaVZhcmlhbnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbGF5ZXJXcmFwcGVyID0gbmV3IFBsYXllcldyYXBwZXIocGxheWVyKTtcclxuICAgICAgICB0aGlzLnBsYXllckVsZW1lbnQgPSBuZXcgZG9tXzEuRE9NKHBsYXllci5nZXRGaWd1cmUoKSk7XHJcbiAgICAgICAgLy8gQ3JlYXRlIFVJIGluc3RhbmNlIG1hbmFnZXJzIGZvciB0aGUgVUkgdmFyaWFudHNcclxuICAgICAgICAvLyBUaGUgaW5zdGFuY2UgbWFuYWdlcnMgbWFwIHRvIHRoZSBjb3JyZXNwb25kaW5nIFVJIHZhcmlhbnRzIGJ5IHRoZWlyIGFycmF5IGluZGV4XHJcbiAgICAgICAgdGhpcy51aUluc3RhbmNlTWFuYWdlcnMgPSBbXTtcclxuICAgICAgICB2YXIgdWlWYXJpYW50c1dpdGhvdXRDb25kaXRpb24gPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy51aVZhcmlhbnRzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgdWlWYXJpYW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAodWlWYXJpYW50LmNvbmRpdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb2xsZWN0IHZhcmlhbnRzIHdpdGhvdXQgY29uZGl0aW9ucyBmb3IgZXJyb3IgY2hlY2tpbmdcclxuICAgICAgICAgICAgICAgIHVpVmFyaWFudHNXaXRob3V0Q29uZGl0aW9uLnB1c2godWlWYXJpYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGluc3RhbmNlIG1hbmFnZXIgZm9yIGEgVUkgdmFyaWFudFxyXG4gICAgICAgICAgICB0aGlzLnVpSW5zdGFuY2VNYW5hZ2Vycy5wdXNoKG5ldyBJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyKHBsYXllciwgdWlWYXJpYW50LnVpLCB0aGlzLmNvbmZpZykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBvbmx5IG9uZSBVSSB2YXJpYW50IHdpdGhvdXQgYSBjb25kaXRpb25cclxuICAgICAgICAvLyBJdCBkb2VzIG5vdCBtYWtlIHNlbnNlIHRvIGhhdmUgbXVsdGlwbGUgdmFyaWFudHMgd2l0aG91dCBjb25kaXRpb24sIGJlY2F1c2Ugb25seSB0aGUgZmlyc3Qgb25lIGluIHRoZSBsaXN0XHJcbiAgICAgICAgLy8gKHRoZSBvbmUgd2l0aCB0aGUgbG93ZXN0IGluZGV4KSB3aWxsIGV2ZXIgYmUgc2VsZWN0ZWQuXHJcbiAgICAgICAgaWYgKHVpVmFyaWFudHNXaXRob3V0Q29uZGl0aW9uLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RvbyBtYW55IFVJcyB3aXRob3V0IGEgY29uZGl0aW9uOiBZb3UgY2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBkZWZhdWx0IFVJJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBkZWZhdWx0IFVJIHZhcmlhbnQsIGlmIGRlZmluZWQsIGlzIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3QgKGxhc3QgaW5kZXgpXHJcbiAgICAgICAgLy8gSWYgaXQgY29tZXMgZWFybGllciwgdGhlIHZhcmlhbnRzIHdpdGggY29uZGl0aW9ucyB0aGF0IGNvbWUgYWZ0ZXJ3YXJkcyB3aWxsIG5ldmVyIGJlIHNlbGVjdGVkIGJlY2F1c2UgdGhlXHJcbiAgICAgICAgLy8gZGVmYXVsdCB2YXJpYW50IHdpdGhvdXQgYSBjb25kaXRpb24gYWx3YXlzIGV2YWx1YXRlcyB0byAndHJ1ZSdcclxuICAgICAgICBpZiAodWlWYXJpYW50c1dpdGhvdXRDb25kaXRpb24ubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAmJiB1aVZhcmlhbnRzV2l0aG91dENvbmRpdGlvblswXSAhPT0gdGhpcy51aVZhcmlhbnRzW3RoaXMudWlWYXJpYW50cy5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBVSSB2YXJpYW50IG9yZGVyOiB0aGUgZGVmYXVsdCBVSSAod2l0aG91dCBjb25kaXRpb24pIG11c3QgYmUgYXQgdGhlIGVuZCBvZiB0aGUgbGlzdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYWRTdGFydGVkRXZlbnQgPSBudWxsOyAvLyBrZWVwIHRoZSBldmVudCBzdG9yZWQgaGVyZSBkdXJpbmcgYWQgcGxheWJhY2tcclxuICAgICAgICB2YXIgaXNNb2JpbGUgPSB1dGlsc18xLkJyb3dzZXJVdGlscy5pc01vYmlsZTtcclxuICAgICAgICAvLyBEeW5hbWljYWxseSBzZWxlY3QgYSBVSSB2YXJpYW50IHRoYXQgbWF0Y2hlcyB0aGUgY3VycmVudCBVSSBjb25kaXRpb24uXHJcbiAgICAgICAgdmFyIHJlc29sdmVVaVZhcmlhbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIE9OX0FEX1NUQVJURUQgZXZlbnQgZGF0YSBpcyBwZXJzaXN0ZWQgdGhyb3VnaCBhZCBwbGF5YmFjayBpbiBjYXNlIG90aGVyIGV2ZW50cyBoYXBwZW5cclxuICAgICAgICAgICAgLy8gaW4gdGhlIG1lYW50aW1lLCBlLmcuIHBsYXllciByZXNpemUuIFdlIG5lZWQgdG8gc3RvcmUgdGhpcyBkYXRhIGJlY2F1c2UgdGhlcmUgaXMgbm8gb3RoZXIgd2F5IHRvIGZpbmQgb3V0XHJcbiAgICAgICAgICAgIC8vIGFkIGRldGFpbHMgKGUuZy4gdGhlIGFkIGNsaWVudCkgd2hpbGUgYW4gYWQgaXMgcGxheWluZy5cclxuICAgICAgICAgICAgLy8gRXhpc3RpbmcgZXZlbnQgZGF0YSBzaWduYWxzIHRoYXQgYW4gYWQgaXMgY3VycmVudGx5IGFjdGl2ZS4gV2UgY2Fubm90IHVzZSBwbGF5ZXIuaXNBZCgpIGJlY2F1c2UgaXQgcmV0dXJuc1xyXG4gICAgICAgICAgICAvLyB0cnVlIG9uIGFkIHN0YXJ0IGFuZCBhbHNvIG9uIGFkIGVuZCBldmVudHMsIHdoaWNoIGlzIHByb2JsZW1hdGljLlxyXG4gICAgICAgICAgICBpZiAoZXZlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgYWQgc3RhcnRzLCB3ZSBzdG9yZSB0aGUgZXZlbnQgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyLkVWRU5ULk9OX0FEX1NUQVJURUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkU3RhcnRlZEV2ZW50ID0gZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIGFkIGVuZHMsIHdlIGRlbGV0ZSB0aGUgZXZlbnQgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyLkVWRU5ULk9OX0FEX0ZJTklTSEVEOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyLkVWRU5ULk9OX0FEX1NLSVBQRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBwbGF5ZXIuRVZFTlQuT05fQURfRVJST1I6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkU3RhcnRlZEV2ZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBEZXRlY3QgaWYgYW4gYWQgaGFzIHN0YXJ0ZWRcclxuICAgICAgICAgICAgdmFyIGFkID0gYWRTdGFydGVkRXZlbnQgIT0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGFkV2l0aFVJID0gYWQgJiYgYWRTdGFydGVkRXZlbnQuY2xpZW50VHlwZSA9PT0gJ3Zhc3QnO1xyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgY29udGV4dCBmb3Igd2hpY2ggdGhlIFVJIHZhcmlhbnQgd2lsbCBiZSByZXNvbHZlZFxyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHtcclxuICAgICAgICAgICAgICAgIGlzQWQ6IGFkLFxyXG4gICAgICAgICAgICAgICAgaXNBZFdpdGhVSTogYWRXaXRoVUksXHJcbiAgICAgICAgICAgICAgICBpc0Z1bGxzY3JlZW46IF90aGlzLnBsYXllci5pc0Z1bGxzY3JlZW4oKSxcclxuICAgICAgICAgICAgICAgIGlzTW9iaWxlOiBpc01vYmlsZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBfdGhpcy5wbGF5ZXJFbGVtZW50LndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudFdpZHRoOiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgbmV4dFVpID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIHVpVmFyaWFudENoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gU2VsZWN0IG5ldyBVSSB2YXJpYW50XHJcbiAgICAgICAgICAgIC8vIElmIG5vIHZhcmlhbnQgY29uZGl0aW9uIGlzIGZ1bGZpbGxlZCwgd2Ugc3dpdGNoIHRvICpubyogVUlcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IF90aGlzLnVpVmFyaWFudHM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdWlWYXJpYW50ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVpVmFyaWFudC5jb25kaXRpb24gPT0gbnVsbCB8fCB1aVZhcmlhbnQuY29uZGl0aW9uKGNvbnRleHQpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFVpID0gX3RoaXMudWlJbnN0YW5jZU1hbmFnZXJzW190aGlzLnVpVmFyaWFudHMuaW5kZXhPZih1aVZhcmlhbnQpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIFVJIHZhcmlhbnQgaXMgY2hhbmdpbmdcclxuICAgICAgICAgICAgaWYgKG5leHRVaSAhPT0gX3RoaXMuY3VycmVudFVpKSB7XHJcbiAgICAgICAgICAgICAgICB1aVZhcmlhbnRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzd2l0Y2hlZCBmcm9tICcsIHRoaXMuY3VycmVudFVpID8gdGhpcy5jdXJyZW50VWkuZ2V0VUkoKSA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIC8vICAgJyB0byAnLCBuZXh0VWkgPyBuZXh0VWkuZ2V0VUkoKSA6ICdub25lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gT25seSBpZiB0aGUgVUkgdmFyaWFudCBpcyBjaGFuZ2luZywgd2UgbmVlZCB0byBkbyBzb21lIHN0dWZmLiBFbHNlIHdlIGp1c3QgbGVhdmUgZXZlcnl0aGluZyBhcy1pcy5cclxuICAgICAgICAgICAgaWYgKHVpVmFyaWFudENoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEhpZGUgdGhlIGN1cnJlbnRseSBhY3RpdmUgVUkgdmFyaWFudFxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRVaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmN1cnJlbnRVaS5nZXRVSSgpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFzc2lnbiB0aGUgbmV3IFVJIHZhcmlhbnQgYXMgY3VycmVudCBVSVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuY3VycmVudFVpID0gbmV4dFVpO1xyXG4gICAgICAgICAgICAgICAgLy8gV2hlbiB3ZSBzd2l0Y2ggdG8gYSBkaWZmZXJlbnQgVUkgaW5zdGFuY2UsIHRoZXJlJ3Mgc29tZSBhZGRpdGlvbmFsIHN0dWZmIHRvIG1hbmFnZS4gSWYgd2UgZG8gbm90IHN3aXRjaFxyXG4gICAgICAgICAgICAgICAgLy8gdG8gYW4gaW5zdGFuY2UsIHdlJ3JlIGRvbmUgaGVyZS5cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jdXJyZW50VWkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgVUkgdG8gdGhlIERPTSAoYW5kIGNvbmZpZ3VyZSBpdCkgdGhlIGZpcnN0IHRpbWUgaXQgaXMgc2VsZWN0ZWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmN1cnJlbnRVaS5pc0NvbmZpZ3VyZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5hZGRVaShfdGhpcy5jdXJyZW50VWkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGFuIGFkIFVJLCB3ZSBuZWVkIHRvIHJlbGF5IHRoZSBzYXZlZCBPTl9BRF9TVEFSVEVEIGV2ZW50IGRhdGEgc28gYWQgY29tcG9uZW50cyBjYW4gY29uZmlndXJlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbXNlbHZlcyBmb3IgdGhlIGN1cnJlbnQgYWQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuaXNBZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBSZWxheSB0aGUgT05fQURfU1RBUlRFRCBldmVudCB0byB0aGUgYWRzIFVJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEJlY2F1c2UgdGhlIGFkcyBVSSBpcyBpbml0aWFsaXplZCBpbiB0aGUgT05fQURfU1RBUlRFRCBoYW5kbGVyLCBpLmUuIHdoZW4gdGhlIE9OX0FEX1NUQVJURUQgZXZlbnQgaGFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIGFscmVhZHkgYmVlbiBmaXJlZCwgY29tcG9uZW50cyBpbiB0aGUgYWRzIFVJIHRoYXQgbGlzdGVuIGZvciB0aGUgT05fQURfU1RBUlRFRCBldmVudCBuZXZlciByZWNlaXZlIGl0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBTaW5jZSB0aGlzIGNhbiBicmVhayBmdW5jdGlvbmFsaXR5IG9mIGNvbXBvbmVudHMgdGhhdCByZWx5IG9uIHRoaXMgZXZlbnQsIHdlIHJlbGF5IHRoZSBldmVudCB0byB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICogYWRzIFVJIGNvbXBvbmVudHMgd2l0aCB0aGUgZm9sbG93aW5nIGNhbGwuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jdXJyZW50VWkuZ2V0V3JhcHBlZFBsYXllcigpLmZpcmVFdmVudEluVUkoX3RoaXMucGxheWVyLkVWRU5ULk9OX0FEX1NUQVJURUQsIGFkU3RhcnRlZEV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY3VycmVudFVpLmdldFVJKCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIGZvbGxvd2luZyBldmVudHMgdG8gdHJpZ2dlciBVSSB2YXJpYW50IHJlc29sdXRpb25cclxuICAgICAgICB0aGlzLm1hbmFnZXJQbGF5ZXJXcmFwcGVyLmdldFBsYXllcigpLmFkZEV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9BRF9TVEFSVEVELCByZXNvbHZlVWlWYXJpYW50KTtcclxuICAgICAgICB0aGlzLm1hbmFnZXJQbGF5ZXJXcmFwcGVyLmdldFBsYXllcigpLmFkZEV2ZW50SGFuZGxlcih0aGlzLnBsYXllci5FVkVOVC5PTl9BRF9GSU5JU0hFRCwgcmVzb2x2ZVVpVmFyaWFudCk7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGxheWVyV3JhcHBlci5nZXRQbGF5ZXIoKS5hZGRFdmVudEhhbmRsZXIodGhpcy5wbGF5ZXIuRVZFTlQuT05fQURfU0tJUFBFRCwgcmVzb2x2ZVVpVmFyaWFudCk7XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGxheWVyV3JhcHBlci5nZXRQbGF5ZXIoKS5hZGRFdmVudEhhbmRsZXIodGhpcy5wbGF5ZXIuRVZFTlQuT05fQURfRVJST1IsIHJlc29sdmVVaVZhcmlhbnQpO1xyXG4gICAgICAgIHRoaXMubWFuYWdlclBsYXllcldyYXBwZXIuZ2V0UGxheWVyKCkuYWRkRXZlbnRIYW5kbGVyKHRoaXMucGxheWVyLkVWRU5ULk9OX1BMQVlFUl9SRVNJWkUsIHJlc29sdmVVaVZhcmlhbnQpO1xyXG4gICAgICAgIHRoaXMubWFuYWdlclBsYXllcldyYXBwZXIuZ2V0UGxheWVyKCkuYWRkRXZlbnRIYW5kbGVyKHRoaXMucGxheWVyLkVWRU5ULk9OX0ZVTExTQ1JFRU5fRU5URVIsIHJlc29sdmVVaVZhcmlhbnQpO1xyXG4gICAgICAgIHRoaXMubWFuYWdlclBsYXllcldyYXBwZXIuZ2V0UGxheWVyKCkuYWRkRXZlbnRIYW5kbGVyKHRoaXMucGxheWVyLkVWRU5ULk9OX0ZVTExTQ1JFRU5fRVhJVCwgcmVzb2x2ZVVpVmFyaWFudCk7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgVUlcclxuICAgICAgICByZXNvbHZlVWlWYXJpYW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgVUlNYW5hZ2VyLnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xyXG4gICAgfTtcclxuICAgIFVJTWFuYWdlci5wcm90b3R5cGUuYWRkVWkgPSBmdW5jdGlvbiAodWkpIHtcclxuICAgICAgICB2YXIgZG9tID0gdWkuZ2V0VUkoKS5nZXREb21FbGVtZW50KCk7XHJcbiAgICAgICAgdWkuY29uZmlndXJlQ29udHJvbHMoKTtcclxuICAgICAgICAvKiBBcHBlbmQgdGhlIFVJIERPTSBhZnRlciBjb25maWd1cmF0aW9uIHRvIGF2b2lkIENTUyB0cmFuc2l0aW9ucyBhdCBpbml0aWFsaXphdGlvblxyXG4gICAgICAgICAqIEV4YW1wbGU6IENvbXBvbmVudHMgYXJlIGhpZGRlbiBkdXJpbmcgY29uZmlndXJhdGlvbiBhbmQgdGhlc2UgaGlkZXMgbWF5IHRyaWdnZXIgQ1NTIHRyYW5zaXRpb25zIHRoYXQgYXJlXHJcbiAgICAgICAgICogdW5kZXNpcmFibGUgYXQgdGhpcyB0aW1lLiAqL1xyXG4gICAgICAgIHRoaXMucGxheWVyRWxlbWVudC5hcHBlbmQoZG9tKTtcclxuICAgICAgICAvLyBGaXJlIG9uQ29uZmlndXJlZCBhZnRlciBVSSBET00gZWxlbWVudHMgYXJlIHN1Y2Nlc3NmdWxseSBhZGRlZC4gV2hlbiBmaXJlZCBpbW1lZGlhdGVseSwgdGhlIERPTSBlbGVtZW50c1xyXG4gICAgICAgIC8vIG1pZ2h0IG5vdCBiZSBmdWxseSBjb25maWd1cmVkIGFuZCBlLmcuIGRvIG5vdCBoYXZlIGEgc2l6ZS5cclxuICAgICAgICAvLyBodHRwczovL3N3aXplYy5jb20vYmxvZy9ob3ctdG8tcHJvcGVybHktd2FpdC1mb3ItZG9tLWVsZW1lbnRzLXRvLXNob3ctdXAtaW4tbW9kZXJuLWJyb3dzZXJzL3N3aXplYy82NjYzXHJcbiAgICAgICAgaWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgdWkub25Db25maWd1cmVkLmRpc3BhdGNoKHVpLmdldFVJKCkpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIElFOSBmYWxsYmFja1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdWkub25Db25maWd1cmVkLmRpc3BhdGNoKHVpLmdldFVJKCkpOyB9LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgVUlNYW5hZ2VyLnByb3RvdHlwZS5yZWxlYXNlVWkgPSBmdW5jdGlvbiAodWkpIHtcclxuICAgICAgICB1aS5yZWxlYXNlQ29udHJvbHMoKTtcclxuICAgICAgICB1aS5nZXRVSSgpLmdldERvbUVsZW1lbnQoKS5yZW1vdmUoKTtcclxuICAgICAgICB1aS5jbGVhckV2ZW50SGFuZGxlcnMoKTtcclxuICAgIH07XHJcbiAgICBVSU1hbmFnZXIucHJvdG90eXBlLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudWlJbnN0YW5jZU1hbmFnZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgdWlJbnN0YW5jZU1hbmFnZXIgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZVVpKHVpSW5zdGFuY2VNYW5hZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYW5hZ2VyUGxheWVyV3JhcHBlci5jbGVhckV2ZW50SGFuZGxlcnMoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVUlNYW5hZ2VyO1xyXG59KCkpO1xyXG5leHBvcnRzLlVJTWFuYWdlciA9IFVJTWFuYWdlcjtcclxuKGZ1bmN0aW9uIChVSU1hbmFnZXIpIHtcclxuICAgIHZhciBGYWN0b3J5O1xyXG4gICAgKGZ1bmN0aW9uIChGYWN0b3J5KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRBdWRpb1ZpZGVvVUkocGxheWVyLCBjb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgICAgIHZhciBjb250cm9sQmFyID0gbmV3IGNvbnRyb2xiYXJfMS5Db250cm9sQmFyKHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgcGxheWJhY2t0b2dnbGVidXR0b25fMS5QbGF5YmFja1RvZ2dsZUJ1dHRvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzZWVrYmFyXzEuU2Vla0Jhcih7IGxhYmVsOiBuZXcgc2Vla2JhcmxhYmVsXzEuU2Vla0JhckxhYmVsKCkgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHBsYXliYWNrdGltZWxhYmVsXzEuUGxheWJhY2tUaW1lTGFiZWwoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgdm9sdW1lY29udHJvbGJ1dHRvbl8xLlZvbHVtZUNvbnRyb2xCdXR0b24oeyAndmVydGljYWwnOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5ldyBGdWxsc2NyZWVuVG9nZ2xlQnV0dG9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IGNvbXBvbmVudF8xLkNvbXBvbmVudCh7IGNzc0NsYXNzOiAnc3BhY2VyJyB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHVpID0gbmV3IHVpY29udGFpbmVyXzEuVUlDb250YWluZXIoe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBwbGF5YmFja3RvZ2dsZW92ZXJsYXlfMS5QbGF5YmFja1RvZ2dsZU92ZXJsYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sQmFyLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBlcnJvcm1lc3NhZ2VvdmVybGF5XzEuRXJyb3JNZXNzYWdlT3ZlcmxheSgpXHJcbiAgICAgICAgICAgICAgICBdLCBjc3NDbGFzc2VzOiBbJ3VpLXNraW4nXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVSU1hbmFnZXIocGxheWVyLCB1aSwgY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRmFjdG9yeS5idWlsZEF1ZGlvVmlkZW9VSSA9IGJ1aWxkQXVkaW9WaWRlb1VJO1xyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQXVkaW9Pbmx5VUkocGxheWVyLCBjb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHt9OyB9XHJcbiAgICAgICAgICAgIHZhciBjb250cm9sQmFyID0gbmV3IGNvbnRyb2xiYXJfMS5Db250cm9sQmFyKHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgcGxheWJhY2t0b2dnbGVidXR0b25fMS5QbGF5YmFja1RvZ2dsZUJ1dHRvbigpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzZWVrYmFyXzEuU2Vla0Jhcih7IGxhYmVsOiBuZXcgc2Vla2JhcmxhYmVsXzEuU2Vla0JhckxhYmVsKCksIGhpZGVJbkxpdmVQbGF5YmFjazogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgcGxheWJhY2t0aW1lbGFiZWxfMS5QbGF5YmFja1RpbWVMYWJlbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyB2b2x1bWVjb250cm9sYnV0dG9uXzEuVm9sdW1lQ29udHJvbEJ1dHRvbih7ICd2ZXJ0aWNhbCc6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IGNvbXBvbmVudF8xLkNvbXBvbmVudCh7IGNzc0NsYXNzOiAnc3BhY2VyJyB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHZhciB1aSA9IG5ldyB1aWNvbnRhaW5lcl8xLlVJQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgYXVkaW9vbmx5b3ZlcmxheV8xLkF1ZGlvT25seU92ZXJsYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgcGxheWJhY2t0b2dnbGVvdmVybGF5XzEuUGxheWJhY2tUb2dnbGVPdmVybGF5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbEJhcixcclxuICAgICAgICAgICAgICAgICAgICBuZXcgZXJyb3JtZXNzYWdlb3ZlcmxheV8xLkVycm9yTWVzc2FnZU92ZXJsYXkoKVxyXG4gICAgICAgICAgICAgICAgXSwgY3NzQ2xhc3NlczogWyd1aS1za2luJ11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVUlNYW5hZ2VyKHBsYXllciwgdWksIGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZhY3RvcnkuYnVpbGRBdWRpb09ubHlVSSA9IGJ1aWxkQXVkaW9Pbmx5VUk7XHJcbiAgICB9KShGYWN0b3J5ID0gVUlNYW5hZ2VyLkZhY3RvcnkgfHwgKFVJTWFuYWdlci5GYWN0b3J5ID0ge30pKTtcclxufSkoVUlNYW5hZ2VyID0gZXhwb3J0cy5VSU1hbmFnZXIgfHwgKGV4cG9ydHMuVUlNYW5hZ2VyID0ge30pKTtcclxuZXhwb3J0cy5VSU1hbmFnZXIgPSBVSU1hbmFnZXI7XHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgZnVuY3Rpb25hbGl0eSB0byBtYW5hZ2UgYSBVSSBpbnN0YW5jZS4gVXNlZCBieSB0aGUge0BsaW5rIFVJTWFuYWdlcn0gdG8gbWFuYWdlIG11bHRpcGxlIFVJIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBVSUluc3RhbmNlTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBVSUluc3RhbmNlTWFuYWdlcihwbGF5ZXIsIHVpLCBjb25maWcpIHtcclxuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0ge307IH1cclxuICAgICAgICB0aGlzLmV2ZW50cyA9IHtcclxuICAgICAgICAgICAgb25Db25maWd1cmVkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uU2VlazogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICBvblNlZWtQcmV2aWV3OiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uU2Vla2VkOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uQ29tcG9uZW50U2hvdzogbmV3IGV2ZW50ZGlzcGF0Y2hlcl8xLkV2ZW50RGlzcGF0Y2hlcigpLFxyXG4gICAgICAgICAgICBvbkNvbXBvbmVudEhpZGU6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25Db250cm9sc1Nob3c6IG5ldyBldmVudGRpc3BhdGNoZXJfMS5FdmVudERpc3BhdGNoZXIoKSxcclxuICAgICAgICAgICAgb25QcmV2aWV3Q29udHJvbHNIaWRlOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgICAgIG9uQ29udHJvbHNIaWRlOiBuZXcgZXZlbnRkaXNwYXRjaGVyXzEuRXZlbnREaXNwYXRjaGVyKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBsYXllcldyYXBwZXIgPSBuZXcgUGxheWVyV3JhcHBlcihwbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMudWkgPSB1aTtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuICAgIFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xyXG4gICAgfTtcclxuICAgIFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRVSSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51aTtcclxuICAgIH07XHJcbiAgICBVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuZ2V0UGxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllcldyYXBwZXIuZ2V0UGxheWVyKCk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZSwgXCJvbkNvbmZpZ3VyZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIFVJIGlzIGZ1bGx5IGNvbmZpZ3VyZWQgYW5kIGFkZGVkIHRvIHRoZSBET00uXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29uZmlndXJlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25TZWVrXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXJlcyB3aGVuIGEgc2VlayBzdGFydHMuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uU2VlaztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25TZWVrUHJldmlld1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgc2VlayB0aW1lbGluZSBpcyBzY3J1YmJlZC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnREaXNwYXRjaGVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMub25TZWVrUHJldmlldztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25TZWVrZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIHdoZW4gYSBzZWVrIGlzIGZpbmlzaGVkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtFdmVudERpc3BhdGNoZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50cy5vblNlZWtlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25Db21wb25lbnRTaG93XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXJlcyB3aGVuIGEgY29tcG9uZW50IGlzIHNob3dpbmcuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29tcG9uZW50U2hvdztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25Db21wb25lbnRIaWRlXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaXJlcyB3aGVuIGEgY29tcG9uZW50IGlzIGhpZGluZy5cclxuICAgICAgICAgKiBAcmV0dXJucyB7RXZlbnREaXNwYXRjaGVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHMub25Db21wb25lbnRIaWRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZSwgXCJvbkNvbnRyb2xzU2hvd1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgVUkgY29udHJvbHMgYXJlIHNob3dpbmcuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29udHJvbHNTaG93O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZSwgXCJvblByZXZpZXdDb250cm9sc0hpZGVcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIGJlZm9yZSB0aGUgVUkgY29udHJvbHMgYXJlIGhpZGluZyB0byBjaGVjayBpZiB0aGV5IGFyZSBhbGxvd2VkIHRvIGhpZGUuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uUHJldmlld0NvbnRyb2xzSGlkZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUsIFwib25Db250cm9sc0hpZGVcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIFVJIGNvbnRyb2xzIGFyZSBoaWRpbmcuXHJcbiAgICAgICAgICogQHJldHVybnMge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLm9uQ29udHJvbHNIaWRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgVUlJbnN0YW5jZU1hbmFnZXIucHJvdG90eXBlLmNsZWFyRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnBsYXllcldyYXBwZXIuY2xlYXJFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzOyAvLyBhdm9pZCBUUzcwMTdcclxuICAgICAgICBmb3IgKHZhciBldmVudF8xIGluIGV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgZGlzcGF0Y2hlciA9IGV2ZW50c1tldmVudF8xXTtcclxuICAgICAgICAgICAgZGlzcGF0Y2hlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gVUlJbnN0YW5jZU1hbmFnZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVUlJbnN0YW5jZU1hbmFnZXIgPSBVSUluc3RhbmNlTWFuYWdlcjtcclxuLyoqXHJcbiAqIEV4dGVuZHMgdGhlIHtAbGluayBVSUluc3RhbmNlTWFuYWdlcn0gZm9yIGludGVybmFsIHVzZSBpbiB0aGUge0BsaW5rIFVJTWFuYWdlcn0gYW5kIHByb3ZpZGVzIGFjY2VzcyB0byBmdW5jdGlvbmFsaXR5XHJcbiAqIHRoYXQgY29tcG9uZW50cyByZWNlaXZpbmcgYSByZWZlcmVuY2UgdG8gdGhlIHtAbGluayBVSUluc3RhbmNlTWFuYWdlcn0gc2hvdWxkIG5vdCBoYXZlIGFjY2VzcyB0by5cclxuICovXHJcbnZhciBJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5nZXRXcmFwcGVkUGxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRPRE8gZmluZCBhIG5vbi1oYWNreSB3YXkgdG8gcHJvdmlkZSB0aGUgV3JhcHBlZFBsYXllciB0byB0aGUgVUlNYW5hZ2VyIHdpdGhvdXQgZXhwb3J0aW5nIGl0XHJcbiAgICAgICAgLy8gZ2V0UGxheWVyKCkgYWN0dWFsbHkgcmV0dXJucyB0aGUgV3JhcHBlZFBsYXllciBidXQgaXRzIHJldHVybiB0eXBlIGlzIHNldCB0byBQbGF5ZXIgc28gdGhlIFdyYXBwZWRQbGF5ZXIgZG9lc1xyXG4gICAgICAgIC8vIG5vdCBuZWVkIHRvIGJlIGV4cG9ydGVkXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGxheWVyKCk7XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuY29uZmlndXJlQ29udHJvbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmVDb250cm9sc1RyZWUodGhpcy5nZXRVSSgpKTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIEludGVybmFsVUlJbnN0YW5jZU1hbmFnZXIucHJvdG90eXBlLmlzQ29uZmlndXJlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmVkO1xyXG4gICAgfTtcclxuICAgIEludGVybmFsVUlJbnN0YW5jZU1hbmFnZXIucHJvdG90eXBlLmNvbmZpZ3VyZUNvbnRyb2xzVHJlZSA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjb25maWd1cmVkQ29tcG9uZW50cyA9IFtdO1xyXG4gICAgICAgIHV0aWxzXzEuVUlVdGlscy50cmF2ZXJzZVRyZWUoY29tcG9uZW50LCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIC8vIEZpcnN0LCBjaGVjayBpZiB3ZSBoYXZlIGFscmVhZHkgY29uZmlndXJlZCBhIGNvbXBvbmVudCwgYW5kIHRocm93IGFuIGVycm9yIGlmIHdlIGRpZC4gTXVsdGlwbGUgY29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICAvLyBvZiB0aGUgc2FtZSBjb21wb25lbnQgbGVhZHMgdG8gdW5leHBlY3RlZCBVSSBiZWhhdmlvci4gQWxzbywgYSBjb21wb25lbnQgdGhhdCBpcyBpbiB0aGUgVUkgdHJlZSBtdWx0aXBsZVxyXG4gICAgICAgICAgICAvLyB0aW1lcyBoaW50cyBhdCBhIHdyb25nIFVJIHN0cnVjdHVyZS5cclxuICAgICAgICAgICAgLy8gV2UgY291bGQganVzdCBza2lwIGNvbmZpZ3VyYXRpb24gaW4gc3VjaCBhIGNhc2UgYW5kIG5vdCB0aHJvdyBhbiBleGNlcHRpb24sIGJ1dCBlbmZvcmNpbmcgYSBjbGVhbiBVSSB0cmVlXHJcbiAgICAgICAgICAgIC8vIHNlZW1zIGxpa2UgdGhlIGJldHRlciBjaG9pY2UuXHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgY29uZmlndXJlZENvbXBvbmVudHNfMSA9IGNvbmZpZ3VyZWRDb21wb25lbnRzOyBfaSA8IGNvbmZpZ3VyZWRDb21wb25lbnRzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlndXJlZENvbXBvbmVudCA9IGNvbmZpZ3VyZWRDb21wb25lbnRzXzFbX2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ3VyZWRDb21wb25lbnQgPT09IGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdyaXRlIHRoZSBjb21wb25lbnQgdG8gdGhlIGNvbnNvbGUgdG8gc2ltcGxpZnkgaWRlbnRpZmljYXRpb24gb2YgdGhlIGN1bHByaXRcclxuICAgICAgICAgICAgICAgICAgICAvLyAoZS5nLiBieSBpbnNwZWN0aW5nIHRoZSBjb25maWcpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIFVJIHRyZWUnLCBjb21wb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGRpdGlvbmFsbHkgdGhyb3cgYW4gZXJyb3IsIGJlY2F1c2UgdGhpcyBjYXNlIG11c3Qgbm90IGhhcHBlbiBhbmQgbGVhZHMgdG8gdW5leHBlY3RlZCBVSSBiZWhhdmlvci5cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIFVJIHRyZWU6ICcgKyBjb21wb25lbnQuY29uc3RydWN0b3IubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcG9uZW50LmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgY29tcG9uZW50LmNvbmZpZ3VyZShfdGhpcy5nZXRQbGF5ZXIoKSwgX3RoaXMpO1xyXG4gICAgICAgICAgICBjb25maWd1cmVkQ29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUucmVsZWFzZUNvbnRyb2xzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdCBjYWxsIHJlbGVhc2UgbWV0aG9kcyBpZiB0aGUgY29tcG9uZW50cyBoYXZlIG5ldmVyIGJlZW4gY29uZmlndXJlZDsgdGhpcyBjYW4gcmVzdWx0IGluIGV4Y2VwdGlvbnNcclxuICAgICAgICBpZiAodGhpcy5jb25maWd1cmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZUNvbnRyb2xzVHJlZSh0aGlzLmdldFVJKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlZCA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuaXNSZWxlYXNlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxlYXNlZDtcclxuICAgIH07XHJcbiAgICBJbnRlcm5hbFVJSW5zdGFuY2VNYW5hZ2VyLnByb3RvdHlwZS5yZWxlYXNlQ29udHJvbHNUcmVlID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbXBvbmVudC5yZWxlYXNlKCk7XHJcbiAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIGNvbnRhaW5lcl8xLkNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gY29tcG9uZW50LmdldENvbXBvbmVudHMoKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZENvbXBvbmVudCA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZUNvbnRyb2xzVHJlZShjaGlsZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSW50ZXJuYWxVSUluc3RhbmNlTWFuYWdlci5wcm90b3R5cGUuY2xlYXJFdmVudEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY2xlYXJFdmVudEhhbmRsZXJzLmNhbGwodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEludGVybmFsVUlJbnN0YW5jZU1hbmFnZXI7XHJcbn0oVUlJbnN0YW5jZU1hbmFnZXIpKTtcclxuLyoqXHJcbiAqIFdyYXBzIHRoZSBwbGF5ZXIgdG8gdHJhY2sgZXZlbnQgaGFuZGxlcnMgYW5kIHByb3ZpZGUgYSBzaW1wbGUgbWV0aG9kIHRvIHJlbW92ZSBhbGwgcmVnaXN0ZXJlZCBldmVudFxyXG4gKiBoYW5kbGVycyBmcm9tIHRoZSBwbGF5ZXIuXHJcbiAqL1xyXG52YXIgUGxheWVyV3JhcHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQbGF5ZXJXcmFwcGVyKHBsYXllcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgLy8gQ29sbGVjdCBhbGwgcHVibGljIEFQSSBtZXRob2RzIG9mIHRoZSBwbGF5ZXJcclxuICAgICAgICB2YXIgbWV0aG9kcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIG1lbWJlciBpbiBwbGF5ZXIpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwbGF5ZXJbbWVtYmVyXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKG1lbWJlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ3JlYXRlIHdyYXBwZXIgb2JqZWN0IGFuZCBhZGQgZnVuY3Rpb24gd3JhcHBlcnMgZm9yIGFsbCBBUEkgbWV0aG9kcyB0aGF0IGRvIG5vdGhpbmcgYnV0IGNhbGxpbmcgdGhlIGJhc2UgbWV0aG9kXHJcbiAgICAgICAgLy8gb24gdGhlIHBsYXllclxyXG4gICAgICAgIHZhciB3cmFwcGVyID0ge307XHJcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAobWVtYmVyKSB7XHJcbiAgICAgICAgICAgIHdyYXBwZXJbbWVtYmVyXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjYWxsZWQgJyArIG1lbWJlcik7IC8vIHRyYWNrIG1ldGhvZCBjYWxscyBvbiB0aGUgcGxheWVyXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyW21lbWJlcl0uYXBwbHkocGxheWVyLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBtZXRob2RzXzEgPSBtZXRob2RzOyBfaSA8IG1ldGhvZHNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG1lbWJlciA9IG1ldGhvZHNfMVtfaV07XHJcbiAgICAgICAgICAgIF9sb29wXzEobWVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ29sbGVjdCBhbGwgcHVibGljIHByb3BlcnRpZXMgb2YgdGhlIHBsYXllciBhbmQgYWRkIGl0IHRvIHRoZSB3cmFwcGVyXHJcbiAgICAgICAgZm9yICh2YXIgbWVtYmVyIGluIHBsYXllcikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBsYXllclttZW1iZXJdICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyW21lbWJlcl0gPSBwbGF5ZXJbbWVtYmVyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFeHBsaWNpdGx5IGFkZCBhIHdyYXBwZXIgbWV0aG9kIGZvciAnYWRkRXZlbnRIYW5kbGVyJyB0aGF0IGFkZHMgYWRkZWQgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIGV2ZW50IGxpc3RcclxuICAgICAgICB3cmFwcGVyLmFkZEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChldmVudFR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5hZGRFdmVudEhhbmRsZXIoZXZlbnRUeXBlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIGlmICghX3RoaXMuZXZlbnRIYW5kbGVyc1tldmVudFR5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50VHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50VHlwZV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gRXhwbGljaXRseSBhZGQgYSB3cmFwcGVyIG1ldGhvZCBmb3IgJ3JlbW92ZUV2ZW50SGFuZGxlcicgdGhhdCByZW1vdmVzIHJlbW92ZWQgZXZlbnQgaGFuZGxlcnMgZnJvbSB0aGUgZXZlbnQgbGlzdFxyXG4gICAgICAgIHdyYXBwZXIucmVtb3ZlRXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcGxheWVyLnJlbW92ZUV2ZW50SGFuZGxlcihldmVudFR5cGUsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmV2ZW50SGFuZGxlcnNbZXZlbnRUeXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5BcnJheVV0aWxzLnJlbW92ZShfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50VHlwZV0sIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdyYXBwZXIuZmlyZUV2ZW50SW5VSSA9IGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuZXZlbnRIYW5kbGVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgZGF0YSBvYmplY3Qgd2l0aCBkZWZhdWx0IHZhbHVlcyB0byBjb252ZXJ0IGl0IHRvIGEge0BsaW5rIFBsYXllckV2ZW50fSBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyRXZlbnREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYSBtYXJrZXIgcHJvcGVydHkgc28gdGhlIFVJIGNhbiBkZXRlY3QgVUktaW50ZXJuYWwgcGxheWVyIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHVpU291cmNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBfdGhpcy5ldmVudEhhbmRsZXJzW2V2ZW50XTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socGxheWVyRXZlbnREYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy53cmFwcGVyID0gd3JhcHBlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHdyYXBwZWQgcGxheWVyIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIG9uIHBsYWNlIG9mIHRoZSBub3JtYWwgcGxheWVyIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIHtXcmFwcGVkUGxheWVyfSBhIHdyYXBwZWQgcGxheWVyXHJcbiAgICAgKi9cclxuICAgIFBsYXllcldyYXBwZXIucHJvdG90eXBlLmdldFBsYXllciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVyO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIGFsbCByZWdpc3RlcmVkIGV2ZW50IGhhbmRsZXJzIGZyb20gdGhlIHBsYXllciB0aGF0IHdlcmUgYWRkZWQgdGhyb3VnaCB0aGUgd3JhcHBlZCBwbGF5ZXIuXHJcbiAgICAgKi9cclxuICAgIFBsYXllcldyYXBwZXIucHJvdG90eXBlLmNsZWFyRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBldmVudFR5cGUgaW4gdGhpcy5ldmVudEhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLmV2ZW50SGFuZGxlcnNbZXZlbnRUeXBlXTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlbW92ZUV2ZW50SGFuZGxlcihldmVudFR5cGUsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gUGxheWVyV3JhcHBlcjtcclxufSgpKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbGliL3VpbWFuYWdlci50c1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcclxudmFyIEJpdG1vdmluQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCaXRtb3ZpbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9nKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XHJcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHt9O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XHJcbiAgICB9XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRoaXMuJHNjb3BlLmNvbmZpZykgJiYgYW5ndWxhci5pc0RlZmluZWQodGhpcy4kc2NvcGUuY29uZmlnLmtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLiRzY29wZS5jb25maWc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2cuZXJyb3IoJ2Jhc2ljIGNvbmZpZyBmb3IgYml0ZGFzaCBwbGF5ZXIgaXMgbWlzc2luZyEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRoaXMuJHNjb3BlLm9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuJHNjb3BlLm9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh0aGlzLiRzY29wZS53ZWJjYXN0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NXZWJjYXN0KHRoaXMuJHNjb3BlLndlYmNhc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLnByb2Nlc3NXZWJjYXN0ID0gZnVuY3Rpb24gKHdlYmNhc3QpIHtcclxuICAgICAgICB2YXIgc3RhdGVQcm9wZXJ0eSA9IHdlYmNhc3Quc3RhdGUgKyAnU3RhdGVEYXRhJztcclxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodGhpcy5vcHRpb25zLmZvcmNlZFN0YXRlKSkge1xyXG4gICAgICAgICAgICBzdGF0ZVByb3BlcnR5ID0gdGhpcy5vcHRpb25zLmZvcmNlZFN0YXRlICsgJ1N0YXRlRGF0YSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlnLnNvdXJjZSA9IHRoaXMuZ2V0UGxheWVyQ29uZmlnU291cmNlKHdlYmNhc3QsIHN0YXRlUHJvcGVydHkpO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnN0eWxlID0geyB1eDogZmFsc2UgfTtcclxuICAgIH07XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBsYXllckNvbmZpZ1NvdXJjZSA9IGZ1bmN0aW9uICh3ZWJjYXN0LCBzdGF0ZSkge1xyXG4gICAgICAgIGlmICh3ZWJjYXN0LnVzZURWUlBsYXliYWNrSW5Qb3N0bGl2ZSA9PT0gdHJ1ZSAmJiBzdGF0ZSA9PT0gJ3Bvc3RsaXZlU3RhdGVEYXRhJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREVlJQbGF5YmFja1RvUG9zdGxpdmUod2ViY2FzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUod2ViY2FzdCwgc3RhdGUpO1xyXG4gICAgfTtcclxuICAgIEJpdG1vdmluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RFZSUGxheWJhY2tUb1Bvc3RsaXZlID0gZnVuY3Rpb24gKHdlYmNhc3QpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gJyc7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHdlYmNhc3RbJ3Bvc3RsaXZlU3RhdGVEYXRhJ10ucGxheW91dC5vZmZzZXQpKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5b3V0T2Zmc2V0ID0gcGFyc2VJbnQod2ViY2FzdFsncG9zdGxpdmVTdGF0ZURhdGEnXS5wbGF5b3V0Lm9mZnNldCwgMTApO1xyXG4gICAgICAgICAgICBpZiAocGxheW91dE9mZnNldCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9ICcmd293emFkdnJwbGF5bGlzdHN0YXJ0PScgKyBwbGF5b3V0T2Zmc2V0ICsgJzAwMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGFzaDogd2ViY2FzdFsnbGl2ZVN0YXRlRGF0YSddLnBsYXlvdXQuZGFzaFVybC5yZXBsYWNlKCcvcGxheWxpc3QubTN1OCcsICdEdnIvcGxheWxpc3QubTN1OD9EVlInICsgb2Zmc2V0KSxcclxuICAgICAgICAgICAgaGxzOiB3ZWJjYXN0WydsaXZlU3RhdGVEYXRhJ10ucGxheW91dC5obHNVcmwucmVwbGFjZSgnL21hc3Rlci5tM3U4JywgJ0R2ci9wbGF5bGlzdC5tM3U4P0RWUicgKyBvZmZzZXQpXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBCaXRtb3ZpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFBsYXllckNvbmZpZ1NvdXJjZUJ5U3RhdGUgPSBmdW5jdGlvbiAod2ViY2FzdCwgc3RhdGUpIHtcclxuICAgICAgICB2YXIgaGxzID0gd2ViY2FzdFtzdGF0ZV0ucGxheW91dC5obHNVcmw7XHJcbiAgICAgICAgdmFyIGRhc2ggPSB3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmRhc2hVcmw7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gd2ViY2FzdC5uYW1lO1xyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LnZpZGVvTWFuYWdlckhsc1VybCkgJiYgd2ViY2FzdFtzdGF0ZV0ucGxheW91dC52aWRlb01hbmFnZXJIbHNVcmwpIHtcclxuICAgICAgICAgICAgaGxzID0gd2ViY2FzdFtzdGF0ZV0ucGxheW91dC52aWRlb01hbmFnZXJIbHNVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh3ZWJjYXN0W3N0YXRlXS5wbGF5b3V0Lm9mZnNldCkpIHtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHBhcnNlSW50KHdlYmNhc3Rbc3RhdGVdLnBsYXlvdXQub2Zmc2V0LCAxMCk7XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0UHJlZml4ID0gJz8nO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgICAgIHBhcnNlci5ocmVmID0gaGxzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRQcmVmaXggPSAnJic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBobHMgKz0gb2Zmc2V0UHJlZml4ICsgJ3N0YXJ0PScgKyBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoZGFzaCkgJiYgZGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFByZWZpeCA9ICc/JztcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIuaHJlZiA9IGRhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlci5zZWFyY2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UHJlZml4ID0gJyYnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYXNoICs9IG9mZnNldFByZWZpeCArICdzdGFydD0nICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IGRhc2g6IGRhc2gsIGhsczogaGxzLCB0aXRsZTogdGl0bGUgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQml0bW92aW5Db250cm9sbGVyO1xyXG59KCkpO1xyXG5CaXRtb3ZpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRsb2cnXTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQml0bW92aW5Db250cm9sbGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2JpdGRhc2gtY29udHJvbGxlci50c1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcclxudmFyIEJpdGRhc2hEaXJlY3RpdmUgPSBmdW5jdGlvbiAoJHdpbmRvdykgeyByZXR1cm4gKHtcclxuICAgIGNvbnRyb2xsZXI6ICdNaUJpdGRhc2hDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJBczogJ2JpdGRhc2hWbScsXHJcbiAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICAgIGNvbmZpZzogJz0nLFxyXG4gICAgICAgIG9wdGlvbnM6ICc9PycsXHJcbiAgICAgICAgd2ViY2FzdDogJz0nLFxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiBcIjxkaXYgaWQ9XFxcIm1pLWJpdGRhc2gtcGxheWVyXFxcIiB3aWR0aD1cXFwiMTAwJVxcXCIgaGVpZ2h0PVxcXCJhdXRvXFxcIj48L2Rpdj5cIixcclxuICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xyXG4gICAgICAgIHZhciBiaXRtb3ZpblBsYXllcjtcclxuICAgICAgICB2YXIgYml0bW92aW5VSU1hbmFnZXI7XHJcbiAgICAgICAgdmFyIGJpdG1vdmluQ29udHJvbGJhcjtcclxuICAgICAgICB2YXIgY29uZmlnID0gc2NvcGUuY29uZmlnO1xyXG4gICAgICAgIHZhciB3ZWJjYXN0ID0gc2NvcGUud2ViY2FzdDtcclxuICAgICAgICB2YXIgc3RhdGUgPSBzY29wZS53ZWJjYXN0LnN0YXRlICsgJ1N0YXRlRGF0YSc7XHJcbiAgICAgICAgYnVpbGRQbGF5ZXIoKTtcclxuICAgICAgICBmdW5jdGlvbiBidWlsZFBsYXllcigpIHtcclxuICAgICAgICAgICAgYml0bW92aW5QbGF5ZXIgPSAkd2luZG93LndpbmRvdy5iaXRtb3Zpbi5wbGF5ZXIoJ21pLWJpdGRhc2gtcGxheWVyJyk7XHJcbiAgICAgICAgICAgIGNoZWNrSXNQbGF5ZXJMb2FkZWQoKTtcclxuICAgICAgICAgICAgYml0bW92aW5QbGF5ZXJcclxuICAgICAgICAgICAgICAgIC5zZXR1cChjb25maWcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBiaXRtb3ZpblVJTWFuYWdlciA9ICR3aW5kb3cud2luZG93LmJpdG1vdmluLnBsYXllcnVpLlVJTWFuYWdlci5GYWN0b3J5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQXVkaW9Pbmx5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBiaXRtb3ZpblVJTWFuYWdlci5idWlsZEF1ZGlvT25seVVJKGJpdG1vdmluUGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdWRpb09ubHlTdGlsbEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBiaXRtb3ZpblVJTWFuYWdlci5idWlsZEF1ZGlvVmlkZW9VSShiaXRtb3ZpblBsYXllcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09ICdsaXZlU3RhdGVEYXRhJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibXB1aS1zZWVrYmFyJykpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiaXRtb3ZpbkNvbnRyb2xiYXIgPSBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiaXRtb3ZpbnBsYXllci1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChiaXRtb3ZpbkNvbnRyb2xiYXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYml0bW92aW5Db250cm9sYmFyLnN0eWxlLm1pbldpZHRoID0gJzE3NXB4JztcclxuICAgICAgICAgICAgICAgICAgICBiaXRtb3ZpbkNvbnRyb2xiYXIuc3R5bGUubWluSGVpZ2h0ID0gJzEwMXB4JztcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYml0bW92aW5wbGF5ZXItdmlkZW8tbWktYml0ZGFzaC1wbGF5ZXInKS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgd2ViY2FzdC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnICsgcmVhc29uLmNvZGUgKyAnIC0gJyArIHJlYXNvbi5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrSXNQbGF5ZXJMb2FkZWQoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChiaXRtb3ZpblBsYXllcikgJiYgYml0bW92aW5QbGF5ZXIuaXNSZWFkeSgpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBiaXRtb3ZpblBsYXllci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBiaXRtb3ZpblBsYXllciA9ICR3aW5kb3cud2luZG93LmJpdG1vdmluLnBsYXllcignbWktYml0ZGFzaC1wbGF5ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBpc0F1ZGlvT25seSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEZWZpbmVkKHNjb3BlLndlYmNhc3Rbc3RhdGVdLnBsYXlvdXQuYXVkaW9Pbmx5KSAmJlxyXG4gICAgICAgICAgICAgICAgc2NvcGUud2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEF1ZGlvT25seVN0aWxsSW1hZ2UoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChzY29wZS53ZWJjYXN0W3N0YXRlXS5wbGF5b3V0LmF1ZGlvT25seVN0aWxsVXJsKSAmJlxyXG4gICAgICAgICAgICAgICAgc2NvcGUud2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHlTdGlsbFVybCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYm1wdWktdWktYXVkaW9vbmx5LW92ZXJsYXknKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgc2NvcGUud2ViY2FzdFtzdGF0ZV0ucGxheW91dC5hdWRpb09ubHlTdGlsbFVybCArICcpJztcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnY29udGFpbic7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsgfTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQml0ZGFzaERpcmVjdGl2ZTtcclxuQml0ZGFzaERpcmVjdGl2ZS4kaW5qZWN0ID0gWyckd2luZG93J107XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYml0ZGFzaC1kaXJlY3RpdmUudHNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=