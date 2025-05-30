import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {catchError, distinctUntilChanged, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {VerticalMapActions} from './vertical-map.actions';
import {Observable, of, Subscription} from 'rxjs';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';
import {getVerticalMapState} from './vertical-map.selectors';
import {VerticalMapState} from '../state-model/vertical-map-state';
import {VerticalMapButtonStatus} from '../../domain/model/vertical-map-button-status';
import {IVerticalMapService} from '../../domain/service/i-vertical-map.service';
import {MeteoDwdState} from '../../../meteo-dwd/state/model/meteo-dwd-state';
import {getMeteoDwdState} from '../../../meteo-dwd/state/ngrx/meteo-dwd.selectors';
import {ForecastSelection} from '../../../meteo-dwd/domain/model/forecast-selection';
import {MeteoDwdStatus} from '../../../meteo-dwd/domain/model/meteo-dwd-status';


@Injectable()
export class VerticalMapEffects {
    private readonly vmState$: Observable<VerticalMapState> = this.appStore.pipe(select(getVerticalMapState));
    private readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    private readonly meteoDwdstate$: Observable<MeteoDwdState> = this.appStore.pipe(select(getMeteoDwdState));
    private readonly forecastSelection$: Observable<ForecastSelection> = this.meteoDwdstate$.pipe(
        map(state => VerticalMapEffects.convertForecastSelection(state)),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
    private readonly flightrouteSubscription: Subscription;
    private readonly forecastSelectionSubscription: Subscription;


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly vmService: IVerticalMapService,
    ) {
        this.flightrouteSubscription = this.flightroute$.subscribe(() => {
            this.appStore.dispatch(VerticalMapActions.update());
        });

        this.forecastSelectionSubscription = this.forecastSelection$.subscribe(() => {
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
        withLatestFrom(this.flightroute$, this.forecastSelection$),
        switchMap(([action, flightroute, fcSelection]) => this.vmService.readVerticalMap(flightroute, fcSelection).pipe(
            map(verticalMap => VerticalMapActions.readSuccess({verticalMap: verticalMap})),
            catchError(error => of(VerticalMapActions.readError({
                message: 'Error loading vertical map', error: error
            })))
        ))
    ));


    updateVerticalMapAction$ = createEffect(() => this.actions$.pipe(
        ofType(VerticalMapActions.update),
        withLatestFrom(this.flightroute$, this.vmState$, this.forecastSelection$),
        filter(([action, flightroute, vmState]) => vmState.buttonStatus !== VerticalMapButtonStatus.OFF),
        switchMap(([action, flightroute, vmState, fcSelection]) => this.vmService.readVerticalMap(flightroute, fcSelection).pipe(
            map(verticalMap => VerticalMapActions.readSuccess({verticalMap: verticalMap})),
            catchError(error => of(VerticalMapActions.readError({
                message: 'Error loading vertical map', error: error
            })))
        ))
    ));


    private static convertForecastSelection(state: MeteoDwdState): ForecastSelection {
        if (
            state.status !== MeteoDwdStatus.CURRENT
            || state.showLayer === null
            || state.forecastRun === null
            || state.selectedStep === null
        ) {
            return null;
        }

        return new ForecastSelection(
            state.showLayer,
            state.forecastRun,
            state.selectedStep
        );
    }
}
