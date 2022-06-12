import {IRestAngle} from './i-rest-angle';
import {Angle} from '../../domain/model/quantities/angle';
import {AngleUnit} from '../../domain/model/quantities/angle-unit';


export class RestAngleConverter {
    public static fromRest(restAngle: IRestAngle): Angle {
        return new Angle(
            restAngle[0],
            AngleUnit[restAngle[1]],
        );
    }


    public static toRest(angle: Angle): IRestAngle {
        return [
            angle.value,
            AngleUnit[angle.unit]
        ];
    }
}
