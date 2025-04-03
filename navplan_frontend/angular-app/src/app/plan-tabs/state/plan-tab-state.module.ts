import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {planTabReducer} from './ngrx/plan-tab.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('planTabState', planTabReducer),
        EffectsModule.forFeature([]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PlanTabStateModule {
}
