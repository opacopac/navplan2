import {AirportRunway} from '../domain-model/airport-runway';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {LengthConverter} from '../../common/geo-math/rest-model/length-converter';


export class AirportRunwayConverter {
    public static fromRest(restItem: IRestAirportRunway): AirportRunway {
        return new AirportRunway(
            restItem.name,
            restItem.surface,
            restItem.length ? LengthConverter.fromRest(restItem.length) : undefined,
            restItem.width ? LengthConverter.fromRest(restItem.width) : undefined,
            restItem.direction1,
            restItem.direction2,
            restItem.tora1 ? LengthConverter.fromRest(restItem.tora1) : undefined,
            restItem.tora2 ? LengthConverter.fromRest(restItem.tora2) : undefined,
            restItem.lda1 ? LengthConverter.fromRest(restItem.lda1) : undefined,
            restItem.lda2 ? LengthConverter.fromRest(restItem.lda2) : undefined,
            restItem.papi1,
            restItem.papi2);
    }
}
