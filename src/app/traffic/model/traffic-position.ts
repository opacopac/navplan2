import {Position4d} from '../../shared/model/geometry/position4d';
import {Clonable} from '../../shared/model/clonable';


export enum TrafficPositionMethod {
    FLARM,
    ADSB,
    MLAT,
    OWN
}


export class TrafficPosition implements Clonable<TrafficPosition> {
    constructor(
        public position: Position4d,
        public method: TrafficPositionMethod,
        public receiver: string,
        public receivedTimeStampMs: number) {
    }


    public clone(): TrafficPosition {
        return new TrafficPosition(
            this.position,
            this.method,
            this.receiver,
            this.receivedTimeStampMs
        );
    }
}
