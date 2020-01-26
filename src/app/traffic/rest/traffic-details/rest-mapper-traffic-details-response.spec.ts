import {RestMapperTrafficDetailsResponse} from './rest-mapper-traffic-details-response';
import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {IRestTrafficDetailsResponse} from './i-rest-traffic-details-response';


describe('RestMapperTrafficDetailsResponse', () => {
    beforeEach(() => {
    });


    it('maps a single traffic response correctly', () => {
        const response: IRestTrafficDetailsResponse = TrafficDetails1Mock.createRestResponse();

        const trafficList = RestMapperTrafficDetailsResponse.fromRest(response);

        expect(trafficList.length).toBe(1);
        expect(trafficList[0]).toEqual(TrafficDetails1Mock.create());
    });


    it('maps an emtpy response correctly', () => {
        const response: IRestTrafficDetailsResponse = { aclist: [] };

        const trafficList = RestMapperTrafficDetailsResponse.fromRest(response);

        expect(trafficList).toEqual([]);
    });
});