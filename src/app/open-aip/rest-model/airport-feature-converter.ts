import {AirportFeature} from '../domain-model/airport-feature';
import {IRestAirportFeature} from './i-rest-airport-feature';


export class AirportFeatureConverter {
    public static fromRest(restItem: IRestAirportFeature): AirportFeature {
        return new AirportFeature(
            restItem.type,
            restItem.name
        );
    }
}
