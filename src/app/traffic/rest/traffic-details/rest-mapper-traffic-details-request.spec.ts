import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {RestMapperTrafficDetailsRequest} from './rest-mapper-traffic-details-request';
import {Traffic} from '../../domain-model/traffic';


describe('RestMapperTrafficDetailsRequest', () => {
    beforeEach(() => {
    });


    it('maps a single traffic request correctly', () => {
        const ac: Traffic = TrafficDetails1Mock.createTraffic();

        const trafficList = RestMapperTrafficDetailsRequest.toRest([ac]);

        expect(trafficList).toEqual(TrafficDetails1Mock.createRestRequest());
    });


    it('maps an emtpy request correctly', () => {
        const trafficList = RestMapperTrafficDetailsRequest.toRest([]);

        expect(trafficList.aclist).toEqual([]);
    });
});
