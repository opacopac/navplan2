import {NgModule} from '@angular/core';
import {IReportingPointService} from './service/i-reporting-point.service';
import {ReportingPointService} from './service/reporting-point.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IReportingPointService, useClass: ReportingPointService},
    ]
})
export class AerodromeReportingDomainModule {
}
