import {ConsumptionUnit, TimeUnit, VolumeUnit} from '../../core/services/utils/unitconversion.service';
import {Consumption} from '../quantities/consumption';
import {Time} from '../quantities/time';
import {Routefuel2} from './routefuel2';
import {RxService} from '../../core/services/utils/rx.service';


describe('RouteFuel', () => {
    let initConsumption: Consumption;
    let initTripTime, initAlternateTime: Time;
    let routeFuel: Routefuel2;


    beforeEach(() => {
        initConsumption = new Consumption(20, ConsumptionUnit.L_PER_H);
        initTripTime = new Time(40, TimeUnit.M);
        initAlternateTime = new Time(20, TimeUnit.M);
        routeFuel = new Routefuel2(
            RxService.getEternal<Consumption>(initConsumption),
            RxService.getEternal<Time>(initTripTime),
            RxService.getEternal<Time>(initAlternateTime)
        );
    });


    it('creates an instance', () => {
        expect(routeFuel).toBeTruthy();
    });


    it('contains the correct initial trip time', () => {
        routeFuel.tripTime$
            .subscribe((tripTime) => {
                expect(tripTime).toBe(initTripTime);
            });
    });


    it('contains the correct initial alternate time', () => {
        routeFuel.alternateTime$
            .subscribe((altTime) => {
                expect(altTime).toBe(initAlternateTime);
            });
    });


    it('contains the correct initial consumption', () => {
        routeFuel.consumption$
            .subscribe((consump) => {
                expect(consump).toBe(initConsumption);
            });
    });


    it('calculates the correct total time (no extra fuel)', () => {
        routeFuel.blockTime$
            .subscribe((totTime) => {
                expect(totTime.min).toBe(40 + 20 + 45 + 0);
            });
    });


    it('calculates the correct total time (with extra fuel)', () => {
        routeFuel.extraTime = new Time(33, TimeUnit.M);
        routeFuel.blockTime$
            .subscribe((totTime) => {
                expect(totTime.min).toBe(40 + 20 + 45 + 33);
            });
    });


    it('calculates the correct total fuel (with extra fuel)', () => {
        routeFuel.extraTime = new Time(15, TimeUnit.M);
        const totFuelExp = Math.ceil(40 * 20 / 60) + Math.ceil(20 * 20 / 60) + Math.ceil(45 * 20 / 60) + Math.ceil(15 * 20 / 60);
        routeFuel.blockFuel$
            .subscribe((totFuel) => {
                expect(totFuel.getValue(VolumeUnit.L)).toBe(totFuelExp);
            });
    });

});
