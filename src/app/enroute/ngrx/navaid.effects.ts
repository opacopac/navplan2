import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NavaidActions} from './navaid.actions';
import {INavaidService} from '../domain-service/i-navaid.service';


@Injectable()
export class NavaidEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly navaidService: INavaidService,
    ) {
    }


    readNavaids$ = createEffect(() => this.actions$.pipe(
        ofType(NavaidActions.readNavaids),
        switchMap(action => this.navaidService.readByExtent(
            action.extent,
            action.zoom
        )),
        map(newState => NavaidActions.showNavaids(newState))
    ));
}
