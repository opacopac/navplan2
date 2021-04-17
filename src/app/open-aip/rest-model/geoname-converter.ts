import {Geoname} from '../domain-model/geoname';
import {IRestGeoname} from './i-rest-geoname';
import {Position2dConverter} from '../../geo-math/rest-model/position2d-converter';
import {LengthConverter} from '../../geo-math/rest-model/length-converter';


export class GeonameConverter {
    public static fromRest(restItem: IRestGeoname): Geoname {
        return new Geoname(
            restItem.id,
            restItem.name,
            restItem.searchresultname,
            restItem.feature_class,
            restItem.feature_code,
            restItem.country,
            restItem.admin1,
            restItem.admin2,
            restItem.population,
            Position2dConverter.fromRest(restItem.pos),
            LengthConverter.fromRest(restItem.elevation)
        );
    }
}
