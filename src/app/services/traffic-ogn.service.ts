import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';
import { Traffic, TrafficPosition, TrafficPositionMethod, TrafficType } from '../model/map/traffic';
import { Extent } from '../model/map/extent';
import { Altitude } from '../model/altitude';
import { Timestamp } from '../model/timestamp';
import { Position4d } from '../model/position';


const OGN_TRAFFIC_BASE_URL = environment.restApiBaseUrl + 'php/ogntraffic.php';


// region OGN REST ITEMS

interface TrafficOgnResponse {
    aclist: TrafficOgnRestItem[];
}


interface TrafficOgnRestItem {
    id: string;
    addresstype: string;
    actype: string;
    registration: string;
    aircraftModelType: string;
    positions: TrafficOgnPositionRestItem[];
}


interface TrafficOgnPositionRestItem {
    latitude: number;
    longitude: number;
    altitude: number;
    time: string;
    receiver: string;
}

// endregion


@Injectable()
export class TrafficOgnService {
    private session: Sessioncontext;


    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {
        this.session = this.sessionService.getSessionContext();
    }


    public readTraffic(
        extent: Extent,
        maxAgeSec: number,
        successCallback: (Traffic) => void,
        errorCallback: (string) => void) {

        const waitDataSec = 0; // TODO: remove?
        const url = OGN_TRAFFIC_BASE_URL + '?minlon=' + extent[0] + '&minlat=' + extent[1] + '&maxlon=' + extent[2] + '&maxlat=' + extent[3]
            + '&maxagesec=' + maxAgeSec + '&sessionid=' + this.session.sessionId + '&waitDataSec=' + waitDataSec;


        this.http
            .get<TrafficOgnResponse>(url, {observe: 'response'})
            .subscribe(
                response => {
                    const trafficList = this.getTrafficList(response.body.aclist);
                    successCallback(trafficList);
                },
                err => {
                    const message = 'ERROR reading map features!';
                    LoggingService.logResponseError(message, err);
                    errorCallback(message);
                }
            );
    }


    private getTrafficList(acList: TrafficOgnRestItem[]): Traffic[] {
        const trafficList: Traffic[] = [];

        for (const acAddress in acList) {
            const ac = acList[acAddress];
            const traffic = new Traffic(
                ac.id,
                ac.addresstype,
                TrafficType[ac.actype],
                ac.registration,
                undefined,
                undefined,
                ac.aircraftModelType,
                this.getTrafficPositions(ac.positions));
            trafficList.push(traffic);
        }

        return trafficList;
    }


    private getTrafficPositions(acPosList: TrafficOgnPositionRestItem[]): TrafficPosition[] {
        const positionList: TrafficPosition[] = [];

        for (const acPos of acPosList) {
            const position = new TrafficPosition(
                new Position4d(
                    acPos.longitude,
                    acPos.latitude,
                    new Altitude(acPos.altitude),
                    new Timestamp(this.getEpocSecFromOgnTime(acPos.time))
                ),
                TrafficPositionMethod.FLARM,
                'Open Glider Network (' + acPos.receiver + ')',
                Date.now()
            );
            positionList.push(position);
        }

        return positionList;
    }


    private getEpocSecFromOgnTime(timeString: string): number {
        const timeParts = timeString.split(':', 3);
        const now = new Date();
        const epocMs = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            parseInt(timeParts[0], 10),
            parseInt(timeParts[1], 10),
            parseInt(timeParts[2], 10));
        return Math.floor(Math.min(epocMs, now.getTime()) / 1000);
    }
}
