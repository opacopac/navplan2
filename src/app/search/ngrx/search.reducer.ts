import {SearchActions2} from './search.actions';
import {SearchState} from '../domain-model/search-state';
import {createReducer, on} from '@ngrx/store';


const initialSearchState: SearchState = {
    textSearchState: { searchIsActive: false, searchResults: undefined, selectedResultIndex: undefined },
    positionSearchState: { searchItems: [], clickPos: undefined }
};


export const searchReducer = createReducer(
    initialSearchState,
    on(SearchActions2.showTextSearchField, (state) => ({
        ...state,
        textSearchState: {
            searchIsActive: true,
            searchResults: state.textSearchState.searchResults,
            selectedResultIndex: state.textSearchState.selectedResultIndex
        }
    })),
    on(SearchActions2.hideTextSearchField, (state) => ({
        ...state,
        textSearchState: {
            searchIsActive: false,
            searchResults: undefined,
            selectedResultIndex: undefined
        }
    })),
    on(SearchActions2.showTextSearchResults, (state, action) => ({
        ...state,
        textSearchState: {
            searchIsActive: true,
            searchResults: action.searchResults,
            selectedResultIndex: undefined
        }
    })),
    on(SearchActions2.previousTextSearchResult, (state) => {
        let prevIndex: number;
        if (!state.textSearchState.searchResults || state.textSearchState.searchResults.items.length === 0) {
            prevIndex = undefined;
        } else if (state.textSearchState.selectedResultIndex >= state.textSearchState.searchResults.items.length) {
            prevIndex = state.textSearchState.searchResults.items.length - 1;
        } else if (state.textSearchState.selectedResultIndex < 0) {
            prevIndex = 0;
        } else if (state.textSearchState.selectedResultIndex > 0) {
            prevIndex = state.textSearchState.selectedResultIndex - 1;
        } else {
            prevIndex = state.textSearchState.selectedResultIndex;
        }
        return {
            ...state,
            textSearchState: {
                searchIsActive: true,
                searchResults: state.textSearchState.searchResults,
                selectedResultIndex: prevIndex
            }
        };
    }),
    on(SearchActions2.nextTextSearchResult, (state) => {
        let nextIndex: number;
        if (!state.textSearchState.searchResults || state.textSearchState.searchResults.items.length === 0) {
            nextIndex = undefined;
        } else if (state.textSearchState.selectedResultIndex >= state.textSearchState.searchResults.items.length) {
            nextIndex = state.textSearchState.searchResults.items.length - 1;
        } else if (state.textSearchState.selectedResultIndex < 0) {
            nextIndex = 0;
        } else if (state.textSearchState.selectedResultIndex < state.textSearchState.searchResults.items.length - 1) {
            nextIndex = state.textSearchState.selectedResultIndex + 1;
        } else {
            nextIndex = state.textSearchState.selectedResultIndex;
        }
        return {
            ...state,
            textSearchState: {
                searchIsActive: true,
                searchResults: state.textSearchState.searchResults,
                selectedResultIndex: nextIndex
            }
        };
    }),
    on(SearchActions2.hideTextSearchResults, (state) => ({
        ...state,
        textSearchState: {
            searchIsActive: true,
            searchResults: undefined,
            selectedResultIndex: undefined
        }
    })),
    on(SearchActions2.showPositionSearchResults, (state, action) => ({
        ...state,
        positionSearchState: { searchItems: action.searchResults.items, clickPos: action.clickPos }
    })),
    on(SearchActions2.closePositionSearchResults, (state) => ({
        ...state,
        positionSearchState: { searchItems: [], clickPos: undefined }
    })),
);
