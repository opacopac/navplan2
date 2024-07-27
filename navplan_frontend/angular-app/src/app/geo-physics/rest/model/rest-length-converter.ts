import {IRestLength} from './i-rest-length';
import {Length} from '../../domain/model/quantities/length';
import {LengthUnit} from '../../domain/model/quantities/length-unit';


export class RestLengthConverter {
    public static fromRest(restLength: IRestLength): Length {
        return restLength
            ? new Length(restLength[0], LengthUnit[restLength[1]])
            : null;
    }


    public static toRest(length: Length): IRestLength {
        return length
            ? [length.value, LengthUnit[length.unit]]
            : null;
    }


    public static fromRestList(restLengthList: IRestLength[]): Length[] {
        return restLengthList.map(restLength => RestLengthConverter.fromRest(restLength));
    }


    public static toRestList(lengthList: Length[]): IRestLength[] {
        return lengthList.map(length => RestLengthConverter.toRest(length));
    }
}
