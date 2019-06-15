import {Traffic, TrafficDataSource} from '../domain/traffic';
import {StringnumberService} from '../../shared/services/stringnumber/stringnumber.service';


export class TrafficMergerOpCallsign {
    public static merge(oldTraffic: Traffic, newTraffic: Traffic): string {
        // always overwrite emtpy
        if (StringnumberService.isNullOrEmpty(oldTraffic.opCallsign)) {
            return newTraffic.opCallsign;
        } else if (StringnumberService.isNullOrEmpty(newTraffic.opCallsign)) {
            return oldTraffic.opCallsign;
        }

        switch (newTraffic.dataSource) {
            case TrafficDataSource.ADSBX :
                return newTraffic.opCallsign;
            case TrafficDataSource.OPENSKY: // remark: has op callsign but without mil special case
            case TrafficDataSource.OGN:
            default:
                return oldTraffic.opCallsign; // use old callsign
        }
    }
}
