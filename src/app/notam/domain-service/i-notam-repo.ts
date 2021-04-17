import {Observable} from 'rxjs';
import {NotamList} from '../domain-model/notam-list';
import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';


export interface INotamRepo {
    readByExtent(request: ReadNotamByExtentRequest): Observable<NotamList>;

    readByIcao(request: ReadNotamByIcaoRequest): Observable<NotamList>;
}
