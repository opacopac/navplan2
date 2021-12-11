import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metarTafReducer} from './ngrx/metar-taf.reducer';
import {MetarTafEffects} from './ngrx/metar-taf.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class MetarTafStateModule {
}
