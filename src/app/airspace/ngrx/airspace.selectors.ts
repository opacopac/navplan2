import {createFeatureSelector} from '@ngrx/store';
import {AirspaceState} from './airspace-state';


export const getAirspaceState = createFeatureSelector<AirspaceState>('airspaceState');
