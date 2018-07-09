import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MetarTafState} from './model/metar-taf-state';


export const getMetarTafState = createFeatureSelector<MetarTafState>('metarTafState');
export const getMetarTafList = createSelector(getMetarTafState, state => state.metarTafList);
