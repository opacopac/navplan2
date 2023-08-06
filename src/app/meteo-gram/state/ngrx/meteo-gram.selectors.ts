import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MeteoGramState} from '../model/meteo-gram-state';


export const getMeteoGramState = createFeatureSelector<MeteoGramState>('meteoGramState');
export const getCloudMeteogram = createSelector(getMeteoGramState, state => state.cloudMeteogram);
