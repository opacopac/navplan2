import { NotamModule } from './notam.module';

describe('NotamModule', () => {
  let notamModule: NotamModule;

  beforeEach(() => {
    notamModule = new NotamModule();
  });

  it('should create an instance', () => {
    expect(notamModule).toBeTruthy();
  });
});
