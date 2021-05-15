import {SearchItemList} from './search-item-list';


export interface TextSearchState {
    searchIsActive: boolean;
    searchResults: SearchItemList;
    selectedResultIndex: number;
}
