import {TrafficMock} from '../test/traffic-mock';
import {RestMapperTrafficOgn, TrafficOgnRestItem} from './rest-mapper-traffic-ogn';
import {TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';


describe('RestMapperTrafficOgn', () => {
    beforeEach(() => {
    });


    it('maps all fields of a single traffic response correctly', () => {
        const response = TrafficMock.OGN_MOCK_RESPONSE_1;
        const acItem: TrafficOgnRestItem = TrafficMock.OGN_MOCK_RESPONSE_1_ITEM_1;
        const trafficList = RestMapperTrafficOgn.getTrafficListFromResponse(response);
        expect(trafficList.length).toBe(1);
        expect(trafficList[0].acAddress).toEqual(acItem.id.toUpperCase());
        expect(trafficList[0].addressType).toEqual(TrafficAddressType[acItem.addresstype]);
        expect(trafficList[0].dataSource).toEqual(TrafficDataSource.OGN);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType[acItem.actype]);
        expect(trafficList[0].registration).toEqual(acItem.registration);
        expect(trafficList[0].callsign).toBeUndefined();
        expect(trafficList[0].opCallsign).toBeUndefined();
        expect(trafficList[0].acModel).toEqual(acItem.aircraftModelType);
        expect(trafficList[0].positions.length).toBe(1);
    });


    it('maps an emtpy response correctly', () => {
        const response = { ...TrafficMock.OGN_MOCK_RESPONSE_1, aclist: {}};
        const trafficList = RestMapperTrafficOgn.getTrafficListFromResponse(response);
        expect(trafficList).toEqual([]);
    });


    it('maps a lower case icao code correctly', () => {
        const response = { ...TrafficMock.OGN_MOCK_RESPONSE_1, aclist: {} };
        response.aclist['4b406a'] = { ...TrafficMock.OGN_MOCK_RESPONSE_1_ITEM_1, id: '4b406a' };
        const trafficList = RestMapperTrafficOgn.getTrafficListFromResponse(response);
        expect(trafficList[0].acAddress).toEqual('4B406A');
    });


    it('maps an icao code of numbers only correctly', () => {
        const response = { ...TrafficMock.OGN_MOCK_RESPONSE_1, aclist: {} };
        response.aclist['445566'] = { ...TrafficMock.OGN_MOCK_RESPONSE_1_ITEM_1, id: 445566 };
        const trafficList = RestMapperTrafficOgn.getTrafficListFromResponse(response);
        expect(trafficList[0].acAddress).toEqual('445566');
    });
});
