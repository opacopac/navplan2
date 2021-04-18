import {Position4d} from '../../common/geo-math/domain-model/geometry/position4d';
import {Clonable} from '../../system/domain-model/clonable';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {TrafficDataSource} from './traffic-data-source';
import {TrafficPositionMethod} from './traffic-position-method';
import {Timestamp} from '../../common/geo-math/domain-model/quantities/timestamp';


export class TrafficPosition implements Clonable<TrafficPosition> {
    public static get2dPositionsFromList(posList: TrafficPosition[]): Position2d[] {
        return posList.map((pos) => pos.position as Position2d);
    }


    constructor(
        public position: Position4d,
        public source: TrafficDataSource,
        public method: TrafficPositionMethod,
        public receiver: string,
        public receivedTimestamp: Timestamp) {
    }


    public clone(): TrafficPosition {
        return new TrafficPosition(
            this.position,
            this.source,
            this.method,
            this.receiver,
            this.receivedTimestamp
        );
    }
}
