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
import {FlightrouteContainerComponent} from './ng-components/plan-waypoints/flightroute-container/flightroute-container.component';
import {
    FlightrouteAircraftSpeedComponent
} from './ng-components/plan-waypoints/flightroute-aircraft-speed/flightroute-aircraft-speed.component';
import {FlightrouteCommentsComponent} from './ng-components/plan-waypoints/flightroute-comment/flightroute-comments.component';
import {RoutePickerListComponent} from './ng-components/common/route-picker-list/route-picker-list.component';
import {RoutePickerListDialogComponent} from './ng-components/common/route-picker-list-dialog/route-picker-list-dialog.component';
import {FlightrouteSaveComponent} from './ng-components/plan-waypoints/flightroute-save/flightroute-save.component';
import {WaypointsTableComponent} from './ng-components/plan-waypoints/waypoints-table/waypoints-table.component';
import {FuelCalcContainerComponent} from './ng-components/plan-fuel/fuel-calc-container/fuel-calc-container.component';
import {FuelCalcInputFieldsComponent} from './ng-components/plan-fuel/fuel-calc-input-fields/fuel-calc-input-fields.component';
import {FuelCalcTableComponent} from './ng-components/plan-fuel/fuel-calc-table/fuel-calc-table.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {RouteListPageComponent} from './ng-components/plan-route-list/route-list-page/route-list-page.component';
import {RouteListTableComponent} from './ng-components/plan-route-list/route-list-table/route-list-table.component';
import {
    RouteDeleteConfirmDialogComponent
} from './ng-components/plan-route-list/route-delete-confirm-dialog/route-delete-confirm-dialog.component';
import {MatIcon} from '@angular/material/icon';
import {RouteCreateFormDialogComponent} from './ng-components/plan-route-list/route-create-form-dialog/route-create-form-dialog.component';
import {RoutePickerContainerComponent} from './ng-components/common/route-picker-container/route-picker-container.component';
import {RoutePickerComponent} from './ng-components/common/route-picker/route-picker.component';
import {FlightrouteNameComponent} from './ng-components/plan-waypoints/flightroute-name/flightroute-name.component';
import {FuelSaveComponent} from './ng-components/plan-fuel/fuel-save/fuel-save.component';


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
        MatIcon,
    ],
    declarations: [
        EditWaypointDialogComponent,
        EditWaypointFormComponent,
        FlightrouteContainerComponent,
        FlightrouteAircraftSpeedComponent,
        FlightrouteNameComponent,
        FlightrouteCommentsComponent,
        RoutePickerListComponent,
        RoutePickerListDialogComponent,
        FlightrouteSaveComponent,
        WaypointsTableComponent,
        FuelCalcContainerComponent,
        FuelCalcInputFieldsComponent,
        FuelCalcTableComponent,
        FuelSaveComponent,
        RouteListPageComponent,
        RouteListTableComponent,
        RouteCreateFormDialogComponent,
        RouteDeleteConfirmDialogComponent,
        RoutePickerContainerComponent,
        RoutePickerComponent
    ],
    exports: [
        FuelCalcContainerComponent,
        FlightrouteContainerComponent,
        RouteListPageComponent,
        RoutePickerContainerComponent
    ],
    providers: []
})
export class FlightrouteViewModule {
}
