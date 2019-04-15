import SpyObj = jasmine.SpyObj;
import { WebcastVideoTrackConfig } from '../models';
import { PlayerApi } from '../player-api';
import { PlayerEvent } from '../player-event';
import { SubtitlesPlugin } from './subtitles.plugin';

describe('SubtitlesPlugin', () => {
  let playerApi: SpyObj<PlayerApi>;

  beforeEach(() => {
    playerApi = jasmine.createSpyObj<PlayerApi>('PlayerApi', ['on', 'off', 'addSubtitle']);
  });

  it('should be created', () => {
    const givenTracks: WebcastVideoTrackConfig[] = [
      createTrack()
    ];

    const plugin = new SubtitlesPlugin(givenTracks);
    plugin.init(playerApi);

    const [sourceLoadedEventName] = playerApi.on.calls.argsFor(0);

    expect(playerApi.on).toHaveBeenCalledTimes(1);
    expect(sourceLoadedEventName).toBe(PlayerEvent.ON_SOURCE_LOADED);
  });

  it('should add subtitles to player', () => {
    const firstTrack = createTrack();
    const givenTracks: WebcastVideoTrackConfig[] = [firstTrack];

    const plugin = new SubtitlesPlugin(givenTracks);
    plugin.init(playerApi);

    const [sourceLoadedEventName, sourceLoadedEventFunction] = playerApi.on.calls.argsFor(0);

    sourceLoadedEventFunction();

    expect(sourceLoadedEventName).toBe(PlayerEvent.ON_SOURCE_LOADED);
    expect(playerApi.addSubtitle).toHaveBeenCalledWith(firstTrack, 'subtitle0');
  });

  it('should remove listeners on player destroy', () => {
    const firstTrack = createTrack();
    const givenTracks: WebcastVideoTrackConfig[] = [firstTrack];

    const plugin = new SubtitlesPlugin(givenTracks);
    plugin.init(playerApi);

    const [sourceLoadedEventName, sourceLoadedEventFunction] = playerApi.on.calls.argsFor(0);

    sourceLoadedEventFunction();

    expect(sourceLoadedEventName).toBe(PlayerEvent.ON_SOURCE_LOADED);
    expect(playerApi.addSubtitle).toHaveBeenCalledWith(firstTrack, 'subtitle0');

    plugin.destroy();
    expect(playerApi.off).toHaveBeenCalledWith(PlayerEvent.ON_SOURCE_LOADED, jasmine.any(Function));
  });


  function createTrack(): WebcastVideoTrackConfig {
    return {
      language: 'en',
      country: '',
      label: 'English',
      source: 'https://sunny_weather.vtt',
      type: 'SUBTITLES'
    };
  }


});
