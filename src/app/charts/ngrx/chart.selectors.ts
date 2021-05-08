import {createFeatureSelector} from '@ngrx/store';
import {ChartState} from './chart-state';


export const getChartState = createFeatureSelector<ChartState>('chartState');
