import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AirportActions} from './airport.actions';
import {IAirportService} from '../domain-service/i-airport.service';


@Injectable()
export class AirportEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly airportService: IAirportService,
    ) {
    }


    showAirportsAction$ = createEffect(() => this.actions$.pipe(
        ofType(AirportActions.readAirports),
        switchMap(action => this.airportService.readByExtent(
            action.extent,
            action.zoom
        )),
        map(newState => AirportActions.showAirports(newState))
    ));
}
