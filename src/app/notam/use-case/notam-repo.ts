import {INotamService} from './i-notam-service';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SystemConfig} from '../../system/system-config';
import {IDate} from '../../system/use-case/date/i-date';
import {NotamState} from '../domain/notam-state';
import {ReadNotamByExtentResult} from '../domain/read-notam-by-extent-result';
import {map} from 'rxjs/operators';


export class NotamRepo {
    private readonly NOTAMS_TIMEOUT_SEC = 60 * 60 * 3;
    private readonly date: IDate;


    public constructor(
        private notamService: INotamService,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    public readByExtent(
        extent: Extent2d,
        zoom: number,
        state: NotamState
    ): Observable<ReadNotamByExtentResult> {
        if (state.zoom === zoom && state.extent.containsExtent2d(extent) && !this.hasTimedOut(state.timestampMs)) {
            return of(new ReadNotamByExtentResult(
                state.extent,
                state.zoom,
                state.notamList,
                state.timestampMs
            ));
        }

        const oversizeExtent = extent.getOversizeExtent(this.getOversizeFactor());
        return this.notamService.readByExtent(
            oversizeExtent,
            zoom,
            this.getNotamStartTimestamp(),
            this.getNotamEndTimestamp()
        ).pipe(
            map(notamList => new ReadNotamByExtentResult(
                oversizeExtent,
                zoom,
                notamList,
                this.date.nowMs()
            ))
        );
    }

    private getNotamStartTimestamp(): number {
        const now = this.date.nowDate();

        // beginning of today LT (notam timestamps from icao have day granularity...)
        return Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000);
    }


    private getNotamEndTimestamp(): number {
        const now = this.date.nowDate();

        // end of tomorrow LT
        return Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).getTime() / 1000);
    }


    private getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    private hasTimedOut(timestampMs: number): boolean {
        return timestampMs + this.NOTAMS_TIMEOUT_SEC * 1000 < this.date.nowMs();
    }
}
