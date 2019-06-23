import {Timestamp} from '../quantities/timestamp';


export class RestTimestamp {
    public static fromRest(restTimestampMs: number): Timestamp {
        return Timestamp.createFromMs(restTimestampMs);
    }
}
