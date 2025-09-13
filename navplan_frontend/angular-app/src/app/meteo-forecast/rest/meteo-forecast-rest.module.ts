import {NgModule} from '@angular/core';
import {RestMeteoForecastService} from './service/rest-meteo-forecast.service';
import {IMeteoForecastService} from '../domain/service/i-meteo-forecast.service';
import {MeteoForecastDomainModule} from '../domain/meteo-forecast-domain.module';


@NgModule({
    imports: [
        MeteoForecastDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IMeteoForecastService, useClass: RestMeteoForecastService},
    ]
})
export class MeteoForecastRestModule {
}
