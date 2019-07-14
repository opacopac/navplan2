import {TestBed} from '@angular/core/testing';
import {SystemConfig} from './system-config';


describe('SystemConfig', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SystemConfig = TestBed.get(SystemConfig);
        expect(service).toBeTruthy();
    });
});
