import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {FlightPrepPageComponent} from './ng-components/flight-prep-page/flight-prep-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FlightPrepRouteMeteoModule} from '../flight-prep-route-meteo/flight-prep-route-meteo.module';
import {FlightPrepFuelCalcModule} from '../flight-prep-fuel-calc/flight-prep-fuel-calc.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MatTabsModule,
        FlightPrepFuelCalcModule,
        FlightPrepRouteMeteoModule,
        FlightrouteModule,
    ],
    declarations: [
        FlightPrepPageComponent,
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
