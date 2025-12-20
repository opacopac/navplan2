import {Observable} from 'rxjs';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Notam} from '../model/notam';
import {Injectable} from '@angular/core';
import {INotamService} from './i-notam.service';
import {INotamRepoService} from './i-notam-repo.service';
import { TimestampInterval } from '../../../geo-physics/domain/model/quantities/timestamp-interval';


@Injectable()
export class NotamService implements INotamService {
    constructor(private notamRepo: INotamRepoService) {
    }

    public readByExtent(extent: Extent2d, zoom: number, interval: TimestampInterval): Observable<Notam[]> {
        return this.notamRepo.readByExtent(extent, zoom, interval);
    }


    public readByPosition(position: Position2d, interval: TimestampInterval): Observable<Notam[]> {
        return this.notamRepo.readByPosition(position, interval);
    }


    public readByIcao(airportIcao: string, interval: TimestampInterval): Observable<Notam[]> {
        return this.notamRepo.readByIcao(airportIcao, interval);
    }
}
