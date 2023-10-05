import {IRestPolygon} from './i-rest-polygon';
import {Polygon} from '../../domain/model/geometry/polygon';
import {Position2dConverter} from './position2d-converter';


export class PolygonConverter {
    public static fromRest(restPolygon: IRestPolygon): Polygon {
        if (!restPolygon) {
            return undefined;
        }

        return new Polygon(
            restPolygon.map(pos => Position2dConverter.fromRest(pos))
        );
    }
}
