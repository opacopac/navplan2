import {Traffic} from '../model/traffic';
import {TrafficMergerAcType} from './traffic-merger-ac-type';
import {TrafficMergerRegistration} from './traffic-merger-registration';
import {TrafficMergerCallsign} from './traffic-merger-callsign';
import {TrafficMergerOpCallsign} from './traffic-merger-op-callsign';
import {TrafficMergerAcModel} from './traffic-merger-ac-model';
import {TrafficMergerPositions} from './traffic-merger-positions';



export class TrafficMerger {
    public static getTrafficMapKey(ac: Traffic): string {
        return ac.addressType + '_' + ac.acAddress.toUpperCase();
    }


    public static mergeTrafficMap(trafficMap: Map<string, Traffic>, newTrafficList: Traffic[]): Map<string, Traffic> {
        const newTrafficMap = TrafficMerger.cloneTrafficMap(trafficMap);
        TrafficMerger.mergeTraffic(newTrafficMap, newTrafficList);
        TrafficMerger.removeTrafficWithoutPosition(newTrafficMap);

        return newTrafficMap;
    }


    private static cloneTrafficMap(trafficMap: Map<string, Traffic>): Map<string, Traffic> {
        const newTrafficMap = new Map<string, Traffic>();
        trafficMap.forEach((value, key) => newTrafficMap.set(key, trafficMap.get(key).clone()));

        return newTrafficMap;
    }


    private static mergeTraffic(trafficMap: Map<string, Traffic>,  newTrafficList: Traffic[]) {
        for (const newTraffic of newTrafficList) {
            const trafficKey = TrafficMerger.getTrafficMapKey(newTraffic);

            if (!trafficMap.has(trafficKey)) {
                trafficMap.set(trafficKey, newTraffic); // add new ac to list
                newTraffic.positions = TrafficMergerPositions.mergeNew(newTraffic);
            } else {
                const ac = trafficMap.get(trafficKey);
                ac.dataSource = newTraffic.dataSource;
                ac.acType = TrafficMergerAcType.merge(ac, newTraffic);
                ac.registration = TrafficMergerRegistration.merge(ac, newTraffic);
                ac.callsign = TrafficMergerCallsign.merge(ac, newTraffic);
                ac.opCallsign = TrafficMergerOpCallsign.merge(ac, newTraffic);
                ac.acModel = TrafficMergerAcModel.merge(ac, newTraffic);
                ac.positions = TrafficMergerPositions.merge(ac, newTraffic);
            }
        }
    }


    private static removeTrafficWithoutPosition(trafficMap: Map<string, Traffic>) {
        for (const trafficKey of Array.from(trafficMap.keys())) {
            if (trafficMap.get(trafficKey).positions.length === 0) {
                trafficMap.delete(trafficKey);
            }
        }
    }
}
