import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NavaidState} from '../domain-model/navaid-state';


export const getNavaidState = createFeatureSelector<NavaidState>('navaidState');
export const getNavaids = createSelector(getNavaidState, state => state.navaids);
