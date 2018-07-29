import { TrackModule } from './track.module';

describe('TrackModule', () => {
  let trackModule: TrackModule;

  beforeEach(() => {
    trackModule = new TrackModule();
  });

  it('should create an instance', () => {
    expect(trackModule).toBeTruthy();
  });
});
