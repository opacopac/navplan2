import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IMeteoSmaService} from './i-meteo-sma.service';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {SmaMeasurement} from '../model/sma-measurement';
import {IMeteoSmaRepoService} from './i-meteo-sma-repo.service';


@Injectable()
export class MeteoSmaService implements IMeteoSmaService {
    constructor(private restService: IMeteoSmaRepoService) {
    }


    readSmaMeasurements(extent: Extent2d): Observable<SmaMeasurement[]> {
        return this.restService.readSmaMeasurements(extent);
    }
}
