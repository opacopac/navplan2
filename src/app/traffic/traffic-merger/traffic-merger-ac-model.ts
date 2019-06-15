import {Traffic, TrafficDataSource} from '../domain/traffic';
import {StringnumberService} from '../../shared/services/stringnumber/stringnumber.service';


export class TrafficMergerAcModel {
    public static merge(oldTraffic: Traffic, newTraffic: Traffic): string {
        // always overwrite emtpy
        if (StringnumberService.isNullOrEmpty(oldTraffic.acModel)) {
            return newTraffic.acModel;
        } else if (StringnumberService.isNullOrEmpty(newTraffic.acModel)) {
            return oldTraffic.acModel;
        }

        switch (newTraffic.dataSource) {
            case TrafficDataSource.ADSBX :
            case TrafficDataSource.OGN:
                return newTraffic.acModel;
            default:
                return oldTraffic.acModel;
        }
    }
}
