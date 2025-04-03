import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {distinct, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {RouteMeteoActions} from './route-meteo.actions';
import {getRouteMeteoState} from './route-meteo.selectors';
import {RouteMeteoState} from '../state-model/route-meteo-state';
import {Flightroute} from '../../../../flightroute/domain/model/flightroute';
import {getFlightroute} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {IRouteMeteoService} from '../../domain/service/i-route-meteo.service';
import {FlightrouteActions} from '../../../../flightroute/state/ngrx/flightroute.actions';


@Injectable()
export class RouteMeteoEffects {
    private readonly routeMeteoState$: Observable<RouteMeteoState> = this.appStore.select(getRouteMeteoState);
    private readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly routeMeteoService: IRouteMeteoService,
    ) {
    }


    updateRouteMetarTafAction$ = createEffect(() => this.actions$.pipe(
        ofType(RouteMeteoActions.update, RouteMeteoActions.maxRadiusChanged, FlightrouteActions.update),
        withLatestFrom(this.flightroute$, this.routeMeteoState$),
        distinct(([action, route, meteoState]) => [route, meteoState]), // TODO: timeout
        switchMap(([action, route, meteoState]) => this.routeMeteoService.getRouteMetarTafs(
            route,
            meteoState.maxMeteoRadius
        ).pipe(
            map(routeMetarTafs => RouteMeteoActions.updateSuccess({routeMetarTafs: routeMetarTafs}))
        ))
    ));
}
