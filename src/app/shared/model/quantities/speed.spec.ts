import {Altitude} from "./altitude";
import {LengthUnit, SpeedUnit} from "../units";
import {Speed} from "./speed";
import {UnitconversionService} from "../../services/unitconversion/unitconversion.service";

describe('Speed', () => {
    beforeEach(() => {
    });


    it('can create an instance', () => {
        const speed_kt = new Speed(1, SpeedUnit.KT);
        const speed_kmh = new Speed(2, SpeedUnit.KMH);
        const speed_mps = new Speed(3, SpeedUnit.MPS);
        expect(speed_kt).toBeDefined();
        expect(speed_kt.getValue(SpeedUnit.KT)).toBe(1);
        expect(speed_kmh.getValue(SpeedUnit.KMH)).toBe(2);
        expect(speed_mps.getValue(SpeedUnit.MPS)).toBe(3);
    });


    it('correctly determines zero values', () => {
        const speed_0 = new Speed(0, SpeedUnit.KT);
        const speed_1 = new Speed(1, SpeedUnit.KT);
        expect(speed_0.isZero).toBeTruthy();
        expect(speed_1.isZero).toBeFalsy();
    });


    it('correctly determines zero/negative values', () => {
        const speed_0 = new Speed(0, SpeedUnit.KT);
        const speed_1 = new Speed(1, SpeedUnit.KT);
        const speed_m1 = new Speed(-1, SpeedUnit.KT);
        expect(speed_0.isZeroOrNegative).toBeTruthy();
        expect(speed_1.isZeroOrNegative).toBeFalsy();
        expect(speed_m1.isZeroOrNegative).toBeTruthy();
    });


    it('converts the value to other units', () => {
        const speed_kt = new Speed(100, SpeedUnit.KT);
        const val_kmh = UnitconversionService.convertSpeed(100, SpeedUnit.KT, SpeedUnit.KMH);
        const val_mps = UnitconversionService.convertSpeed(100, SpeedUnit.KT, SpeedUnit.MPS);
        expect(speed_kt.getValue(SpeedUnit.KMH)).toBe(val_kmh);
        expect(speed_kt.getValue(SpeedUnit.MPS)).toBe(val_mps);
    });
});
