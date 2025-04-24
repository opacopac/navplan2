import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {IPointSearchResult} from './i-point-search-result';
import {Navaid} from '../../../navaid/domain/model/navaid';
import {DataItem} from '../../../common/domain/model/data-item';


export class NavaidSearchResult implements IPointSearchResult {
    constructor(public navaid: Navaid) {
    }


    public getDataItem(): DataItem {
        return this.navaid;
    }


    public getSearchResultName(): string {
        return this.navaid.name + ' ' + this.navaid.getTypeString() + ' (' + this.navaid.kuerzel + ')';
    }


    public getGeoselectionName(): string {
        return this.navaid.kuerzel + ' (' + this.navaid.getTypeString() + ')';
    }


    public getPosition(): Position2d {
        return this.navaid.position;
    }
}
