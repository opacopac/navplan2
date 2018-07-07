import {Position4d} from '../../shared/model/geometry/position4d';
import {Timestamp} from '../../shared/model/quantities/timestamp';


export class Track {
    constructor(
        public id: number,
        public name: string,
        public positionList: Position4d[],
        public saveTime: Timestamp) {
    }
}
