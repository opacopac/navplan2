import {TrafficDataSource} from './traffic';
import {TrafficPosition, TrafficPositionMethod} from './traffic-position';


export interface TrafficPrioItem {
    source: TrafficDataSource;
    posMethod: TrafficPositionMethod;
    prio: number;
}


export class TrafficPrio {
    public static readonly TRAFFIC_PRIO_LIST: TrafficPrioItem[] = [
        { source: TrafficDataSource.OGN, posMethod: TrafficPositionMethod.FLARM, prio: 1 },
        { source: TrafficDataSource.OPENSKY, posMethod: TrafficPositionMethod.ADSB, prio: 1 },
        { source: TrafficDataSource.OPENSKY, posMethod: TrafficPositionMethod.MLAT, prio: 3 },
        { source: TrafficDataSource.ADSBX, posMethod: TrafficPositionMethod.ADSB, prio: 2 },
        { source: TrafficDataSource.ADSBX, posMethod: TrafficPositionMethod.MLAT, prio: 3 },
    ];


    public static getPrio(source: TrafficDataSource, posMethod: TrafficPositionMethod): number {
        for (const prioRule of TrafficPrio.TRAFFIC_PRIO_LIST) {
            if (prioRule.source === source && prioRule.posMethod === posMethod) {
                return prioRule.prio;
            }
        }

        return 3;
    }


    public static hasHigherPrio(pos1: TrafficPosition, pos2: TrafficPosition): boolean {
        const prio1 = TrafficPrio.getPrio(pos1.source, pos1.method);
        const prio2 = TrafficPrio.getPrio(pos2.source, pos2.method);

        return prio1 < prio2;
    }
}
