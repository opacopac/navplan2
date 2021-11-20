import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMeteoSmaService} from './i-meteo-sma.service';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {SmaMeasurement} from '../domain-model/sma-measurement';
import {IMeteoSmaRepoService} from './i-meteo-sma-repo.service';


@Injectable({
    providedIn: 'root'
})
export class MeteoSmaService implements IMeteoSmaService {
    constructor(private restService: IMeteoSmaRepoService) {
    }


    readSmaMeasurements(extent: Extent2d): Observable<SmaMeasurement[]> {
        return this.restService.readSmaMeasurements(extent);
    }
}
