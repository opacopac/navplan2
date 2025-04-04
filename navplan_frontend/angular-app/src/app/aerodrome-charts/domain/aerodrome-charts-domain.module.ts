import {NgModule} from '@angular/core';
import {IAirportChartService} from './service/i-airport-chart.service';
import {AirportChartService} from './service/airport-chart.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportChartService, useClass: AirportChartService},
    ]
})
export class AerodromeChartsDomainModule {
}
