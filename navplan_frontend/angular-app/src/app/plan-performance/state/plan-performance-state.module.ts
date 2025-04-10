import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {planPerfReducer} from './ngrx/plan-perf.reducer';
import {PlanPerfEffects} from './ngrx/plan-perf.effects';
import {PlanPerformanceDomainModule} from '../domain/plan-performance-domain.module';


@NgModule({
    imports: [
        StoreModule.forFeature('planPerfState', planPerfReducer),
        EffectsModule.forFeature([
            PlanPerfEffects
        ]),
        PlanPerformanceDomainModule,
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PlanPerformanceStateModule {
}
