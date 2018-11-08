import {SearchItemList} from './model/search-item-list';


export interface SearchState {
    searchIsActive: boolean;
    searchResults: SearchItemList;
    selectedIndex: number;
}
