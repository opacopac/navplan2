import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {meteoGramReducer} from './ngrx/meteo-gram.reducer';
import {MeteoGramEffects} from './ngrx/meteo-gram.effects';
import {MeteoGramDomainModule} from '../domain/meteo-gram-domain.module';
import {MeteoGramRestModule} from '../rest/meteo-gram-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoGramState', meteoGramReducer),
        EffectsModule.forFeature([MeteoGramEffects]),
        MeteoGramDomainModule,
        MeteoGramRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoGramStateModule {
}
