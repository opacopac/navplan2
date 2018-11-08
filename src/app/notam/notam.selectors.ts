import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NotamState} from './notam-state';


export const getNotamState = createFeatureSelector<NotamState>('notamState');
export const getNotamList = createSelector(getNotamState, state => state.notamList);
