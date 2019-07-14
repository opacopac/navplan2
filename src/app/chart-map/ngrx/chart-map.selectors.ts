import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ChartMapState} from '../domain/chart-map-state';


export const getChartMapState = createFeatureSelector<ChartMapState>('chartMapState');
export const getIsActive = createSelector(getChartMapState, state => state.isActive);
