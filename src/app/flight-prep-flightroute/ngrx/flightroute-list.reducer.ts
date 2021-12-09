import {createReducer, on} from '@ngrx/store';
import {FlightrouteListState} from './flightroute-list-state';
import {FlightrouteListActions} from './flightroute-list.actions';


const initialState: FlightrouteListState = {
    flightrouteList: [],
};


export const flightRouteListReducer = createReducer(
    initialState,

    on(FlightrouteListActions.showList, (state, action) => ({
        ...state,
        flightrouteList: action.flightrouteList
    })),
);
