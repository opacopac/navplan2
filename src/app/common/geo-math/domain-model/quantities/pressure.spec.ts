import {Pressure} from './pressure';
import {PressureUnit} from './pressure-unit';


describe('Pressure', () => {
    beforeEach(() => {
    });


    it('creates an instance', () => {
        const pressure = new Pressure(1013, PressureUnit.HPA);
        expect(pressure).toBeDefined();
        expect(pressure.getValue(PressureUnit.HPA)).toEqual(1013);
    });


    it('converts to other units', () => {
        const pressure_hpa = new Pressure(1013.15, PressureUnit.HPA);
        const pressure_hgin = new Pressure(30, PressureUnit.INHG);

        expect(pressure_hpa.getValue(PressureUnit.INHG)).toBeCloseTo(29.9183023488345, 10);
        expect(pressure_hgin.getValue(PressureUnit.HPA)).toBeCloseTo(1015.91660000001, 10);
    });
});
