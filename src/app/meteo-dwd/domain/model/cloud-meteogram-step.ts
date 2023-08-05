import {VerticalCloudLevel} from './vertical-cloud-level';


export class CloudMeteogramStep {
    public constructor(
        public forecastStep: number,
        public cloudLevels: VerticalCloudLevel[],
        public precipMmPerHour: number
    ) {
    }
}
