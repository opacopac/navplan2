import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {MetarTafService} from './services/metar-taf.service';
import {MapActionTypes, MapMovedZoomedRotatedAction} from '../map/map.actions';
import {LoadMetarTafErrorAction, LoadMetarTafSuccessAction} from './metar-taf.actions';


@Injectable()
export class MetarTafEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private metarTafService: MetarTafService) {
    }


    @Effect()
    metarTafLoad$: Observable<Action> = this.actions$
        .pipe(
            ofType(MapActionTypes.MAP_MOVED_ZOOMED_ROTATED),
            map(action => action as MapMovedZoomedRotatedAction),
            switchMap(action => this.metarTafService.load(action.extent, action.zoom)
                .pipe(
                    map(metarTafList => new LoadMetarTafSuccessAction(metarTafList, action.extent, action.zoom)),
                    catchError(error => of(new LoadMetarTafErrorAction(error)))
                )
            )
        );
}