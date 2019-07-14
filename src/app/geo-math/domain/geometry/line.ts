import {Position2d} from './position2d';
import {Geometry2d, Geometry2dType} from './geometry2d';
import {Clonable} from '../../../system/domain/clonable';


export class Line implements Geometry2d, Clonable<Line> {
    public constructor(
        public pos1: Position2d,
        public pos2: Position2d) {
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.LINE;
    }


    public clone(): Line {
        return new Line(this.pos1.clone(), this.pos2.clone());
    }


    public intersect(line: Line): Position2d {
        const x1 = this.pos1.longitude;
        const y1 = this.pos1.latitude;
        const x2 = this.pos2.longitude;
        const y2 = this.pos2.latitude;
        const x3 = line.pos1.longitude;
        const y3 = line.pos1.latitude;
        const x4 = line.pos2.longitude;
        const y4 = line.pos2.latitude;
        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        const intLon = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
        const intLat = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;

        return new Position2d(intLon, intLat);
    }
}
