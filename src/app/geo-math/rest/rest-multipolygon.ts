import {IRestMultipolygon} from './i-rest-multipolygon';
import {RestPolygon} from './rest-polygon';
import {Multipolygon} from '../domain/geometry/multipolygon';


export class RestMultipolygon {
    public static fromRest(restMultiPolygon: IRestMultipolygon): Multipolygon {
        return new Multipolygon(
            restMultiPolygon.map(poly => RestPolygon.fromRest(poly))
        );
    }
}
