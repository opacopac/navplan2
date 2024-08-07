import {SearchItemList} from './search-item-list';
import {SearchItem} from './search-item';


export interface TextSearchState {
    searchResults: SearchItemList;
    selectedResultIndex: number;
    selectedSearchResult: SearchItem;
}
