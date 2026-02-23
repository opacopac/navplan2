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


    it('converts FPM to MPS correctly (1 ft/min ≈ 0.00508 m/s)', () => {
        // 1 ft = 0.3048 m, 1 min = 60 s → 1 ft/min = 0.3048/60 m/s ≈ 0.00508 m/s
        const fpmToMps = Speed.convertSpeed(1, SpeedUnit.FPM, SpeedUnit.MPS);
        expect(fpmToMps).toBeCloseTo(0.00508, 5);
    });


    it('converts MPS to FPM correctly (1 m/s ≈ 196.85 ft/min)', () => {
        // 1 m/s = 60/0.3048 ft/min ≈ 196.85 ft/min
        const mpsToFpm = Speed.convertSpeed(1, SpeedUnit.MPS, SpeedUnit.FPM);
        expect(mpsToFpm).toBeCloseTo(196.85, 1);
    });


    it('converts KMH to MPS correctly (36 km/h = 10 m/s)', () => {
        const kmhToMps = Speed.convertSpeed(36, SpeedUnit.KMH, SpeedUnit.MPS);
        expect(kmhToMps).toBeCloseTo(10, 5);
    });


    it('converts KMH to FPM correctly (1 km/h ≈ 54.68 ft/min)', () => {
        // 1 km/h = 1000/0.3048/60 ft/min ≈ 54.6807 ft/min
        const kmhToFpm = Speed.convertSpeed(1, SpeedUnit.KMH, SpeedUnit.FPM);
        expect(kmhToFpm).toBeCloseTo(54.6807, 2);
    });
});
