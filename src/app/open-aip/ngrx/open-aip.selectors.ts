import {createFeatureSelector, createSelector} from '@ngrx/store';
import {OpenAipState} from '../domain/open-aip-state';


export const getOpenAipState = createFeatureSelector<OpenAipState>('openAipState');
export const getOpenAipItems = createSelector(getOpenAipState, openAipState => openAipState.openAipItems);
export const getOpenAipAirports = createSelector(
    getOpenAipState, openAipState => openAipState.openAipItems ? openAipState.openAipItems.airports : []);
