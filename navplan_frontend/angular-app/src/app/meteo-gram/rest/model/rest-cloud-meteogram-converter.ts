import {IRestCloudMeteogram} from './i-rest-cloud-meteogram';
import {CloudMeteogram} from '../../domain/model/cloud-meteogram';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {RestCloudMeteogramStepConverter} from './rest-cloud-meteogram-step-converter';


export class RestCloudMeteogramConverter {
    public static fromRest(response: IRestCloudMeteogram): CloudMeteogram {
        return new CloudMeteogram(
            RestLengthConverter.fromRest(response.elevation),
            RestCloudMeteogramStepConverter.fromRestList(response.steps)
        );
    }
}
