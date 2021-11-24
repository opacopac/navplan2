import {IRestSpeed} from './i-rest-speed';
import {Speed} from '../domain-model/quantities/speed';
import {SpeedUnit} from '../domain-model/quantities/speed-unit';


export class RestSpeedConverter {
    public static fromRest(restSpeed: IRestSpeed): Speed {
        return new Speed(
            restSpeed[0],
            SpeedUnit[restSpeed[1]],
        );
    }


    public static toRest(speed: Speed): IRestSpeed {
        return [
            speed.value,
            SpeedUnit[speed.unit]
        ];
    }
}
