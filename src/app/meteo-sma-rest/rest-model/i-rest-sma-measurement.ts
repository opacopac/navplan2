import {IRestSmaStation} from './i-rest-sma-station';
import {IRestTime} from '../../common/geo-math/rest-model/i-rest-time';


export interface IRestSmaMeasurement {
    station: IRestSmaStation;
    measurement_time: number;
    temp_c: number;
    sun_min: IRestTime;
    precip_mm: number;
    wind_dir: number;
    wind_speed_kmh: number;
    wind_gusts_kmh: number;
    qnh_hpa: number;
    humidity_pc: number;
}
