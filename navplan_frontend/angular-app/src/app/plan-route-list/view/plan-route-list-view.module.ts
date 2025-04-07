import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ExporterViewModule} from '../../exporter/view/exporter-view.module';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {RouteListPageComponent} from './ng-components/route-list-page/route-list-page.component';
import {RouteListTableComponent} from './ng-components/route-list-table/route-list-table.component';
import {RouteDeleteConfirmDialogComponent} from './ng-components/route-delete-confirm-dialog/route-delete-confirm-dialog.component';
import {RouteCreateFormDialogComponent} from './ng-components/route-create-form-dialog/route-create-form-dialog.component';
import {PlanRouteListStateModule} from '../state/plan-route-list-state.module';
import {FlightrouteDomainModule} from '../../flightroute/domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../../flightroute/rest/flightroute-rest.module';
import {RoutePickerListComponent} from './ng-components/route-picker-list/route-picker-list.component';
import {RoutePickerListDialogComponent} from './ng-components/route-picker-list-dialog/route-picker-list-dialog.component';
import {RoutePickerContainerComponent} from './ng-components/route-picker-container/route-picker-container.component';
import {RoutePickerComponent} from './ng-components/route-picker/route-picker.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
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
