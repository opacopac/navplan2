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


    // KT conversions
    it('converts KT to KMH correctly (1 kt = 1.852 km/h)', () => {
        expect(Speed.convertSpeed(1, SpeedUnit.KT, SpeedUnit.KMH)).toBeCloseTo(1.852, 3);
    });

    it('converts KT to MPS correctly (1 kt ≈ 0.5144 m/s)', () => {
        expect(Speed.convertSpeed(1, SpeedUnit.KT, SpeedUnit.MPS)).toBeCloseTo(0.5144, 3);
    });

    it('converts KT to FPM correctly (1 kt ≈ 101.27 ft/min)', () => {
        expect(Speed.convertSpeed(1, SpeedUnit.KT, SpeedUnit.FPM)).toBeCloseTo(101.27, 1);
    });


    // KMH conversions
    it('converts KMH to KT correctly (1.852 km/h = 1 kt)', () => {
        expect(Speed.convertSpeed(1.852, SpeedUnit.KMH, SpeedUnit.KT)).toBeCloseTo(1, 5);
    });

    it('converts KMH to MPS correctly (36 km/h = 10 m/s)', () => {
        expect(Speed.convertSpeed(36, SpeedUnit.KMH, SpeedUnit.MPS)).toBeCloseTo(10, 5);
    });

    it('converts KMH to FPM correctly (1 km/h ≈ 54.68 ft/min)', () => {
        expect(Speed.convertSpeed(1, SpeedUnit.KMH, SpeedUnit.FPM)).toBeCloseTo(54.6807, 2);
    });


    // MPS conversions
    it('converts MPS to KT correctly (1 m/s ≈ 1.9438 kt)', () => {
        expect(Speed.convertSpeed(1, SpeedUnit.MPS, SpeedUnit.KT)).toBeCloseTo(1.9438, 3);
    });

    it('converts MPS to KMH correctly (10 m/s = 36 km/h)', () => {
        expect(Speed.convertSpeed(10, SpeedUnit.MPS, SpeedUnit.KMH)).toBeCloseTo(36, 5);
    });

    it('converts MPS to FPM correctly (1 m/s ≈ 196.85 ft/min)', () => {
        expect(Speed.convertSpeed(1, SpeedUnit.MPS, SpeedUnit.FPM)).toBeCloseTo(196.85, 1);
    });


    // FPM conversions
    it('converts FPM to KT correctly (101.27 ft/min ≈ 1 kt)', () => {
        expect(Speed.convertSpeed(101.27, SpeedUnit.FPM, SpeedUnit.KT)).toBeCloseTo(1, 2);
    });

    it('converts FPM to KMH correctly (54.6807 ft/min ≈ 1 km/h)', () => {
        expect(Speed.convertSpeed(54.6807, SpeedUnit.FPM, SpeedUnit.KMH)).toBeCloseTo(1, 3);
    });

    it('converts FPM to MPS correctly (1 ft/min ≈ 0.00508 m/s)', () => {
        expect(Speed.convertSpeed(1, SpeedUnit.FPM, SpeedUnit.MPS)).toBeCloseTo(0.00508, 5);
    });
});
