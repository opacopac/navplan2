import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of, switchMap} from 'rxjs';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {getCurrentAircraft} from '../../../aircraft/state/ngrx/aircraft.selectors';
import {withLatestFrom} from 'rxjs/operators';
import {FlightrouteActions} from '../../../flightroute/state/ngrx/flightroute.actions';
import {PlanPerfActions} from './plan-perf.actions';
import {IAirportService} from '../../../aerodrome/domain/service/i-airport.service';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';


@Injectable()
export class PlanPerfEffects {
    private readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    private readonly aircraft$: Observable<Aircraft> = this.appStore.pipe(select(getCurrentAircraft));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: IAirportService
    ) {
    }


    changeFlightRouteActionDeparture$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.update, FlightrouteActions.clear),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.loadAirportFromDataItem(flightroute?.getOriginWaypoint())),
        switchMap(airport => [PlanPerfActions.changeDepartureAirport({airport})])
    ));


    changeFlightRouteActionDestination$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.update, FlightrouteActions.clear),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.loadAirportFromDataItem(flightroute?.getDestinationWaypoint())),
        switchMap(airport => [PlanPerfActions.changeDestinationAirport({airport})])
    ));


    changeFlightRouteActionAlternate$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.update, FlightrouteActions.clear),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.loadAirportFromDataItem(flightroute?.getAlternateWaypoint())),
        switchMap(airport => [PlanPerfActions.changeAlternateAirport({airport})])
    ));


    private loadAirportFromDataItem(waypoint: Waypoint): Observable<Airport> {
        if (waypoint && waypoint.checkpoint) {
            console.log('loadAirportFromDataItem', waypoint.checkpoint);
            return this.airportService.readAirportByIcao(waypoint.checkpoint); // TODO
        } else {
            return of(null);
        }
    }
}
