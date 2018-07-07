import { MetarTafModule } from './metar-taf.module';

describe('MetarTafModule', () => {
  let metarTafModule: MetarTafModule;

  beforeEach(() => {
    metarTafModule = new MetarTafModule();
  });

  it('should create an instance', () => {
    expect(metarTafModule).toBeTruthy();
  });
});
