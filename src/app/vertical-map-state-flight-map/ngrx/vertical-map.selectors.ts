import {createFeatureSelector} from '@ngrx/store';
import {VerticalMapState} from './vertical-map-state';


export const getVerticalMapState = createFeatureSelector<VerticalMapState>('verticalMapState');
