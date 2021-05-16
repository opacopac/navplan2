import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MetarTafActions} from './metar-taf.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {MetarTafState} from '../domain-model/metar-taf-state';
import {MetarTafService} from '../domain-service/metar-taf.service';
import {getMetarTafState} from './metar-taf.selectors';
import {environment} from '../../../environments/environment';


@Injectable()
export class MetarTafEffects {
    private readonly metarTafState$: Observable<MetarTafState> = this.appStore.select(pipe(getMetarTafState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly metarTafService: MetarTafService,
    ) {
    }


    readMetarTafs$ = createEffect(() => this.actions$.pipe(
        ofType(MetarTafActions.readMetarTafs),
        withLatestFrom(this.metarTafState$),
        filter(([action, currentState]) => this.metarTafService.isReloadRequired(action, currentState)),
        switchMap(([action, currentState]) => {
            return this.metarTafService.readByExtent(
                action.extent.getOversizeExtent(environment.mapOversizeFactor),
                action.zoom
            ).pipe(
                map(newState => MetarTafActions.showMetarTafs(newState))
            );
        })
    ));
}
