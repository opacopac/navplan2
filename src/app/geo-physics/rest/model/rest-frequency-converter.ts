import {IRestFrequency} from './i-rest-frequency';
import {Frequency} from '../../domain/model/quantities/frequency';
import {FrequencyUnit} from '../../domain/model/quantities/frequency-unit';


export class RestFrequencyConverter {
    public static fromRest(restFrequency: IRestFrequency): Frequency {
        return new Frequency(
            restFrequency[0],
            FrequencyUnit[restFrequency[1]],
        );
    }
}
