import { Timestamp } from './quantities/timestamp';
import { Position4d } from './geometry/position4d';


export class Track {
    constructor(
        public id: number,
        public name: string,
        public positionList: Position4d[],
        public saveTime: Timestamp) {
    }
}
