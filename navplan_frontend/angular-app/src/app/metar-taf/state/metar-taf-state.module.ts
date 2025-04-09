import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metarTafReducer} from './ngrx/metar-taf.reducer';
import {MetarTafEffects} from './ngrx/metar-taf.effects';
import {MetarTafDomainModule} from '../domain/metar-taf-domain.module';
import {MetarTafRestModule} from '../rest/metar-taf-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
        MetarTafDomainModule,
        MetarTafRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MetarTafStateModule {
}
