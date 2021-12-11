import {createFeatureSelector} from '@ngrx/store';
import {VerticalMapState} from '../state-model/vertical-map-state';


export const getVerticalMapState = createFeatureSelector<VerticalMapState>('verticalMapState');
