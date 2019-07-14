import {NavMapState} from '../domain/nav-map-state';
import {NavMapActions, NavMapActionTypes} from './nav-map.actions';


const initialState: NavMapState = {
    isActive: false,
};


export function navMapReducer(state: NavMapState = initialState, action: NavMapActions) {
    switch (action.type) {
        case NavMapActionTypes.NAV_MAP_ACTIVATE:
            return { ...state, isActive: action.isActive };

        default:
            return state;
    }
}
