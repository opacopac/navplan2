import {RestOpenskyTrafficResponseConverter} from './rest-opensky-traffic-response-converter';
import {TrafficOpensky1Mock} from '../../mocks/traffic-opensky1.mock';


describe('RestOpenskyTrafficResponseConverter', () => {
    beforeEach(() => {
    });


    it('maps a single traffic response correctly', () => {
        const response = TrafficOpensky1Mock.createRestResponse();

        const trafficList = RestOpenskyTrafficResponseConverter.fromRest(response);

        expect(trafficList.length).toBe(1);
        expect(trafficList[0]).toEqual(TrafficOpensky1Mock.create());
    });


    it('maps an emtpy response correctly', () => {
        const response = { ...TrafficOpensky1Mock.createRestResponse(), states: null };

        const trafficList = RestOpenskyTrafficResponseConverter.fromRest(response);

        expect(trafficList).toEqual([]);
    });
});
