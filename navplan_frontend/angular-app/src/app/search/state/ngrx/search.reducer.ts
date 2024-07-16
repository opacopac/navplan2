import {SearchActions} from './search.actions';
import {SearchState} from '../state-model/search-state';
import {createReducer, on} from '@ngrx/store';


const initialSearchState: SearchState = {
    textSearchState: {
        searchResults: undefined,
        selectedResultIndex: undefined,
        selectedSearchResult: undefined
    },
    positionSearchState: {
        positionSearchResults: undefined,
        clickPos: undefined
    },
};


export const searchReducer = createReducer(
    initialSearchState,
    on(SearchActions.showTextSearchResults, (state, action) => ({
        ...state,
        textSearchState: {
            searchResults: action.searchResults,
            selectedResultIndex: undefined,
            selectedSearchResult: undefined
        }
    })),
    on(SearchActions.previousTextSearchResult, (state) => {
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
                searchResults: state.textSearchState.searchResults,
                selectedResultIndex: prevIndex,
                selectedSearchResult: undefined
            }
        };
    }),
    on(SearchActions.nextTextSearchResult, (state) => {
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
                searchResults: state.textSearchState.searchResults,
                selectedResultIndex: nextIndex,
                selectedSearchResult: undefined
            }
        };
    }),
    on(SearchActions.selectTextSearchResult, (state, action) => ({
        ...state,
        textSearchState: {
            searchResults: state.textSearchState.searchResults,
            selectedResultIndex: state.textSearchState.selectedResultIndex,
            selectedSearchResult: action.searchItem
        }
    })),
    on(SearchActions.clearTextSearchResults, (state) => ({
        ...state,
        textSearchState: {
            searchResults: undefined,
            selectedResultIndex: undefined,
            selectedSearchResult: undefined
        }
    })),
    on(SearchActions.showPositionSearchResults, (state, action) => ({
        ...state,
        positionSearchState: {positionSearchResults: action.positionSearchResults, clickPos: action.clickPos}
    })),
    on(SearchActions.hidePositionSearchResults, (state) => ({
        ...state,
        positionSearchState: {positionSearchResults: undefined, clickPos: undefined}
    })),
);
