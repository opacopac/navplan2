import {createAction, props} from '@ngrx/store';
import {SearchItemList} from '../domain-model/search-item-list';
import {SearchItem} from '../domain-model/search-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {PositionSearchResultList} from '../domain-model/position-search-result-list';


export class SearchActions {
    public static readonly showTextSearchField = createAction(
        '[Navbar] Show text search field',
    );
    public static readonly hideTextSearchField = createAction(
        '[Search box] Hide text search field',
    );
    public static readonly searchByText = createAction(
        '[Search box] Search by text',
        props<{ query: string }>()
    );
    public static readonly showTextSearchResults = createAction(
        '[SearchService] Display text search results',
        props<{ searchResults: SearchItemList }>()
    );
    public static readonly nextTextSearchResult = createAction(
        '[Search box] Next text search result',
    );
    public static readonly previousTextSearchResult = createAction(
        '[Search box] Previous text search result',
    );
    public static readonly selectTextSearchResult = createAction(
        '[Search box] Select text search result',
        props<{ searchItem: SearchItem }>()
    );
    public static readonly hideTextSearchResults = createAction(
        '[Search box] Hide text search results',
    );
    public static readonly searchByPosition = createAction(
        '[Flight Map] Search by position',
        props<{ clickPos: Position2d, maxDegRadius: number, minNotamTimestamp: number, maxNotamTimestamp: number }>()
    );
    public static readonly showPositionSearchResults = createAction(
        '[Flight Map] Show position search results on map',
        props<{ positionSearchResults: PositionSearchResultList, clickPos: Position2d }>()
    );
    public static readonly hidePositionSearchResults = createAction(
        '[Flight Map] Hide position search results on map',
    );
}
