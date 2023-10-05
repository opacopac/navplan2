import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';
import {IRestCloudMeteogramStep} from './i-rest-cloud-meteogram-step';


export interface IRestCloudMeteogram {
    elevation: IRestLength;
    steps: IRestCloudMeteogramStep[];
}
