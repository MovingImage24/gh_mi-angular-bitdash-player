/// <reference path='player.d.ts' />
import {Button} from './components/button';
import {ControlBar} from './components/controlbar';
import {UIManager, UIInstanceManager} from './uimanager';
import {HugePlaybackToggleButton} from './components/hugeplaybacktogglebutton';
import {PlaybackTimeLabel, PlaybackTimeLabelMode} from './components/playbacktimelabel';
import {PlaybackToggleButton} from './components/playbacktogglebutton';
import {SeekBar} from './components/seekbar';
import {SelectBox} from './components/selectbox';
import {ItemSelectionList} from './components/itemselectionlist';
// import {SettingsPanel, SettingsPanelItem} from './components/settingspanel';
// import {SettingsToggleButton} from './components/settingstogglebutton';
import {ToggleButton} from './components/togglebutton';
// import {VideoQualitySelectBox} from './components/videoqualityselectbox';
import {VolumeToggleButton} from './components/volumetogglebutton';
// import {Watermark} from './components/watermark';
import {UIContainer} from './components/uicontainer';
import {Container} from './components/container';
import {Label} from './components/label';
import {Component} from './components/component';
import {ErrorMessageOverlay} from './components/errormessageoverlay';
import {SeekBarLabel} from './components/seekbarlabel';
// import {TitleBar} from './components/titlebar';
import {VolumeControlButton} from './components/volumecontrolbutton';
import {ClickOverlay} from './components/clickoverlay';
import {HugeReplayButton} from './components/hugereplaybutton';
// import {BufferingOverlay} from './components/bufferingoverlay';
import {PlaybackToggleOverlay} from './components/playbacktoggleoverlay';
import {CloseButton} from './components/closebutton';
// import {MetadataLabel, MetadataLabelContent} from './components/metadatalabel';
import {VolumeSlider} from './components/volumeslider';
import {Spacer} from './components/spacer';
import {ArrayUtils} from './arrayutils';
import {StringUtils} from './stringutils';
import {PlayerUtils} from './playerutils';
import {UIUtils} from './uiutils';
import {BrowserUtils} from './browserutils';
import {StorageUtils} from './storageutils';
import {AudioOnlyOverlay} from './components/audioonlyoverlay';
// HACK: gulp-tslint fails on unused files so we need this dummy import
import {ArrayUtils as Dummy} from './utils'; // tslint:disable-line

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
      const source = arguments[index];
      if (source != null) {
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

const playerui = {
  version: '{{VERSION}}',
  // Management
  UIManager,
  UIInstanceManager,
  // Utils
  ArrayUtils,
  StringUtils,
  PlayerUtils,
  UIUtils,
  BrowserUtils,
  StorageUtils,
  // Components
  AudioOnlyOverlay,
  // BufferingOverlay,
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
  // MetadataLabel,
  // MetadataLabelContent,
  PlaybackTimeLabel,
  PlaybackTimeLabelMode,
  PlaybackToggleButton,
  PlaybackToggleOverlay,
  SeekBar,
  SeekBarLabel,
  SelectBox,
  ItemSelectionList,
  // SettingsPanel,
  // SettingsPanelItem,
  // SettingsToggleButton,
  Spacer,
  // TitleBar,
  ToggleButton,
  UIContainer,
  // VideoQualitySelectBox,
  VolumeControlButton,
  VolumeSlider,
  VolumeToggleButton,
  // Watermark,
};

// Export UI as UMD module
// This goes together with the Browserify "--standalone bitmovin.playerui" config option (in the gulpfile)
declare const module: any;
module.exports = playerui;
