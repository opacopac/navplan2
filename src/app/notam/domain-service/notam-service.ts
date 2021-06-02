import {INotamRepo} from './i-notam-repo';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SystemConfig} from '../../system/domain-service/system-config';
import {IDate} from '../../system/domain-service/date/i-date';
import {NotamState} from '../domain-model/notam-state';
import {ReadNotamByExtentResult} from '../domain-model/read-notam-by-extent-result';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';
import {NotamList} from '../domain-model/notam-list';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';
import {INotamService} from './i-notam-service';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {ReadNotamByPositionRequest} from '../domain-model/read-notam-by-position-request';


@Injectable()
export class NotamService implements INotamService {
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
    ): Observable<NotamState> {
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
            map(notamList => ({
                extent: request.extent,
                zoom: request.zoom,
                notamList: notamList,
                timestampMs: this.date.nowMs()
            }))
        );
    }


    public readByPosition(position: Position2d): Observable<NotamList> {
        const request = new ReadNotamByPositionRequest(
            position,
            this.getNotamStartTimestamp(),
            this.getNotamEndTimestamp()
        );
        return this.notamRepo.readByPosition(request);
    }


    public readByIcao(airportIcao: string): Observable<NotamList> {
        if (!airportIcao) {
            return of(new NotamList());
        }

        const request = new ReadNotamByIcaoRequest(
            airportIcao,
            this.getNotamStartTimestamp(),
            this.getNotamEndTimestamp()
        );
        return this.notamRepo.readByIcao(request);
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
