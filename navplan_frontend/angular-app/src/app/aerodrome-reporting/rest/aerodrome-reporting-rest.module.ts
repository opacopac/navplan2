import {NgModule} from '@angular/core';
import {ReportingPointRestAdapterService} from './adapter/reporting-point-rest-adapter.service';
import {IReportingPointRepoService} from '../domain/service/i-reporting-point-repo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IReportingPointRepoService, useClass: ReportingPointRestAdapterService},
    ]
})
export class AerodromeReportingRestModule {
}
