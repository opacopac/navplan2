import { Polygon } from '../polygon';
import { Position2d } from '../position';
import { Reportingpoint } from '../reportingpoint';
import { Reportingsector } from '../reportingsector';


export interface ReportingPointRestItem {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    min_ft: number;
    max_ft: number;
    latitude: number;
    longitude: number;
    polygon: [number, number][];
}


export class RestMapperReportingpoint {
    public static getReportingpointFromRestItem(restItem: ReportingPointRestItem): Reportingpoint {
        return new Reportingpoint(
            restItem.id,
            restItem.type,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            restItem.min_ft,
            restItem.max_ft,
            new Position2d(restItem.longitude, restItem.latitude));
    }


    public static getReportingSectorFromRestItem(restItem: ReportingPointRestItem): Reportingsector {
        return new Reportingsector(
            restItem.id,
            restItem.type,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            restItem.min_ft,
            restItem.max_ft,
            Polygon.createFromLonLatList(restItem.polygon));
    }
}
