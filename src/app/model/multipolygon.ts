import { Geometry2d, Geometry2dType } from './geometry2d';
import { Polygon } from './polygon';


export class Multipolygon implements Geometry2d {
    public polygons: Polygon[];


    public constructor() {
        this.polygons = [];
    }


    public static createFromLonLatListList(lonLatListList: [number, number][][]): Multipolygon {
        if (!lonLatListList) {
            return undefined;
        }

        const multiPoly = new Multipolygon();
        for (const lonLatList of lonLatListList) {
            multiPoly.polygons.push(Polygon.createFromLonLatList(lonLatList));
        }

        return multiPoly;
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.MULTIPOLYGON;
    }


    public getLonLatList(): [number, number][][] {
        const polyList: [number, number][][] = [];

        for (const polygon of this.polygons) {
            polyList.push(polygon.getLonLatList());
        }

        return polyList;
    }


    public getMercatorList(): [number, number][][] {
        const polyList: [number, number][][] = [];

        for (const polygon of this.polygons) {
            polyList.push(polygon.getMercatorList());
        }

        return polyList;
    }
}
