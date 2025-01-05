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
        ofType(FlightrouteActions.update, FlightrouteActions.clear),
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
                map(ad => this.calcInitialAirportState(ad, waypoint.type))
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


    private calcInitialAirportState(airport: Airport, type: PlanPerfAirportType): PlanPerfAirportState {
        const firstRwy = airport.runways && airport.runways.length > 0 ? airport.runways[0] : null;
        const elev = airport.elevation ? airport.elevation.getHeightAmsl() : Length.ofZero();
        const initialAdState = {
            type: type,
            airport: airport,
            runway: firstRwy,
            weatherFactors: {
                qnh: AtmosphereService.getStandardPressureAtSeaLevel(),
                oat: AtmosphereService.calcStandardTemperatureAtAltitude(elev)
            },
            weatherCalculation: null,
            runwayFactors: {
                isGrassRwy: false,
                isWetRwy: false,
                rwySlopePercent: 0,
                rwyWind: Speed.ofZero(),
                reservePercent: 0
            },
            aircraftPerfProfileIdx: null,
            tkofPerformance: null,
            ldaPerformance: null
        };
        initialAdState.weatherCalculation = this.createNewWeatherCalculationState(initialAdState);

        return initialAdState;
    }


    private createNewWeatherCalculationState(adState: PlanPerfAirportState): PlanPerfWeatherCalculationState {
        const elev = adState.airport.elevation ? adState.airport.elevation.getHeightAmsl() : Length.ofZero();
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
            rwyFactors.rwySlopePercent,
            rwyFactors.rwyWind,
        );
    }


    private createTakeoffPerformanceConditions(adState: PlanPerfAirportState, aircraft: Aircraft): PlanPerfTakeoffCalculationState {
        const distPerfCond = this.createDistancePerformanceConditions(adState.runwayFactors);
        const elev = adState.airport.elevation ? adState.airport.elevation.getHeightAmsl() : Length.ofZero();
        const rwy = adState.runway;
        return {
            rwyLength: rwy?.length,
            rwyWidth: rwy?.width,
            tkofLenAvbl: rwy?.tora,
            groundRoll: aircraft?.perfTakeoffGroundRoll ? AircraftPerformanceService.calcDistance(
                elev,
                adState.weatherFactors.qnh,
                adState.weatherFactors.oat,
                distPerfCond,
                aircraft.perfTakeoffGroundRoll
            ) : null,
            tkofDist50ft: aircraft?.perfTakeoffDist50ft ? AircraftPerformanceService.calcDistance(
                elev,
                adState.weatherFactors.qnh,
                adState.weatherFactors.oat,
                distPerfCond,
                aircraft.perfTakeoffDist50ft
            ) : null,
            tkofAbortPoint: null
        };
    }


    private createLandingPerformanceConditions(adState: PlanPerfAirportState, aircraft: Aircraft): PlanPerfLandingCalculationState {
        const distPerfCond = this.createDistancePerformanceConditions(adState.runwayFactors);
        const elev = adState.airport.elevation ? adState.airport.elevation.getHeightAmsl() : Length.ofZero();
        const rwy = adState.runway;
        return {
            rwyLength: rwy?.length,
            rwyWidth: rwy?.width,
            ldgLenAvbl: rwy?.lda,
            ldgGroundRoll: aircraft?.perfLandingGroundRoll ? AircraftPerformanceService.calcDistance(
                adState.airport.elevation.getHeightAmsl(),
                adState.weatherFactors.qnh,
                adState.weatherFactors.oat,
                distPerfCond,
                aircraft.perfLandingGroundRoll
            ) : null,
            ldgDist50ft: aircraft?.perfLandingDist50ft ? AircraftPerformanceService.calcDistance(
                adState.airport.elevation.getHeightAmsl(),
                adState.weatherFactors.qnh,
                adState.weatherFactors.oat,
                distPerfCond,
                aircraft.perfLandingDist50ft
            ) : null
        };
    }
}
