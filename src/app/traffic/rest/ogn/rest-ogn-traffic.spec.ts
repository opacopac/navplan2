import {IRestOgnTraffic} from './i-rest-ogn-traffic';
import {RestOgnTraffic} from './rest-ogn-traffic';
import {TrafficOgn1Mock} from '../../mocks/traffic-ogn1.mock';


describe('RestOgnTraffic', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restAc: IRestOgnTraffic = TrafficOgn1Mock.createRest();

        const ac = RestOgnTraffic.fromRest(restAc);

        expect(ac).toEqual(TrafficOgn1Mock.create());
    });


    it('maps lower case icao codes correctly', () => {
        const restAc: IRestOgnTraffic = { ...TrafficOgn1Mock.createRest(), addr: ['4b406a', 'ICAO']};

        const ac = RestOgnTraffic.fromRest(restAc);

        expect(ac.address.value).toEqual('4B406A');
    });


    /*it('maps number-only icao addresses correctly', () => {
        const restAc: IRestOgnTraffic = { ...TrafficOgn1Mock.createRest(), acaddress: 445566 };

        const ac = RestOgnTraffic.fromRest(restAc);

        expect(ac[0].acAddress).toEqual('445566');
    });*/
});
