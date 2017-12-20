import { Position2d } from './position';


export class Polygon {
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
