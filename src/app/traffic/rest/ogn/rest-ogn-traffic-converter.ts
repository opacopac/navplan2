import {TrafficAircraftType} from '../../domain-model/traffic-aircraft-type';
import {IRestOgnTraffic} from './i-rest-ogn-traffic';
import {RestTrafficPositionConverter} from '../rest-traffic-position-converter';
import {RestTrafficAddressConverter} from '../rest-traffic-address-converter';
import {OgnTraffic} from '../../domain-model/ogn-traffic';
import {TrafficDataSource} from '../../domain-model/traffic-data-source';


export class RestOgnTrafficConverter {
    public static fromRest(restTraffic: IRestOgnTraffic): OgnTraffic {
        return new OgnTraffic(
            RestTrafficAddressConverter.fromRest(restTraffic.addr),
            TrafficAircraftType[restTraffic.actype],
            restTraffic.poslist.map(restPos => RestTrafficPositionConverter.fromRest(restPos, TrafficDataSource.OGN))
        );
    }
}
