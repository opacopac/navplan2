import {NgModule} from '@angular/core';
import {PlanPerformanceStateModule} from '../state/plan-performance-state.module';
import {PlanPerformanceDomainModule} from '../domain/plan-performance-domain.module';


@NgModule({
    imports: [
        PlanPerformanceDomainModule,
        PlanPerformanceStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class PlanPerformanceViewModule {
}
