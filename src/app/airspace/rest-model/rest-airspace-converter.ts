import {IRestAirspace} from './i-rest-airspace';
import {Airspace} from '../domain-model/airspace';
import {AltitudeConverter} from '../../common/geo-math/rest-model/altitude-converter';
import {PolygonConverter} from '../../common/geo-math/rest-model/polygon-converter';


export class RestAirspaceConverter {
    public static fromRest(restItem: IRestAirspace): Airspace {
        return new Airspace(
            restItem.id,
            restItem.aip_id,
            restItem.category,
            restItem.country,
            restItem.name,
            AltitudeConverter.fromRest(restItem.alt_bottom),
            AltitudeConverter.fromRest(restItem.alt_top),
            PolygonConverter.fromRest(restItem.polygon)
        );
    }


    public static fromRestList(restAirspaceList: IRestAirspace[]): Airspace[] {
        return restAirspaceList.map(restAirspace => RestAirspaceConverter.fromRest(restAirspace));
    }
}
