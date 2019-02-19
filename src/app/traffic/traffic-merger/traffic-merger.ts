import {Traffic, TrafficDataSource} from '../model/traffic';
import {TrafficMergerAcType} from './traffic-merger-ac-type';
import {TrafficMergerRegistration} from './traffic-merger-registration';
import {TrafficMergerCallsign} from './traffic-merger-callsign';
import {TrafficMergerOpCallsign} from './traffic-merger-op-callsign';
import {TrafficMergerAcModel} from './traffic-merger-ac-model';
import {TrafficMergerPositions} from './traffic-merger-positions';
import {TrafficMergerIcaoType} from './traffic-merger-icao-type';
import {Extent4d} from '../../shared/model/geometry/extent4d';


export class TrafficMerger {
    public static getTrafficMapKey(ac: Traffic): string {
        return ac.addressType + '_' + ac.acAddress.toUpperCase();
    }


    public static mergeTrafficMap(trafficMap: Map<string, Traffic>, newTrafficList: Traffic[], extent: Extent4d): Map<string, Traffic> {
        const newTrafficListFiltered = this.filterTrafficListByExtent(newTrafficList, extent);
        const newTrafficMap = TrafficMerger.cloneTrafficMap(trafficMap);
        TrafficMerger.mergeTraffic(newTrafficMap, newTrafficListFiltered);
        TrafficMerger.removeTrafficWithoutPosition(newTrafficMap);

        return newTrafficMap;
    }


    private static cloneTrafficMap(trafficMap: Map<string, Traffic>): Map<string, Traffic> {
        const newTrafficMap = new Map<string, Traffic>();
        trafficMap.forEach((value, key) => newTrafficMap.set(key, trafficMap.get(key).clone()));

        return newTrafficMap;
    }


    private static filterTrafficListByExtent(trafficList: Traffic[], extent: Extent4d): Traffic[] {
        return trafficList.map(traffic => {
            const filteredTraffic = traffic.clone();
            filteredTraffic.positions = traffic.positions.filter(pos => extent.containsPoint(pos.position));
            return filteredTraffic;
        }).filter(traffic => traffic.positions.length > 0);
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
                ac.icaoType = TrafficMergerIcaoType.merge(ac, newTraffic);
                ac.registration = TrafficMergerRegistration.merge(ac, newTraffic);
                ac.callsign = TrafficMergerCallsign.merge(ac, newTraffic);
                ac.opCallsign = TrafficMergerOpCallsign.merge(ac, newTraffic);
                ac.acModel = TrafficMergerAcModel.merge(ac, newTraffic);
                ac.positions = TrafficMergerPositions.merge(ac, newTraffic);

                if (newTraffic.dataSource === TrafficDataSource.DETAILS) {
                    ac.isDetailsLoaded = true;
                }
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
