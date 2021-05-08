import {Geometry2d, Geometry2dType} from './geometry2d';
import {LineString} from './line-string';


export class MultiLineString implements Geometry2d {
    public static createFromArray(lineList: [number, number][][]): MultiLineString {
        if (!lineList) {
            return undefined;
        }

        return new MultiLineString(lineList.map(lonLatList => LineString.createFromArray(lonLatList)));
    }


    public constructor(
        public lineStrings: LineString[]
    ) {
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.MULTILINESTRING;
    }


    public toArray(): [number, number][][] {
        return this.lineStrings.map(line => line.toArray());
    }
}
