import {OpenAipModule} from './open-aip.module';

describe('OpenAipModule', () => {
    let openAipModule: OpenAipModule;

    beforeEach(() => {
        openAipModule = new OpenAipModule();
    });

    it('should create an instance', () => {
        expect(openAipModule).toBeTruthy();
    });
});
