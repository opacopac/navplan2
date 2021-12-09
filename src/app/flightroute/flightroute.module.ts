import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {FlightrouteRestService} from './rest-service/flightroute-rest.service';
import {FlightRouteEffects} from './ngrx/flight-route.effects';
import {SharedFlightrouteEffects} from './ngrx/shared-flightroute.effects';
import {FlightRouteListEffects} from './ngrx/flight-route-list-effects.service';
import {flightRouteReducer} from './ngrx/flightroute.reducer';
import {WaypointEffects} from './ngrx/waypoint.effects';
import {IFlightrouteRepo} from './domain-service/i-flightroute-repo';
import {ExporterEffects} from '../exporter/ngrx/exporter.effects.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('flightrouteState', flightRouteReducer),
        EffectsModule.forFeature([
            FlightRouteListEffects,
            FlightRouteEffects,
            ExporterEffects,
            SharedFlightrouteEffects,
            WaypointEffects
        ]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IFlightrouteRepo, useClass: FlightrouteRestService }
    ],
})
export class FlightrouteModule {}
