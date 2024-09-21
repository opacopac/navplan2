import {AtmosphereService} from './atmosphere.service';
import {Length} from '../../model/quantities/length';
import {LengthUnit} from '../../model/quantities/length-unit';
import {PressureUnit} from '../../model/quantities/pressure-unit';
import {Pressure} from '../../model/quantities/pressure';

describe('AtmosphereService', () => {
    beforeEach(() => {
    });


    it('calculates the correct altitude for standard pressure at sea level', () => {
        // given
        const elevation = Length.createZero();
        const qnh = AtmosphereService.getStandardPressure();

        // when
        const pa = AtmosphereService.calcPressureAltitude(elevation, qnh);

        // then
        expect(pa.value).toBe(0);
    });


    it('calculates the correct pressure altitude for standard pressure at 1000 ft elevation', () => {
        // given
        const elevation = new Length(1000, LengthUnit.FT);
        const qnh = AtmosphereService.getStandardPressure();

        // when
        const pa = AtmosphereService.calcPressureAltitude(elevation, qnh);

        // then
        expect(pa.ft).toBe(1000);
    });


    it('calculates the correct pressure altitude for high pressure at 1670 ft elevation', () => {
        // given
        const elevation = new Length(1670, LengthUnit.FT);
        const qnh = new Pressure(1030, PressureUnit.HPA);

        // when
        const pa = AtmosphereService.calcPressureAltitude(elevation, qnh);

        // then
        expect(pa.ft).toBeGreaterThan(1150);
        expect(pa.ft).toBeLessThan(1170);
    });


    it('calculates the correct pressure altitude for low pressure at 1670 ft elevation', () => {
        // given
        const elevation = new Length(1670, LengthUnit.FT);
        const qnh = new Pressure(990, PressureUnit.HPA);

        // when
        const pa = AtmosphereService.calcPressureAltitude(elevation, qnh);

        // then
        expect(pa.ft).toBeGreaterThan(2350);
        expect(pa.ft).toBeLessThan(2370);
    });


    it('calculates the correct isa temperature for std pressure at sea level', () => {
        // given
        const pa = Length.createZero();
        const oat = AtmosphereService.getStandardTemperature();

        // when
        const isaTemp = AtmosphereService.calcIsaTemperature(pa, oat);

        // then
        expect(isaTemp.c).toBe(15);
    });


    it('calculates the correct isa temperature for std pressure at 1000 ft elevation', () => {
        // given
        const pa = new Length(1000, LengthUnit.FT);
        const oat = AtmosphereService.getStandardTemperature();

        // when
        const isaTemp = AtmosphereService.calcIsaTemperature(pa, oat);

        // then
        expect(isaTemp.c).toBe(13);
    });
});
