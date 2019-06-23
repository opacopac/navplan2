import {RestTrafficAddress} from './rest-traffic-address';
import {IRestTrafficAddress} from './i-rest-traffic-address';
import {TrafficAddressType} from '../domain/traffic-address-type';
import {TrafficAddress} from '../domain/traffic-address';


describe('RestTrafficAddress', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restAddr: IRestTrafficAddress = ['C0FFEE', 'ICAO'];

        const addr = RestTrafficAddress.fromRest(restAddr);

        expect(addr).toBeDefined();
        expect(addr.value).toEqual('C0FFEE');
        expect(addr.type).toEqual(TrafficAddressType.ICAO);
    });


    it('creates a rest object from an instance', () => {
        const addr: TrafficAddress = new TrafficAddress('C0FFEE', TrafficAddressType.FLARM);

        const restAddr = RestTrafficAddress.toRest(addr);

        expect(restAddr).toBeDefined();
        expect(restAddr).toEqual(['C0FFEE', 'FLARM']);
    });

});
