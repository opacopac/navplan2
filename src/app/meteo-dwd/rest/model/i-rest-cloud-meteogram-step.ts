import {IRestVerticalCloudLevel} from './i-rest-vertical-cloud-level';


export interface IRestCloudMeteogramStep {
    step: number;
    cloudLevels: IRestVerticalCloudLevel[];
    precipMmPerHour: number;
}
