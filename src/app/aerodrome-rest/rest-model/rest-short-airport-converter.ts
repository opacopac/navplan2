import {Position2dConverter} from '../../geo-physics-rest/rest-model/position2d-converter';
import {AirportType} from '../../aerodrome/domain-model/airport-type';
import {IRestShortAirport} from './i-rest-short-airport';
import {ShortAirport} from '../../aerodrome/domain-model/short-airport';
import {AirportFeatureType} from '../../aerodrome/domain-model/airport-feature-type';


export class RestShortAirportConverter {
    public static fromRest(restItem: IRestShortAirport): ShortAirport {
        return new ShortAirport(
            restItem.id,
            AirportType[restItem.type],
            restItem.icao,
            Position2dConverter.fromRest(restItem.pos),
            restItem.rwy1dir,
            restItem.rwy1sfc,
            restItem.features.map(featureType => AirportFeatureType[featureType])
        );
    }


    public static fromRestList(restAdList: IRestShortAirport[]): ShortAirport[] {
        return restAdList.map(restAd => RestShortAirportConverter.fromRest(restAd));
    }
}
