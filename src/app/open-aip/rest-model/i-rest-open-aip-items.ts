import {IRestNavaid} from './i-rest-navaid';
import {IRestAirspace} from './i-rest-airspace';
import {IRestReportingpoint} from './i-rest-reportingpoint';
import {IRestUserpoint} from './i-rest-userpoint';
import {IRestWebcam} from './i-rest-webcam';
import {IRestAirport} from './i-rest-airport';
import {IRestCircuit} from '../../circuits/rest-model/i-rest-circuit';


export interface IRestOpenAipItems {
    navaids: IRestNavaid[];
    airports: IRestAirport[];
    airspaces: IRestAirspace[];
    reportingpoints: IRestReportingpoint[];
    userpoints: IRestUserpoint[];
    webcams: IRestWebcam[];
    circuits: IRestCircuit[];
}
