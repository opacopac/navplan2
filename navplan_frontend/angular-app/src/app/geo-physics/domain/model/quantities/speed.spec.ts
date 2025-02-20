import {Speed} from './speed';
import {SpeedUnit} from './speed-unit';


describe('Speed', () => {
    beforeEach(() => {
    });


    it('can create an instance', () => {
        const speed_kt = new Speed(1, SpeedUnit.KT);
        const speed_kmh = new Speed(2, SpeedUnit.KMH);
        const speed_mps = new Speed(3, SpeedUnit.MPS);
        const speed_fpm = new Speed(4, SpeedUnit.FPM);
        expect(speed_kt).toBeDefined();
        expect(speed_kt.getValue(SpeedUnit.KT)).toBe(1);
        expect(speed_kmh.getValue(SpeedUnit.KMH)).toBe(2);
        expect(speed_mps.getValue(SpeedUnit.MPS)).toBe(3);
        expect(speed_fpm.getValue(SpeedUnit.FPM)).toBe(4);
    });


    it('converts the value to other units', () => {
        const speed_kt = new Speed(100, SpeedUnit.KT);
        const val_kmh = Speed.convertSpeed(100, SpeedUnit.KT, SpeedUnit.KMH);
        const val_mps = Speed.convertSpeed(100, SpeedUnit.KT, SpeedUnit.MPS);
        const val_fpm = Speed.convertSpeed(100, SpeedUnit.KT, SpeedUnit.FPM);
        expect(speed_kt.getValue(SpeedUnit.KMH)).toBe(val_kmh);
        expect(speed_kt.getValue(SpeedUnit.MPS)).toBe(val_mps);
        expect(speed_kt.getValue(SpeedUnit.FPM)).toBe(val_fpm);
    });
});
