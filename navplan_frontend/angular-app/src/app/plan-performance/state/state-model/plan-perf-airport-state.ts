export interface PlanPerfAirportState {
    runway: string;
    qnh: number;
    oat: number;
    isGrassRwy: boolean;
    isWetRwy: boolean;
    rwySlope: number;
    rwyWind: number;
    reservePercent: number;
    aircraftPerfProfileIdx: number;
}
