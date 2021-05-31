import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportCircuitActions} from './airport-circuit.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAirportCircuitState} from './airport-circuit.selectors';
import {AirportCircuitState} from '../domain-model/airport-circuit-state';
import {environment} from '../../../environments/environment';
import {IAirportCircuitService} from '../domain-service/i-airport-circuit.service';


@Injectable()
export class AirportCircuitEffects {
    private readonly airportCircuitState$: Observable<AirportCircuitState> = this.appStore.select(pipe(getAirportCircuitState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportCircuitService: IAirportCircuitService,
    ) {
    }


    readAirportCircuits$ = createEffect(() => this.actions$.pipe(
        ofType(AirportCircuitActions.readAirportCircuits),
        withLatestFrom(this.airportCircuitState$),
        filter(([action, currentState]) => this.airportCircuitService.isReloadRequired(action, currentState)),
        switchMap(([action, currentState]) => {
            return this.airportCircuitService.readByExtent(
                action.extent.getOversizeExtent(environment.mapOversizeFactor),
                action.zoom
            ).pipe(
                map(newState => AirportCircuitActions.showAirportCircuits(newState))
            );
        })
    ));
}
