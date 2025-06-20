import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';

export class CrosshairIcon {
    constructor(
        public id: number,
        public pos: Position2d,
        public color: string,
    ) {
    }
}
