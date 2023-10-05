import {Angle} from './angle';
import {AngleUnit} from './angle-unit';


describe('Angle', () => {
    beforeEach(() => {
    });


    it('can create an angle instance', () => {
        const ang = new Angle(10, AngleUnit.DEG);
        expect(ang).toBeDefined();
    });


    it('can create 0 angle instance', () => {
        const ang = Angle.createZero();
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


    // region calcSmallDiffAngle

    it('gets the smallest turn angle for identical angles', () => {
        const angle1 = new Angle(10, AngleUnit.DEG);
        const angle2 = new Angle(10, AngleUnit.DEG);
        const dir = Angle.calcSmallDiffAngle(angle1, angle2);

        expect(dir.deg).toBe(0);
    });


    it('gets the smallest turn angle for increasing small angles', () => {
        const angle1 = new Angle(10, AngleUnit.DEG);
        const angle2 = new Angle(12, AngleUnit.DEG);
        const dir = Angle.calcSmallDiffAngle(angle1, angle2);

        expect(dir.deg).toBe(2);
    });


    it('gets the smallest turn angle for decreasing small angles', () => {
        const angle1 = new Angle(10, AngleUnit.DEG);
        const angle2 = new Angle(8, AngleUnit.DEG);
        const dir = Angle.calcSmallDiffAngle(angle1, angle2);

        expect(dir.deg).toBe(-2);
    });


    it('gets the smallest turn angle for increasing angles near 0/360', () => {
        const angle1 = new Angle(358, AngleUnit.DEG);
        const angle2 = new Angle(5, AngleUnit.DEG);
        const dir = Angle.calcSmallDiffAngle(angle1, angle2);

        expect(dir.deg).toBe(7);
    });


    it('gets the smallest turn angle for decreasing angles near 0/360', () => {
        const angle1 = new Angle(2, AngleUnit.DEG);
        const angle2 = new Angle(355, AngleUnit.DEG);
        const dir = Angle.calcSmallDiffAngle(angle1, angle2);

        expect(dir.deg).toBe(-7);
    });


    it('gets the smallest turn angle for increasing large angles', () => {
        const angle1 = new Angle(90, AngleUnit.DEG);
        const angle2 = new Angle(270, AngleUnit.DEG);
        const dir = Angle.calcSmallDiffAngle(angle1, angle2);

        expect(dir.deg).toBe(180);
    });


    it('gets the smallest turn angle for decreasing large angles', () => {
        const angle1 = new Angle(90, AngleUnit.DEG);
        const angle2 = new Angle(271, AngleUnit.DEG);
        const dir = Angle.calcSmallDiffAngle(angle1, angle2);

        expect(dir.deg).toBe(-179);
    });

    // endregion
});
