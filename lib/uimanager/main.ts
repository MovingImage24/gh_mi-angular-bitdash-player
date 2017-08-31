/// <reference path='player.d.ts' />
import {UIManager, UIInstanceManager} from './uimanager';
import {Button} from './components/button';
import {ControlBar} from './components/controlbar';
import {HugePlaybackToggleButton} from './components/hugeplaybacktogglebutton';
import {PlaybackTimeLabel, PlaybackTimeLabelMode} from './components/playbacktimelabel';
import {PlaybackToggleButton} from './components/playbacktogglebutton';
import {SeekBar} from './components/seekbar';
import {SelectBox} from './components/selectbox';
import {ToggleButton} from './components/togglebutton';
import {VideoQualitySelectBox} from './components/videoqualityselectbox';
import {VolumeToggleButton} from './components/volumetogglebutton';
import {Watermark} from './components/watermark';
import {UIContainer} from './components/uicontainer';
import {Container} from './components/container';
import {Label} from './components/label';
import {Component} from './components/component';
import {ErrorMessageOverlay} from './components/errormessageoverlay';
import {SeekBarLabel} from './components/seekbarlabel';
import {TitleBar} from './components/titlebar';
import {VolumeControlButton} from './components/volumecontrolbutton';
import {ClickOverlay} from './components/clickoverlay';
import {HugeReplayButton} from './components/hugereplaybutton';
import {BufferingOverlay} from './components/bufferingoverlay';
import {PlaybackToggleOverlay} from './components/playbacktoggleoverlay';
import {CloseButton} from './components/closebutton';
import {MetadataLabel, MetadataLabelContent} from './components/metadatalabel';
import {VolumeSlider} from './components/volumeslider';
import {Spacer} from './components/spacer';
import {ArrayUtils, StringUtils, PlayerUtils, UIUtils, BrowserUtils} from './utils';

// Object.assign polyfill for ES5/IE9
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
  Object.assign = function(target: any) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (let index = 1; index < arguments.length; index++) {
      let source = arguments[index];
      if (source != null) {
        for (let key in source) {
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
(window as any).bitmovin.playerui = {
  // Management
  UIManager,
  UIInstanceManager,
  // Utils
  ArrayUtils,
  StringUtils,
  PlayerUtils,
  UIUtils,
  BrowserUtils,
  // Components
  BufferingOverlay,
  Button,
  ClickOverlay,
  CloseButton,
  Component,
  Container,
  ControlBar,
  ErrorMessageOverlay,
  HugePlaybackToggleButton,
  HugeReplayButton,
  Label,
  MetadataLabel,
  MetadataLabelContent,
  PlaybackTimeLabel,
  PlaybackTimeLabelMode,
  PlaybackToggleButton,
  PlaybackToggleOverlay,
  SeekBar,
  SeekBarLabel,
  SelectBox,
  Spacer,
  TitleBar,
  ToggleButton,
  UIContainer,
  VideoQualitySelectBox,
  VolumeControlButton,
  VolumeSlider,
  VolumeToggleButton,
  Watermark,
};
