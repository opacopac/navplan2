import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {meteoSmaReducer} from './ngrx/meteo-sma.reducer';
import {MeteoSmaEffects} from './ngrx/meteo-sma.effects';
import {MeteoSmaDomainModule} from '../domain/meteo-sma-domain.module';
import {MeteoSmaRestModule} from '../rest/meteo-sma-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoSmaState', meteoSmaReducer),
        EffectsModule.forFeature([MeteoSmaEffects]),
        MeteoSmaDomainModule,
        MeteoSmaRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoSmaStateModule {
}
