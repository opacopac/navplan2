import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {User} from '../../user/domain-model/user';
import {SearchItemList} from '../domain-model/search-item-list';
import {RestSearchService} from '../rest-service/rest-search.service';
import {map} from 'rxjs/operators';
import {Geoname} from '../../geoname/domain-model/geoname';
import {SearchItem} from '../domain-model/search-item';


@Injectable()
export class SearchService {
    private readonly MAX_POINT_RESULTS = 6;


    constructor(private restSearchService: RestSearchService) {
    }


    public searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number
    ): Observable<SearchItemList> {
        return this.restSearchService.searchByPosition(position, maxRadius_deg, minNotamTimestamp, maxNotamTimestamp).pipe(
            map(result => {
                if (result.items.length < this.MAX_POINT_RESULTS) {
                    const posItem = Geoname.createFromPosition(position);
                    result.items.push(new SearchItem(posItem));
                    return result;
                } else {
                    return result;
                }
            })
        );
    }


    public searchByText(
        queryString: string,
        user: User
    ): Observable<SearchItemList> {
        return this.restSearchService.searchByText(queryString, user);
    }
}
