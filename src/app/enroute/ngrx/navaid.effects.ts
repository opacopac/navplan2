import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NavaidActions} from './navaid.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getNavaidState} from './navaid.selectors';
import {NavaidService} from '../domain-service/navaid.service';
import {NavaidState} from '../domain-model/navaid-state';


@Injectable()
export class NavaidEffects {
    private readonly navaidState$: Observable<NavaidState> = this.appStore.select(pipe(getNavaidState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly navaidService: NavaidService,
    ) {
    }


    readNavaids$ = createEffect(() => this.actions$.pipe(
        ofType(NavaidActions.readNavaids),
        withLatestFrom(this.navaidState$),
        filter(([action, currentState]) => this.navaidService.isReloadRequired(action, currentState)),
        switchMap(([action, currentState]) => {
            return this.navaidService.readByExtent(action.extent, action.zoom).pipe(
                map(newState => NavaidActions.showNavaids(newState))
            );
        })
    ));
}
