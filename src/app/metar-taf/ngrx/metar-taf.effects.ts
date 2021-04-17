import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {MetarTafRepo} from '../rest-service/metar-taf-repo.service';
import {
    MetarTafActionTypes,
    ReadMetarTafAction,
    ReadMetarTafErrorAction,
    ReadMetarTafSuccessAction
} from './metar-taf.actions';
import {MetarTafState} from '../domain-model/metar-taf-state';
import {getMetarTafState} from './metar-taf.selectors';
import {SystemConfig} from '../../system/domain-service/system-config';
import {MetarTafService} from '../domain-service/metar-taf.service';


@Injectable()
export class MetarTafEffects {
    private readonly metarTafState$: Observable<MetarTafState> = this.appStore.select(getMetarTafState);
    private readonly metarTafRepo: MetarTafService;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        metarTafService: MetarTafRepo,
        config: SystemConfig
    ) {
        this.metarTafRepo = new MetarTafService(metarTafService, config);
    }



    readMetarTafAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(MetarTafActionTypes.METARTAF_READ),
        map(action => action as ReadMetarTafAction),
        withLatestFrom(this.metarTafState$),
        switchMap(([action, state]) => this.metarTafRepo.readByExtent(action.extent, action.zoom, state).pipe(
            map(result => new ReadMetarTafSuccessAction(result)),
            catchError(error => of(new ReadMetarTafErrorAction(error)))
        ))
    ));
}
