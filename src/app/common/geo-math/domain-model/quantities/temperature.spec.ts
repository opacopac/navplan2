import {Temperature} from './temperature';
import {TemperatureUnit} from './temperature-unit';


describe('Temperature', () => {
    beforeEach(() => {
    });


    it('creates an instance', () => {
        const temp = new Temperature(100, TemperatureUnit.C);
        expect(temp).toBeDefined();
        expect(temp.getValue(TemperatureUnit.C)).toEqual(100);
    });


    it('converts to other units', () => {
        const temp_c = new Temperature(10, TemperatureUnit.C);
        const temp_k = new Temperature(10, TemperatureUnit.K);
        const temp_f = new Temperature(10, TemperatureUnit.F);

        expect(temp_c.getValue(TemperatureUnit.K)).toEqual(283.15);
        expect(temp_c.getValue(TemperatureUnit.F)).toEqual(50);
        expect(temp_k.getValue(TemperatureUnit.C)).toEqual(-263.15);
        expect(temp_k.getValue(TemperatureUnit.F)).toBeCloseTo(-441.67, 2);
        expect(temp_f.getValue(TemperatureUnit.C)).toBeCloseTo(-12.222, 2);
        expect(temp_f.getValue(TemperatureUnit.K)).toBeCloseTo(260.928, 2);
    });
});
