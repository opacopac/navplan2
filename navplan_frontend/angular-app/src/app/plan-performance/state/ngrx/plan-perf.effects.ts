import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {from, mergeMap, Observable, of, switchMap, toArray} from 'rxjs';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';
import {getCurrentAircraft} from '../../../aircraft/state/ngrx/aircraft.selectors';
import {filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {FlightrouteActions} from '../../../flightroute/state/ngrx/flightroute.actions';
import {PlanPerfActions} from './plan-perf.actions';
import {IAirportService} from '../../../aerodrome/domain/service/i-airport.service';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import {getAirportPerfStates} from './plan-perf.selectors';
import {PlanPerfAirportState} from '../state-model/plan-perf-airport-state';
import {PlanPerfWeatherFactorsState} from '../state-model/plan-perf-weather-factors-state';
import {PlanPerfAirportType} from '../state-model/plan-perf-airport-type';
import {initialRunwayFactors, initialWeatherFactors} from './plan-perf.reducer';
import {PlanPerfRwyFactorsState} from '../state-model/plan-perf-rwy-factors-state';


@Injectable()
export class PlanPerfEffects {
    private readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    private readonly aircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    private readonly airportPerfState$ = this.appStore.pipe(select(getAirportPerfStates));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: IAirportService
    ) {
    }


    changeFlightRouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.update, FlightrouteActions.clear),
        withLatestFrom(this.flightroute$),
        map(([action, flightroute]) => [
            { wp: flightroute?.getOriginWaypoint(), type: PlanPerfAirportType.DEPARTURE },
            { wp: flightroute?.getDestinationWaypoint(), type: PlanPerfAirportType.DESTINATION },
            { wp: flightroute?.getAlternateWaypoint(), type: PlanPerfAirportType.ALTERNATE }
        ]),
        mergeMap(waypoints => from(waypoints).pipe(
            filter(waypoint => waypoint.wp != null),
            mergeMap(waypoint => this.loadAirportFromDataItem(waypoint.wp).pipe(
                map(ad => this.calcInitialAirportState(ad, waypoint.type))
            )),
            tap(wp => console.log('MEEP')),
            toArray(),
            switchMap(adStates => [PlanPerfActions.setAirports({ airportStates: adStates })])
        ))
    ));


    recalcWeatherFactorsAction$ = createEffect(() => this.actions$.pipe(
        ofType(PlanPerfActions.changeAirportWeatherFactors),
        withLatestFrom(this.airportPerfState$),
        map(([action, adState]) => {
            return PlanPerfActions.changeAirportWeatherFactorsSuccess({
                adIndex: action.adIndex,
                weatherFactors: this.calcNewWeatherFactorState(adState[action.adIndex])
            });
        })
    ));


    recalcRunwayFactorsAction$ = createEffect(() => this.actions$.pipe(
        ofType(PlanPerfActions.changeAirportRunwayFactors),
        withLatestFrom(this.airportPerfState$),
        map(([action, adState]) => {
            return PlanPerfActions.changeAirportRunwayFactorsSuccess({
                adIndex: action.adIndex,
                runwayFactors: this.calcNewRunwayFactorState(adState[action.adIndex])
            });
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
        const initialAdState = {
            type: type,
            airport: airport,
            runway: airport.runways.length > 0 ? airport.runways[0] : null,
            weatherFactors: initialWeatherFactors,
            runwayFactors: initialRunwayFactors,
            aircraftPerfProfileIdx: null,
            tkofPerformance: null,
            ldaPerformance: null
        };

        initialAdState.weatherFactors = this.calcNewWeatherFactorState(initialAdState);

        return initialAdState;
    }


    private calcNewWeatherFactorState(adState: PlanPerfAirportState): PlanPerfWeatherFactorsState {
        const elev = adState.airport.elevation.getHeightAmsl();
        const qnh = adState.weatherFactors.qnh;
        const oat = adState.weatherFactors.oat;
        const pa = AtmosphereService.calcPressureAltitude(elev, qnh);
        const isaTemp = AtmosphereService.calcStandardTemperatureAtAltitude(elev);
        const da = AtmosphereService.calcDensityAltitude(pa, oat.subtract(isaTemp));

        return {...adState.weatherFactors, pressureAltitude: pa, densityAltitude: da, isaTemperature: isaTemp};
    }


    private calcNewRunwayFactorState(adState: PlanPerfAirportState): PlanPerfRwyFactorsState {
        return adState.runwayFactors; // TODO
    }
}
