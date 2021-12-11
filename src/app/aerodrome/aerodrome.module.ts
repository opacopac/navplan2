import {NgModule} from '@angular/core';
import {IAirportService} from './domain-service/i-airport.service';
import {AirportService} from './domain-service/airport.service';
import {IAirportChartService} from './domain-service/i-airport-chart.service';
import {AirportChartService} from './domain-service/airport-chart.service';
import {IAirportCircuitService} from './domain-service/i-airport-circuit.service';
import {AirportCircuitService} from './domain-service/airport-circuit.service';
import {IReportingPointService} from './domain-service/i-reporting-point.service';
import {ReportingPointService} from './domain-service/reporting-point.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IAirportService, useClass: AirportService },
        { provide: IAirportChartService, useClass: AirportChartService },
        { provide: IAirportCircuitService, useClass: AirportCircuitService },
        { provide: IReportingPointService, useClass: ReportingPointService },
    ]
})
export class AerodromeModule {}
