import {Traffic} from '../../domain-model/traffic';
import {TrafficPositionMerger} from '../traffic-position-merger';
import {TrafficOpensky} from '../../domain-model/traffic-opensky';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {IDate} from '../../../system/domain-service/date/i-date';
import {TrafficMap} from '../../domain-model/traffic-map';
import {TrafficState} from '../../domain-model/traffic-state';


export class OpenskyTrafficMerger {
    private trafficPositionMerger: TrafficPositionMerger;


    public constructor(private date: IDate) {
        this.trafficPositionMerger = new TrafficPositionMerger(this.date);
    }


    public merge(state: TrafficState, openskyTrafficList: TrafficOpensky[]) {
        const newTrafficMap = state.trafficMap.clone();

        for (const acNew of openskyTrafficList) {
            const trafficKey = TrafficMap.getKey(acNew.address);
            let ac = newTrafficMap.get(trafficKey);

            if (!ac) {
                ac = Traffic.createEmpty(acNew.address);
                newTrafficMap.set(trafficKey, ac);
            }

            ac.callsign = StringnumberHelper.getNonNullOrDefault(ac.callsign, acNew.callsign, acNew.callsign);
            ac.positions = this.trafficPositionMerger.merge(ac.positions, acNew.positions, state.extent);
        }

        newTrafficMap.removeOutdatedTraffic(state.maxTrafficAgeSec);

        return newTrafficMap;
    }
}
