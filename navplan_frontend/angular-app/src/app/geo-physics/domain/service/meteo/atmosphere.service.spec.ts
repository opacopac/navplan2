import {AtmosphereService} from './atmosphere.service';
import {Length} from '../../model/quantities/length';
import {Pressure} from '../../model/quantities/pressure';
import {Temperature} from '../../model/quantities/temperature';


describe('AtmosphereService', () => {
    beforeEach(() => {
    });


    it('calculates the pressure altitude for standard pressure at 0ft, 1000ft, 10000ft', () => {
        // given
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const alt0 = Length.ofZero();
        const alt1000 = Length.ofFt(1000);
        const alt10000 = Length.ofFt(10000);

        // when
        const pa0 = AtmosphereService.calcPressureAltitude(alt0, qnh);
        const pa1000 = AtmosphereService.calcPressureAltitude(alt1000, qnh);
        const pa10000 = AtmosphereService.calcPressureAltitude(alt10000, qnh);

        // then
        expect(pa0.value).toBe(0);
        expect(pa1000.value).toBe(1000);
        expect(pa10000.value).toBe(10000);
    });


    it('calculates the pressure altitude for std/high/low pressure at 1670 ft', () => {
        // given
        const elevation = Length.ofFt(1670);
        const qnhStd = AtmosphereService.getStandardPressureAtSeaLevel();
        const qnhHigh = Pressure.ofHpa(1030);
        const qnhLow = Pressure.ofHpa(990);

        // when
        const paStd = AtmosphereService.calcPressureAltitude(elevation, qnhStd);
        const paHigh = AtmosphereService.calcPressureAltitude(elevation, qnhHigh);
        const paLow = AtmosphereService.calcPressureAltitude(elevation, qnhLow);

        // then
        expect(paStd.ft).toBe(1670);
        expect(paHigh.ft).toBeCloseTo(1167, -1);
        expect(paLow.ft).toBeCloseTo(2367, -1);
    });


    it('calculates the standard temperature at 0ft, 1000ft, 10000ft', () => {
        // given
        const alt0 = Length.ofZero();
        const alt1000 = Length.ofFt(1000);
        const alt10000 = Length.ofFt(10000);

        // when
        const isaTemp0 = AtmosphereService.calcStandardTemperatureAtAltitude(alt0);
        const isaTemp1000 = AtmosphereService.calcStandardTemperatureAtAltitude(alt1000);
        const isaTemp10000 = AtmosphereService.calcStandardTemperatureAtAltitude(alt10000);

        // then
        expect(isaTemp0.c).toBe(15);
        expect(isaTemp1000.c).toBeCloseTo(13.0188, 4);
        expect(isaTemp10000.c).toBeCloseTo(-4.81200, 5);
    });


    it('calculates the ISA temperature delta at sea level for 10, 15 20 degrees', () => {
        // given
        const alt = Length.ofZero();
        const oat10 = Temperature.ofC(10);
        const oat15 = Temperature.ofC(15);
        const oat20 = Temperature.ofC(20);

        // when
        const isaTempDelta10 = AtmosphereService.calcIsaTemperatureDelta(alt, oat10);
        const isaTempDelta15 = AtmosphereService.calcIsaTemperatureDelta(alt, oat15);
        const isaTempDelta20 = AtmosphereService.calcIsaTemperatureDelta(alt, oat20);

        // then
        expect(isaTempDelta10.c).toBe(-5);
        expect(isaTempDelta15.c).toBe(0);
        expect(isaTempDelta20.c).toBe(5);
    });


    it('calculates the ISA temperature delta at 1670ft for 0, 15 30 degrees', () => {
        // given
        const alt = Length.ofFt(1670);
        const oat10 = Temperature.ofC(0);
        const oat15 = Temperature.ofC(15);
        const oat20 = Temperature.ofC(30);

        // when
        const isaTempDelta10 = AtmosphereService.calcIsaTemperatureDelta(alt, oat10);
        const isaTempDelta15 = AtmosphereService.calcIsaTemperatureDelta(alt, oat15);
        const isaTempDelta20 = AtmosphereService.calcIsaTemperatureDelta(alt, oat20);

        // then
        expect(isaTempDelta10.c).toBeCloseTo(-12, 0);
        expect(isaTempDelta15.c).toBeCloseTo(3, 0);
        expect(isaTempDelta20.c).toBeCloseTo(18, 0);
    });


    it('calculates the density altitude at PA 0ft, ISA Delta Temp 0°C', () => {
        // given
        const pa = Length.ofZero();
        const oat = Temperature.ofZero();

        // when
        const da = AtmosphereService.calcDensityAltitude(pa, oat);

        // then
        expect(da.ft).toBe(0);
    });


    it('calculates the density altitude at PA 1443ft, ISA Delta Temp 13.31°C', () => {
        // given
        const pa = Length.ofFt(1443);
        const isaTempDelta = Temperature.ofC(13.31);

        // when
        const da = AtmosphereService.calcDensityAltitude(pa, isaTempDelta);

        // then
        expect(da.ft).toBeCloseTo(3025, -1);
    });
});
