import {IRestPosition2d} from '../../shared/model/rest/i-rest-position2d';
import {IRestLength} from '../../shared/model/rest/i-rest-length';
import {IRestAirportChart} from './i-rest-airport-chart';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {IRestAirportRadio} from './i-rest-airport-radio';
import {IRestWebcam} from './i-rest-webcam';
import {IRestAirportFeature} from './i-rest-airport-feature';


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
    mapfeatures: IRestAirportFeature[];
}