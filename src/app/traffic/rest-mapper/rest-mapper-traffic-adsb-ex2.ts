import {Traffic, TrafficAddressType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Altitude} from '../../shared/model/quantities/altitude';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {LengthUnit} from '../../shared/model/units';


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
    'alt': string;
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
        const trafficList: Traffic[] = [];

        if (!response.ac) {
            return trafficList;
        }

        for (const ac of response.ac) {
            const traffic = new Traffic(
                ac.icao.toUpperCase(),
                TrafficAddressType.ICAO,
                TrafficDataSource.ADSBX,
                undefined,
                ac.reg,
                ac.call,
                undefined,
                undefined,
                this.getPositionList(response, ac));
            trafficList.push(traffic);
        }

        return trafficList;
    }


    private static getPositionList(response: TrafficAdsbEx2Response, ac: TrafficAdsbEx2RestItem): TrafficPosition[] {
        const pos = new TrafficPosition(
            new Position4d(
                parseFloat(ac.lon),
                parseFloat(ac.lat),
                this.getAltitude(ac),
                Timestamp.createFromMs(parseInt(ac.postime, 10))
            ),
            undefined,
            ac.mlat === '1' ? TrafficPositionMethod.MLAT : TrafficPositionMethod.ADSB,
            ac.mlat === '1' ? this.RECEIVER_NAME_MLAT : this.RECEIVER_NAME_ADSB,
            response.ctime
        );

        return [pos];
    }


    private static getAltitude(ac: TrafficAdsbEx2RestItem): Altitude {
        if (ac.gnd === '1') {
            return undefined;
        }

        return new Altitude(parseInt(ac.alt, 10), LengthUnit.FT);
    }
}
