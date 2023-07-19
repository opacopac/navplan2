import {WeatherModelConfig} from './weather-model-config';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';


export class ForecastRun {
    public constructor(
        public startTime: Date,
        public model: WeatherModelConfig
    ) {
    }


    public getName(): string {
        return this.startTime.getUTCFullYear()
            + StringnumberHelper.zeroPad(this.startTime.getUTCMonth() + 1, 2)
            + StringnumberHelper.zeroPad(this.startTime.getUTCDate(), 2)
            + StringnumberHelper.zeroPad(this.startTime.getUTCHours(), 2);
    }


    public getStepDateTime(step: number): Date {
        return new Date(this.startTime.getTime() + step * this.model.stepLength.getValue(TimeUnit.MS));
    }
}
