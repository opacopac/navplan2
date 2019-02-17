import {Length} from '../../shared/model/quantities/length';
import {LengthUnit} from '../../shared/model/units';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';
import {IcaoCallsignService} from '../services/icaocallsign.service';


// details: https://opensky-network.org/apidoc/rest.html
export interface TrafficOpenskyResponse {
    time: number;
    states: [
        string, // 0: icao24 (Unique ICAO 24-bit address of the transponder in hex string representation.)
        string, // 1: callsign (Callsign of the vehicle (8 chars). Can be null if no callsign has been received.)
        string, // 2: origin_country (Country name inferred from the ICAO 24-bit address.)
        number, // 3: time_position (Unix timestamp (seconds) for the last position update. Can be null if no position report was received by OpenSky within the past 15s.)
        number, // 4: last_contact (Unix timestamp (seconds) for the last update in general. This field is updated for any new, valid message received from the transponder.)
        number, // 5: longitude (WGS-84 longitude in decimal degrees. Can be null.)
        number, // 6: latitude (WGS-84 latitude in decimal degrees. Can be null.)
        number, // 7: baro_altitude (Barometric altitude in meters. Can be null.)
        boolean, // 8: on_ground (Boolean value which indicates if the position was retrieved from a surface position report.)
        number, // 9: velocity (Velocity over ground in m/s. Can be null.)
        number, // 10: true_track (True track in decimal degrees clockwise from north (north=0°). Can be null.)
        number, // 11: vertical_rate (Vertical rate in m/s. A positive value indicates that the airplane is climbing, a negative value indicates that it descends. Can be null)
        number[], // 12: sensors (IDs of the receivers which contributed to this state vector. Is null if no filtering for sensor was used in the request)
        number, // 13: geo_altitude (Geometric altitude in meters. Can be null.)
        string, // 14: squawk (The transponder code aka Squawk. Can be null.)
        boolean, // 15: spi (Whether flight status indicates special purpose indicator)
        number // 16: position_source (0 = ADS-B, 1 = ASTERIX, 2 = MLAT)
    ][];
}


export class RestMapperTrafficOpensky {
    public static getTrafficListFromResponse(response: TrafficOpenskyResponse): Traffic[] {
        if (!response.states) {
            return [];
        }

        return response.states.map(ac => new Traffic(
            ac[0].toUpperCase(),
            TrafficAddressType.ICAO,
            TrafficDataSource.OPENSKY,
            TrafficAircraftType.UNKNOWN,
            undefined,
            undefined,
            ac[1],
            this.getOperatorCallsign(ac[1]),
            undefined,
            this.getPositionList(ac[5], ac[6], ac[3], ac[13], ac[16], response.time)
        ));
    }


    private static getOperatorCallsign(callsign: string): string {
        if (!callsign) {
            return undefined;
        }

        // check for default format (3 letters + 1 digit + 1-3x digit/letter)
        if (callsign.toUpperCase().match(/^[A-Z]{3}\d[A-Z0-9]{0,3}/)) {
            const icaoCode = callsign.substring(0, 3);
            const opCallsign = IcaoCallsignService.getIcaoTelephonyDesignator(icaoCode);

            if (opCallsign) {
                return opCallsign + ' ' + callsign.substring(3);
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }


    private static getPositionList(lon: number, lat: number, time_pos: number, geo_alt: number, pos_source: number, rec_time: number): TrafficPosition[] {
        const pos = new TrafficPosition(
            new Position4d(
                lon,
                lat,
                new Length(geo_alt, LengthUnit.M),
                Timestamp.createFromSec(time_pos)
            ),
             TrafficDataSource.OPENSKY,
             pos_source === 2 ? TrafficPositionMethod.MLAT : TrafficPositionMethod.ADSB,
            pos_source === 2 ? 'OpenSky Network (MLAT)' : 'OpenSky Network (ADS-B)',
            rec_time * 1000
        );

        return [pos];
    }
}
