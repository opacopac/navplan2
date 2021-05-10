import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlighttimerComponent} from './ng-components/flighttimer/flighttimer.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from '../location/ngrx/location.effects';
import {FlightTimerState} from './ngrx/flight-timer-state';
import {FlightTimerActions} from './ngrx/flight-timer.actions';
import {flightTimerReducer} from './ngrx/flight-timer.reducer';


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
