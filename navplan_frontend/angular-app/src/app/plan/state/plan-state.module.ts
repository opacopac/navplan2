import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {planReducer} from './ngrx/plan.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('planState', planReducer),
        EffectsModule.forFeature([]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PlanStateModule {
}
