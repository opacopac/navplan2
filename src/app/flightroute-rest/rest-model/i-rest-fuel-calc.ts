import {IRestTime} from '../../common/geo-math/rest-model/i-rest-time';
import {IRestVolume} from '../../common/geo-math/rest-model/i-rest-volume';


export interface IRestFuelCalc {
    triptime: IRestTime;
    alttime: IRestTime;
    restime: IRestTime;
    mintime: IRestTime;
    extratime: IRestTime;
    blocktime: IRestTime;
    tripvol: IRestVolume;
    altvol: IRestVolume;
    resvol: IRestVolume;
    minvol: IRestVolume;
    extravol: IRestVolume;
    blockvol: IRestVolume;
}
