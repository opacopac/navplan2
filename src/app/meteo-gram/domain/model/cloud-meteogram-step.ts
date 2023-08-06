import {VerticalCloudLevel} from '../../../meteo-dwd/domain/model/vertical-cloud-level';


export class CloudMeteogramStep {
    public constructor(
        public forecastStep: number,
        public cloudLevels: VerticalCloudLevel[],
        public precipMmPerHour: number
    ) {
    }
}
