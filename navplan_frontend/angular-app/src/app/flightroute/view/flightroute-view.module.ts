import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    WaypointButtonContainerComponent
} from './ng-components/flight-map/waypoint-button-container/waypoint-button-container.component';
import {
    WaypointButtonAddToRouteComponent
} from './ng-components/flight-map/waypoint-button-add-to-route/waypoint-button-add-to-route.component';
import {
    WaypointButtonEditWaypointComponent
} from './ng-components/flight-map/waypoint-button-edit-waypoint/waypoint-button-edit-waypoint.component';
import {
    WaypointButtonRemoveAlternateComponent
} from './ng-components/flight-map/waypoint-button-remove-alternate/waypoint-button-remove-alternate.component';
import {
    WaypointButtonRemoveFromRouteComponent
} from './ng-components/flight-map/waypoint-button-remove-from-route/waypoint-button-remove-from-route.component';
import {
    WaypointButtonSetAlternateComponent
} from './ng-components/flight-map/waypoint-button-set-alternate/waypoint-button-set-alternate.component';
import {WaypointHeaderComponent} from './ng-components/flight-map/waypoint-header/waypoint-header.component';
import {WaypointInfoTabComponent} from './ng-components/flight-map/waypoint-info-tab/waypoint-info-tab.component';
import {FlightrouteStateModule} from '../state/flightroute-state.module';
import {FlightrouteDomainModule} from '../domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../rest/flightroute-rest.module';
import {
    EditWaypointDialogComponent
} from './ng-components/flightroute-page/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {
    EditWaypointFormComponent
} from './ng-components/flightroute-page/edit-waypoint-form/edit-waypoint-form.component';
import {
    FlightrouteContainerComponent
} from './ng-components/flightroute-page/flightroute-container/flightroute-container.component';
import {FlightrouteListComponent} from './ng-components/flightroute-page/flightroute-list/flightroute-list.component';
import {
    FlightrouteListDialogComponent
} from './ng-components/flightroute-page/flightroute-list-dialog/flightroute-list-dialog.component';
import {WaypointListComponent} from './ng-components/flightroute-page/waypoint-list/waypoint-list.component';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc/fuel-calc-container/fuel-calc-container.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc/fuel-calc-table/fuel-calc-table.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatCardModule,
        FlightrouteDomainModule,
        FlightrouteRestModule,
        FlightrouteStateModule,
    ],
    declarations: [
        WaypointButtonContainerComponent,
        WaypointButtonAddToRouteComponent,
        WaypointButtonEditWaypointComponent,
        WaypointButtonRemoveAlternateComponent,
        WaypointButtonRemoveFromRouteComponent,
        WaypointButtonSetAlternateComponent,
        WaypointHeaderComponent,
        WaypointInfoTabComponent,
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        FlightrouteContainerComponent,
        FlightrouteListComponent,
        FlightrouteListDialogComponent,
        WaypointListComponent,
        FuelCalcContainerComponent,
        FuelCalcTableComponent,
    ],
    exports: [
        WaypointButtonContainerComponent,
        WaypointInfoTabComponent,
        WaypointHeaderComponent,
        FlightrouteContainerComponent,
        FuelCalcContainerComponent
    ],
    providers: [],
    entryComponents: [],
})
export class FlightrouteViewModule {
}
