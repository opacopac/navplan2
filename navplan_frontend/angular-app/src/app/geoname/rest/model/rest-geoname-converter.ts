import {Geoname} from '../../domain/model/geoname';
import {IRestGeoname} from './i-rest-geoname';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';
import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';


export class RestGeonameConverter {
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
            Position2dConverter.fromRest(restItem.position),
            RestAltitudeConverter.fromRest(restItem.elevation)
        );
    }


    public static fromRestList(restGeonameList: IRestGeoname[]): Geoname[] {
        return restGeonameList.map(restGeoname => RestGeonameConverter.fromRest(restGeoname));
    }
}
