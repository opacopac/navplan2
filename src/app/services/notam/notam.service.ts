import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoggingService } from '../utils/logging.service';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { CachingExtentLoader } from '../map/caching-extent-loader';
import { NotamList } from '../../model/notam';
import { Extent } from '../../model/ol-model/extent';
import { NotamRestItem, RestMapperNotam } from '../../model/rest-model/rest-mapper-notam';


const NOTAM_BASE_URL = environment.restApiBaseUrl + 'php/notam.php'; // TODO: move to searchservice
const NOTAM_BASE_URL2 = environment.restApiBaseUrl + 'php/search/SearchService.php';


interface NotamResponse {
    locationnotamlist: NotamRestItem[]; // TODO: remove
    areanotamlist: NotamRestItem[];
}


interface NotamResponse2 {
    notams: NotamRestItem[];
}


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


    public isTimedOut(ageSec: number): boolean {
        return false;
    }


    protected loadFromSource(
        extent: Extent,
        zoom: number,
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        const startEndTime = this.getDefaultNotamTimeslot();
        const url = NOTAM_BASE_URL + '?starttimestamp=' + startEndTime[0] + '&endtimestamp=' + startEndTime[1] +
            '&minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2] + '&maxlat=' + extent[3] +
            '&zoom=' + zoom;

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


    public loadByIcao(
        icaoList: string[],
        successCallback: (NotamList) => void,
        errorCallback: (string) => void) {

        const startEndTime = this.getDefaultNotamTimeslot();
        const url = NOTAM_BASE_URL2 + '?action=searchByIcao&searchItems=notams&icao=' + icaoList.join(',')
            + '&minnotamtime=' + startEndTime[0] + '&maxnotamtime=' + startEndTime[1];
        /*const url = NOTAM_BASE_URL + '?icaolist=' + icaoList.join(',')
            + '&starttimestamp=' + startEndTime[0] + '&endtimestamp=' + startEndTime[1];*/

        this.http
            .jsonp<NotamResponse2>(url, 'callback')
            .subscribe(
                response => {
                    const notamList = this.getNotamList2(response);
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


    // TODO: deprecated
    private getNotamList(response: NotamResponse): NotamList {
        const notamList = new NotamList();

        for (const item of response.areanotamlist) {
            const notam = RestMapperNotam.getNavaidFromRestItem(item);
            notamList.items.push(notam);
        }

        return notamList;
    }


    private getNotamList2(response: NotamResponse2): NotamList {
        const notamList = new NotamList();

        for (const item of response.notams) {
            const notam = RestMapperNotam.getNavaidFromRestItem(item);
            notamList.items.push(notam);
        }

        return notamList;
    }
}
