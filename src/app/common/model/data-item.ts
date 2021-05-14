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
    airportChart = 14
}


export abstract class DataItem {
    public abstract get dataItemType(): DataItemType;


    public getClickPrio(): number {
        return this.dataItemType;
    }
}
