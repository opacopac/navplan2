import {Action} from '@ngrx/store';
import {SearchItemList} from './model/search-item-list';
import {SearchItem} from './model/search-item';


export enum SearchActionTypes {
    SEARCH_QUERY_SUBMITTED = '[Search box] Query submitted',
    SEARCH_RESULTS_RECEIVED = '[SearchService] Search results received',
    SEARCH_NEXT_ITEM = '[Search box] Go to next search item',
    SEARCH_PREV_ITEM = '[Search box] Go to previous search item',
    SEARCH_SELECT_ITEM = '[Search box] Select item',
    SEARCH_HIDE_RESULTS = '[Search box] Hide results'
}


export class SearchQuerySubmittedAction implements Action {
    readonly type = SearchActionTypes.SEARCH_QUERY_SUBMITTED;

    constructor(public query: string) {}
}


export class SearchResultsReceivedAction implements Action {
    readonly type = SearchActionTypes.SEARCH_RESULTS_RECEIVED;

    constructor(public searchResults: SearchItemList) {}
}


export class NextSearchItemAction implements Action {
    readonly type = SearchActionTypes.SEARCH_NEXT_ITEM;

    constructor() {}
}


export class PrevSearchItemAction implements Action {
    readonly type = SearchActionTypes.SEARCH_PREV_ITEM;

    constructor() {}
}


export class SearchItemSelectedAction implements Action {
    readonly type = SearchActionTypes.SEARCH_SELECT_ITEM;

    constructor(public searchItem: SearchItem) {}
}


export class HideSearchResultsAction implements Action {
    readonly type = SearchActionTypes.SEARCH_HIDE_RESULTS;

    constructor() {}
}


export type SearchActions =
    SearchQuerySubmittedAction |
    SearchResultsReceivedAction |
    NextSearchItemAction |
    PrevSearchItemAction |
    SearchItemSelectedAction |
    HideSearchResultsAction;
