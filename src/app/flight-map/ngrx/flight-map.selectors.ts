import {createFeatureSelector} from '@ngrx/store';
import {FlightMapState} from '../domain-model/flight-map-state';


export const getFlightMapState = createFeatureSelector<FlightMapState>('flightMapState');
