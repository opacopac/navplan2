import {INotamRepo} from './i-notam-repo';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SystemConfig} from '../../system/domain-service/system-config';
import {IDate} from '../../system/domain-service/date/i-date';
import {NotamState} from '../ngrx/notam-state';
import {ReadNotamByExtentResult} from '../domain-model/read-notam-by-extent-result';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';


@Injectable()
export class NotamService {
    private readonly NOTAMS_TIMEOUT_SEC = 60 * 60 * 3;
    private readonly date: IDate;


    public constructor(
        private notamRepo: INotamRepo,
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

        const request = new ReadNotamByExtentRequest(
            extent.getOversizeExtent(this.getOversizeFactor()),
            zoom,
            this.getNotamStartTimestamp(),
            this.getNotamEndTimestamp()
        );

        return this.notamRepo.readByExtent(request).pipe(
            map(notamList => new ReadNotamByExtentResult(
                request.extent,
                request.zoom,
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
