import {Traffic, TrafficAircraftType, TrafficDataSource} from '../domain/traffic';


export class TrafficMergerAcType {
    public static merge(oldTraffic: Traffic, newTraffic: Traffic): TrafficAircraftType {
        // always overwrite unknown
        if (oldTraffic.acType === TrafficAircraftType.UNKNOWN) {
            return newTraffic.acType;
        } else if (newTraffic.acType === TrafficAircraftType.UNKNOWN) {
            return oldTraffic.acType;
        }

        // never overwrite drop plane
        if (oldTraffic.acType === TrafficAircraftType.DROP_PLANE) {
            return oldTraffic.acType;
        } else if (newTraffic.acType === TrafficAircraftType.DROP_PLANE) {
            return newTraffic.acType;
        }

        switch (newTraffic.dataSource) {
            case TrafficDataSource.ADSBX :
            case TrafficDataSource.OGN:
                return newTraffic.acType;
            default:
                return oldTraffic.acType;
        }
    }
}
