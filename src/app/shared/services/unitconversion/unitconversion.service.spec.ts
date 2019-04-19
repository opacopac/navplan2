import {TestBed, inject} from '@angular/core/testing';
import {UnitconversionService} from './unitconversion.service';
import {TimeUnit} from '../../model/quantities/units';


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
