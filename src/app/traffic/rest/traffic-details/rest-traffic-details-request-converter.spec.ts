import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {RestTrafficDetailsRequestConverter} from './rest-traffic-details-request-converter';
import {Traffic} from '../../domain-model/traffic';


describe('RestTrafficDetailsRequestConverter', () => {
    beforeEach(() => {
    });


    it('maps a single traffic request correctly', () => {
        const ac: Traffic = TrafficDetails1Mock.createTraffic();

        const trafficList = RestTrafficDetailsRequestConverter.toRest([ac]);

        expect(trafficList).toEqual(TrafficDetails1Mock.createRestRequest());
    });


    it('maps an emtpy request correctly', () => {
        const trafficList = RestTrafficDetailsRequestConverter.toRest([]);

        expect(trafficList.aclist).toEqual([]);
    });
});
