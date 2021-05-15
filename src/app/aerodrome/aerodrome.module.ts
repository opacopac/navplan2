import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {AirportRestService} from './rest-service/airport-rest.service';
import {AirportService} from './domain-service/airport.service';
import {AirportCircuitRestService} from './rest-service/airport-circuit-rest.service';
import {AirportChartRestService} from './rest-service/airport-chart-rest.service';
import {ReportingPointRestService} from './rest-service/reporting-point-rest.service';
import {AirportCircuitService} from './domain-service/airport-circuit.service';
import {AirportChartService} from './domain-service/airport-chart.service';
import {ReportingPointService} from './domain-service/reporting-point.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AirportService,
        AirportRestService,
        AirportCircuitService,
        AirportCircuitRestService,
        AirportChartService,
        AirportChartRestService,
        ReportingPointService,
        ReportingPointRestService
    ]
})
export class AerodromeModule {}
