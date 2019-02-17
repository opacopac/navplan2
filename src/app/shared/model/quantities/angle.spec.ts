import {Angle} from './angle';
import {AngleUnit} from '../units';


describe('Angle', () => {
    beforeEach(() => {
    });


    it('can create an angle instance', () => {
        const ang = new Angle(10, AngleUnit.DEG);
        expect(ang).toBeDefined();
    });


    it('can create 0 angle instance', () => {
        const ang = Angle.getZero();
        expect(ang).toBeDefined();
        expect(ang.isZero).toBeTruthy();
    });


    it('correctly detects 0 angle', () => {
        const ang = new Angle(0, AngleUnit.RAD);
        expect(ang.isZero).toBeTruthy();
    });


    it('correctly calculates the rad property', () => {
        const ang1 = new Angle(1, AngleUnit.RAD);
        const ang2 = new Angle(180, AngleUnit.DEG);
        expect(ang1.rad).toBe(1);
        expect(ang2.rad).toBeCloseTo(3.1415, 3);
    });


    it('correctly calculates the deg property', () => {
        const ang1 = new Angle(10, AngleUnit.DEG);
        const ang2 = new Angle(3.1415, AngleUnit.RAD);
        expect(ang1.deg).toBe(10);
        expect(ang2.deg).toBeCloseTo(180, 0);
    });


    it('correctly converts to other units', () => {
        const ang1 = new Angle(180, AngleUnit.DEG);
        const ang2 = new Angle(3.1415, AngleUnit.RAD);
        expect(ang1.getValue(AngleUnit.RAD)).toBeCloseTo(3.1415, 3);
        expect(ang2.getValue(AngleUnit.DEG)).toBeCloseTo(180, 0);
    });
});
