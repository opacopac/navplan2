import {createFeatureSelector} from '@ngrx/store';
import {AirportState} from './airport-state';


export const getAirportState = createFeatureSelector<AirportState>('airportState');
