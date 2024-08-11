import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightrouteStateModule} from '../state/flightroute-state.module';
import {FlightrouteDomainModule} from '../domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../rest/flightroute-rest.module';
import {EditWaypointDialogComponent} from './ng-components/common/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {EditWaypointFormComponent} from './ng-components/common/edit-waypoint-form/edit-waypoint-form.component';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {ExporterViewModule} from '../../exporter/view/exporter-view.module';
import {MatTabsModule} from '@angular/material/tabs';
import {PlanPageComponent} from './ng-components/plan-page/plan-page.component';
import {
    FlightrouteContainerComponent
} from './ng-components/plan-route/flightroute-container/flightroute-container.component';
import {
    FlightrouteAircraftSpeedComponent
} from './ng-components/plan-route/flightroute-aircraft-speed/flightroute-aircraft-speed.component';
import {
    FlightrouteCommentsComponent
} from './ng-components/plan-route/flightroute-comment/flightroute-comments.component';
import {FlightrouteListComponent} from './ng-components/plan-route/flightroute-list/flightroute-list.component';
import {
    FlightrouteListDialogComponent
} from './ng-components/plan-route/flightroute-list-dialog/flightroute-list-dialog.component';
import {
    FlightrouteNameLoadSaveComponent
} from './ng-components/plan-route/flightroute-name-load-save/flightroute-name-load-save.component';
import {WaypointListComponent} from './ng-components/plan-route/waypoint-list/waypoint-list.component';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';
import {
    RouteMeteoContainerComponent
} from './ng-components/plan-meteo/route-meteo-container/route-meteo-container.component';
import {RouteMeteoTableComponent} from './ng-components/plan-meteo/route-meteo-table/route-meteo-table.component';
import {RouteMeteoRadiusComponent} from './ng-components/plan-meteo/route-meteo-radius/route-meteo-radius.component';
import {FuelCalcContainerComponent} from './ng-components/plan-fuel/fuel-calc-container/fuel-calc-container.component';
import {
    FuelCalcInputFieldsComponent
} from './ng-components/plan-fuel/fuel-calc-input-fields/fuel-calc-input-fields.component';
import {FuelCalcTableComponent} from './ng-components/plan-fuel/fuel-calc-table/fuel-calc-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ToggleManualAircraft} from './ng-components/common/toggle-manual-aircraft/toggle-manual-aircraft.component';
import {PlanWnbContainerComponent} from './ng-components/plan-wnb/plan-wnb-container/plan-wnb-container.component';
import {PlanWnbTableComponent} from './ng-components/plan-wnb/plan-wnb-table/plan-wnb-table.component';
import { PlanPerfContainerComponent } from './ng-components/plan-perf/plan-perf-container.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        FlightrouteDomainModule,
        FlightrouteRestModule,
        FlightrouteStateModule,
        GeoPhysicsViewModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSelectModule,
        MatCardModule,
        ExporterViewModule,
        MatTabsModule,
        MetarTafViewModule,
        MatDialogModule,
        AircraftViewModule,
        MatSlideToggleModule,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        ToggleManualAircraft,
        PlanPageComponent,
        FlightrouteContainerComponent,
        FlightrouteAircraftSpeedComponent,
        FlightrouteCommentsComponent,
        FlightrouteListComponent,
        FlightrouteListDialogComponent,
        FlightrouteNameLoadSaveComponent,
        WaypointListComponent,
        FuelCalcContainerComponent,
        FuelCalcInputFieldsComponent,
        FuelCalcTableComponent,
        PlanWnbContainerComponent,
        PlanWnbTableComponent,
        PlanPerfContainerComponent,
        RouteMeteoContainerComponent,
        RouteMeteoTableComponent,
        RouteMeteoRadiusComponent
    ],
    exports: [
        PlanPageComponent,
        RouteMeteoContainerComponent
    ],
    providers: []
})
export class FlightrouteViewModule {
}
