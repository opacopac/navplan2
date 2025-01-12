import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';

export interface PlanPerfTakeoffCalculationState {
    rwy: AirportRunway;
    oppRwy: AirportRunway;
    threshold: Length;
    oppThreshold: Length;
    tkofDist50ft: Length;
    tkofAbortPoint: Length;
    tkofAbortDist: Length;
    groundRoll: Length;
}
