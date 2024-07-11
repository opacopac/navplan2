import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {IPointSearchResult} from './i-point-search-result';
import {DataItem} from '../../../common/model/data-item';
import {SearchItem} from './search-item';


export class SearchItemSearchResult implements IPointSearchResult {
    constructor(private searchItem: SearchItem) {
    }


    public getDataItem(): DataItem {
        return this.searchItem.dataItem;
    }


    public getSearchResultName(): string {
        return this.searchItem.getSearchResultName();
    }


    public getGeoselectionName(): string {
        return this.searchItem.getGeoselectionName();
    }


    public getPosition(): Position2d {
        return this.searchItem.getPosition();
    }
}
