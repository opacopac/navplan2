import {RestVerticalCloudLevelConverter} from '../../../meteo-dwd/rest/model/rest-vertical-cloud-level-converter';
import {IRestCloudMeteogramStep} from './i-rest-cloud-meteogram-step';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {RestTemperatureConverter} from '../../../geo-physics/rest/model/rest-temperature-converter';
import {RestPrecipitationConverter} from '../../../geo-physics/rest/model/rest-precipitation-converter';


export class RestCloudMeteogramStepConverter {
    public static fromRestList(cloudMeteogramSteps: IRestCloudMeteogramStep[]): CloudMeteogramStep[] {
        return cloudMeteogramSteps.map(cloudMeteogramStep => this.fromRest(cloudMeteogramStep));
    }


    public static fromRest(cloudMeteogramStep: IRestCloudMeteogramStep): CloudMeteogramStep {
        if (cloudMeteogramStep == null) {
            return undefined;
        }

        return new CloudMeteogramStep(
            cloudMeteogramStep.step,
            RestVerticalCloudLevelConverter.fromRestList(cloudMeteogramStep.cloudLevels),
            RestPrecipitationConverter.fromRest(cloudMeteogramStep.precip),
            RestTemperatureConverter.fromRest(cloudMeteogramStep.temp)
        );
    }
}
