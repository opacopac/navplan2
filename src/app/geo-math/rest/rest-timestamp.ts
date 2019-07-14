import {Timestamp} from '../domain/quantities/timestamp';


export class RestTimestamp {
    public static fromRest(restTimestampMs: number): Timestamp {
        return Timestamp.createFromMs(restTimestampMs);
    }
}
