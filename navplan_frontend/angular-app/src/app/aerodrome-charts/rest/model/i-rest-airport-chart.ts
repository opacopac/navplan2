import {IRestExtent2d} from '../../../geo-physics/rest/model/i-rest-extent2d';
import {IRestOriginalFileParameters} from './i-rest-original-file-parameters';
import {IRestChartRegistration} from './i-rest-chart-registration';


export interface IRestAirportChart {
    id: number;
    userId: number;
    airportIcao: string;
    source: string;
    name: string;
    filename: string;
    extent: IRestExtent2d;
    originalFileParameters: IRestOriginalFileParameters;
    chartRegistration: IRestChartRegistration;
}
