import {Traffic} from '../domain-model/traffic';
import {TrafficAircraftType} from '../domain-model/traffic-aircraft-type';
import {TrafficAddressType} from '../domain-model/traffic-address-type';
import {TrafficDataSource} from '../domain-model/traffic-data-source';
import {IRestOpenskyTrafficResponse} from '../rest/opensky/i-rest-opensky-traffic-response';
import {TrafficPosition} from '../domain-model/traffic-position';
import {Position4d} from '../../common/geo-math/domain-model/geometry/position4d';
import {Altitude} from '../../common/geo-math/domain-model/geometry/altitude';
import {AltitudeUnit} from '../../common/geo-math/domain-model/geometry/altitude-unit';
import {AltitudeReference} from '../../common/geo-math/domain-model/geometry/altitude-reference';
import {Timestamp} from '../../common/geo-math/domain-model/quantities/timestamp';
import {TrafficPositionMethod} from '../domain-model/traffic-position-method';
import {IRestOpenskyTraffic} from '../rest/opensky/i-rest-opensky-traffic';
import {TrafficAddress} from '../domain-model/traffic-address';
import {OpenskyTraffic} from '../domain-model/opensky-traffic';


export class TrafficOpensky1Mock {
    public static createRestResponse(): IRestOpenskyTrafficResponse {
        return {
            time: 1560891420,
            states: [this.createRest()]
        };
    }


    public static create(): OpenskyTraffic {
        return new OpenskyTraffic(
            new TrafficAddress('71BE18', TrafficAddressType.ICAO),
            'AAR790  ',
            [this.createPos()]
        );
    }


    public static createTraffic(): Traffic {
        return new Traffic(
            new TrafficAddress('71BE18', TrafficAddressType.ICAO),
            TrafficAircraftType.UNKNOWN,
            undefined,
            undefined,
            'AAR790',
            undefined,
            undefined,
            undefined,
            [this.createPos()]
        );
    }


    public static createRest(): IRestOpenskyTraffic {
        return ['71be18', 'AAR790  ', 'Republic of Korea', 1545522719, 1545522719, 8.7334, 45.5841, 571.5, false,
                101.45, 177.38, 9.75, null, 624.84, '0404', false, 0];
    }


    public static createPos(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                8.7334,
                45.5841,
                new Altitude(624.84, AltitudeUnit.M, AltitudeReference.MSL),
                Timestamp.createFromSec(1545522719)
            ),
            TrafficDataSource.OPENSKY,
            TrafficPositionMethod.ADSB,
            'OpenSky Network (ADS-B)',
            Timestamp.createFromSec(1560891420)
        );
    }
}
