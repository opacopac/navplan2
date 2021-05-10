import {AirspaceState} from './airspace-state';
import {AirspaceActions} from './airspace-actions';


const initialState: AirspaceState = {
    dummy: undefined
};


export function airspaceReducer(state: AirspaceState = initialState, action: AirspaceActions) {
    switch (action.type) {
        default:
            return state;
    }
}
