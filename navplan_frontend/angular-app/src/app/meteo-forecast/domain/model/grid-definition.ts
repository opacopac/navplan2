import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';


export class GridDefinition {
    public extent: Extent2d;


    constructor(
        public width: number,
        public height: number,
        public minPos: Position2d,
        public stepLon: number,
        public stepLat: number,
        public oddRowLonOffset: number
    ) {
        if (width <= 0 || height <= 0) {
            throw new Error('width / height must be positive numbers');
        }

        this.extent = new Extent2d(
            minPos.longitude,
            minPos.latitude,
            minPos.longitude + width * stepLon,
            minPos.latitude + height * stepLat
        );
    }
}
