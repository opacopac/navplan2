import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonViewModule} from '../../common/view/common-view.module';
import {PlanPerfContainerComponent} from './ng-components/plan-perf-container/plan-perf-container.component';
import {PlanPerfAirpportComponent} from './ng-components/plan-perf-airport/plan-perf-airpport.component';
import {PlanPerfCalculationComponent} from './ng-components/plan-perf-calculation/plan-perf-calculation.component';
import {
    PlanPerfRunwayFactorsComponent
} from './ng-components/plan-perf-runway-factors/plan-perf-runway-factors.component';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {
    PlanPerfWeatherFactorsComponent
} from './ng-components/plan-perf-weather-factors/plan-perf-weather-factors.component';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {PlanPerformanceStateModule} from '../state/plan-performance-state.module';
import {PlanPerformanceDomainModule} from '../domain/plan-performance-domain.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PlanPerfTakeoffChartComponent} from './ng-components/plan-perf-takeoff-chart/plan-perf-takeoff-chart.component';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        PlanPerformanceDomainModule,
        PlanPerformanceStateModule,
        AircraftViewModule,
        MatRadioModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAccordion,
        MatExpansionModule,
        MatInputModule,
        MatOption,
        MatSelect,
    ],
    declarations: [
        PlanPerfContainerComponent,
        PlanPerfAirpportComponent,
        PlanPerfCalculationComponent,
        PlanPerfRunwayFactorsComponent,
        PlanPerfWeatherFactorsComponent,
        PlanPerfTakeoffChartComponent
    ],
    exports: [
        PlanPerfContainerComponent,
    ],
    providers: []
})
export class PlanPerformanceViewModule {
}
