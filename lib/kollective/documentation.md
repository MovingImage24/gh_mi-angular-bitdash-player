# Kollective SDK: General v1.1.0 Documentation

The Kollective SDK is designed to enable your application to use the Kollective Agent for video content distribution without much work. The heavy lifting of interacting with the Kollective Agent and submitting analytics reports is provided for you.

## Agent version compatibility

This library is designed to be compatible with all previous versions of the Kollective Agent, so that you can deploy your application to devices using any Kollective Agent. Be mindful, however, that your integration's requirements may restrict agent usage more stringently than this library.

## What this library does not cover

This library is intended to handle the majority of functions on the viewer end. Publishing content into Kollective's ECDN and applying user restrictions/permissions to content and users is not covered by this library.

## Global namespace

This library affects the global namespace in the following ways:
  * `window.ksdn` is added
  * `Object.assign` is polyfilled
  * `window.Promise` is polyfilled if not present
  * ES3 compatible versions only:
    * ES5 is polyfilled with [core-js](https://github.com/zloirock/core-js)
  * Flash versions only:
    * `window.swfobject` is asynchonously set if `window.swfobject` is not set by the time the library is executed by the browser
    * `window.ASLoadStart` is added
    * `window.ASLoadIOError` is added
    * `window.ASLoadSecurityError` is added
    * `window.ASLoadFailed` is added
    * `window.ASLoadComplete` is added

ES3 compatible versions of this library have the string `es3` in the filename. Flash versions of this library have the string `flash` in the filename.

## Quick start guide

The following call instantiates a video-player specific plugin. You may use one of six built-in player-specific plugins, or you may install a plugin for a custom player (see section **Installing a plugin for a custom player**).

```js
var plugin = new ksdn.Players.<player_variant>(options);
```

**`plugin`**: An instance of `Plugin`

**`<player_variant>`**: Name of plugin variant. The built-in player variants are:
  * `Amp`: Azure Media Player
  * `Bitmovin`: Bitmovin Player 7 & 8
  * `Dashjs`: Dash JS player
  * `Flow`: Flowplayer
  * `Jwplayer`: JW Player 7 & 8
  * `Theo`: THEOplayer
  * `Videojs`: Video.js

**`options`**: Javascript object of option-value pairs. If provided, `plugin.configure(options)` is implicitly called. (See **Configuration options** section.)

The following call begins playback of a content published through the Kollective ECDN.

```js
plugin.play(player, urn, callbacks);
```

**`player`**: Reference to player object. Must be a player object corresponding to the `<player_variant>` used.

**`urn`**: Universal Resource Name of for the content published to the Kollective ECDN (Example: `urn:kid:eval:demo:moid:fe1f633d-836f-4269-bd48-6c5004f28226`)

**`callbacks`**: A Javascript object of the lifecycle callbacks you woud like to implement. All are optional. (See **Lifecycle callbacks** section.)

## Configuration options

Plugin configuration options are specified as a plain Javascript object of option-value pairs. A simple example is:

```js
var options = {
  auth: "cli-YWFlY2MzMTctMmE3MC00OGI3LTliZjQtMGNkMzgxNTJkYmNj"
};
```

You can reconfigure options at any time by calling `plugin.configure(options)` (See **Plugin properties and methods** section). When reconfiguring options, you can set any non-required option to `null` to adopt default values. Setting to `undefined` will maintain the old value you previously set, if any.

### Basic options

*(Required)* `auth`

  * Authentication token for the user of the application
  * If the content is protected, it can be a service token (not recommended) or a client token (preferred)
  * If the content is not protected, it can be a public token
  * Examples:
    * Service token: `srv-Zjk3NzMzZTUtODg0Zi00NTE2LTliMjgtNTYwMDc1ZjBhZjY0` (format: `srv-<Base 64 encoded API key>`)
    * Client token: `cli-YWFlY2MzMTctMmE3MC00OGI3LTliZjQtMGNkMzgxNTJkYmNj` (format: `cli-<Base 64 encoded client key>`)
    * Public token: `pub-dXNlckBlbWFpbC5jb20jY29tcGFueQ==` (format: `pub-<Base 64 encoded user@email.com#company>`)
  * See section `Convenience functions` for a `createPublicToken` utility function

*(Recommended)* `host`

  * Hostname (including protocol) of the Kollective ECDN API your company is using
  * Example: `https://api.eval.kontiki.com`
  * If not provided, a host name will be inferred for each content item based on its URN. However, in the long run, such inferences *might be unreliable* for newly added URN namespaces / API hosts.

`agentRequestMode`

  * Specifies how the library should make requests to the Kollective Agent
  * See section **Agent Request Modes** for all options
  * Default value: `ksdn.AgentRequestMode.Ajax`

`fallbackSrc`

  * Specifies an alternate CDN source that should be used as a fallback in case playback through the Kollective ECDN is not possible
  * If `undefined`, `null`, or `""`, the fallback source will be Kollective's EdgeCast CDN
  * Default value: `undefined`
  * *See the related `fallbackType` option*

`fallbackType`

  * Specifies the MIME type of `fallbackSrc`
  * Has no effect if `fallbackSrc` is not provided
  * If `undefined`, `null`, or `""`, the fallback source type will be assumed to be the same as that of the source published into Kollective ECDN
  * Default value: `undefined`

`flashLoaderUrl`

  * Relative URL to the Kollective Flash loader for making requests to the Kollective Agent over a Flash bridge
  * Has no effect if Flash is disabled via `agentRequestMode`
  * Default value: `"flash/kontikiagentflashloader-3.swf"`

`flashTimeout`

  * Timeout in milliseconds for requests made to the Kollective Agent over a Flash bridge
  * Has no effect if Flash is disabled via `agentRequestMode`
  * Default value: `5000`

`reportInterval`

  * Interval in seconds between analytics reports
  * If `undefined`, `null`, or `0`, the content's default `reportInterval` value is used
  * A minimum value of `60` is enforced
  * *Warning:* frequent reports can add significant traffic load to corporate networks
  * Default value: `undefined`

`timeout`

  * Timeout in milliseconds for non-Flash requests made to the Kollective Agent
  * Has no effect if `agentRequestMode` is `ksdn.AgentRequestMode.Flash`
  * Default value: `5000`

## Lifecycle callbacks

Your application can hook into a few lifecycle event callbacks. **All callbacks are optional.**

**`onPlaybackRequestSuccess:`**`function(plugin, contentInfo) {}`

  * Called upon success of request to retrieve playback info for the provided URN
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)
  * `contentInfo`: Metadata about the content object identified by the current `urn`

**`onPlaybackRequestFailure:`**`function(plugin, request) {}`

  * Called upon failure to retrieve playback info for the provided URN
  * Return `true` to begin playback from the fallback source
    * You may wish to retry calling `plugin.play()` before doing so
    * Only initiates the fallback if `fallbackSrc` was provided as an option
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)
  * `request`: Reference to XMLHttpRequest object that failed

**`onAgentDetected:`**`function(plugin, supportsSessions, agent) {}`

  * Called when a Kollective Agent is detected on the machine and the Agent is capable of playing the current content URN
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)
  * `supportsSessions`: Boolean indicating whether the detected agent version supports agent sessions
  * `agent`: Reference to `KollectiveAgent` instance

**`onAgentRejected:`**`function(plugin, criteria) {}`

  * Called when a Kollective Agent is detected on the machine but the Agent is NOT capable of playing the current content URN
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)
  * `criteria`: A plain Javascript object showing which criteria for playing the current content URN passed and failed
    * Each key as follows is the name of a criterion, and the value is a `Boolean` (`false` indicates a failed criterion)
    * `provisionedForCurrentUrn`: `true` if the detected agent is provisioned to play the requested content `urn`
    * `notBlackedOut`: `true` if the detected agent is not in a blackout state (blackouts are controlled by companies that use the Kollective ECDN to better manage their networks)

**`onAgentNotDetected:`**`function(plugin, reasons) {}`

  * Called upon the determination that the machine does not have a Kollective Agent installed
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)
  * `reasons`: Array of reasons each detection strategy failed in order of occurrence. Each reason is a Javascript object with four keys:
    * `type`: Either `"timeout"` or `"error"`
    * `reason`: Longer description code of the reason for detection failure
    * `strategy`: The agent request strategy the failure occurred on
    * `status`: The request status code (e.g. `404`)

**`onSessionStart:`**`function(plugin) {}`

  * Called upon successful start of a session with the agent
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)

**`onSessionFailure:`**`function(plugin) {}`

  * Called upon failure to start a session with the agent
  * Not called if agent detected does not support sessions
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)

**`onPrimingStart:`**`function(plugin) {}`

  * Called when agent successfully begins priming the stream through the Kollective ECDN
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)

**`onPrimingFailure:`**`function(plugin) {}`

  * Called when the agent fails to start priming the stream through the Kollective ECDN
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)

**`onProgress:`**`function(plugin, progress, urn) {}`

  * Called when the Kollective Agent sends a stream initialization progress update
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)
  * `progress`: Integer between 0 and 100 (inclusive) indicating stream initialization progress percent
  * `urn`: URN identifier for the content that is being initialized through the Kollective ECDN

**`onCommand:`**`function(plugin, command, data) {}`

  * Called when the Kollective Agent sends a command to the application during stream initialization
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)
  * `command`: String name of the command
  * `data`: Data associated with the command

**`willSetSource:`**`function(plugin) {}`

  * Called just before the player's source is set to the content stream
  * If a Kollective Agent is not installed or an error occurs, this callback will be called even when falling back to the original source stream (on a traditional CDN).
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)

**`setSource:`**`function(player, src, type, isThroughECDN) {}`

  * Should set the source of the player and (optionally) begin playing it
  * Required if `setSource` is not implemented on a custom player interface (all built-in player interfaces implement it by default)
  * If provided as a lifecycle callback, it overrides the behavior of the player interface's `setSource` behavior
  * For more information, see the section called **Installing a plugin for a custom player**.

**`didSetSource:`**`function(plugin) {}`

  * Called just after the player's source is set to the content stream
  * If a Kollective Agent is not installed or an error occurs, this callback will be called even when falling back to the original source stream (on a traditional CDN).
  * `plugin`: Reference to plugin object (identical to plugin object returned during initialization)

## Plugin properties and methods

After instantiating an instance of Plugin, there are some additional methods and properties you can call.

### Properties

```js
plugin.player
```

A reference to the video player associated with the plugin (identical to the `player` argument used in the `plugin.play()`). Mutating this property has undefined behavior.

```js
plugin.agent
```

A reference to the Kollective Agent instance from the last detection. Detection occurs each time `plugin.play()` is called. Mutating this property has undefined behavior.

### Methods

```js
plugin.play(player, urn, callbacks)
```

Plays a video stream through the Kollective ECDN, with detection of the Kollective agent automatically handled for you. For more details, see the section called **Quick start guide**.

```js
plugin.stop(callback)
```

Stops the currently playing video stream, calling the callback upon completion. `plugin.player` and `plugin.agent` will be set to `null`.

```js
plugin.configure(options)
```

Reconfigures the Plugin instance's options, with the same `options` format as during instantiation. `plugin.stop()` is implicitly called on any currently playing stream if either the `host` or `auth` options change.

```js
plugin.getAgentData()
```

Returns data collected about the Kollective agent during the last successful agent detection. This method does not guarantee that the data is current (e.g., the agent was uninstalled since the last successful detection). It will return `undefined` if there has not been a successful agent detection.

```js
plugin.getLogs()
```

Returns the Kollective agent's log stream, which may be useful for debugging or issue reporting.

```js
plugin.flushLogs()
```

Resets the Kollective agent's log stream.

## Installing a plugin for a custom player

The following code installs a custom plugin, and then instantiates that plugin.

```js
var key = "CustomPlayer";
var playerInterface = { /* player-specific interface */ };
var options = { /* plugin options */ };
ksdn.installPlayerPlugin(name, playerInterface);
var customPlayerPlugin = new ksdn.Players.CustomPlayer(options);
```

**`name`**: Name used to instantiate the custom plugin.

  * **Note:** If the key you use matches one of the built-in player plugin keys, the built-in interface for that player will be overwritten with the `playerInterface` methods you implement.

**`playerInterface`**: Javascript object implementing a few key functions to interface with a player. An implementation is required for each of these functions, except as noted.

* **(Optional)** `setSource(player, src, type, isThroughECDN)`
	* Should set the source of the player and (optionally) begin playing it.
  * If not implemented, `setSource` must be implemented as a lifecycle callback (see **Lifecycle callbacks** section)
	* `player`: Reference to player object
	* `src`: URL of the video source
	* `type`: MIME type of the video source
  * `isThroughECDN`: `true` if source is playing through the Kollective ECDN; otherwise, `false` indicating `src` is a fallback source through a traditional CDN
* `isPlaying(player)`
	* Should return `true` if player is currently playing; otherwise, `false`.
	* `player`: Reference to player object
* `isLive(player)`
	* Should return `true` if player's source is live (non-terminating); otherwise `false` for video on-demand*
	* `player`: Reference to player object
* `getPlayerPosition(player)`
	* Should return the player's current position in the stream in milliseconds.
	* `player`: Reference to player object
* `getPlayerDuration(player)`
	* Should return the duration of the current player source, in milliseconds.
	* `player`: Reference to player object
* `setEventHandlers(player, handlers)`
	* Should set the following eight event handlers on the player, or call the following handlers when appropriate.
	* `player`: Reference to player object
	* `handlers`: Javascript object of eight event handlers Kollective Analytics requires:
		* `onTimeUpdate`: handler when player position updates
		* `onError`: handler when player issues any error event
		* `onPause`: handler when player is paused
		* `onPlay`: handler when player begins or resumes play
		* `onEnd`: handler when player position reaches the end of the current source
		* `onSeekEnd`: handler when user finishes a seek action
		* `onBuffering`: handler when playback stops for buffering
		* `onCanPlay`: handler when player has enough data to begin or resume play
	* **Note:** Some player APIs do not provide hooks for all of these events. However, most player APIs provide enough information to determine when to call each handler, as shown in **Example 2**.

**Example #1:**  The following is the built-in interface for THEOplayer.

```js
var theoInterface = {
  setSource: function(player, src, type, isThroughECDN) {
    player.source = {
      sources: [
        { src: src, type: type }
      ]
    };
    player.play();
  },
  isPlaying: function(player) {
    return !(player.seeking || player.paused || player.ended);
  },
  isLive: function(player) {
    return !isFinite(player.duration);
  },
  getPlayerPosition: function(player) {
    return player.currentTime * 1000;
  },
  getPlayerDuration: function(player) {
    return player.duration * 1000;
  },
  setEventHandlers: function(player, handlers) {
    player.addEventListener("timeupdate", handlers.onTimeUpdate);
    player.addEventListener("error", handlers.onError);
    player.addEventListener("pause", handlers.onPause);
    player.addEventListener("playing", handlers.onPlay);
    player.addEventListener("ended", handlers.onEnd);
    player.addEventListener("seeked", handlers.onSeekEnd);
    player.addEventListener("waiting", handlers.onBuffering);
    player.addEventListener("canplaythrough", handlers.onCanPlay);
  }
}
```

**Example #2:**  The following is part of the built-in interface for Flowplayer, showing how to call handlers that are not directly supported by a player.

```js
var flowSetEventHandlers = function(player, handlers) {
  /* Set other event handlers */

  // Set handlers onCanPlay and onBuffering, which Flowplayer does not directly support
  player.on("buffer", function () {
    if (player.video.buffer > player.video.time) {
      handlers.onCanPlay();
    } else {
      handlers.onBuffering();
    }
  });
};
```

## Agent Request Modes

The plugin handles all of the communication with the Kollective agent. There are three ways the plugin can make requests to the Kollective Agent, called Agent Request Modes:

* `Ajax`: AJAX requests made over SSL (preferred and default method)
* `Flash`: JSONP-like requests made over a Flash bridge (required for some applications)
* `AjaxWithFlashFallback`: Each request attempts the `Ajax` mode first, falling back to the `Flash` mode

In all cases, the library handles the details of these modes for you. You just need to choose which mode is right for your application.

In code, reference these modes like `ksdn.AgentRequestMode.Ajax`.

## Convenience functions

The following convenience functions are also included in this library:

* **`ksdn.createPublicToken(email, companyPrefixOrUrn)`**
  * Creates a properly formatted public authorization token from a users email and either a company prefix or content URN.
  * A company prefix identifies the "company" that content belongs to within the Kollective ECDN, and can be found within the URN, which is returned on the `contentInfo.urn` key from the `onPlaybackRequestSuccess` callback. For example, in the URN `urn:kid:eval:companyxyz:moid:27c38ca4-a6d0-4623-88b0-b371bf58d405`, the company prefix is `companyxyz`.
  * This convenience function accepts either a company prefix or the full URN as the second argument
