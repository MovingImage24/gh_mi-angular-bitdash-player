import {ContainerConfig, Container} from './container';
import {UIInstanceManager} from '../uimanager';
import {Component, ComponentConfig} from './component';

/**
 * Overlays the player and displays an audio-only indicator.
 */
export class AudioOnlyOverlay extends Container<ContainerConfig> {

  private audioonly: Component<ComponentConfig>[];

  constructor(config: ContainerConfig = {}) {
    super(config);

    this.audioonly = [
      new Component<ComponentConfig>({ tag: 'div', cssClass: 'ui-audioonly-overlay-indicator' })
    ];

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-audioonly-overlay',
      hidden: false,
      components: this.audioonly
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    let self = this;

  }
}
