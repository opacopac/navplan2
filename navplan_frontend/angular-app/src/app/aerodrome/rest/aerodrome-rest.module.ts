import {NgModule} from '@angular/core';
import {AirportRestAdapterService} from './adapter/airport-rest-adapter.service';
import {ReportingPointRestAdapterService} from './adapter/reporting-point-rest-adapter.service';
import {AirportChartRestAdapter} from './adapter/airport-chart-rest-adapter.service';
import {IAirportRepoService} from '../domain/service/i-airport-repo.service';
import {IAirportChartRepoService} from '../domain/service/i-airport-chart-repo.service';
import {IReportingPointRepoService} from '../domain/service/i-reporting-point-repo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportRepoService, useClass: AirportRestAdapterService},
        {provide: IAirportChartRepoService, useClass: AirportChartRestAdapter},
        {provide: IReportingPointRepoService, useClass: ReportingPointRestAdapterService},
    ]
})
export class AerodromeRestModule {
}
