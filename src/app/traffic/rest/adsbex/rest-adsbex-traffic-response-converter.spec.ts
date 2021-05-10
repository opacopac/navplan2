import {TrafficAdsbex1Mock} from '../../mocks/traffic-adsbex1.mock';
import {RestAdsbexTrafficResponseConverter} from './rest-adsbex-traffic-response-converter';
import {IRestAdsbexTrafficResponse} from './i-rest-adsbex-traffic-response';


describe('RestAdsbexTrafficResponseConverter', () => {
    beforeEach(() => {
    });


    it('creates an instance from a rest object', () => {
        const restResponse: IRestAdsbexTrafficResponse = TrafficAdsbex1Mock.createRestResponse();

        const acList = RestAdsbexTrafficResponseConverter.fromRest(restResponse);

        expect(acList).toBeDefined();
        expect(acList.length).toEqual(1);
        expect(acList[0]).toEqual(TrafficAdsbex1Mock.create());
    });
});
