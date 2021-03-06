import {TrafficAircraftType} from '../domain-model/traffic-aircraft-type';
import {TrafficAddressType} from '../domain-model/traffic-address-type';
import {TrafficAddress} from '../domain-model/traffic-address';
import {IRestOgnTrafficResponse} from '../rest/ogn/i-rest-ogn-traffic-response';
import {IRestOgnTraffic} from '../rest/ogn/i-rest-ogn-traffic';
import {OgnTraffic} from '../domain-model/ogn-traffic';
import {TrafficPosition} from '../domain-model/traffic-position';
import {Position4d} from '../../common/geo-math/domain-model/geometry/position4d';
import {Altitude} from '../../common/geo-math/domain-model/geometry/altitude';
import {AltitudeUnit} from '../../common/geo-math/domain-model/geometry/altitude-unit';
import {AltitudeReference} from '../../common/geo-math/domain-model/geometry/altitude-reference';
import {Timestamp} from '../../common/geo-math/domain-model/quantities/timestamp';
import {TrafficDataSource} from '../domain-model/traffic-data-source';
import {TrafficPositionMethod} from '../domain-model/traffic-position-method';
import {IRestTrafficPosition} from '../rest/i-rest-traffic-position';
import {Traffic} from '../domain-model/traffic';


export class TrafficOgn1Mock {
    public static createRestResponse(): IRestOgnTrafficResponse {
        return {
            aclist: [this.createRest()]
        };
    }


    public static create(): OgnTraffic {
        return new OgnTraffic(
            new TrafficAddress('4B05D7', TrafficAddressType.ICAO),
            TrafficAircraftType.POWERED_AIRCRAFT,
            [this.createPos()]
        );
    }


    public static createTraffic(): Traffic {
        return new Traffic(
            new TrafficAddress('4B05D7', TrafficAddressType.ICAO),
            TrafficAircraftType.POWERED_AIRCRAFT,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            [this.createPos()]
        );
    }


    public static createRest(): IRestOgnTraffic {
        return {
            'addr': ['4B05D7', 'ICAO'],
            'actype': 'POWERED_AIRCRAFT',
            'poslist': [this.createRestPos()]
        };
    }


    public static createPos(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.1,
                47.1,
                new Altitude(1600, AltitudeUnit.FT, AltitudeReference.MSL),
                Timestamp.createFromMs(1560075378000)
            ),
            TrafficDataSource.OGN,
            TrafficPositionMethod.FLARM,
            'Rigi',
            Timestamp.createFromMs(1560075378000)
        );
    }


    public static createRestPos(): IRestTrafficPosition {
        return {
            position: {
                pos: [7.1, 47.1],
                alt: [1600, 'FT', 'MSL'],
                time: 1560075378000
            },
            method: 'FLARM',
            receiver: 'Rigi',
            timestamp: 1560075378000
        };
    }
}
