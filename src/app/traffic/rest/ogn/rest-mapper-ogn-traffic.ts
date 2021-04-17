import {TrafficAircraftType} from '../../domain-model/traffic-aircraft-type';
import {IRestOgnTraffic} from './i-rest-ogn-traffic';
import {RestMapperTrafficPosition} from '../rest-mapper-traffic-position';
import {RestMapperTrafficAddress} from '../rest-mapper-traffic-address';
import {TrafficOgn} from '../../domain-model/traffic-ogn';
import {TrafficDataSource} from '../../domain-model/traffic-data-source';


export class RestMapperOgnTraffic {
    public static fromRest(restTraffic: IRestOgnTraffic): TrafficOgn {
        return new TrafficOgn(
            RestMapperTrafficAddress.fromRest(restTraffic.addr),
            TrafficAircraftType[restTraffic.actype],
            restTraffic.poslist.map(restPos => RestMapperTrafficPosition.fromRest(restPos, TrafficDataSource.OGN))
        );
    }
}
