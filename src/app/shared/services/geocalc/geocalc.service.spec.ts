import {TestBed, inject} from '@angular/core/testing';
import {GeocalcService} from './geocalc.service';


xdescribe('GeocalcService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GeocalcService]
        });
    });

    it('should be created', inject([GeocalcService], (service: GeocalcService) => {
        expect(service).toBeTruthy();
    }));
});
