import {Length} from './length';
import {LengthUnit} from '../units';


describe('Length', () => {
    beforeEach(() => {
    });


    it('can create an instance', () => {
        const len = new Length(1, LengthUnit.NM);
        expect(len).toBeDefined();
    });


    it('correctly determines zero values', () => {
        const len1 = new Length(0, LengthUnit.NM);
        const len2 = new Length(1, LengthUnit.NM);
        expect(len1.isZero).toBeTruthy();
        expect(len2.isZero).toBeFalsy();
    });


    it('correctly determines zero/negative values', () => {
        const len1 = new Length(0, LengthUnit.NM);
        const len2 = new Length(1, LengthUnit.NM);
        const len3 = new Length(-1, LengthUnit.NM);
        expect(len1.isZeroOrNegative).toBeTruthy();
        expect(len2.isZeroOrNegative).toBeFalsy();
        expect(len3.isZeroOrNegative).toBeTruthy();
    });


    it('correctly gets the ft value', () => {
        const len1 = new Length(1, LengthUnit.FT);
        const len2 = new Length(1, LengthUnit.M);
        expect(len1.ft).toBe(1);
        expect(len2.ft).toBeCloseTo(3, 0);
    });


    it('correctly gets the NM value', () => {
        const len1 = new Length(6076.12, LengthUnit.FT);
        const len2 = new Length(1852, LengthUnit.M);
        const len3 = new Length(1, LengthUnit.NM);
        expect(len1.nm).toBeCloseTo(1, 0);
        expect(len2.nm).toBeCloseTo(1, 0);
        expect(len3.nm).toBe(1);
    });


    it('converts the value to other units', () => {
        const len1 = new Length(1, LengthUnit.FT);
        expect(len1.getValue(LengthUnit.FT)).toBe(1);
        expect(len1.getValue(LengthUnit.M)).toBeCloseTo(0.3, 1);
    });


    it('can be cloned', () => {
        const alt = new Length(1, LengthUnit.FT);
        const clone = alt.clone();
        expect(alt).toEqual(clone);
    });


    it('adds same units exactly', () => {
        const len1 = new Length(10, LengthUnit.NM);
        const len2 = new Length(15, LengthUnit.NM);
        const altAdd = len1.add(len2);

        expect(altAdd.getValue(LengthUnit.NM)).toEqual(10 + 15);
    });


    it('adds different units approximately (converting via M)', () => {
        const len1 = new Length(10, LengthUnit.FT);
        const len2 = new Length(15, LengthUnit.M);
        const altAdd = len1.add(len2);

        expect(altAdd.getValue(LengthUnit.FT)).toBeCloseTo(10 + 15 * 3.28084, 0);
    });


    it('does not change the original values when adding', () => {
        const len1 = new Length(10, LengthUnit.NM);
        const len2 = new Length(15, LengthUnit.NM);
        const altAdd = len1.add(len2);

        expect(altAdd).toBeDefined();
        expect(len1.nm).toEqual(10);
        expect(len2.nm).toEqual(15);
    });

});
