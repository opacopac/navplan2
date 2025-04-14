import {Traffic} from '../../../traffic/domain/model/traffic';
import {TrafficPositionMerger} from '../../../traffic/domain/service/traffic-position-merger';
import {OpenskyTraffic} from '../model/opensky-traffic';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';
import {IDate} from '../../../system/domain/service/date/i-date';
import {TrafficMap} from '../../../traffic/domain/model/traffic-map';
import {TrafficState} from '../../../traffic/state/state-model/traffic-state';


export class OpenskyTrafficMerger {
    private trafficPositionMerger: TrafficPositionMerger;


    public constructor(private date: IDate) {
        this.trafficPositionMerger = new TrafficPositionMerger(this.date);
    }


    public merge(state: TrafficState, openskyTrafficList: OpenskyTraffic[]) {
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
