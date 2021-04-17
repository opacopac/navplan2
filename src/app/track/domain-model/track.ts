import {Position4d} from '../../geo-math/domain-model/geometry/position4d';
import {Timestamp} from '../../geo-math/domain-model/quantities/timestamp';


export class Track {
    constructor(
        public id: number,
        public name: string,
        public positionList: Position4d[],
        public saveTime: Timestamp) {
    }
}
