import {Pressure} from '../../../geo-physics/domain/model/quantities/pressure';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {Length} from '../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfWeatherFactorsState {
    elevation: Length;
    qnh: Pressure;
    oat: Temperature;
}
