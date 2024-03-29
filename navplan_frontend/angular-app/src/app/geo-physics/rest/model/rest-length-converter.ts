import {IRestLength} from './i-rest-length';
import {Length} from '../../domain/model/quantities/length';
import {LengthUnit} from '../../domain/model/quantities/length-unit';


export class RestLengthConverter {
    public static fromRest(restLength: IRestLength): Length {
        return new Length(
            restLength[0],
            LengthUnit[restLength[1]],
        );
    }
}
