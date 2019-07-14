import {IRestPolygon} from './i-rest-polygon';
import {Polygon} from '../domain/geometry/polygon';
import {RestPosition2d} from './rest-position2d';


export class RestPolygon {
    public static fromRest(restPolygon: IRestPolygon): Polygon {
        return new Polygon(
            restPolygon.map(pos => RestPosition2d.fromRest(pos))
        );
    }
}
