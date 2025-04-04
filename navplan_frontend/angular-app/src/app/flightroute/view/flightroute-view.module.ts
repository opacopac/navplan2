import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightrouteStateModule} from '../state/flightroute-state.module';
import {FlightrouteDomainModule} from '../domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../rest/flightroute-rest.module';
import {EditWaypointDialogComponent} from './ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {EditWaypointFormComponent} from './ng-components/edit-waypoint-form/edit-waypoint-form.component';
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
import {RoutePickerListComponent} from './ng-components/route-picker-list/route-picker-list.component';
import {RoutePickerListDialogComponent} from './ng-components/route-picker-list-dialog/route-picker-list-dialog.component';
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
import {MatIcon} from '@angular/material/icon';
import {RoutePickerContainerComponent} from './ng-components/route-picker-container/route-picker-container.component';
import {RoutePickerComponent} from './ng-components/route-picker/route-picker.component';
import {PlanRouteListStateModule} from '../../plan-route-list/state/plan-route-list-state.module';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        FlightrouteDomainModule,
        FlightrouteRestModule,
        FlightrouteStateModule,
        PlanRouteListStateModule,
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
        RoutePickerListComponent,
        RoutePickerListDialogComponent,
        RoutePickerContainerComponent,
        RoutePickerComponent
    ],
    exports: [
        RoutePickerContainerComponent
    ],
    providers: []
})
export class FlightrouteViewModule {
}
