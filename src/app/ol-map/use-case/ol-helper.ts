import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {fromLonLat, toLonLat} from 'ol/proj';


export class OlHelper {
    private constructor() {}


    public static getMercator(pos: Position2d): [number, number] {
        const arr = fromLonLat(pos.toArray());

        return [arr[0], arr[1]];
    }


    public static getPosFromMercator(mercator: [number, number]): Position2d {
        const lonLat = toLonLat(mercator);

        return new Position2d(lonLat[0], lonLat[1]);
    }
}
