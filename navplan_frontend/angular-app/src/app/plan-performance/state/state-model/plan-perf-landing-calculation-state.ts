import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';

export interface PlanPerfLandingCalculationState {
    rwy: AirportRunway;
    threshold: Length;
    oppThreshold: Length;
    ldgDist50ft: Length;
    ldgGroundRoll: Length;
}
