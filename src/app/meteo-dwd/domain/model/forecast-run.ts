import {WeatherModelConfig} from './weather-model-config';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';


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
}
