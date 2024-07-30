import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightRouteReducer} from './ngrx/flightroute.reducer';
import {SharedFlightrouteEffects} from './ngrx/shared-flightroute.effects';
import {WaypointEffects} from './ngrx/waypoint.effects';
import {FlightRouteListEffects} from './ngrx/flightroute-list-effects.service';
import {FlightRouteCrudEffects} from './ngrx/flightroute-crud-effects.service';
import {routeMeteoReducer} from './ngrx/route-meteo.reducer';
import {RouteMeteoEffects} from './ngrx/route-meteo.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('flightrouteState', flightRouteReducer),
        StoreModule.forFeature('routeMeteoState', routeMeteoReducer),
        EffectsModule.forFeature([
            FlightRouteListEffects,
            FlightRouteCrudEffects,
            SharedFlightrouteEffects,
            WaypointEffects,
            RouteMeteoEffects
        ]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class FlightrouteStateModule {
}
