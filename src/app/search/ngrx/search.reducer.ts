import {SearchActions2} from './search.actions';
import {SearchState} from '../domain-model/search-state';
import {createReducer, on} from '@ngrx/store';


const initialSearchState: SearchState = {
    searchIsActive: false,
    searchResults: undefined,
    selectedIndex: undefined
};


export const searchReducer = createReducer(
    initialSearchState,
    on(SearchActions2.showSearchField, (state) => ({
        ...state,
        searchIsActive: true
    })),
    on(SearchActions2.hideSearchField, (state) => ({
        ...state,
        searchIsActive: true
    })),
    on(SearchActions2.showTextSearchResults, (state, action) => ({
        ...state,
        searchResults: action.searchResults,
        selectedIndex: undefined
    })),
    on(SearchActions2.previousSearchItem, (state) => {
        let prevIndex: number;
        if (!state.searchResults || state.searchResults.items.length === 0) {
            prevIndex = undefined;
        } else if (state.selectedIndex >= state.searchResults.items.length) {
            prevIndex = state.searchResults.items.length - 1;
        } else if (state.selectedIndex < 0) {
            prevIndex = 0;
        } else if (state.selectedIndex > 0) {
            prevIndex = state.selectedIndex - 1;
        } else {
            prevIndex = state.selectedIndex;
        }
        return { ...state, selectedIndex: prevIndex };
    }),
    on(SearchActions2.nextSearchItem, (state) => {
        let nextIndex: number;
        if (!state.searchResults || state.searchResults.items.length === 0) {
            nextIndex = undefined;
        } else if (state.selectedIndex >= state.searchResults.items.length) {
            nextIndex = state.searchResults.items.length - 1;
        } else if (state.selectedIndex < 0) {
            nextIndex = 0;
        } else if (state.selectedIndex < state.searchResults.items.length - 1) {
            nextIndex = state.selectedIndex + 1;
        } else {
            nextIndex = state.selectedIndex;
        }
        return { ...state, selectedIndex: nextIndex };
    }),
    on(SearchActions2.hideSearchResults, (state) => ({
        ...state,
        searchResults: undefined,
        selectedIndex: undefined
    })),
);
