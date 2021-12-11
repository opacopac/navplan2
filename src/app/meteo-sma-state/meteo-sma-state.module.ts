import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {meteoSmaReducer} from './ngrx/meteo-sma.reducer';
import {MeteoSmaEffects} from './ngrx/meteo-sma.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoSmaState', meteoSmaReducer),
        EffectsModule.forFeature([MeteoSmaEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class MeteoSmaStateModule {
}
