import {createAction, props} from '@ngrx/store';
import {SearchItemList} from '../domain-model/search-item-list';
import {SearchItem} from '../domain-model/search-item';


export class SearchActions2 {
    public static readonly showSearchField = createAction(
        '[Navbar] Search button clicked',
    );
    public static readonly hideSearchField = createAction(
        '[Search box] Blur',
    );
    public static readonly searchText = createAction(
        '[Search box] Text query submitted',
        props<{ query: string }>()
    );
    public static readonly showTextSearchResults = createAction(
        '[SearchService] Search results received',
        props<{ searchResults: SearchItemList }>()
    );
    public static readonly nextSearchItem = createAction(
        '[Search box] Go to next search item',
    );
    public static readonly previousSearchItem = createAction(
        '[Search box] Go to previous search item',
    );
    public static readonly selectSearchItem = createAction(
        '[Search box] Select item',
        props<{ searchItem: SearchItem }>()
    );
    public static readonly hideSearchResults = createAction(
        '[Search box] Hide results',
    );
}
