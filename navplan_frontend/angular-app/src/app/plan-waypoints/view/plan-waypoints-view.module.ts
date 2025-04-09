import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ExporterViewModule} from '../../exporter/view/exporter-view.module';
import {WaypointsContainerComponent} from './ng-components/waypoints-container/waypoints-container.component';
import {FlightrouteAircraftSpeedComponent} from './ng-components/flightroute-aircraft-speed/flightroute-aircraft-speed.component';
import {FlightrouteCommentsComponent} from './ng-components/flightroute-comment/flightroute-comments.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {FlightrouteNameComponent} from './ng-components/flightroute-name/flightroute-name.component';
import {PlanRouteListStateModule} from '../../plan-route-list/state/plan-route-list-state.module';
import {FlightrouteDomainModule} from '../../flightroute/domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../../flightroute/rest/flightroute-rest.module';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {WaypointsTableComponent} from './ng-components/waypoints-table/waypoints-table.component';
import {EditWaypointDialogComponent} from './ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {EditWaypointFormComponent} from './ng-components/edit-waypoint-form/edit-waypoint-form.component';
import {PlanRouteListViewModule} from '../../plan-route-list/view/plan-route-list-view.module';
import {IconButtonComponent} from '../../common/view/ng-components/icon-button/icon-button.component';
import {SaveButtonComponent} from '../../common/view/ng-components/save-button/save-button.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule,
        ExporterViewModule,
        AircraftViewModule,
        FlightrouteDomainModule,
        FlightrouteRestModule,
        FlightrouteStateModule,
        PlanRouteListStateModule,
        GeoPhysicsViewModule,
        PlanRouteListViewModule,
        IconButtonComponent,
        SaveButtonComponent
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        FlightrouteAircraftSpeedComponent,
        FlightrouteNameComponent,
        FlightrouteCommentsComponent,
        WaypointsContainerComponent,
        WaypointsTableComponent,
    ],
    exports: [
        WaypointsContainerComponent,
    ],
    providers: []
})
export class PlanWaypointsViewModule {
}
