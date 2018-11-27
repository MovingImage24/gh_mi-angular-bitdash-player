# Change Log for the Kollective SDK

## Version 1.0.0

Initial release

## Version 1.1.0

### New features

  * Built-in player interface for Bitmovin Player (versions 7 & 8)

### Stability enhancements

  * Fixed an issue that caused `onPlaybackRequestFailure` to not be called when network connection fails for the playback info request
  * Fixed an issue that caused extraneous analytics reporting API calls to be made after switching streams
  * Fixed an issue that caused playback to fail after six minutes on MS Edge
  * Fixed an issue that caused the SDK to attempt to play a `null` source
