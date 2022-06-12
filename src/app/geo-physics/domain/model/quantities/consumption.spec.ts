import {Consumption} from './consumption';
import {ConsumptionUnit} from './consumption-unit';


describe('Consumption', () => {
    beforeEach(() => {
    });


    it('creates an instance', () => {
        const cons = new Consumption(20, ConsumptionUnit.L_PER_H);
        expect(cons).toBeDefined();
        expect(cons.getValue(ConsumptionUnit.L_PER_H)).toEqual(20);
    });
});
