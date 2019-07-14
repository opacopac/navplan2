import {RestMapperOpenskyTrafficResponse} from './rest-mapper-opensky-traffic-response';
import {TrafficOpensky1Mock} from '../../mocks/traffic-opensky1.mock';


describe('RestMapperOpenskyTrafficResponse', () => {
    beforeEach(() => {
    });


    it('maps a single traffic response correctly', () => {
        const response = TrafficOpensky1Mock.createRestResponse();

        const trafficList = RestMapperOpenskyTrafficResponse.fromRest(response);

        expect(trafficList.length).toBe(1);
        expect(trafficList[0]).toEqual(TrafficOpensky1Mock.create());
    });


    it('maps an emtpy response correctly', () => {
        const response = { ...TrafficOpensky1Mock.createRestResponse(), states: null };

        const trafficList = RestMapperOpenskyTrafficResponse.fromRest(response);

        expect(trafficList).toEqual([]);
    });
});
