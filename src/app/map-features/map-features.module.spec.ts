import { MapFeaturesModule } from './map-features.module';

describe('MapFeaturesModule', () => {
  let mapFeaturesModule: MapFeaturesModule;

  beforeEach(() => {
    mapFeaturesModule = new MapFeaturesModule();
  });

  it('should create an instance', () => {
    expect(mapFeaturesModule).toBeTruthy();
  });
});
