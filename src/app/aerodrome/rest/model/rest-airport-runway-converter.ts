import {AirportRunway} from '../../domain/model/airport-runway';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';


export class RestAirportRunwayConverter {
    public static fromRest(restItem: IRestAirportRunway): AirportRunway {
        return new AirportRunway(
            restItem.name,
            restItem.surface,
            restItem.length ? RestLengthConverter.fromRest(restItem.length) : undefined,
            restItem.width ? RestLengthConverter.fromRest(restItem.width) : undefined,
            restItem.direction,
            restItem.tora ? RestLengthConverter.fromRest(restItem.tora) : undefined,
            restItem.lda ? RestLengthConverter.fromRest(restItem.lda) : undefined,
            restItem.papi,
        );
    }
}
