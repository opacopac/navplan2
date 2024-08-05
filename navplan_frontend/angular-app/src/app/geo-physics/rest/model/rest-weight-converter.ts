import {IRestWeight} from './i-rest-weight';
import {Weight} from '../../domain/model/quantities/weight';
import {WeightUnit} from '../../domain/model/quantities/weight-unit';


export class RestWeightConverter {
    public static fromRest(restWeight: IRestWeight): Weight {
        return restWeight
            ? new Weight(restWeight[0], WeightUnit[restWeight[1]])
            : null;
    }


    public static toRest(weight: Weight): IRestWeight {
        return weight
            ? [weight.value, WeightUnit[weight.unit]]
            : null;
    }
}
