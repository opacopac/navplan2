import {SearchItemList} from './search-item-list';


export interface SearchState {
    searchResults: SearchItemList;
    showResults: boolean;
    selectedIndex: number;
}
