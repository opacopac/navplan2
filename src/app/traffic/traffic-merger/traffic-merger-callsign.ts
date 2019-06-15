import {Traffic, TrafficDataSource} from '../domain/traffic';
import {StringnumberService} from '../../shared/services/stringnumber/stringnumber.service';


export class TrafficMergerCallsign {
    public static merge(oldTraffic: Traffic, newTraffic: Traffic): string {
        // always overwrite emtpy
        if (StringnumberService.isNullOrEmpty(oldTraffic.callsign)) {
            return newTraffic.callsign;
        } else if (StringnumberService.isNullOrEmpty(newTraffic.callsign)) {
            return oldTraffic.callsign;
        }

        switch (newTraffic.dataSource) {
            case TrafficDataSource.ADSBX:
            case TrafficDataSource.ADSBX2:
            case TrafficDataSource.OPENSKY:
                return newTraffic.callsign;
            default:
                return oldTraffic.callsign;
        }
    }
}
