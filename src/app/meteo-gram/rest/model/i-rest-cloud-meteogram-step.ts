import {IRestVerticalCloudLevel} from '../../../meteo-dwd/rest/model/i-rest-vertical-cloud-level';
import {IRestTemperature} from '../../../geo-physics/rest/model/i-rest-temperature';


export interface IRestCloudMeteogramStep {
    step: number;
    cloudLevels: IRestVerticalCloudLevel[];
    precipMmPerHour: number;
    temperature: IRestTemperature;
}
