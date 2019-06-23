import { Geoname } from '../domain/geoname';
import {IRestGeoname} from './i-rest-geoname';
import {RestPosition2d} from '../../shared/model/rest/rest-position2d';
import {RestLength} from '../../shared/model/rest/rest-length';


export class RestGeoname {
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
            RestPosition2d.fromRest(restItem.pos),
            RestLength.fromRest(restItem.elevation)
        );
    }
}
