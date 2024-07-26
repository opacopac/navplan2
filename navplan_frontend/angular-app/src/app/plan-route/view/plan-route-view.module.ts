import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanPageComponent} from './ng-components/plan-page/plan-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PlanMeteoViewModule} from '../../plan-meteo/view/plan-meteo-view.module';
import {ExporterViewModule} from '../../exporter/view/exporter-view.module';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';
import {TrafficViewModule} from '../../plan-fuel/view/plan-fuel-view.module';
import {FlightrouteContainerComponent} from './ng-components/flightroute-container/flightroute-container.component';
import {
    FlightrouteAircraftSpeedComponent
} from './ng-components/flightroute-aircraft-speed/flightroute-aircraft-speed.component';
import {FlightrouteCommentsComponent} from './ng-components/flightroute-comment/flightroute-comments.component';
import {FlightrouteListComponent} from './ng-components/flightroute-list/flightroute-list.component';
import {
    FlightrouteListDialogComponent
} from './ng-components/flightroute-list-dialog/flightroute-list-dialog.component';
import {
    FlightrouteNameLoadSaveComponent
} from './ng-components/flightroute-name-load-save/flightroute-name-load-save.component';
import {WaypointListComponent} from './ng-components/waypoint-list/waypoint-list.component';
import {MatButtonModule} from '@angular/material/button';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';


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
        FlightrouteViewModule,
        PlanMeteoViewModule,
        ExporterViewModule,
        TrafficViewModule,
        MatTabsModule
    ],
    declarations: [
        PlanPageComponent,
        FlightrouteContainerComponent,
        FlightrouteAircraftSpeedComponent,
        FlightrouteCommentsComponent,
        FlightrouteListComponent,
        FlightrouteListDialogComponent,
        FlightrouteNameLoadSaveComponent,
        WaypointListComponent,
    ],
    exports: [
        PlanPageComponent,
    ],
    providers: []
})
export class PlanRouteViewModule {
}
