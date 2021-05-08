import {Position2d} from './position2d';
import {Geometry2d, Geometry2dType} from './geometry2d';


export class LineString implements Geometry2d {
    public static createFromArray(lonLatList: [number, number][]): LineString {
        if (!lonLatList) {
            return undefined;
        }

        return new LineString(lonLatList.map(lonLat => new Position2d(lonLat[0], lonLat[1])));
    }


    public constructor(
        public positions: Position2d[]
    ) {
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.LINESTRING;
    }


    public toArray(): [number, number][] {
        return this.positions.map(pos => pos.toArray());
    }
}
