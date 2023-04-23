import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';


export class RestForecastStepConverter {
    public static toRest(step: number): string {
        if (!step) {
            return null;
        }

        return StringnumberHelper.zeroPad(step, 3);
    }


    public static fromRest(restStep: string): number {
        if (!restStep) {
            return null;
        }

        return Number.parseInt(restStep, 10);
    }
}
