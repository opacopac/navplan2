import {Observable} from 'rxjs';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {SearchItemList} from '../model/search-item-list';
import {PositionSearchResultList} from '../model/position-search-result-list';


export abstract class ISearchRepoService {
    public abstract searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        maxResults: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number
    ): Observable<PositionSearchResultList>;

    public abstract searchByText(queryString: string): Observable<SearchItemList>;
}
