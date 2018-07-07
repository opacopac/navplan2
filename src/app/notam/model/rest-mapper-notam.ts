import { Position2d } from '../../shared/model/geometry/position2d';
import { Circle } from '../../shared/model/geometry/circle';
import { Polygon } from '../../shared/model/geometry/polygon';
import { Multipolygon } from '../../shared/model/geometry/multipolygon';
import {Notam, NotamGeometry, NotamList, NotamLocationType} from './notam';


// TODO: deprecated
export interface NotamResponse {
    locationnotamlist: NotamRestItem[]; // TODO: remove
    areanotamlist: NotamRestItem[];
}


export interface NotamResponse2 {
    notams: NotamRestItem[];
}


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
    // TODO: deprecated
    public static getNotamListFromResponse(response: NotamResponse): NotamList {
        const notamList = new NotamList();

        for (const item of response.areanotamlist) {
            const notam = RestMapperNotam.getNavaidFromRestItem(item);
            notamList.items.push(notam);
        }

        return notamList;
    }


    public static getNotamListFromResponse2(response: NotamResponse2): NotamList {
        const notamList = new NotamList();

        for (const item of response.notams) {
            const notam = RestMapperNotam.getNavaidFromRestItem(item);
            notamList.items.push(notam);
        }

        return notamList;
    }


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
