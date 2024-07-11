import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {User} from '../../../user/domain/model/user';
import {SearchItemList} from '../model/search-item-list';
import {ISearchService} from './i-search.service';
import {ISearchRepoService} from './i-search-repo.service';
import {PositionSearchResultList} from '../model/position-search-result-list';
import {SearchItem} from '../model/search-item';
import {SearchItemSearchResult} from '../model/generic-search-result';


@Injectable()
export class SearchService implements ISearchService {
    private readonly MAX_POINT_RESULTS = 6;


    constructor(private searchRepo: ISearchRepoService) {
    }


    public searchByPosition(
        position: Position2d,
        maxRadius_deg: number,
        minNotamTimestamp: number,
        maxNotamTimestamp: number
    ): Observable<PositionSearchResultList> {
        return this.searchRepo.searchByPosition(
            position,
            maxRadius_deg,
            this.MAX_POINT_RESULTS,
            minNotamTimestamp,
            maxNotamTimestamp
        );
    }


    public searchByText(
        queryString: string,
        user: User
    ): Observable<SearchItemList> {
        return this.searchRepo.searchByText(queryString, user);
    }


    public convertToPositionSearchResultList(searchItem: SearchItem): PositionSearchResultList {
        return new PositionSearchResultList(
            [], [], [], [], [], [], [],
            [new SearchItemSearchResult(searchItem)]
        );
    }
}
