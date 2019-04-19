import {Traffic, TrafficDataSource} from '../model/traffic';
import {StringnumberService} from '../../shared/services/stringnumber/stringnumber.service';


export class TrafficMergerRegistration {
    public static merge(oldTraffic: Traffic, newTraffic: Traffic): string {
        // always overwrite emtpy
        if (StringnumberService.isNullOrEmpty(oldTraffic.registration)) {
            return newTraffic.registration;
        } else if (StringnumberService.isNullOrEmpty(newTraffic.registration)) {
            return oldTraffic.registration;
        }

        switch (newTraffic.dataSource) {
            case TrafficDataSource.ADSBX :
            case TrafficDataSource.OGN:
                return newTraffic.registration;
            default:
                return oldTraffic.registration;
        }
    }
}
