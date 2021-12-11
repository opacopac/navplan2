import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {EditWaypointDialogComponent} from './ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {FlightrouteListDialogComponent} from './ng-components/flightroute-list-dialog/flightroute-list-dialog.component';
import {EditWaypointFormComponent} from './ng-components/edit-waypoint-form/edit-waypoint-form.component';
import {FlightrouteContainerComponent} from './ng-components/flightroute-container/flightroute-container.component';
import {FlightrouteListComponent} from './ng-components/flightroute-list/flightroute-list.component';
import {WaypointListComponent} from './ng-components/waypoint-list/waypoint-list.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FlightRouteListEffects} from './ngrx/flightroute-list-effects.service';
import {flightRouteListReducer} from './ngrx/flightroute-list.reducer';
import {FlightRouteCrudEffects} from './ngrx/flight-route-crud-effects.service';
import {FlightrouteStateModule} from '../flightroute-state/flightroute-state.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('flightrouteListState', flightRouteListReducer),
        EffectsModule.forFeature([
            FlightRouteListEffects,
            FlightRouteCrudEffects
        ]),
        FlightrouteStateModule,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        FlightrouteContainerComponent,
        FlightrouteListComponent,
        FlightrouteListDialogComponent,
        WaypointListComponent
    ],
    exports: [
        FlightrouteContainerComponent,
    ],
    providers: [
    ],
    entryComponents: [
        EditWaypointDialogComponent,
        FlightrouteListDialogComponent
    ],
})
export class FlightPrepFlightrouteModule {}
