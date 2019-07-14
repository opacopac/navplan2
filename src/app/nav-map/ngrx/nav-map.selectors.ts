import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NavMapState} from '../domain/nav-map-state';


export const getNavMapState = createFeatureSelector<NavMapState>('navMapState');
export const getIsActive = createSelector(getNavMapState, state => state.isActive);
