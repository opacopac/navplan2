import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {navaidReducer} from './ngrx/navaid.reducer';
import {NavaidEffects} from './ngrx/navaid.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('navaidState', navaidReducer),
        EffectsModule.forFeature([NavaidEffects]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class NavaidStateModule {
}
