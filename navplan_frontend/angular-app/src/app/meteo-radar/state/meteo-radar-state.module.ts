import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {meteoRadarReducer} from './model/meteo-radar.reducer';
import {MeteoRadarEffects} from './model/meteo-radar-effects.service';
import {MeteoRadarDomainModule} from '../domain/meteo-radar-domain.module';
import {MeteoRadarRestModule} from '../rest/meteo-radar-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoRadarState', meteoRadarReducer),
        EffectsModule.forFeature([MeteoRadarEffects]),
        MeteoRadarDomainModule,
        MeteoRadarRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoRadarStateModule {
}
