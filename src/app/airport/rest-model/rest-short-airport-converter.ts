import {Position2dConverter} from '../../common/geo-math/rest-model/position2d-converter';
import {AirportType} from '../domain-model/airport-type';
import {IRestShortAirport} from './i-rest-short-airport';
import {ShortAirport} from '../domain-model/short-airport';


export class RestShortAirportConverter {
    public static fromRest(restItem: IRestShortAirport): ShortAirport {
        return new ShortAirport(
            restItem.id,
            AirportType[restItem.type],
            restItem.icao,
            Position2dConverter.fromRest(restItem.pos),
            restItem.rwy1dir,
            restItem.rwy1sfc,
            restItem.features
        );
    }


    public static fromRestList(restAdList: IRestShortAirport[]): ShortAirport[] {
        return restAdList.map(restAd => RestShortAirportConverter.fromRest(restAd));
    }
}
