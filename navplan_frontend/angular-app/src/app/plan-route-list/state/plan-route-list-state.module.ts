import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FlightRouteListEffects} from './ngrx/flightroute-list-effects.service';
import {flightrouteListReducer} from './ngrx/flightroute-list.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('flightrouteListState', flightrouteListReducer),
        EffectsModule.forFeature([
            FlightRouteListEffects,
        ]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PlanRouteListStateModule {
}
