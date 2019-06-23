import {IRestMetarTafFeature} from './i-rest-metar-taf-feature';


export interface IRestMetarTafResponse {
    type: string;
    features: IRestMetarTafFeature[];
}
