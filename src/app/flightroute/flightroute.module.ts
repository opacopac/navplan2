import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SharedModule} from '../common/shared.module';
import {FlightrouteRestService} from './rest-service/flightroute-rest.service';
import {EditWaypointDialogComponent} from './ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {EditWaypointFormComponent} from './ng-components/edit-waypoint-form/edit-waypoint-form.component';
import {FlightrouteContainerComponent} from './ng-components/flightroute-container/flightroute-container.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc-table/fuel-calc-table.component';
import {WaypointListComponent} from './ng-components/waypoint-list/waypoint-list.component';
import {FlightrouteExportButtonsComponent} from './ng-components/flightroute-export-buttons/flightroute-export-buttons.component';
import {FlightRouteEffects} from './ngrx/flight-route.effects';
import {BaseMapModule} from '../base-map/base-map.module';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc-container/fuel-calc-container.component';
import {FlightroutePageComponent} from './ng-components/flightroute-page/flightroute-page.component';
import {FlightrouteListDialogComponent} from './ng-components/flightroute-list-dialog/flightroute-list-dialog.component';
import {FlightrouteListComponent} from './ng-components/flightroute-list/flightroute-list.component';
import {SharedFlightrouteEffects} from './ngrx/shared-flightroute.effects';
import {FlightRouteListEffects} from './ngrx/flight-route-list-effects.service';
import {flightRouteReducer} from './ngrx/flightroute.reducer';
import {WaypointEffects} from './ngrx/waypoint.effects';
import {IFlightrouteRepo} from './domain-service/i-flightroute-repo';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('flightrouteState', flightRouteReducer),
        EffectsModule.forFeature([
            FlightRouteListEffects,
            FlightRouteEffects,
            SharedFlightrouteEffects,
            WaypointEffects
        ]),
        DragDropModule,
        SharedModule,
        BaseMapModule,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        FlightrouteContainerComponent,
        FlightrouteExportButtonsComponent,
        FuelCalcTableComponent,
        WaypointListComponent,
        FuelCalcContainerComponent,
        FlightroutePageComponent,
        FlightrouteListDialogComponent,
        FlightrouteListComponent,
    ],
    exports: [
        FlightroutePageComponent,
        EditWaypointDialogComponent,
    ],
    providers: [
        { provide: IFlightrouteRepo, useClass: FlightrouteRestService }
    ],
    entryComponents: [
        EditWaypointDialogComponent,
        FlightrouteListDialogComponent
    ],
})
export class FlightrouteModule {}
