import {IRestSpeed} from './i-rest-speed';
import {Speed} from '../../domain/model/quantities/speed';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';


export class RestSpeedConverter {
    public static fromRest(restSpeed: IRestSpeed): Speed {
        return restSpeed
            ? new Speed(restSpeed[0], SpeedUnit[restSpeed[1]])
            : null;
    }


    public static toRest(speed: Speed): IRestSpeed {
        return speed
            ? [speed.value, SpeedUnit[speed.unit]]
            : null;
    }
}
