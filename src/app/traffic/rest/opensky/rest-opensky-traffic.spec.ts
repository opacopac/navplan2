import {IRestOpenskyTraffic} from './i-rest-opensky-traffic';
import {TrafficOpensky1Mock} from '../../mocks/traffic-opensky1.mock';
import {RestOpenskyTraffic} from './rest-opensky-traffic';
import {IRestOpenskyTrafficResponse} from './i-rest-opensky-traffic-response';


describe('RestOpenskyTraffic', () => {
    beforeEach(() => {
    });


    it('maps an ogn traffic correctly', () => {
        const restResponse: IRestOpenskyTrafficResponse = TrafficOpensky1Mock.createRestResponse();
        const restAc: IRestOpenskyTraffic = TrafficOpensky1Mock.createRest();

        const ac = RestOpenskyTraffic.fromRest(restAc, restResponse.time);

        expect(ac).toEqual(TrafficOpensky1Mock.create());
    });


    it('maps lower case icao codes correctly', () => {
        const restResponse: IRestOpenskyTrafficResponse = TrafficOpensky1Mock.createRestResponse();
        const restAc: IRestOpenskyTraffic = { ...TrafficOpensky1Mock.createRest(), 0: '4b406a'};

        const ac = RestOpenskyTraffic.fromRest(restAc, restResponse.time);

        expect(ac.address.value).toEqual('4B406A');
    });
});
