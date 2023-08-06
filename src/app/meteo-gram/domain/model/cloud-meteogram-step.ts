import {VerticalCloudLevel} from '../../../meteo-dwd/domain/model/vertical-cloud-level';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';


export class CloudMeteogramStep {
    public constructor(
        public forecastStep: number,
        public cloudLevels: VerticalCloudLevel[],
        public precipMmPerHour: number,
        public temperature: Temperature
    ) {
    }
}
