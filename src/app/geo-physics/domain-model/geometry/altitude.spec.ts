import {Altitude} from './altitude';
import {AltitudeUnit} from './altitude-unit';
import {AltitudeReference} from './altitude-reference';
import {Length} from '../quantities/length';
import {LengthUnit} from '../quantities/length-unit';


describe('Altitude', () => {
    beforeEach(() => {
    });


    it('creates an instance', () => {
        const alt_m_msl = new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL);
        const alt_m_gnd = new Altitude(500, AltitudeUnit.FT, AltitudeReference.GND);
        const alt_ft_msl = new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL);
        const alt_ft_gnd = new Altitude(500, AltitudeUnit.FT, AltitudeReference.GND);
        const alt_fl_std = new Altitude(500, AltitudeUnit.FL, AltitudeReference.STD);

        expect(alt_m_msl).toBeDefined();
        expect(alt_m_msl.value).toEqual(500);
        expect(alt_m_msl.unit).toEqual(AltitudeUnit.FT);
        expect(alt_m_msl.reference).toEqual(AltitudeReference.MSL);
        expect(alt_m_gnd).toBeDefined();
        expect(alt_ft_msl).toBeDefined();
        expect(alt_ft_gnd).toBeDefined();
        expect(alt_fl_std).toBeDefined();
    });


    it('creates a clone', () => {
        const alt = new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL);

        const alt2 = alt.clone();

        expect(alt2).toBeDefined();
        expect(alt2).toEqual(alt);
    });


    it('throws an error for invalid unit+ref combinations', () => {
        expect(() => { const alt = new Altitude(500, AltitudeUnit.M, AltitudeReference.STD); }).toThrow();
        expect(() => { const alt = new Altitude(500, AltitudeUnit.FT, AltitudeReference.STD); }).toThrow();
        expect(() => { const alt = new Altitude(500, AltitudeUnit.FL, AltitudeReference.MSL); }).toThrow();
        expect(() => { const alt = new Altitude(500, AltitudeUnit.FL, AltitudeReference.GND); }).toThrow();
    });


    // region same unit/ref comparisons

    it('correctly compares 2 altitudes M & MSL', () => {
        const alt1 = new Altitude(500, AltitudeUnit.M, AltitudeReference.MSL);
        const alt1b = new Altitude(500, AltitudeUnit.M, AltitudeReference.MSL);
        const alt2 = new Altitude(600, AltitudeUnit.M, AltitudeReference.MSL);

        expect(alt1.isEqual(alt1b)).toEqual(true);
        expect(alt1.isEqual(alt2)).toEqual(false);
        expect(alt1.isLowerOrEqual(alt1b)).toEqual(true);
        expect(alt1.isLowerOrEqual(alt2)).toEqual(true);
        expect(alt2.isLowerOrEqual(alt1)).toEqual(false);
        expect(alt1.isHigherOrEqual(alt1b)).toEqual(true);
        expect(alt1.isHigherOrEqual(alt2)).toEqual(false);
        expect(alt2.isHigherOrEqual(alt1)).toEqual(true);
    });


    it('correctly compares 2 altitudes FT & MSL', () => {
        const alt1 = new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL);
        const alt1b = new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL);
        const alt2 = new Altitude(600, AltitudeUnit.FT, AltitudeReference.MSL);

        expect(alt1.isEqual(alt1b)).toEqual(true);
        expect(alt1.isEqual(alt2)).toEqual(false);
        expect(alt1.isLowerOrEqual(alt1b)).toEqual(true);
        expect(alt1.isLowerOrEqual(alt2)).toEqual(true);
        expect(alt2.isLowerOrEqual(alt1)).toEqual(false);
        expect(alt1.isHigherOrEqual(alt1b)).toEqual(true);
        expect(alt1.isHigherOrEqual(alt2)).toEqual(false);
        expect(alt2.isHigherOrEqual(alt1)).toEqual(true);
    });


    it('correctly compares 2 altitudes M & GND', () => {
        const alt1 = new Altitude(500, AltitudeUnit.M, AltitudeReference.GND);
        const alt1b = new Altitude(500, AltitudeUnit.M, AltitudeReference.GND);
        const alt2 = new Altitude(600, AltitudeUnit.M, AltitudeReference.GND);

        expect(alt1.isEqual(alt1b)).toEqual(true);
        expect(alt1.isEqual(alt2)).toEqual(false);
        expect(alt1.isLowerOrEqual(alt1b)).toEqual(true);
        expect(alt1.isLowerOrEqual(alt2)).toEqual(true);
        expect(alt2.isLowerOrEqual(alt1)).toEqual(false);
        expect(alt1.isHigherOrEqual(alt1b)).toEqual(true);
        expect(alt1.isHigherOrEqual(alt2)).toEqual(false);
        expect(alt2.isHigherOrEqual(alt1)).toEqual(true);
    });


    it('correctly compares 2 altitudes FT & GND', () => {
        const alt1 = new Altitude(500, AltitudeUnit.FT, AltitudeReference.GND);
        const alt1b = new Altitude(500, AltitudeUnit.FT, AltitudeReference.GND);
        const alt2 = new Altitude(600, AltitudeUnit.FT, AltitudeReference.GND);

        expect(alt1.isEqual(alt1b)).toEqual(true);
        expect(alt1.isEqual(alt2)).toEqual(false);
        expect(alt1.isLowerOrEqual(alt1b)).toEqual(true);
        expect(alt1.isLowerOrEqual(alt2)).toEqual(true);
        expect(alt2.isLowerOrEqual(alt1)).toEqual(false);
        expect(alt1.isHigherOrEqual(alt1b)).toEqual(true);
        expect(alt1.isHigherOrEqual(alt2)).toEqual(false);
        expect(alt2.isHigherOrEqual(alt1)).toEqual(true);
    });


    it('correctly compares 2 altitudes FL & STD', () => {
        const alt1 = new Altitude(500, AltitudeUnit.FL, AltitudeReference.STD);
        const alt1b = new Altitude(500, AltitudeUnit.FL, AltitudeReference.STD);
        const alt2 = new Altitude(600, AltitudeUnit.FL, AltitudeReference.STD);

        expect(alt1.isEqual(alt1b)).toEqual(true);
        expect(alt1.isEqual(alt2)).toEqual(false);
        expect(alt1.isLowerOrEqual(alt1b)).toEqual(true);
        expect(alt1.isLowerOrEqual(alt2)).toEqual(true);
        expect(alt2.isLowerOrEqual(alt1)).toEqual(false);
        expect(alt1.isHigherOrEqual(alt1b)).toEqual(true);
        expect(alt1.isHigherOrEqual(alt2)).toEqual(false);
        expect(alt2.isHigherOrEqual(alt1)).toEqual(true);
    });

    // endregion


    // region different unit, same ref comparison

    xit('correctly compares FT & M for ref MSL', () => {
        const alt_m = 500;
        const alt_ft = Length.convert(alt_m, LengthUnit.M, LengthUnit.FT);
        const alt1 = new Altitude(alt_m, AltitudeUnit.M, AltitudeReference.MSL);
        const alt1b = new Altitude(alt_ft, AltitudeUnit.FT, AltitudeReference.MSL);
        const alt2 = new Altitude(alt_ft + 1, AltitudeUnit.FT, AltitudeReference.MSL);

        expect(alt1.isEqual(alt1b)).toEqual(true);
        expect(alt1.isEqual(alt2)).toEqual(false);
        expect(alt1.isLowerOrEqual(alt1b)).toEqual(true);
        expect(alt1.isLowerOrEqual(alt2)).toEqual(true);
        expect(alt2.isLowerOrEqual(alt1)).toEqual(false);
        expect(alt1.isHigherOrEqual(alt1b)).toEqual(true);
        expect(alt1.isHigherOrEqual(alt2)).toEqual(false);
        expect(alt2.isHigherOrEqual(alt1)).toEqual(true);
    });


    xit('correctly compares FT & M for ref GND', () => {
        const alt_m = 500;
        const alt_ft = Length.convert(alt_m, LengthUnit.M, LengthUnit.FT);
        const alt1 = new Altitude(alt_m, AltitudeUnit.M, AltitudeReference.GND);
        const alt1b = new Altitude(alt_ft, AltitudeUnit.FT, AltitudeReference.GND);
        const alt2 = new Altitude(alt_ft + 1, AltitudeUnit.FT, AltitudeReference.GND);

        expect(alt1.isEqual(alt1b)).toEqual(true);
        expect(alt1.isEqual(alt2)).toEqual(false);
        expect(alt1.isLowerOrEqual(alt1b)).toEqual(true);
        expect(alt1.isLowerOrEqual(alt2)).toEqual(true);
        expect(alt2.isLowerOrEqual(alt1)).toEqual(false);
        expect(alt1.isHigherOrEqual(alt1b)).toEqual(true);
        expect(alt1.isHigherOrEqual(alt2)).toEqual(false);
        expect(alt2.isHigherOrEqual(alt1)).toEqual(true);
    });

    // endregion
});
