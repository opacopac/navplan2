import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';


@Injectable()
export class PlanPerfEffects {
    private readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>
    ) {
    }


    /*changeDepartureAirportAction$ = createEffect(() => this.actions$.pipe(
        ofType(PlanPerfActions.changeDepartureAirportPerformance),
        withLatestFrom(this.flightroute$, this.routeMeteoState$),
        distinct(([action, route, meteoState]) => [route, meteoState]), // TODO: timeout
        switchMap(([action, route, meteoState]) => this.routeMeteoService.getRouteMetarTafs(
            route,
            meteoState.maxMeteoRadius
        ).pipe(
            map(routeMetarTafs => RouteMeteoActions.updateSuccess({routeMetarTafs: routeMetarTafs}))
        ))
    ));*/
}
