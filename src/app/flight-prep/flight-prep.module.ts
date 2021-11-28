import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../common/shared.module';
import {FlightPrepPageComponent} from './ng-components/flight-prep-page/flight-prep-page.component';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {MatTabsModule} from '@angular/material/tabs';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc-container/fuel-calc-container.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc-table/fuel-calc-table.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        FlightrouteModule,
        MatTabsModule
    ],
    declarations: [
        FlightPrepPageComponent,
        FuelCalcContainerComponent,
        FuelCalcTableComponent
    ],
    exports: [
        FlightPrepPageComponent
    ],
    providers: [
    ],
    entryComponents: [
    ],
})
export class FlightPrepModule {}
