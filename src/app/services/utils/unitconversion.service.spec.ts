import {TestBed, inject} from '@angular/core/testing';
import {TimeUnit, UnitconversionService} from './unitconversion.service';


describe('UnitconversionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UnitconversionService]
        });
    });


    it('should be created', inject([UnitconversionService], (service: UnitconversionService) => {
        expect(service).toBeTruthy();
    }));


    it('correctly converts minutes to hours', () => {
        const min = 60;
        const hour = UnitconversionService.convertTime(min, TimeUnit.M, TimeUnit.H);
        expect(hour).toBe(1);
    });
});
