import {Traffic} from '../domain/traffic';


export class TrafficMergerIcaoType {
    public static merge(oldTraffic: Traffic, newTraffic: Traffic): string {
        // always overwrite undefined / empty
        if (!oldTraffic.icaoType) {
            return newTraffic.icaoType;
        } else {
            return oldTraffic.icaoType;
        }
    }
}
