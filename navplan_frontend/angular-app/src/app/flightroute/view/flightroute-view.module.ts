import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MapPopupWaypointButtonContainerComponent
} from './ng-components/flight-map/map-popup-waypoint-button-container/map-popup-waypoint-button-container.component';
import {
    MapPopupWaypointButtonAddToRouteComponent
} from './ng-components/flight-map/map-popup-waypoint-button-add-to-route/map-popup-waypoint-button-add-to-route.component';
import {
    MapPopupButtonEditWaypointComponent
} from './ng-components/flight-map/map-popup-waypoint-button-edit-waypoint/map-popup-button-edit-waypoint.component';
import {
    MapPopupWaypointButtonRemoveAlternateComponent
} from './ng-components/flight-map/map-popup-waypoint-button-remove-alternate/map-popup-waypoint-button-remove-alternate.component';
import {
    MapPopupWaypointButtonRemoveFromRouteComponent
} from './ng-components/flight-map/map-popup-waypoint-button-remove-from-route/map-popup-waypoint-button-remove-from-route.component';
import {
    MapPopupWaypointButtonSetAlternateComponent
} from './ng-components/flight-map/map-popup-waypoint-button-set-alternate/map-popup-waypoint-button-set-alternate.component';
import {
    MapPopupWaypointHeaderComponent
} from './ng-components/flight-map/map-popup-waypoint-header/map-popup-waypoint-header.component';
import {
    MapPopupWaypointInfoTabComponent
} from './ng-components/flight-map/map-popup-waypoint-info-tab/map-popup-waypoint-info-tab.component';
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
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc/fuel-calc-container/fuel-calc-container.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc/fuel-calc-table/fuel-calc-table.component';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {CommonViewModule} from '../../common/view/common-view.module';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
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
        GeoPhysicsViewModule,
    ],
    declarations: [
        MapPopupWaypointButtonContainerComponent,
        MapPopupWaypointButtonAddToRouteComponent,
        MapPopupButtonEditWaypointComponent,
        MapPopupWaypointButtonRemoveAlternateComponent,
        MapPopupWaypointButtonRemoveFromRouteComponent,
        MapPopupWaypointButtonSetAlternateComponent,
        MapPopupWaypointHeaderComponent,
        MapPopupWaypointInfoTabComponent,
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
        MapPopupWaypointButtonContainerComponent,
        MapPopupWaypointInfoTabComponent,
        MapPopupWaypointHeaderComponent,
        FlightrouteContainerComponent,
        FuelCalcContainerComponent
    ],
    providers: []
})
export class FlightrouteViewModule {
}
