import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanTabsComponent} from './ng-components/plan-tabs/plan-tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PlanPerformanceViewModule} from '../../plan-performance/view/plan-performance-view.module';
import {PlanWnbViewModule} from '../../plan-wnb/view/plan-wnb-view.module';
import {PlanMeteoViewModule} from '../../plan-meteo/view/plan-meteo-view.module';
import {PlanTabStateModule} from '../state/plan-tab-state.module';
import {PlanRouteListViewModule} from '../../plan-route-list/view/plan-route-list-view.module';
import {PlanFuelViewModule} from '../../plan-fuel/view/plan-fuel-view.module';
import {PlanWaypointsViewModule} from '../../plan-waypoints/view/plan-waypoints-view.module';
import {FuelCalcContainerComponent} from '../../plan-fuel/view/ng-components/fuel-calc-container/fuel-calc-container.component';
import {PlanMeteoContainerComponent} from '../../plan-meteo/view/ng-components/plan-meteo-container/plan-meteo-container.component';


@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        PlanTabStateModule,
        PlanRouteListViewModule,
        PlanWaypointsViewModule,
        PlanFuelViewModule,
        PlanWnbViewModule,
        PlanPerformanceViewModule,
        PlanMeteoViewModule,
        FuelCalcContainerComponent,
        PlanMeteoContainerComponent,
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
