import {TrafficMock} from '../test/traffic-mock';
import {RestMapperTrafficAdsbEx2} from './rest-mapper-traffic-adsb-ex2';
import {TrafficAddressType} from '../model/traffic';
import {TrafficPositionMethod} from '../model/traffic-position';


describe('RestMapperTrafficAdsbEx2', () => {
    beforeEach(() => {
    });


    it('maps a standard traffic response correctly', () => {
        const response = TrafficMock.ADSBEX2_MOCK_RESPONSE_1;
        const trafficList = RestMapperTrafficAdsbEx2.getTrafficListFromResponse(response);
        expect(trafficList.length).toEqual(2);
        expect(trafficList[0].acAddress).toEqual(response.ac[0].icao.toUpperCase());
        expect(trafficList[0].acModel).toBeUndefined();
        expect(trafficList[0].acType).toBeUndefined();
        expect(trafficList[0].addressType).toEqual(TrafficAddressType.ICAO);
        expect(trafficList[0].callsign).toEqual(response.ac[0].call);
        expect(trafficList[0].opCallsign).toBeUndefined();
        expect(trafficList[0].registration).toEqual(response.ac[0].reg);
    });


    it('maps an emtpy response correctly', () => {
        const response = TrafficMock.ADSBEX2_MOCK_RESPONSE_2;
        const trafficList = RestMapperTrafficAdsbEx2.getTrafficListFromResponse(response);
        expect(trafficList.length).toEqual(0);
    });


    it('maps the positions correctly', () => {
        const response = TrafficMock.ADSBEX2_MOCK_RESPONSE_1;
        const trafficList = RestMapperTrafficAdsbEx2.getTrafficListFromResponse(response);
        expect(trafficList[0].positions.length).toEqual(1);
        expect(trafficList[0].positions[0].method).toEqual(TrafficPositionMethod.ADSB);
        expect(trafficList[1].positions[0].method).toEqual(TrafficPositionMethod.MLAT);
        expect(trafficList[0].positions[0].receiver).toEqual(RestMapperTrafficAdsbEx2.RECEIVER_NAME_ADSB);
        expect(trafficList[1].positions[0].receiver).toEqual(RestMapperTrafficAdsbEx2.RECEIVER_NAME_MLAT);
        expect(trafficList[0].positions[0].receivedTimeStampMs).toEqual(response.ctime);
        expect(trafficList[1].positions[0].receivedTimeStampMs).toEqual(response.ctime);
        expect(trafficList[0].positions[0].source).toBeUndefined();
        expect(trafficList[1].positions[0].source).toBeUndefined();
        expect(trafficList[0].positions[0].position.timestamp.epochMs).toEqual(parseInt(response.ac[0].postime, 10));
        expect(trafficList[1].positions[0].position.timestamp.epochMs).toEqual(parseInt(response.ac[1].postime, 10));
        expect(trafficList[0].positions[0].position.latitude).toEqual(parseFloat(response.ac[0].lat));
        expect(trafficList[1].positions[0].position.latitude).toEqual(parseFloat(response.ac[1].lat));
        expect(trafficList[0].positions[0].position.longitude).toEqual(parseFloat(response.ac[0].lon));
        expect(trafficList[1].positions[0].position.longitude).toEqual(parseFloat(response.ac[1].lon));
        expect(trafficList[0].positions[0].position.altitude.ft).toEqual(parseInt(response.ac[0].alt, 10));
        expect(trafficList[1].positions[0].position.altitude).toBeUndefined();
    });
});
