import {NgModule} from '@angular/core';
import {IAirportService} from './service/i-airport.service';
import {AirportService} from './service/airport.service';
import {IReportingPointService} from './service/i-reporting-point.service';
import {ReportingPointService} from './service/reporting-point.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportService, useClass: AirportService},
        {provide: IReportingPointService, useClass: ReportingPointService},
    ]
})
export class AerodromeDomainModule {
}
