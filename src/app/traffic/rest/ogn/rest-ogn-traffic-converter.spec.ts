import {IRestOgnTraffic} from './i-rest-ogn-traffic';
import {RestOgnTrafficConverter} from './rest-ogn-traffic-converter';
import {TrafficOgn1Mock} from '../../mocks/traffic-ogn1.mock';


describe('RestOgnTrafficConverter', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restAc: IRestOgnTraffic = TrafficOgn1Mock.createRest();

        const ac = RestOgnTrafficConverter.fromRest(restAc);

        expect(ac).toEqual(TrafficOgn1Mock.create());
    });


    it('maps lower case icao codes correctly', () => {
        const restAc: IRestOgnTraffic = { ...TrafficOgn1Mock.createRest(), addr: ['4b406a', 'ICAO']};

        const ac = RestOgnTrafficConverter.fromRest(restAc);

        expect(ac.address.value).toEqual('4B406A');
    });


    /*it('maps number-only icao addresses correctly', () => {
        const restAc: IRestOgnTraffic = { ...TrafficOgn1Mock.createRest(), acaddress: 445566 };

        const ac = RestOgnTrafficConverter.fromListEntryRest(restAc);

        expect(ac[0].acAddress).toEqual('445566');
    });*/
});
