import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SearchState} from '../state-model/search-state';


export const getSearchState = createFeatureSelector<SearchState>('searchState');
export const getTextSearchState = createSelector(getSearchState, state => state.textSearchState);
export const getTextSearchResults = createSelector(getSearchState, state => state.textSearchState.searchResults);
export const getTextSearchSelectedResultIndex = createSelector(getSearchState, state => state.textSearchState.selectedResultIndex);
export const getPositionSearchState = createSelector(getSearchState, state => state.positionSearchState);
