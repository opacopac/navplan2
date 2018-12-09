import {TestBed, inject} from '@angular/core/testing';
import {MapfeaturesService} from './mapfeatures.service';


xdescribe('MapfeaturesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MapfeaturesService]
        });
    });

    it('should be created', inject([MapfeaturesService], (service: MapfeaturesService) => {
        expect(service).toBeTruthy();
    }));
});
