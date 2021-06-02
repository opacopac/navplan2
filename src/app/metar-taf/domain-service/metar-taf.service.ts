import {IDate} from '../../system/domain-service/date/i-date';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {SystemConfig} from '../../system/domain-service/system-config';
import {MetarTaf} from '../domain-model/metar-taf';
import {MetarTafState} from '../domain-model/metar-taf-state';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {IMetarTafService} from './i-metar-taf.service';
import {IMetarTafRepo} from './i-metar-taf-repo.service';
import {IMetarTafStateProvider} from './i-metar-taf-state-provider';
import {environment} from '../../../environments/environment';


@Injectable()
export class MetarTafService implements IMetarTafService {
    private readonly METAR_TAF_TIMEOUT_SEC = 60 * 5;
    private readonly METAR_TAF_MIN_ZOOM_LEVEL = 8;
    private readonly date: IDate;
    private readonly metarTafState$: Observable<MetarTafState> = this.metarTafStateProvider.getStateObservable();


    public constructor(
        private readonly metarTafRepo: IMetarTafRepo,
        private readonly metarTafStateProvider: IMetarTafStateProvider,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<MetarTafState> {
        if (zoom <= this.METAR_TAF_MIN_ZOOM_LEVEL) {
            return of({extent: extent, zoom: zoom, metarTafs: [], timestamp: this.date.nowMs()});
        }


        return of({ extent: extent, zoom: zoom }).pipe(
            withLatestFrom(this.metarTafState$),
            filter(([reqState, oldState]) => this.isReloadRequired(reqState, oldState)),
            switchMap(() => this.metarTafRepo.load(extent)),
            map(metarTafs => ({
                extent: extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: zoom,
                metarTafs: metarTafs,
                timestamp: this.date.nowMs()
            }))
        );
    }


    public readByIcao(icao: string): Observable<MetarTaf> {
        if (!icao) {
            return of(undefined);
        }

        return of(icao).pipe(
            withLatestFrom(this.metarTafState$),
            map(([adIcao, metarTafState]) => {
                const results = metarTafState.metarTafs.filter(metarTaf => metarTaf.ad_icao === adIcao);
                return results.length > 0 ? results[0] : undefined;
            })
        );
    }


    private isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number, timestamp: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            currentState.zoom !== requestedState.zoom ||
            !currentState.extent.containsExtent2d(requestedState.extent) ||
            currentState.timestamp + this.METAR_TAF_TIMEOUT_SEC * 1000 < this.date.nowMs();
    }
}
