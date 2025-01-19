import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';
import {Length} from '../../../geo-physics/domain/model/quantities/length';

export interface PlanPerfRwyFactorsState {
    runway: AirportRunway;
    isGrassRwy: boolean;
    isWetRwy: boolean;
    rwyWind: Speed;
    touchdownAfterThr: Length;
    use50ftAboveThreshold: boolean;
    reservePercent: number;
}
