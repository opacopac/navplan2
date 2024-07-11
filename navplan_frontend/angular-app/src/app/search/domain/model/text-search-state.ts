import {SearchItemList} from './search-item-list';


export interface TextSearchState {
    isActive: boolean;
    searchResults: SearchItemList;
    selectedResultIndex: number;
}
