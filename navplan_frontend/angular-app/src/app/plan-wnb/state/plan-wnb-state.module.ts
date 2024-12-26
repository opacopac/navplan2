import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {planWnbReducer} from './ngrx/plan-wnb.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('planWnbState', planWnbReducer),
        EffectsModule.forFeature([]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PlanWnbStateModule {
}
