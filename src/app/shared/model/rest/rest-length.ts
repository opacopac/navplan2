import {IRestLength} from './i-rest-length';
import {Length} from '../quantities/length';
import {LengthUnit} from '../quantities/units';


export class RestLength {
    public static fromRest(restLength: IRestLength): Length {
        return new Length(
            restLength[0],
            LengthUnit[restLength[1]]
        );
    }
}
