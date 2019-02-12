import {RestMapperTrafficDetails, TrafficDetailsResponse} from './rest-mapper-traffic-details';
import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';


describe('RestMapperTrafficDetails', () => {
    let response1, response2, response3: TrafficDetailsResponse;
    let trafficList: Traffic[];


    beforeEach(() => {
        response1 = {
            'acdetails': [
                {
                    'icao24': '4B3142',
                    'reg': 'HB-SRA',
                    'model': 'AT-3 R100',
                    'manufacturer': 'AERO AT SP. Z O.O.',
                    'ac_type': 'AAT3',
                    'ac_class': 'L',
                    'eng_class': 'P'
                },
                {
                    'icao24': 'c0ffee',
                    'reg': undefined,
                    'model': undefined,
                    'manufacturer': 'AIRBUS',
                    'ac_type': 'A320',
                    'ac_class': 'L',
                    'eng_class': 'J'
                },
            ]
        };

        response2 = {
            'acdetails': [
                {
                    'icao24': 'c0ffee',
                    'reg': undefined,
                    'model': undefined,
                    'manufacturer': 'AIRBUS',
                    'ac_type': 'A320',
                    'ac_class': 'L',
                    'eng_class': 'J'
                },
            ]
        };

        response3 = {
            'acdetails': []
        };
    });


    it('maps a standard response correctly', () => {
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response1);
        expect(trafficList.length).toEqual(2);
        expect(trafficList[0].acAddress).toEqual(response1.acdetails[0].icao24.toUpperCase());
        expect(trafficList[0].addressType).toEqual(TrafficAddressType.ICAO);
        expect(trafficList[0].dataSource).toEqual(TrafficDataSource.DETAILS);
        expect(trafficList[0].registration).toEqual(response1.acdetails[0].reg);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);
        expect(trafficList[0].acModel).toEqual(response1.acdetails[0].model);
        expect(trafficList[0].icaoType).toEqual(response1.acdetails[0].ac_type);

        expect(trafficList[1].acAddress).toEqual(response1.acdetails[1].icao24.toUpperCase());
        expect(trafficList[1].addressType).toEqual(TrafficAddressType.ICAO);
        expect(trafficList[1].dataSource).toEqual(TrafficDataSource.DETAILS);
        expect(trafficList[1].registration).toEqual(response1.acdetails[1].reg);
        expect(trafficList[1].acType).toEqual(TrafficAircraftType.JET_AIRCRAFT);
        expect(trafficList[1].acModel).toBeUndefined();
        expect(trafficList[1].icaoType).toEqual(response1.acdetails[1].ac_type);
    });


    it('maps a numeric only icao code correctly', () => {
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList.length).toEqual(1);
        expect(trafficList[0].acAddress).toEqual(response2.acdetails[0].icao24.toString().toUpperCase());
    });


    it('maps an emtpy response correctly', () => {
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response3);
        expect(trafficList.length).toEqual(0);
    });


    it('correctly maps helicopters', () => {
        response2.acdetails[0].ac_class = 'H';
        response2.acdetails[0].eng_class = 'J';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.HELICOPTER_ROTORCRAFT);

        response2.acdetails[0].ac_class = 'G';
        response2.acdetails[0].eng_class = 'P';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.HELICOPTER_ROTORCRAFT);
    });


    it('correctly maps jets', () => {
        response2.acdetails[0].ac_class = 'L';
        response2.acdetails[0].eng_class = 'J';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.JET_AIRCRAFT);

        response2.acdetails[0].ac_class = 'A';
        response2.acdetails[0].eng_class = 'J';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.JET_AIRCRAFT);

        response2.acdetails[0].ac_class = 'S';
        response2.acdetails[0].eng_class = 'J';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.JET_AIRCRAFT);
    });


    it('correctly maps piston', () => {
        response2.acdetails[0].ac_class = 'L';
        response2.acdetails[0].eng_class = 'P';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);

        response2.acdetails[0].ac_class = 'S';
        response2.acdetails[0].eng_class = 'P';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);

        response2.acdetails[0].ac_class = 'T';
        response2.acdetails[0].eng_class = 'P';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);
    });


    it('correctly maps unknown', () => {
        response2.acdetails[0].ac_class = undefined;
        response2.acdetails[0].eng_class = 'J';
        trafficList = RestMapperTrafficDetails.getTrafficListFromResponse(response2);
        expect(trafficList[0].acType).toEqual(TrafficAircraftType.UNKNOWN);
    });
});
