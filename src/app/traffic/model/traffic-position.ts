import {Position4d} from '../../shared/model/geometry/position4d';


export enum TrafficPositionMethod {
    FLARM,
    ADSB,
    MLAT,
    OWN
}


export class TrafficPosition {
    constructor(
        public position: Position4d,
        public method: TrafficPositionMethod,
        public receiver: string,
        public receivedTimeStampMs: number) {
    }
}
