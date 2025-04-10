import {NgModule} from '@angular/core';
import {PlanPerformanceViewModule} from '../../plan-performance/view/plan-performance-view.module';
import {PlanWnbViewModule} from '../../plan-wnb/view/plan-wnb-view.module';
import {PlanMeteoViewModule} from '../../plan-meteo/view/plan-meteo-view.module';
import {PlanTabStateModule} from '../state/plan-tab-state.module';
import {PlanRouteListViewModule} from '../../plan-route-list/view/plan-route-list-view.module';
import {PlanFuelViewModule} from '../../plan-fuel/view/plan-fuel-view.module';
import {PlanWaypointsViewModule} from '../../plan-waypoints/view/plan-waypoints-view.module';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';


@NgModule({
    imports: [
        PlanTabStateModule,
        FlightrouteViewModule,
        PlanRouteListViewModule,
        PlanWaypointsViewModule,
        PlanFuelViewModule,
        PlanWnbViewModule,
        PlanPerformanceViewModule,
        PlanMeteoViewModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class PlanTabsViewModule {
}
