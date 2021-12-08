import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../common/shared.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc-container/fuel-calc-container.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc-table/fuel-calc-table.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FlightrouteModule,
    ],
    declarations: [
        FuelCalcContainerComponent,
        FuelCalcTableComponent,
    ],
    exports: [
        FuelCalcContainerComponent
    ],
    providers: [
    ],
    entryComponents: [
    ],
})
export class FlightPrepFuelCalcModule {}
