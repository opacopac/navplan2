import {IRestCircuit} from './i-rest-circuit';
import {Circuit} from '../domain-model/circuit';
import {MultiLineString} from '../../common/geo-math/domain-model/geometry/multi-line-string';


export class CircuitConverter {
    public static fromRest(restItem: IRestCircuit): Circuit {
        return new Circuit(
            restItem.airportIcao,
            MultiLineString.createFromArray(restItem.line2dlist)
        );
    }
}
