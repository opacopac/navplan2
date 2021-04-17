import {TrafficPositionMerger} from '../traffic-position-merger';
import {TrafficOgn} from '../../domain-model/traffic-ogn';
import {TrafficAircraftType} from '../../domain-model/traffic-aircraft-type';
import {IDate} from '../../../system/domain-service/date/i-date';
import {TrafficMap} from '../../domain-model/traffic-map';
import {Traffic} from '../../domain-model/traffic';
import {TrafficState} from '../../domain-model/traffic-state';


export class OgnTrafficMerger {
    private trafficPositionMerger: TrafficPositionMerger;


    public constructor(private date: IDate) {
        this.trafficPositionMerger = new TrafficPositionMerger(this.date);
    }


    public merge(state: TrafficState, ognTrafficList: TrafficOgn[]): TrafficMap {
        const newTrafficMap = state.trafficMap.clone();

        for (const acNew of ognTrafficList) {
            const trafficKey = TrafficMap.getKey(acNew.address);
            let ac = newTrafficMap.get(trafficKey);

            if (!ac) {
                ac = Traffic.createEmpty(acNew.address);
                newTrafficMap.set(trafficKey, ac);
            }

            ac.acType = this.mergeAcType(ac.acType, acNew);
            ac.positions = this.trafficPositionMerger.merge(ac.positions, acNew.positions, state.extent);
        }

        newTrafficMap.removeOutdatedTraffic(state.maxTrafficAgeSec);

        return newTrafficMap;
    }


    private mergeAcType(oldAcType: TrafficAircraftType, acNew: TrafficOgn): TrafficAircraftType {
        if (!acNew.acType || acNew.acType === TrafficAircraftType.UNKNOWN) {
            return oldAcType;
        } else {
            return acNew.acType;
        }
    }
}
