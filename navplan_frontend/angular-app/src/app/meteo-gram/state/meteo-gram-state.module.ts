import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {meteoGramReducer} from './ngrx/meteo-gram.reducer';
import {MeteoGramEffects} from './ngrx/meteo-gram.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoGramState', meteoGramReducer),
        EffectsModule.forFeature([MeteoGramEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class MeteoGramStateModule {
}
