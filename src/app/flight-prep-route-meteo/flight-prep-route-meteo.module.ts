import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouteMeteoContainerComponent} from './ng-components/route-meteo-container/route-meteo-container.component';
import {routeMeteoReducer} from './ngrx/route-meteo.reducer';
import {RouteMeteoEffects} from './ngrx/route-meteo.effects';
import {FlightrouteStateModule} from '../flightroute-state/flightroute-state.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('routeMeteoState', routeMeteoReducer),
        EffectsModule.forFeature([RouteMeteoEffects]),
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
export class FlightPrepRouteMeteoModule {}
