import * as ol from 'openlayers';
import {Position2d} from '../../shared/model/geometry/position2d';


export class OlHelper {
    private constructor() {}


    public static getMercator(pos: Position2d): [number, number] {
        return ol.proj.fromLonLat(pos.toArray());
    }


    public static getPosFromMercator(mercator: [number, number]): Position2d {
        const lonLat = ol.proj.toLonLat(mercator);
        return new Position2d(lonLat[0], lonLat[1]);
    }
}
