import {VerticalCloudLevel} from '../../../meteo-forecast/domain/model/vertical-cloud-level';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {Precipitation} from '../../../geo-physics/domain/model/quantities/precipitation';


export class CloudMeteogramStep {
    public constructor(
        public forecastStep: number,
        public cloudLevels: VerticalCloudLevel[],
        public precip: Precipitation,
        public temp: Temperature
    ) {
    }
}
