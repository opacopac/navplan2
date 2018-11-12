import { Position2d } from './position2d';
import { Geometry2d, Geometry2dType } from './geometry2d';
import {Clonable} from '../clonable';


export class Line implements Geometry2d, Clonable<Line> {
    public constructor(
        public pos1: Position2d,
        public pos2: Position2d) {
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.POLYGON;
    }


    public clone(): Line {
        return new Line(this.pos1.clone(), this.pos2.clone());
    }
}
