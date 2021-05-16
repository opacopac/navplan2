import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportActions} from './airport.actions';
import {Observable, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {getAirportState} from './airport.selectors';
import {AirportService} from '../domain-service/airport.service';
import {AirportState} from '../domain-model/airport-state';
import {environment} from '../../../environments/environment';


@Injectable()
export class AirportEffects {
    private readonly airportState: Observable<AirportState> = this.appStore.select(pipe(getAirportState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: AirportService,
    ) {
    }


    readAirports$ = createEffect(() => this.actions$.pipe(
        ofType(AirportActions.readAirports),
        withLatestFrom(this.airportState),
        filter(([action, currentState]) => this.airportService.isReloadRequired(action, currentState)),
        switchMap(([action, currentState]) => {
            return this.airportService.readByExtent(
                action.extent.getOversizeExtent(environment.mapOversizeFactor),
                action.zoom
            ).pipe(
                map(newState => AirportActions.showAirports(newState))
            );
        })
    ));
}
