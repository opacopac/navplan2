import { Position2d } from './position2d';
import {Geometry2d, Geometry2dType} from './geometry2d';


export class Circle implements Geometry2d {
    constructor(
        public center: Position2d,
        public radius_m: number) {
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.CIRCLE;
    }
}
