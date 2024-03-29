import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MetarTafState} from '../state-model/metar-taf-state';


export const getMetarTafState = createFeatureSelector<MetarTafState>('metarTafState');
export const getMetarTafs = createSelector(getMetarTafState, state => state.metarTafs);
