import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {IDate} from '../../system/domain-service/date/i-date';
import {SystemConfig} from '../../system/domain-service/system-config';
import {VerticalMapActions} from './vertical-map.actions';


@Injectable()
export class VerticalMapEffects {
    private readonly date: IDate;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    hideOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(VerticalMapActions.show),
        map(() => null)
    ));
}
