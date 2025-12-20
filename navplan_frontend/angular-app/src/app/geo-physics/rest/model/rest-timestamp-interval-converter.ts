import {HttpParams} from '@angular/common/http';
import {TimestampInterval} from '../../domain/model/quantities/timestamp-interval';


export class RestTimestampIntervalConverter {
    private static readonly ARG_TIMESTAMP_INTERVAL = 'tsinterval';

    
    public static getUrlParams(interval: TimestampInterval): HttpParams {
        return new HttpParams()
            .set(this.ARG_TIMESTAMP_INTERVAL, this.getValuesAsString(interval));
    }


    public static toRestBody(interval: TimestampInterval): any {
        return {
            [this.ARG_TIMESTAMP_INTERVAL]: this.getValuesAsString(interval)
        };
    }


    private static getValuesAsString(interval: TimestampInterval): string {
        return `${interval.start.epochMs},${interval.end.epochMs}`;
    }
}
