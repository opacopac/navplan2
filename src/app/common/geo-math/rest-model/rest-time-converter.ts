import {IRestTime} from './i-rest-time';
import {Time} from '../domain-model/quantities/time';
import {TimeUnit} from '../domain-model/quantities/time-unit';


export class RestTimeConverter {
    public static fromRest(restTime: IRestTime): Time {
        return new Time(
            restTime[0],
            TimeUnit[restTime[1]],
        );
    }
}
