import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {navaidReducer} from './ngrx/navaid.reducer';
import {NavaidEffects} from './ngrx/navaid.effects';
import {NavaidDomainModule} from '../domain/navaid-domain.module';
import {NavaidRestModule} from '../rest/navaid-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('navaidState', navaidReducer),
        EffectsModule.forFeature([NavaidEffects]),
        NavaidDomainModule,
        NavaidRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class NavaidStateModule {
}
