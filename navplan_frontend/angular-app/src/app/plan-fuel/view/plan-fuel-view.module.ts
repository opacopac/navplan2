import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {CommonViewModule} from '../../common/view/common-view.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {ExporterViewModule} from '../../exporter/view/exporter-view.module';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc-container/fuel-calc-container.component';
import {FuelCalcInputFieldsComponent} from './ng-components/fuel-calc-input-fields/fuel-calc-input-fields.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc-table/fuel-calc-table.component';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {PlanRouteListStateModule} from '../../plan-route-list/state/plan-route-list-state.module';
import {FlightrouteDomainModule} from '../../flightroute/domain/flightroute-domain.module';
import {FlightrouteRestModule} from '../../flightroute/rest/flightroute-rest.module';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {PlanRouteListViewModule} from '../../plan-route-list/view/plan-route-list-view.module';
import {SaveButtonComponent} from '../../common/view/ng-components/save-button/save-button.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        AircraftViewModule,
        FlightrouteDomainModule,
        FlightrouteRestModule,
        FlightrouteStateModule,
        PlanRouteListStateModule,
        GeoPhysicsViewModule,
        ReactiveFormsModule,
        ExporterViewModule,
        PlanRouteListViewModule,
        SaveButtonComponent
    ],
    declarations: [
        FuelCalcContainerComponent,
        FuelCalcInputFieldsComponent,
        FuelCalcTableComponent,
    ],
    exports: [
        FuelCalcContainerComponent,
    ],
    providers: []
})
export class PlanFuelViewModule {
}
