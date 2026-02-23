import {Length} from './length';
import {LengthUnit} from './length-unit';


describe('Length', () => {
    beforeEach(() => {
    });


    it('can create an instance', () => {
        const len = new Length(1, LengthUnit.NM);
        expect(len).toBeDefined();
        expect(len.getValue(LengthUnit.NM)).toEqual(1);
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


    // NM conversions
    it('converts NM to FT correctly (1 NM = 6076.12 ft)', () => {
        expect(Length.convert(1, LengthUnit.NM, LengthUnit.FT)).toBeCloseTo(6076.12, 0);
    });

    it('converts NM to M correctly (1 NM = 1852 m)', () => {
        expect(Length.convert(1, LengthUnit.NM, LengthUnit.M)).toBeCloseTo(1852, 0);
    });

    it('converts NM to KM correctly (1 NM = 1.852 km)', () => {
        expect(Length.convert(1, LengthUnit.NM, LengthUnit.KM)).toBeCloseTo(1.852, 3);
    });

    it('converts NM to IN correctly (1 NM = 72913.4 in)', () => {
        expect(Length.convert(1, LengthUnit.NM, LengthUnit.IN)).toBeCloseTo(72913.4, 0);
    });


    // FT conversions
    it('converts FT to NM correctly (6076.12 ft ≈ 1 NM)', () => {
        expect(Length.convert(6076.12, LengthUnit.FT, LengthUnit.NM)).toBeCloseTo(1, 2);
    });

    it('converts FT to M correctly (1 ft ≈ 0.3048 m)', () => {
        expect(Length.convert(1, LengthUnit.FT, LengthUnit.M)).toBeCloseTo(0.3048, 3);
    });

    it('converts FT to KM correctly (1000 ft ≈ 0.3048 km)', () => {
        expect(Length.convert(1000, LengthUnit.FT, LengthUnit.KM)).toBeCloseTo(0.3048, 3);
    });

    it('converts FT to IN correctly (1 ft = 12 in)', () => {
        expect(Length.convert(1, LengthUnit.FT, LengthUnit.IN)).toBeCloseTo(12, 5);
    });


    // M conversions
    it('converts M to NM correctly (1852 m = 1 NM)', () => {
        expect(Length.convert(1852, LengthUnit.M, LengthUnit.NM)).toBeCloseTo(1, 5);
    });

    it('converts M to FT correctly (1 m ≈ 3.28084 ft)', () => {
        expect(Length.convert(1, LengthUnit.M, LengthUnit.FT)).toBeCloseTo(3.28084, 4);
    });

    it('converts M to KM correctly (1000 m = 1 km)', () => {
        expect(Length.convert(1000, LengthUnit.M, LengthUnit.KM)).toBeCloseTo(1, 5);
    });

    it('converts M to IN correctly (1 m ≈ 39.37 in)', () => {
        expect(Length.convert(1, LengthUnit.M, LengthUnit.IN)).toBeCloseTo(39.37, 1);
    });


    // KM conversions
    it('converts KM to NM correctly (1.852 km = 1 NM)', () => {
        expect(Length.convert(1.852, LengthUnit.KM, LengthUnit.NM)).toBeCloseTo(1, 5);
    });

    it('converts KM to FT correctly (1 km ≈ 3280.84 ft)', () => {
        expect(Length.convert(1, LengthUnit.KM, LengthUnit.FT)).toBeCloseTo(3280.84, 1);
    });

    it('converts KM to M correctly (1 km = 1000 m)', () => {
        expect(Length.convert(1, LengthUnit.KM, LengthUnit.M)).toBeCloseTo(1000, 5);
    });

    it('converts KM to IN correctly (1 km ≈ 39370.1 in)', () => {
        expect(Length.convert(1, LengthUnit.KM, LengthUnit.IN)).toBeCloseTo(39370.1, 0);
    });


    // IN conversions
    it('converts IN to FT correctly (12 in = 1 ft)', () => {
        expect(Length.convert(12, LengthUnit.IN, LengthUnit.FT)).toBeCloseTo(1, 5);
    });

    it('converts IN to M correctly (39.3701 in ≈ 1 m)', () => {
        expect(Length.convert(39.3701, LengthUnit.IN, LengthUnit.M)).toBeCloseTo(1, 3);
    });

    it('converts IN to KM correctly (39370.1 in ≈ 1 km)', () => {
        expect(Length.convert(39370.1, LengthUnit.IN, LengthUnit.KM)).toBeCloseTo(1, 3);
    });

    it('converts IN to NM correctly (72913.4 in ≈ 1 NM)', () => {
        expect(Length.convert(72913.4, LengthUnit.IN, LengthUnit.NM)).toBeCloseTo(1, 3);
    });

});
