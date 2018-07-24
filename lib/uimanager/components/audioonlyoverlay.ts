import {ContainerConfig, Container} from './container';
import {UIInstanceManager} from '../uimanager';
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

  private indicator: Component<ComponentConfig>[];

  constructor(config: AudioOnlyOverlayConfig = {}) {
    super(config);

    this.indicator = [
      new Component<ComponentConfig>({ tag: 'div', cssClass: 'ui-audioonly-overlay-indicator', hidden: true }),
    ];

    this.config = this.mergeConfig(config, <AudioOnlyOverlayConfig>{
      cssClass: 'ui-audioonly-overlay',
      hidden: false,
      components: this.indicator,
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    let config = <AudioOnlyOverlayConfig>this.getConfig();

    let overlayShowTimeout = new Timeout(400, () => {
      config.components[0].show();
    });

    let showOverlay = () => {
      overlayShowTimeout.start();
    };

    let hideOverlay = () => {
      overlayShowTimeout.clear();
      config.components[0].hide();
    };

    player.addEventHandler(player.EVENT.ON_PLAY, showOverlay);
    player.addEventHandler(player.EVENT.ON_PAUSED, hideOverlay);
  }
}
