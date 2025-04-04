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
import {WaypointsContainerComponent} from './ng-components/waypoints-container/waypoints-container.component';
import {FlightrouteAircraftSpeedComponent} from './ng-components/flightroute-aircraft-speed/flightroute-aircraft-speed.component';
import {FlightrouteCommentsComponent} from './ng-components/flightroute-comment/flightroute-comments.component';
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
import {FlightrouteNameComponent} from './ng-components/flightroute-name/flightroute-name.component';
import {PlanRouteListStateModule} from '../../plan-route-list/state/plan-route-list-state.module';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';
import {FlightrouteDomainModule} from '../../flightroute/domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../../flightroute/rest/flightroute-rest.module';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {WaypointsTableComponent} from './ng-components/waypoints-table/waypoints-table.component';


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
        FlightrouteViewModule
    ],
    declarations: [
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
