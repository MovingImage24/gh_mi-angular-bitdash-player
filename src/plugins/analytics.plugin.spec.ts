import { Logger } from '../models';
import { PlayerApi } from '../player-api';
import { PlayerEvent } from '../player-event';
import { AnalyticsPlugin, deps } from './analytics.plugin';
import SpyObj = jasmine.SpyObj;

describe('AnalyticsPlugin', () => {

  let playerApi: SpyObj<PlayerApi>;
  let logger: Logger;
  let axios: any;
  let axiosInstance: any;
  let windowMock: any;

  beforeEach(() => {
    playerApi = jasmine.createSpyObj<PlayerApi>('PlayerApi', ['on', 'off']);
    logger = jasmine.createSpyObj('Logger', ['error']);
    axios = jasmine.createSpyObj('Axios', ['create']);
    windowMock = jasmine.createSpyObj('WindowMock', ['removeEventListener', 'addEventListener']);

    axiosInstance = jasmine.createSpyObj('AxiosInstance', ['get']);
    axiosInstance.get.and.returnValue(Promise.resolve());
    axios.create.and.returnValue(axiosInstance);

    deps.axios = axios;
    deps.window = windowMock;
  });

  it('should send view-event on init and register player events', () => {
    const expectedCallParams = {
      params: { 'event': 'view', 'video-id': 'video-id-1', 'url': 'http://localhost:9876/context.html' }
    };

    const plugin = new AnalyticsPlugin(playerApi, 'video-id-1', logger);
    plugin.init();

    expect(plugin).toBeDefined();
    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    expect(axiosInstance.get).toHaveBeenCalledWith('event?', expectedCallParams);

    expect(playerApi.on).toHaveBeenCalledTimes(3);
    expect(playerApi.on.calls.argsFor(0)[0]).toBe(PlayerEvent.PLAY);
    expect(playerApi.on.calls.argsFor(1)[0]).toBe(PlayerEvent.ENDED);
    expect(playerApi.on.calls.argsFor(2)[0]).toBe(PlayerEvent.TimeChanged);
  });

  it('should send plays event on first play', () => {
    const expectedCallParams = {
      params: { 'event': 'play', 'video-id': 'video-id-1', 'url': 'http://localhost:9876/context.html' }
    };

    const plugin = new AnalyticsPlugin(playerApi, 'video-id-1', logger);
    plugin.init();

    const play = playerApi.on.calls.argsFor(0);
    expect(play[0]).toBe(PlayerEvent.PLAY);

    play[1]();

    expect(plugin).toBeDefined();
    expect(axiosInstance.get).toHaveBeenCalledTimes(2);
    expect(axiosInstance.get).toHaveBeenCalledWith('event?', expectedCallParams);

    expect(playerApi.off).toHaveBeenCalledTimes(1);
    expect(playerApi.off.calls.argsFor(0)[0]).toBe('playing');
  });

  it('should send exit event on video ended', () => {
    const expectedViewEventParams = {
      params: { 'event': 'view', 'video-id': 'video-id-1', 'url': 'http://localhost:9876/context.html' }
    };
    const expectedPlayEventParams = {
      params: { 'event': 'play', 'video-id': 'video-id-1', 'url': 'http://localhost:9876/context.html' }
    };
    const expectedExitEventParams = {
      params: { 'event': 'exit', 'video-id': 'video-id-1', 'current-time': 10 }
    };

    const plugin = new AnalyticsPlugin(playerApi, 'video-id-1', logger);
    plugin.init();

    const play = playerApi.on.calls.argsFor(0);
    expect(play[0]).toBe(PlayerEvent.PLAY);

    const ended = playerApi.on.calls.argsFor(1);
    expect(ended[0]).toBe(PlayerEvent.ENDED);

    const timeUpdate = playerApi.on.calls.argsFor(2);
    expect(timeUpdate[0]).toBe(PlayerEvent.TimeChanged);

    play[1]();
    timeUpdate[1]({ time: 10 });
    ended[1]();

    expect(plugin).toBeDefined();
    expect(axiosInstance.get).toHaveBeenCalledTimes(3);

    expect(axiosInstance.get.calls.argsFor(0)[1]).toEqual(expectedViewEventParams);
    expect(axiosInstance.get.calls.argsFor(1)[1]).toEqual(expectedPlayEventParams);
    expect(axiosInstance.get.calls.argsFor(2)[1]).toEqual(expectedExitEventParams);

    // after the video ends, we add the play-handler again
    expect(playerApi.off).toHaveBeenCalledWith('playing', jasmine.any(Function));
    expect(playerApi.on.calls.argsFor(3)[0]).toBe(PlayerEvent.PLAY);
  });

  it('should log error on send error', (done) => {
    axiosInstance.get.and.returnValue(Promise.reject('error'));

    const plugin = new AnalyticsPlugin(playerApi, 'video-id-1', logger);
    plugin.init();

    setTimeout(() => {
      expect(plugin).toBeDefined();
      expect(axiosInstance.get).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);

      done();
    });

  });

  it('should add beforeunload listener after play and remove it on destroy', () => {
    const plugin = new AnalyticsPlugin(playerApi, 'video-id-1', logger);
    plugin.init();

    // should not be added before the play event happened
    expect(windowMock.addEventListener).toHaveBeenCalledTimes(0);

    const play = playerApi.on.calls.argsFor(0);
    expect(play[0]).toBe(PlayerEvent.PLAY);

    play[1]();

    windowMock.addEventListener.calls.argsFor(0)[1]();

    plugin.destroy();

    expect(windowMock.addEventListener).toHaveBeenCalledTimes(1);
    expect(windowMock.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('should be the same behaviour without view event when video was not played', () => {
    const plugin = new AnalyticsPlugin(playerApi, 'video-id-1', logger);
    const recoverState = { hasEnded: false, seekTo: 0, playPressed: false, isMuted: false, volume: 100, selectedSubtitleId: null };
    plugin.initRecovered(recoverState);

    expect(axiosInstance.get).not.toHaveBeenCalled();

    expect(playerApi.on).toHaveBeenCalledTimes(3);
    expect(playerApi.on.calls.argsFor(0)[0]).toBe(PlayerEvent.PLAY);
    expect(playerApi.on.calls.argsFor(1)[0]).toBe(PlayerEvent.ENDED);
    expect(playerApi.on.calls.argsFor(2)[0]).toBe(PlayerEvent.TimeChanged);

    expect(windowMock.addEventListener).not.toHaveBeenCalled();
  });

  it('should be the same behaviour without view event when video was played', () => {
    const recoverState = { hasEnded: false, seekTo: 0, playPressed: true, isMuted: false, volume: 100, selectedSubtitleId: null };
    const plugin = new AnalyticsPlugin(playerApi, 'video-id-1', logger);
    plugin.initRecovered(recoverState);

    expect(axiosInstance.get).not.toHaveBeenCalled();

    expect(playerApi.on).toHaveBeenCalledTimes(2);
    expect(playerApi.on.calls.argsFor(0)[0]).toBe(PlayerEvent.ENDED);
    expect(playerApi.on.calls.argsFor(1)[0]).toBe(PlayerEvent.TimeChanged);

    expect(windowMock.addEventListener).toHaveBeenCalledTimes(1);
  });

});
