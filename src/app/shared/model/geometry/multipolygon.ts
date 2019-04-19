import { Geometry2d, Geometry2dType } from './geometry2d';
import { Polygon } from './polygon';


export class Multipolygon implements Geometry2d {
    public constructor(
        public polygons: Polygon[] = []
    ) {
    }


    public static createFromLonLatListList(lonLatListList: [number, number][][]): Multipolygon {
        if (!lonLatListList) {
            return undefined;
        }

        return new Multipolygon(
            lonLatListList.map(lonLatList => Polygon.createFromLonLatList(lonLatList))
        );
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.MULTIPOLYGON;
    }


    public getLonLatList(): [number, number][][] {
        return this.polygons.map(polygon => polygon.getLonLatList());
    }
}
