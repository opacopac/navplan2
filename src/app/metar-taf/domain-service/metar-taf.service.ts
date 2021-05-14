import {IDate} from '../../system/domain-service/date/i-date';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {SystemConfig} from '../../system/domain-service/system-config';
import {RestMetarTafService} from '../rest-service/rest-metar-taf.service';
import {MetarTaf} from '../domain-model/metar-taf';
import {MetarTafState} from '../domain-model/metar-taf-state';


@Injectable()
export class MetarTafService {
    private readonly METAR_TAF_TIMEOUT_SEC = 60 * 5;
    private readonly METAR_TAF_MIN_ZOOM_LEVEL = 8;
    private readonly date: IDate;


    public constructor(
        private readonly metarTafRepo: RestMetarTafService,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<MetarTaf[]> {
        if (zoom <= this.METAR_TAF_MIN_ZOOM_LEVEL) {
            return of([]);
        }

        return this.metarTafRepo.load(extent);
    }


    public hasTimedOut(timestampMs: number): boolean {
        return timestampMs + this.METAR_TAF_TIMEOUT_SEC * 1000 < this.date.nowMs();
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
