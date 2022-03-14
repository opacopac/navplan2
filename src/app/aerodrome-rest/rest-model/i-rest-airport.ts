import {IRestPosition2d} from '../../geo-physics-rest/rest-model/i-rest-position2d';
import {IRestLength} from '../../geo-physics-rest/rest-model/i-rest-length';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {IRestAirportRadio} from './i-rest-airport-radio';
import {IRestWebcam} from '../../webcam-rest/rest-model/i-rest-webcam';
import {IRestAirportFeature} from './i-rest-airport-feature';
import {IRestAirportChart} from './i-rest-airport-chart';
import {IRestAirportChart2} from './i-rest-airport-chart2';


export interface IRestAirport {
    id: number;
    type: string;
    name: string;
    icao: string;
    country: string;
    pos: IRestPosition2d;
    elevation: IRestLength;
    runways: IRestAirportRunway[];
    radios: IRestAirportRadio[];
    webcams: IRestWebcam[];
    charts: IRestAirportChart[];
    charts2: IRestAirportChart2[];
    mapfeatures: IRestAirportFeature[];
}
