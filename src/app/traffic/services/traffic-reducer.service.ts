import {Traffic} from '../model/traffic';
import {TrafficMerger} from './traffic-merger/traffic-merger';


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
        this.removeTrafficWithoutPosition(newTrafficMap);
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


    private static removeTrafficWithoutPosition(trafficMap: Map<string, Traffic>) {
        for (const trafficKey of Array.from(trafficMap.keys())) {
            if (trafficMap.get(trafficKey).positions.length === 0) {
                trafficMap.delete(trafficKey);
            }
        }
    }
}
