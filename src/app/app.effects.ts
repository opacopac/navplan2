import {Injectable} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, map} from 'rxjs/operators';
import {AppActionTypes, SelectActiveMapAction} from './app.actions';
import {ActiveMapType} from './app-state';
import {Observable} from 'rxjs';
import {NavMapActivateAction} from './nav-map/ngrx/nav-map.actions';
import {ChartMapActivateAction} from './chart-map/ngrx/chart-map.actions';


@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) {
    }


    @Effect()
    selectActiveMapAction$: Observable<Action> = this.router.events.pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => {
            return new SelectActiveMapAction(this.getMapByRouterPath(event.snapshot.routeConfig.path));
        })
    );


    @Effect()
    navMapActivateAction$: Observable<Action> = this.actions$.pipe(
        ofType(AppActionTypes.APP_SELECT_ACTIVE_MAP),
        map((action: SelectActiveMapAction) => {
            return new NavMapActivateAction(action.activeMap === ActiveMapType.NAV_MAP);
        })
    );


    @Effect()
    chartMapActivateAction$: Observable<Action> = this.actions$.pipe(
        ofType(AppActionTypes.APP_SELECT_ACTIVE_MAP),
        map((action: SelectActiveMapAction) => {
            return new ChartMapActivateAction(action.activeMap === ActiveMapType.CHART_MAP);
        })
    );


    private getMapByRouterPath(path: string): ActiveMapType {
        switch (path) {
            case 'map': return ActiveMapType.NAV_MAP;
            case 'chartmap': return ActiveMapType.CHART_MAP;
            default: return ActiveMapType.NONE;
        }
    }
}
