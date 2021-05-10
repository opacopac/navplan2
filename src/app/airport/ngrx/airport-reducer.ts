import {AirportState} from './airport-state';
import {AirportActions} from './airport-actions';


const initialState: AirportState = {
    dummy: undefined
};


export function airportReducer(state: AirportState = initialState, action: AirportActions) {
    switch (action.type) {
        default:
            return state;
    }
}
