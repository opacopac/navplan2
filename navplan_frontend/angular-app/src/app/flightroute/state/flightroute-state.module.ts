import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightRouteReducer} from './ngrx/flightroute.reducer';
import {SharedFlightrouteEffects} from './ngrx/shared-flightroute.effects';
import {WaypointEffects} from './ngrx/waypoint.effects';
import {FlightRouteListEffects} from './ngrx/flightroute-list-effects.service';
import {FlightRouteCrudEffects} from './ngrx/flightroute-crud-effects.service';
import {FlightrouteEffects} from './ngrx/flightroute.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('flightrouteState', flightRouteReducer),
        EffectsModule.forFeature([
            FlightrouteEffects,
            FlightRouteListEffects,
            FlightRouteCrudEffects,
            SharedFlightrouteEffects,
            WaypointEffects,
        ]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class FlightrouteStateModule {
}
