import {inject, TestBed} from '@angular/core/testing';
import {StringnumberService} from './stringnumber.service';
import {Angle} from '../../model/quantities/angle';
import {AngleUnit} from '../../model/units';


describe('StringnumberService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StringnumberService]
        });
    });


    it('should be created', inject([StringnumberService], (service: StringnumberService) => {
        expect(service).toBeTruthy();
    }));



    it('correctly creates eastern angle strings', () => {
        const angle = new Angle(7.123, AngleUnit.DEG);
        const text = StringnumberService.getEWString(angle, 1);

        expect(text).toBe('7.1° E');
    });


    it('correctly creates western angle strings', () => {
        const angle = new Angle(-44.649, AngleUnit.DEG);
        const text = StringnumberService.getEWString(angle, 2);

        expect(text).toBe('44.65° W');
    });
});
