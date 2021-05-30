import {Observable} from 'rxjs';
import {NotamList} from '../domain-model/notam-list';
import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';
import {Injectable} from '@angular/core';
import {ReadNotamByPositionRequest} from '../domain-model/read-notam-by-position-request';


@Injectable()
export abstract class INotamRepo {
    public abstract readByExtent(request: ReadNotamByExtentRequest): Observable<NotamList>;

    public abstract readByPosition(request: ReadNotamByPositionRequest): Observable<NotamList>;

    public abstract readByIcao(request: ReadNotamByIcaoRequest): Observable<NotamList>;
}
