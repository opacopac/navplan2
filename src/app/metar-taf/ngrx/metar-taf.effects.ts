import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MetarTafActions} from './metar-taf.actions';
import {IMetarTafService} from '../domain-service/i-metar-taf.service';


@Injectable()
export class MetarTafEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly metarTafService: IMetarTafService,
    ) {
    }


    showMetarTafsAction$ = createEffect(() => this.actions$.pipe(
        ofType(MetarTafActions.readMetarTafs),
        switchMap(action => this.metarTafService.readByExtent(
            action.extent,
            action.zoom
        )),
        map(newState => MetarTafActions.showMetarTafs(newState))
    ));
}
