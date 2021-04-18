import {Time} from './time';
import {TimeUnit} from './units';


describe('AbstractQuantity', () => {
    beforeEach(() => {
    });


    it('determines if the value is zero', () => {
        const time_0 = new Time(0, TimeUnit.M);
        const time_1 = new Time(1, TimeUnit.M);
        const time_M1 = new Time(-11, TimeUnit.M);
        expect(time_0.isZero()).toBeTruthy();
        expect(time_1.isZero()).toBeFalsy();
        expect(time_M1.isZero()).toBeFalsy();
    });


    it('determines if the value is zero or negative', () => {
        const time_0 = new Time(0, TimeUnit.M);
        const time_1 = new Time(1, TimeUnit.M);
        const time_M1 = new Time(-11, TimeUnit.M);
        expect(time_0.isZeroOrNegative()).toBeTruthy();
        expect(time_1.isZeroOrNegative()).toBeFalsy();
        expect(time_M1.isZeroOrNegative()).toBeTruthy();
    });


    it('adds quantities with same units', () => {
        const time_0 = new Time(10, TimeUnit.M);
        const time_1 = new Time(20, TimeUnit.M);
        const time_sum = time_0.add(time_1);
        expect(time_sum.getValue(TimeUnit.M)).toEqual(30);
    });


    it('adds quantities with different units', () => {
        const time_0 = new Time(10, TimeUnit.M);
        const time_1 = new Time(20, TimeUnit.S);
        const time_sum = time_0.add(time_1);
        expect(time_sum.getValue(TimeUnit.S)).toEqual(10 * 60 + 20);
    });
});
