import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';


@Injectable()
export class FlightTimerEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>) {
    }
}
