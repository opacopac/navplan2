import {IDate} from '../../system/domain-service/date/i-date';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {SystemConfig} from '../../system/domain-service/system-config';
import {MetarTaf} from '../domain-model/metar-taf';
import {MetarTafState} from '../domain-model/metar-taf-state';
import {map} from 'rxjs/operators';
import {IMetarTafService} from './i-metar-taf.service';
import {IMetarTafRepo} from './i-metar-taf-repo.service';


@Injectable()
export class MetarTafService implements IMetarTafService {
    private readonly METAR_TAF_TIMEOUT_SEC = 60 * 5;
    private readonly METAR_TAF_MIN_ZOOM_LEVEL = 8;
    private readonly date: IDate;


    public constructor(
        private readonly metarTafRepo: IMetarTafRepo,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<MetarTafState> {
        if (zoom <= this.METAR_TAF_MIN_ZOOM_LEVEL) {
            return of({extent: extent, zoom: zoom, metarTafs: [], timestamp: this.date.nowMs()});
        }

        return this.metarTafRepo.load(extent).pipe(
            map(metarTafs => ({
                extent: extent,
                zoom: zoom,
                metarTafs: metarTafs,
                timestamp: this.date.nowMs()
            }))
        );
    }


    public isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number, timestamp: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            currentState.zoom !== requestedState.zoom ||
            !currentState.extent.containsExtent2d(requestedState.extent) ||
            currentState.timestamp + this.METAR_TAF_TIMEOUT_SEC * 1000 < this.date.nowMs();
    }


    public findMetarTafInState(icao: string, metarTafState: MetarTafState): MetarTaf {
        if (!icao) {
            return undefined;
        }

        const results = metarTafState.metarTafs
            .filter(metarTaf => metarTaf.ad_icao === icao);

        return results.length > 0 ? results[0] : undefined;
    }
}
