import {Observable} from 'rxjs';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {SearchItemList} from '../model/search-item-list';
import {PositionSearchResultList} from '../model/position-search-result-list';
import {SearchItem} from '../model/search-item';
import {TimestampInterval} from '../../../geo-physics/domain/model/quantities/timestamp-interval';


export abstract class ISearchService {
    public abstract searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        notamInterval: TimestampInterval
    ): Observable<PositionSearchResultList>;

    public abstract searchByText(queryString: string): Observable<SearchItemList>;

    public abstract convertToPositionSearchResultList(searchItem: SearchItem): PositionSearchResultList;
}
