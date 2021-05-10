import {RestTrafficDetailsResponseConverter} from './rest-traffic-details-response-converter';
import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {IRestTrafficDetailsResponse} from './i-rest-traffic-details-response';


describe('RestTrafficDetailsResponseConverter', () => {
    beforeEach(() => {
    });


    it('maps a single traffic response correctly', () => {
        const response: IRestTrafficDetailsResponse = TrafficDetails1Mock.createRestResponse();

        const trafficList = RestTrafficDetailsResponseConverter.fromRest(response);

        expect(trafficList.length).toBe(1);
        expect(trafficList[0]).toEqual(TrafficDetails1Mock.create());
    });


    it('maps an emtpy response correctly', () => {
        const response: IRestTrafficDetailsResponse = { aclist: [] };

        const trafficList = RestTrafficDetailsResponseConverter.fromRest(response);

        expect(trafficList).toEqual([]);
    });
});
