import {Extent2d} from '../../shared/model/geometry/extent2d';
import {Observable} from 'rxjs';
import {NotamList} from '../domain/notam-list';


export interface INotamService {
    readByExtent(extent: Extent2d, zoom: number, starttimestamp: number, endtimestamp: number): Observable<NotamList>;

    readByIcao(icaoList: string[], starttimestamp: number, endtimestamp: number): Observable<NotamList>;
}
