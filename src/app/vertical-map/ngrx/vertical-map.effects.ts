import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {VerticalMapActions} from './vertical-map.actions';
import {VerticalMapService} from '../domain-service/vertical-map.service';
import {Observable, of} from 'rxjs';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {getFlightroute} from '../../flightroute/ngrx/flightroute.selectors';
import {getVerticalMapState} from './vertical-map.selectors';
import {VerticalMapState} from '../domain-model/vertical-map-state';
import {VerticalMapButtonStatus} from '../domain-model/vertical-map-button-status';


@Injectable()
export class VerticalMapEffects {
    private vmState$: Observable<VerticalMapState> = this.appStore.pipe(select(getVerticalMapState));
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly vmService: VerticalMapService,
    ) {
    }

    toggleVerticalMapAction$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(VerticalMapActions.toggle),
            withLatestFrom(this.vmState$),
            map(([action, vmState]) => {
                if (vmState.buttonStatus === VerticalMapButtonStatus.OFF) {
                    return VerticalMapActions.open();
                } else {
                    return VerticalMapActions.close();
                }
            })
        ));


    showVerticalMapAction$ = createEffect(() => this.actions$.pipe(
        ofType(VerticalMapActions.open),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.vmService.readVerticalMap(flightroute).pipe(
            map(verticalMap => VerticalMapActions.show({ verticalMap: verticalMap })),
            catchError(error => of(VerticalMapActions.error({
                message: 'Error loading vertical map', error: error
            })))
        ))
    ));
}
