import {Observable} from 'rxjs';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {User} from '../../../user/domain/model/user';
import {SearchItemList} from '../model/search-item-list';
import {PositionSearchResultList} from '../model/position-search-result-list';
import {SearchItem} from '../model/search-item';


export abstract class ISearchService {
    public abstract searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number
    ): Observable<PositionSearchResultList>;

    public abstract searchByText(
        queryString: string,
        user: User
    ): Observable<SearchItemList>;

    public abstract convertToPositionSearchResultList(searchItem: SearchItem): PositionSearchResultList;
}
