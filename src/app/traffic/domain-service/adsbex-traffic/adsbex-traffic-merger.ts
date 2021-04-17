import {Traffic} from '../../domain-model/traffic';
import {TrafficPositionMerger} from '../traffic-position-merger';
import {TrafficAdsbex} from '../../domain-model/traffic-adsbex';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {IDate} from '../../../system/domain-service/date/i-date';
import {TrafficMap} from '../../domain-model/traffic-map';
import {TrafficState} from '../../domain-model/traffic-state';


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

            ac.acIcao = StringnumberHelper.getNonNullOrDefault(ac.acIcao, acNew.icaoType, acNew.icaoType);
            ac.registration = StringnumberHelper.getNonNullOrDefault(ac.registration, acNew.registration, acNew.registration);
            ac.callsign = StringnumberHelper.getNonNullOrDefault(ac.callsign, acNew.callsign, acNew.callsign);
            ac.opIcao = StringnumberHelper.getNonNullOrDefault(ac.opIcao, acNew.opIcao, acNew.opIcao);
            ac.positions = this.trafficPositionMerger.merge(ac.positions, acNew.positions, state.extent);
        }

        newTrafficMap.removeOutdatedTraffic(state.maxTrafficAgeSec);

        return newTrafficMap;
    }
}
