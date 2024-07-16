import {createAction, props} from '@ngrx/store';
import {SearchItemList} from '../../domain/model/search-item-list';
import {SearchItem} from '../../domain/model/search-item';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {PositionSearchResultList} from '../../domain/model/position-search-result-list';


export class SearchActions {
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
    public static readonly clearTextSearchResults = createAction(
        '[Search box] Clear text search results',
    );
    public static readonly searchByPosition = createAction(
        '[Flight Map] Search by position',
        props<{ clickPos: Position2d, zoom: number }>()
    );
    public static readonly showPositionSearchResults = createAction(
        '[Flight Map] Show position search results on map',
        props<{ positionSearchResults: PositionSearchResultList, clickPos: Position2d }>()
    );
    public static readonly hidePositionSearchResults = createAction(
        '[Flight Map] Hide position search results on map',
    );
}
