import {NgModule} from '@angular/core';
import {AirportRestService} from './rest-service/airport-rest.service';
import {AirportCircuitRestService} from './rest-service/airport-circuit-rest.service';
import {ReportingPointRestService} from './rest-service/reporting-point-rest.service';
import {AirportChartRestService} from './rest-service/airport-chart-rest.service';
import {IAirportRepoService} from '../aerodrome/domain-service/i-airport-repo.service';
import {IAirportCircuitRepoService} from '../aerodrome/domain-service/i-airport-circuit-repo.service';
import {IAirportChartRepoService} from '../aerodrome/domain-service/i-airport-chart-repo.service';
import {IReportingPointRepoService} from '../aerodrome/domain-service/i-reporting-point-repo.service';


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
