import { Position2d } from './position';
import { Geometry2d, Geometry2dType } from './geometry2d';


export class Polygon implements Geometry2d {
    public positions: Position2d[];


    public constructor() {
        this.positions = [];
    }


    public static createFromLonLatList(lonLatList: [number, number][]): Polygon {
        if (!lonLatList) {
            return undefined;
        }

        const poly = new Polygon();
        for (const lonLat of lonLatList) {
            poly.positions.push(new Position2d(lonLat[0], lonLat[1]));
        }

        return poly;
    }


    public static createFromMercatorList(mercatorList: [number, number][]): Polygon {
        if (!mercatorList) {
            return undefined;
        }

        const poly = new Polygon();
        for (const mercator of mercatorList) {
            poly.positions.push(Position2d.createFromMercator(mercator));
        }

        return poly;
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.POLYGON;
    }


    public getLonLatList(): [number, number][] {
        const lonLatList: [number, number][] = [];

        // convert to mercator
        for (const pos of this.positions) {
            lonLatList.push(pos.getLonLat());
        }

        return lonLatList;
    }


    public getMercatorList(): [number, number][] {
        const mercatorList: [number, number][] = [];

        // convert to mercator
        for (const pos of this.positions) {
            mercatorList.push(pos.getMercator());
        }

        return mercatorList;
    }
}
