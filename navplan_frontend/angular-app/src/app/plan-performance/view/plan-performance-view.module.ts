import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonViewModule} from '../../common/view/common-view.module';
import {PlanPerfContainerComponent} from './ng-components/plan-perf-container/plan-perf-container.component';
import {PlanPerfRunwayComponent} from './ng-components/plan-perf-runway/plan-perf-runway.component';
import {
    PlanPerfDepartureCalculationComponent
} from './ng-components/plan-perf-departure-calculation/plan-perf-departure-calculation.component';
import {
    PlanPerfCorrectionFactorsComponent
} from './ng-components/plan-perf-correction-factors/plan-perf-correction-factors.component';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {
    PlanPerfWeatherFactorsComponent
} from './ng-components/plan-perf-weather-factors/plan-perf-weather-factors.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        AircraftViewModule,
        MatRadioModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAccordion,
        MatExpansionModule,
        MatInputModule
    ],
    declarations: [
        PlanPerfContainerComponent,
        PlanPerfRunwayComponent,
        PlanPerfDepartureCalculationComponent,
        PlanPerfCorrectionFactorsComponent,
        PlanPerfWeatherFactorsComponent
    ],
    exports: [
        PlanPerfContainerComponent,
    ],
    providers: []
})
export class PlanPerformanceViewModule {
}
