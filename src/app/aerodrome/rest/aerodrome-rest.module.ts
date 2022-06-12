import {NgModule} from '@angular/core';
import {AirportRestService} from './service/airport-rest.service';
import {AirportCircuitRestService} from './service/airport-circuit-rest.service';
import {ReportingPointRestService} from './service/reporting-point-rest.service';
import {AirportChartRestService} from './service/airport-chart-rest.service';
import {IAirportRepoService} from '../domain/service/i-airport-repo.service';
import {IAirportCircuitRepoService} from '../domain/service/i-airport-circuit-repo.service';
import {IAirportChartRepoService} from '../domain/service/i-airport-chart-repo.service';
import {IReportingPointRepoService} from '../domain/service/i-reporting-point-repo.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IAirportRepoService, useClass: AirportRestService },
        { provide: IAirportCircuitRepoService, useClass: AirportCircuitRestService },
        { provide: IAirportChartRepoService, useClass: AirportChartRestService },
        { provide: IReportingPointRepoService, useClass: ReportingPointRestService },
    ]
})
export class AerodromeRestModule {}
