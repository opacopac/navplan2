import {UserPoint} from '../../user/domain-model/user-point';
import {Navaid} from '../../navaid/domain-model/navaid';
import {Airport} from '../../airport/domain-model/airport';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {Geoname} from '../../geoname/domain-model/geoname';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


export class SearchItem {
    constructor(public dataItem: DataItem) {
    }


    public getSearchResultName(): string {
        if (this.dataItem instanceof Airport) {
            return this.dataItem.icao ? this.dataItem.name + ' (' + this.dataItem.icao + ')' : this.dataItem.name;
        } else if (this.dataItem instanceof Navaid) {
            return this.dataItem.name + ' ' + this.dataItem.getTypeString() + ' (' + this.dataItem.kuerzel + ')';
        } else if (this.dataItem instanceof ReportingPoint) {
            return this.dataItem.name + ' (' + this.dataItem.airport_icao + ')';
        } else if (this.dataItem instanceof ReportingSector) {
            return this.dataItem.name + ' (' + this.dataItem.airport_icao + ')';
        } else if (this.dataItem instanceof UserPoint) {
            return this.dataItem.name;
        } else if (this.dataItem instanceof Geoname) {
            return this.dataItem.searchresultname;
        } else {
            return undefined;
        }
    }


    public getGeoselectionName(): string {
        if (this.dataItem instanceof Geoname) {
            return this.dataItem.name;
        } else if (this.dataItem instanceof Navaid) {
            return this.dataItem.kuerzel + ' (' + this.dataItem.getTypeString() + ')';
        } else {
            return this.getSearchResultName();
        }
    }


    public getPosition(): Position2d {
        if (this.dataItem instanceof Airport) {
            return this.dataItem.position;
        } else if (this.dataItem instanceof Navaid) {
            return this.dataItem.position;
        } else if (this.dataItem instanceof ReportingPoint) {
            return this.dataItem.position;
        } else if (this.dataItem instanceof ReportingSector) {
            return this.dataItem.polygon.getAveragePoint();
        } else if (this.dataItem instanceof UserPoint) {
            return this.dataItem.position;
        } else if (this.dataItem instanceof Geoname) {
            return this.dataItem.position;
        } else {
            return undefined;
        }
    }
}
