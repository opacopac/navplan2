import { Timestamp } from './timestamp';
import { Position4d } from './position';


export class Track {
    constructor(
        public id: number,
        public name: string,
        public positionList: Position4d[],
        public saveTime: Timestamp) {
    }
}
