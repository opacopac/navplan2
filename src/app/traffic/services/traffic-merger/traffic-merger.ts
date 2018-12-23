import {Traffic} from '../../model/traffic';
import {TrafficMergerAcType} from './traffic-merger-ac-type';
import {TrafficMergerRegistration} from './traffic-merger-registration';
import {TrafficMergerCallsign} from './traffic-merger-callsign';
import {TrafficMergerOpCallsign} from './traffic-merger-op-callsign';
import {TrafficMergerAcModel} from './traffic-merger-ac-model';
import {TrafficMergerPositions} from './traffic-merger-positions';


export class TrafficMerger {
    public static merge(ac: Traffic, newTraffic: Traffic) {
        ac.acAddress = newTraffic.acAddress;
        ac.addressType = newTraffic.addressType;
        ac.dataSource = newTraffic.dataSource;
        ac.acType = TrafficMergerAcType.merge(ac, newTraffic);
        ac.registration = TrafficMergerRegistration.merge(ac, newTraffic);
        ac.callsign = TrafficMergerCallsign.merge(ac, newTraffic);
        ac.opCallsign = TrafficMergerOpCallsign.merge(ac, newTraffic);
        ac.acModel = TrafficMergerAcModel.merge(ac, newTraffic);
        ac.positions = TrafficMergerPositions.merge(ac, newTraffic);
    }
}
