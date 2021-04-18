import {inject, TestBed} from '@angular/core/testing';
import {StringnumberHelper} from './stringnumber-helper';
import {Angle} from '../../../common/geo-math/domain-model/quantities/angle';
import {AngleUnit} from '../../../common/geo-math/domain-model/quantities/units';


describe('StringnumberHelper', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StringnumberHelper]
        });
    });


    it('should be created', inject([StringnumberHelper], (service: StringnumberHelper) => {
        expect(service).toBeTruthy();
    }));



    it('correctly creates eastern angle strings', () => {
        const angle = new Angle(7.123, AngleUnit.DEG);
        const text = StringnumberHelper.getEWString(angle, 1);

        expect(text).toBe('7.1° E');
    });


    it('correctly creates western angle strings', () => {
        const angle = new Angle(-44.649, AngleUnit.DEG);
        const text = StringnumberHelper.getEWString(angle, 2);

        expect(text).toBe('44.65° W');
    });
});
