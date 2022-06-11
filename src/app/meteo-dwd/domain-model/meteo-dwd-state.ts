import {MeteoDwdButtonStatus} from './meteo-dwd-button-status';
import {ValueGrid} from './value-grid';
import {WindSpeedDir} from './wind-speed-dir';


export interface MeteoDwdState {
    buttonStatus: MeteoDwdButtonStatus;
    selectedInterval: number;
    windGrid: ValueGrid<WindSpeedDir>;
}
