import {Timestamp} from '../../geo-physics/domain-model/quantities/timestamp';


export class TimestampConverter {
    public static fromRest(restTimestampMs: number): Timestamp {
        return Timestamp.createFromMs(restTimestampMs);
    }


    public static toRest(timestamp: Timestamp): number {
        return timestamp.epochMs;
    }
}
