import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightPrepPageComponent} from './ng-components/flight-prep-page/flight-prep-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {RouteMeteoViewModule} from '../route-meteo-view/route-meteo-view.module';
import {ExporterViewModule} from '../exporter-view/exporter-view.module';
import {FlightrouteViewModule} from '../flightroute-view/flightroute-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        FlightrouteViewModule,
        RouteMeteoViewModule,
        ExporterViewModule,
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
export class FlightPrepViewModule {}
