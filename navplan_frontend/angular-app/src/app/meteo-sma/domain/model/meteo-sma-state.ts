import {SmaMeasurement} from './sma-measurement';
import {MeteoSmaStatus} from './meteo-sma-status';


export interface MeteoSmaState {
    status: MeteoSmaStatus;
    zoom: number;
    smaMeasurements: SmaMeasurement[];
}
