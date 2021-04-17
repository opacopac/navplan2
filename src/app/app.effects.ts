import {Injectable} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map} from 'rxjs/operators';
import {AppActionTypes, SelectActiveMapAction} from './app.actions';
import {ActiveMapType} from './app-state';
import {Observable} from 'rxjs';
import {FlightMapActivateAction} from './flight-map/ngrx/flight-map.actions';


@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) {
    }



    selectActiveMapAction$: Observable<Action> = createEffect(() => this.router.events.pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => {
            return new SelectActiveMapAction(this.getMapByRouterPath(event.snapshot.routeConfig.path));
        })
    ));



    navMapActivateAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(AppActionTypes.APP_SELECT_ACTIVE_MAP),
        map((action: SelectActiveMapAction) => {
            return new FlightMapActivateAction(action.activeMap === ActiveMapType.NAV_MAP);
        })
    ));



    private getMapByRouterPath(path: string): ActiveMapType {
        switch (path) {
            case 'map': return ActiveMapType.NAV_MAP;
            default: return ActiveMapType.NONE;
        }
    }
}
