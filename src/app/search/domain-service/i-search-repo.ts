import {Observable} from 'rxjs';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {User} from '../../user/domain-model/user';
import {SearchItemList} from '../domain-model/search-item-list';


export abstract class ISearchRepo {
    public abstract searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        maxResults: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number
    ): Observable<SearchItemList>;

    public abstract searchByText(
        queryString: string,
        user: User
    ): Observable<SearchItemList>;
}
