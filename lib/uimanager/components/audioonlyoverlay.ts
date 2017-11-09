import {ContainerConfig, Container} from './container';
import {UIInstanceManager} from '../uimanager';
import {Component, ComponentConfig} from './component';
// import PlayerEvent = bitmovin.PlayerAPI.PlayerEvent;

/**
 * Overlays the player and displays an audio-only indicator.
 */
export class AudioOnlyOverlay extends Container<ContainerConfig> {

  private audioonly: Component<ComponentConfig>[];

  constructor(config: ContainerConfig = {}) {
    super(config);

    this.audioonly = [
      new Component<ComponentConfig>({ tag: 'div', cssClass: 'ui-audioonly-overlay-indicator' }),
    ];

    this.config = this.mergeConfig(config, <ComponentConfig>{
      cssClass: 'ui-audioonly-overlay',
      components: this.audioonly,
      hidden: false,
    }, this.config);
  }

  configure(player: bitmovin.PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    let self = this;
    let image = self.getDomElement().css('background-image');

    // Hide overlay when Player is paused, so we can see the Big Play Button

    player.addEventHandler(player.EVENT.ON_PAUSED, (event) => {
      self.getDomElement().css('background-image', 'none');
    });

    player.addEventHandler(player.EVENT.ON_PLAY, (event) => {
      self.getDomElement().css('background-image', image);
    });

    // Hide overlay if player is  paused at init (e.g. on mobile devices)
    if (!player.isPlaying()) {
      self.getDomElement().css('background-image', 'none');
    }
  }

}
