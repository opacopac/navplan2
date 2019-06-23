import {RestOgnTrafficResponse} from './rest-ogn-traffic-response';
import {TrafficOgn1Mock} from '../../mocks/traffic-ogn1.mock';


describe('RestOgnTrafficResponse', () => {
    beforeEach(() => {
    });


    it('maps a traffic response correctly', () => {
        const response = TrafficOgn1Mock.createRestResponse();

        const trafficList = RestOgnTrafficResponse.fromRest(response);

        expect(trafficList.length).toBe(1);
        expect(trafficList[0]).toEqual(TrafficOgn1Mock.create());
    });


    it('maps an emtpy response correctly', () => {
        const response = { ...TrafficOgn1Mock.createRestResponse(), aclist: [] };

        const trafficList = RestOgnTrafficResponse.fromRest(response);

        expect(trafficList).toEqual([]);
    });
});
