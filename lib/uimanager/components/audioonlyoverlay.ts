import {Container, ContainerConfig} from './container';
import {MIUIConfig, UIAudioOnlyOverlayConfig, UIInstanceManager} from '../uimanager';
import {Component, ComponentConfig} from './component';
import {Timeout} from '../timeout';

/**
 * Configuration interface for the {@link AudioOnlyOverlay} component.
 */
export interface AudioOnlyOverlayConfig extends ContainerConfig {
}

/**
 * Overlays the player and displays an audio-only indicator.
 */
export class AudioOnlyOverlay extends Container<AudioOnlyOverlayConfig> {
  private indicatorConfig: Component<ComponentConfig>[];
  private componentConfig: UIAudioOnlyOverlayConfig;

  constructor(config: AudioOnlyOverlayConfig = {}) {
    super(config);

    this.indicatorConfig = [
      new Component<ComponentConfig>({tag: 'div', cssClass: 'ui-audioonly-overlay-indicator', hidden: true}),
    ];

    this.config = this.mergeConfig(config, <AudioOnlyOverlayConfig>{
      cssClass: 'ui-audioonly-overlay',
      hidden: false,
      components: this.indicatorConfig,
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    this.componentConfig = (uimanager.getConfig() as MIUIConfig).audioOnlyOverlayConfig || {};
    const config = <AudioOnlyOverlayConfig>this.getConfig();
    const indicator = config.components[0];

    const backgroundImageUrl = this.componentConfig.backgroundImageUrl;
    const element = this.getDomElement();

    const showBackgroundImage = () => {
      element.css('backgroundImage', `url(${backgroundImageUrl})`);
      element.css('backgroundSize', 'contain');
      element.css('backgroundColor', '#000000');
      element.css('animation', 'none');
      element.css('backgroundPosition', 'center');
    };

    const overlayShowTimeout = new Timeout(400, () => {
      indicator.show();
    });

    const showOverlay = () => {
      overlayShowTimeout.start();
    };

    const hideOverlay = () => {
      overlayShowTimeout.clear();
      indicator.hide();
    };

    if (backgroundImageUrl) {
      showBackgroundImage();
    }

    if (!this.componentConfig.hiddeIndicator) {
      player.addEventHandler(player.EVENT.ON_PLAY, showOverlay);
      player.addEventHandler(player.EVENT.ON_PAUSED, hideOverlay);
    }
  }
}