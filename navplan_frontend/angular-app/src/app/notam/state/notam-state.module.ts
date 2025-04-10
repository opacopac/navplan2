import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {notamReducer} from './ngrx/notam.reducer';
import {NotamEffects} from './ngrx/notam.effects';
import {NotamDomainModule} from '../domain/notam-domain.module';
import {NotamRestModule} from '../rest/notam-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
        NotamDomainModule,
        NotamRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class NotamStateModule {
}
