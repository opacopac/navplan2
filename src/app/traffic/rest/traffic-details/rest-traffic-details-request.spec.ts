import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {RestTrafficDetailsRequest} from './rest-traffic-details-request';
import {Traffic} from '../../domain/traffic';


describe('RestTrafficDetailsRequest', () => {
    beforeEach(() => {
    });


    it('maps a single traffic request correctly', () => {
        const ac: Traffic = TrafficDetails1Mock.createTraffic();

        const trafficList = RestTrafficDetailsRequest.toRest([ac]);

        expect(trafficList).toEqual(TrafficDetails1Mock.createRestRequest());
    });


    it('maps an emtpy request correctly', () => {
        const trafficList = RestTrafficDetailsRequest.toRest([]);

        expect(trafficList.aclist).toEqual([]);
    });
});
