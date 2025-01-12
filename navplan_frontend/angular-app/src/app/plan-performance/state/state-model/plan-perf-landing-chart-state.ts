import {Length} from '../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfLandingChartState {
    ldgDist50ftStart: Length;
    ldgDist50ftEnd: Length;
    ldgGroundRollStart: Length;
    ldgGroundRollEnd: Length;
    ldaStart: Length;
    ldaEnd: Length;
    rwyStart: Length;
    rwyEnd: Length;
    chartStart: Length;
    chartEnd: Length;
}
