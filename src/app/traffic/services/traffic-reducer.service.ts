import {Traffic, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';


const TRAFFIC_MAX_AGE_SEC = 120;


export enum TrafficServiceStatus {
    OFF,
    WAITING,
    CURRENT,
    ERROR,
}


export class TrafficReducerService {
    public static reduceTrafficMap(trafficMap: Map<string, Traffic>, newTrafficList): Map<string, Traffic> {
        const newTrafficMap = this.cloneTrafficMap(trafficMap);
        this.mergeTraffic(newTrafficMap, newTrafficList);
        this.compactTraffic(newTrafficMap);
        return newTrafficMap;
    }


    private static cloneTrafficMap(trafficMap: Map<string, Traffic>): Map<string, Traffic> {
        // debugger;
        const newTrafficMap = new Map<string, Traffic>();
        trafficMap.forEach((value, key) => newTrafficMap.set(key, trafficMap.get(key).clone()));

        return newTrafficMap;
    }


    private static getTrafficKey(ac: Traffic): string {
        return ac.addresstype + '_' + ac.acaddress.toUpperCase();
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
                } else if (newTraffic.dataSource === TrafficDataSource.OPENSKY) {
                    // overwrite callsign only if previously empty
                    ac.callsign = (!ac.callsign || ac.callsign === '') ?
                        newTraffic.callsign : ac.callsign;
                    ac.opCallsign = (!ac.opCallsign || ac.opCallsign === '') ?
                        newTraffic.opCallsign : ac.opCallsign;
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
