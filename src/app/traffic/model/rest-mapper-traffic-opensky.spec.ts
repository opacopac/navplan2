import {RestMapperTrafficOpensky, TrafficOpenskyResponse} from './rest-mapper-traffic-opensky';


describe('RestMapperTrafficOpensky', () => {
    function createStateItem(): [
        string, // 0: icao24
        string, // 1: callsign
        string, // 2: origin_country
        number, // 3: time_position
        number, // 4: last_contact
        number, // 5: longitude
        number, // 6: latitude
        number, // 7: baro_altitude
        boolean, // 8: on_ground
        number, // 9: velocity
        number, // 10: true_track
        number, // 11: vertical_rate
        number[], // 12: sensors
        number, // 13: geo_altitude
        string, // 14: squawk
        boolean, // 15: spi
        number] { // 16: position_source

        return ['71be18', 'AAR790  ', 'Republic of Korea', 1545522719, 1545522719, 8.7334, 45.5841, 571.5, false,
            101.45, 177.38, 9.75, null, 624.84, '0404', false, 0];
    }


    beforeEach(() => {
    });


    it('maps a single traffic response correctly', () => {
        const state = createStateItem();
        const response: TrafficOpenskyResponse = {
            time: 1545522730,
            states: [ state ]
        };
        const trafficList = RestMapperTrafficOpensky.getTrafficListFromResponse(response);
        expect(trafficList.length).toBe(1);
        expect(trafficList[0].acAddress).toEqual(state[0].toUpperCase());
    });


    it('maps an emtpy response correctly', () => {
        const response: TrafficOpenskyResponse = {
            time: 1545522730,
            states: null
        };
        const trafficList = RestMapperTrafficOpensky.getTrafficListFromResponse(response);
        expect(trafficList).toEqual([]);
    });
});
