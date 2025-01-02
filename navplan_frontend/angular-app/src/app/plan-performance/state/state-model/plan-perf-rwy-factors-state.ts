import {Speed} from '../../../geo-physics/domain/model/quantities/speed';

export interface PlanPerfRwyFactorsState {
    isGrassRwy: boolean;
    isWetRwy: boolean;
    rwySlopePercent: number;
    rwyWind: Speed;
    reservePercent: number;
}
