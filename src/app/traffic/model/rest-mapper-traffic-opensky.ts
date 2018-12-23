import {Altitude} from '../../shared/model/quantities/altitude';
import {LengthUnit} from '../../shared/model/units';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from './traffic';
import {TrafficPosition, TrafficPositionMethod} from './traffic-position';
import {IcaoCallsignService} from '../services/icaocallsign.service';


// details: https://opensky-network.org/apidoc/rest.html
export interface TrafficOpenskyResponse {
    time: number;
    states: [
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
        number // 16: position_source
    ][];
}


export class RestMapperTrafficOpensky {
    public static getTrafficListFromResponse(response: TrafficOpenskyResponse): Traffic[] {
        const trafficList: Traffic[] = [];

        if (response.states) {
            for (const ac of response.states) {
                const traffic = new Traffic(
                    ac[0].toUpperCase(),
                    TrafficAddressType.ICAO,
                    TrafficDataSource.OPENSKY,
                    TrafficAircraftType.UNKNOWN,
                    undefined,
                    ac[1],
                    this.getOperatorCallsign(ac[1]),
                    undefined,
                    this.getPositionList(ac[5], ac[6], ac[3], ac[13], ac[16], response.time));
                trafficList.push(traffic);
            }
        }

        return trafficList;
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
                new Altitude(geo_alt, LengthUnit.M),
                new Timestamp(time_pos)
            ),
             pos_source === 2 ? TrafficPositionMethod.MLAT : TrafficPositionMethod.ADSB,
            pos_source === 2 ? 'OpenSky Network (MLAT)' : 'OpenSky Network (ADS-B)',
            rec_time * 1000
        );

        const positionList: TrafficPosition[] = []; // will contain only one entry
        positionList.push(pos);

        return positionList;
    }
}
