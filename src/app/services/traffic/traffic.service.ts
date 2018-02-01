import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { Extent } from '../../model/ol-model/extent';
import {
    Traffic, TrafficDataSource, TrafficAircraftType, TrafficPositionMethod,
    TrafficPosition
} from '../../model/traffic';
import { TrafficOgnService } from './traffic-ogn.service';
import { TrafficAdsbexchangeService } from './traffic-adsbexchange.service';


const TRAFFIC_UPDATE_INTERVALL_MS = 5000;
const TRAFFIC_MAX_AGE_SEC = 120;
const TRAFFIC_OGN_WAIT_FOR_DATA_SEC = 1;
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
    private trafficMap: Map<string, Traffic>;
    private successCallback: (trafficList: Traffic[]) => void;
    private errorCallback: (message: string) => void;

    constructor(private http: HttpClient,
                private ognService: TrafficOgnService,
                private adsbExService: TrafficAdsbexchangeService,
                private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
        this.isActivated = false;
        this.status = TrafficServiceStatus.OFF;
        this.trafficMap = new Map<string, Traffic>();
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
        this.sendTrafficRequests(true);
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
            this.sendTrafficRequests(false);
        }
    }


    private sendTrafficRequests(isInitialRequest: boolean) {
        // OGN
        this.ognService.readTraffic(
            this.extent,
            TRAFFIC_MAX_AGE_SEC,
            isInitialRequest ? TRAFFIC_OGN_WAIT_FOR_DATA_SEC : 0,
            this.onReadTrafficSuccessCallback.bind(this),
            this.onReadTrafficErrorCallback.bind(this));

        // ADSB-Exchange
        this.adsbExService.readTraffic(
            this.extent,
            15000, // TODO
            this.onReadTrafficSuccessCallback.bind(this),
            this.onReadTrafficErrorCallback.bind(this)
        );
    }


    private onReadTrafficSuccessCallback(trafficList: Traffic[]) {
        if (!this.isActivated) {
            return;
        }

        this.status = TrafficServiceStatus.CURRENT;
        this.mergeTraffic(trafficList);
        this.compactTraffic();

        if (this.successCallback) {
            this.successCallback(Array.from(this.trafficMap.values()));
        }
    }


    private onReadTrafficErrorCallback(message: string) {
        if (!this.isActivated) {
            return;
        }

        this.status = TrafficServiceStatus.ERROR;

        if (this.errorCallback) {
            this.errorCallback(message);
        }
    }


    private mergeTraffic(newTrafficList: Traffic[]) {
        for (const newTraffic of newTrafficList) {
            const trafficKey = this.getTrafficKey(newTraffic);

            if (!this.trafficMap.has(trafficKey)) {
                // add new ac to list
                this.trafficMap.set(trafficKey, newTraffic);
            } else {
                const ac = this.trafficMap.get(trafficKey);

                // update traffic info
                if (newTraffic.dataSource === TrafficDataSource.ADSBX) {
                    // overwrite ac info if data source is adsbexchange
                    ac.actype = (newTraffic.actype !== TrafficAircraftType.UNKNOWN && ac.actype !== TrafficAircraftType.DROP_PLANE) ? newTraffic.actype : ac.actype; // don't overwrite drop plane type
                    ac.registration = (newTraffic.registration && newTraffic.registration !== '') ? newTraffic.registration : ac.registration;
                    ac.callsign = (newTraffic.callsign && newTraffic.callsign !== '') ? newTraffic.callsign : ac.callsign;
                    ac.opCallsign = (newTraffic.opCallsign && newTraffic.opCallsign !== '') ? newTraffic.opCallsign : ac.opCallsign;
                    ac.aircraftModelType = (newTraffic.aircraftModelType && newTraffic.aircraftModelType !== '') ? newTraffic.aircraftModelType : ac.aircraftModelType;
                } else if (newTraffic.dataSource === TrafficDataSource.OGN) {
                    // overwrite ac info by ogn data only if previously empty
                    ac.actype = (ac.actype === TrafficAircraftType.UNKNOWN || newTraffic.actype === TrafficAircraftType.DROP_PLANE) ? newTraffic.actype : ac.actype; // overwrite drop plane type
                    ac.registration = (!ac.registration || ac.registration === '') ? newTraffic.registration : ac.registration;
                    ac.callsign = (!ac.callsign || ac.callsign === '') ? newTraffic.callsign : ac.callsign;
                    ac.opCallsign = (!ac.opCallsign || ac.opCallsign === '') ? newTraffic.opCallsign : ac.opCallsign;
                    ac.aircraftModelType = (!ac.aircraftModelType || ac.aircraftModelType === '') ? newTraffic.aircraftModelType : ac.aircraftModelType;
                }

                // add new positions
                for (const pos of newTraffic.positions) {
                    ac.positions.push(pos);
                }
            }
        }
    }


    private getTrafficKey(ac: Traffic): string {
        return ac.addresstype + '_' + ac.acaddress;
    }


    private compactTraffic() {
        let lastPos: TrafficPosition;
        const d = new Date();
        const oldestTimestamp = d.getTime() - TRAFFIC_MAX_AGE_SEC * 1000;

        for (const trafficKey of Array.from(this.trafficMap.keys())) {
            const ac = this.trafficMap.get(trafficKey);

            // sort positions by time DESC
            ac.positions.sort(function (a: TrafficPosition, b: TrafficPosition) {
                return a.position.timestamp.getMs() - b.position.timestamp.getMs();
            });


            // remove expired or identical entries
            const newPositions = [];
            lastPos = undefined;

            for (let i = 0; i < ac.positions.length; i++) {
                // mark expired entries
                if (ac.positions[i].position.timestamp.getMs() < oldestTimestamp) {
                    continue;
                }

                // check for points to skip
                if (lastPos) {
                    // skip identical positions
                    if (ac.positions[i].position.latitude === lastPos.position.latitude
                        && ac.positions[i].position.longitude === lastPos.position.longitude) {
                        continue;
                    }

                    // skip identical timestamps
                    if (ac.positions[i].position.timestamp.getMs() === lastPos.position.timestamp.getMs()) {
                        continue;
                    }

                    // skip adsb-exchange positions within 30 sec after more reliable ogn position
                    if (lastPos.method === TrafficPositionMethod.FLARM && ac.positions[i].method !== TrafficPositionMethod.FLARM
                        && ac.positions[i].position.timestamp.getMs() < lastPos.position.timestamp.getMs() + 30000) {
                        continue;
                    }
                }

                lastPos = ac.positions[i];
                newPositions.push(lastPos);
            }


            // remove aircrafts without positions
            if (newPositions.length === 0) {
                this.trafficMap.delete(trafficKey);
            }


            ac.positions = newPositions;
        }
    }
}
