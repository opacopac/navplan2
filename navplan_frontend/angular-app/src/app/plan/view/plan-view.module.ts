import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanPageComponent} from './ng-components/plan-page/plan-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PlanMeteoViewModule} from '../../plan-meteo/view/plan-meteo-view.module';
import {ExporterViewModule} from '../../exporter/view/exporter-view.module';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';
import {TrafficViewModule} from '../../plan-fuel/view/plan-fuel-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        FlightrouteViewModule,
        PlanMeteoViewModule,
        ExporterViewModule,
        TrafficViewModule,
    ],
    declarations: [
        PlanPageComponent,
    ],
    exports: [
        PlanPageComponent
    ],
    providers: []
})
export class PlanViewModule {
}
