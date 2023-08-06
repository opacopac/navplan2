import {IRestVerticalCloudLevel} from '../../../meteo-dwd/rest/model/i-rest-vertical-cloud-level';


export interface IRestCloudMeteogramStep {
    step: number;
    cloudLevels: IRestVerticalCloudLevel[];
    precipMmPerHour: number;
}
