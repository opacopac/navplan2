import {AirportRunway} from '../domain/airport-runway';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {RestLength} from '../../shared/model/rest/rest-length';


export class RestAirportRunway {
    public static fromRest(restItem: IRestAirportRunway): AirportRunway {
        return new AirportRunway(
            restItem.name,
            restItem.surface,
            restItem.length ? RestLength.fromRest(restItem.length) : undefined,
            restItem.width ? RestLength.fromRest(restItem.width) : undefined,
            restItem.direction1,
            restItem.direction2,
            restItem.tora1 ? RestLength.fromRest(restItem.tora1) : undefined,
            restItem.tora2 ? RestLength.fromRest(restItem.tora2) : undefined,
            restItem.lda1 ? RestLength.fromRest(restItem.lda1) : undefined,
            restItem.lda2 ? RestLength.fromRest(restItem.lda2) : undefined,
            restItem.papi1,
            restItem.papi2);
    }
}
