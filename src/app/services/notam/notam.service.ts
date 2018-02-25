import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { CachingExtentLoader } from '../map/caching-extent-loader';
import { Notam, NotamGeometry, NotamList, NotamLocationType } from '../../model/notam';
import { Extent } from '../../model/ol-model/extent';
import { Circle } from '../../model/circle';
import { Position2d } from '../../model/position';
import { Polygon } from '../../model/polygon';


const NOTAM_BASE_URL = environment.restApiBaseUrl + 'php/notam.php';


// region INTERFACES

interface NotamResponse {
    locationnotamlist: NotamRestItem[]; // TODO: remove
    areanotamlist: NotamRestItem[];
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
    top: number;
    bottom: number;
}


// endregion


@Injectable()
export class NotamService extends CachingExtentLoader<NotamList> {
    private session: Sessioncontext;

    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {

        super();
        this.session = this.sessionService.getSessionContext();
    }


    public getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    public isTimedOut(): boolean {
        return false;
    }


    protected loadFromSource(
        extent: Extent,
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        const startEndTime = this.getDefaultNotamTimeslot();
        const url = NOTAM_BASE_URL + '?starttimestamp=' + startEndTime[0] + '&endtimestamp=' + startEndTime[1] +
            '&minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2] + '&maxlat=' + extent[3];

        this.http
            .jsonp<NotamResponse>(url, 'callback')
            .subscribe(
                response => {
                    const notamList = this.getNotamList(response);
                    successCallback(notamList);
                },
                err => {
                    const message = 'ERROR reading NOTAMs!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                });
    }


    private getDefaultNotamTimeslot(): [number, number] {
        const now = new Date();
        const minTime = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000); // beginning of today LT (notam timestamps from icao have day granularity...)
        const maxTime = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).getTime() / 1000); // end of tomorrow LT

        return [minTime, maxTime];
    }


    private getNotamList(response: NotamResponse): NotamList {
        const notamList = new NotamList();

        for (const item of response.areanotamlist) {
            const notam = new Notam(
                item.id,
                item.all,
                new Date(item.startdate),
                new Date(item.enddate),
                item.Created ? new Date(item.Created) : undefined,
                item.location,
                item.isICAO,
                item.key,
                NotamLocationType[item.type],
                item.StateCode,
                item.StateName,
                item.entity,
                item.status,
                item.Qcode,
                item.Area,
                item.SubArea,
                item.Condition,
                item.Subject,
                item.Modifier,
                item.message,
                this.getNotamGeometry(item));

            notamList.items.push(notam);
        }

        return notamList;
    }


    private getNotamGeometry(item: NotamRestItem): NotamGeometry {
        if (!item.geometry) {
            return undefined;
        }

        if (item.geometry.center) {
            return new NotamGeometry(
                new Circle(
                    Position2d.createFromLonLat(item.geometry.center),
                    item.geometry.radius),
                item.geometry.top,
                item.geometry.bottom);
        } else if (item.geometry.polygon) {
            return new NotamGeometry(
                Polygon.createFromLonLatList(item.geometry.polygon),
                item.geometry.top,
                item.geometry.bottom);
        }

        return undefined;
    }
}
