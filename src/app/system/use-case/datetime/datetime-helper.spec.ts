import {TestBed, inject} from '@angular/core/testing';
import {DatetimeHelper} from './datetime-helper';


describe('DatetimeHelper', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DatetimeHelper]
        });
    });


    it('should be created', inject([DatetimeHelper], (service: DatetimeHelper) => {
        expect(service).toBeTruthy();
    }));


    // region calcDecimalYear

    it('calculates a decimal year for the current date', () => {
        const date = new Date();
        const decYear = DatetimeHelper.calcDecimalYear();
        expect(Math.floor(decYear)).toEqual(date.getFullYear());
    });


    it('calculates the correct decimal year a specific date', () => {
        const date = new Date(2015, 6, 0, 0, 0, 0, 0); // 6 = july!
        const decYear = DatetimeHelper.calcDecimalYear(date);
        expect(Math.round(decYear * 10)).toBeCloseTo(2015.5 * 10, 0);
    });

    // endregion
});
