import {IRestSmaMeasurement} from './i-rest-sma-measurement';
import {SmaMeasurement} from '../../domain/model/sma-measurement';
import {RestSmaStationConverter} from './rest-sma-station-converter';
import {Timestamp} from '../../../geo-physics/domain/model/quantities/timestamp';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';
import {AngleUnit} from '../../../geo-physics/domain/model/quantities/angle-unit';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../geo-physics/domain/model/quantities/speed-unit';
import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {PressureUnit} from '../../../geo-physics/domain/model/quantities/pressure-unit';
import {RestTimeConverter} from '../../../geo-physics/rest/model/rest-time-converter';


export class RestSmaMeasurementConverter {
    public static fromRest(restSmaMeasurement: IRestSmaMeasurement): SmaMeasurement {
        return new SmaMeasurement(
            RestSmaStationConverter.fromRest(restSmaMeasurement.station),
            restSmaMeasurement.measurement_time ? Timestamp.fromEpochSec(restSmaMeasurement.measurement_time) : undefined,
            restSmaMeasurement.temp_c ? new Temperature(restSmaMeasurement.temp_c, TemperatureUnit.C) : undefined,
            restSmaMeasurement.sun_min ? RestTimeConverter.fromRest(restSmaMeasurement.sun_min) : undefined,
            restSmaMeasurement.precip_mm,
            restSmaMeasurement.wind_dir ? new Angle(restSmaMeasurement.wind_dir, AngleUnit.DEG) : undefined,
            restSmaMeasurement.wind_speed_kmh ? new Speed(restSmaMeasurement.wind_speed_kmh, SpeedUnit.KMH) : undefined,
            restSmaMeasurement.wind_gusts_kmh ? new Speed(restSmaMeasurement.wind_gusts_kmh, SpeedUnit.KMH) : undefined,
            restSmaMeasurement.qnh_hpa ? new Pressure(restSmaMeasurement.qnh_hpa, PressureUnit.HPA) : undefined,
            restSmaMeasurement.humidity_pc
        );
    }


    public static fromRestList(restSmaMeasurementList: IRestSmaMeasurement[]): SmaMeasurement[] {
        return restSmaMeasurementList.map(smaMeas => this.fromRest(smaMeas));
    }
}
