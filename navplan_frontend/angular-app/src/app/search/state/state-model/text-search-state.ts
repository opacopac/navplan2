import {SearchItemList} from '../../domain/model/search-item-list';
import {SearchItem} from '../../domain/model/search-item';


export interface TextSearchState {
    searchResults: SearchItemList;
    selectedResultIndex: number;
    selectedSearchResult: SearchItem;
}
