import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Length} from '../../shared/model/quantities/length';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {LengthUnit} from '../../shared/model/quantities/units';


// details: TrafficMock.ADSBEX2_MOCK_RESPONSE_1
export interface TrafficAdsbEx2Response {
    'ac': TrafficAdsbEx2RestItem[];
    'total': number;
    'ctime': number;
    'req_ip': string;
}


// details: TrafficMock.ADSBEX2_MOCK_RESPONSE_1_ITEM_1
export interface TrafficAdsbEx2RestItem {
    'postime': string;
    'icao': string;
    'reg': string;
    'type': string;
    'spd': string;
    'galt': string;
    'lat': string;
    'lon': string;
    'vsi': string;
    'trak': string;
    'sqk': string;
    'call': string;
    'gnd': string;
    'trt': string;
    'pos': string;
    'mlat': string;
    'tisb': string;
    'mil': string;
}


export class RestMapperTrafficAdsbEx2 {
    public static readonly RECEIVER_NAME_ADSB = 'ADSBExchange (ADS-B)';
    public static readonly RECEIVER_NAME_MLAT = 'ADSBExchange (MLAT)';


    public static getTrafficListFromResponse(response: TrafficAdsbEx2Response): Traffic[] {
        if (!response.ac) {
            return [];
        }

        return response.ac.map(ac => new Traffic(
            ac.icao.toUpperCase(),
            TrafficAddressType.ICAO,
            TrafficDataSource.ADSBX2,
            TrafficAircraftType.UNKNOWN,
            ac.type,
            ac.reg,
            ac.call,
            undefined,
            ac.type,
            this.getPositionList(response, ac)
        ));
    }


    private static getPositionList(response: TrafficAdsbEx2Response, ac: TrafficAdsbEx2RestItem): TrafficPosition[] {
        const pos = new TrafficPosition(
            new Position4d(
                parseFloat(ac.lon),
                parseFloat(ac.lat),
                this.getAltitude(ac),
                Timestamp.createFromMs(parseInt(ac.postime, 10))
            ),
            TrafficDataSource.ADSBX2,
            ac.mlat === '1' ? TrafficPositionMethod.MLAT : TrafficPositionMethod.ADSB,
            ac.mlat === '1' ? this.RECEIVER_NAME_MLAT : this.RECEIVER_NAME_ADSB,
            response.ctime
        );

        return [pos];
    }


    private static getAltitude(ac: TrafficAdsbEx2RestItem): Length {
        if (ac.gnd === '1') {
            return undefined;
        }

        return new Length(parseInt(ac.galt, 10), LengthUnit.FT);
    }
}
