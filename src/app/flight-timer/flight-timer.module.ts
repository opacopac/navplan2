import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlighttimerComponent} from './components/flighttimer/flighttimer.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from '../location/location.effects';
import {FlightTimerState} from './model/flight-timer-state';
import {FlightTimerActions} from './flight-timer.actions';
import {flightTimerReducer} from './flight-timer.reducer';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<FlightTimerState, FlightTimerActions>('flightTimerState', flightTimerReducer),
        EffectsModule.forFeature([LocationEffects]),
    ],
    declarations: [
        FlighttimerComponent
    ],
    exports: [
        FlighttimerComponent
    ]
})
export class FlightTimerModule {
}
