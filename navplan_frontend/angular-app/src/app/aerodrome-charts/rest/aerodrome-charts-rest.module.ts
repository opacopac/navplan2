import {NgModule} from '@angular/core';
import {AirportChartRestAdapter} from './adapter/airport-chart-rest-adapter.service';
import {IAirportChartRepoService} from '../domain/service/i-airport-chart-repo.service';
import {AerodromeChartsDomainModule} from '../domain/aerodrome-charts-domain.module';


@NgModule({
    imports: [
        AerodromeChartsDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportChartRepoService, useClass: AirportChartRestAdapter},
    ]
})
export class AerodromeChartsRestModule {
}
