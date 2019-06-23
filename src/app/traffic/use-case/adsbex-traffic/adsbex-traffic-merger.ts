import {Traffic} from '../../domain/traffic';
import {TrafficPositionMerger} from '../traffic-position-merger';
import {TrafficAdsbex} from '../../domain/traffic-adsbex';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {IDate} from '../../../shared/services/date/i-date';
import {TrafficMap} from '../../domain/traffic-map';
import {TrafficState} from '../../domain/traffic-state';


export class AdsbexTrafficMerger {
    private trafficPositionMerger: TrafficPositionMerger;


    public constructor(private date: IDate) {
        this.trafficPositionMerger = new TrafficPositionMerger(this.date);
    }


    public merge(state: TrafficState, adsbexTrafficList: TrafficAdsbex[]) {
        const newTrafficMap = state.trafficMap.clone();

        for (const acNew of adsbexTrafficList) {
            const trafficKey = TrafficMap.getKey(acNew.address);
            let ac = newTrafficMap.get(trafficKey);

            if (!ac) {
                ac = Traffic.createEmpty(acNew.address);
                newTrafficMap.set(trafficKey, ac);
            }

            ac.acIcao = StringnumberService.getNonNullOrDefault(ac.acIcao, acNew.icaoType, acNew.icaoType);
            ac.registration = StringnumberService.getNonNullOrDefault(ac.registration, acNew.registration, acNew.registration);
            ac.callsign = StringnumberService.getNonNullOrDefault(ac.callsign, acNew.callsign, acNew.callsign);
            ac.opIcao = StringnumberService.getNonNullOrDefault(ac.opIcao, acNew.opIcao, acNew.opIcao);
            ac.positions = this.trafficPositionMerger.merge(ac.positions, acNew.positions, state.extent);
        }

        newTrafficMap.removeOutdatedTraffic(state.maxTrafficAgeSec);

        return newTrafficMap;
    }
}
