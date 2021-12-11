import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {VerticalMapActions} from './vertical-map.actions';
import {Observable, of, Subscription} from 'rxjs';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {getFlightroute} from '../../flightroute-state/ngrx/flightroute.selectors';
import {getVerticalMapState} from './vertical-map.selectors';
import {VerticalMapState} from '../state-model/vertical-map-state';
import {VerticalMapButtonStatus} from '../../vertical-map/domain-model/vertical-map-button-status';
import {IVerticalMapService} from '../../vertical-map/domain-service/i-vertical-map.service';


@Injectable()
export class VerticalMapEffects {
    private readonly vmState$: Observable<VerticalMapState> = this.appStore.pipe(select(getVerticalMapState));
    private readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    private readonly flightrouteSubscription: Subscription;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly vmService: IVerticalMapService,
    ) {
        this.flightrouteSubscription = this.flightroute$.subscribe(() => {
            this.appStore.dispatch(VerticalMapActions.update());
        });
    }


    toggleVerticalMapAction$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(VerticalMapActions.toggle),
            withLatestFrom(this.vmState$),
            map(([action, vmState]) => {
                if (vmState.buttonStatus === VerticalMapButtonStatus.OFF) {
                    return VerticalMapActions.read();
                } else {
                    return VerticalMapActions.close();
                }
            })
        ));


    readVerticalMapAction$ = createEffect(() => this.actions$.pipe(
        ofType(VerticalMapActions.read),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.vmService.readVerticalMap(flightroute).pipe(
            map(verticalMap => VerticalMapActions.readSuccess({ verticalMap: verticalMap })),
            catchError(error => of(VerticalMapActions.readError({
                message: 'Error loading vertical map', error: error
            })))
        ))
    ));


    updateVerticalMapAction$ = createEffect(() => this.actions$.pipe(
        ofType(VerticalMapActions.update),
        withLatestFrom(this.flightroute$, this.vmState$),
        filter(([action, flightroute, vmState]) => vmState.buttonStatus !== VerticalMapButtonStatus.OFF),
        switchMap(([action, flightroute, vmState]) => this.vmService.readVerticalMap(flightroute).pipe(
            map(verticalMap => VerticalMapActions.readSuccess({ verticalMap: verticalMap })),
            catchError(error => of(VerticalMapActions.readError({
                message: 'Error loading vertical map', error: error
            })))
        ))
    ));
}
