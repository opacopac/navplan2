import {AirportFeature} from '../../aerodrome/domain-model/airport-feature';
import {IRestAirportFeature} from './i-rest-airport-feature';
import {AirportFeatureType} from '../../aerodrome/domain-model/airport-feature-type';


export class RestAirportFeatureConverter {
    public static fromRest(restItem: IRestAirportFeature): AirportFeature {
        return new AirportFeature(
            AirportFeatureType[restItem.type],
            restItem.name
        );
    }
}
