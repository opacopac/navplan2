import {createFeatureSelector} from '@ngrx/store';
import {VerticalMapState} from '../domain-model/vertical-map-state';


export const getVerticalMapState = createFeatureSelector<VerticalMapState>('verticalMapState');
