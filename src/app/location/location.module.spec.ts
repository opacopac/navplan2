import { LocationModule } from './location.module';

describe('TrackModule', () => {
  let trackModule: LocationModule;

  beforeEach(() => {
    trackModule = new LocationModule();
  });

  it('should create an instance', () => {
    expect(trackModule).toBeTruthy();
  });
});
