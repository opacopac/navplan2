import { Userpoint } from './userpoint';
import { Navaid } from './navaid';
import { Airport } from './airport';
import { Reportingpoint } from './reportingpoint';
import { Reportingsector } from './reportingsector';
import { Geoname } from './geoname';
import { DataItem } from './data-item';
import { Position2d } from './geometry/position2d';


export class SearchItemList {
    public items: SearchItem[];


    constructor() {
        this.items = [];
    }


    public appendSearchItem(item: DataItem) {
        this.items.push(new SearchItem(item));
    }
}


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
