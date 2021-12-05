import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MetarTafActions} from './metar-taf.actions';
import {of} from 'rxjs';
import {IAirportRepo} from '../../aerodrome/domain-service/i-airport-repo';
import {Store} from '@ngrx/store';
import {getMetarTafState} from './metar-taf.selectors';
import {SystemConfig} from '../../system/domain-service/system-config';
import {IDate} from '../../system/domain-service/date/i-date';
import {IMetarTafRepo} from '../domain-service/i-metar-taf-repo.service';
import {environment} from '../../../environments/environment';
import {INotamRepo} from '../../notam/domain-service/i-notam-repo';


@Injectable()
export class MetarTafEffects {
    private readonly METAR_TAF_TIMEOUT_SEC = 60 * 5;
    private readonly METAR_TAF_MIN_ZOOM_LEVEL = 8;
    private readonly date: IDate;
    private metarTafState$ = this.appStore.select(getMetarTafState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly metarTafRepo: IMetarTafRepo,
        private readonly airportRepo: IAirportRepo,
        private readonly notamRepo: INotamRepo,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    updateMetarTafsAction$ = createEffect(() => this.actions$.pipe(
        ofType(MetarTafActions.update),
        withLatestFrom(this.metarTafState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || currentState.zoom !== action.zoom
            || !currentState.extent.containsExtent2d(action.extent)
            || currentState.timestamp + this.METAR_TAF_TIMEOUT_SEC * 1000 < this.date.nowMs()
        ),
        switchMap(([action, currentState]) => {
            if (action.zoom <= this.METAR_TAF_MIN_ZOOM_LEVEL) {
                return of({extent: action.extent, zoom: action.zoom, metarTafs: [], timestamp: this.date.nowMs()});
            } else {
                return this.metarTafRepo.load(action.extent).pipe(
                    map(metarTafs => ({
                        extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                        zoom: action.zoom,
                        metarTafs: metarTafs,
                        timestamp: this.date.nowMs()
                    }))
                );
            }
        }),
        map(newState => MetarTafActions.updateSuccess(newState))
    ));
}
