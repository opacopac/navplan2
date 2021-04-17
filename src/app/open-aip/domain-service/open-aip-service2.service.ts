import {environment} from '../../../environments/environment';
import {IDate} from '../../system/domain-service/date/i-date';
import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {OpenAipRepo} from '../rest-service/open-aip-repo.service';
import {SystemConfig} from '../../system/domain-service/system-config';
import {OpenAipState} from '../domain-model/open-aip-state';
import {ReadOpenAipItemsByExtentResult} from '../domain-model/read-open-aip-items-by-extent-result';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class OpenAipService {
    private readonly OPENAIP_ITEMS_TIMEOUT_SEC = 60 * 60 * 24;
    private readonly date: IDate;


    public constructor(
        private readonly openAipService: OpenAipRepo,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    public readByExtent(
        extent: Extent2d,
        zoom: number,
        state: OpenAipState
    ): Observable<ReadOpenAipItemsByExtentResult> {
        if (state.zoom === zoom && state.extent.containsExtent2d(extent) && !this.hasTimedOut(state.timestampMs)) {
            return of(new ReadOpenAipItemsByExtentResult(
                state.extent,
                state.zoom,
                state.openAipItems,
                state.timestampMs
            ));
        }

        const oversizeExtent = extent.getOversizeExtent(this.getOversizeFactor());
        return this.openAipService.readByExtent(oversizeExtent, zoom).pipe(
            map(items => new ReadOpenAipItemsByExtentResult(
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
        return timestampMs + this.OPENAIP_ITEMS_TIMEOUT_SEC * 1000 < this.date.nowMs();
    }
}
