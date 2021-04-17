import {IRestAirspace} from './i-rest-airspace';
import {Airspace} from '../domain-model/airspace';
import {AltitudeConverter} from '../../geo-math/rest-model/altitude-converter';
import {PolygonConverter} from '../../geo-math/rest-model/polygon-converter';


export class AirspaceConverter {
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
}
