import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportCircuitActions} from './airport-circuit.actions';
import {Observable, of, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAirportCircuitState} from './airport-circuit.selectors';
import {AirportCircuitState} from '../../domain-model/airport-circuit-state';
import {environment} from '../../../../environments/environment';
import {IAirportCircuitRepo} from '../../domain-service/i-airport-circuit-repo';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';


@Injectable()
export class AirportCircuitEffects {
    private readonly AD_CIRCUIT_MIN_ZOOM = 12;
    private readonly airportCircuitState$: Observable<AirportCircuitState> = this.appStore.select(pipe(getAirportCircuitState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportCircuitRepo: IAirportCircuitRepo
    ) {
    }


    readAirportCircuits$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        withLatestFrom(this.airportCircuitState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || !currentState.extent.containsExtent2d(action.extent)
            || (currentState.zoom < this.AD_CIRCUIT_MIN_ZOOM && action.zoom >= this.AD_CIRCUIT_MIN_ZOOM)
        ),
        switchMap(([action, currentState]) => {
            if (action.zoom < this.AD_CIRCUIT_MIN_ZOOM) {
                return of({ extent: action.extent, zoom: action.zoom, airportCircuits: [] });
            } else {
                return this.airportCircuitRepo.readAirportCircuitsByExtent(action.extent, action.zoom).pipe(
                    map(circuits => ({
                        extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                        zoom: action.zoom,
                        airportCircuits: circuits
                    }))
                );
            }
        }),
        map(newState => AirportCircuitActions.showAirportCircuits(newState))
    ));
}
