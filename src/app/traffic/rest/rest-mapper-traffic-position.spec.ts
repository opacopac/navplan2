import {RestMapperTrafficPosition} from './rest-mapper-traffic-position';
import {IRestTrafficPosition} from './i-rest-traffic-position';
import {TrafficOgn1Mock} from '../mocks/traffic-ogn1.mock';
import {TrafficAdsbex1Mock} from '../mocks/traffic-adsbex1.mock';
import {TrafficDataSource} from '../domain-model/traffic-data-source';


describe('RestMapperTrafficPosition', () => {
    beforeEach(() => {
    });


    it('maps a ogn traffic position correctly', () => {
        const ognRestPos: IRestTrafficPosition = TrafficOgn1Mock.createRestPos();
        const adsbexRestPos: IRestTrafficPosition = TrafficAdsbex1Mock.createRestPos();

        const ognPos = RestMapperTrafficPosition.fromRest(ognRestPos, TrafficDataSource.OGN);
        const adsbexPos = RestMapperTrafficPosition.fromRest(adsbexRestPos, TrafficDataSource.ADSBX);

        expect(ognPos).toEqual(TrafficOgn1Mock.createPos());
        expect(adsbexPos).toEqual(TrafficAdsbex1Mock.createPos());
    });
});
