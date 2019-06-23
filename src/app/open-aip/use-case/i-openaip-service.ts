import {Extent2d} from '../../shared/model/geometry/extent2d';
import {Observable} from 'rxjs';
import {OpenAipItems} from '../domain/open-aip-items';


export interface IOpenAipService {
    readByExtent(extent: Extent2d, zoom: number): Observable<OpenAipItems>;
}
