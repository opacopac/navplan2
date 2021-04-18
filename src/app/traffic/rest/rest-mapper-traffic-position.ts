import {TrafficDataSource} from '../domain-model/traffic-data-source';
import {TrafficPosition} from '../domain-model/traffic-position';
import {TrafficPositionMethod} from '../domain-model/traffic-position-method';
import {IRestTrafficPosition} from './i-rest-traffic-position';
import {Position4dConverter} from '../../common/geo-math/rest-model/position4d-converter';
import {TimestampConverter} from '../../common/geo-math/rest-model/timestamp-converter';


export class RestMapperTrafficPosition {
    public static fromRest(trafficPos: IRestTrafficPosition, source: TrafficDataSource): TrafficPosition {
        return new TrafficPosition(
            Position4dConverter.fromRest(trafficPos.position),
            source,
            TrafficPositionMethod[trafficPos.method],
            trafficPos.receiver,
            TimestampConverter.fromRest(trafficPos.timestamp)
        );
    }
}
