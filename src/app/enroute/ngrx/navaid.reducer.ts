import {createReducer, on} from '@ngrx/store';
import {NavaidActions} from './navaid.actions';
import {NavaidState} from '../domain-model/navaid-state';


const initialState: NavaidState = {
    extent: undefined,
    zoom: undefined,
    navaids: []
};


export const navaidReducer = createReducer(
    initialState,
    on(NavaidActions.showNavaids, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        navaids: action.navaids
    })),
);
