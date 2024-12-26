import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {planPerfReducer} from './ngrx/plan-perf.reducer';
import {PlanPerfEffects} from './ngrx/plan-perf.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('planPerfState', planPerfReducer),
        EffectsModule.forFeature([
            PlanPerfEffects
        ]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PlanPerformanceStateModule {
}
