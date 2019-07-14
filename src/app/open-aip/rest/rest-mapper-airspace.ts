import {IRestAirspace} from './i-rest-airspace';
import {Airspace} from '../domain/airspace';
import {RestAltitude} from '../../geo-math/rest/rest-altitude';
import {RestPolygon} from '../../geo-math/rest/rest-polygon';


export class RestMapperAirspace {
    public static fromRest(restItem: IRestAirspace): Airspace {
        return new Airspace(
            restItem.id,
            restItem.aip_id,
            restItem.category,
            restItem.country,
            restItem.name,
            RestAltitude.fromRest(restItem.alt_bottom),
            RestAltitude.fromRest(restItem.alt_top),
            RestPolygon.fromRest(restItem.polygon)
        );
    }
}
