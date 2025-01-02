import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of, switchMap} from 'rxjs';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {getCurrentAircraft} from '../../../aircraft/state/ngrx/aircraft.selectors';
import {withLatestFrom} from 'rxjs/operators';
import {FlightrouteActions} from '../../../flightroute/state/ngrx/flightroute.actions';
import {PlanPerfActions} from './plan-perf.actions';
import {IAirportService} from '../../../aerodrome/domain/service/i-airport.service';
import {Airport} from '../../../aerodrome/domain/model/airport';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';


@Injectable()
export class PlanPerfEffects {
    private readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    private readonly aircraft$: Observable<Aircraft> = this.appStore.pipe(select(getCurrentAircraft));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly airportService: IAirportService
    ) {
    }


    changeFlightRouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteActions.update, FlightrouteActions.clear),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => {
            return [
                this.loadAirportFromDataItem(flightroute?.getOriginWaypoint()),
                this.loadAirportFromDataItem(flightroute?.getDestinationWaypoint()),
                this.loadAirportFromDataItem(flightroute?.getAlternateWaypoint())
            ];
        }),
        switchMap(airports => [
            PlanPerfActions.changeDepartureAirport({airport: airports[0]}),
            PlanPerfActions.changeDestinationAirport({airport: airports[1]}),
            PlanPerfActions.changeAlternateAirport({airport: airports[2]}),
        ])
    ));


    private loadAirportFromDataItem(waypoint: Waypoint): Observable<Airport> {
        if (waypoint && waypoint.callsign) {
            return this.airportService.readAirportByIcao(waypoint.callsign); // TODO
        } else {
            return of(null);
        }
    }
}
