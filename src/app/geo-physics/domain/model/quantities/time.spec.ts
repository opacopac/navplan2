import {Time} from './time';
import {TimeUnit} from './time-unit';


describe('Time', () => {
    beforeEach(() => {
    });


    it('creates an instance', () => {
        const time = new Time(100, TimeUnit.M);
        expect(time).toBeDefined();
        expect(time.getValue(TimeUnit.M)).toEqual(100);
    });


    it('gets the min value', () => {
        const time = new Time(1, TimeUnit.H);
        expect(time.min).toEqual(time.getValue(TimeUnit.M));
    });


    it('clones an instance', () => {
        const time = new Time(3, TimeUnit.M);
        const time_clone = time.clone();
        expect(time_clone.min).toEqual(time.min);
    });


    it('converts to other units', () => {
        const time_h = new Time(10, TimeUnit.H);
        const time_m = new Time(10, TimeUnit.M);
        const time_s = new Time(10, TimeUnit.S);
        expect(time_h.getValue(TimeUnit.M)).toEqual(10 * 60);
        expect(time_h.getValue(TimeUnit.S)).toEqual(10 * 60 * 60);
        expect(time_m.getValue(TimeUnit.H)).toBeCloseTo(10 / 60, 10);
        expect(time_m.getValue(TimeUnit.S)).toEqual(10 * 60);
        expect(time_s.getValue(TimeUnit.H)).toBeCloseTo(10 / 60 / 60, 10);
        expect(time_s.getValue(TimeUnit.M)).toBeCloseTo(10 / 60, 10);
    });


    it('gets hours mins', () => {
        const h = 1;
        const m = 15.123;
        const time = new Time(h * 60 + m, TimeUnit.M);
        const hm1 = time.getHourMinutes();
        const hm2 = time.getHourMinutes(false);
        expect(hm1).toBeDefined();
        expect(hm1.length).toEqual(2);
        expect(hm1[0]).toEqual(h);
        expect(hm2[0]).toEqual(h);
        expect(hm1[1]).toEqual(Math.ceil(m));
        expect(hm2[1]).toBeCloseTo(m, 3);
    });


    it('gets mins secs', () => {
        const m = 75;
        const s = 40.123;
        const time = new Time(m * 60 + s, TimeUnit.S);
        const ms1 = time.getMinSec();
        const ms2 = time.getMinSec(false);
        expect(ms1).toBeDefined();
        expect(ms1.length).toEqual(2);
        expect(ms1[0]).toEqual(m);
        expect(ms2[0]).toEqual(m);
        expect(ms1[1]).toEqual(Math.ceil(s));
        expect(ms2[1]).toBeCloseTo(s, 3);
    });


    it('gets hours mins secs', () => {
        const h = 1;
        const m = 15;
        const s = 40.123;
        const time = new Time(h * 60 * 60 + m * 60 + s, TimeUnit.S);
        const hms1 = time.getHourMinutesSec();
        const hms2 = time.getHourMinutesSec(false);
        expect(hms1).toBeDefined();
        expect(hms1.length).toEqual(3);
        expect(hms1[0]).toEqual(h);
        expect(hms2[0]).toEqual(h);
        expect(hms1[1]).toEqual(m);
        expect(hms2[1]).toEqual(m);
        expect(hms1[2]).toEqual(Math.ceil(s));
        expect(hms2[2]).toBeCloseTo(s, 3);
    });
});
