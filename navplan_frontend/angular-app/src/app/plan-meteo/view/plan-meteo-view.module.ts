import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouteMeteoContainerComponent} from './ng-components/route-meteo-container/route-meteo-container.component';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {FlightPlanMeteoStateModule} from '../state/flight-plan-meteo-state.module';
import {FlightPlanMeteoDomainModule} from '../domain/flight-plan-meteo-domain.module';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {RouteMeteoTableComponent} from './ng-components/route-meteo-table/route-meteo-table.component';
import {RouteMeteoRadiusComponent} from './ng-components/route-meteo-radius/route-meteo-radius.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';


@NgModule({
    imports: [
        CommonModule,
        FlightPlanMeteoDomainModule,
        FlightPlanMeteoStateModule,
        FlightrouteStateModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MetarTafViewModule,
    ],
    declarations: [
        RouteMeteoContainerComponent,
        RouteMeteoTableComponent,
        RouteMeteoRadiusComponent
    ],
    exports: [
        RouteMeteoContainerComponent
    ],
    providers: []
})
export class PlanMeteoViewModule {
}
