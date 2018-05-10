import { Position2d } from '../position';
import { Circle } from '../circle';
import { Polygon } from '../polygon';
import { Multipolygon } from '../multipolygon';
import { Notam, NotamGeometry, NotamLocationType } from '../notam';


export interface NotamRestItem {
    id: string;
    entity: string;
    status: string;
    Qcode: string;
    Area: string;
    SubArea: string;
    Condition: string;
    Subject: string;
    Modifier: string;
    message: string;
    startdate: string;
    enddate: string;
    all: string;
    location: string;
    isICAO: boolean;
    Created: string;
    key: string;
    type: string;
    StateCode: string;
    StateName: string;
    geometry: NotamRestItemGeometry;
}


export interface NotamRestItemGeometry {
    center: [number, number];
    radius: number;
    polygon: [number, number][];
    multipolygon: [[number, number][]];
    top: number;
    bottom: number;
}


export class RestMapperNotam {
    public static getNavaidFromRestItem(restItem: NotamRestItem): Notam {
        return new Notam(
            restItem.id,
            restItem.all,
            new Date(restItem.startdate),
            new Date(restItem.enddate),
            restItem.Created ? new Date(restItem.Created) : undefined,
            restItem.location,
            restItem.isICAO,
            restItem.key,
            NotamLocationType[restItem.type],
            restItem.StateCode,
            restItem.StateName,
            restItem.entity,
            restItem.status,
            restItem.Qcode,
            restItem.Area,
            restItem.SubArea,
            restItem.Condition,
            restItem.Subject,
            restItem.Modifier,
            restItem.message,
            this.getNotamGeometry(restItem));
    }


    private static getNotamGeometry(restItem: NotamRestItem): NotamGeometry {
        if (!restItem.geometry) {
            return undefined;
        }

        if (restItem.geometry.center) {
            return new NotamGeometry(
                new Circle(
                    Position2d.createFromLonLat(restItem.geometry.center),
                    restItem.geometry.radius),
                restItem.geometry.top,
                restItem.geometry.bottom);
        } else if (restItem.geometry.polygon) {
            return new NotamGeometry(
                Polygon.createFromLonLatList(restItem.geometry.polygon),
                restItem.geometry.top,
                restItem.geometry.bottom);
        } else if (restItem.geometry.multipolygon) {
            return new NotamGeometry(
                Multipolygon.createFromLonLatListList(restItem.geometry.multipolygon),
                restItem.geometry.top,
                restItem.geometry.bottom);
        }

        return undefined;
    }
}
