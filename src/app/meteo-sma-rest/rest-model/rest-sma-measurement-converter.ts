import {IRestSmaMeasurement} from './i-rest-sma-measurement';
import {SmaMeasurement} from '../../meteo-sma/domain-model/sma-measurement';
import {RestSmaStationConverter} from './rest-sma-station-converter';
import {Timestamp} from '../../common/geo-math/domain-model/quantities/timestamp';
import {Temperature} from '../../common/geo-math/domain-model/quantities/temperature';
import {TemperatureUnit} from '../../common/geo-math/domain-model/quantities/temperature-unit';
import {AngleUnit} from '../../common/geo-math/domain-model/quantities/angle-unit';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {Speed} from '../../common/geo-math/domain-model/quantities/speed';
import {SpeedUnit} from '../../common/geo-math/domain-model/quantities/speed-unit';
import {Pressure} from '../../common/geo-math/domain-model/quantities/pressure';
import {PressureUnit} from '../../common/geo-math/domain-model/quantities/pressure-unit';
import {RestTimeConverter} from '../../common/geo-math/rest-model/rest-time-converter';


export class RestSmaMeasurementConverter {
    public static fromRest(restSmaMeasurement: IRestSmaMeasurement): SmaMeasurement {
        return new SmaMeasurement(
            RestSmaStationConverter.fromRest(restSmaMeasurement.station),
            restSmaMeasurement.measurement_time ? Timestamp.createFromSec(restSmaMeasurement.measurement_time) : undefined,
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