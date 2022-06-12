import {Position2d} from '../../geo-physics/domain/model/geometry/position2d';

export enum DataItemType {
    traffic = 1,
    airport = 2,
    navaid = 3,
    geoname = 4,
    waypoint = 5,
    userPoint = 6,
    reportingPoint = 7,
    reportingSector = 8,
    metarTaf = 9,
    notam = 10,
    webcam = 11,
    airspace = 12,
    circuit = 13,
    airportChart = 14,
    searchItem = 15,
    smaMeasurement = 16,
    dwdWindForecast = 17,
}


export abstract class DataItem {
    public abstract get dataItemType(): DataItemType;


    public getPosition(): Position2d {
        return undefined;
    }


    public getClickPrio(): number {
        return this.dataItemType;
    }
}
