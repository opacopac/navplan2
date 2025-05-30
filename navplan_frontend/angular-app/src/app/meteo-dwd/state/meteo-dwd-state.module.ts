import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MeteoDwdEffects} from './ngrx/meteo-dwd.effects';
import {meteoDwdReducer} from './ngrx/meteo-dwd.reducer';
import {MeteoDwdDomainModule} from '../domain/meteo-dwd-domain.module';
import {MeteoDwdRestModule} from '../rest/meteo-dwd-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('meteoDwdState', meteoDwdReducer),
        EffectsModule.forFeature([MeteoDwdEffects]),
        MeteoDwdDomainModule,
        MeteoDwdRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MeteoDwdStateModule {
}
