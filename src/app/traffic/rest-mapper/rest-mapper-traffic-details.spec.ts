import {TrafficMock} from '../test/traffic-mock';
import {RestMapperTrafficAdsbEx2} from './rest-mapper-traffic-adsb-ex2';
import {RestMapperTrafficDetails} from './rest-mapper-traffic-details';
import {AircraftClass, EngineClass} from '../model/traffic-details';


describe('RestMapperTrafficDetails', () => {
    beforeEach(() => {
    });


    it('maps a standard response correctly', () => {
        const response = TrafficMock.TRAFFIC_DETAILS_MOCK_RESPONSE_1;
        const detailList = RestMapperTrafficDetails.getTrafficDetailsListFromResponse(response);
        expect(detailList.length).toEqual(2);
        expect(detailList[0].icao24).toEqual(response.acdetails[0].icao24.toUpperCase());
        expect(detailList[0].registration).toEqual(response.acdetails[0].reg);
        expect(detailList[0].model).toEqual(response.acdetails[0].model);
        expect(detailList[0].manufacturer).toEqual(response.acdetails[0].manufacturer);
        expect(detailList[0].acType).toEqual(response.acdetails[0].ac_type);
        expect(detailList[0].acClass).toEqual(AircraftClass.LANDPLANE);
        expect(detailList[0].engineClass).toEqual(EngineClass.PISTON);

        expect(detailList[1].icao24).toEqual(response.acdetails[1].icao24.toUpperCase());
        expect(detailList[1].registration).toBeUndefined();
        expect(detailList[1].model).toBeUndefined();
        expect(detailList[1].manufacturer).toEqual(response.acdetails[1].manufacturer);
        expect(detailList[1].acType).toEqual(response.acdetails[1].ac_type);
        expect(detailList[1].acClass).toEqual(AircraftClass.LANDPLANE);
        expect(detailList[1].engineClass).toEqual(EngineClass.JET);
    });


    it('maps an emtpy response correctly', () => {
        const response = TrafficMock.ADSBEX2_MOCK_RESPONSE_2;
        const trafficList = RestMapperTrafficAdsbEx2.getTrafficListFromResponse(response);
        expect(trafficList.length).toEqual(0);
    });


    it('maps a numeric only icao code correctly', () => {
        const response = TrafficMock.TRAFFIC_DETAILS_MOCK_RESPONSE_2;
        const detailList = RestMapperTrafficDetails.getTrafficDetailsListFromResponse(response);
        expect(detailList.length).toEqual(1);
        expect(detailList[0].icao24).toEqual(response.acdetails[0].icao24.toString().toUpperCase());
    });
});
