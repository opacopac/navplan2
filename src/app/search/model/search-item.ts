import { Userpoint } from '../../model/userpoint';
import { Navaid } from '../../model/navaid';
import { Airport } from '../../model/airport';
import { Reportingpoint } from '../../model/reportingpoint';
import { Reportingsector } from '../../model/reportingsector';
import { Geoname } from '../../model/geoname';
import { DataItem } from '../../model/data-item';
import { Position2d } from '../../model/geometry/position2d';


export class SearchItem {
    constructor(public dataItem: DataItem) {
    }


    public getSearchResultName(): string {
        if (this.dataItem instanceof Airport) {
            return this.dataItem.icao ? this.dataItem.name + ' (' + this.dataItem.icao + ')' : this.dataItem.name;
        } else if (this.dataItem instanceof Navaid) {
            return this.dataItem.name + ' ' + this.dataItem.type + ' (' + this.dataItem.kuerzel + ')';
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
            return this.dataItem.kuerzel + ' (' + this.dataItem.type + ')';
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