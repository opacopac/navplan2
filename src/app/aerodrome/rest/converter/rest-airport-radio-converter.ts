import {AirportRadio} from '../../domain/model/airport-radio';
import {IRestAirportRadio} from '../model/i-rest-airport-radio';
import {RestFrequencyConverter} from '../../../geo-physics/rest/model/rest-frequency-converter';


export class RestAirportRadioConverter {
    public static fromRest(restItem: IRestAirportRadio): AirportRadio {
        return new AirportRadio(
            restItem.type,
            restItem.category,
            restItem.name,
            RestFrequencyConverter.fromRest(restItem.frequency),
        );
    }
}
