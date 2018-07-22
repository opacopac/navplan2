export enum DataItemType {
    airport,
    airspace,
    geoname,
    mapFeatures,
    metarTaf,
    navaid,
    notam,
    reportingPoint,
    reportingSector,
    traffic,
    userPoint,
    webcam,
    waypoint,
}


export abstract class DataItem {
    public abstract get dataItemType(): DataItemType;
}
