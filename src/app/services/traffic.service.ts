import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';
import { Extent } from '../model/map/extent';
import { Traffic } from '../model/map/traffic';
import { TrafficOgnService } from './traffic-ogn.service';


const TRAFFIC_UPDATE_INTERVALL_MS = 5000;
const TRAFFIC_MAX_AGE_SEC = 120;
const TRAFFIC_IDLE_TIMEOUT_MS = 10 * 60 * 1000;


export enum TrafficServiceStatus {
    OFF,
    WAITING,
    CURRENT,
    ERROR,
}


@Injectable()
export class TrafficService {
    public isActivated: boolean;
    public status: TrafficServiceStatus;
    private session: Sessioncontext;
    private trafficTimerId: number;
    private extent: Extent;
    private trafficList: Traffic[];
    private successCallback: (trafficList: Traffic[]) => void;
    private errorCallback: (message: string) => void;

    constructor(private http: HttpClient,
                private ognService: TrafficOgnService,
                private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
        this.isActivated = false;
        this.status = TrafficServiceStatus.OFF;
        this.trafficList = [];
    }


    public startWatching(
        extent: Extent,
        successCallback: (trafficList: Traffic[]) => void,
        errorCallback: (message: string) => void) {
        if (this.isActivated) {
            this.stopWatching();
        }

        this.isActivated = true;
        this.extent = extent;
        this.status = TrafficServiceStatus.WAITING;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.trafficTimerId = window.setInterval(this.onTrafficTimer.bind(this), TRAFFIC_UPDATE_INTERVALL_MS);
        this.sendTrafficRequests();
    }


    public setExtent(extent: Extent) {
        this.extent = extent;
    }


    public stopWatching() {
        this.isActivated = false;
        this.status = TrafficServiceStatus.OFF;
        this.successCallback = undefined;
        this.errorCallback = undefined;
        window.clearInterval(this.trafficTimerId);
    }


    private onTrafficTimer() {
        if (this.sessionService.isIdle(TRAFFIC_IDLE_TIMEOUT_MS)) {
            this.stopWatching();

            if (this.errorCallback) {
                this.errorCallback('Traffic updates automatically turned off after 10 minutes of inactivity');
            }
        } else { // if ($scope.$route.current.controller == "mapCtrl") { TODO?
            this.sendTrafficRequests();
        }
    }


    private sendTrafficRequests() {
        // OGN
        this.ognService.readTraffic(
            this.extent,
            TRAFFIC_MAX_AGE_SEC,
            this.onOgnServiceSuccessCallback.bind(this),
            this.onOgnServiceErrorCallback.bind(this));

        // ADSB-Exchange TODO
    }


    private onOgnServiceSuccessCallback(trafficList: Traffic[]) {
        if (!this.isActivated) {
            return;
        }

        this.status = TrafficServiceStatus.CURRENT;
        this.mergeTraffic(trafficList);
        this.compactTraffic();

        if (this.successCallback) {
            this.successCallback(this.trafficList);
        }
    }


    private onOgnServiceErrorCallback(message: string) {
        if (!this.isActivated) {
            return;
        }

        this.status = TrafficServiceStatus.ERROR;

        if (this.errorCallback) {
            this.errorCallback(message);
        }
    }


    private mergeTraffic(newTraffic: Traffic[]) {
        this.trafficList = newTraffic; // TODO
    }


    private compactTraffic() {
    }
}
