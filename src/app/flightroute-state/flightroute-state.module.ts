import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {ExporterEffects} from '../exporter/ngrx/exporter.effects.service';
import {flightRouteReducer} from './ngrx/flightroute.reducer';
import {SharedFlightrouteEffects} from './ngrx/shared-flightroute.effects';
import {WaypointEffects} from './ngrx/waypoint.effects';
import {FlightrouteModule} from '../flightroute/flightroute.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('flightrouteState', flightRouteReducer),
        EffectsModule.forFeature([
            ExporterEffects,
            SharedFlightrouteEffects,
            WaypointEffects
        ]),
        FlightrouteModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ],
})
export class FlightrouteStateModule {}
