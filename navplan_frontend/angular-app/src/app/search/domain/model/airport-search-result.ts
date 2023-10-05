import {Airport} from '../../../aerodrome/domain/model/airport';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {IPointSearchResult} from './i-point-search-result';
import {DataItem} from '../../../common/model/data-item';


export class AirportSearchResult implements IPointSearchResult {
    constructor(public airport: Airport) {
    }


    public getDataItem(): DataItem {
        return this.airport;
    }


    public getSearchResultName(): string {
        return this.airport.icao ? this.airport.name + ' (' + this.airport.icao + ')' : this.airport.name;
    }


    public getGeoselectionName(): string {
        return this.getSearchResultName();
    }


    public getPosition(): Position2d {
        return this.airport.position;
    }
}
