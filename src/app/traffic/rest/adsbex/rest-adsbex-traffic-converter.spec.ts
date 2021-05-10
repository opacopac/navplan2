import {IRestAdsbexTraffic} from './i-rest-adsbex-traffic';
import {TrafficAdsbex1Mock} from '../../mocks/traffic-adsbex1.mock';
import {RestAdsbexTrafficConverter} from './rest-adsbex-traffic-converter';


describe('RestAdsbexTrafficConverter', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restAc: IRestAdsbexTraffic = TrafficAdsbex1Mock.createRest();

        const ac = RestAdsbexTrafficConverter.fromRest(restAc);

        expect(ac).toBeDefined();
        expect(ac).toEqual(TrafficAdsbex1Mock.create());
    });
});
