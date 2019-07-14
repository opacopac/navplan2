import {AirportRadio} from '../domain/airport-radio';
import {IRestAirportRadio} from './i-rest-airport-radio';


export class RestMapperAirportRadio {
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
