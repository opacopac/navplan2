import {IRestAirspace} from './i-rest-airspace';
import {Airspace} from '../../domain/model/airspace';
import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';
import {PolygonConverter} from '../../../geo-physics/rest/model/polygon-converter';


export class RestAirspaceConverter {
    public static fromRest(restItem: IRestAirspace): Airspace {
        return new Airspace(
            restItem.id,
            restItem.category,
            restItem.country,
            restItem.name,
            RestAltitudeConverter.fromRest(restItem.alt_bottom),
            RestAltitudeConverter.fromRest(restItem.alt_top),
            PolygonConverter.fromRest(restItem.polygon)
        );
    }


    public static fromRestList(restAirspaceList: IRestAirspace[]): Airspace[] {
        return restAirspaceList.map(restAirspace => RestAirspaceConverter.fromRest(restAirspace));
    }
}
