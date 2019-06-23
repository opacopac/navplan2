import {Position4d} from '../../../shared/model/geometry/position4d';
import {Timestamp} from '../../../shared/model/quantities/timestamp';
import {TrafficAddressType} from '../../domain/traffic-address-type';
import {TrafficDataSource} from '../../domain/traffic-data-source';
import {TrafficPosition} from '../../domain/traffic-position';
import {TrafficPositionMethod} from '../../domain/traffic-position-method';
import {Altitude} from '../../../shared/model/geometry/altitude';
import {AltitudeUnit} from '../../../shared/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../shared/model/geometry/altitude-reference';
import {TrafficAddress} from '../../domain/traffic-address';
import {IRestOpenskyTraffic} from './i-rest-opensky-traffic';
import {TrafficOpensky} from '../../domain/traffic-opensky';


export class RestOpenskyTraffic {
    public static fromRest(ac: IRestOpenskyTraffic, receivedTimeMs: number): TrafficOpensky {
        return new TrafficOpensky(
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
                Timestamp.createFromSec(time_pos)
            ),
             TrafficDataSource.OPENSKY,
             pos_source === 2 ? TrafficPositionMethod.MLAT : TrafficPositionMethod.ADSB,
            pos_source === 2 ? 'OpenSky Network (MLAT)' : 'OpenSky Network (ADS-B)',
            Timestamp.createFromSec(rec_time)
        );

        return [pos];
    }
}
