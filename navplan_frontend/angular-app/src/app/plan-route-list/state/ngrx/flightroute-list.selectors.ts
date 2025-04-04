import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FlightrouteListState} from '../state-model/flightroute-list-state';


export const getFlightrouteListState = createFeatureSelector<FlightrouteListState>('flightrouteListState');
export const getFlightrouteList = createSelector(getFlightrouteListState, state => state.flightrouteList);
