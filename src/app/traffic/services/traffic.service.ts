import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Traffic, TrafficDataSource, TrafficAircraftType} from '../model/traffic';
import {TrafficOgnService} from './traffic-ogn.service';
import {TrafficAdsbexchangeService} from './traffic-adsbexchange.service';
import {Extent} from '../../shared/model/extent';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';


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
    private _extent: Extent;


    constructor(private http: HttpClient,
                private ognService: TrafficOgnService,
                private adsbExService: TrafficAdsbexchangeService) {
    }


    /*public watchTraffic(): Observable<Traffic[]> {
        return timer(0, TRAFFIC_UPDATE_INTERVALL_MS)
            .pipe(
                withLatestFrom(
                    this.ognService.readTraffic(this._extent, TRAFFIC_MAX_AGE_SEC,  false ? TRAFFIC_OGN_WAIT_FOR_DATA_SEC : 0, '12345')
                        .pipe(repeat()),
                    this.adsbExService.readTraffic(this._extent, 15000)
                        .pipe(repeat()),
                ),
                map(([tim, ogn, adsbEx]) => adsbEx)
            ); // .subscribe(([tim, asdf]) => { asdf[0] });

        const isInitialRequest = false; // TODO
        const ognTraffic$ = this.ognService.readTraffic(
            this._extent,
            TRAFFIC_MAX_AGE_SEC,
            isInitialRequest ? TRAFFIC_OGN_WAIT_FOR_DATA_SEC : 0, '12345'); // TODO

        const adsbExTraffic$ = this.adsbExService.readTraffic(
            this._extent,
            15000 // TODO
        );


        const trafficTimer$ =

    }*/


    /*private onTrafficTimer() {
        if (this.sessionService.isIdle(TRAFFIC_IDLE_TIMEOUT_MS)) {
            this.stopWatching();

            if (this.errorCallback) {
                this.errorCallback('Traffic updates automatically turned off after 10 minutes of inactivity');
            }
        } else { // if ($scope.$route.current.controller == "mapCtrl") { TODO?
            this.sendTrafficRequests(false);
        // }
    }*/


    /*private sendTrafficRequests(isInitialRequest: boolean) {
        // OGN
        this.ognService.readTraffic(
            this._extent,
            TRAFFIC_MAX_AGE_SEC,
            isInitialRequest ? TRAFFIC_OGN_WAIT_FOR_DATA_SEC : 0, '12345'); // TODO

        // ADSB-Exchange
        this.adsbExService.readTraffic(
            this._extent,
            15000 // TODO
        );
    }*/


    /*private onReadTrafficSuccessCallback(trafficList: Traffic[]) {
        this.mergeTraffic(trafficList);
        this.compactTraffic();
    }*/


    public static reduceTrafficMap(trafficMap: Map<string, Traffic>, newTrafficList): Map<string, Traffic> {
        const newTrafficMap = this.cloneTrafficMap(trafficMap);
        this.mergeTraffic(newTrafficMap, newTrafficList);
        this.compactTraffic(newTrafficMap);
        return newTrafficMap;
    }


    private static cloneTrafficMap(trafficMap: Map<string, Traffic>): Map<string, Traffic> {
        const newTrafficMap = new Map<string, Traffic>();
        for (const trafficKey in trafficMap.keys()) {
            newTrafficMap[trafficKey] = trafficMap[trafficKey].clone();
        }

        return newTrafficMap;
    }


    private static getTrafficKey(ac: Traffic): string {
        return ac.addresstype + '_' + ac.acaddress;
    }


    private static mergeTraffic(trafficMap: Map<string, Traffic>,  newTrafficList: Traffic[]) {
        for (const newTraffic of newTrafficList) {
            const trafficKey = this.getTrafficKey(newTraffic);

            if (!trafficMap.has(trafficKey)) {
                // add new ac to list
                trafficMap.set(trafficKey, newTraffic);
            } else {
                const ac = trafficMap.get(trafficKey);

                // update traffic info
                if (newTraffic.dataSource === TrafficDataSource.ADSBX) {
                    // overwrite ac info if data source is adsbexchange
                    ac.actype = (newTraffic.actype !== TrafficAircraftType.UNKNOWN && ac.actype !== TrafficAircraftType.DROP_PLANE) ?
                        newTraffic.actype : ac.actype; // don't overwrite drop plane type
                    ac.registration = (newTraffic.registration && newTraffic.registration !== '') ?
                        newTraffic.registration : ac.registration;
                    ac.callsign = (newTraffic.callsign && newTraffic.callsign !== '') ?
                        newTraffic.callsign : ac.callsign;
                    ac.opCallsign = (newTraffic.opCallsign && newTraffic.opCallsign !== '') ?
                        newTraffic.opCallsign : ac.opCallsign;
                    ac.aircraftModelType = (newTraffic.aircraftModelType && newTraffic.aircraftModelType !== '') ?
                        newTraffic.aircraftModelType : ac.aircraftModelType;
                } else if (newTraffic.dataSource === TrafficDataSource.OGN) {
                    // overwrite ac info by ogn data only if previously empty
                    ac.actype = (ac.actype === TrafficAircraftType.UNKNOWN || newTraffic.actype === TrafficAircraftType.DROP_PLANE) ?
                        newTraffic.actype : ac.actype; // overwrite drop plane type
                    ac.registration = (!ac.registration || ac.registration === '') ?
                        newTraffic.registration : ac.registration;
                    ac.callsign = (!ac.callsign || ac.callsign === '') ?
                        newTraffic.callsign : ac.callsign;
                    ac.opCallsign = (!ac.opCallsign || ac.opCallsign === '') ?
                        newTraffic.opCallsign : ac.opCallsign;
                    ac.aircraftModelType = (!ac.aircraftModelType || ac.aircraftModelType === '') ?
                        newTraffic.aircraftModelType : ac.aircraftModelType;
                }

                // add new positions
                for (const pos of newTraffic.positions) {
                    ac.positions.push(pos);
                }
            }
        }
    }


    private static compactTraffic(trafficMap: Map<string, Traffic>) {
        let lastPos: TrafficPosition;
        const d = new Date();
        const oldestTimestamp = d.getTime() - TRAFFIC_MAX_AGE_SEC * 1000;

        for (const trafficKey of Array.from(trafficMap.keys())) {
            const ac = trafficMap.get(trafficKey);

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
                trafficMap.delete(trafficKey);
            }


            ac.positions = newPositions;
        }
    }
}
