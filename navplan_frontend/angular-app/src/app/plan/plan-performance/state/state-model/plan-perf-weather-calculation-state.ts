import {Temperature} from '../../../../geo-physics/domain/model/quantities/temperature';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfWeatherCalculationState {
    pressureAltitude: Length;
    densityAltitude: Length;
    isaTemperature: Temperature;
}
