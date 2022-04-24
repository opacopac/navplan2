import {MeteoDwdButtonStatus} from './meteo-dwd-button-status';


export interface MeteoDwdState {
    buttonStatus: MeteoDwdButtonStatus;
    selectedInterval: number;
}
