import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportCircuitActions} from './airport-circuit.actions';
import {Observable, of, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAirportCircuitState} from './airport-circuit.selectors';
import {AirportCircuitState} from '../state-model/airport-circuit-state';
import {environment} from '../../../../environments/environment';
import {IAirportCircuitService} from '../../domain/service/i-airport-circuit.service';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';


@Injectable()
export class AirportCircuitEffects {
    private readonly AD_CIRCUIT_MIN_ZOOM = 12;
    private readonly airportCircuitState$: Observable<AirportCircuitState> = this.appStore.select(pipe(getAirportCircuitState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportCircuitService: IAirportCircuitService
    ) {
    }


    updateAirportCircuits$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMovedDebounced),
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
                return this.airportCircuitService.readAirportCircuitsByExtent(action.extent, action.zoom).pipe(
                    map(circuits => ({
                        extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                        zoom: action.zoom,
                        airportCircuits: circuits
                    }))
                );
            }
        }),
        map(newState => AirportCircuitActions.readSuccess(newState))
    ));
}
