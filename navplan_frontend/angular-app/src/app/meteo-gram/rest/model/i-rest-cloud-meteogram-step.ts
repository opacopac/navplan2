import {IRestVerticalCloudLevel} from '../../../meteo-dwd/rest/model/i-rest-vertical-cloud-level';
import {IRestTemperature} from '../../../geo-physics/rest/model/i-rest-temperature';
import {IRestPrecipitation} from '../../../geo-physics/rest/model/i-rest-precipitation';


export interface IRestCloudMeteogramStep {
    step: number;
    cloudLevels: IRestVerticalCloudLevel[];
    precip: IRestPrecipitation;
    temp: IRestTemperature;
}
