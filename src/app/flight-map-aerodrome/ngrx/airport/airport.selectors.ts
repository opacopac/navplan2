import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AirportState} from '../../../aerodrome/domain-model/airport-state';


export const getAirportState = createFeatureSelector<AirportState>('airportState');
export const getAirports = createSelector(getAirportState, state => state.airports);
