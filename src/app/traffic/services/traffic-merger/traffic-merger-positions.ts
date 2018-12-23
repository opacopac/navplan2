import {Traffic} from '../../model/traffic';
import {TrafficPosition} from '../../model/traffic-position';


export class TrafficMergerPositions {
    public static readonly TRAFFIC_MAX_AGE_SEC = 120;


    public static merge(oldTraffic: Traffic, newTraffic: Traffic): TrafficPosition[] {
        const newPosList: TrafficPosition[] = [];
        const oldestTimestampMs = Date.now() - this.TRAFFIC_MAX_AGE_SEC * 1000;
        this.addOldPositions(oldTraffic, newPosList, oldestTimestampMs);
        this.addNewPositions(newTraffic, newPosList, oldestTimestampMs);
        this.sortPositions(newPosList);

        return newPosList;
    }


    /* TODO: still necessary?
                        // skip adsb-exchange positions within 30 sec after more reliable ogn position
                    if (lastPos.method === TrafficPositionMethod.FLARM && ac.positions[i].method !== TrafficPositionMethod.FLARM
                        && ac.positions[i].position.timestamp.getMs() < lastPos.position.timestamp.getMs() + 30000) {
                        continue;
                    }
     */

    private static addOldPositions(oldTraffic: Traffic, newPosList: TrafficPosition[], oldestTimestampMs: number) {
        oldTraffic.positions.forEach(pos => {
            // filter old entries
            if (pos.position.timestamp.getMs() < oldestTimestampMs) {
                return;
            }

            newPosList.push(pos);
        });
    }


    private static addNewPositions(newTraffic: Traffic, newPosList: TrafficPosition[], oldestTimestampMs: number) {
        for (const pos of newTraffic.positions) {
            // skip old entries
            if (pos.position.timestamp.getMs() < oldestTimestampMs) {
                continue;
            }

            // skip same lat/lon or same timestamp
            if (this.isDuplicatePos(pos, newPosList)) {
                continue;
            }

            newPosList.push(pos);
        }
    }


    private static isDuplicatePos(newPos: TrafficPosition, posList: TrafficPosition[]): boolean {
        for (const pos of posList) {
            if (newPos.position.equals(pos.position)) {
                return true;
            }

            if (newPos.position.timestamp.getMs() === pos.position.timestamp.getMs()) {
                return true;
            }
        }

        return false;
    }


    private static sortPositions(positions: TrafficPosition[]) {
        // sort positions by pos timestamp DESC
        positions.sort(function (a: TrafficPosition, b: TrafficPosition) {
            return a.position.timestamp.getMs() - b.position.timestamp.getMs();
        });
    }
}
