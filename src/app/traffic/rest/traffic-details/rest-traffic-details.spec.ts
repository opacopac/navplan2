import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {IRestTrafficDetails} from './i-rest-traffic-details';
import {RestTrafficDetails} from './rest-traffic-details';
import {Traffic} from '../../domain/traffic';


describe('RestTrafficDetails', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restAc: IRestTrafficDetails = TrafficDetails1Mock.createRest();

        const ac = RestTrafficDetails.fromRest(restAc);

        expect(ac).toEqual(TrafficDetails1Mock.create());
    });


    it('creates a rest object from an instance', () => {
        const ac: Traffic = TrafficDetails1Mock.createTraffic();

        const restAc = RestTrafficDetails.toRest(ac);

        expect(restAc).toEqual(TrafficDetails1Mock.createRestRequestItem());
    });
});
