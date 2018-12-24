import {RestMapperTrafficOpensky} from './rest-mapper-traffic-opensky';
import {TrafficMock} from '../test/traffic-mock';


describe('RestMapperTrafficOpensky', () => {
    beforeEach(() => {
    });


    it('maps a single traffic response correctly', () => {
        const response = TrafficMock.OPENSKY_MOCK_RESPONSE_1;
        const trafficList = RestMapperTrafficOpensky.getTrafficListFromResponse(response);
        expect(trafficList.length).toBe(1);
        expect(trafficList[0].acAddress).toEqual(response.states[0][0].toUpperCase());
    });


    it('maps an emtpy response correctly', () => {
        const response = { ...TrafficMock.OPENSKY_MOCK_RESPONSE_1, states: null };
        const trafficList = RestMapperTrafficOpensky.getTrafficListFromResponse(response);
        expect(trafficList).toEqual([]);
    });
});
