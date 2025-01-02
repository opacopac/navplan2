import {Length} from '../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfLandingCalculationState {
    rwyLength: Length;
    rwyWidth: Length;
    ldgLenAvbl: Length;
    ldgDist50ft: Length;
    ldgGroundRoll: Length;
}
