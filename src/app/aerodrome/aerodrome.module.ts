import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {AirportRestService} from './rest-service/airport-rest.service';
import {AirportCircuitRestService} from './rest-service/airport-circuit-rest.service';
import {AirportChartRestService} from './rest-service/airport-chart-rest.service';
import {ReportingPointRestService} from './rest-service/reporting-point-rest.service';
import {IAirportRepo} from './domain-service/i-airport-repo';
import {IReportingPointRepo} from './domain-service/i-reporting-point-repo';
import {IAirportCircuitRepo} from './domain-service/i-airport-circuit-repo';
import {IAirportChartRepo} from './domain-service/i-airport-chart-repo';


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
        { provide: IAirportRepo, useClass: AirportRestService },
        { provide: IAirportCircuitRepo, useClass: AirportCircuitRestService },
        { provide: IAirportChartRepo, useClass: AirportChartRestService },
        { provide: IReportingPointRepo, useClass: ReportingPointRestService },
    ]
})
export class AerodromeModule {}
