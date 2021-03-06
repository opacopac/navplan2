import {IRestPosition2d} from '../../common/geo-math/rest-model/i-rest-position2d';
import {IRestLength} from '../../common/geo-math/rest-model/i-rest-length';
import {IRestAirportRunway} from './i-rest-airport-runway';
import {IRestAirportRadio} from './i-rest-airport-radio';
import {IRestWebcam} from '../../webcam/rest-model/i-rest-webcam';
import {IRestAirportFeature} from './i-rest-airport-feature';
import {IRestAirportChart} from './i-rest-airport-chart';


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
