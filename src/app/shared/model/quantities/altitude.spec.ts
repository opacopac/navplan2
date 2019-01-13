import {Altitude} from "./altitude";
import {LengthUnit} from "../units";

describe('Extent', () => {
    beforeEach(() => {
    });


    it('can create an altitude instance', () => {
        const alt = new Altitude(1, LengthUnit.NM);
        expect(alt).toBeDefined();
    });


    it('correctly determines zero values', () => {
        const alt1 = new Altitude(0, LengthUnit.NM);
        const alt2 = new Altitude(1, LengthUnit.NM);
        expect(alt1.isZero).toBeTruthy();
        expect(alt2.isZero).toBeFalsy();
    });


    it('correctly determines zero/negative values', () => {
        const alt1 = new Altitude(0, LengthUnit.NM);
        const alt2 = new Altitude(1, LengthUnit.NM);
        const alt3 = new Altitude(-1, LengthUnit.NM);
        expect(alt1.isZeroOrNegative).toBeTruthy();
        expect(alt2.isZeroOrNegative).toBeFalsy();
        expect(alt3.isZeroOrNegative).toBeTruthy();
    });


    it('correctly gets the ft value', () => {
        const alt1 = new Altitude(1, LengthUnit.FT);
        const alt2 = new Altitude(1, LengthUnit.M);
        expect(alt1.ft).toBe(1);
        expect(alt2.ft).toBeCloseTo(3,0);
    });


    it('converts the value to other units', () => {
        const alt1 = new Altitude(1, LengthUnit.FT);
        expect(alt1.getValue(LengthUnit.FT)).toBe(1);
        expect(alt1.getValue(LengthUnit.M)).toBeCloseTo(0.3, 1);
    });


    it('can be cloned', () => {
        const alt = new Altitude(1, LengthUnit.FT);
        const clone = alt.clone();
        expect(alt).toEqual(clone);
    });

});
