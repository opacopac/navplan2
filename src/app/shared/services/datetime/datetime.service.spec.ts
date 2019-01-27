import {TestBed, inject} from '@angular/core/testing';
import {DatetimeService} from './datetime.service';


describe('DatetimeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DatetimeService]
        });
    });


    it('should be created', inject([DatetimeService], (service: DatetimeService) => {
        expect(service).toBeTruthy();
    }));


    // region calcDecimalYear

    it('calculates a decimal year for the current date', () => {
        const date = new Date();
        const decYear = DatetimeService.calcDecimalYear();
        expect(decYear).toBeCloseTo(date.getFullYear(), 0);
    });


    it('calculates the correct decimal year a specific date', () => {
        const date = new Date(2015, 6, 0, 0, 0, 0, 0); // 6 = july!
        const decYear = DatetimeService.calcDecimalYear(date);
        expect(Math.round(decYear * 10)).toBeCloseTo(2015.5 * 10, 0);
    });

    // endregion
});
