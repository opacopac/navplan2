import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {IPointSearchResult} from './i-point-search-result';
import {Geoname} from '../../../geoname/domain/model/geoname';
import {DataItem} from '../../../common/model/data-item';


export class GeonameSearchResult implements IPointSearchResult {
    constructor(public geoname: Geoname) {
    }


    public getDataItem(): DataItem {
        return this.geoname;
    }


    public getSearchResultName(): string {
        return this.geoname.searchresultname;
    }


    public getGeoselectionName(): string {
        return this.geoname.name;
    }


    public getPosition(): Position2d {
        return this.geoname.position;
    }
}
