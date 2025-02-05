import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, from, mergeMap, Observable, of, switchMap, toArray} from 'rxjs';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';
import {getCurrentAircraft} from '../../../aircraft/state/ngrx/aircraft.selectors';
import {filter, map, withLatestFrom} from 'rxjs/operators';
import {FlightrouteActions} from '../../../flightroute/state/ngrx/flightroute.actions';
import {PlanPerfActions} from './plan-perf.actions';
import {IAirportService} from '../../../aerodrome/domain/service/i-airport.service';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import {getAirportPerfStates} from './plan-perf.selectors';
import {PlanPerfAirportState} from '../state-model/plan-perf-airport-state';
import {PlanPerfAirportType} from '../state-model/plan-perf-airport-type';
import {PlanPerfWeatherCalculationState} from '../state-model/plan-perf-weather-calculation-state';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {PlanPerfTakeoffCalculationState} from '../state-model/plan-perf-takeoff-calculation-state';
import {AircraftPerformanceService} from '../../../aircraft/domain/service/aircraft-performance.service';
import {DistancePerformanceConditions} from '../../../aircraft/domain/model/distance-performance-conditions';
import {PlanPerfRwyFactorsState} from '../state-model/plan-perf-rwy-factors-state';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {PlanPerfLandingCalculationState} from '../state-model/plan-perf-landing-calculation-state';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {DistancePerformanceTable} from '../../../aircraft/domain/model/distance-performance-table';
import {AirportRunwayService} from '../../../aerodrome/domain/service/airport-runway.service';
import {PlanPerfTakeoffChartState} from '../state-model/plan-perf-takeoff-chart-state';
import {PlanPerfLandingChartState} from '../state-model/plan-perf-landing-chart-state';


@Injectable()
export class PlanPerfEffects {
    private readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    private readonly aircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    private readonly airportPerfState$ = this.appStore.pipe(select(getAirportPerfStates));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: IAirportService,
    ) {
    }


    changeFlightRouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.update),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => [
            {wp: flightroute?.getOriginWaypoint(), type: PlanPerfAirportType.DEPARTURE},
            {wp: flightroute?.getDestinationWaypoint(), type: PlanPerfAirportType.DESTINATION},
            {wp: flightroute?.getAlternateWaypoint(), type: PlanPerfAirportType.ALTERNATE}
        ]),
        mergeMap(waypoints => from(waypoints).pipe(
            filter(waypoint => waypoint.wp != null),
            concatMap(waypoint => this.loadAirportFromDataItem(waypoint.wp).pipe(
                filter(ad => ad != null),
                withLatestFrom(this.aircraft$),
                map(([ad, aircraft]) => this.calcInitialAirportState(ad, waypoint.type, aircraft))
            )),
            toArray(),
            switchMap(adStates => [PlanPerfActions.updateAirports({airportStates: adStates})])
        ))
    ));


    performWeatherCalculationAction$ = createEffect(() => this.actions$.pipe(
        ofType(PlanPerfActions.changeAirportWeatherFactors),
        withLatestFrom(this.airportPerfState$),
        map(([action, adState]) => {
            return PlanPerfActions.updateAirportWeatherCalculation({
                adIndex: action.adIndex,
                weatherCalculation: this.createNewWeatherCalculationState(adState[action.adIndex])
            });
        })
    ));


    performPerformanceCalulationAction$ = createEffect(() => this.actions$.pipe(
        ofType(
            PlanPerfActions.updateAirportWeatherCalculation,
            PlanPerfActions.changeAirportRunwayFactors,
        ),
        withLatestFrom(this.airportPerfState$, this.aircraft$),
        map(([action, adStates, aircraft]) => {
            const adState = adStates[action.adIndex];
            if (adState.type === PlanPerfAirportType.DEPARTURE) {
                return PlanPerfActions.updateAirportTakeoffPerformance({
                    adIndex: action.adIndex,
                    takeoffPerformance: this.createTakeoffPerformanceConditions(adState, aircraft)
                });
            } else {
                return PlanPerfActions.updateAirportLandingPerformance({
                    adIndex: action.adIndex,
                    landingPerformance: this.createLandingPerformanceConditions(adState, aircraft),
                });
            }
        })
    ));


    private loadAirportFromDataItem(waypoint: Waypoint): Observable<Airport> {
        if (waypoint && waypoint.checkpoint) {
            return this.airportService.readAirportByIcao(waypoint.checkpoint); // TODO: load by pos
        } else {
            return of(null);
        }
    }


    private calcInitialAirportState(airport: Airport, type: PlanPerfAirportType, aircraft: Aircraft): PlanPerfAirportState {
        const firstRwy = airport.runways && airport.runways.length > 0 ? airport.runways[0] : null;
        const elev = airport.elevation ? airport.elevation.getHeightAmsl() : Length.ofZero();
        const initialAdState = {
            type: type,
            airport: airport,
            weatherFactors: {
                elevation: elev,
                qnh: AtmosphereService.getStandardPressureAtSeaLevel(),
                oat: AtmosphereService.calcStandardTemperatureAtAltitude(elev)
            },
            weatherCalculation: null,
            runwayFactors: {
                runway: firstRwy,
                isGrassRwy: firstRwy.isGrass(),
                isWetRwy: false,
                rwyWind: Speed.ofZero(),
                touchdownAfterThr: Length.ofM(100),
                use50ftAboveThreshold: false,
                reservePercent: 20
            },
            aircraftPerfProfileIdx: null,
            tkofPerformance: null,
            ldgPerformance: null
        };
        initialAdState.weatherCalculation = this.createNewWeatherCalculationState(initialAdState);

        if (type === PlanPerfAirportType.DEPARTURE && aircraft) {
            initialAdState.tkofPerformance = this.createTakeoffPerformanceConditions(initialAdState, aircraft);
        }

        if (type === PlanPerfAirportType.DESTINATION && aircraft) {
            initialAdState.ldgPerformance = this.createLandingPerformanceConditions(initialAdState, aircraft);
        }

        return initialAdState;
    }


    private createNewWeatherCalculationState(adState: PlanPerfAirportState): PlanPerfWeatherCalculationState {
        const elev = adState.weatherFactors.elevation;
        const qnh = adState.weatherFactors.qnh;
        const oat = adState.weatherFactors.oat;
        const pa = AtmosphereService.calcPressureAltitude(elev, qnh);
        const isaTemp = AtmosphereService.calcStandardTemperatureAtAltitude(elev);
        const da = AtmosphereService.calcDensityAltitude(pa, oat.subtract(isaTemp));

        return {pressureAltitude: pa, densityAltitude: da, isaTemperature: isaTemp};
    }


    private createDistancePerformanceConditions(rwyFactors: PlanPerfRwyFactorsState): DistancePerformanceConditions {
        return new DistancePerformanceConditions(
            rwyFactors.isGrassRwy,
            rwyFactors.isWetRwy,
            rwyFactors.rwyWind,
            rwyFactors.reservePercent
        );
    }


    private createTakeoffPerformanceConditions(adState: PlanPerfAirportState, aircraft: Aircraft): PlanPerfTakeoffCalculationState {
        const rwy = adState.runwayFactors.runway;
        const oppRwy = adState.airport.findOppositeRunway(rwy);
        const [threshold, oppThreshold] = AirportRunwayService.calcThresholdPoints(adState.airport, rwy);
        const tkofGroundRoll = this.calcDistance(aircraft?.perfTakeoffGroundRoll, adState);
        const tkofDist50ft = this.calcDistance(aircraft?.perfTakeoffDist50ft, adState);
        const ldaGroundRoll = this.calcDistance(aircraft?.perfLandingGroundRoll, adState);
        const tkofAbortPoint = (rwy?.length && ldaGroundRoll)
            ? Length.ofM(Math.min(rwy.length.m - ldaGroundRoll.m, rwy.tora.m))
            : null;
        const tkofPerformance = {
            rwy: rwy,
            oppRwy: oppRwy,
            threshold: threshold,
            oppThreshold: oppThreshold,
            groundRoll: tkofGroundRoll,
            tkofDist50ft: tkofDist50ft,
            tkofAbortPoint: tkofAbortPoint,
            tkofAbortDist: ldaGroundRoll,
            tkofChartState: null
        };
        tkofPerformance.tkofChartState = this.createTkofChartState(tkofPerformance);

        return tkofPerformance;
    }


    private createLandingPerformanceConditions(adState: PlanPerfAirportState, aircraft: Aircraft): PlanPerfLandingCalculationState {
        const rwy = adState.runwayFactors.runway;
        const oppRwy = adState.airport.findOppositeRunway(rwy);
        const [threshold, oppThreshold] = AirportRunwayService.calcThresholdPoints(adState.airport, rwy);
        const ldgGroundRoll = this.calcDistance(aircraft?.perfLandingGroundRoll, adState);
        const ldgDist50ft = this.calcDistance(aircraft?.perfLandingDist50ft, adState);
        const ldgPerformance = {
            rwy: rwy,
            oppRwy: oppRwy,
            threshold: threshold,
            oppThreshold: oppThreshold,
            ldgGroundRoll: ldgGroundRoll,
            ldgDist50ft: ldgDist50ft,
            touchdownAfterThr: adState.runwayFactors.use50ftAboveThreshold
                ? ldgDist50ft.subtract(ldgGroundRoll)
                : adState.runwayFactors.touchdownAfterThr,
            ldgChartState: null
        };
        ldgPerformance.ldgChartState = this.createLdgChartState(ldgPerformance);

        return ldgPerformance;
    }


    private calcDistance(perfTable: DistancePerformanceTable, adState: PlanPerfAirportState): Length {
        const distPerfCond = this.createDistancePerformanceConditions(adState.runwayFactors);
        return perfTable ? AircraftPerformanceService.calcDistance(
            adState.weatherFactors.elevation,
            adState.weatherFactors.qnh,
            adState.weatherFactors.oat,
            distPerfCond,
            perfTable
        ) : null;
    }


    private createTkofChartState(tkofPerf: PlanPerfTakeoffCalculationState): PlanPerfTakeoffChartState {
        return {
            tkofGroundRollStart: Length.ofZero(),
            tkofGroundRollEnd: tkofPerf.groundRoll,
            tkofDist50ftStart: Length.ofZero(),
            tkofDist50ftEnd: tkofPerf.tkofDist50ft,
            tkofAbortPointStart: Length.ofZero(),
            tkofAbortPoint: tkofPerf.tkofAbortPoint,
            tkofAbortStop: tkofPerf.tkofAbortPoint.add(tkofPerf.tkofAbortDist),
            toraStart: Length.ofZero(),
            toraEnd: tkofPerf.rwy.tora,
            rwyStart: Length.ofZero(),
            rwyEnd: tkofPerf.rwy.length,
            chartStart: Length.ofZero(),
            chartEnd: Length.ofM(Math.max(tkofPerf.rwy.length.m, tkofPerf.tkofDist50ft.m))
        };
    }


    private createLdgChartState(ldgPerf: PlanPerfLandingCalculationState): PlanPerfLandingChartState {
        const touchDownPoint = ldgPerf.threshold.add(ldgPerf.touchdownAfterThr);
        return {
            ldgGroundRollStart: touchDownPoint,
            ldgGroundRollEnd: touchDownPoint.add(ldgPerf.ldgGroundRoll),
            ldgDist50ftStart: touchDownPoint.add(ldgPerf.ldgGroundRoll).subtract(ldgPerf.ldgDist50ft),
            ldgDist50ftEnd: touchDownPoint.add(ldgPerf.ldgGroundRoll),
            touchdownOffsetStart: ldgPerf.threshold,
            touchdownOffsetEnd: touchDownPoint,
            ldaStart: ldgPerf.threshold,
            ldaEnd: ldgPerf.threshold.add(ldgPerf.rwy.lda),
            rwyStart: Length.ofZero(),
            rwyEnd: ldgPerf.rwy.length,
            chartStart: Length.ofM(Math.min(0, touchDownPoint.add(ldgPerf.ldgGroundRoll).subtract(ldgPerf.ldgDist50ft).m)),
            chartEnd: Length.ofM(Math.max(ldgPerf.rwy.length.m, touchDownPoint.add(ldgPerf.ldgGroundRoll).m))
        };
    }
}
