import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {IRestAirportRadio} from './i-rest-airport-radio';
import {IRestWebcam} from '../../../webcam/rest/model/i-rest-webcam';
import {IRestAirportFeature} from './i-rest-airport-feature';
import {IRestAirportChart} from '../../../aerodrome-charts/rest/model/i-rest-airport-chart';
import {IRestAltitude} from '../../../geo-physics/rest/model/i-rest-altitude';


export interface IRestAirport {
    id: number;
    type: string;
    name: string;
    icao: string;
    country: string;
    pos: IRestPosition2d;
    elevation: IRestAltitude;
    runways: IRestAirportRunway[];
    radios: IRestAirportRadio[];
    webcams: IRestWebcam[];
    charts: IRestAirportChart[];
    mapfeatures: IRestAirportFeature[];
}
