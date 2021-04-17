import {environment} from '../../../environments/environment';
import {IDate} from '../../system/domain-service/date/i-date';
import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {SystemConfig} from '../../system/domain-service/system-config';
import {map} from 'rxjs/operators';
import {MetarTafRepo} from '../rest-service/metar-taf-repo.service';
import {MetarTafState} from '../domain-model/metar-taf-state';
import {ReadMetarTafByExtentResult} from '../domain-model/read-metar-taf-by-extent-result';
import {MetarTafList} from '../domain-model/metar-taf';


@Injectable({
    providedIn: 'root'
})
export class MetarTafService {
    private readonly METAR_TAF_TIMEOUT_SEC = 60 * 5;
    private readonly METAR_TAF_MIN_ZOOM_LEVEL = 8;
    private readonly date: IDate;


    public constructor(
        private readonly metarTafRepo: MetarTafRepo,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    public readByExtent(
        extent: Extent2d,
        zoom: number,
        state: MetarTafState
    ): Observable<ReadMetarTafByExtentResult> {
        if (state.zoom <= zoom && state.extent.containsExtent2d(extent) && !this.hasTimedOut(state.timestampMs)) {
            return of(new ReadMetarTafByExtentResult(state.extent, state.zoom, state.metarTafList, state.timestampMs));
        }

        if (zoom <= this.METAR_TAF_MIN_ZOOM_LEVEL) {
            return of(new ReadMetarTafByExtentResult(extent, zoom, new MetarTafList(), this.date.nowMs()));
        }

        const oversizeExtent = extent.getOversizeExtent(this.getOversizeFactor());
        return this.metarTafRepo.load(oversizeExtent).pipe(
            map(items => new ReadMetarTafByExtentResult(
                oversizeExtent,
                zoom,
                items,
                this.date.nowMs()
            ))
        );
    }


    private getOversizeFactor(): number {
        return environment.mapOversizeFactor;
    }


    private hasTimedOut(timestampMs: number): boolean {
        return timestampMs + this.METAR_TAF_TIMEOUT_SEC * 1000 < this.date.nowMs();
    }
}
