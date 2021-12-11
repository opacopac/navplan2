import {AirportRunway} from '../../aerodrome/domain-model/airport-runway';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {RestLengthConverter} from '../../geo-physics-rest/rest-model/rest-length-converter';


export class RestAirportRunwayConverter {
    public static fromRest(restItem: IRestAirportRunway): AirportRunway {
        return new AirportRunway(
            restItem.name,
            restItem.surface,
            restItem.length ? RestLengthConverter.fromRest(restItem.length) : undefined,
            restItem.width ? RestLengthConverter.fromRest(restItem.width) : undefined,
            restItem.direction1,
            restItem.direction2,
            restItem.tora1 ? RestLengthConverter.fromRest(restItem.tora1) : undefined,
            restItem.tora2 ? RestLengthConverter.fromRest(restItem.tora2) : undefined,
            restItem.lda1 ? RestLengthConverter.fromRest(restItem.lda1) : undefined,
            restItem.lda2 ? RestLengthConverter.fromRest(restItem.lda2) : undefined,
            restItem.papi1,
            restItem.papi2);
    }
}
