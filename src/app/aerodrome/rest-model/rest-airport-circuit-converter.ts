import {IRestAirportCircuit} from './i-rest-airport-circuit';
import {AirportCircuit} from '../domain-model/airport-circuit';
import {MultiLineString} from '../../common/geo-math/domain-model/geometry/multi-line-string';


export class RestAirportCircuitConverter {
    public static fromRest(restItem: IRestAirportCircuit): AirportCircuit {
        return new AirportCircuit(
            restItem.airportIcao,
            MultiLineString.createFromArray(restItem.line2dlist)
        );
    }


    public static fromRestList(restAdCircuitList: IRestAirportCircuit[]): AirportCircuit[] {
        return restAdCircuitList.map(restAdCircuit => RestAirportCircuitConverter.fromRest(restAdCircuit));
    }
}
