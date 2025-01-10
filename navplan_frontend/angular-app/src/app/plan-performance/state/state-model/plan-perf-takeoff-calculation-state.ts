import {Length} from '../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfTakeoffCalculationState {
    rwyLength: Length;
    rwyWidth: Length;
    tkofLenAvbl: Length;
    ldgLenAvbl: Length;
    tkofDist50ft: Length;
    tkofAbortPoint: Length;
    tkofAbortDist: Length;
    groundRoll: Length;
}
