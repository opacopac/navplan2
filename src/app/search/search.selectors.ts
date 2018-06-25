import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SearchState} from './model/search-state';

export const getSearchState = createFeatureSelector<SearchState>('searchState');
export const getSearchResults = createSelector(getSearchState, state => state.searchResults);
export const getSelectedIndex = createSelector(getSearchState, state => state.selectedIndex);
export const getShowResults = createSelector(getSearchState, state => state.showResults);
