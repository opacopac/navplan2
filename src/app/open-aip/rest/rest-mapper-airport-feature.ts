import {AirportFeature} from '../domain/airport-feature';
import {IRestAirportFeature} from './i-rest-airport-feature';


export class RestMapperAirportFeature {
    public static fromRest(restItem: IRestAirportFeature): AirportFeature {
        return new AirportFeature(
            restItem.type,
            restItem.name
        );
    }
}
