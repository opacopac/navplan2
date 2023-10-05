import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from '../../location/location-state/ngrx/location.effects';
import {flightTimerReducer} from './ngrx/flight-timer.reducer';
import {FlightTimerState} from './state-model/flight-timer-state';
import {FlightTimerActions} from './ngrx/flight-timer.actions';


@NgModule({
    imports: [
        StoreModule.forFeature<FlightTimerState, FlightTimerActions>('flightTimerState', flightTimerReducer),
        EffectsModule.forFeature([LocationEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class FlightTimerStateModule {
}
