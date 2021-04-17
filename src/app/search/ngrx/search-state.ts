import {SearchItemList} from '../domain-model/search-item-list';


export interface SearchState {
    searchIsActive: boolean;
    searchResults: SearchItemList;
    selectedIndex: number;
}
