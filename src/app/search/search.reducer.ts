import {SearchActions, SearchActionTypes} from './search.actions';
import {SearchState} from './model/search-state';


const initialState: SearchState = {
    searchIsActive: false,
    searchResults: undefined,
    selectedIndex: undefined
};


export function searchReducer(state: SearchState = initialState, action: SearchActions) {
    switch (action.type) {
        case SearchActionTypes.SEARCH_SHOW:
            return { ...state, searchIsActive: true };

        case SearchActionTypes.SEARCH_HIDE:
            return { ...state, searchIsActive: false };

        case SearchActionTypes.SEARCH_RESULTS_RECEIVED:
            return { ...state, searchResults: action.searchResults, selectedIndex: undefined };

        case SearchActionTypes.SEARCH_PREV_ITEM:
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

        case SearchActionTypes.SEARCH_NEXT_ITEM:
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

        case SearchActionTypes.SEARCH_HIDE_RESULTS:
            return { ...state, searchResults: undefined, selectedIndex: undefined };

        default:
            return state;
    }
}
