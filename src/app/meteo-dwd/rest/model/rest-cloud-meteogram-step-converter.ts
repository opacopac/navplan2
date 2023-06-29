import {RestVerticalCloudLevelConverter} from './rest-vertical-cloud-level-converter';
import {IRestCloudMeteogramStep} from './i-rest-cloud-meteogram-step';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';


export class RestCloudMeteogramStepConverter {
    public static fromRestList(cloudMeteogramSteps: IRestCloudMeteogramStep[]): CloudMeteogramStep[] {
        return cloudMeteogramSteps.map(cloudMeteogramStep => this.fromRest(cloudMeteogramStep));
    }


    public static fromRest(cloudMeteogramStep: IRestCloudMeteogramStep): CloudMeteogramStep {
        if (cloudMeteogramStep == null) {
            return undefined;
        }

        return new CloudMeteogramStep(
            cloudMeteogramStep[0],
            RestVerticalCloudLevelConverter.fromRestList(cloudMeteogramStep[1])
        );
    }
}
