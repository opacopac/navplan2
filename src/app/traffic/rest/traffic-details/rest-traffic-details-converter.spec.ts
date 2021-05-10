import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {IRestTrafficDetails} from './i-rest-traffic-details';
import {RestTrafficDetailsConverter} from './rest-traffic-details-converter';
import {Traffic} from '../../domain-model/traffic';


describe('RestTrafficDetailsConverter', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restAc: IRestTrafficDetails = TrafficDetails1Mock.createRest();

        const ac = RestTrafficDetailsConverter.fromRest(restAc);

        expect(ac).toEqual(TrafficDetails1Mock.create());
    });


    it('creates a rest object from an instance', () => {
        const ac: Traffic = TrafficDetails1Mock.createTraffic();

        const restAc = RestTrafficDetailsConverter.toRest(ac);

        expect(restAc).toEqual(TrafficDetails1Mock.createRestRequestItem());
    });
});
