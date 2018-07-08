import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {withLatestFrom} from 'rxjs/operators';
import {LocationService} from './services/location/location.service';
import {getLocationIsWatching} from './location.selectors';
import {LocationActionTypes} from './location.actions';


@Injectable()
export class LocationEffects {
    private locationIsWatching$: Observable<boolean> = this.appStore.select(getLocationIsWatching);


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private locationService: LocationService) {
    }


    @Effect({ dispatch: false })
    toggleLocationWatch$: Observable<any> = this.actions$
        .pipe(
            ofType(LocationActionTypes.LOCATION_TOGGLE_WATCH),
            withLatestFrom(this.locationIsWatching$)
        )
        .do(([action, isWatching]) => {
            if (isWatching) {
                this.locationService.stopWatching();
            } else {
                this.locationService.startWatching();
            }
        });
}
