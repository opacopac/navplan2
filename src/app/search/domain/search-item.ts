import { Userpoint } from '../../open-aip/domain/userpoint';
import { Navaid } from '../../open-aip/domain/navaid';
import { Airport } from '../../open-aip/domain/airport';
import { Reportingpoint } from '../../open-aip/domain/reportingpoint';
import { Reportingsector } from '../../open-aip/domain/reportingsector';
import { Geoname } from '../../open-aip/domain/geoname';
import { DataItem } from '../../shared/model/data-item';
import { Position2d } from '../../shared/model/geometry/position2d';


export class SearchItem {
    constructor(public dataItem: DataItem) {
    }


    public getSearchResultName(): string {
        if (this.dataItem instanceof Airport) {
            return this.dataItem.icao ? this.dataItem.name + ' (' + this.dataItem.icao + ')' : this.dataItem.name;
        } else if (this.dataItem instanceof Navaid) {
            return this.dataItem.name + ' ' + this.dataItem.getTypeString() + ' (' + this.dataItem.kuerzel + ')';
        } else if (this.dataItem instanceof Reportingpoint) {
            return this.dataItem.name + ' (' + this.dataItem.airport_icao + ')';
        } else if (this.dataItem instanceof Reportingsector) {
            return this.dataItem.name + ' (' + this.dataItem.airport_icao + ')';
        } else if (this.dataItem instanceof Userpoint) {
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
        } else if (this.dataItem instanceof Reportingpoint) {
            return this.dataItem.position;
        } else if (this.dataItem instanceof Reportingsector) {
            return this.dataItem.polygon.getAveragePoint();
        } else if (this.dataItem instanceof Userpoint) {
            return this.dataItem.position;
        } else if (this.dataItem instanceof Geoname) {
            return this.dataItem.position;
        } else {
            return undefined;
        }
    }
}
