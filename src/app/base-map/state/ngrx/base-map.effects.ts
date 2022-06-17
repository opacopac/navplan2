import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {BaseMapActions} from './base-map.actions';
import {debounceTime, map} from 'rxjs/operators';


@Injectable()
export class BaseMapEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>
    ) {
    }


    mapMovedDebouncedAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(100),
        map(action => BaseMapActions.mapMovedDebounced(action))
    ));
}
