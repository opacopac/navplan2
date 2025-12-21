import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {distinct, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {RouteNotamActions} from './route-notam.actions';
import {getRouteNotamState} from './route-notam.selectors';
import {RouteNotamState} from '../state-model/route-notam-state';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';
import {IRouteNotamService} from '../../domain/service/i-route-notam.service';
import {FlightrouteActions} from '../../../flightroute/state/ngrx/flightroute.actions';
import {getNotamState} from '../../../notam/state/ngrx/notam.selectors';
import {NotamState} from '../../../notam/state/state-model/notam-state';


@Injectable()
export class RouteNotamEffects {
    private readonly routeNotamState$: Observable<RouteNotamState> = this.appStore.select(getRouteNotamState);
    private readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    private readonly notamState$: Observable<NotamState> = this.appStore.select(getNotamState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly routeNotamService: IRouteNotamService,
    ) {
    }


    updateRouteNotamAction$ = createEffect(() => this.actions$.pipe(
        ofType(RouteNotamActions.update, RouteNotamActions.maxRadiusChanged, FlightrouteActions.update),
        withLatestFrom(this.flightroute$, this.routeNotamState$, this.notamState$),
        distinct(([action, route, routeNotamState, notamState]) => [route, routeNotamState, notamState]), // TODO: timeout
        switchMap(([action, route, routeNotamState, notamState]) => this.routeNotamService.getRouteNotams(
            route,
            routeNotamState.maxNotamRadius,
            notamState.interval
        ).pipe(
            map(locationNotams => RouteNotamActions.updateSuccess({locationNotams: locationNotams}))
        ))
    ));
}
