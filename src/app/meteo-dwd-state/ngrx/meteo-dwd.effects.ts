import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {map, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MeteoDwdActions} from './meteo-dwd.actions';
import {Observable} from 'rxjs';
import {MeteoDwdState} from '../../meteo-dwd/domain-model/meteo-dwd-state';
import {getMeteoDwdState} from './meteo-dwd.selectors';
import {MeteoDwdButtonStatus} from '../../meteo-dwd/domain-model/meteo-dwd-button-status';


@Injectable()
export class MeteoDwdEffects {
    private readonly meteoDwdstate$: Observable<MeteoDwdState> = this.appStore.pipe(select(getMeteoDwdState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>
    ) {
    }


    toggleAction$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(MeteoDwdActions.toggle),
            withLatestFrom(this.meteoDwdstate$),
            map(([action, meteoDwdState]) => {
                if (meteoDwdState.buttonStatus === MeteoDwdButtonStatus.OFF) {
                    return MeteoDwdActions.open();
                } else {
                    return MeteoDwdActions.close();
                }
            })
        ));
}
