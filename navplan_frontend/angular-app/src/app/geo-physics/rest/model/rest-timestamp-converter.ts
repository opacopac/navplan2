import {Timestamp} from '../../domain/model/quantities/timestamp';


export class RestTimestampConverter {
    public static fromRest(restTimestampMs: number): Timestamp {
        return Timestamp.fromEpochMs(restTimestampMs);
    }


    public static toRest(timestamp: Timestamp): number {
        return timestamp.epochMs;
    }
}
