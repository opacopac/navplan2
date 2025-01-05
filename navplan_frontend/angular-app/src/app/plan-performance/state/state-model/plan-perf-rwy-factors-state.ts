import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';

export interface PlanPerfRwyFactorsState {
    runway: AirportRunway;
    isGrassRwy: boolean;
    isWetRwy: boolean;
    rwySlopePercent: number;
    rwyWind: Speed;
    reservePercent: number;
}
