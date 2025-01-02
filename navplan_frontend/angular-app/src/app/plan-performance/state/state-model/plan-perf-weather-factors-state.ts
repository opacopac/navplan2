import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';

export interface PlanPerfWeatherFactorsState {
    qnh: Pressure;
    oat: Temperature;
}
