import {Timestamp} from './timestamp';


export class TimestampInterval {
    constructor(
        public readonly start: Timestamp,
        public readonly end: Timestamp
    ) {
    }


    public static fromEpochMs(startMs: number, endMs: number): TimestampInterval {
        return new TimestampInterval(
            Timestamp.fromEpochMs(startMs),
            Timestamp.fromEpochMs(endMs)
        );
    }


    public static fromEpochSec(startSec: number, endSec: number): TimestampInterval {
        return new TimestampInterval(
            Timestamp.fromEpochSec(startSec),
            Timestamp.fromEpochSec(endSec)
        );
    }
}
