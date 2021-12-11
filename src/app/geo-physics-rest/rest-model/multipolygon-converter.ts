import {IRestMultipolygon} from './i-rest-multipolygon';
import {PolygonConverter} from './polygon-converter';
import {Multipolygon} from '../../geo-physics/domain-model/geometry/multipolygon';


export class MultipolygonConverter {
    public static fromRest(restMultiPolygon: IRestMultipolygon): Multipolygon {
        return new Multipolygon(
            restMultiPolygon.map(poly => PolygonConverter.fromRest(poly))
        );
    }
}
