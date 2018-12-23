import {Position4d} from '../../shared/model/geometry/position4d';
import {Clonable} from '../../shared/model/clonable';
import {Position2d} from '../../shared/model/geometry/position2d';
import {TrafficDataSource} from './traffic';


export enum TrafficPositionMethod {
    FLARM,
    ADSB,
    MLAT,
    OWN
}


export class TrafficPosition implements Clonable<TrafficPosition> {
    public static get2dPositionsFromList(posList: TrafficPosition[]): Position2d[] {
        return posList.map((pos) => pos.position as Position2d);
    }


    constructor(
        public position: Position4d,
        public source: TrafficDataSource,
        public method: TrafficPositionMethod,
        public receiver: string,
        public receivedTimeStampMs: number) {
    }


    public clone(): TrafficPosition {
        return new TrafficPosition(
            this.position,
            this.source,
            this.method,
            this.receiver,
            this.receivedTimeStampMs
        );
    }
}
