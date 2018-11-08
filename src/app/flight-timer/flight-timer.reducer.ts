import {FlightTimerState} from './flight-timer-state';
import {FlightTimerActions} from './flight-timer.actions';


const initialState: FlightTimerState = {
    startTime: undefined,
    interimTime: undefined,
};


export function flightTimerReducer(state: FlightTimerState = initialState, action: FlightTimerActions) {
    switch (action.type) {
        default:
            return state;
    }
}
