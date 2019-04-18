import {Traffic, TrafficDataSource} from '../model/traffic';
import {TrafficMergerAcType} from './traffic-merger-ac-type';
import {TrafficMergerRegistration} from './traffic-merger-registration';
import {TrafficMergerCallsign} from './traffic-merger-callsign';
import {TrafficMergerOpCallsign} from './traffic-merger-op-callsign';
import {TrafficMergerAcModel} from './traffic-merger-ac-model';
import {TrafficMergerPositions} from './traffic-merger-positions';
import {TrafficMergerIcaoType} from './traffic-merger-icao-type';
import {Extent3d} from '../../shared/model/geometry/extent3d';


export class TrafficMerger {
    public static getTrafficMapKey(ac: Traffic): string {
        return ac.addressType + '_' + ac.acAddress.toUpperCase();
    }


    public static mergeTrafficMap(trafficMap: Map<string, Traffic>, newTrafficList: Traffic[], extent: Extent3d): Map<string, Traffic> {
        const newTrafficMap = TrafficMerger.cloneTrafficMap(trafficMap);
        TrafficMerger.mergeTraffic(newTrafficMap, newTrafficList, extent);
        TrafficMerger.removeTrafficWithoutPosition(newTrafficMap);

        return newTrafficMap;
    }


    private static cloneTrafficMap(trafficMap: Map<string, Traffic>): Map<string, Traffic> {
        const newTrafficMap = new Map<string, Traffic>();
        trafficMap.forEach((value, key) => newTrafficMap.set(key, trafficMap.get(key).clone()));

        return newTrafficMap;
    }


    private static mergeTraffic(trafficMap: Map<string, Traffic>,  newTrafficList: Traffic[], extent: Extent3d) {
        for (const newTraffic of newTrafficList) {
            const trafficKey = TrafficMerger.getTrafficMapKey(newTraffic);

            if (!trafficMap.has(trafficKey)) {
                trafficMap.set(trafficKey, newTraffic); // add new ac to list
                newTraffic.positions = TrafficMergerPositions.merge(undefined, newTraffic, extent);
            } else {
                const ac = trafficMap.get(trafficKey);
                ac.dataSource = newTraffic.dataSource;
                ac.acType = TrafficMergerAcType.merge(ac, newTraffic);
                ac.icaoType = TrafficMergerIcaoType.merge(ac, newTraffic);
                ac.registration = TrafficMergerRegistration.merge(ac, newTraffic);
                ac.callsign = TrafficMergerCallsign.merge(ac, newTraffic);
                ac.opCallsign = TrafficMergerOpCallsign.merge(ac, newTraffic);
                ac.acModel = TrafficMergerAcModel.merge(ac, newTraffic);
                ac.positions = TrafficMergerPositions.merge(ac, newTraffic, extent);

                if (newTraffic.dataSource === TrafficDataSource.DETAILS) {
                    ac.isDetailsLoaded = true;
                }
            }
        }
    }


    private static removeTrafficWithoutPosition(trafficMap: Map<string, Traffic>) {
        for (const trafficKey of Array.from(trafficMap.keys())) {
            const traffic = trafficMap.get(trafficKey);
            const oldestTimestampMs = Date.now() - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC * 1000;

            traffic.positions = traffic.positions.filter(pos => pos.position.timestamp.epochMs >= oldestTimestampMs);

            if (!traffic.hasPositions()) {
                trafficMap.delete(trafficKey);
            }
        }
    }
}
