import {Position2d} from '../../../geo-physics/domain-model/geometry/position2d';
import {Extent2d} from '../../../geo-physics/domain-model/geometry/extent2d';


export class GridDefinition {
    public extent: Extent2d;


    constructor(
        public width: number,
        public height: number,
        public minPos: Position2d,
        public stepLon: number,
        public stepLat: number
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


    public getXbyLon(lon: number): number {
        return (lon - this.extent.minPos.longitude) / this.stepLon;
    }


    public getYbyLat(lat: number): number {
        return (lat - this.extent.minPos.latitude) / this.stepLat;
    }


    public getLonByX(x: number): number {
        return this.extent.minPos.longitude + x * this.stepLon;
    }


    public getLatByY(y: number): number {
        return this.extent.minPos.latitude + y * this.stepLat;
    }
}
