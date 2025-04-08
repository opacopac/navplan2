import {NgModule} from '@angular/core';
import {ReportingPointRestAdapterService} from './adapter/reporting-point-rest-adapter.service';
import {IReportingPointRepoService} from '../domain/service/i-reporting-point-repo.service';
import {AerodromeReportingDomainModule} from '../domain/aerodrome-reporting-domain.module';


@NgModule({
    imports: [
        AerodromeReportingDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IReportingPointRepoService, useClass: ReportingPointRestAdapterService},
    ]
})
export class AerodromeReportingRestModule {
}
