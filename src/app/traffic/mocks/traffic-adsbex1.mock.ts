import {TrafficAddressType} from '../domain-model/traffic-address-type';
import {TrafficAddress} from '../domain-model/traffic-address';
import {IRestAdsbexTraffic} from '../rest/adsbex/i-rest-adsbex-traffic';
import {AdsbexTraffic} from '../domain-model/adsbex-traffic';
import {IRestAdsbexTrafficResponse} from '../rest/adsbex/i-rest-adsbex-traffic-response';
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
import {TrafficAircraftType} from '../domain-model/traffic-aircraft-type';


export class TrafficAdsbex1Mock {
    public static createRestResponse(): IRestAdsbexTrafficResponse {
        return {
            aclist: [TrafficAdsbex1Mock.createRest()]
        };
    }


    public static create(): AdsbexTraffic {
        return new AdsbexTraffic(
            new TrafficAddress('4BAA8F', TrafficAddressType.ICAO),
            'A321',
            'TC-JTO',
            'THY4PF',
            'THY',
            [this.createPos()]
        );
    }


    public static createTraffic(): Traffic {
        return new Traffic(
            new TrafficAddress('4BAA8F', TrafficAddressType.ICAO),
            TrafficAircraftType.UNKNOWN,
            'A321',
            'TC-JTO',
            'THY4PF',
            'THY',
            undefined, // 'Turkish 4PF',
            undefined,
            [this.createPos()]
        );
    }


    public static createRest(): IRestAdsbexTraffic {
        return {
            addr: ['4BAA8F', 'ICAO'],
            icaotype: 'A321',
            reg: 'TC-JTO',
            call: 'THY4PF',
            opicao: 'THY',
            poslist: [this.createRestPos()]
        };
    }


    public static createPos(): TrafficPosition {
        return new TrafficPosition(
            new Position4d(
                7.576501,
                46.834000,
                new Altitude(3375, AltitudeUnit.FT, AltitudeReference.MSL),
                Timestamp.createFromMs(1560000429704)
            ),
            TrafficDataSource.ADSBX,
            TrafficPositionMethod.MLAT,
            'ADSBExchange (MLAT)',
            Timestamp.createFromMs(1560000523926)
        );
    }


    public static createRestPos(): IRestTrafficPosition {
        return {
            position: {
                pos: [7.576501, 46.834000],
                alt: [3375, 'FT', 'MSL'],
                time: 1560000429704
            },
            method: 'MLAT',
            receiver: 'ADSBExchange (MLAT)',
            timestamp: 1560000523926
        };
    }
}
