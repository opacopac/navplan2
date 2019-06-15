import {SearchItemList} from './domain/search-item-list';


export interface SearchState {
    searchIsActive: boolean;
    searchResults: SearchItemList;
    selectedIndex: number;
}
