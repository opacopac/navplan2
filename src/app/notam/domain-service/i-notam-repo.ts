import {Observable} from 'rxjs';
import {NotamList} from '../domain-model/notam-list';
import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';
import {Injectable} from '@angular/core';


@Injectable()
export abstract class INotamRepo {
    public abstract readByExtent(request: ReadNotamByExtentRequest): Observable<NotamList>;

    public abstract readByIcao(request: ReadNotamByIcaoRequest): Observable<NotamList>;
}
