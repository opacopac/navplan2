import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightRouteReducer} from './ngrx/flightroute.reducer';
import {SharedFlightrouteEffects} from './ngrx/shared-flightroute.effects';
import {WaypointEffects} from './ngrx/waypoint.effects';
import {FlightRouteCrudEffects} from './ngrx/flightroute-crud-effects.service';
import {FlightrouteEffects} from './ngrx/flightroute.effects';
import {FlightrouteDomainModule} from '../domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../rest/flightroute-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('flightrouteState', flightRouteReducer),
        EffectsModule.forFeature([
            FlightrouteEffects,
            FlightRouteCrudEffects,
            SharedFlightrouteEffects,
            WaypointEffects,
        ]),
        FlightrouteDomainModule,
        FlightrouteRestModule,
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class FlightrouteStateModule {
}
