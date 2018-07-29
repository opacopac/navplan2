import { FlightTimerModule } from './flight-timer.module';

describe('FlightTimerModule', () => {
  let flightTimerModule: FlightTimerModule;

  beforeEach(() => {
    flightTimerModule = new FlightTimerModule();
  });

  it('should create an instance', () => {
    expect(flightTimerModule).toBeTruthy();
  });
});
