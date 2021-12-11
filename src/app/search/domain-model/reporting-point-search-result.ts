import {Position2d} from '../../geo-physics/domain-model/geometry/position2d';
import {IPointSearchResult} from './i-point-search-result';
import {ReportingPoint} from '../../aerodrome/domain-model/reporting-point';
import {DataItem} from '../../common/model/data-item';


export class ReportingPointSearchResult implements IPointSearchResult {
    constructor(public reportingPoint: ReportingPoint) {
    }


    public getDataItem(): DataItem {
        return this.reportingPoint;
    }


    public getSearchResultName(): string {
        return this.reportingPoint.name + ' (' + this.reportingPoint.airport_icao + ')';
    }


    public getGeoselectionName(): string {
        return this.getSearchResultName();
    }


    public getPosition(): Position2d {
        return this.reportingPoint.position;
    }
}
