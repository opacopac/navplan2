import {createReducer, on} from '@ngrx/store';
import {FlightrouteListActions} from './flightroute-list.actions';
import {FlightrouteListState} from '../state-model/flightroute-list-state';


export const initialFlightrouteListState: FlightrouteListState = {
    flightrouteList: [],
};


export const flightrouteListReducer = createReducer(
    initialFlightrouteListState,

    on(FlightrouteListActions.readListSuccess, (state, action) => ({
        ...state,
        flightrouteList: action.flightrouteList
    })),

    on(FlightrouteListActions.updateTableState, (state, action) => ({
        ...state,
        flightrouteTableState: action.tableState
    })),

    // TODO: user logout => route list = []
);
