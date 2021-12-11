import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouteMeteoContainerComponent} from './ng-components/route-meteo-container/route-meteo-container.component';
import {FlightrouteStateModule} from '../flightroute-state/flightroute-state.module';
import {RouteMeteoStateModule} from '../route-meteo-state/route-meteo-state.module';


@NgModule({
    imports: [
        CommonModule,
        RouteMeteoStateModule,
        FlightrouteStateModule,
    ],
    declarations: [
        RouteMeteoContainerComponent
    ],
    exports: [
        RouteMeteoContainerComponent
    ],
    providers: [
    ],
    entryComponents: [
    ],
})
export class RouteMeteoViewModule {}
