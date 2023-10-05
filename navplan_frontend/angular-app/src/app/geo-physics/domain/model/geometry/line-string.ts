import {Position2d} from './position2d';
import {Geometry2d, Geometry2dType} from './geometry2d';
import {Extent2d} from './extent2d';
import {Line} from './line';


export class LineString implements Geometry2d {
    public static createFromArray(lonLatList: [number, number][]): LineString {
        if (!lonLatList) {
            return undefined;
        }

        return new LineString(lonLatList.map(lonLat => new Position2d(lonLat[0], lonLat[1])));
    }


    public constructor(public positions: Position2d[]) {
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.LINESTRING;
    }


    public toArray(): [number, number][] {
        return this.positions.map(pos => pos.toArray());
    }


    public toLineList(): Line[] {
        const lineList = [];

        for (let i = 0; i < this.positions.length - 1; i++) {
            lineList.push(new Line(this.positions[i], this.positions[i + 1]));
        }

        return lineList;
    }


    public getBoundingBox(): Extent2d {
        let minLat, minLon, maxLat, maxLon: number;

        this.positions.forEach(pos => {
            if (!minLat || pos.latitude < minLat) {
                minLat = pos.latitude;
            }
            if (!minLon || pos.longitude < minLon) {
                minLon = pos.longitude;
            }
            if (!maxLat || pos.latitude > maxLat) {
                maxLat = pos.latitude;
            }
            if (!maxLon || pos.longitude > maxLon) {
                maxLon = pos.longitude;
            }
        });

        return new Extent2d(minLon, minLat, maxLon, maxLat);
    }
}
