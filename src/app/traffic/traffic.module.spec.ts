import { TrafficModule } from './traffic.module';

describe('TrafficModule', () => {
  let trafficModule: TrafficModule;

  beforeEach(() => {
    trafficModule = new TrafficModule();
  });

  it('should create an instance', () => {
    expect(trafficModule).toBeTruthy();
  });
});
