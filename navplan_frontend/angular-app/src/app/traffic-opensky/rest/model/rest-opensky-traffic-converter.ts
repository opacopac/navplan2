import {Position4d} from '../../../geo-physics/domain/model/geometry/position4d';
import {Timestamp} from '../../../geo-physics/domain/model/quantities/timestamp';
import {TrafficAddressType} from '../../../traffic/domain/model/traffic-address-type';
import {TrafficDataSource} from '../../../traffic/domain/model/traffic-data-source';
import {TrafficPosition} from '../../../traffic/domain/model/traffic-position';
import {TrafficPositionMethod} from '../../../traffic/domain/model/traffic-position-method';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';
import {TrafficAddress} from '../../../traffic/domain/model/traffic-address';
import {IRestOpenskyTraffic} from './i-rest-opensky-traffic';
import {OpenskyTraffic} from '../../domain/model/opensky-traffic';


export class RestOpenskyTrafficConverter {
    public static fromRest(ac: IRestOpenskyTraffic, receivedTimeMs: number): OpenskyTraffic {
        return new OpenskyTraffic(
            new TrafficAddress(ac[0], TrafficAddressType.ICAO),
            ac[1],
            this.getPositionList(ac[5], ac[6], ac[3], ac[13], ac[16], receivedTimeMs)
        );
    }


    private static getPositionList(lon: number, lat: number, time_pos: number, geo_alt: number, pos_source: number, rec_time: number): TrafficPosition[] {
        const pos = new TrafficPosition(
            new Position4d(
                lon,
                lat,
                new Altitude(geo_alt, AltitudeUnit.M, AltitudeReference.MSL),
                Timestamp.fromEpochSec(time_pos)
            ),
             TrafficDataSource.OPENSKY,
             pos_source === 2 ? TrafficPositionMethod.MLAT : TrafficPositionMethod.ADSB,
            pos_source === 2 ? 'OpenSky Network (MLAT)' : 'OpenSky Network (ADS-B)',
            Timestamp.fromEpochSec(rec_time)
        );

        return [pos];
    }
}
