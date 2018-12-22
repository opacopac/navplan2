import {Traffic} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';
import {TrafficMergerAcModel} from './traffic-merger-ac-model';
import {TrafficMergerRegistration} from './traffic-merger-registration';
import {TrafficMergerCallsign} from './traffic-merger-callsign';
import {TrafficMergerOpCallsign} from './traffic-merger-op-callsign';
import {TrafficMergerAcType} from './traffic-merger-ac-type';
import {TrafficMerger} from './traffic-merger';


const TRAFFIC_MAX_AGE_SEC = 120;


export enum TrafficServiceStatus {
    OFF,
    WAITING,
    CURRENT,
    ERROR,
}


export class TrafficReducerService {
    public static reduceTrafficMap(trafficMap: Map<string, Traffic>, newTrafficList: Traffic[]): Map<string, Traffic> {
        const newTrafficMap = this.cloneTrafficMap(trafficMap);
        this.insertOrMergeTraffic(newTrafficMap, newTrafficList);
        this.compactTraffic(newTrafficMap);
        return newTrafficMap;
    }


    private static cloneTrafficMap(trafficMap: Map<string, Traffic>): Map<string, Traffic> {
        const newTrafficMap = new Map<string, Traffic>();
        trafficMap.forEach((value, key) => newTrafficMap.set(key, trafficMap.get(key).clone()));

        return newTrafficMap;
    }


    private static insertOrMergeTraffic(trafficMap: Map<string, Traffic>,  newTrafficList: Traffic[]) {
        for (const newTraffic of newTrafficList) {
            const trafficKey = this.getTrafficKey(newTraffic);

            if (!trafficMap.has(trafficKey)) {
                trafficMap.set(trafficKey, newTraffic); // add new ac to list
            } else {
                const ac = trafficMap.get(trafficKey);
                TrafficMerger.merge(ac, newTraffic);
            }
        }
    }


    private static getTrafficKey(ac: Traffic): string {
        return ac.addressType + '_' + ac.acAddress.toUpperCase();
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
