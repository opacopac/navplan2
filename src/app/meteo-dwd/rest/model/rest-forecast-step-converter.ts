import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';


export class RestForecastStepConverter {
    public static toRest(step: number): string {
        return StringnumberHelper.zeroPad(step, 3);
    }
}
