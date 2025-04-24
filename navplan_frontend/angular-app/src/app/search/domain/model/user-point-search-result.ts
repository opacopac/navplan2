import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {IPointSearchResult} from './i-point-search-result';
import {UserPoint} from '../../../user-point/domain/model/user-point';
import {DataItem} from '../../../common/domain/model/data-item';


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
