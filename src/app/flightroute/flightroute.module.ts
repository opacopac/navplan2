import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SharedModule} from '../common/shared.module';
import {FlightrouteService} from './rest-service/flightroute.service';
import {EditWaypointDialogComponent} from './ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {EditWaypointFormComponent} from './ng-components/edit-waypoint-form/edit-waypoint-form.component';
import {FlightrouteContainerComponent} from './ng-components/flightroute-container/flightroute-container.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc-table/fuel-calc-table.component';
import {WaypointListComponent} from './ng-components/waypoint-list/waypoint-list.component';
import {FlightrouteExportButtonsComponent} from './ng-components/flightroute-export-buttons/flightroute-export-buttons.component';
import {flightrouteReducer} from './ngrx/flightroute.reducer';
import {FlightrouteEffects} from './ngrx/flightroute.effects';
import {BaseMapModule} from '../base-map/base-map.module';
import {OpenAipModule} from '../open-aip/open-aip.module';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc-container/fuel-calc-container.component';
import {FlightroutePageComponent} from './ng-components/flightroute-page/flightroute-page.component';
import {FlightrouteListDialogComponent} from './ng-components/flightroute-list-dialog/flightroute-list-dialog.component';
import {FlightrouteListComponent} from './ng-components/flightroute-list/flightroute-list.component';
import {SharedFlightrouteEffects} from './ngrx/shared-flightroute.effects';
import {FlightrouteListEffects} from './ngrx/flightroute-list.effects';
import {WaypointEffects} from './ngrx/waypoint.effects';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('flightrouteState', flightrouteReducer),
        EffectsModule.forFeature([
            FlightrouteListEffects,
            FlightrouteEffects,
            SharedFlightrouteEffects,
            WaypointEffects
        ]),
        DragDropModule,
        SharedModule,
        BaseMapModule,
        OpenAipModule,
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
        FlightrouteService
    ],
    entryComponents: [
        EditWaypointDialogComponent,
        FlightrouteListDialogComponent
    ],
})
export class FlightrouteModule {}
