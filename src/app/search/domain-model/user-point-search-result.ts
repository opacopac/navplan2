import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {IPointSearchResult} from './i-point-search-result';
import {UserPoint} from '../../user/domain-model/user-point';
import {DataItem} from '../../common/model/data-item';


export class UserPointSearchResult implements IPointSearchResult {
    constructor(public userPoint: UserPoint) {
    }


    public getDataItem(): DataItem {
        return this.userPoint;
    }


    public getSearchResultName(): string {
        return this.userPoint.name;
    }


    public getGeoselectionName(): string {
        return this.getSearchResultName();
    }


    public getPosition(): Position2d {
        return this.userPoint.position;
    }
}
