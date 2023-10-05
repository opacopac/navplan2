import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MeteoDwdEffects} from './ngrx/meteo-dwd.effects';
import {meteoDwdReducer} from './ngrx/meteo-dwd.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoDwdState', meteoDwdReducer),
        EffectsModule.forFeature([MeteoDwdEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class MeteoDwdStateModule {
}
