import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {WaypointButtonContainerComponent} from './ng-components/waypoint-button-container/waypoint-button-container.component';
import {WaypointButtonAddToRouteComponent} from './ng-components/waypoint-button-add-to-route/waypoint-button-add-to-route.component';
import {WaypointButtonEditWaypointComponent} from './ng-components/waypoint-button-edit-waypoint/waypoint-button-edit-waypoint.component';
import {WaypointButtonRemoveAlternateComponent} from './ng-components/waypoint-button-remove-alternate/waypoint-button-remove-alternate.component';
import {WaypointButtonRemoveFromRouteComponent} from './ng-components/waypoint-button-remove-from-route/waypoint-button-remove-from-route.component';
import {WaypointButtonSetAlternateComponent} from './ng-components/waypoint-button-set-alternate/waypoint-button-set-alternate.component';
import {WaypointHeaderComponent} from './ng-components/waypoint-header/waypoint-header.component';
import {WaypointInfoTabComponent} from './ng-components/waypoint-info-tab/waypoint-info-tab.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        WaypointButtonContainerComponent,
        WaypointButtonAddToRouteComponent,
        WaypointButtonEditWaypointComponent,
        WaypointButtonRemoveAlternateComponent,
        WaypointButtonRemoveFromRouteComponent,
        WaypointButtonSetAlternateComponent,
        WaypointHeaderComponent,
        WaypointInfoTabComponent
    ],
    exports: [
        WaypointButtonContainerComponent,
        WaypointInfoTabComponent,
        WaypointHeaderComponent
    ],
    providers: [
    ],
    entryComponents: [
    ],
})
export class FlightMapFlightrouteModule {}
