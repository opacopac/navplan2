import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {EditWaypointDialogComponent} from './ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {FlightrouteListDialogComponent} from './ng-components/flightroute-list-dialog/flightroute-list-dialog.component';
import {EditWaypointFormComponent} from './ng-components/edit-waypoint-form/edit-waypoint-form.component';
import {FlightrouteContainerComponent} from './ng-components/flightroute-container/flightroute-container.component';
import {FlightrouteExportButtonsComponent} from './ng-components/flightroute-export-buttons/flightroute-export-buttons.component';
import {FlightrouteListComponent} from './ng-components/flightroute-list/flightroute-list.component';
import {WaypointListComponent} from './ng-components/waypoint-list/waypoint-list.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        FlightrouteContainerComponent,
        FlightrouteExportButtonsComponent,
        FlightrouteListComponent,
        FlightrouteListDialogComponent,
        WaypointListComponent
    ],
    exports: [
        FlightrouteContainerComponent,
        FlightrouteExportButtonsComponent,
    ],
    providers: [
    ],
    entryComponents: [
        EditWaypointDialogComponent,
        FlightrouteListDialogComponent
    ],
})
export class FlightPrepFlightrouteModule {}
