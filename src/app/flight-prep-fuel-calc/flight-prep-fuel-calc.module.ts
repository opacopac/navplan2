import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../common/shared.module';
import {FuelCalcContainerComponent} from './ng-components/fuel-calc-container/fuel-calc-container.component';
import {FuelCalcTableComponent} from './ng-components/fuel-calc-table/fuel-calc-table.component';
import {FlightrouteStateModule} from '../flightroute-state/flightroute-state.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FlightrouteStateModule,
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
