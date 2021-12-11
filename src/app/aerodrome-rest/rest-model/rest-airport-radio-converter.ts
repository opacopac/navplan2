import {AirportRadio} from '../../aerodrome/domain-model/airport-radio';
import {IRestAirportRadio} from './i-rest-airport-radio';


export class RestAirportRadioConverter {
    public static fromRest(restItem: IRestAirportRadio): AirportRadio {
        return new AirportRadio(
            restItem.category,
            restItem.frequency,
            restItem.type,
            restItem.typespec,
            restItem.description
        );
    }
}
