import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {IRestTrafficDetails} from './i-rest-traffic-details';
import {RestMapperTrafficDetails} from './rest-mapper-traffic-details';
import {Traffic} from '../../domain-model/traffic';


describe('RestMapperTrafficDetails', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restAc: IRestTrafficDetails = TrafficDetails1Mock.createRest();

        const ac = RestMapperTrafficDetails.fromRest(restAc);

        expect(ac).toEqual(TrafficDetails1Mock.create());
    });


    it('creates a rest object from an instance', () => {
        const ac: Traffic = TrafficDetails1Mock.createTraffic();

        const restAc = RestMapperTrafficDetails.toRest(ac);

        expect(restAc).toEqual(TrafficDetails1Mock.createRestRequestItem());
    });
});
