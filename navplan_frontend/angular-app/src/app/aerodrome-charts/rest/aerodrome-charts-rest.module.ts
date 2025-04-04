import {NgModule} from '@angular/core';
import {AirportChartRestAdapter} from './adapter/airport-chart-rest-adapter.service';
import {IAirportChartRepoService} from '../domain/service/i-airport-chart-repo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportChartRepoService, useClass: AirportChartRestAdapter},
    ]
})
export class AerodromeChartsRestModule {
}
