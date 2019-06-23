import {AirportFeature} from '../domain/airport';
import {IRestAirportFeature} from './i-rest-airport-feature';


export class RestAirportFeature {
    public static fromRest(restItem: IRestAirportFeature): AirportFeature {
        return new AirportFeature(
            restItem.type,
            restItem.name
        );
    }
}
