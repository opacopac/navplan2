import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {MetarTafService} from '../rest/metar-taf.service';
import {
    MetarTafActionTypes, ReadMetarTafAction,
    ReadMetarTafErrorAction,
    ReadMetarTafSuccessAction
} from './metar-taf.actions';
import {MetarTafState} from '../domain/metar-taf-state';
import {getMetarTafState} from './metar-taf.selectors';
import {SystemConfig} from '../../system/system-config';
import {MetarTafRepo} from '../use-case/metar-taf-repo';


@Injectable()
export class MetarTafEffects {
    private readonly metarTafState$: Observable<MetarTafState> = this.appStore.select(getMetarTafState);
    private readonly metarTafRepo: MetarTafRepo;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        metarTafService: MetarTafService,
        config: SystemConfig
    ) {
        this.metarTafRepo = new MetarTafRepo(metarTafService, config);
    }


    @Effect()
    readMetarTafAction$: Observable<Action> = this.actions$.pipe(
        ofType(MetarTafActionTypes.METARTAF_READ),
        map(action => action as ReadMetarTafAction),
        withLatestFrom(this.metarTafState$),
        switchMap(([action, state]) => this.metarTafRepo.readByExtent(action.extent, action.zoom, state).pipe(
            map(result => new ReadMetarTafSuccessAction(result)),
            catchError(error => of(new ReadMetarTafErrorAction(error)))
        ))
    );
}
