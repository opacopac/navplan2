import {TrafficDataSource} from '../domain/traffic-data-source';
import {TrafficPosition} from '../domain/traffic-position';
import {TrafficPositionMethod} from '../domain/traffic-position-method';
import {IRestTrafficPosition} from './i-rest-traffic-position';
import {RestPosition4d} from '../../shared/model/rest/rest-position4d';
import {RestTimestamp} from '../../shared/model/rest/rest-timestamp';


export class RestTrafficPosition {
    public static fromRest(trafficPos: IRestTrafficPosition, source: TrafficDataSource): TrafficPosition {
        return new TrafficPosition(
            RestPosition4d.fromRest(trafficPos.position),
            source,
            TrafficPositionMethod[trafficPos.method],
            trafficPos.receiver,
            RestTimestamp.fromRest(trafficPos.timestamp)
        );
    }
}
