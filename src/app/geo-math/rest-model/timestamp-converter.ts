import {Timestamp} from '../domain-model/quantities/timestamp';


export class TimestampConverter {
    public static fromRest(restTimestampMs: number): Timestamp {
        return Timestamp.createFromMs(restTimestampMs);
    }
}
