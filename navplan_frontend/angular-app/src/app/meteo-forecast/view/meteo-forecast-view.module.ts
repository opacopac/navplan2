import {NgModule} from '@angular/core';
import {MeteoForecastStateModule} from '../state/meteo-forecast-state.module';
import {MeteoForecastDomainModule} from '../domain/meteo-forecast-domain.module';


@NgModule({
    imports: [
        MeteoForecastDomainModule,
        MeteoForecastStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoForecastViewModule {
}
