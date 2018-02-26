import { Userpoint } from './userpoint';
import { Navaid } from './navaid';
import { Airport } from './airport';
import { Reportingpoint } from './reportingpoint';
import { Reportingsector } from './reportingsector';
import { Geoname } from './geoname';
import { DataItem } from './data-item';
import { Position2d } from './position';


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
    constructor(public item: DataItem) {
    }


    public getName(): string {
        if (this.item instanceof Airport) {
            return this.item.icao ? this.item.name + ' (' + this.item.icao + ')' : this.item.name;
        } else if (this.item instanceof Navaid) {
            return this.item.name + ' (' + this.item.type + ')';
        } else if (this.item instanceof Reportingpoint) {
            return this.item.name + ' (' + this.item.airport_icao + ')';
        } else if (this.item instanceof Reportingsector) {
            return this.item.name + ' (' + this.item.airport_icao + ')';
        } else if (this.item instanceof Userpoint) {
            return this.item.name;
        } else if (this.item instanceof Geoname) {
            return this.item.name;
        } else {
            return undefined;
        }
    }


    public getPosition(): Position2d {
        if (this.item instanceof Airport) {
            return this.item.position;
        } else if (this.item instanceof Navaid) {
            return this.item.position;
        } else if (this.item instanceof Reportingpoint) {
            return this.item.position;
        } else if (this.item instanceof Reportingsector) {
            return this.item.polygon.getAveragePoint();
        } else if (this.item instanceof Userpoint) {
            return this.item.position;
        } else if (this.item instanceof Geoname) {
            return this.item.position;
        } else {
            return undefined;
        }
    }
}
