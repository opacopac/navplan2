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
import {FuelCalcContainerComponent} from './ng-components/plan-fuel/fuel-calc-container/fuel-calc-container.component';
import {
    FuelCalcInputFieldsComponent
} from './ng-components/plan-fuel/fuel-calc-input-fields/fuel-calc-input-fields.component';
import {FuelCalcTableComponent} from './ng-components/plan-fuel/fuel-calc-table/fuel-calc-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ToggleManualAircraft} from './ng-components/common/toggle-manual-aircraft/toggle-manual-aircraft.component';
import {
    FlightrouteDeleteConfirmDialogComponent
} from './ng-components/plan-route/flightroute-delete-confirm-dialog/flightroute-delete-confirm-dialog.component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {PlanPerformanceViewModule} from '../../plan-performance/view/plan-performance-view.module';


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
        MatRadioButton,
        MatRadioGroup,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        PlanPerformanceViewModule,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        ToggleManualAircraft,
        FlightrouteContainerComponent,
        FlightrouteAircraftSpeedComponent,
        FlightrouteCommentsComponent,
        FlightrouteListComponent,
        FlightrouteListDialogComponent,
        FlightrouteDeleteConfirmDialogComponent,
        FlightrouteNameLoadSaveComponent,
        WaypointListComponent,
        FuelCalcContainerComponent,
        FuelCalcInputFieldsComponent,
        FuelCalcTableComponent
    ],
    exports: [
        FuelCalcContainerComponent,
        FlightrouteContainerComponent
    ],
    providers: []
})
export class FlightrouteViewModule {
}
