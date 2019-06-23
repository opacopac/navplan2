import {IRestMetarTafProperties} from './i-rest-metar-taf-properties';
import {IRestMetarTafGeometry} from './i-rest-metar-taf-geometry';


export interface IRestMetarTafFeature {
    type: string;
    properties: IRestMetarTafProperties;
    geometry: IRestMetarTafGeometry;
}
