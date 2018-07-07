import { Position2d } from './position2d';
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


    public getAveragePoint(): Position2d {
        let lonSum = 0;
        let latSum = 0;

        for (const pos of this.positions) {
            lonSum += pos.longitude;
            latSum += pos.latitude;
        }

        return new Position2d(lonSum / this.positions.length, latSum / this.positions.length);
    }


    // using ray casting method, source: http://alienryderflex.com/polygon/
    public containsPoint(point: Position2d): boolean {
        let j = this.positions.length - 1;
        let oddNodes = false;

        for (let i = 0; i < this.positions.length; i++) {
            if (this.positions[i].latitude < point.latitude && this.positions[j].latitude >= point.latitude ||
            this.positions[j].latitude < point.latitude && this.positions[i].latitude >= point.latitude)
            {
                if (this.positions[i].longitude + (point.latitude - this.positions[i].latitude) / (this.positions[j].latitude
                    - this.positions[i].latitude) * (this.positions[j].longitude - this.positions[i].longitude) < point.longitude) {
                    oddNodes = !oddNodes;
                }
            }
            j = i;
        }

        return oddNodes;
    }
}
