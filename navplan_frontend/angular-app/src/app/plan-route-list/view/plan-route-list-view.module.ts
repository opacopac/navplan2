import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {RouteListPageComponent} from './ng-components/route-list-page/route-list-page.component';
import {RouteListTableComponent} from './ng-components/route-list-table/route-list-table.component';
import {
    RouteDeleteConfirmDialogComponent
} from './ng-components/route-delete-confirm-dialog/route-delete-confirm-dialog.component';
import {MatIcon} from '@angular/material/icon';
import {
    RouteCreateFormDialogComponent
} from './ng-components/route-create-form-dialog/route-create-form-dialog.component';
import {PlanRouteListStateModule} from '../state/plan-route-list-state.module';
import {FlightrouteDomainModule} from '../../flightroute/domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../../flightroute/rest/flightroute-rest.module';
import {RoutePickerListComponent} from './ng-components/route-picker-list/route-picker-list.component';
import {
    RoutePickerListDialogComponent
} from './ng-components/route-picker-list-dialog/route-picker-list-dialog.component';
import {RoutePickerContainerComponent} from './ng-components/route-picker-container/route-picker-container.component';
import {RoutePickerComponent} from './ng-components/route-picker/route-picker.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
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
        MatSlideToggleModule,
        MatRadioButton,
        MatRadioGroup,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIcon,
        MatTabsModule,
        MatDialogModule,
        GeoPhysicsViewModule,
        FlightrouteDomainModule,
        FlightrouteRestModule,
        PlanRouteListStateModule,
        ExporterViewModule,
        AircraftViewModule,
    ],
    declarations: [
        RouteCreateFormDialogComponent,
        RouteDeleteConfirmDialogComponent,
        RouteListPageComponent,
        RouteListTableComponent,
        RoutePickerComponent,
        RoutePickerContainerComponent,
        RoutePickerListComponent,
        RoutePickerListDialogComponent,
    ],
    exports: [
        RouteListPageComponent,
        RoutePickerContainerComponent,
    ],
    providers: []
})
export class PlanRouteListViewModule {
}
