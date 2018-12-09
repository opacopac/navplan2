import {TestBed} from '@angular/core/testing';
import {JwtService} from './jwt.service';


xdescribe('JwtService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: JwtService = TestBed.get(JwtService);
        expect(service).toBeTruthy();
    });
});
