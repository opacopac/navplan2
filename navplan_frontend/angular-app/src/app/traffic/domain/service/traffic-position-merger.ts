import {TrafficPosition} from '../model/traffic-position';
import {TrafficPrio} from '../model/traffic-prio';
import {Extent3d} from '../../../geo-physics/domain/model/geometry/extent3d';
import {IDate} from '../../../system/domain/service/date/i-date';


export class TrafficPositionMerger {
    // TODO => config
    public static readonly TRAFFIC_MAX_AGE_SEC = 120;
    public static readonly INFERIOR_TRAFFIC_DELAY_SEC = 30;


    public constructor(private date: IDate) {
    }


    public merge(oldTrafficPosList: TrafficPosition[], newTrafficPosList: TrafficPosition[], extent: Extent3d): TrafficPosition[] {
        const posList: TrafficPosition[] = [];

        this.addPositions(oldTrafficPosList, posList, extent);
        this.addPositions(newTrafficPosList, posList, extent);
        this.sortPositions(posList);
        return this.filterPosList(posList, extent);
    }


    private addPositions(oldPosList: TrafficPosition[], newPosList: TrafficPosition[], extent: Extent3d) {
        // TODO: compare to server time
        const oldestTimestampMs = this.date.nowMs() - TrafficPositionMerger.TRAFFIC_MAX_AGE_SEC * 1000;

        oldPosList.forEach(pos => {
            if (extent.containsPoint2d(pos.position) && pos.position.timestamp.epochMs >= oldestTimestampMs) {
                newPosList.push(pos);
            }
        });
    }


    private sortPositions(positions: TrafficPosition[]) {
        // sort positions by pos timestamp DESC
        positions.sort(function (a: TrafficPosition, b: TrafficPosition) {
            return a.position.timestamp.epochMs - b.position.timestamp.epochMs;
        });
    }


    private filterPosList(positions: TrafficPosition[], extent: Extent3d): TrafficPosition[] {
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


    private isDuplicateLonLat(pos1: TrafficPosition, pos2: TrafficPosition): boolean {
        if (!pos1) {
            return false;
        }

        return pos1.position.equals(pos2.position);
    }


    private isDuplicateTimestamp(pos1: TrafficPosition, pos2: TrafficPosition): boolean {
        if (!pos1) {
            return false;
        }

        return pos1.position.timestamp.epochMs === pos2.position.timestamp.epochMs;
    }


    private isInferiorWithinDelay(pos1: TrafficPosition, pos2: TrafficPosition): boolean {
        if (!pos1) {
            return false;
        }

        // check if within 30s
        if (pos2.position.timestamp.epochSec - pos1.position.timestamp.epochSec > TrafficPositionMerger.INFERIOR_TRAFFIC_DELAY_SEC) {
            return false;
        }

        return TrafficPrio.hasHigherPrio(pos1, pos2);
    }
}
