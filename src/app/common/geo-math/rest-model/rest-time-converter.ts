import {IRestTime} from './i-rest-time';
import {Time} from '../domain-model/quantities/time';
import {TimeUnit} from '../domain-model/quantities/time-unit';


export class RestTimeConverter {
    public static fromRest(restTime: IRestTime): Time {
        return restTime ? new Time(
            restTime[0],
            TimeUnit[restTime[1]],
        ) : undefined;
    }


    public static toRest(time: Time): IRestTime {
        return time ? [
            time.value,
            TimeUnit[time.unit]
        ] : undefined;
    }
}
