import {Observable} from 'rxjs/internal/Observable';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {MetarTaf} from '../domain-model/metar-taf';
import {Injectable} from '@angular/core';
import {IMetarTafRepoService} from './i-metar-taf-repo.service';


@Injectable()
export class MetarTafService {
    public constructor(private metarTafRepo: IMetarTafRepoService) {
    }


    public load(extent: Extent2d): Observable<MetarTaf[]> {
        return this.metarTafRepo.load(extent);
    }
}
