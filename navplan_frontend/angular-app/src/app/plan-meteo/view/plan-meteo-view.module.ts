import {NgModule} from '@angular/core';
import {PlanMeteoDomainModule} from '../domain/plan-meteo-domain.module';
import {PlanMeteoStateModule} from '../state/plan-meteo-state.module';


@NgModule({
    imports: [
        PlanMeteoDomainModule,
        PlanMeteoStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class PlanMeteoViewModule {
}
