import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonViewModule} from '../../common/view/common-view.module';
import {PlanTabsComponent} from './ng-components/plan-tabs/plan-tabs.component';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';
import {MatTabsModule} from '@angular/material/tabs';
import {PlanPerformanceViewModule} from '../../plan-performance/view/plan-performance-view.module';


@NgModule({
    imports: [
        CommonModule,
        CommonViewModule,
        MatTabsModule,
        FlightrouteViewModule,
        PlanPerformanceViewModule,
    ],
    declarations: [
        PlanTabsComponent
    ],
    exports: [
        PlanTabsComponent
    ],
    providers: []
})
export class PlanViewModule {
}
