import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MeteoForecastEffects} from './ngrx/meteo-forecast-effects.service';
import {meteoForecastReducer} from './ngrx/meteo-forecast.reducer';
import {MeteoForecastDomainModule} from '../domain/meteo-forecast-domain.module';
import {MeteoForecastRestModule} from '../rest/meteo-forecast-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoForecastState', meteoForecastReducer),
        EffectsModule.forFeature([MeteoForecastEffects]),
        MeteoForecastDomainModule,
        MeteoForecastRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoForecastStateModule {
}
