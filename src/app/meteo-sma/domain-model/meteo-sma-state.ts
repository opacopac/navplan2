import {SmaMeasurement} from './sma-measurement';
import {MeteoSmaButtonStatus} from './meteo-sma-button-status';


export interface MeteoSmaState {
    buttonStatus: MeteoSmaButtonStatus;
    smaMeasurements: SmaMeasurement[];
}
