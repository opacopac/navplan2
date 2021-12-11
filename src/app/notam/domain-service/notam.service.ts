import {Observable} from 'rxjs';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Notam} from '../domain-model/notam';
import {Injectable} from '@angular/core';
import {INotamService} from './i-notam.service';
import {INotamRepoService} from './i-notam-repo.service';


@Injectable()
export class NotamService implements INotamService {
    constructor(private notamRepo: INotamRepoService) {
    }

    public readByExtent(extent: Extent2d, zoom: number, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        return this.notamRepo.readByExtent(extent, zoom, starttimestamp, endtimestamp);
    }


    public readByPosition(position: Position2d, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        return this.notamRepo.readByPosition(position, starttimestamp, endtimestamp);
    }


    public readByIcao(airportIcao: string, starttimestamp: number, endtimestamp: number): Observable<Notam[]> {
        return this.notamRepo.readByIcao(airportIcao, starttimestamp, endtimestamp);
    }
}
