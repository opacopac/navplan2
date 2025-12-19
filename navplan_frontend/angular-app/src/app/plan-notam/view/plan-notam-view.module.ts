import {NgModule} from '@angular/core';
import {PlanNotamStateModule} from '../state/plan-notam-state.module';
import {PlanNotamDomainModule} from '../domain/plan-notam-domain.module';


@NgModule({
    imports: [
        PlanNotamDomainModule,
        PlanNotamStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class PlanNotamViewModule {
}
