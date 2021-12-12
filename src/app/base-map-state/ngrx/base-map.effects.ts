import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';


@Injectable()
export class BaseMapEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>
    ) {
    }
}
