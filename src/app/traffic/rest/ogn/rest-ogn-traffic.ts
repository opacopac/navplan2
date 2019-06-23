import {TrafficAircraftType} from '../../domain/traffic-aircraft-type';
import {IRestOgnTraffic} from './i-rest-ogn-traffic';
import {RestTrafficPosition} from '../rest-traffic-position';
import {RestTrafficAddress} from '../rest-traffic-address';
import {TrafficOgn} from '../../domain/traffic-ogn';
import {TrafficDataSource} from '../../domain/traffic-data-source';


export class RestOgnTraffic {
    public static fromRest(restTraffic: IRestOgnTraffic): TrafficOgn {
        return new TrafficOgn(
            RestTrafficAddress.fromRest(restTraffic.addr),
            TrafficAircraftType[restTraffic.actype],
            restTraffic.poslist.map(restPos => RestTrafficPosition.fromRest(restPos, TrafficDataSource.OGN))
        );
    }
}
