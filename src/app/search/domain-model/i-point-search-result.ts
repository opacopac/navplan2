import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {DataItem} from '../../common/model/data-item';


export interface IPointSearchResult {
    getDataItem(): DataItem;

    getSearchResultName(): string;

    getGeoselectionName(): string;

    getPosition(): Position2d;
}
