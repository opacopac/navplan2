import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlighttimerComponent} from './ng-components/flighttimer/flighttimer.component';
import {FlightTimerStateModule} from '../flight-timer-state/flight-timer-state.module';


@NgModule({
    imports: [
        CommonModule,
        FlightTimerStateModule,
    ],
    declarations: [
        FlighttimerComponent
    ],
    exports: [
        FlighttimerComponent
    ]
})
export class FlightTimerViewModule {
}
