import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Altitude} from '../../shared/model/quantities/altitude';
import {LengthUnit} from '../../shared/model/units';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {TrafficOpenskyResponse} from '../rest-mapper/rest-mapper-traffic-opensky';
import {Extent} from '../../shared/model/extent';
import {TrafficAdsbExResponse, TrafficAdsbExRestItem} from '../rest-mapper/rest-mapper-traffic-adexb-ex';
import {TrafficOgnResponse, TrafficOgnRestItem} from '../rest-mapper/rest-mapper-traffic-ogn';


export class TrafficMock {
    public static readonly MOCK_EXTENT_1 = Extent.createFromLatLon([7.0, 47.0, 7.1, 47.1]);

    public static readonly MOCK_POSITION_1 = new TrafficPosition(
        new Position4d(47.1, 47.1, new Altitude(1600, LengthUnit.FT), Timestamp.now()),
        TrafficDataSource.OGN,
        TrafficPositionMethod.FLARM,
        'receiver123',
        Date.now()
    );

    public static readonly MOCK_TRAFFIC_1 = new Traffic(
        '12345',
        TrafficAddressType.ICAO,
        TrafficDataSource.OGN,
        TrafficAircraftType.UAV,
        'HB-UAV',
        'SWR123',
        'Swiss 123',
        'Airbus A320',
        [TrafficMock.MOCK_POSITION_1]
    );


    public static readonly OGN_MOCK_RESPONSE_1_ITEM_1: TrafficOgnRestItem = {
        id: '4B406A',
        addresstype: 'ICAO',
        actype: 'POWERED_AIRCRAFT',
        positions: [
            {
                time: '13:06:33',
                latitude: 46.71638333333333,
                longitude: 7.198616666666666,
                altitude: 1668,
                receiver: 'LSTBSE'
            }
        ],
        registration: 'HB-YKG',
        aircraftModelType: 'VAN\'S RV-8',
        aircraftCategoryId: 4294967295
    };


    public static readonly OGN_MOCK_RESPONSE_1: TrafficOgnResponse = {
        aclist: {
            '4B406A': TrafficMock.OGN_MOCK_RESPONSE_1_ITEM_1
        }
    };


    public static readonly OPENSKY_MOCK_RESPONSE_1: TrafficOpenskyResponse = {
        time: Date.now(),
        states: [['71be18', 'AAR790  ', 'Republic of Korea', 1545522719, 1545522719, 8.7334, 45.5841, 571.5, false,
            101.45, 177.38, 9.75, null, 624.84, '0404', false, 0]]
    };


    public static readonly ADSBEX_MOCK_RESPONSE_1_ITEM_1: TrafficAdsbExRestItem = {
        Icao: '4B18F3',
        Reg: 'HB-JLR',
        GAlt: 1450,
        Call: 'SWR182Q',
        Lat: 47.455769,
        Long: 8.563948,
        PosTime: 1545563187737,
        Mlat: false,
        Type: 'A320',
        Mdl: 'Airbus A320 214',
        OpIcao: 'SWR',
        Species: 1,
        EngType: 3,
        Mil: false,
        Gnd: true
    };


    public static readonly ADSBEX_MOCK_RESPONSE_1: TrafficAdsbExResponse = {
        acList: [
            TrafficMock.ADSBEX_MOCK_RESPONSE_1_ITEM_1
        ],
        stm: 1545563203965
    };


    public static createPosition(
        lon: number,
        lat: number,
        timestampSec?: number,
        source: TrafficDataSource = TrafficDataSource.OPENSKY,
        posMethod: TrafficPositionMethod = TrafficPositionMethod.ADSB
    ): TrafficPosition {
        const timestamp = timestampSec ? new Timestamp(timestampSec) : Timestamp.now();
        return new TrafficPosition(
            new Position4d(lon, lat, new Altitude(2000, LengthUnit.FT), timestamp),
            source,
            posMethod,
            'rec123',
            timestamp.getMs()
        );
    }
}
