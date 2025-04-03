import {Length} from '../../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfTakeoffChartState {
    tkofGroundRollStart: Length;
    tkofGroundRollEnd: Length;
    tkofDist50ftStart: Length;
    tkofDist50ftEnd: Length;
    tkofAbortPointStart: Length;
    tkofAbortPoint: Length;
    tkofAbortStop: Length;
    toraStart: Length;
    toraEnd: Length;
    rwyStart: Length;
    rwyEnd: Length;
    chartStart: Length;
    chartEnd: Length;
}
