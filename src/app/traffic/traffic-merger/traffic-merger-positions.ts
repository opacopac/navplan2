import {Traffic} from '../model/traffic';
import {TrafficPosition} from '../model/traffic-position';
import {TrafficPrio} from '../model/traffic-prio';


export class TrafficMergerPositions {
    public static readonly TRAFFIC_MAX_AGE_SEC = 120;
    public static readonly INFERIOR_TRAFFIC_DELAY_SEC = 30;


    public static merge(oldTraffic: Traffic, newTraffic: Traffic): TrafficPosition[] {
        const newPosList: TrafficPosition[] = [];
        this.addPositions(oldTraffic, newPosList);
        this.addPositions(newTraffic, newPosList);
        this.sortPositions(newPosList);
        return this.filterPosList(newPosList);
    }


    private static addPositions(traffic: Traffic, newPosList: TrafficPosition[]) {
        // TODO: compare to server time
        const oldestTimestampMs = Date.now() - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC * 1000;

        traffic.positions.forEach(pos => {
            if (pos.position.timestamp.getMs() >= oldestTimestampMs) {
                newPosList.push(pos);
            }
        });
    }


    private static sortPositions(positions: TrafficPosition[]) {
        // sort positions by pos timestamp DESC
        positions.sort(function (a: TrafficPosition, b: TrafficPosition) {
            return a.position.timestamp.getMs() - b.position.timestamp.getMs();
        });
    }


    private static filterPosList(positions: TrafficPosition[]): TrafficPosition[] {
        const newPos: TrafficPosition[] = [];
        let lastValidPos: TrafficPosition = null;

        for (let i = 0; i < positions.length; i++) {
            if (
                this.isDuplicateLonLat(lastValidPos, positions[i]) ||
                this.isDuplicateTimestamp(lastValidPos, positions[i]) ||
                this.isInferiorWithinDelay(lastValidPos, positions[i])
            ) {
                continue;
            }

            newPos.push(positions[i]);
            lastValidPos = positions[i];
        }

        return newPos;
    }


    private static isDuplicateLonLat(pos1: TrafficPosition, pos2: TrafficPosition): boolean {
        if (!pos1) {
            return false;
        }

        return pos1.position.equals(pos2.position);
    }


    private static isDuplicateTimestamp(pos1: TrafficPosition, pos2: TrafficPosition): boolean {
        if (!pos1) {
            return false;
        }

        return pos1.position.timestamp.getMs() === pos2.position.timestamp.getMs();
    }


    private static isInferiorWithinDelay(pos1: TrafficPosition, pos2: TrafficPosition): boolean {
        if (!pos1) {
            return false;
        }

        // check if within 30s
        if (pos2.position.timestamp.epochSec - pos1.position.timestamp.epochSec > this.INFERIOR_TRAFFIC_DELAY_SEC) {
            return false;
        }

        return TrafficPrio.hasHigherPrio(pos1, pos2);
    }
}
