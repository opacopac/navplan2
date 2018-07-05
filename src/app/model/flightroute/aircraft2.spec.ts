import {Aircraft2} from './aircraft2';
import {ConsumptionUnit, SpeedUnit} from '../../core/services/utils/unitconversion.service';
import {Speed} from '../quantities/speed';
import {Consumption} from '../quantities/consumption';


describe('Aircraft', () => {
    let aircraft: Aircraft2;
    let initSpeed: Speed;
    let initConsumption: Consumption;


    beforeEach(() => {
        initSpeed = new Speed(100, SpeedUnit.KT);
        initConsumption = new Consumption(20, ConsumptionUnit.L_PER_H);
        aircraft = new Aircraft2(initSpeed, initConsumption);
    });


    it('creates an instance', () => {
        expect(aircraft).toBeTruthy();
    });


    it('contains the correct initial speed', () => {
        aircraft.speed$
            .subscribe((speed) => {
                expect(speed).toBe(initSpeed);
            });
    });


    it('contains the correct initial consumption', () => {
        aircraft.consumption$
            .subscribe((consumption) => {
                expect(consumption).toBe(initConsumption);
            });
    });


    it('can update the speed', () => {
        const newSpeed = new Speed(120, SpeedUnit.KT);
        aircraft.speed = newSpeed;
        aircraft.speed$
            .subscribe((speed) => {
                expect(speed).toBe(newSpeed);
            });
    });


    it('can update the fuel consumption', () => {
        const newConsumption = new Consumption(40, ConsumptionUnit.L_PER_H);
        aircraft.consumption = newConsumption;
        aircraft.consumption$
            .subscribe((consumption) => {
                expect(consumption).toBe(newConsumption);
            });
    });
});
