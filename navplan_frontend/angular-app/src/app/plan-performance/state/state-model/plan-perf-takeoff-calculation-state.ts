import {Length} from '../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfTakeoffCalculationState {
    rwyLength: Length;
    rwyWidth: Length;
    tkofLenAvbl: Length;
    tkofAbortPoint: Length;
    tkofDist50ft: Length;
    groundRoll: Length;
}
