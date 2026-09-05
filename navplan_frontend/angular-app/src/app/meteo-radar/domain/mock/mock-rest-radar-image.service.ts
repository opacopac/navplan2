import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IMeteoRadarImageService} from '../service/i-meteo-radar-image.service';
import {RadarImage} from '../model/radar-image';
import {MockRadarImage202608280900} from './mock-radar-image-202608280900';
import {MockRadarImage202608280905} from './mock-radar-image-202608280905';
import {environment} from '../../../../environments/environment';


@Injectable()
export class MockRestRadarImageService implements IMeteoRadarImageService {
    constructor(private http: HttpClient) {
    }


    public readAvailableRadarImages(): Observable<RadarImage[]> {
        return of([MockRadarImage202608280900.create(), MockRadarImage202608280905.create()]);
    }


    public getRadarImageMapTilesUrl(radarImage: RadarImage): string {
        return environment.meteoRadarMapTilesUrl + '202608280900/{z}/{x}/{y}.png';
    }
}
